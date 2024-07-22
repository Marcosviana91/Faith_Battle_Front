import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import useWebSocket from 'react-use-websocket';
import { URI } from "@/store/server_urls";

import { View, StyleSheet, Image } from "react-native";
import { globalStyles } from "@/constants/Styles";

import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedView } from '@/components/themed/ThemedView';
import { ThemedText } from '@/components/themed/ThemedText';

import GameBoard from "@/components/gameBoard";
import PlayerIcon from "@/components/gameBoard/playerIcon";

import CardsContainer from "@/components/gameBoard/cardsContainer";
import BasicButton from '@/components/button/basic';
import ActionButtons from '@/components/gameBoard/actionButtons';


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
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const player_focus = matchData?.player_focus_id
    const fight_camp = matchData?.fight_camp

    const [tempoPercorrido, setTempoPercorrido] = useState("")

    function getPlayerData(player_id: number) {
        const _data = matchData!.players_in_match!.filter((player) => player.id === player_id)
        return _data[0]
    }
    setInterval(() => {
        setTempoPercorrido(contaTempo(matchData?.start_match!))
    }, 500)

    return (
        <ThemedView style={globalStyles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 4 }}>
                {/* Relógio */}
                <View style={{ flexDirection: "row", gap: 4, alignItems: 'center', zIndex: 1 }}>
                    <ThemedText>{tempoPercorrido}</ThemedText>
                    <ThemedText><AntDesign name="clockcircleo" size={18} /></ThemedText>
                    <ThemedText>Round {matchData?.round_match}</ThemedText>
                </View>
                {/* Botões de ação dependendo da fase do turno*/}
                <ActionButtons />
                {/* Contador de Sabedoria */}
                <ThemedView style={{ flexDirection: "row", gap: 4, justifyContent: 'center', alignItems: "center", borderWidth: 1, borderRadius: 8, width: 100 }}>
                    <ThemedText>{player?.wisdom_available}</ThemedText>
                    <Image
                        source={require('@/assets/images/Icons/wisdon.png')}
                    />
                    <ThemedText>{player?.wisdom_points}</ThemedText>
                </ThemedView>
            </View>
            {/* Icones dos jogadores */}
            {!fight_camp && <View style={[styles.gameBoardHeader,]}>
                {matchData?.players_in_match?.map((player) => (
                    <PlayerIcon key={player.id} id={player.id} isCurrent={(player.id == matchData.player_turn)} isTarget={(player.id == matchData.player_focus_id)} />
                ))}
            </View>}
            {/* Fight Camp GERAR COMPONANTE */}
            {fight_camp &&
                <ThemedView style={{zIndex:1, backgroundColor:"red", alignItems:"center"}}>
                    <ThemedText>{fight_camp.player_attack_id} VS {fight_camp.player_defense_id}</ThemedText>
                    <CardsContainer size="small" zone='fighting' cards={fight_camp.attack_cards} />
                    <CardsContainer size="small" zone='fighting' cards={fight_camp.defense_cards} />
                </ThemedView>}
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
        height: 60,
        width: '100%',
        flexDirection: "row",
    }
})