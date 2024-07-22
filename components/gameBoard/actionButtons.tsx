import { useSelector, useDispatch } from "react-redux"
import { View } from "react-native"

import { RootReducer } from "@/store"
import { clearCardsToFight } from '@/store/reducers/matchReducer';

import BasicButton from '@/components/button/basic';
import { MaterialCommunityIcons } from "@expo/vector-icons"

import useWebSocket from 'react-use-websocket';
import { URI } from "@/store/server_urls";

export default function ActionButtons() {
    const dispatch = useDispatch()

    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const player_match_settings = useSelector((state: RootReducer) => state.matchReducer.player_match_settings)
    const player_focus = matchData?.player_focus_id
    const fight_camp = matchData?.fight_camp

    const WS = useWebSocket(`ws://${URI}/ws/`, { share: true });

    return (
        <>
            {/* Botão de finalizar jogada */}
            {(matchData?.player_turn === player?.id) && !(player_match_settings?.cards_to_fight?.length! > 0) && fight_camp == undefined &&
                <View>
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
                        onPress={() => {
                            if (!player_focus || player_focus == player?.id) {
                                console.log("Escolha um oponente")
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
                                        "player_target": player_focus,
                                        "card_list": player_match_settings?.cards_to_fight!,
                                    }
                                }
                                WS.sendJsonMessage(data)
                                dispatch(clearCardsToFight())
                            }
                        }}
                    >
                        Atacar
                    </BasicButton>
                </View>
            }
            {/* Botão de realizar defesa */}
            {fight_camp && fight_camp.player_defense_id == player?.id && (player_match_settings?.cards_to_fight?.length! > 0) &&
                <View>
                    <BasicButton
                        onPress={() => {
                            console.log("Defender")
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
                                    "move_type": "defense",
                                    "player_target": fight_camp.player_attack_id,
                                    "card_list": player_match_settings?.cards_to_fight!,
                                }
                            }
                            WS.sendJsonMessage(data)
                            dispatch(clearCardsToFight())
                        }}
                    >
                        <MaterialCommunityIcons name="shield" size={24} color="black" />
                    </BasicButton>
                </View>
            }
            {/* Botão de NÃO realizar defesa */}
            {fight_camp && fight_camp.player_defense_id == player?.id && !(player_match_settings?.cards_to_fight?.length! > 0) && fight_camp.fight_stage == 0 &&
                <View>
                    <BasicButton
                        onPress={() => {
                            console.log("Não defender")
                        }}
                    >
                        <MaterialCommunityIcons name="shield-off" size={24} color="black" />
                    </BasicButton>
                </View>
            }
            {/* Lutar */}
            {(matchData?.player_turn === player?.id) && fight_camp && fight_camp.fight_stage==1 &&
                <View>
                    <BasicButton
                        onPress={() => {
                            console.log("Lutar")
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
                                    "move_type": "fight",
                                }
                            }
                            WS.sendJsonMessage(data)
                        }}
                    >
                        <MaterialCommunityIcons name="sword-cross" size={24} color="black" />
                    </BasicButton>
                </View>
            }
            {/* Usar milagre */}
            {/* {(matchData?.player_turn === player?.id) && fight_camp && fight_camp.fight_stage==1 &&
                <View>
                    <BasicButton
                        onPress={() => {
                            console.log("Lutar")
                        }}
                    >
                        <MaterialCommunityIcons name="magic-staff" size={24} color="black" />
                    </BasicButton>
                </View>
            } */}
        </>
    )
}