import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { ThemedModal } from '@/components/themed/ThemedModal';

import { SelectFriendsIconsContainer } from '@/components/player_user/playerIcon';
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

    const forca_de_sansao_id = getCardInListBySlug('forca-de-sansao', player_in_match_data!.card_prepare_camp)?.in_game_id

    const WS = useAppWebSocket();
    const dispatch = useDispatch()

    // useEffect(() => {
    //     if (player_target_data) {
    //         let __temp_array: CardProps[] = []

    //         player_target_data.card_battle_camp?.map((_card) => {
    //             if (_card.slug !== 'noe') {
    //                 if (!_card.indestrutivel) {
    //                     __temp_array.push(_card)
    //                 }
    //             }
    //         })
    //         cards_whitout_noe = __temp_array
    //     }
    // }, [player_target_data])


    return (
        <ThemedModal title='Escolha um aliado e um uma carta.' hideCloseButton closeModal={() => { }} >
            <SelectFriendsIconsContainer matchData={matchData} player_id={player?.id} get_selected_player_id={setSelectedPlayerId} selected_player_id={selectedPlayerId} />
            {/* Cartas no campo de batalha */}
            {player_target_data &&
                <>
                    <SubCardsContainer
                        cards={player_target_data.card_battle_camp}
                        get_selected_card={setSelectedCardIndex}
                        cards_action={<BasicButton
                            disabled={selectedPlayerId === undefined}
                            onPress={() => {
                                console.log(forca_de_sansao_id + " fortalece em 3/3 " + player_target_data.card_battle_camp![selectedCardIndex!].in_game_id)
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
                                        "card_id": forca_de_sansao_id,//Força de Sansão
                                        "move_type": "card_skill",
                                        "player_target_id": selectedPlayerId,
                                        "card_target_id": player_target_data.card_battle_camp![selectedCardIndex!].in_game_id, //Carta para fortalecer
                                    }
                                })
                                dispatch(setCurrentSkill(undefined))
                            }}
                        >Ok</BasicButton>}
                    />
                    {player_target_data.card_battle_camp!.length == 0 &&
                        <BasicButton
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
                                        "card_id": forca_de_sansao_id,//Força de Sanção
                                        "move_type": "card_skill",
                                    }
                                })
                                dispatch(setCurrentSkill(undefined))
                            }}
                        >OK</BasicButton>
                    }
                </>
            }
        </ThemedModal>
    )
}
