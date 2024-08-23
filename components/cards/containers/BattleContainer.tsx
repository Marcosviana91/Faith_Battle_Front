import { ThemedText } from "@/components/themed/ThemedText"
import { RootReducer } from "@/store"
import { isCardInList } from "@/hooks/useCards";
import { useDispatch, useSelector } from "react-redux"
import DefaultContainer from "./DefaultContainer"
import { useState } from "react"

import { MaterialCommunityIcons } from "@expo/vector-icons"
import { ThemedView } from "@/components/themed/ThemedView"
import useAppWebSocket from "@/hooks/useAppWebSocket"
import { toggleCardsToFight } from "@/store/reducers/matchReducer"
import { DaviToggleAttack } from "../cardsComands/davi";
import { Pressable } from "react-native";


export default function BattleContainer(props: { cards: CardProps[] }) {
    const dispatch = useDispatch()
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
    const cards_to_fight = useSelector((state: RootReducer) => state.matchReducer.player_match_settings)?.cards_to_fight!

    const WS = useAppWebSocket();
    const [selectedCard, setSelectedCard] = useState<CardProps>()
    const [showModal, setShowModal] = useState(false)


    function OnRetreatToPrepare() {
        const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!
        const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
        const cards_to_fight = useSelector((state: RootReducer) => state.matchReducer.player_match_settings)?.cards_to_fight!
        const WS = useAppWebSocket();

        if (matchData.player_turn !== player.id || isCardInList(selectedCard!.in_game_id, cards_to_fight)) {
            return null
        }
        if (String(player.id) !== selectedCard!.in_game_id!.split('_')[0]) {
            return null
        }
        return (
            <Pressable
                onPress={() => {
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
                            "card_id": selectedCard!.in_game_id,
                            "move_type": "retreat_to_prepare"
                        }
                    })
                    setShowModal(false)
                }}
            >
                <ThemedView style={{ borderRadius: 8, borderWidth: 2, height: "auto", minWidth: 150, alignItems: 'center' }}>
                    <ThemedText style={{ lineHeight: 50 }}>
                        <MaterialCommunityIcons name="arrow-down" size={50} />
                    </ThemedText>
                </ThemedView>
            </Pressable>
        )
    }

    function OnMoveToFight() {
        const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!
        const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
        const cards_to_fight = useSelector((state: RootReducer) => state.matchReducer.player_match_settings)?.cards_to_fight!

        if (matchData.player_turn !== player.id) {
            return null
        }

        if (String(player.id) !== selectedCard!.in_game_id!.split('_')[0]) {
            return null
        }

        if (selectedCard!.slug === 'davi' && !isCardInList(selectedCard!.in_game_id, cards_to_fight)) {
            return <DaviToggleAttack card={selectedCard!} setShowModal={setShowModal} />
        }

        if (isCardInList(selectedCard!.in_game_id, cards_to_fight)) {
            return (
                <Pressable
                    onPress={() => {
                        if (selectedCard!.slug === 'davi' && !isCardInList(selectedCard!.in_game_id, cards_to_fight)) {
                            return
                        }
                        console.log('alternar modo de ataque')
                        dispatch(toggleCardsToFight(selectedCard!))
                        setShowModal(false)
                    }}
                >
                    <ThemedView style={{ borderRadius: 8, borderWidth: 2, height: "auto", minWidth: 150, alignItems: 'center' }}>
                        <ThemedText style={{ lineHeight: 50 }}>
                            <MaterialCommunityIcons name="cancel" size={50} s />
                        </ThemedText>
                    </ThemedView>
                </Pressable>
            )
        }

        return (
            <Pressable
                onPress={() => {
                    if (selectedCard!.slug === 'davi' && !isCardInList(selectedCard!.in_game_id, cards_to_fight)) {
                        return
                    }
                    console.log('alternar modo de ataque')
                    dispatch(toggleCardsToFight(selectedCard!))
                    setShowModal(false)
                }}
            >

                <ThemedView style={{ borderRadius: 8, borderWidth: 2, height: "auto", minWidth: 150, alignItems: 'center' }}>
                    <ThemedText style={{ lineHeight: 50 }}>
                        <MaterialCommunityIcons name="sword" size={50} s />
                    </ThemedText>
                </ThemedView>
            </Pressable>
        )
    }

    return (
        <DefaultContainer
            card_size="minimum"
            cards={props.cards}
            card_action_component={[<OnMoveToFight />, <OnRetreatToPrepare />]}
            get_selected_card={setSelectedCard}
            show_modal={showModal}
            set_show_modal={setShowModal}
        />
    )
}

