import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";

type OnInvokeProps = {
    card: CardProps
}

export function OnInvoke(props: OnInvokeProps) {

    return (
        <ThemedView style={{ borderRadius: 8, borderWidth: 2, height: "auto", minWidth: 150, alignItems:'center' }}>
            <ThemedText style={{ lineHeight: 50 }}>
                <MaterialCommunityIcons name="arrow-up" size={50} />
            </ThemedText>
        </ThemedView>
    )
}

export function OnInvokeDefaultAction(props: { card: CardProps, matchData: MatchApiProps, player: PlayersInMatchApiProps, web_socket: WebSocketHook<unknown, MessageEvent<any> | null> }) {
    console.log("Invocou heroi " + props.card.in_game_id)
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
            "move_type": "move_to_prepare"
        }
    })

}