import { useState } from "react"
import { useSelector } from "react-redux";
import { Pressable, View, Text } from "react-native"

import { RootReducer } from "@/store";

import useWebSocket from 'react-use-websocket';
import { URI } from "@/store/server_urls";

// Custom onInvoke
import { OnInvoke as EliasOnInvoke } from '@/components/cards/cardsComands/elias';
import { OnInvoke as EsterOnInvoke } from '@/components/cards/cardsComands/ester';
import { OnInvoke as MariaOnInvoke } from '@/components/cards/cardsComands/maria';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { WebSocketHook } from "react-use-websocket/dist/lib/types";

type OnInvokeProps = {
    card: CardProps
}

export function OnInvoke(props: OnInvokeProps) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const WS = useWebSocket(`ws://${URI}/ws/`, { share: true });
    const [isCustomInvoke, setCustomInvoke] = useState(false)

    const CARDS_ONINVOKE_LIST = ['elias', 'ester', 'maria']
    var render = <></>


    switch (CARDS_ONINVOKE_LIST.find((nome) => nome == props.card.slug)) {
        case 'elias':
            render = <EliasOnInvoke in_game_id={props.card.in_game_id!} />
            break;
        case 'ester':
            render = <EsterOnInvoke in_game_id={props.card.in_game_id!} />
            break;
        case 'maria':
            render = <MariaOnInvoke in_game_id={props.card.in_game_id!} />
            break;

        default:
            break;
    }

    return (
        <>
            {isCustomInvoke &&
                <>
                    {render}
                </>
            }
            <ThemedView style={{ borderRadius: 8, borderWidth: 2, height: "auto", width: "auto", marginVertical: 24 }}>
                <ThemedText style={{ lineHeight: 80 }}>
                    <MaterialCommunityIcons name="arrow-up" size={80} />
                </ThemedText>
            </ThemedView>
        </>
    )
}

export function OnInvokeDefaultAction(props: { card: CardProps, matchData: MatchApiProps, player: PlayersInMatchApiProps, web_socket: WebSocketHook<unknown, MessageEvent<any> | null> }) {
    console.log("CHAMANDO OnInvokeDefaultAction")

    // if (CARDS_ONINVOKE_LIST.find((nome) => nome == props.card.slug)) {
    //     // setCustomInvoke(true)
    // } else {
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
    // }
}