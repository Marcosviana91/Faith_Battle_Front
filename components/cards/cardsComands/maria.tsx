import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { ThemedModal } from '@/components/themed/ThemedModal';

import { SubCardsContainer } from '@/components/cards/containers/subContainer';

import BasicButton from '@/components/button/basic';
import { setCurrentSkill } from '@/store/reducers/matchReducer';
import useAppWebSocket from '@/hooks/useAppWebSocket';

export function OnInvoke() {
    const cardList = useSelector((state: RootReducer) => state.matchReducer.player_match_settings?.current_skill)?.deck
    const [selectedCard, setSelectedCard] = useState<number>()

    return (
        <ThemedModal title='Escolha um herói.' hideCloseButton closeModal={() => { }} >
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
    const WS = useAppWebSocket()
    const dispatch = useDispatch()

    useEffect(() => { console.log(props.list![props.selectedCard!]) }, [])

    return (
        <>
            <View style={{ width: "50%", height: 50, margin: 16 }}>
                <BasicButton
                    height={50}
                    onPress={() => {
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
                        dispatch(setCurrentSkill(undefined))
                    }}
                >Selecionar</BasicButton>
            </View>
        </>
    )
}