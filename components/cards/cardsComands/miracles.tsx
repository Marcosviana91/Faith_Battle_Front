import { WebSocketHook } from 'react-use-websocket/dist/lib/types';

import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { ThemedView } from '@/components/themed/ThemedView';
import { ThemedText } from '@/components/themed/ThemedText';


type Props = {
    onPress?: () => void
    card: CardProps
}

export function OnInvoke(props: Props) {
    return (
        <ThemedView style={{ borderRadius: 8, borderWidth: 2, height: "auto", width: "auto", marginVertical: 24 }}>
            <ThemedText style={{ lineHeight: 80 }}>
                <SimpleLineIcons name="magic-wand" size={80} />
            </ThemedText>
        </ThemedView>
    )
}

export function OnInvokeDefaultAction(props: { card: CardProps, matchData: MatchApiProps, player: PlayersInMatchApiProps, web_socket: WebSocketHook<unknown, MessageEvent<any> | null> }) {
    console.log("Invocou milagre " + props.card.in_game_id)
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