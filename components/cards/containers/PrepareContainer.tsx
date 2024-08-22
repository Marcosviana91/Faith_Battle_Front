import { ThemedText } from "@/components/themed/ThemedText"
import { RootReducer } from "@/store"
import { useSelector } from "react-redux"
import DefaultContainer from "./DefaultContainer"
import { useState } from "react"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { ThemedView } from "@/components/themed/ThemedView"
import { WebSocketHook } from "react-use-websocket/dist/lib/types"
import BasicButton from "@/components/button/basic"
import { usePlayerData } from "@/hooks/usePlayerData"
import { SelectableCardsContainer } from "./SelectableCardsContainer"
import useAppWebSocket from "@/hooks/useAppWebSocket"


export default function PrepareContainer(props: { cards: CardProps[] }) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
    const WS = useAppWebSocket();
    const [selectedCard, setSelectedCard] = useState<CardProps>()
    const [selectedSubCard, setSelectedSubCard] = useState<CardProps>()
    const [showModal, setShowModal] = useState(false)

    function actionFunction(props: { card: CardProps, action_index: number }) {

        switch (props!.action_index) {
            default:
                console.log('action_index ', props!.action_index)
                OnMoveToPrepareFunction({
                    card: props.card,
                    web_socket: WS,
                    player: player!,
                    matchData: matchData!,
                })
                break
        }
    }

    console.log('selectedCard: ', selectedCard)
    console.log('selectedSubCard: ', selectedSubCard)
    return (
        <DefaultContainer
            card_size="minimum"
            cards={props.cards}
            card_action_component={[
                selectedCard?.card_type === 'artifact'
                    ? <OnEquipItem card={selectedCard!} get_selected_card={setSelectedSubCard} selected_card={selectedSubCard} set_show_modal={setShowModal} />
                    : <OnMoveToPrepare card={selectedCard!} />
            ]}
            card_action_function={
                selectedCard?.card_type === 'artifact'
                    ? actionFunction
                    : undefined
            }
            get_selected_card={setSelectedCard}
            show_modal={showModal}
            set_show_modal={setShowModal}
        />
    )
}

function OnEquipItem(props: { card: CardProps, get_selected_card?: (card: CardProps) => void, selected_card?: CardProps, set_show_modal: (showModal: boolean)=>void }) {
    const WS = useAppWebSocket();
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
    const playerData = usePlayerData(player.id)
    const heroes_in_prepare_camp = playerData.card_prepare_camp ? playerData.card_prepare_camp.filter(card => card.card_type === 'hero') : []

    if (matchData.player_turn !== player.id || props.card.status !== 'ready') {
        return null
    }
    if (String(player.id) !== props.card.in_game_id!.split('_')[0]) {
        return null
    }
    return (
        <>
            <ThemedView style={{ height: "auto", width: "auto" }}>
                <SelectableCardsContainer cards={heroes_in_prepare_camp} get_selected_card={props.get_selected_card} selected_card={props.selected_card} />
            </ThemedView>
            <BasicButton
                disabled={!(props.selected_card)}
                onPress={() => {
                    console.log(`EQUIPAR: ${props.card.in_game_id} em ${props.selected_card?.in_game_id}`)
                    WS.sendJsonMessage({
                        "data_type": "match_move",
                        "user_data": {
                            "id": player.id
                        },
                        "room_data": {
                            "id": matchData.id
                        },
                        "match_move": {
                            "match_id": matchData.id,
                            "round_match": matchData.round_match,
                            "player_move": player.id,
                            "card_id": props.card.in_game_id,
                            "move_type": "attach",
                            "card_target": props.selected_card?.in_game_id
                        }
                    })
                }}
            >EQUIPAR</BasicButton>
        </>
    )

}

function OnMoveToPrepare(props: { card: CardProps }) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!

    if (matchData.player_turn !== player.id || props.card.status !== 'ready') {
        return null
    }
    if (String(player.id) !== props.card.in_game_id!.split('_')[0]) {
        return null
    }
    return (
        <ThemedView style={{ borderRadius: 8, borderWidth: 2, height: "auto", minWidth: 150, alignItems:'center' }}>
            <ThemedText style={{ lineHeight: 50 }}>
                <MaterialCommunityIcons name="arrow-up" size={50} s />
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

    if (props.matchData?.player_turn !== props.player?.id || props.card.status !== 'ready') {
        return null
    }
    if (props.card.card_type === "artifact") {
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
