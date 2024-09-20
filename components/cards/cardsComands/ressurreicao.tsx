import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { ThemedModal } from '@/components/themed/ThemedModal';

import { SelectEnemyIconsContainer } from '@/components/player_user/playerIcon';
import { usePlayerData } from '@/hooks/usePlayerData';
import useAppWebSocket from '@/hooks/useAppWebSocket';
import { setCurrentSkill } from '@/store/reducers/matchReducer';
import BasicButton from '@/components/button/basic';
import { getCardInListBySlug } from '@/hooks/useCards';
import { SelectableCardsContainer } from '../containers/SelectableCardsContainer';

export function OnInvoke() {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const [selectedPlayerId, setSelectedPlayerId] = useState<number>()
    const [selectedCard, setSelectedCard] = useState<CardProps>()
    const player_in_match_data = usePlayerData(player?.id!)
    const selected_player_heros_forgotten_sea = usePlayerData(selectedPlayerId!)?.card_in_forgotten_sea?.filter(_card => (_card.card_type == 'hero'))

    const ressurreicao_id = getCardInListBySlug('ressurreicao', player_in_match_data!.card_prepare_camp)?.in_game_id

    const WS = useAppWebSocket();
    const dispatch = useDispatch()


    return (
        <ThemedModal title='Escolha de quem ressussitar o herói.' hideCloseButton closeModal={() => { }} >
            <SelectEnemyIconsContainer matchData={matchData} player_id={player?.id} get_selected_player_id={setSelectedPlayerId} selected_player_id={selectedPlayerId} />
            {/* Exibir cartas do Mar do Esquecimento */}
            {selectedPlayerId && selected_player_heros_forgotten_sea &&
                <SelectableCardsContainer set_selected_card={setSelectedCard} selected_card={selectedCard} cards={selected_player_heros_forgotten_sea} card_size='minimum' />
            }
            <BasicButton
                disabled={selectedCard === undefined}
            onPress={() => {
                console.log(ressurreicao_id + ": Ressucitar " + selectedCard?.in_game_id + " do jogador " + selectedPlayerId)
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
                        "card_id": ressurreicao_id, // Ressurreição
                        "move_type": "card_skill",
                        "player_target_id": player?.id,
                        "player_target2_id": selectedPlayerId, // Jogador que era dono da carta
                        "card_target_id": selectedCard?.in_game_id // Carta a ser ressussitada
                    }
                })
                dispatch(setCurrentSkill(undefined))
            }}
            >Ok</BasicButton>

        </ThemedModal>
    )
}
