import { useDispatch, useSelector } from "react-redux";
import { ThemedText } from "../themed/ThemedText";
import { ThemedView } from "../themed/ThemedView";
import { RootReducer } from "@/store";
import { AntDesign } from "@expo/vector-icons";
import BasicButton from "../button/basic";
import { leaveMatch } from "@/store/reducers/matchReducer";
import { PlayerIcon } from "../player_user/playerIcon";

function contaTempo(tempoInicial: number, tempoFinal: number) {
    const medidas = {
        h: 3600000,
        m: 60000,
        s: 1000
    }
    const inicialDate = tempoInicial
    const actualDate = tempoFinal

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

export default function Stats() {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)!
    const start_time = new Date(matchData.start_match!).getTime();
    const end_time = new Date(matchData.end_match!).getTime()

    const duracao_partida = contaTempo(start_time, end_time)
    const dispatch = useDispatch()

    return (
        <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ThemedText type="title">A partida acabou!</ThemedText>
            <ThemedText type="link">ID: {matchData.id}</ThemedText>
            <ThemedText>{duracao_partida} <AntDesign name="clockcircleo" size={18} /> ROUND: {matchData.round_match}</ThemedText>
            <ThemedView style={{ gap: 16, marginVertical: 32, borderWidth: 2, padding: 4, borderRadius: 8, width: '90%' }}>
                <ThemedView style={{ flexDirection: 'row', gap: 16 }}>
                    <ThemedText>JOGADOR:</ThemedText>
                    <ThemedText>Round eliminado:</ThemedText>
                    <ThemedText>Pontos de Fé:</ThemedText>
                    <ThemedText>Total de Dano causado:</ThemedText>
                    <ThemedText>Total de Dano recebido:</ThemedText>
                </ThemedView>
                {matchData.players_in_match?.map(_team =>
                (
                    _team.map(_player => {
                        console.log(Object.entries(_player.dano_em_fe?.oponentes!))
                        return (
                            <ThemedView style={{ flexDirection: 'row', gap: 16 }}>
                                <PlayerIcon id={_player.id} type="mini" />
                                <ThemedText>{_player.round_eliminado}º</ThemedText>
                                <ThemedText>{_player.faith_points}</ThemedText>
                                <ThemedText>{_player.dano_em_fe?.total_aplicado}</ThemedText>
                                <ThemedText>{_player.dano_em_fe?.total_recebido}</ThemedText>
                                

                            </ThemedView>
                        )
                    })
                )
                )}
            </ThemedView>
            <BasicButton
                onPress={() => {
                    dispatch(leaveMatch())
                }}
            >
                Sair
            </BasicButton>
        </ThemedView>
    )
}