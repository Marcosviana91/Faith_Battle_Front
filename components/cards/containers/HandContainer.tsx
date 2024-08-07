import { ThemedText } from "@/components/themed/ThemedText"
import { RootReducer } from "@/store"
import { Pressable, View, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import DefaultContainer from "./DefaultContainer"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useState } from "react"
import { ThemedView } from "@/components/themed/ThemedView"
import useWebSocket from "react-use-websocket"
import { URI } from "@/store/server_urls"
import { getCardInList } from "@/hooks/useCards"
import { OnInvoke as HeroOnInvoke } from "../cardsComands/heros"
import { OnInvoke as MiracleOnInvoke } from "../cardsComands/miracles"


export default function HandContainer() {
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
    const [actualCardInGameId, setActualCardInGameId] = useState('TESTE')

    return (
        <View style={{ borderColor: 'green', borderWidth: 1, height: 100, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
            {player!.card_hand!.length < 1 ?
                <ThemedText style={{ lineHeight: 60, fontSize: 32 }}>Sem cartas na mão</ThemedText> :
                <DefaultContainer
                    card_size="small"
                    cards={player!.card_hand!}
                    card_action={<OnInvoke in_game_id={actualCardInGameId} />}
                    get_selected_card={(card_index) => {
                        const card_in_game_id = player!.card_hand![card_index].in_game_id!
                        setActualCardInGameId(card_in_game_id)
                    }}
                />
            }
        </View>
    )
}

function OnInvoke(props: { in_game_id?: string }) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!

    // if (matchData.player_focus_id !== player.id) {
    //     return null
    // }

    const card = getCardInList(props.in_game_id, player.card_hand)!

    switch (card.card_type) {
        case "hero":
            return (
                <HeroOnInvoke card={card} />
            )
        case "miracle":
            return (
                <MiracleOnInvoke card={card} />
            )
    }

}
