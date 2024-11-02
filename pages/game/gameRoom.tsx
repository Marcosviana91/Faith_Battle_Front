import { View, Pressable, ScrollView, ImageBackground } from "react-native";

import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';
import { useNavigation } from "@react-navigation/native";

import { ThemedView } from "@/components/themed/ThemedView";
import { ThemedText } from "@/components/themed/ThemedText";

import BasicButton from "@/components/button/basic";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import useAppWebSocket from "@/hooks/useAppWebSocket";

import PlayerIcon64 from "@/components/player_user/PlayerIcon64";
import { ThemedModal } from "@/components/themed/ThemedModal";
import RetryContainer from "@/components/cards/containers/RetryContainer";

const background = require('@/assets/images/mesa_1.jpg')



export default function GameRoom() {
    const navigation = useNavigation()

    const room = useSelector((state: RootReducer) => state.matchReducer.room_data)
    const userData = useSelector((state: RootReducer) => state.authReducer.user_data)
    const playersData = room?.connected_players![0]
    const player_ = playersData?.filter((player) => player.id === userData!.id)[0]
    const player_data = useSelector((state: RootReducer) => state.matchReducer.player_data)

    const WS = useAppWebSocket();

    if (!room || !userData) {
        navigation.navigate("Home" as never)
        return null
    }

    var open_player_slot = []
    for (let index = 0; index < room.max_players! - room.connected_players![0].length; index++) {
        open_player_slot.push(<PlayerIcon64 type="normal" key={index} id={0} />)
    }


    var connected_players = 0
    room.connected_players!.forEach(team => {
        team.forEach(__player => {
            connected_players += 1
        })
    });
    return (
        <ThemedView style={{ flex: 1, margin: 8 }}>
            <ImageBackground
                source={background}
                style={{ flex: 1, }}
                imageStyle={{ width: "100%", height: "100%" }}
                resizeMode='stretch'
                blurRadius={4}
            >
                {/* Header */}
                {room.room_stage === 0 && (
                    <View style={{ height: 120, padding: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <ThemedView style={{ padding: 4 }}>
                            <ThemedText type="defaultSemiBold">ID: {room.id}</ThemedText>
                            <ThemedText type="defaultSemiBold">Nome: {room.name}</ThemedText>
                            {/* <ThemedText type="defaultSemiBold">Times: {room.teams}</ThemedText> */}
                            <ThemedText type="defaultSemiBold">Jogadores na sala: {connected_players}</ThemedText>

                        </ThemedView>
                        {/* Botão de sair */}
                        <Pressable
                            style={{
                                backgroundColor: '#f00',
                                height: 60, width: 60,
                                justifyContent: "center", alignItems: "center",
                                borderRadius: 16, borderWidth: 2,
                                position: "absolute",
                                top: 8,
                                right: 8,
                            }}
                            onPress={
                                () => {
                                    WS.sendJsonMessage({
                                        data_type: "disconnect",
                                        room_data: {
                                            id: room.id
                                        },
                                        user_data: {
                                            id: userData?.id
                                        }
                                    })
                                }
                            }
                        >
                            <MaterialCommunityIcons name="exit-run" size={48} color="black" />
                        </Pressable>
                    </View>
                )}

                {/* Slots */}
                {/* Teams */}
                <View style={{ flex: 1, padding: 8, }}>
                    <ScrollView>
                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'space-evenly', paddingVertical: 16, borderWidth:2, backgroundColor:'#000000c8' }}>
                            {room.connected_players?.map((_team, _t_index) => (
                                <View key={_t_index} style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'space-evenly' }}>
                                    {_team.map((_player) => (
                                        <PlayerIcon64 type="normal" key={_player.id} id={_player.id!} isReady={_player.ready} />
                                    ))}
                                </View>
                            ))}
                            <View>
                                {open_player_slot.map(player => { return player })}
                            </View>
                        </View>
                    </ScrollView>

                </View>
                {/* Botão de ficar pronto */}
                {room.room_stage === 0 && !player_?.ready && (
                    <BasicButton
                        disabled={!(connected_players > 1)}
                        onPress={() => {
                            WS.sendJsonMessage({
                                data_type: 'ready',
                                user_data: {
                                    id: userData.id,
                                },
                                room_data: {
                                    id: room.id,
                                }
                            })
                        }}
                    >
                        Ficar Pronto
                    </BasicButton>
                )}
                {player_data && <ThemedModal
                    visible={room.room_stage == 1 && !player_data?.ready}
                    transparent
                    presentationStyle='overFullScreen'
                    hideCloseButton
                >
                    <View style={{ flexWrap: 'nowrap', gap: 8, justifyContent: 'center', minHeight: 200, width: '100%' }}>
                        <RetryContainer />
                    </View>
                    <View style={{ flexDirection: 'row', gap: 8, paddingTop: 24 }}>
                        <BasicButton

                            disabled={player_data.card_retry?.length! > 0}
                            onPress={() => {
                                WS.sendJsonMessage({
                                    data_type: 'ready',
                                    user_data: {
                                        id: userData.id,
                                    },
                                    room_data: {
                                        id: room.id,
                                    }
                                })
                            }}
                        >
                            OK
                        </BasicButton>
                        <BasicButton

                            disabled={!(player_data.card_retry?.length! > 0)}
                            onPress={() => {
                                WS.sendJsonMessage({
                                    data_type: 'retry_cards',
                                    user_data: {
                                        id: userData.id,
                                    },
                                    room_data: {
                                        id: room.id,
                                    },
                                    retry_cards: player_data.card_retry
                                })
                            }}
                        >
                            Trocar Cartas
                        </BasicButton>
                    </View>
                </ThemedModal>}
            </ImageBackground>
        </ThemedView>
    )
}
