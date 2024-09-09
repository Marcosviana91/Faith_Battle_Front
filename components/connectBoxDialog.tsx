import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, Text, TouchableHighlight, Modal } from 'react-native';
import { RootReducer } from '@/store';

import { useEnterRoomsMutation } from '@/store/api';
import { setRoom } from "@/store/reducers/matchReducer";

import { ThemedTextInput } from '@/components/themed/ThemedTextInput';
import { ThemedView } from '@/components/themed/ThemedView';
import { ThemedText } from '@/components/themed/ThemedText';

import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedModal } from './themed/ThemedModal';


type ModalProps = {
    onClose: () => void;
}

export default function ConnectBoxDialog(props: ModalProps & RoomApiProps) {
    const dispatch = useDispatch()
    const [roomPass, setRoomPass] = useState("")
    const userData = useSelector((state: RootReducer) => state.authReducer.user_data)
    const [enterRoom, { data: roomData }] = useEnterRoomsMutation()
    const isFull = (props.connected_players?.length == props.max_players)

    useEffect(() => {
        if (roomData?.room_data) {
            dispatch(setRoom(roomData.room_data))
            props.onClose()
        }
    }, [roomData])

    return (
        <ThemedModal presentationStyle='overFullScreen' transparent title={"ID: " + props.id} closeModal={props.onClose} >
            {/* Content */}
            <View style={{ width: '100%', minHeight: 150 }}>
                <ThemedText >Nome: {props.name}</ThemedText>
                <ThemedText >Jogadores: {props.connected_players?.length} / {props.max_players}</ThemedText>
                {/* Senhas */}
                {props.has_password && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                        <ThemedText>Digite a senha:</ThemedText>
                        <ThemedTextInput
                            value={roomPass}
                            onChangeText={setRoomPass}
                        />
                    </View>
                )}
            </View>
            {/* Footer */}
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 8 }}>
                <TouchableHighlight
                    disabled={isFull}
                    onPress={() => {
                        if (!isFull) {
                            if (roomPass == "") {
                                setRoomPass("undefined")
                            }
                            enterRoom({
                                id: props.id,
                                password: roomPass,
                                connected_players: [
                                    [
                                        {
                                            id: userData?.id,
                                        }
                                    ]
                                ]
                            })
                        }
                    }}
                    style={{ backgroundColor: isFull ? '#888' : "#090", borderRadius: 8 }}
                >
                    <Ionicons name="enter-outline" size={48} color="black" />
                </TouchableHighlight>
            </View>
        </ThemedModal >
    )
}
