import { useSelector } from "react-redux";
import { ThemedText } from "../themed/ThemedText";
import { ThemedView } from "../themed/ThemedView";
import { RootReducer } from "@/store";
import { AntDesign } from "@expo/vector-icons";

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

    return (
        <ThemedView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ThemedText type="title">A partida acabou!</ThemedText>
            <ThemedText type="link">ID: {matchData.id}</ThemedText>
            <ThemedText>{duracao_partida} <AntDesign name="clockcircleo" size={18} /> - ROUND: {matchData.round_match}</ThemedText>
            <ThemedView>

            </ThemedView>
        </ThemedView>
    )
}