import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootReducer } from '@/store';

import { setPlayerFocus, addPlayersData } from "@/store/reducers/matchReducer";
import { useScreenSizes } from "@/hooks/useScreenSizes";

import { View, Image, Text, StyleSheet, Pressable, ScrollView, Dimensions } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useGetUserDataMutation } from '@/store/api'
import { useAvatar, usePlayerData } from "@/hooks/usePlayerData";
import { ThemedText } from "../themed/ThemedText";
import { ThemedView } from "../themed/ThemedView";
import { TEAM_COLOR } from "@/constants/Colors";

type Props = {
    id: number
    type: "normal" | "mini"
    isTarget?: boolean
    isCurrent?: boolean
    isReady?: boolean
    size?: number
}


export function PlayerIcon(props: Props) {
    const dispatch = useDispatch()
    const playersData = useSelector((state: RootReducer) => state.matchReducer.players_data)
    const [getUser, { data: userData, error: userError }] = useGetUserDataMutation();
    const [avatar, setAvatar] = useState()
    const _PlayerData = playersData?.filter((player) => player.id === props.id)[0]
    const [playerDataCurrent, setPlayerDataCurrent] = useState<UserProps>()

    var border_color = 'gray'
    if (props.isTarget) { border_color = "red" }
    if (props.isCurrent) { border_color = "green" }
    if (props.isCurrent && props.isTarget) { border_color = "orange" }

    const styles = StyleSheet.create({
        playerIconMini: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            width: props.size ? props.size : 50,
            height: props.size ? props.size : 50,
            borderRadius: 25,
            borderColor: border_color,
            borderWidth: 4,
            overflow: "hidden",
        },
        playerIcon: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#88f",
            width: 100,
            height: 150,
            borderRadius: 25,
            borderColor: "blue",
            borderWidth: 2,
            overflow: "hidden",
        },
        playerImage: {
            justifyContent: "space-between",
            alignItems: "flex-start",
            paddingBottom: 12,
        },
    })


    useEffect(() => {
        if (props.id > 0) {
            if (_PlayerData) {
                setPlayerDataCurrent(_PlayerData)
                setAvatar(useAvatar({ avatar_index: _PlayerData.avatar! }))
            } else (
                getUser(props.id)
            )
        }
    }, [])

    useEffect(() => {
        if (userData) {
            setPlayerDataCurrent(userData)
            setAvatar(useAvatar({ avatar_index: userData.avatar! }))
            if (userData) {
                dispatch(addPlayersData(userData))

            }
        }
    }, [userData])

    if (props.type === 'normal') {
        if (props.id === 0) {
            return (
                <View style={[styles.playerIcon, { backgroundColor: '#777', borderColor: '#444' }]}>
                    <Text>OPEN</Text>
                </View>
            )
        }

        return (
            <View style={{ alignItems: "center", width: 100 }}>
                <ThemedText style={{ fontSize: 18, fontWeight: "700" }}>{playerDataCurrent?.username}</ThemedText>
                <View style={[styles.playerIcon, styles.playerImage]}>
                    <Image
                        style={{ height: 150, width: 100 }}
                        source={avatar}
                    />
                    {props.isReady &&
                        <View style={{ position: 'absolute', height: 150, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff9b" }}>
                            <Ionicons
                                name="checkmark-circle"
                                size={32} color="black"
                            />
                        </View>
                    }
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <View
                style={{
                    top: 0,
                    zIndex: 1,
                    backgroundColor: '#ffffffaa',
                    paddingHorizontal: 2,
                    borderRadius: 8,
                    minWidth: props.size ? props.size : 50,
                    alignItems: "center"
                }}
            >
                <Text style={{ fontSize: 14, fontWeight: "700" }}>{playerDataCurrent?.username}</Text>
            </View>
            <View style={styles.playerIconMini}>
                <Image
                    style={{ width: "100%", height: "100%" }}
                    source={avatar}
                />
            </View>
        </View>
    )
}

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
                                                <PlayerIcon id={_player.id} isCurrent={(_player.id == props.matchData!.player_turn)} isTarget={(_player.id == props.matchData!.player_focus_id)} type='mini' />
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
            <PlayerIcon id={props.matchData?.fight_camp?.player_attack_id!} type='mini' />
            <ThemedText style={{ lineHeight: 50 }}>
                <MaterialCommunityIcons size={40} name="sword-cross" />
            </ThemedText>
            <PlayerIcon id={props.matchData?.fight_camp?.player_defense_id!} type='mini' />
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
                if (_player.id === player?.id) {
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
                            <PlayerIcon id={_player.id} type='mini' isTarget={props.selected_player_id === _player.id} />
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
                if (_player.id === player?.id && props.hideCurrentPlayer) {
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
                                <PlayerIcon id={_player.id} type='mini' isCurrent={props.selected_player_id === _player.id} />
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