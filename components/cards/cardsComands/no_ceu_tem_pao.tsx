import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { ThemedModal } from '@/components/themed/ThemedModal';

import { SelectFriendsIconsContainer } from '@/components/player_user/playerIcon';
import { usePlayerData } from '@/hooks/usePlayerData';
import useAppWebSocket from '@/hooks/useAppWebSocket';
import { setCurrentSkill } from '@/store/reducers/matchReducer';
import BasicButton from '@/components/button/basic';
import { getCardInListBySlug } from '@/hooks/useCards';

export function OnInvoke() {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const [selectedPlayerId, setSelectedPlayerId] = useState<number>()
    const player_in_match_data = usePlayerData(player?.id!)

    const no_ceu_tem_pao_id = getCardInListBySlug('no-ceu-tem-pao', player_in_match_data.card_prepare_camp)?.in_game_id

    const WS = useAppWebSocket();
    const dispatch = useDispatch()


    return (
        <ThemedModal title='Escolha um aliado para dar as cartas.' hideCloseButton closeModal={() => { }} >
            <SelectFriendsIconsContainer matchData={matchData} player_id={player?.id} get_selected_player_id={setSelectedPlayerId} selected_player_id={selectedPlayerId} />
            <BasicButton
                disabled={selectedPlayerId === undefined}
                onPress={() => {
                    console.log(no_ceu_tem_pao_id + " ganhou cartas " + selectedPlayerId)
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
                            "card_id": no_ceu_tem_pao_id,// No céu tem pão
                            "move_type": "card_skill",
                            "player_target": selectedPlayerId,
                        }
                    })
                    dispatch(setCurrentSkill(undefined))
                }}
            >Ok</BasicButton>

        </ThemedModal>
    )
}
