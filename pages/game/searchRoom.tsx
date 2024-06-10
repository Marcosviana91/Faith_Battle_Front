import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ToastAndroid, ScrollView } from 'react-native';

import SearchRoomRow from '@/components/searchRoomRow';
import ToggleButton from '@/components/button/toggle';
import BasicButton from '@/components/button/basic';

import { globalStyles } from '@/constants/Styles';

const roomList: RoomApiProps[] = [
    {
        room_id: 1,
        room_name: "Sala 01",
        room_game_style: "coop",
        room_current_players: 1,
        room_max_players: 8,
    },
    {
        room_id: 2,
        room_name: "Sala 02",
        room_game_style: "survival",
        room_current_players: 3,
        room_max_players: 4,
    },
    {
        room_id: 123457,
        room_name: "ABCDEFGHIJKLMNOPQRSTU",
        room_game_style: "survival",
        room_current_players: 3,
        room_max_players: 4,
    },
    {
        room_id: 123458,
        room_name: "ABCDEFGHIJKLMNOPQRSTU",
        room_game_style: "survival",
        room_current_players: 3,
        room_max_players: 4,
    },
    {
        room_id: 123459,
        room_name: "ABCDEFGHIJKLMNOPQRSTU",
        room_game_style: "survival",
        room_current_players: 3,
        room_max_players: 4,
    },
    {
        room_id: 123450,
        room_name: "ABCDEFGHIJKLMNOPQRSTU",
        room_game_style: "survival",
        room_current_players: 3,
        room_max_players: 4,
    },
    {
        room_id: 123451,
        room_name: "ABCDEFGHIJKLMNOPQRSTU",
        room_game_style: "survival",
        room_current_players: 3,
        room_max_players: 4,
    },
    {
        room_id: 123452,
        room_name: "ABCDEFGHIJKLMNOPQRSTU",
        room_game_style: "survival",
        room_current_players: 3,
        room_max_players: 4,
    },
]

export default function SearchRoom() {
    const playerData = useSelector((state: RootReducer) => state.authReducer.data)

    const gameTypesList = ['cooperativo', 'sobrevivência']
    // Create new room 'form' values
    const [newRoomName, setNewRoomName] = useState(`Sala de ${playerData!.username}`)
    const [newRoomGameType, setNewRoomGameType] = useState(0)
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
                    <View style={{ width: '100%' }}>
                        <View style={{flexDirection:'row', gap:10}}>
                            <Text>Filtro:</Text>
                            <TextInput style={[globalStyles.textInput, {flex:1}]}/>
                        </View>
                        <SearchRoomRow room_id={0} />
                        <ScrollView style={{ height: 270 }}>

                            <View style={styles.roomListContainer} >
                                {roomList.map((room) => {
                                    return <SearchRoomRow key={room.room_id} {...room} />
                                })}
                            </View>
                        </ScrollView>

                    </View>
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
                            ToastAndroid.showWithGravity(`Criando sala...\n\nNome: ${newRoomName}\nEstilo: ${gameTypesList[newRoomGameType]}\nQuantidade: ${newRoomPlayerQtd}\nSenha: ${newRoomPassword === '' ? '[sala aberta]' : newRoomPassword}\n`, ToastAndroid.LONG, ToastAndroid.CENTER)
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