import { ThemedText } from "@/components/themed/ThemedText"
import { RootReducer } from "@/store"
import { View } from "react-native"
import { useSelector } from "react-redux"
import DefaultContainer from "./DefaultContainer"
import { useEffect, useState } from "react"
import useWebSocket from "react-use-websocket"
import { URI } from "@/store/server_urls"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { ThemedView } from "@/components/themed/ThemedView"
import { WebSocketHook } from "react-use-websocket/dist/lib/types"


export default function BattleContainer(props: { cards: CardProps[] }) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
    const WS = useWebSocket(`ws://${URI}/ws/`, { share: true });
    const [selectedCard, setSelectedCard] = useState<CardProps>()

    function actionFunction(props: { card: CardProps, action_index: number }) {

        switch (props!.action_index) {
            case 0:
                console.log('action_index ', props!.action_index)
                console.log('atacar')

                break
            case 1:
                console.log('action_index ', props!.action_index)
                console.log('recuar')

                break
        }
    }
    return (
        <DefaultContainer
            card_size="minimum"
            cards={props.cards}
            card_action_component={[<OnMoveToFight />, <OnRetreatToPrepare />]}
            card_action_function={actionFunction}
            get_selected_card={setSelectedCard}
        />
    )
}

function OnMoveToFight() {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!

    if (matchData.player_turn !== player.id) {
        return null
    }
    return (
        <ThemedView style={{ borderRadius: 8, borderWidth: 2, height: "auto", width: "auto" }}>
            <ThemedText style={{ lineHeight: 80 }}>
                <MaterialCommunityIcons name="sword" size={80} s />
            </ThemedText>
        </ThemedView>
    )
}

function OnRetreatToPrepare() {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!

    if (matchData.player_turn !== player.id) {
        return null
    }
    return (
        <ThemedView style={{ borderRadius: 8, borderWidth: 2, height: "auto", width: "auto" }}>
            <ThemedText style={{ lineHeight: 80 }}>
                <MaterialCommunityIcons name="arrow-down" size={80} s />
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

export function OnMoveToPrepareFunction(props: Props) {

    if (props.matchData?.player_turn !== props.player?.id) {
        return null
    }

    props.web_socket.sendJsonMessage({
        "data_type": "match_move",
        "user_data": {
            "id": props.player?.id
        },
        "room_data": {
            "id": props.matchData?.id
        },
        "match_move": {
            "match_id": props.matchData?.id,
            "round_match": props.matchData?.round_match,
            "player_move": props.player?.id,
            "card_id": props.card.in_game_id,
            "move_type": "move_to_battle"
        }
    })

}
