import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { View, StyleSheet, Image, Pressable } from "react-native";
import { globalStyles } from "@/constants/Styles";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ThemedView } from '@/components/themed/ThemedView';
import { ThemedText } from '@/components/themed/ThemedText';

import GameBoard from "@/components/gameBoard";
import PlayerIcon from "@/components/gameBoard/playerIcon";
import CardsContainer from "@/components/gameBoard/cardsContainer";
import FightCamp from '@/components/gameBoard/fightCamp';
import TopBar from '@/components/gameBoard/topBar';


export default function GameBoardTable() {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const player_focus = matchData?.player_focus_id
    const fight_camp = matchData?.fight_camp

    // Aplicar DRY
    function getPlayerData(player_id: number) {
        const _data = matchData!.players_in_match!.filter((player) => player.id === player_id)
        return _data[0]
    }


    return (
        <ThemedView style={globalStyles.container}>
            <TopBar />
            {/* Icones dos jogadores */}
            {!fight_camp &&
                <View style={[styles.gameBoardHeader,]}>
                    {matchData?.players_in_match?.map((player) => (
                        <View key={player.id} style={{ alignItems: "center" }}>
                            <PlayerIcon id={player.id} isCurrent={(player.id == matchData.player_turn)} isTarget={(player.id == matchData.player_focus_id)} type='mini' />
                            <View style={{ flexDirection: 'row', marginTop: -16 }}>
                                <MaterialCommunityIcons name="shield-cross" size={24} color="black" />
                                <ThemedText type='defaultSemiBold'>{player.faith_points}</ThemedText>
                            </View>
                        </View>
                    ))}
                </View>
            }
            {/* Fight Camp */}
            <FightCamp />
            {/* GameBoards */}
            <View style={[globalStyles.contentContainer]}>
                {/* Enemy board */}
                {player_focus !== 0 && player_focus !== player?.id &&
                    <GameBoard {...getPlayerData(player_focus!)} />
                }
                {/* Player board */}
                <GameBoard {...getPlayerData(player?.id!)} />
            </View>
            {/* Mão do jogador */}
            <View>
                <CardsContainer size="small" zone='hand' cards={player!.card_hand} />
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    gameBoardHeader: {
        height: 80,
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-around",
    }
})