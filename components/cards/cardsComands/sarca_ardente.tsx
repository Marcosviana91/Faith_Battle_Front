import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { ThemedModal } from '@/components/themed/ThemedModal';

import { SelectEnemyIconsContainer, SelectFriendsIconsContainer } from '@/components/player_user/playerIcon';
import { usePlayerData } from '@/hooks/usePlayerData';
import useAppWebSocket from '@/hooks/useAppWebSocket';
import { setCurrentSkill } from '@/store/reducers/matchReducer';
import BasicButton from '@/components/button/basic';
import { getCardInListBySlug } from '@/hooks/useCards';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';

export function OnInvoke() {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const [selectedPlayerId, setSelectedPlayerId] = useState<number>()
    const [selectedPlayer2Id, setSelectedPlayer2Id] = useState<number>()
    const player_in_match_data = usePlayerData(player?.id!)

    const saraca_ardente_id = getCardInListBySlug('sarca-ardente', player_in_match_data!.card_prepare_camp)?.in_game_id

    const WS = useAppWebSocket();
    const dispatch = useDispatch()


    return (
        <ThemedModal title='Sarça Ardente:' hideCloseButton closeModal={() => { }} >
            <ThemedView style={{alignItems:"center", padding:4, borderWidth:2, borderRadius:8, minWidth: "70%", height:150}}>
                <ThemedText>Aliado para ganhar 2 de fé</ThemedText>
                <SelectFriendsIconsContainer matchData={matchData} player_id={player?.id} get_selected_player_id={setSelectedPlayerId} selected_player_id={selectedPlayerId} />
            </ThemedView>

            <ThemedView style={{alignItems:"center", padding:4, borderWidth:2, borderRadius:8, minWidth: "70%", height:150}}>
                <ThemedText>Oponente para perder 2 de fé</ThemedText>
                <SelectEnemyIconsContainer hideCurrentPlayer matchData={matchData} player_id={player?.id} get_selected_player_id={setSelectedPlayer2Id} selected_player_id={selectedPlayer2Id} />
            </ThemedView>
            <BasicButton
                disabled={selectedPlayerId === undefined || selectedPlayer2Id === undefined}
                onPress={() => {
                    console.log(saraca_ardente_id + " restaurou a fé de " + selectedPlayerId)
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
                            "card_id": saraca_ardente_id,// Sarça Ardente
                            "move_type": "card_skill",
                            "player_target_id": selectedPlayerId,
                            "player_target2_id": selectedPlayer2Id,
                        }
                    })
                    dispatch(setCurrentSkill(undefined))
                }}
            >Ok</BasicButton>

        </ThemedModal>
    )
}
