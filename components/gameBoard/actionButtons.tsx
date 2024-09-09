import { useSelector, useDispatch } from "react-redux"
import { View } from "react-native"

import { RootReducer } from "@/store"
import { clearCardsToFight, leaveMatch } from '@/store/reducers/matchReducer';
import { addNotify } from "@/store/reducers/notificationReducer"

import BasicButton from '@/components/button/basic';

import useAppWebSocket from "@/hooks/useAppWebSocket";

export default function ActionButtons() {
    const dispatch = useDispatch()

    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const player_match_settings = useSelector((state: RootReducer) => state.matchReducer.player_match_settings)
    const player_focus = matchData?.player_focus_id
    const fight_camp = matchData?.fight_camp

    const WS = useAppWebSocket();

    return (
        <>{!matchData?.end_match ?
            <>
                {/* Botão de finalizar jogada */}
                {(matchData?.player_turn === player?.id) && !(player_match_settings?.cards_to_fight?.length! > 0) && fight_camp == undefined &&
                    <View>
                        <BasicButton
                            height={30}
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
                                        "move_type": "done"
                                    }
                                })
                            }}
                        >
                            Finalizar
                        </BasicButton>
                    </View>
                }
                {/* Botão de realizar ataque */}
                {(player_match_settings?.cards_to_fight?.length! > 0) && !fight_camp &&
                    <View>
                        <BasicButton
                            height={30}
                            disabled={(
                                !player_focus ||
                                player_focus == player?.id
                            )}
                            onPress={() => {
                                if (!player_focus || player_focus == player?.id) {
                                    console.log("Escolha um oponente")
                                } else if ( typeof((player?.ja_atacou?.find((_id) => _id === player_focus))) === 'number'){
                                    dispatch(addNotify({
                                        title: "Já atacou este oponente.",
                                        message: "Escolha outro oponente ou remova suas cartas do modo de ataque para finalizar seu turno.",
                                        stillUntilDismiss:true
                                    }))
                                } else {
                                    const data: APIResponseProps = {
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
                                            "move_type": "attack",
                                            "player_target_id": player_focus,
                                            "card_list": player_match_settings?.cards_to_fight!,
                                        }
                                    }
                                    WS.sendJsonMessage(data)
                                    dispatch(clearCardsToFight())
                                }
                            }}
                        >
                            {(!player_focus || player_focus == player?.id) ? 'Escolha um oponente' : <>
                                {
                                    (player?.ja_atacou?.find((_id) => _id === player_focus)) ?
                                        'Já atacou este oponente' :
                                        'Atacar'
                                }
                            </>}
                        </BasicButton>
                    </View>
                }
            </> :
            <View style={{ width: '30%' }}>
                <BasicButton
                    height={35}
                    onPress={() => {
                        dispatch(leaveMatch())
                    }}
                >
                    Sair
                </BasicButton>
            </View>
        }</>
    )
}