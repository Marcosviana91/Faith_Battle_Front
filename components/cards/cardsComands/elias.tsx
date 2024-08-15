import { useState } from 'react';
import { Pressable } from 'react-native';

import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { ThemedModal } from '@/components/themed/ThemedModal';

import { FontAwesome6 } from '@expo/vector-icons';
import { SelectEnemyIconsContainer } from '@/components/player_user/playerIcon';
import { SubCardsContainer } from '@/components/cards/containers/subContainer';
import { usePlayerData } from '@/hooks/usePlayerData';
import useAppWebSocket from '@/hooks/useAppWebSocket';
import { setCurrentSkill } from '@/store/reducers/matchReducer';

export function OnInvoke() {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const [selectedCard, setSelectedCard] = useState<number>()
    const [selectedPlayerId, setSelectedPalyerId] = useState<number>()

    const player_data = usePlayerData(player?.id!)
    const player_target_data = usePlayerData(selectedPlayerId!)

    const elias_id = player_data?.card_prepare_camp![player_data?.card_prepare_camp?.length! - 1].in_game_id!
    const card_target_id = player_target_data?.card_battle_camp![selectedCard!].in_game_id!
    console.log(elias_id)

    return (
        <ThemedModal title='Escolha um oponente e um uma carta.' hideCloseButton closeModal={() => { }} >
            <SelectEnemyIconsContainer matchData={matchData} hideCurrentPlayer player_id={player?.id} get_selected_player_id={setSelectedPalyerId} />
            {/* Cartas no campo de batalha */}
            {selectedPlayerId !== player?.id &&
                <SubCardsContainer
                    cards={player_target_data.card_battle_camp}
                    cards_action={
                        <CardDestroy
                            elias_id={elias_id}
                            card_target={card_target_id}
                            player_id_target={selectedPlayerId!}
                        />
                    }
                    get_selected_card={setSelectedCard}
                />}
        </ThemedModal>
    )
}


type Props = {
    onReturn?: () => void
    elias_id: string
    card_target: string
    player_id_target: number
}

export function CardDestroy(props: Props) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const WS = useAppWebSocket();
    const dispatch = useDispatch()


    if (matchData?.player_turn !== player?.id) {
        return null
    }

    return (
        <Pressable
            style={{ backgroundColor: "red" }}
            onPress={() => {
                console.log(props.elias_id + " destriur " + props.card_target)
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
                        "card_id": props.elias_id,//Elias
                        "move_type": "card_skill",
                        "player_target": props.player_id_target,
                        "card_target": props.card_target, //Carta para destruir
                    }
                })
                dispatch(setCurrentSkill(undefined))
                // if (props.onReturn) { props.onReturn() }
            }}
        >
            <FontAwesome6 name="explosion" size={80} color="black" />
        </Pressable>
    )
}
