import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '@/store';
import { setPlayer, setCardsToFight, toggleCardsToFight } from '@/store/reducers/matchReducer';
import {  isCardInList } from '@/hooks/useCards';
// Importação circular: CardsContainer
import { CardsContainer } from "@/components/cards/";

import useWebSocket from 'react-use-websocket';
import { URI } from "@/store/server_urls";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { OnInvoke as EliasOnInvoke } from '@/components/cards/cardsComands/elias';
import { OnInvoke as EsterOnInvoke } from '@/components/cards/cardsComands/ester';
import { OnInvoke as MariaOnInvoke } from '@/components/cards/cardsComands/maria';
import { DaviToggleAttack } from './cardsComands/davi';

type Props = {
    onPress?: () => void
    card: CardProps
    zone?: "select" | "retry" | "hand" | "prepare" | "battle" | "deck" | "forgotten_sea" | "fighting" | "will-fight"
    target_index?: number;
    target_slug?: string;
}

export function CardRetry(props: Props) {
    const dispatch = useDispatch()

    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)

    var hand_cards: CardProps[] = []
    var retry_cards: CardProps[] = []

    if (player?.deck_try! >= 3) {
        return (
            <View style={{ borderRadius: 8, marginTop: 8 }}>
                <MaterialCommunityIcons name="block-helper" size={80} color="black" />

            </View>
        )
    }

    return (
        <Pressable
            style={{ borderRadius: 8, marginTop: 8 }}
            onPress={() => {
                if (player?.card_hand?.includes(props.card)) {
                    player?.card_hand!.map(card => {
                        if (card == props.card) {
                            retry_cards = player.card_retry ? [...player.card_retry!, card] : [card]
                        } else {
                            hand_cards = [...hand_cards, card]
                        }
                    })
                    dispatch(setPlayer({
                        ...player, card_retry: retry_cards, card_hand: hand_cards
                    }))
                }
                else if (player?.card_retry?.includes(props.card)) {
                    player?.card_retry!.map(card => {
                        if (card == props.card) {
                            hand_cards = [...player.card_hand!, card]
                        } else {
                            retry_cards = [...retry_cards, card]
                        }
                    })
                    dispatch(setPlayer({
                        ...player, card_retry: retry_cards, card_hand: hand_cards
                    }))
                }
                if (props.onPress) props.onPress()
            }}
        >
            {props.zone == "select" && <MaterialCommunityIcons name="reload-alert" size={80} color="black" />}
            {props.zone == "retry" && <MaterialCommunityIcons name="reload" size={80} color="black" />}
        </Pressable>
    )
}

export function CardMoveToPrepare(props: Props) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const WS = useWebSocket(`ws://${URI}/ws/`, { share: true });

    const [showInvoke, setShowInvoke] = useState(false)

    if (matchData?.player_turn !== player?.id) {
        return null
    }

    const CARDS_ONINVOKE_LIST = ['elias', 'ester', 'maria']
    var render = <></>


    switch (CARDS_ONINVOKE_LIST.find((nome) => nome == props.card.slug)) {
        case 'elias':
            render = <EliasOnInvoke in_game_id={props.card.in_game_id!} />
            break;
        case 'ester':
            render = <EsterOnInvoke in_game_id={props.card.in_game_id!} />
            break;
        case 'maria':
            render = <MariaOnInvoke in_game_id={props.card.in_game_id!} />
            break;

        default:
            break;
    }

    return (
        <>
            {showInvoke &&
                <>
                    {render}
                </>
            }
            <Pressable
                style={{ backgroundColor: "red" }}
                onPress={() => {
                    // Ativar a Passiva de Elias
                    if (CARDS_ONINVOKE_LIST.find((nome) => nome == props.card.slug)) {
                        setShowInvoke(true)
                    }
                    else {
                        WS.sendJsonMessage({
                            "data_type": "match_move",
                            "user_data": {
                                "id": player?.id
                            },
                            "room_data": {
                                "id": matchData?.id
                            },
                            "match_move": {
                                "match_id": matchData?.id,
                                "round_match": matchData?.round_match,
                                "player_move": player?.id,
                                "card_id": props.card.in_game_id,
                                "move_type": "move_to_prepare"
                            }
                        })
                        if (props.onPress) { props.onPress() }
                    }
                }}
            >
                <MaterialCommunityIcons name="arrow-up" size={80} color="black" />
            </Pressable>
        </>
    )
}

export function CardMoveToBattle(props: Props) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const WS = useWebSocket(`ws://${URI}/ws/`, { share: true });

    if (matchData?.player_turn !== player?.id) {
        return null
    }

    return (
        <Pressable
            style={{ backgroundColor: "red" }}
            onPress={() => {
                WS.sendJsonMessage({
                    "data_type": "match_move",
                    "user_data": {
                        "id": player?.id
                    },
                    "room_data": {
                        "id": matchData?.id
                    },
                    "match_move": {
                        "match_id": matchData?.id,
                        "round_match": matchData?.round_match,
                        "player_move": player?.id,
                        "card_id": props.card.in_game_id,
                        "move_type": "move_to_battle"
                    }
                })
                if (props.onPress) { props.onPress() }
            }}
        >
            <MaterialCommunityIcons name="arrow-up" size={80} color="black" />
        </Pressable>
    )
}


export function CardRetreatToPrepare(props: Props) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const WS = useWebSocket(`ws://${URI}/ws/`, { share: true });

    if (matchData?.player_turn !== player?.id) {
        return null
    }

    return (
        <Pressable
            style={{ backgroundColor: "red" }}
            onPress={() => {
                WS.sendJsonMessage({
                    "data_type": "match_move",
                    "user_data": {
                        "id": player?.id
                    },
                    "room_data": {
                        "id": matchData?.id
                    },
                    "match_move": {
                        "match_id": matchData?.id,
                        "round_match": matchData?.round_match,
                        "player_move": player?.id,
                        "card_id": props.card.in_game_id,
                        "move_type": "retreat_to_prepare"
                    }
                })
                if (props.onPress) { props.onPress() }
            }}
        >
            <MaterialCommunityIcons name="arrow-down" size={80} color="black" />
        </Pressable>
    )
}


export function CardToggleAttack(props: Props) {
    const dispatch = useDispatch()
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const cards_to_fight = useSelector((state: RootReducer) => state.matchReducer.player_match_settings)?.cards_to_fight!

    if (matchData?.player_turn !== player?.id) {
        return null
    }

    return (
        <>
            {(props.card.slug === 'davi' && !isCardInList(props.card.in_game_id!, cards_to_fight)) ? <>
                < DaviToggleAttack {...props} />
            </> :
                <Pressable
                    style={{ backgroundColor: "red" }}
                    onPress={() => {
                        dispatch(toggleCardsToFight(props.card))
                        if (props.onPress) { props.onPress() }
                    }}
                >
                    <MaterialCommunityIcons name="sword" size={80} color="black" />
                </Pressable>
            }
        </>


    )
}

export function ShowCardDefense(props: Props) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)

    if (matchData?.fight_camp?.player_defense_id !== player?.id) {
        return null
    }
    // Aplicar DRY
    function getPlayerData(player_id: number) {
        const _data = matchData!.players_in_match!.filter((player) => player.id === player_id)
        return _data[0]
    }

    return (
        // Mostrar Cartas na zona de batalha
        <View style={{ width: "100%" }}>
            {/* <SubCardsContainer
                cards={getPlayerData(player?.id!).card_battle_camp}
                cards_action={
                    <CardToggleDefense
                        card={props.card!}
                        zone={props.zone}
                        target_index={props.index}
                        onPress={() => { }} />}
            /> */}
            < CardsContainer zone="will-fight" cards={getPlayerData(player?.id!).card_battle_camp} size="medium" target_index={props.target_index} />
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