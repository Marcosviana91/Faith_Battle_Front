import { useState } from "react";
import { useSelector } from "react-redux";
import { Pressable } from "react-native";

import { Feather } from "@expo/vector-icons";

import { RootReducer } from "@/store";
import useAppWebSocket from "@/hooks/useAppWebSocket";
import { usePlayerData } from "@/hooks/usePlayerData";

import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { SelectableCardsContainer } from "../containers/SelectableCardsContainer";
import BasicButton from "@/components/button/basic";


type Props = {
    card: CardProps,
    setShowModal: (showModal: boolean) => void,
}

export function OnInvoke(props: Props) {
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!
    const WS = useAppWebSocket()

    return (
        <Pressable
            onPress={() => {
                console.log("Invocou milagre " + props.card.in_game_id)
                WS.sendJsonMessage({
                    "data_type": "match_move",
                    "user_data": {
                        "id": player.id
                    },
                    "room_data": {
                        "id": matchData.id
                    },
                    "match_move": {
                        "match_id": matchData?.id,
                        "round_match": matchData.round_match,
                        "player_move": player.id,
                        "card_id": props.card.in_game_id,
                        "move_type": "move_to_prepare"
                    }
                })
                props.setShowModal(false);
            }}
        >
            <ThemedView style={{ borderRadius: 8, borderWidth: 2, height: "auto", minWidth: 150, alignItems: 'center' }}>
                <ThemedText style={{ lineHeight: 50 }}>
                    <Feather name="layers" size={50} />
                </ThemedText>
            </ThemedView>
        </Pressable>
    )
}
