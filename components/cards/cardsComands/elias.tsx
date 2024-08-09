import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { ThemedModal } from '@/components/themed/ThemedModal';

import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import {SelectEnemyIconsContainer} from '@/components/player_user/playerIcon';
import { SubCardsContainer } from '@/components/cards/subContainer';
import useWebSocket from 'react-use-websocket';
import { URI } from '@/store/server_urls';
import { usePlayerData } from '@/hooks/usePlayerData';

export function OnInvoke(props: { in_game_id: string }) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const player_focus = matchData?.player_focus_id
    const [selectedCard, setSelectedCard] = useState<number>()

    const cardList = usePlayerData(player_focus!).card_battle_camp

    console.log("Invocou " + props.in_game_id)
    useEffect(() => {
        if (selectedCard) {
            console.log("Escolheu " + cardList![selectedCard].in_game_id)
        }
    }, [selectedCard])

    return (
        <ThemedModal title='Escolha um oponente e um uma carta.' hideCloseButton closeModal={() => { }} >
            <SelectEnemyIconsContainer matchData={matchData} hideCurrentPlayer player_id={player?.id} />
            {/* Cartas no campo de batalha */}
            <SubCardsContainer
                cards={cardList}
                cards_action={
                    <CardDestroy
                        card={props.in_game_id}
                        card_target={cardList![selectedCard!] ? cardList![selectedCard!].in_game_id as string : ''}
                    />
                }
                get_selected_card={setSelectedCard}
            />
        </ThemedModal>
    )
}


type Props = {
    onReturn?: () => void
    card: string
    card_target: string
}

export function CardDestroy(props: Props) {
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
            onPress={() => {
                console.log(props.card_target + " destriur " + props.card)
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
                        "card_id": props.card,//Elias
                        "move_type": "move_to_prepare",
                        "player_target": player_focus,
                        "card_target": props.card_target, //Carta para destruir
                    }
                })
                if (props.onReturn) { props.onReturn() }
            }}
        >
            <FontAwesome6 name="explosion" size={80} color="black" />
        </Pressable>
    )
}
