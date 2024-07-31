import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';

import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { ThemedModal } from '@/components/themed/ThemedModal';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed/ThemedText';
import { SubCardsContainer } from '@/components/cards/subContainer';

import useWebSocket from 'react-use-websocket';
import { URI } from "@/store/server_urls";
import BasicButton from '@/components/button/basic';

export function OnInvoke(props: { in_game_id: string }) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const [selectedCard, setSelectedCard] = useState<number>()
    const [cardList, setcardList] = useState<CardProps[]>([])

    const WS = useWebSocket(`ws://${URI}/ws/`, { share: true });

    useEffect(() => {
        console.log("SubContainer " + props.in_game_id)
        WS.sendJsonMessage({
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
                "card_id": props.in_game_id,
                "move_type": "move_to_prepare"
            }
        })
    }, [])

    useEffect(() => {
        setcardList(player?.card_deck as [])
    }, [player])

    useEffect(() => {
        if (selectedCard) {
            console.log("Escolheu " + cardList![selectedCard!].in_game_id)
        }
    }, [selectedCard])

    return (
        <ThemedModal title='Escolha um herói.' hideCloseButton closeModal={() => { }} >
            {/* Cartas no campo de batalha */}
            <View style={{ width: "100%" }}>
                <SubCardsContainer
                    cards={cardList}
                    cards_action={<ChooseCard list={cardList as []} selectedCard={selectedCard} />}
                    get_selected_card={(ind) => { setSelectedCard(ind) }}
                />
            </View>

        </ThemedModal>
    )
}

type ChangeCardOrderProps = {
    list?: []
    selectedCard?: number
}

function ChooseCard(props: ChangeCardOrderProps) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const WS = useWebSocket(`ws://${URI}/ws/`, { share: true });

    useEffect(() => { console.log(props.list![props.selectedCard!]) }, [])

    return (
        <>
            <View style={{ width: "50%", height: 50, margin: 16 }}>
                <BasicButton
                    onPress={() => {
                        console.log("Enviar novo deck");
                        console.log([props.list![props.selectedCard!]]);
                        WS.sendJsonMessage({
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
                                "card_list": [props.list![props.selectedCard!]],
                                "move_type": "change_deck"
                            }
                        })
                    }}
                >Selecionar</BasicButton>
            </View>
        </>
    )
}