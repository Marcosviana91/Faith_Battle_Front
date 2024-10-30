import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootReducer } from '@/store';

import { setPlayerFocus } from "@/store/reducers/matchReducer";
import { useScreenSizes } from "@/hooks/useScreenSizes";

import { View, Image, Text, StyleSheet, Pressable, ScrollView, Dimensions } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import PlayerIcon64 from "./PlayerIcon64";
import { ThemedText } from "../themed/ThemedText";
import { ThemedView } from "../themed/ThemedView";
import { TEAM_COLOR } from "@/constants/Colors";

type ContainerProps = {
    hideCurrentPlayer?: boolean
    player_id?: number
    matchData?: MatchApiProps
    get_selected_player_id?: (player_id: number) => void
    selected_player_id?: number
}
export function IconsContainer(props: ContainerProps) {
    const playerData = useSelector((state: RootReducer) => state.authReducer.user_data)
    const dispatch = useDispatch();
    const [showPlayers, setShowPlayers] = useState(true)
    const { width: windowWidth } = useScreenSizes();
    const window = Dimensions.get('window')
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 8,
            position: "absolute",
            top: 40,
            zIndex: 1,
        }}>
            <View>
                <Pressable
                    onPress={() => { setShowPlayers(!showPlayers) }}
                    style={{ flexDirection: 'row' }}
                >
                    <FontAwesome5 name={showPlayers ? "users-slash" : "users"} size={32} color="black" />
                </Pressable>
            </View>
            {showPlayers ?
                <ThemedView style={{
                    width: window.width - 60,
                    maxWidth: windowWidth - 60
                }}>
                    {props.matchData?.players_in_match?.map((_team, _index) => {
                        return (
                            <View
                                key={_index}
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-evenly',
                                    gap: 16,
                                    paddingHorizontal: 8,
                                    borderWidth: 2,
                                    borderColor: TEAM_COLOR[_index],
                                    borderRadius: 12,
                                    padding: 2,
                                }}>
                                {_team.map(_player => {
                                    return (
                                        <View key={_player.id} style={{
                                            height: 100,
                                            width: 100,
                                        }}>
                                            <Pressable
                                                onPress={() => {
                                                    if (playerData?.id !== _player.id) {
                                                        dispatch(setPlayerFocus(_player.id))
                                                    }
                                                }}
                                                style={{
                                                    height: '100%',
                                                }}
                                            >
                                                {/* <PlayerIcon id={_player.id} isCurrent={(_player.id == props.matchData!.player_turn)} isTarget={(_player.id == props.matchData!.player_focus_id)} type='mini' /> */}
                                                <PlayerIcon64 id={_player.id} type="mini" isCurrent={(_player.id == props.matchData!.player_turn)} isTarget={(_player.id == props.matchData!.player_focus_id)} />
                                                <ThemedView style={{ flexDirection: 'row', borderWidth: 1, borderBottomWidth: 0, borderEndWidth: 0, borderStartWidth: 0 }}>
                                                    <ThemedText>
                                                        <MaterialCommunityIcons name="shield-cross" size={24} />
                                                    </ThemedText>
                                                    <ThemedText type='defaultSemiBold'>{_player.faith_points}</ThemedText>
                                                    <Image
                                                        source={require('@/assets/images/Icons/wisdon.png')}
                                                        style={{ height: 20, width: 20, margin: 4 }}
                                                    />
                                                    <ThemedText type='defaultSemiBold'>{_player.wisdom_available}</ThemedText>
                                                </ThemedView>
                                            </Pressable>
                                        </View>
                                    )
                                })}
                            </View>
                        )
                        // if (props.hideCurrentPlayer && _player.id === props.player_id) {
                        //     return null
                        // }
                    })}
                </ThemedView> :
                <>

                </>
            }
        </View>
    )
}

export function ShowFightersIconsContainer(props: ContainerProps) {
    return (
        <ThemedView style={{ borderWidth: 1, borderRadius: 8, padding: 8, flexDirection: "row", alignItems: 'center', marginBottom: 12, width: '100%', paddingHorizontal: 24 }}>
            {/* <PlayerIcon id={props.matchData?.fight_camp?.player_attack_id!} type='mini' /> */}
            <ThemedText style={{ lineHeight: 50 }}>
                <MaterialCommunityIcons size={40} name="sword-cross" />
            </ThemedText>
            {/* <PlayerIcon id={props.matchData?.fight_camp?.player_defense_id!} type='mini' /> */}
        </ThemedView>
    )
}

export function SelectEnemyIconsContainer(props: ContainerProps) {
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    return (
        <ScrollView horizontal contentContainerStyle={{
            flex: 1,
            flexDirection: "row",
            columnGap: 16,
            paddingHorizontal: 8,
            justifyContent: "center",
        }}>
            {props.matchData?.players_in_match![0].map((_player) => {
                // DRY user props player_id
                if ((_player.id === player?.id && props.hideCurrentPlayer === true) || _player?.faith_points! < 1) {
                    return null
                }
                return (
                    <View key={_player.id} style={{
                        height: 100
                    }}>
                        <Pressable
                            onPress={() => {
                                if (props.get_selected_player_id) {
                                    props.get_selected_player_id(_player.id)
                                }
                            }}
                            style={{
                                height: '100%',
                            }}>
                            {/* <PlayerIcon id={_player.id} type='mini' isTarget={props.selected_player_id === _player.id} /> */}
                            <ThemedView style={{ flexDirection: 'row', borderWidth: 1, borderBottomWidth: 0, borderEndWidth: 0, borderStartWidth: 0 }}>
                                <ThemedText>
                                    <MaterialCommunityIcons name="shield-cross" size={24} />
                                </ThemedText>
                                <ThemedText type='defaultSemiBold'>{_player.faith_points}</ThemedText>
                            </ThemedView>
                        </Pressable>
                    </View>
                )
            })}
        </ScrollView>
    )
}

export function SelectFriendsIconsContainer(props: ContainerProps) {
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    return (
        <ScrollView horizontal contentContainerStyle={{
            flex: 1,
            flexDirection: "row",
            columnGap: 16,
            paddingHorizontal: 8,
            justifyContent: "center",
        }}>
            {props.matchData?.players_in_match![0].map((_player) => {
                if ((_player.id === player?.id && props.hideCurrentPlayer) || _player?.faith_points! < 1) {
                    return null
                }

                if (_player.id === player?.id) {
                    return (
                        <View key={_player.id} style={{
                            height: 100
                        }}>
                            <Pressable
                                onPress={() => {
                                    if (props.get_selected_player_id) {
                                        props.get_selected_player_id(_player.id)
                                    }
                                }}
                                style={{
                                    height: '100%',
                                }}>
                                {/* <PlayerIcon id={_player.id} type='mini' isCurrent={props.selected_player_id === _player.id} /> */}
                                <ThemedView style={{ flexDirection: 'row', borderWidth: 1, borderBottomWidth: 0, borderEndWidth: 0, borderStartWidth: 0 }}>
                                    <ThemedText>
                                        <MaterialCommunityIcons name="shield-cross" size={24} />
                                    </ThemedText>
                                    <ThemedText type='defaultSemiBold'>{_player.faith_points}</ThemedText>
                                </ThemedView>
                            </Pressable>
                        </View>
                    )
                }
                return null
            })}
        </ScrollView>
    )
}