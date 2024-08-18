import { View, StyleSheet, Pressable, ScrollView } from "react-native";

import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';
import { useNavigation } from "@react-navigation/native";

import { ThemedView } from "@/components/themed/ThemedView";
import { ThemedText } from "@/components/themed/ThemedText";

import BasicButton from "@/components/button/basic";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import useWebSocket from 'react-use-websocket';
import { URI } from "@/store/server_urls";

import { PlayerIcon } from "@/components/player_user/playerIcon";
import { ThemedModal } from "@/components/themed/ThemedModal";
import RetryContainer from "@/components/cards/containers/RetryContainer";



export default function GameRoom() {
    const navigation = useNavigation()

    const room = useSelector((state: RootReducer) => state.matchReducer.room_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const userData = useSelector((state: RootReducer) => state.authReducer.user_data)

    const WS = useWebSocket(`ws://${URI}/ws/`, { share: true });

    if (!room || !userData) {
        // navigation.navigate("Home" as never)
        return null
    }

    const open_player_slot = []
    for (let index = 0; index < room.max_players! - room.connected_players!.length; index++) {
        open_player_slot.push(<PlayerIcon type="normal" key={index} id={0} />)
    }

    return (
        <ThemedView style={{ flex: 1, margin: 8 }}>
            {/* Header */}
            {room.room_stage === 0 && (
                <View style={{ height: 120, padding: 8 }}>
                    <ThemedText>ID: {room.id}</ThemedText>
                    <ThemedText>Nome: {room.name}</ThemedText>
                    <ThemedText>Tipo de partida: {room.match_type}</ThemedText>
                    <ThemedText>Jogadores na sala: {room.connected_players?.length}</ThemedText>
                    {/* Botão de sair */}
                    <Pressable
                        style={{
                            backgroundColor: '#f00',
                            position: "absolute", right: 8, top: 8,
                            height: 60, width: 60,
                            justifyContent: "center", alignItems: "center",
                            borderRadius: 16, borderWidth: 2,
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
            <View style={{ flex: 1, padding: 8, }}>
                <ScrollView>
                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'space-evenly' }}>
                        {room.connected_players?.map(_player => (
                            <PlayerIcon type="normal" key={_player.id} id={_player.id!} isReady={_player.ready} />
                        ))}
                        {open_player_slot.map(player => { return player })}
                    </View>
                </ScrollView>

            </View>
            {/* Botão de ficar pronto */}
            {room.room_stage === 0 && (
                <BasicButton
                   
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

            {player && <ThemedModal
                visible={room.room_stage == 1 && !player?.ready}
                transparent
                presentationStyle='overFullScreen'
                hideCloseButton
            >
                <View style={{ flexWrap: 'nowrap', gap: 8, justifyContent: 'center', minHeight: 200, width: '100%' }}>
                    <RetryContainer />
                </View>
                <View style={{ flexDirection: 'row', gap: 8, paddingTop: 24 }}>
                    <BasicButton
                       
                        disabled={player.card_retry?.length! > 0}
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
                       
                        disabled={!(player.card_retry?.length! > 0)}
                        onPress={() => {
                            WS.sendJsonMessage({
                                data_type: 'retry_cards',
                                user_data: {
                                    id: userData.id,
                                },
                                room_data: {
                                    id: room.id,
                                },
                                retry_cards: player.card_retry
                            })
                        }}
                    >
                        Trocar Cartas
                    </BasicButton>
                </View>
            </ThemedModal>}
        </ThemedView>
    )
}
