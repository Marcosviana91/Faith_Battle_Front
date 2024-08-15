import { ThemedText } from "@/components/themed/ThemedText"
import { RootReducer } from "@/store"
import { isCardInList } from "@/hooks/useCards";
import { useDispatch, useSelector } from "react-redux"
import DefaultContainer from "./DefaultContainer"
import { useState } from "react"

import { MaterialCommunityIcons } from "@expo/vector-icons"
import { ThemedView } from "@/components/themed/ThemedView"
import { WebSocketHook } from "react-use-websocket/dist/lib/types"
import useAppWebSocket from "@/hooks/useAppWebSocket"
import { toggleCardsToFight } from "@/store/reducers/matchReducer"
import { DaviToggleAttack } from "../cardsComands/davi";


export default function BattleContainer(props: { cards: CardProps[] }) {
    const dispatch = useDispatch()
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
    const cards_to_fight = useSelector((state: RootReducer) => state.matchReducer.player_match_settings)?.cards_to_fight!

    const WS = useAppWebSocket();
    const [selectedCard, setSelectedCard] = useState<CardProps>()

    function actionFunction(props: { card: CardProps, action_index: number }) {
        console.log('action_index ', props!.action_index)

        switch (props!.action_index) {
            case 0:
                if (props.card.slug === 'davi' && !isCardInList(props.card.in_game_id, cards_to_fight)) {
                    break
                }
                console.log('alternar modo de ataque')
                dispatch(toggleCardsToFight(props.card))
                break
            case 1:
                console.log('recuar')
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
                        "card_id": props.card.in_game_id,
                        "move_type": "retreat_to_prepare"
                    }
                })

                break
        }
    }
    return (
        <DefaultContainer
            card_size="minimum"
            cards={props.cards}
            card_action_component={[<OnMoveToFight card={selectedCard!} />, <OnRetreatToPrepare card={selectedCard!} />]}
            card_action_function={actionFunction}
            get_selected_card={setSelectedCard}
        />
    )
}

function OnMoveToFight(props: { card: CardProps }) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
    const cards_to_fight = useSelector((state: RootReducer) => state.matchReducer.player_match_settings)?.cards_to_fight!

    if (matchData.player_turn !== player.id) {
        return null
    }

    if (props.card.slug === 'davi' && !isCardInList(props.card.in_game_id, cards_to_fight)) {
        return <DaviToggleAttack card={props.card} />
    }

    if (isCardInList(props.card.in_game_id, cards_to_fight)) {
        return (
            <ThemedView style={{ borderRadius: 8, borderWidth: 2, height: "auto", width: "auto" }}>
                <ThemedText style={{ lineHeight: 80 }}>
                    <MaterialCommunityIcons name="cancel" size={80} s />
                </ThemedText>
            </ThemedView>
        )
    }

    return (
        <ThemedView style={{ borderRadius: 8, borderWidth: 2, height: "auto", width: "auto" }}>
            <ThemedText style={{ lineHeight: 80 }}>
                <MaterialCommunityIcons name="sword" size={80} s />
            </ThemedText>
        </ThemedView>
    )
}

function OnRetreatToPrepare(props: { card: CardProps }) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
    const cards_to_fight = useSelector((state: RootReducer) => state.matchReducer.player_match_settings)?.cards_to_fight!

    if (matchData.player_turn !== player.id || isCardInList(props.card.in_game_id, cards_to_fight)) {
        return null
    }
    return (
        <ThemedView style={{ borderRadius: 8, borderWidth: 2, height: "auto", width: "auto" }}>
            <ThemedText style={{ lineHeight: 80 }}>
                <MaterialCommunityIcons name="arrow-down" size={80} />
            </ThemedText>
        </ThemedView>
    )
}

type Props = {
    onPress?: () => void
    card: CardProps
    matchData: MatchApiProps
    player: PlayersInMatchApiProps
    web_socket: WebSocketHook<unknown, MessageEvent<any> | null>
}
