import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { View, Pressable } from "react-native";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ThemedModal } from '@/components/themed/ThemedModal';
import { ThemedView } from '@/components/themed/ThemedView';
import { ThemedText } from '@/components/themed/ThemedText';
import { ShowFightersIconsContainer } from "@/components/player_user/playerIcon";
import FightContainer from '../cards/containers/FightContainer';
import BasicButton from '@/components/button/basic';
import { clearCardsToFight, setCardsToFight } from '@/store/reducers/matchReducer';
import useAppWebSocket from '@/hooks/useAppWebSocket';


export default function FightCamp() {
    const dispatch = useDispatch()
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const fight_camp = matchData?.fight_camp
    const player_match_settings = useSelector((state: RootReducer) => state.matchReducer.player_match_settings)

    const WS = useAppWebSocket();

    const [showModal, setShowModal] = useState(true)

    useEffect(() => {
        if (fight_camp) {
            if (fight_camp!.fight_stage === 0 && fight_camp.player_defense_id === player?.id) {
                dispatch(setCardsToFight(fight_camp!.defense_cards!))
            }
        }
    }, [fight_camp])

    return (
        <>
            {fight_camp &&
                <ThemedView
                    style={{
                        width: 40,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderRadius: 8,
                        marginTop: 8,
                        marginLeft: 8
                    }}
                >
                    {/* Botão para reabir o fight camp */}
                    <Pressable
                        onPress={() => {
                            setShowModal(true)
                        }}
                    >
                        <ThemedText>
                            <MaterialCommunityIcons style={{}} size={30} name="sword-cross" />
                        </ThemedText>
                    </Pressable>

                    <ThemedModal
                        title="Campo de Batalha"
                        hideCloseButton={!(player?.id !== fight_camp.player_defense_id && player?.id !== fight_camp.player_attack_id)}
                        closeModal={() => {
                            setShowModal(false)
                        }}
                        visible={showModal}
                        backgroundTransparent
                    >
                        {/* Header */}
                        <ShowFightersIconsContainer matchData={matchData} />
                        {/* Botão Lutar */}
                        {(matchData?.player_turn === player?.id) && fight_camp && fight_camp.fight_stage == 1 &&
                            <View style={{ height: 50, width: 100 }}>
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
                        {/* Botão de realizar defesa */}
                        {fight_camp && fight_camp.fight_stage === 0 && fight_camp.player_defense_id == player?.id &&
                            <View style={{ height: 50, width: 100 }}>
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
                                                "player_target_id": fight_camp.player_attack_id,
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
                        <View style={{ width: "100%" }}>
                            <FightContainer attacking={fight_camp.fight_stage === 0 && player?.id === fight_camp.player_defense_id} cards={fight_camp.attack_cards!} />
                            {fight_camp.fight_stage === 0
                                ? <FightContainer cards={player_match_settings?.cards_to_fight!} />
                                : <FightContainer cards={fight_camp.defense_cards!} />
                            }
                        </View>
                        {player?.id === fight_camp.player_defense_id &&
                            <>
                                {/* Cartas da Mão do Jogador - Filtrar cartas jogáveis (milagres, pacados, ect) */}
                                {/* <FightContainer zone='hand' cards={player!.card_hand} /> */}
                            </>
                        }
                    </ThemedModal>
                </ThemedView>
            }
        </>
    )
}