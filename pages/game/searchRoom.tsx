import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RootReducer } from '@/store';

import { StyleSheet, View, Text } from 'react-native';

import { useCreateRoomsMutation } from '@/store/api'
import { setRoom } from "@/store/reducers/matchReducer";

import SearchRoomList from '@/pages/game/searchRoomList'
import ToggleButton from '@/components/button/toggle';
import BasicButton from '@/components/button/basic';

import { ThemedTextInput } from '@/components/themed/ThemedTextInput';


export default function SearchRoom() {
    const dispatch = useDispatch()
    const userData = useSelector((state: RootReducer) => state.authReducer.user_data)
    const [createRoom, { data: createdRoomData }] = useCreateRoomsMutation();


    const gameTypesList = ['survival', 'cooperative']
    // Create new room 'form' values
    const [newRoomName, setNewRoomName] = useState(`Sala de ${userData!.username}`)
    const [newRoomGameType, setNewRoomGameType] = useState('survival')
    const [newRoomPlayerQtd, setNewRoomPlayerQtd] = useState('2')
    const [newRoomPassword, setNewRoomPassword] = useState('')

    const buttons = ['Entrar', 'Criar']
    const [table, setTable] = useState(0)

    useEffect(() => {
        if (createdRoomData?.room_data) {
            dispatch(setRoom(createdRoomData.room_data))
        }
    }, [createdRoomData])


    return (
        <View style={[styles.container, { backgroundColor: "#000000b3" }]}>
            <View style={styles.searchRoomContainer} >
                <View style={{ flexDirection: "row", width: '95%' }}>
                    <View style={{ width: '100%', padding: 10, flexDirection: "row" }}>
                        <ToggleButton values={buttons} onPress={setTable} />
                    </View>
                </View>
                {table === 0 && (
                    <SearchRoomList />
                )}
                {table === 1 && (
                    <View style={styles.roomListContainer} >
                        <View style={styles.container}>
                            <Text>Nome da Sala</Text>
                            <ThemedTextInput
                                style={{ width: "100%" }}
                                placeholder='Insira um nome'
                                value={newRoomName}
                                onChangeText={setNewRoomName}
                            />
                        </View>
                        <View style={styles.container}>
                            <Text>Estilo de Jogo</Text>
                            <ToggleButton
                                disabled
                                values={gameTypesList}
                                onPress={setNewRoomGameType}
                            />
                        </View>
                        <View style={[styles.container, { flexDirection: 'row', gap: 15 }]}>
                            <Text>Jogadores:</Text>
                            <ThemedTextInput
                                inputMode='numeric'
                                placeholder='2 - 8'
                                value={newRoomPlayerQtd}
                                onChangeText={setNewRoomPlayerQtd}
                            />
                        </View>
                        <View style={[styles.container, { flexDirection: 'row', gap: 15 }]}>
                            <Text>Senha:</Text>
                            <ThemedTextInput placeholder='letras e números apenas'
                                value={newRoomPassword}
                                onChangeText={setNewRoomPassword}
                            />
                        </View>
                        <BasicButton
                            height={50}
                            onPress={() => {
                                createRoom({
                                    name: newRoomName,
                                    created_by: {
                                        id: userData?.id,
                                        available_cards: userData?.available_cards,
                                        xp_points: 0
                                    },
                                    match_type: newRoomGameType,
                                    max_players: Number(newRoomPlayerQtd),
                                    password: newRoomPassword
                                })
                            }}>
                            Criar
                        </BasicButton>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    searchRoomContainer: {
        width: "90%",
        height: "70%",
        backgroundColor: "#D9BD76",
        alignItems: "center",
        padding: 8,
    },
    roomListContainer: {
        backgroundColor: "red",
        width: "95%",
        flex: 1,
        borderRadius: 8,
        padding: 8,
        rowGap: 8,
    }
});