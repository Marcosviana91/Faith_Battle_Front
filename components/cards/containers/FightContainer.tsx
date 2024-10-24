import { RootReducer } from "@/store"
import { usePlayerData } from "@/hooks/usePlayerData";
import { useScreenSizes } from "@/hooks/useScreenSizes";
import { useDispatch, useSelector } from "react-redux"
import DefaultContainer from "./DefaultContainer"
import { useState, useEffect } from "react"

import { MaterialCommunityIcons } from "@expo/vector-icons"
import { setCardsToFight, toggleCardsToFight } from "@/store/reducers/matchReducer"
import { SubCardsContainer } from "@/components/cards/containers/subContainer";
import { Platform, Pressable, StyleProp, ToastAndroid, View, ViewStyle } from "react-native";
import { ThemedText } from "@/components/themed/ThemedText";

import { OnInvoke as HeroOnInvoke } from "../cardsComands/heros"
import { OnInvoke as MiracleOnInvoke } from "../cardsComands/miracles"
import { OnInvoke as SinOnInvoke } from "../cardsComands/sins"


export default function FightContainer(props: { cards: CardProps[], attacking?: Boolean, defensing?: Boolean }) {
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
        if (selectedCard?.imbloqueavel) {
            if (Platform.OS === "android") {
                ToastAndroid.show('Este herói não pode ser bloqueado!', ToastAndroid.SHORT);
            }
            else {
                window.alert('Este herói não pode ser bloqueado!')
            }
            return
        }
        const not_defense = { slug: 'not-defense' }
        const sub_card = player_in_match!.card_battle_camp![selectedSubCardIndex!]

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

    function OnInvoke() {
        if ( selectedCard!.status !== 'ready') {
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
            case "sin":
                return (
                    <SinOnInvoke card={selectedCard!} setShowModal={setShowModal} />
                )
        }
    }
    return (
        <DefaultContainer
            card_size="small"
            cards={props.cards}
            card_action_component={[props.attacking && <OnCardToggleDefense parent_card={selectedCard!} player_in_match={player_in_match!} get_selected_card_index={setSelectedSubCardIndex} dispatchCardAction={actionFunction} style={{ maxWidth: windowsWidth * 0.95 }} />, props.defensing && <OnInvoke/>]}
            get_selected_card={setSelectedCard}
            show_action_in_bottom={props.defensing? false: true}
            show_modal={showModal}
            set_show_modal={setShowModal}
        />
    )
}

function OnCardToggleDefense(props: {parent_card: CardProps, player_in_match: PlayersInMatchApiProps, get_selected_card_index: (card_index: number) => void, dispatchCardAction: () => void, style?: StyleProp<ViewStyle> }) {
    const _card_in_battle_camp_without_artifacts = props.player_in_match.card_battle_camp?.filter(card => (card.card_type !== "artifact"))

    return (
        <View style={props.style}>
            {props.parent_card.imbloqueavel ?
            <ThemedText type="subtitle">Este herói não pode ser bloqueado!</ThemedText>:
            <SubCardsContainer cards={_card_in_battle_camp_without_artifacts} get_selected_card={(_index) =>{
                const _selected_card_id = _card_in_battle_camp_without_artifacts![_index].in_game_id
                const _battle_card_id = props.player_in_match.card_battle_camp?.findIndex(card => card.in_game_id === _selected_card_id)
                props.get_selected_card_index(_battle_card_id!)
            }} cards_action={<Pressable onPress={() => props.dispatchCardAction()}>
                <MaterialCommunityIcons name="shield-sword" size={80} color="black" />
            </Pressable>} />
            
            }
        </View>

    )
}
