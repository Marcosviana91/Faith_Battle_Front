import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { View, Pressable } from "react-native";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ThemedModal } from '@/components/themed/ThemedModal';
import { ThemedView } from '@/components/themed/ThemedView';
import { ThemedText } from '@/components/themed/ThemedText';
import BasicButton from '@/components/button/basic';
import useAppWebSocket from '@/hooks/useAppWebSocket';
import { Card } from '../cards/containers/DefaultContainer';
import StackHandContainer from '../cards/containers/StackHandContainer';


export default function CardStack() {
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const card_stack = matchData?.card_stack

    const WS = useAppWebSocket();

    const [showModal, setShowModal] = useState(true)
    const [interFerirBtn, setInterFerirBtn] = useState(true)

    useEffect(() => {
        setInterFerirBtn(true)
    },[card_stack?.cards])

    return (
        <>
            {card_stack &&
                <ThemedView
                    style={{
                        width: 40,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderRadius: 8,
                        marginTop: 50,
                        marginLeft: 8
                    }}
                >
                    {/* Botão para reabir a pilha de cartas */}
                    <Pressable
                        onPress={() => {
                            setShowModal(true)
                        }}
                    >
                        <ThemedText>
                            <MaterialCommunityIcons style={{}} size={30} name="cards-variant" />
                        </ThemedText>
                    </Pressable>

                    <ThemedModal
                        title="Pilha de Cartas"
                        closeModal={() => {
                            setShowModal(false)
                        }}
                        visible={showModal}
                        backgroundTransparent
                    >
                        {/* A pilha de cartas */}
                        <View style={{ flexDirection: 'row', height: 100, width: (75 + (card_stack.cards.length * 20)), padding: 8 }}>
                            {card_stack.cards.map((_card, _index, _array) => (
                                <View style={{ zIndex: _index, position: 'absolute', left: _index * 30 }}>
                                    <Card size='minimum' card={{ ..._card, status: (_index == _array.length - 1 ? 'ready' : 'used') }} />
                                </View>
                            ))}
                        </View>
                        {interFerirBtn && card_stack.cards[card_stack.cards.length - 1].in_game_id?.split('_')[0] !== String(player?.id) &&
                            <>
                                <BasicButton
                                    onPress={() => {
                                        console.log("Não interferir")
                                        const data: APIResponseProps = {
                                            "data_type": "match_move",
                                            "user_data": {
                                                "id": player?.id
                                            },
                                            "room_data": {
                                                "id": matchData?.id
                                            },
                                            "match_move": {
                                                "match_id": matchData?.id,
                                                "round_match": matchData?.round_match,
                                                "player_move": player?.id,
                                                "move_type": "resolve_skill",
                                            }
                                        }
                                        WS.sendJsonMessage(data)
                                        setInterFerirBtn(false)
                                    }}
                                >Não interferir</BasicButton>
                                <StackHandContainer />
                            </>
                        }
                    </ThemedModal>
                </ThemedView>
            }
        </>
    )
}