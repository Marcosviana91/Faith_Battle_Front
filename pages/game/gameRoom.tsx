import { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Modal } from "react-native";

import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';
import { useNavigation } from "@react-navigation/native";

import { ThemedView } from "@/components/themed/ThemedView";
import { ThemedText } from "@/components/themed/ThemedText";
import PlayerRoomMini from "@/components/gameBoard/playerRoomMini";
import BasicButton from "@/components/button/basic";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import useWebSocket from 'react-use-websocket';
import { URI } from "@/store/server_urls";

import CardsContainer from "@/components/gameBoard/cardsContainer";



export default function GameRoom() {
    const navigation = useNavigation()

    const room = useSelector((state: RootReducer) => state.matchReducer.room_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const userData = useSelector((state: RootReducer) => state.authReducer.user_data)

    const WS = useWebSocket(`ws://${URI}/ws/`, { share: true });

    const [allowRetry, setAllowRetry] = useState(false)

    useEffect(() => {
        if (player?.card_retry) {
            setAllowRetry(player?.card_retry?.length! > 0)

        }
        setAllowRetry(false)
    }, [player?.card_retry])

    if (!room || !userData) {
        // navigation.navigate("Home" as never)
        return null
    }

    const open_player_slot = []
    for (let index = 0; index < room.max_players! - room.connected_players!.length; index++) {
        open_player_slot.push(<PlayerRoomMini key={index} id={0} />)
    }

    return (
        <ThemedView style={{ flex: 1, margin: 8 }}>
            {room.room_stage === 0 && (
                <View style={{ height: 120, padding: 8 }}>
                    <ThemedText>ID: {room.id}</ThemedText>
                    <ThemedText>Nome: {room.name}</ThemedText>
                    <ThemedText>Tipo de partida: {room.match_type}</ThemedText>
                    <ThemedText>Jogadores na sala: {room.connected_players?.length}</ThemedText>
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
            <View style={[styles.slots, { backgroundColor: '#ffffff53' }]}>
                {room.connected_players?.map(_player => (
                    <PlayerRoomMini key={_player.id} id={_player.id!} isReady={_player.ready} />
                ))}
                {open_player_slot.map(player => { return player })}
            </View>
            {room.room_stage === 0 && (
                <View style={{ height: 100, width: '100%', position: 'absolute', bottom: 0 }}>
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
                </View>
            )}
            {player && <Modal
                visible={room.room_stage == 1 && !player?.ready}
                transparent
                presentationStyle='overFullScreen'
            >
                <View style={{ flex: 1, backgroundColor: '#000000df', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#fff', width: '90%', padding: 16, borderRadius: 8, gap: 16 }}>
                        <View style={{ flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                            {player.card_retry?.length! > 0 &&
                                <CardsContainer
                                    cards={player.card_retry}
                                    zone="retry"
                                    size="small"
                                />}
                            <CardsContainer
                                cards={player!.card_hand}
                                zone="select"
                                size="small"
                            />
                        </View>
                        <View style={{ flexDirection: 'row', gap: 8, borderTopWidth: 1, paddingTop: 16 }}>
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
                    </View>
                </View>
            </Modal>}
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    slots: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexWrap: 'wrap',
        gap: 10,
        padding: 12,
    }
})