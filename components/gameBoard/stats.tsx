import { useDispatch, useSelector } from "react-redux";
import { ThemedText } from "../themed/ThemedText";
import { ThemedView } from "../themed/ThemedView";
import { RootReducer } from "@/store";
import { AntDesign } from "@expo/vector-icons";
import BasicButton from "../button/basic";
import { leaveMatch } from "@/store/reducers/matchReducer";
import PlayerIcon64 from "../player_user/PlayerIcon64";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ScrollView, View } from "react-native";
// import { PlayerIcon } from "../player_user/playerIcon";

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
            <ThemedView style={{ width: '90%', borderWidth: 2, borderBottomWidth: 0, flexDirection: 'row', marginVertical:32 }}>
                <ThemedView style={{ maxWidth: 75, alignItems: 'center', borderEndWidth: 1 }}>
                    <ThemedView style={{ height: 60, borderBottomWidth: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <ThemedText><FontAwesome name="user" size={24} /></ThemedText>
                    </ThemedView>
                    {matchData.players_in_match?.map(_team => (
                        _team.map(_player => {
                            // console.log(Object.entries(_player.dano_em_fe?.oponentes!))
                            return (
                                <ThemedView style={{ flexDirection: 'row', gap: 16, height: 80, borderBottomWidth: 1 }}>
                                    <PlayerIcon64 id={_player.id} type="mini" />
                                </ThemedView>
                            )
                        })
                    ))}
                </ThemedView>
                <View style={{ flex: 1 }}>
                    <ScrollView horizontal>
                        <View>
                            <ThemedView style={{ flexDirection: 'row', gap: 16, paddingStart: 4, height: 60, borderBottomWidth: 1 }}>
                                <ThemedText style={{ width: 90, textAlign: 'center', textAlignVertical: 'center' }}><MaterialCommunityIcons name="skull" size={24} /></ThemedText>
                                <ThemedText style={{ width: 90, textAlign: 'center', textAlignVertical: 'center' }}><MaterialCommunityIcons name="shield-cross" size={24} /></ThemedText>
                                <ThemedText style={{ width: 90, textAlign: 'center', textAlignVertical: 'center' }}><MaterialCommunityIcons name="sword" size={24} /></ThemedText>
                                <ThemedText style={{ width: 90, textAlign: 'center', textAlignVertical: 'center' }}><MaterialCommunityIcons name="shield-sword" size={24} /></ThemedText>
                            </ThemedView>
                            <View>
                                {matchData.players_in_match?.map(_team =>
                                (
                                    _team.map(_player => {
                                        // console.log(Object.entries(_player.dano_em_fe?.oponentes!))
                                        return (
                                            <ThemedView style={{ flexDirection: 'row', gap: 16, height: 80, borderBottomWidth: 1 }}>
                                                <ThemedText style={{ width: 90, textAlign: 'center', textAlignVertical: 'center' }}>{_player.round_eliminado}º</ThemedText>
                                                <ThemedText style={{ width: 90, textAlign: 'center', textAlignVertical: 'center' }}>{_player.faith_points}</ThemedText>
                                                <ThemedText style={{ width: 90, textAlign: 'center', textAlignVertical: 'center' }}>{_player.dano_em_fe?.total_aplicado}</ThemedText>
                                                <ThemedText style={{ width: 90, textAlign: 'center', textAlignVertical: 'center' }}>{_player.dano_em_fe?.total_recebido}</ThemedText>
                                            </ThemedView>
                                        )
                                    })
                                )
                                )}
                            </View>
                        </View>
                    </ScrollView>
                </View>
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