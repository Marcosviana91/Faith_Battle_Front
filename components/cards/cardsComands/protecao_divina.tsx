import { useState } from 'react';
import { Pressable } from 'react-native';

import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { ThemedModal } from '@/components/themed/ThemedModal';

import { FontAwesome6 } from '@expo/vector-icons';
import { SelectFriendsIconsContainer } from '@/components/player_user/playerIcon';
import { SubCardsContainer } from '@/components/cards/containers/subContainer';
import { usePlayerData } from '@/hooks/usePlayerData';
import useAppWebSocket from '@/hooks/useAppWebSocket';
import { setCurrentSkill } from '@/store/reducers/matchReducer';
import BasicButton from '@/components/button/basic';

export function OnInvoke() {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const [selectedPlayerId, setSelectedPlayerId] = useState<number>()
    const player_data = matchData?.players_in_match?.find(_player => _player.id === player?.id)
    const card = player_data?.card_prepare_camp![player_data?.card_prepare_camp?.length! - 1]


    return (
        <ThemedModal title='Escolha um aliado para proteger.' hideCloseButton closeModal={() => { }} >
            <SelectFriendsIconsContainer matchData={matchData} player_id={player?.id} get_selected_player_id={setSelectedPlayerId} />
            <BasicButton
                disabled={selectedPlayerId === undefined}
                onPress={() => {
                    let _card = {...card, "skill_focus_player_id": selectedPlayerId}
                    console.log("enviar id do aliado: " + selectedPlayerId)
                    console.log(_card)
                }}
            >Ok</BasicButton>
        </ThemedModal>
    )
}


type Props = {
    onReturn?: () => void
    card: string
    card_target: string
}

// export function CardDestroy(props: Props) {
//     const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
//     const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
//     const player_focus = matchData?.player_focus_id
//     const WS = useAppWebSocket();
//     const dispatch = useDispatch()


//     if (matchData?.player_turn !== player?.id) {
//         return null
//     }

//     return (
//         <Pressable
//             style={{ backgroundColor: "red" }}
//             onPress={() => {
//                 console.log(props.card_target + " destriur " + props.card)
//                 WS.sendJsonMessage({
//                     "data_type": "match_move",
//                     "user_data": {
//                         "id": player?.id
//                     },
//                     "room_data": {
//                         "id": matchData?.id
//                     },
//                     "match_move": {
//                         "match_id": matchData?.id,
//                         "round_match": matchData?.round_match,
//                         "player_move": player?.id,
//                         "card_id": props.card,//Elias
//                         "move_type": "card_skill",
//                         "player_target_id": player_focus,
//                         "card_target": props.card_target, //Carta para destruir
//                     }
//                 })
//                 dispatch(setCurrentSkill(undefined))
//                 if (props.onReturn) { props.onReturn() }
//             }}
//         >
//             <FontAwesome6 name="explosion" size={80} color="black" />
//         </Pressable>
//     )
// }
