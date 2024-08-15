import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '@/store';
import { setPlayer, setCardsToFight, toggleCardsToFight } from '@/store/reducers/matchReducer';
import { isCardInList } from '@/hooks/useCards';
// Importação circular: CardsContainer
import { CardsContainer } from "@/components/cards/";

import useWebSocket from 'react-use-websocket';
import { URI } from "@/store/server_urls";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DaviToggleAttack } from './cardsComands/davi';
import { usePlayerData } from '@/hooks/usePlayerData';

type Props = {
    onPress?: () => void
    card: CardProps
    zone?: "select" | "retry" | "hand" | "prepare" | "battle" | "deck" | "forgotten_sea" | "fighting" | "will-fight"
    target_index?: number;
    target_slug?: string;
}

export function ShowCardDefense(props: Props) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)

    if (matchData?.fight_camp?.player_defense_id !== player?.id) {
        return null
    }

    return (
        // Mostrar Cartas na zona de batalha
        <View style={{ width: "100%" }}>
            {/* <SubCardsContainer
                cards={usePlayerData(player?.id!).card_battle_camp}
                cards_action={
                    <CardToggleDefense
                        card={props.card!}
                        zone={props.zone}
                        target_index={props.index}
                        onPress={() => { }} />}
            /> */}
            < CardsContainer zone="will-fight" cards={usePlayerData(player?.id!).card_battle_camp} size="medium" target_index={props.target_index} />
        </View>
    )
}

export function CardToggleDefense(props: Props) {
    const dispatch = useDispatch()
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const cards_to_fight = useSelector((state: RootReducer) => state.matchReducer.player_match_settings)?.cards_to_fight

    if (matchData?.fight_camp?.player_defense_id !== player?.id) {
        return null
    }

    const card = props.card
    const not_defense = { slug: 'not-defense' }
    const index = props.target_index!

    return (
        <Pressable
            style={{ backgroundColor: "green" }}
            onPress={() => {
                let __temp_list = cards_to_fight!.map(_card => _card)
                console.log(__temp_list)
                const _index = __temp_list.findIndex(_card => _card.in_game_id === card.in_game_id)
                if (_index === index) {
                    __temp_list![_index] = not_defense
                } else if (_index >= 0) {
                    __temp_list![_index] = not_defense
                    __temp_list![index] = card
                } else {
                    if (__temp_list![index] == card) {
                        __temp_list![index] = not_defense
                    } else {
                        __temp_list![index] = card
                    }
                }
                console.log(__temp_list!)
                dispatch(setCardsToFight(__temp_list))
                if (props.onPress) { props.onPress() }
            }}
        >
            <MaterialCommunityIcons name="shield-sword" size={80} color="black" />
        </Pressable>
    )
}

export function __changeName(props: Props) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const player_focus = matchData?.player_focus_id
    const WS = useWebSocket(`ws://${URI}/ws/`, { share: true });

    if (matchData?.player_turn !== player?.id) {
        return null
    }

    return (
        <Pressable
            style={{ backgroundColor: "red" }}
            onPress={(e) => {
                console.log(e.timeStamp)
            }}
        >
            <MaterialCommunityIcons name="arrow-up" size={80} color="black" />
        </Pressable>
    )
}