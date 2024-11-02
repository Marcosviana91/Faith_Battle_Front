import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RootReducer } from '@/store';

import { StyleSheet, View, Text, ImageBackground } from 'react-native';

import { useCreateRoomsMutation } from '@/store/api'
import { setRoom } from "@/store/reducers/matchReducer";
import { useKeyboard } from '@/hooks/useKeyboard';

import SearchRoomList from '@/pages/game/searchRoomList'
import ToggleButton from '@/components/button/toggle';
import BasicButton from '@/components/button/basic';

import { ThemedTextInput } from '@/components/themed/ThemedTextInput';

const background = require('@/assets/images/mesa.jpg')


export default function SearchRoom() {
    const dispatch = useDispatch()
    const keyboardIsShow = useKeyboard()
    const userData = useSelector((state: RootReducer) => state.authReducer.user_data)
    const [createRoom, { data: createdRoomData }] = useCreateRoomsMutation();


    const gameTypesList = ['Sem time', '2 times', '4 times']
    // Create new room 'form' values
    const [newRoomName, setNewRoomName] = useState(`Sala de ${userData!.username}`)
    const [newRoomPlayerQtd, setNewRoomPlayerQtd] = useState(2)
    const [newRoomTeamsQtd, setNewRoomTeamsQtd] = useState(0)
    const [newRoomPassword, setNewRoomPassword] = useState('')

    const buttons = ['Entrar', 'Criar']
    const [table, setTable] = useState(0)

    const newRoomPlayerQtdOK = (newRoomPlayerQtd >= 2 && (newRoomPlayerQtd) <= 8)

    useEffect(() => {
        if (createdRoomData?.room_data) {
            dispatch(setRoom(createdRoomData.room_data))
        }
    }, [createdRoomData])

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        searchRoomContainer: {
            borderWidth: 1,
            borderColor:'white',
            borderRadius: 8,
            width: "90%",
            height: keyboardIsShow[0] ? "50%" : "70%",
            backgroundColor: "#1f1f1f7c",
            alignItems: "center",
            padding: 8,
        },
        roomListContainer: {
            borderWidth:1,
            borderColor: "#ccc",
            backgroundColor:'#ffffff4e',
            width: "95%",
            flex: 1,
            borderRadius: 8,
            padding: 8,
            rowGap: 8,
        }
    });


    return (
        <ImageBackground
            source={background}
            style={{ flex: 1, }}
            imageStyle={{ width: "100%", height: "100%" }}
            resizeMode='stretch'
        >
            <View style={[styles.container, { backgroundColor: "#000000b3", justifyContent: keyboardIsShow[0] ? 'flex-start' : 'center', paddingTop: keyboardIsShow[0] ? 16 : 0 }]}>
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
                                <Text>Quantidade de Times</Text>
                                <ToggleButton
                                    height={30}
                                    disabled
                                    values={gameTypesList}
                                    onPress={setNewRoomTeamsQtd}
                                />
                            </View>
                            <View style={[styles.container, { flexDirection: 'row', gap: 15 }]}>
                                <Text>Jogadores:</Text>
                                <ThemedTextInput
                                    inputMode='numeric'
                                    placeholder='2 - 8'
                                    value={String(newRoomPlayerQtd)}
                                    onChangeText={(val) => {
                                        setNewRoomPlayerQtd(Number(val)); val
                                    }}
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
                                disabled={
                                    !newRoomPlayerQtdOK || newRoomName === ''
                                }
                                onPress={() => {
                                    createRoom({
                                        name: newRoomName,
                                        created_by: {
                                            id: userData?.id
                                        },
                                        max_players: newRoomPlayerQtd,
                                        teams: Number(newRoomTeamsQtd) * 2,
                                        password: newRoomPassword
                                    })
                                }}>
                                Criar Sala
                            </BasicButton>
                        </View>
                    )}
                </View>
            </View>
        </ImageBackground>
    )
}
