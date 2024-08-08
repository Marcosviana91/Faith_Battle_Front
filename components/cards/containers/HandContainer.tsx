import { ThemedText } from "@/components/themed/ThemedText"
import { RootReducer } from "@/store"
import { View } from "react-native"
import { useSelector } from "react-redux"
import DefaultContainer from "./DefaultContainer"
import { useEffect, useState } from "react"
import useWebSocket from "react-use-websocket"
import { URI } from "@/store/server_urls"
import { OnInvoke as HeroOnInvoke, OnInvokeDefaultAction } from "../cardsComands/heros"
import { OnInvoke as MiracleOnInvoke } from "../cardsComands/miracles"


export default function HandContainer() {
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
    const [selectedCard, setSelectedCard] = useState<CardProps>()
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const WS = useWebSocket(`ws://${URI}/ws/`, { share: true });

    function actionFunction(props: { card: CardProps, action_index: number }) {

        switch (props!.action_index) {
            default:
                console.log('action_index ', props!.action_index)
                OnInvokeDefaultAction({
                    card: props.card,
                    web_socket: WS,
                    player: player!,
                    matchData: matchData!,
                })
                break
        }
    }
    return (
        <View style={{ borderColor: 'green', borderWidth: 1, height: 100, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
            {player!.card_hand!.length < 1 ?
                <ThemedText style={{ lineHeight: 60, fontSize: 32 }}>Sem cartas na mão</ThemedText> :
                <DefaultContainer
                    card_size="small"
                    cards={player!.card_hand!}
                    card_action_component={[<OnInvoke card={selectedCard!} />]}
                    card_action_function={actionFunction}
                    get_selected_card={setSelectedCard}
                />
            }
        </View>
    )
}

function OnInvoke(props: { card: CardProps }) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!

    // if (matchData.player_focus_id !== player.id) {
    //     return null
    // }

    switch (props.card.card_type) {
        case "hero":
            return (
                <HeroOnInvoke card={props.card} />
            )
        case "miracle":
            return null; (
                <MiracleOnInvoke card={props.card} />
            )
    }

}
