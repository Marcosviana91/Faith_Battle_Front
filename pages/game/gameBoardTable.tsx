import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { View, ScrollView, StyleSheet, Text, Image } from "react-native";
import { globalStyles } from "@/constants/Styles";

import { AntDesign } from '@expo/vector-icons';

import GameBoard from "@/components/gameBoard";
import PlayerIcon from "@/components/gameBoard/playerIcon";

import CardsContainer from "@/components/gameBoard/cardsContainer";


function contaTempo(tempoInicial: string) {
    const medidas = {
        h: 3600000,
        m: 60000,
        s: 1000
    }
    const inicialDate = new Date(tempoInicial).getTime()
    const actualDate = new Date().getTime()

    const horasPercorrido = Math.floor(Math.abs(actualDate - inicialDate) / medidas.h)
    const minutosPercorrido = Math.floor((Math.abs(actualDate - inicialDate) / medidas.m) - horasPercorrido * 60)
    const segundosPercorrido = Math.floor((Math.abs(actualDate - inicialDate) / medidas.s) - ((minutosPercorrido) * 60) - (horasPercorrido * 3600))

    const stringMinuto = minutosPercorrido < 10 ? `0${minutosPercorrido}` : `${minutosPercorrido}`
    const stringSegundo = segundosPercorrido < 10 ? `0${segundosPercorrido}` : `${segundosPercorrido}`
    if (horasPercorrido < 1) {
        return `${stringMinuto}:${stringSegundo}`
    }
    return `${horasPercorrido}:${stringMinuto}:${stringSegundo}`
}

export default function GameBoardTable() {
    const [tempoPercorrido, setTempoPercorrido] = useState("")

    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const player_focus = matchData?.player_focus_id

    function getPlayerData(player_id: number) {
        const _data = matchData!.players_in_match!.filter((player) => player.id === player_id)
        return _data[0]
    }
    setInterval(() => {
        setTempoPercorrido(contaTempo(matchData?.start_match!))
    }, 500)

    return (
        <View style={globalStyles.container}>
            {/* Relógio */}
            <View style={{ flexDirection: "column-reverse", position: "absolute", top: 8, left: 8, gap: 4, alignItems: 'center' }}>
                <AntDesign name="clockcircleo" size={18} color="black" />
                <Text>{tempoPercorrido}</Text>
            </View>
            {/* Contador de Sabedoria */}
            <View style={{ flexDirection: "row", position: "absolute", top: 8, right: 8, gap: 4, justifyContent: 'center', alignItems: "center", borderColor: "#0000008d", borderWidth: 1, borderRadius: 8, width: 100 }}>
                <Text>{player?.wisdom_used}</Text>
                <Image
                    source={require('@/assets/images/Icons/wisdon.png')}
                />
                <Text>{player?.wisdom_points}</Text>
            </View>
            {/* Icones dos jogadores */}
            <View style={[styles.gameBoardHeader,]}>
                {matchData?.players_in_match?.map((player) => (
                    <PlayerIcon key={player.id} id={player.id} isCurrent={(player.id == matchData.player_turn)} isTarget={(player.id == matchData.player_focus_id)} />
                ))}
            </View>
            {/* GameBoards */}
            <View style={[globalStyles.contentContainer, styles.container]}>
                {player_focus !== 0 && <View style={[styles.enemyBoard]}>
                    {/* Verificar ID do jogador focado, não usar mais indice da lista */}
                    <GameBoard {...getPlayerData(player_focus!)} />
                </View>}
                <View>
                    {/* Verificar ID do jogador logado */}
                    <GameBoard {...getPlayerData(player?.id!)} />
                </View>
            </View>
            {/* Mão do jogador */}
            <View style={[styles.playerFooter,]}>
                <ScrollView horizontal>
                    <CardsContainer size="small" zone='hand' cards={player!.card_hand} />
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