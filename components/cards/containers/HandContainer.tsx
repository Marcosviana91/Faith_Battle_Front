import { useState } from "react"
import { View } from "react-native"
import { useSelector } from "react-redux"
import { RootReducer } from "@/store"

import useAppWebSocket from "@/hooks/useAppWebSocket"
import { useScreenSizes } from "@/hooks/useScreenSizes"

import DefaultContainer from "./DefaultContainer"
import { ThemedText } from "@/components/themed/ThemedText"

import { OnInvoke as HeroOnInvoke, OnInvokeDefaultAction as HeroOnInvokeAction } from "../cardsComands/heros"
import { OnInvoke as MiracleOnInvoke, OnInvokeDefaultAction as MiracleOnInvokeAction } from "../cardsComands/miracles"
import { OnInvoke as ArtifactOnInvoke, OnInvokeDefaultAction as ArtifactOnInvokeAction } from "../cardsComands/artifacts"


export default function HandContainer() {
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
    const [selectedCard, setSelectedCard] = useState<CardProps>()
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const WS = useAppWebSocket()
    const { height: windowHeight } = useScreenSizes()
    const [showModal, setShowModal] = useState(false)

    function actionFunction(props: { card: CardProps, action_index: number }) {

        switch (props!.card.card_type) {
            case "miracle":
                MiracleOnInvokeAction({
                    card: props.card,
                    web_socket: WS,
                    player: player!,
                    matchData: matchData!,
                })
                break
            case "hero":
                HeroOnInvokeAction({
                    card: props.card,
                    web_socket: WS,
                    player: player!,
                    matchData: matchData!,
                })
                break
            case "artifact":
                ArtifactOnInvokeAction({
                    card: props.card,
                    web_socket: WS,
                    player: player!,
                    matchData: matchData!,
                })
                break
        }
    }
    return (
        <View style={{ borderColor: 'green', borderWidth: 1, height: (windowHeight / 6) + 8, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
            {player!.card_hand!.length < 1 ?
                <ThemedText style={{ lineHeight: 60, fontSize: 32 }}>Sem cartas na mão</ThemedText> :
                <DefaultContainer
                    card_size="small"
                    cards={player!.card_hand!}
                    card_action_component={[<OnInvoke card={selectedCard!} />]}
                    card_action_function={actionFunction}
                    get_selected_card={setSelectedCard}
                    show_modal={showModal}
                    set_show_modal={setShowModal}
                />
            }
        </View>
    )
}

function OnInvoke(props: { card: CardProps }) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!

    if ((matchData.player_turn !== player.id) || props.card.status !== 'ready') {
        return null
    }

    switch (props.card.card_type) {
        case "hero":
            return (
                <HeroOnInvoke card={props.card} />
            )
        case "miracle":
            return (
                <MiracleOnInvoke card={props.card} />
            )
        case "artifact":
            return (
                <ArtifactOnInvoke card={props.card} />
            )
    }

}
