import { RootReducer } from "@/store"
import { useSelector } from "react-redux"
import DefaultContainer from "./DefaultContainer"
import { useState } from "react"

import { OnMoveToBattle as HeroOnMoveToBattle } from "../cardsComands/heros"
import { OnAttach as ArtifacOnAttach } from "../cardsComands/artifacts"


export default function PrepareContainer(props: { cards: CardProps[] }) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
    const [selectedCard, setSelectedCard] = useState<CardProps>()
    const [showModal, setShowModal] = useState(false)

    function OnMoveToPrepare() {
        if ((matchData.player_turn !== player.id) || selectedCard!.status !== 'ready') {
            return null
        }

        switch (selectedCard!.card_type) {
            case "hero":
                return (
                    <HeroOnMoveToBattle card={selectedCard!} setShowModal={setShowModal} />
                )
            case "artifact":
                return (
                    <ArtifacOnAttach card={selectedCard!} setShowModal={setShowModal} />
                )
        }
    }
    return (
        <DefaultContainer
            card_size="minimum"
            cards={props.cards}
            card_action_component={<OnMoveToPrepare />}
            get_selected_card={setSelectedCard}
            show_modal={showModal}
            set_show_modal={setShowModal}
            show_action_in_bottom={selectedCard?.card_type === 'artifact'}
        />
    )
}
