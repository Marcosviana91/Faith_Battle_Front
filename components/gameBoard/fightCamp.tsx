import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { View, StyleSheet, Pressable } from "react-native";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import useWebSocket from 'react-use-websocket';
import { URI } from "@/store/server_urls";

import { ThemedModal } from '@/components/themed/ThemedModal';
import { ThemedView } from '@/components/themed/ThemedView';
import { ThemedText } from '@/components/themed/ThemedText';
import PlayerIcon from "@/components/gameBoard/playerIcon";
import {CardsContainer} from "@/components/cards/";
import BasicButton from '@/components/button/basic';
import { clearCardsToFight, setCardsToFight } from '@/store/reducers/matchReducer';


export default function FightCamp() {
    const dispatch = useDispatch()
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const fight_camp = matchData?.fight_camp
    const player_match_settings = useSelector((state: RootReducer) => state.matchReducer.player_match_settings)

    const WS = useWebSocket(`ws://${URI}/ws/`, { share: true });

    const [showModal, setShowModal] = useState(true)

    // Aplicar DRY
    function getPlayerData(player_id: number) {
        const _data = matchData!.players_in_match!.filter((player) => player.id === player_id)
        return _data[0]
    }

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
                    >
                        {/* Header */}
                        <View style={{ flexDirection: 'row', height: 35 }}>
                            <PlayerIcon id={fight_camp.player_attack_id!} size={30} type='mini' />
                            <MaterialCommunityIcons style={{}} size={30} name="sword-cross" />
                            <PlayerIcon id={fight_camp.player_defense_id!} size={30} type='mini' />
                        </View>
                        {/* Botão Lutar */}
                        {(matchData?.player_turn === player?.id) && fight_camp && fight_camp.fight_stage == 1 &&
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
                        {/* Botão de realizar defesa */}
                        {fight_camp && fight_camp.fight_stage === 0 && fight_camp.player_defense_id == player?.id &&
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
                        {fight_camp.fight_stage === 0
                            ? <CardsContainer size="small" zone="fighting" cards={fight_camp.attack_cards} />
                            : <CardsContainer size="small" zone="gallery" cards={fight_camp.attack_cards} />
                        }
                        {fight_camp.fight_stage === 0
                            ? <CardsContainer size="small" cards={player_match_settings?.cards_to_fight!} />
                            : <CardsContainer size="small" zone='gallery' cards={fight_camp.defense_cards} />
                        }
                        {player?.id === fight_camp.player_defense_id &&
                            <>
                                {/* Cartas da Mão do Jogador - Filtrar cartas jogáveis (milagres, pacados, ect) */}
                                {/* <CardsContainer size="small" zone='hand' cards={player!.card_hand} /> */}
                            </>
                        }
                    </ThemedModal>
                </ThemedView>
            }
        </>
    )
}