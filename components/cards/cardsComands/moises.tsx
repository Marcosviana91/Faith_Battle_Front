import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { ThemedModal } from '@/components/themed/ThemedModal';

import { SubCardsContainer } from '@/components/cards/containers/subContainer';

import BasicButton from '@/components/button/basic';
import { setCurrentSkill } from '@/store/reducers/matchReducer';
import useAppWebSocket from '@/hooks/useAppWebSocket';
import ToggleButton from '@/components/button/toggle';
import { ThemedText } from '@/components/themed/ThemedText';

export function OnInvoke() {
    const cardListDeck = useSelector((state: RootReducer) => state.matchReducer.player_match_settings?.current_skill)?.deck
    const cardListSea = useSelector((state: RootReducer) => state.matchReducer.player_match_settings?.current_skill)?.forgotten_sea
    const [cardList, setCardList] = useState<CardProps[]>(cardListDeck!)

    const dispatch = useDispatch()
    const [selectedOption, setSelectedOption] = useState<number>(0)
    const [selectedCard, setSelectedCard] = useState<number>()

    useEffect(() => {
        if (cardList?.length! < 1) {
            setSelectedOption(1)
        }
    }, [])

    useEffect(() => {
        if (selectedOption === 0) { setCardList(cardListDeck!) }
        if (selectedOption === 1) { setCardList(cardListSea!) }
    }, [selectedOption])

    if (cardListSea!.length < 1 && cardList!.length < 1) {
        return (
            <ThemedModal title='Escolha um milagre.' closeModal={() => { dispatch(setCurrentSkill(undefined)) }} >
                <ThemedText>Sem cartas de milagre</ThemedText>
            </ThemedModal>
        )
    }

    return (
        <ThemedModal title='Escolha um milagre.' hideCloseButton closeModal={() => { }} >
            <View style={{ height: 50, minWidth: '50%' }}>
                <ToggleButton disabled={cardListSea!.length < 1 || cardList!.length < 1} values={['DECK', 'MAR']} onPress={setSelectedOption} />

            </View>
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

    return (
        <>
            <View style={{ width: "50%", height: 50, margin: 16 }}>
                <BasicButton
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
                                "move_type": "card_skill",
                                "card_id": "moises"
                            }
                        })
                        dispatch(setCurrentSkill(undefined))
                    }}
                >Selecionar</BasicButton>
            </View>
        </>
    )
}