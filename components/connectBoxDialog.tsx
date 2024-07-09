import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootReducer } from '@/store';

import { useEnterRoomsMutation } from '@/store/api';
import { setRoom } from "@/store/reducers/matchReducer";

import { StyleSheet, View, Text, TouchableHighlight, Modal, TextInput } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { globalStyles } from '@/constants/Styles';

type ModalProps = {
    onClose: () => void;
}

export default function ConnectBoxDialog(props: ModalProps & RoomApiProps) {
    const dispatch = useDispatch()
    const [roomPass, setRoomPass] = useState("")
    const userData = useSelector((state: RootReducer) => state.authReducer.user_data)
    const [enterRoom, { data: roomData }] = useEnterRoomsMutation()

    useEffect(() => {
        if (roomData?.room_data) {
            dispatch(setRoom(roomData.room_data))
            props.onClose()
        }
    }, [roomData])

    return (
        <Modal presentationStyle='overFullScreen' transparent>

            <View style={styles.container}>
                <View style={styles.dialog}>
                    {/* Header */}
                    <View style={{ flexDirection: "row", width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ paddingStart: 8 }}>ID:: {props.id}</Text>
                        <TouchableHighlight onPress={props.onClose} style={{ alignSelf: 'flex-end', backgroundColor: '#700', borderRadius: 50 }}>
                            <Ionicons name="close-circle-outline" size={48} color="black" />
                        </TouchableHighlight>
                    </View>

                    {/* Content */}
                    <View style={{ flex: 1, padding: 8 }}>
                        <Text >Nome: {props.name}</Text>
                        <Text >Tipo da partida: {props.match_type}</Text>
                        <Text >Jogadores: {props.connected_players?.length} / {props.max_players}</Text>
                        {props.has_password && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                                <Text>Digite a senha:</Text>
                                <TextInput
                                    style={[globalStyles.textInput, { backgroundColor: 'cyan' }]}
                                    value={roomPass}
                                    onChangeText={setRoomPass}
                                />
                            </View>
                        )}
                    </View>

                    {/* Footer */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 8 }}>
                        <TouchableHighlight onPress={() => {
                            console.log("Conectando")
                            if (roomPass == "") {
                                setRoomPass("undefined")
                            }
                            enterRoom({
                                id: props.id,
                                password: roomPass,
                                connected_players: [
                                    {
                                        id: userData?.id,
                                        available_cards: [
                                            'abraao', 'adao', 'daniel',
                                            'davi', 'elias', 'ester',
                                            'eva', 'jaco', "jose-do-egito",
                                            "josue", "maria", "moises"
                                        ],
                                        xp_points: 200
                                    }
                                ]
                            })
                        }} style={{ backgroundColor: '#090', borderRadius: 8 }}>
                            <Ionicons name="enter-outline" size={48} color="black" />
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </Modal >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000c",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    dialog: {
        backgroundColor: "#fff",
        width: "90%",
        height: 300,
    },
})