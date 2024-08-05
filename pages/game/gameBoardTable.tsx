import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { View, StyleSheet } from "react-native";
import { globalStyles } from "@/constants/Styles";

import { ThemedView } from '@/components/themed/ThemedView';
import { ThemedText } from '@/components/themed/ThemedText';

import GameBoard from "@/components/gameBoard";
import { IconsContainer } from "@/components/player_user/playerIcon";
import { CardsContainer } from "@/components/cards/";
import FightCamp from '@/components/gameBoard/fightCamp';
import TopBar from '@/components/gameBoard/topBar';
import { getPlayerData } from '@/hooks/usePlayerData';


export default function GameBoardTable() {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const player_focus = matchData?.player_focus_id
    const fight_camp = matchData?.fight_camp


    return (
        <>
            {!matchData?.end_match &&
                <ThemedView style={globalStyles.container}>
                    <TopBar />
                    {/* Aplicar DRY */}
                    {/* Icones dos jogadores */}
                    {!fight_camp &&
                        <View>
                            <IconsContainer player_id={player?.id} matchData={matchData} />
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
            }
            {matchData?.end_match &&
                <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <TopBar />
                    <ThemedText>A partida acabou: {matchData.end_match}</ThemedText>
                </ThemedView>
            }
        </>
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