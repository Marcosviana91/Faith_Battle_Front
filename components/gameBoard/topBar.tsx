import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View, Image, Pressable } from "react-native"


import { RootReducer } from '@/store';
import { leaveMatch } from '@/store/reducers/matchReducer';

import { ThemedModal } from '@/components/themed/ThemedModal';
import { ThemedView } from '@/components/themed/ThemedView';
import { ThemedText } from '@/components/themed/ThemedText';
import ActionButtons from '@/components/gameBoard/actionButtons';
import BasicButton from '@/components/button/basic';

import { AntDesign } from '@expo/vector-icons';
import useAppWebSocket from '@/hooks/useAppWebSocket';


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

export default function TopBar() {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const player = useSelector((state: RootReducer) => state.matchReducer.player_data)

    const [showMenu, setShowMenu] = useState(false)
    const [tempoPercorrido, setTempoPercorrido] = useState("")

    const dispatch = useDispatch()


    const WS = useAppWebSocket();


    var timer: NodeJS.Timeout

    useEffect(() => {
        timer = setInterval(() => {
            setTempoPercorrido(contaTempo(matchData?.start_match!))
        }, 500)
    }, [])

    useEffect(() => {
        if (matchData?.end_match) {
            clearInterval(timer)
        }
    }, [matchData])

    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 4, borderBottomWidth: 1, borderColor: "white" }}>
            {/* Relógio */}
            <View style={{ flexDirection: "row", gap: 4, alignItems: 'center', zIndex: 1 }}>
                <ThemedText>{tempoPercorrido}</ThemedText>
                <ThemedText><AntDesign name="clockcircleo" size={18} /></ThemedText>
                <ThemedText>Round {matchData?.round_match}</ThemedText>
            </View>
            {/* Botões de ação dependendo da fase do turno*/}
            <ActionButtons />
            {/* Contador de Sabedoria */}
            <Pressable
                onPress={() => {
                    setShowMenu(true)
                }}
            >
                <ThemedView style={{ flexDirection: "row", gap: 4, justifyContent: 'center', alignItems: "center", borderWidth: 1, borderRadius: 8, width: 100 }}>
                    <ThemedText>{player?.wisdom_available}</ThemedText>
                    <Image
                        source={require('@/assets/images/Icons/wisdon.png')}
                    />
                    <ThemedText>{player?.wisdom_points}</ThemedText>
                </ThemedView>
            </Pressable>
            <ThemedModal visible={showMenu} title='Opções' closeModal={() => setShowMenu(false)} >
                <View style={{ width: '30%' }}>
                    {/* Botão de se render */}
                    {player?.faith_points! > 0 && !matchData?.end_match &&
                        <BasicButton
                        height={40}
                            onPress={() => {
                                WS.sendJsonMessage({
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
                                        "move_type": "surrender"
                                    }
                                })
                            }}
                        >
                            Render-se
                        </BasicButton>
                    }
                    {/* Botão de sair da sala */}
                    {(player?.faith_points! <= 0 || matchData?.end_match) &&
                        <BasicButton
                            onPress={() => {
                                dispatch(leaveMatch())
                            }}
                        >
                            Sair
                        </BasicButton>
                    }
                </View>
            </ThemedModal>
        </View>
    )
}