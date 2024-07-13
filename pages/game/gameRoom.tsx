import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import PlayerRoomMini from "@/components/gameBoard/playerRoomMini";

import { useSelector } from 'react-redux'
import { useNavigation } from "@react-navigation/native";
import { RootReducer } from '@/store';

import BasicButton from "@/components/button/basic";
import Card from "@/components/cards/index";


import useWebSocket from 'react-use-websocket';
import { URI } from "@/store/server_urls";


export default function GameRoom() {
    const navigation = useNavigation()
    
    const room = useSelector((state: RootReducer) => state.matchReducer.room_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const userData = useSelector((state: RootReducer) => state.authReducer.user_data)

    const WS = useWebSocket(`ws://${URI}/ws/`, {share:true});
    


    if (!room || !userData) {
        // navigation.navigate("Home" as never)
        return null
    }

    const open_player_slot = []
    for (let index = 0; index < room.max_players! - room.connected_players!.length; index++) {
        open_player_slot.push(<PlayerRoomMini key={index} id={0} />)
    }

    return (
        <View style={{ flex: 1, margin: 8 }}>
            {room.room_stage === 0 && (
                <View style={{ backgroundColor: 'green', height: 120, padding: 8 }}>
                    <Text>ID: {room.id}</Text>
                    <Text>Nome: {room.name}</Text>
                    <Text>Tipo de partida: {room.match_type}</Text>
                    <Text>Jogadores na sala: {room.connected_players?.length}</Text>
                    <Pressable
                        style={{ position: "absolute", right: 8, backgroundColor: 'red', height: 104, width: '30%', justifyContent: "center", alignItems: "center" }}
                        onPress={
                            () => {
                                WS.sendJsonMessage({
                                    data_type:"disconnect",
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
                        <Text style={{ flex: 1, fontSize: 32, alignContent: 'center' }}>Deixar</Text>
                    </Pressable>
                </View>

            )}
            <View style={[styles.slots, { backgroundColor: 'yellow' }]}>
                {room.connected_players?.map(_player => (
                    <PlayerRoomMini key={_player.id} id={_player.id!} isReady={_player.ready} />
                ))}
                {open_player_slot.map(player => { return player })}
            </View>
            {room.room_stage === 0 && (
                <>
                    <View style={{ backgroundColor: 'red', height: 100 }}>
                        <Text> Meu Deck</Text>
                    </View>
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
                </>
            )}
            <Modal
                visible={room.room_stage == 1 && !player?.ready}
                transparent
                presentationStyle='overFullScreen'
            >
                <View style={{ flex: 1, backgroundColor: '#000000df', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#fff', width: '90%', padding: 16, borderRadius: 8, gap: 16 }}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                            {player?.card_hand?.map((card, index) => (
                                <Card key={index} size="small" slug={card as string} />
                            ))}
                        </View>
                        <View style={{ flexDirection: 'row', gap: 8, borderTopWidth: 1, paddingTop: 16 }}>
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
                                OK
                            </BasicButton>
                            <BasicButton>
                                Trocar Cartas
                            </BasicButton>

                        </View>
                    </View>

                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    slots: {
        height: 294,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexWrap: 'wrap',
        gap: 10,
        padding: 12,
    }
})