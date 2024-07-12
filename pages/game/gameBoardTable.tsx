import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { View, ScrollView, StyleSheet } from "react-native";
import { globalStyles } from "@/constants/Styles";

import GameBoard from "@/components/gameBoard";
import PlayerIcon from "@/components/gameBoard/playerIcon";


import CardsContainer from "@/components/gameBoard/cardsContainer";


export default function GameBoardTable() {
    // console.log("Dados da Partida: ", props);

    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const player_focus = matchData?.player_focus_id

    function getPlayerData(player_id: number) {
        const _data = matchData!.players_in_match!.filter((player) => player.id === player_id)
        return _data[0]
    }

    return (
        <View style={globalStyles.container}>
            {/* Icones dos jogadores */}
            <View style={[styles.gameBoardHeader,]}>
                {matchData?.players_in_match?.map((player) => (
                    <PlayerIcon key={player.id} id={player.id} />
                ))}
            </View>
            {/*  */}
            <View style={[globalStyles.contentContainer, styles.container]}>
                {player_focus && <View style={[styles.enemyBoard]}>
                    {/* Verificar ID do jogador focado, não usar mais indice da lista */}
                    <GameBoard {...getPlayerData(player_focus)} />
                </View>}
                <View>
                    {/* Verificar ID do jogador logado */}
                    <GameBoard {...getPlayerData(player?.id!)} />
                </View>
            </View>
            {/* Mão do jogador */}
            <View style={[styles.playerFooter,]}>
                <ScrollView horizontal>
                    <CardsContainer size="normal" cards={player!.card_hand} />
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d84b09',

    },
    gameBoardHeader: {
        backgroundColor: "#00000094",
        height: 60,
        width: '100%',
        flexDirection: "row",
    },
    enemyBoard: {
        transform: [{ rotateZ: '180deg' }]
    },
    playerFooter: {
        backgroundColor: "#46000075",
        height: 120,
        paddingHorizontal: 10,
    },
})