import { useState } from "react"
import { View } from "react-native"
import { useSelector } from "react-redux"

import { RootReducer } from "@/store"
import { ThemedText } from "@/components/themed/ThemedText"
import DefaultContainer from "./DefaultContainer"

import { useScreenSizes } from "@/hooks/useScreenSizes"

import { OnInvoke as MiracleOnInvoke } from "../cardsComands/miracles"
import { OnInvoke as SinOnInvoke } from "../cardsComands/sins"


export default function StackHandContainer() {
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!

    const { height: windowHeight } = useScreenSizes()

    const [selectedCard, setSelectedCard] = useState<CardProps>()
    const [showModal, setShowModal] = useState(false)

    function OnInvoke() {
        if (selectedCard!.status !== 'ready') {
            return null
        }

        switch (selectedCard!.card_type) {
            case "miracle":
                return (
                    <MiracleOnInvoke card={selectedCard!} setShowModal={setShowModal} />
                )
            case "sin":
                return (
                    <SinOnInvoke card={selectedCard!} setShowModal={setShowModal} />
                )
        }
    }

    const _card_hand_to_stack = player!.card_hand!.filter(_card => (_card.card_type === 'miracle' || _card.card_type === "sin"))

    return (
        <View style={{ borderColor: 'green', borderWidth: 1, height: (windowHeight / 6) + 8, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
            {_card_hand_to_stack.length < 1 ?
                <ThemedText style={{ lineHeight: 60, fontSize: 32, textAlign: 'center' }}>Sem cartas de milagre ou pecado na mão</ThemedText> :
                <DefaultContainer
                    card_size="small"
                    cards={_card_hand_to_stack}
                    card_action_component={[<OnInvoke />]}
                    get_selected_card={setSelectedCard}
                    show_modal={showModal}
                    set_show_modal={setShowModal}
                />
            }
        </View>
    )
}


