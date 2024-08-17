import { RootReducer } from "@/store"
import { usePlayerData } from "@/hooks/usePlayerData";
import { useScreenSizes } from "@/hooks/useScreenSizes";
import { useDispatch, useSelector } from "react-redux"
import DefaultContainer from "./DefaultContainer"
import { useState, useEffect } from "react"

import { MaterialCommunityIcons } from "@expo/vector-icons"
import { setCardsToFight, toggleCardsToFight } from "@/store/reducers/matchReducer"
import { SubCardsContainer } from "@/components/cards/containers/subContainer";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";


export default function FightContainer(props: { cards: CardProps[], attacking?: Boolean }) {
    const dispatch = useDispatch()
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)!
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!
    const cards_to_fight = useSelector((state: RootReducer) => state.matchReducer.player_match_settings)?.cards_to_fight
    const fight_camp = matchData?.fight_camp
    const player_in_match = usePlayerData(player.id)
    const { width: windowsWidth } = useScreenSizes()

    const [selectedCard, setSelectedCard] = useState<CardProps>()
    const [selectedSubCardIndex, setSelectedSubCardIndex] = useState<number>()
    const [showModal, setShowModal] = useState(false)

    function actionFunction() {
        const not_defense = { slug: 'not-defense' }
        const sub_card = player_in_match.card_battle_camp![selectedSubCardIndex!]

        let __temp_list = cards_to_fight!.map(_card => _card)
        const target_index = fight_camp?.attack_cards?.findIndex(_card => _card.in_game_id === selectedCard!.in_game_id)
        if (sub_card && typeof target_index == 'number') {
            const _index = __temp_list.findIndex(_card => _card.in_game_id === sub_card.in_game_id)
                if (_index === target_index) {
                    __temp_list![_index] = not_defense
                } else if ( _index >= 0) {
                    __temp_list![_index] = not_defense
                    __temp_list![target_index] = sub_card
                } else {
                    __temp_list![target_index] = sub_card
                }
        }
        dispatch(setCardsToFight(__temp_list))
        setShowModal(false)

    }
    return (
        <DefaultContainer
            card_size="medium"
            cards={props.cards}
            card_action_component={[props.attacking && <OnCardToggleDefense player_in_match={player_in_match} get_selected_card_index={setSelectedSubCardIndex} dispatchCardAction={actionFunction} style={{ maxWidth: windowsWidth * 0.95 }} />]}
            get_selected_card={setSelectedCard}
            show_action_in_bottom
            show_modal={showModal}
            set_show_modal={setShowModal}
        />
    )
}

function OnCardToggleDefense(props: { player_in_match: PlayersInMatchApiProps, get_selected_card_index: (card_index: number) => void, dispatchCardAction: () => void, style?: StyleProp<ViewStyle> }) {
    return (
        <View style={props.style}>
            <SubCardsContainer cards={props.player_in_match.card_battle_camp} get_selected_card={props.get_selected_card_index} cards_action={<Pressable onPress={() => props.dispatchCardAction()}>
                <MaterialCommunityIcons name="shield-sword" size={80} color="black" />
            </Pressable>} />
        </View>

    )
}
