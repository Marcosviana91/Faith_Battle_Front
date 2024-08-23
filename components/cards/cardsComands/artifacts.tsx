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


export function OnAttach(props: Props) {
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!
    const playerInMatchData = usePlayerData(player.id)
    const [selectedCard, setSelectedCard] = useState<CardProps>()
    const WS = useAppWebSocket()

    if (matchData.player_turn !== player.id || props.card.status !== 'ready') {
        return null
    }
    if (String(player.id) !== props.card.in_game_id!.split('_')[0]) {
        return null
    }
    const heros_in_prepare = playerInMatchData.card_prepare_camp?.filter(_card => _card.card_type === 'hero')
    if (!heros_in_prepare || heros_in_prepare.length < 1) {
        return null
    }
    return (
        <ThemedView style={{ borderRadius: 20, borderWidth: 2, backgroundColor: '#fff4', gap: 16, padding: 4 }}>
            <BasicButton
                disabled={!selectedCard}
                onPress={() => {
                    console.log(`Equipar ${props.card.in_game_id} no herói ${selectedCard?.in_game_id}`)
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
                            "move_type": "attach",
                            "card_target": selectedCard?.in_game_id
                        }
                    })
                    props.setShowModal(false)
                }}
            >EQUIPAR</BasicButton>
            <SelectableCardsContainer cards={heros_in_prepare} selected_card={selectedCard} set_selected_card={setSelectedCard} />
        </ThemedView>
    )
}