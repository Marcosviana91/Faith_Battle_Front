import { useState } from "react"
import { View } from "react-native"
import { useSelector } from "react-redux"

import { RootReducer } from "@/store"
import { ThemedText } from "@/components/themed/ThemedText"
import DefaultContainer from "./DefaultContainer"

import { useScreenSizes } from "@/hooks/useScreenSizes"

import { OnInvoke as HeroOnInvoke } from "../cardsComands/heros"
import { OnInvoke as MiracleOnInvoke } from "../cardsComands/miracles"
import { OnInvoke as ArtifactOnInvoke } from "../cardsComands/artifacts"


export default function HandContainer() {
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!

    const { height: windowHeight } = useScreenSizes()

    const [selectedCard, setSelectedCard] = useState<CardProps>()
    const [showModal, setShowModal] = useState(false)

    function OnInvoke() {
        if ((matchData.player_turn !== player.id) || selectedCard!.status !== 'ready') {
            return null
        }

        switch (selectedCard!.card_type) {
            case "hero":
                return (
                    <HeroOnInvoke card={selectedCard!} setShowModal={setShowModal} />
                )
            case "miracle":
                return (
                    <MiracleOnInvoke card={selectedCard!} setShowModal={setShowModal} />
                )
            case "artifact":
                return (
                    <ArtifactOnInvoke card={selectedCard!} setShowModal={setShowModal} />
                )
        }
    }

    return (
        <View style={{ borderColor: 'green', borderWidth: 1, height: (windowHeight / 6) + 8, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
            {player!.card_hand!.length < 1 ?
                <ThemedText style={{ lineHeight: 60, fontSize: 32 }}>Sem cartas na mão</ThemedText> :
                <DefaultContainer
                    card_size="small"
                    cards={player!.card_hand!}
                    card_action_component={[<OnInvoke />]}
                    get_selected_card={setSelectedCard}
                    show_modal={showModal}
                    set_show_modal={setShowModal}
                />
            }
        </View>
    )
}


