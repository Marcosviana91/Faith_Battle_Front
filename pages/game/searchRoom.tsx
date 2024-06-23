import { useState } from 'react';
import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import useWebSocket from 'react-use-websocket';
import { URI } from "@/store/server_urls";

import { StyleSheet, View, Text, TextInput, ToastAndroid } from 'react-native';

import SearchRoomList from '@/pages/game/searchRoomList'
import ToggleButton from '@/components/button/toggle';
import BasicButton from '@/components/button/basic';

import { globalStyles } from '@/constants/Styles';


export default function SearchRoom() {
    const userData = useSelector((state: RootReducer) => state.authReducer.data)

    const WS = useWebSocket(`ws://${URI}/websocket_conn`, { share: true });

    const gameTypesList = ['cooperativo', 'sobrevivência']
    // Create new room 'form' values
    const [newRoomName, setNewRoomName] = useState(`Sala de ${userData!.username}`)
    const [newRoomGameType, setNewRoomGameType] = useState('survival')
    const [newRoomPlayerQtd, setNewRoomPlayerQtd] = useState('2')
    const [newRoomPassword, setNewRoomPassword] = useState('')

    const buttons = ['Entrar', 'Criar']
    const [table, setTable] = useState(0)


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
                            <TextInput
                                style={[globalStyles.textInput, { width: "100%", }]}
                                placeholder='Insira um nome'
                                value={newRoomName}
                                onChangeText={setNewRoomName}
                            />
                        </View>
                        <View style={styles.container}>
                            <Text>Estilo de Jogo</Text>
                            <ToggleButton
                                values={gameTypesList}
                                onPress={setNewRoomGameType}
                            />
                        </View>
                        <View style={[styles.container, { flexDirection: 'row', gap: 15 }]}>
                            <Text>Jogadores:</Text>
                            <TextInput
                                style={globalStyles.textInput}
                                inputMode='numeric'
                                placeholder='2 - 8'
                                value={newRoomPlayerQtd}
                                onChangeText={setNewRoomPlayerQtd}
                            />
                        </View>
                        <View style={[styles.container, { flexDirection: 'row', gap: 15 }]}>
                            <Text>Senha:</Text>
                            <TextInput style={globalStyles.textInput} placeholder='letras e números apenas'
                                value={newRoomPassword}
                                onChangeText={setNewRoomPassword}
                            />
                        </View>
                        <BasicButton onPress={() => {
                            // ToastAndroid.show(`Criando sala...\n\nNome: ${newRoomName}\nEstilo: ${gameTypesList[newRoomGameType]}\nQuantidade: ${newRoomPlayerQtd}\nSenha: ${newRoomPassword === '' ? '[sala aberta]' : newRoomPassword}\n`, ToastAndroid.LONG)

                            WS.sendJsonMessage({
                                data_type: "create",
                                room_data: {
                                    created_by: userData?.id,
                                    room_name: newRoomName,
                                    room_max_players: Number(newRoomPlayerQtd),
                                    room_game_type: newRoomGameType,
                                    password: newRoomPassword
                                }
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