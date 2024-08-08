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

    function actionFunction(props: { card: CardProps; }) {
        if (player.deck_try! < 3) {
            const altered_card_list = useCardRetryFunction({ card: props.card, player_card_hand: player.card_hand!, player_card_retry: player.card_retry! })
            dispatch(setPlayer({
                ...player!, card_retry: altered_card_list.card_retry, card_hand: altered_card_list.card_hand
            }))
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
                        card_action_component={<CardRetry card={selectedCard!} />}
                        card_action_function={actionFunction}
                        get_selected_card={(card) => {
                            setSelectedCard(card)
                        }}
                    />
                }
            </View>
            <View style={{ borderColor: 'green', borderWidth: 1, height: 160, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                {player!.card_hand!.length < 1 ?
                    <ThemedText style={{ lineHeight: 60, fontSize: 32 }}>Sem cartas na mão</ThemedText> :
                    <DefaultContainer
                        card_size="medium"
                        cards={player!.card_hand!}
                        card_action_component={<CardRetry card={selectedCard!} />}
                        card_action_function={actionFunction}
                        get_selected_card={(card) => {
                            setSelectedCard(card)
                        }}
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
        <ThemedView style={{ borderRadius: 8, borderWidth: 2, height: "auto", width: "auto", marginVertical: 24 }}>

            <ThemedText style={{ lineHeight: 80 }}>
                {isSlugInCardList(props.card.slug, player?.card_hand) && <MaterialCommunityIcons name="reload-alert" size={80} />}
                {isSlugInCardList(props.card.slug, player?.card_retry) && <MaterialCommunityIcons name="reload" size={80} />}
            </ThemedText>
        </ThemedView>
    )
}

function useCardRetryFunction(props: {
    card: CardProps,
    player_card_retry: CardProps[],
    player_card_hand: CardProps[]
}) {
    var hand_cards: CardProps[] = []
    var retry_cards: CardProps[] = []

    if (isSlugInCardList(props.card.slug, props.player_card_hand)) {
        props.player_card_hand.map(card => {
            if (card.slug == props.card.slug) {
                retry_cards = props.player_card_retry ? [...props.player_card_retry, card] : [card]
            } else {
                hand_cards = [...hand_cards, card]
            }
        })

    }
    else if (isSlugInCardList(props.card.slug, props.player_card_retry)) {
        props.player_card_retry.map(card => {
            if (card.slug == props.card.slug) {
                hand_cards = [...props.player_card_hand, card]
            } else {
                retry_cards = [...retry_cards, card]
            }
        })
    }
    return { card_retry: retry_cards, card_hand: hand_cards }
}

