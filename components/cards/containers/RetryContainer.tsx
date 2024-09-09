import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Pressable, View } from "react-native"

import { RootReducer } from "@/store"
import { setPlayer } from "@/store/reducers/matchReducer"

import { isCardInList } from "@/hooks/useCards"

import { MaterialCommunityIcons } from "@expo/vector-icons"

import DefaultContainer from "./DefaultContainer"

import { ThemedText } from "@/components/themed/ThemedText"
import { ThemedView } from "@/components/themed/ThemedView"

export default function RetryContainer() {
    const dispatch = useDispatch()
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
    const [selectedCard, setSelectedCard] = useState<CardProps>()
    const [selectedCardRetry, setSelectedCardRetry] = useState<CardProps>()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        setSelectedCardRetry(undefined)
    }, [selectedCard])

    useEffect(() => {
        setSelectedCard(undefined)
    }, [selectedCardRetry])

    function CardRetry(props: { card: CardProps }) {

        if (!props.card) {
            return (null)
        }

        if (player?.deck_try! >= 3) {
            return (
                <View style={{ borderRadius: 8, marginTop: 8 }}>
                    <MaterialCommunityIcons name="block-helper" size={50} color="black" />
                </View>
            )
        }
        return (
            <Pressable
                onPress={() => {
                    if (player.deck_try! < 3) {
                        var hand_cards: CardProps[] = []
                        var retry_cards: CardProps[] = []

                        if (isCardInList(props.card.in_game_id, player.card_hand)) {
                            player.card_hand!.map(card => {
                                if (card.in_game_id == props.card.in_game_id) {
                                    retry_cards = player.card_retry ? [...player.card_retry, card] : [card]
                                } else {
                                    hand_cards = [...hand_cards, card]
                                }
                            })
                        }
                        else if (isCardInList(props.card.in_game_id, player.card_retry)) {
                            player.card_retry!.map(card => {
                                if (card.in_game_id == props.card.in_game_id) {
                                    hand_cards = [...player.card_hand!, card]
                                } else {
                                    retry_cards = [...retry_cards, card]
                                }
                            })
                        }
                        dispatch(setPlayer({
                            ...player!, card_retry: retry_cards, card_hand: hand_cards
                        }))
                    }
                    setShowModal(false)
                }}
            >
                <ThemedView style={{ borderRadius: 8, borderWidth: 2, height: "auto", minWidth: 150, alignItems: 'center' }}>
                    <ThemedText style={{ lineHeight: 50 }}>
                        {isCardInList(props.card.in_game_id, player?.card_hand) && <MaterialCommunityIcons name="reload-alert" size={50} />}
                        {isCardInList(props.card.in_game_id, player?.card_retry) && <MaterialCommunityIcons name="reload" size={50} />}
                    </ThemedText>
                </ThemedView>
            </Pressable>
        )
    }

    return (
        <View style={{ gap: 2 }}>
            <View style={{ borderColor: 'red', borderWidth: 1, height: 160, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                {!player.card_retry ?
                    <ThemedText style={{ lineHeight: 60, fontSize: 32 }}>Cartas para trocar</ThemedText> :
                    <DefaultContainer
                        card_size="medium"
                        cards={player.card_retry!}
                        card_action_component={[<CardRetry card={selectedCardRetry!} />]}
                        get_selected_card={setSelectedCardRetry}
                        show_modal={showModal && Boolean(selectedCardRetry)}
                        set_show_modal={setShowModal}
                    />
                }
            </View>
            <View style={{ borderColor: 'green', borderWidth: 1, height: 160, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                {player!.card_hand!.length < 1 ?
                    <ThemedText style={{ lineHeight: 60, fontSize: 32 }}>Sem cartas na mão</ThemedText> :
                    <DefaultContainer
                        card_size="medium"
                        cards={player!.card_hand!}
                        card_action_component={[<CardRetry card={selectedCard!} />]}
                        get_selected_card={setSelectedCard}
                        show_modal={showModal && Boolean(selectedCard)}
                        set_show_modal={setShowModal}
                    />
                }
            </View>
        </View>
    )
}

