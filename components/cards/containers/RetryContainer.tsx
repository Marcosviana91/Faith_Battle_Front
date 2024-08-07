import { ThemedText } from "@/components/themed/ThemedText"
import { RootReducer } from "@/store"
import { Pressable, View, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import DefaultContainer from "./DefaultContainer"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useState } from "react"
import { isSlugInCardList } from "@/hooks/useCards"
import { setPlayer } from "@/store/reducers/matchReducer"
import { ThemedView } from "@/components/themed/ThemedView"

export default function RetryContainer() {
    const dispatch = useDispatch()
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
    const [actualCardSlug, setActualCardSlug] = useState('TESTE')

    function actionFunction(props: { card_slug: string; }) {
        if (player.deck_try! < 3) {
            const altered_card_list = useCardRetryFunction({ card_slug: props.card_slug, player_card_hand: player.card_hand!, player_card_retry: player.card_retry! })
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
                        card_action_component={<CardRetry card_slug={actualCardSlug} />}
                        card_action_function={actionFunction}
                        get_selected_card={(card_index) => {
                            const card_slug = player!.card_retry![card_index].slug
                            setActualCardSlug(card_slug)
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
                        card_action_component={<CardRetry card_slug={actualCardSlug} />}
                        card_action_function={actionFunction}
                        get_selected_card={(card_index) => {
                            const card_slug = player!.card_hand![card_index].slug
                            setActualCardSlug(card_slug)
                        }}
                    />
                }
            </View>
        </View>
    )
}

function CardRetry(props: { card_slug?: string }) {
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
                {isSlugInCardList(props.card_slug, player?.card_hand) && <MaterialCommunityIcons name="reload-alert" size={80} />}
                {isSlugInCardList(props.card_slug, player?.card_retry) && <MaterialCommunityIcons name="reload" size={80} />}
            </ThemedText>
        </ThemedView>
    )
}

function useCardRetryFunction(props: {
    card_slug: string,
    player_card_retry: CardProps[],
    player_card_hand: CardProps[]
}) {
    var hand_cards: CardProps[] = []
    var retry_cards: CardProps[] = []

    if (isSlugInCardList(props.card_slug, props.player_card_hand)) {
        props.player_card_hand.map(card => {
            if (card.slug == props.card_slug) {
                retry_cards = props.player_card_retry ? [...props.player_card_retry, card] : [card]
            } else {
                hand_cards = [...hand_cards, card]
            }
        })

    }
    else if (isSlugInCardList(props.card_slug, props.player_card_retry)) {
        props.player_card_retry.map(card => {
            if (card.slug == props.card_slug) {
                hand_cards = [...props.player_card_hand, card]
            } else {
                retry_cards = [...retry_cards, card]
            }
        })
    }
    return { card_retry: retry_cards, card_hand: hand_cards }
}

