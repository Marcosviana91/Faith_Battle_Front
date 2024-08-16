import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Pressable, View, Text } from "react-native"

import { RootReducer } from "@/store"
import { setPlayer } from "@/store/reducers/matchReducer"

import { isSlugInCardList } from "@/hooks/useCards"

import { MaterialCommunityIcons } from "@expo/vector-icons"

import DefaultContainer from "./DefaultContainer"

import { ThemedText } from "@/components/themed/ThemedText"
import { ThemedView } from "@/components/themed/ThemedView"

export default function RetryContainer() {
    const dispatch = useDispatch()
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
    const [selectedCard, setSelectedCard] = useState<CardProps>()
    const [showModal, setShowModal] = useState(false)

    function actionFunction(props: { card: CardProps, action_index: number }) {
        if (player.deck_try! < 3) {
            var hand_cards: CardProps[] = []
            var retry_cards: CardProps[] = []

            switch (props.action_index) {
                case 0:
                    if (isSlugInCardList(props.card.slug, player.card_hand)) {
                        player.card_hand!.map(card => {
                            if (card.slug == props.card.slug) {
                                retry_cards = player.card_retry ? [...player.card_retry, card] : [card]
                            } else {
                                hand_cards = [...hand_cards, card]
                            }
                        })

                    }
                    else if (isSlugInCardList(props.card.slug, player.card_retry)) {
                        player.card_retry!.map(card => {
                            if (card.slug == props.card.slug) {
                                hand_cards = [...player.card_hand!, card]
                            } else {
                                retry_cards = [...retry_cards, card]
                            }
                        })
                    }
                    dispatch(setPlayer({
                        ...player!, card_retry: retry_cards, card_hand: hand_cards
                    }))
                    break
                default:
                    console.log('action_index ', props.action_index)
                    break
            }
        }
    }

    return (
        <View style={{ gap: 2 }}>
            <View style={{ borderColor: 'red', borderWidth: 1, height: 160, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                {!player.card_retry ?
                    <ThemedText style={{ lineHeight: 60, fontSize: 32 }}>Cartas para trocar</ThemedText> :
                    <DefaultContainer
                        card_size="medium"
                        cards={player.card_retry!}
                        card_action_component={[<CardRetry card={selectedCard!} />]}
                        card_action_function={actionFunction}
                        get_selected_card={setSelectedCard}
                        show_modal={showModal}
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
                        card_action_function={actionFunction}
                        get_selected_card={setSelectedCard}
                        show_modal={showModal}
                        set_show_modal={setShowModal}
                    />
                }
            </View>
        </View>
    )
}
function CardRetry(props: { card: CardProps }) {

    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)

    if (player?.deck_try! >= 3) {
        return (
            <View style={{ borderRadius: 8, marginTop: 8 }}>
                <MaterialCommunityIcons name="block-helper" size={80} color="black" />
            </View>
        )
    }
    return (
        <ThemedView style={{ borderRadius: 8, borderWidth: 2, height: "auto", width: "auto" }}>
            <ThemedText style={{ lineHeight: 80 }}>
                {isSlugInCardList(props.card.slug, player?.card_hand) && <MaterialCommunityIcons name="reload-alert" size={80} />}
                {isSlugInCardList(props.card.slug, player?.card_retry) && <MaterialCommunityIcons name="reload" size={80} />}
            </ThemedText>
        </ThemedView>
    )
}
