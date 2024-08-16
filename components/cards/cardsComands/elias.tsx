import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { ThemedModal } from '@/components/themed/ThemedModal';

import { SelectEnemyIconsContainer } from '@/components/player_user/playerIcon';
import { SubCardsContainer } from '@/components/cards/containers/subContainer';
import { usePlayerData } from '@/hooks/usePlayerData';
import useAppWebSocket from '@/hooks/useAppWebSocket';
import { setCurrentSkill } from '@/store/reducers/matchReducer';
import BasicButton from '@/components/button/basic';
import { getCardInListBySlug } from '@/hooks/useCards';

export function OnInvoke() {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const [selectedPlayerId, setSelectedPlayerId] = useState<number>()
    const [selectedCardIndex, setSelectedCardIndex] = useState<number>()
    const player_in_match_data = usePlayerData(player?.id!)
    const player_target_data = usePlayerData(selectedPlayerId!)

    const elias_id = getCardInListBySlug('elias', player_in_match_data.card_prepare_camp)?.in_game_id

    const WS = useAppWebSocket();
    const dispatch = useDispatch()


    return (
        <ThemedModal title='Escolha um oponente e um uma carta.' hideCloseButton closeModal={() => { }} >
            <SelectEnemyIconsContainer matchData={matchData} player_id={player?.id} get_selected_player_id={setSelectedPlayerId} selected_player_id={selectedPlayerId} />
            {/* Cartas no campo de batalha */}
            {selectedPlayerId !== player?.id && player_target_data &&
                <SubCardsContainer
                    cards={player_target_data.card_battle_camp}
                    get_selected_card={setSelectedCardIndex}
                    cards_action={<BasicButton
                        height={50}
                        onPress={() => {
                            console.log(elias_id + " destriur " + player_target_data.card_battle_camp![selectedCardIndex!].in_game_id)
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
                                    "card_id": elias_id,//Elias
                                    "move_type": "card_skill",
                                    "player_target": selectedPlayerId,
                                    "card_target": player_target_data.card_battle_camp![selectedCardIndex!].in_game_id, //Carta para destruir
                                }
                            })
                            dispatch(setCurrentSkill(undefined))
                        }}
                    >Ok</BasicButton>}
                />}
        </ThemedModal>
    )
}
