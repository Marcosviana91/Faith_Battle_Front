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
        <ThemedModal title='Reorganize as cartas.' hideCloseButton closeModal={() => { }} >
            {/* Cartas no campo de batalha */}
            <SubCardsContainer
                cards={cardList}
                cards_action={<ChangeCardOrder list={cardList as []} selectedCard={selectedCard} onReturn={(val)=>{
                    setcardList(val as [])
                }} />}
                get_selected_card={(ind) => { setSelectedCard(ind) }}
            />
            <View style={{ width: "50%", height: 50, margin: 16 }}>
                <BasicButton
                    onPress={() => {
                        console.log("Enviar novo deck");
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
                                        "card_list": cardList,
                                        "move_type": "change_deck"
                                    }
                                })
                    }}
                >Ok</BasicButton>
            </View>
        </ThemedModal>
    )
}

type ChangeCardOrderProps = {
    onReturn?: ([]) => void
    list?: []
    selectedCard?: number
}

function ChangeCardOrder(props: ChangeCardOrderProps) {
    const [card_list, setCard_list] = useState(props.list)

    useEffect(() => { console.log(card_list) }, [])

    function move2Left() {
        const actual_index = props.selectedCard
        let __temp_list = []
        __temp_list = props.list!.map((card, _index, array) => {
            if (typeof actual_index === "number") {

                if (_index == actual_index - 1) {
                    return array[actual_index]
                }
                if (_index == actual_index) {
                    return array[actual_index - 1]
                }

            }
            return card
        })
        return __temp_list
    }

    function move2Right() {
        const actual_index = props.selectedCard
        let __temp_list = []
        __temp_list = props.list!.map((card, _index, array) => {
            if (typeof actual_index === "number") {

                if (_index == actual_index) {
                    return array[actual_index + 1]
                }
                if (_index == actual_index + 1) {
                    return array[actual_index]
                }

            }
            return card
        })
        return __temp_list
    }

    return (
        <>
            <Pressable
                disabled={props.selectedCard === 0}
                style={{ backgroundColor: props.selectedCard === 0 ? "grey" :"red" }}
                onPress={() => {
                    props.onReturn!(move2Left())
                }}
            >
                <MaterialCommunityIcons name="arrow-left" size={80} color="black" />
            </Pressable>
            <Pressable
                disabled={props.selectedCard === props.list!.length - 1}
                style={{ backgroundColor: props.selectedCard === props.list!.length - 1 ? "grey" :"red" }}
                onPress={() => {
                    props.onReturn!(move2Right())
                }}
            >
                <MaterialCommunityIcons name="arrow-right" size={80} color="black" />
            </Pressable>
        </>
    )
}