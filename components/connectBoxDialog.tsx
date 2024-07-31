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

const card_list = [
    {"slug":'abraao'},
    {"slug":'adao'},
    {"slug":'daniel'},
    {"slug":'davi'},
    {"slug":'elias'},
    {"slug":'ester'},
    {"slug":'eva'},
    {"slug":'jaco'},
    {"slug":"jose-do-egito"},
    {"slug":"josue"},
    {"slug":"maria"},
    {"slug":"moises"},
    {"slug":"noe"},
    {"slug":"salomao"},
    {"slug":"sansao"},
]

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
        <Modal presentationStyle='overFullScreen' transparent>

            <View style={styles.container}>
                <ThemedView style={[styles.dialog, { borderWidth: 1, borderRadius: 24, padding: 8 }]}>
                    {/* Header */}
                    <View style={{ flexDirection: "row", width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-between' }}>
                        <ThemedText style={{ paddingStart: 8 }} type='subtitle'>ID: {props.id}</ThemedText>
                        <TouchableHighlight onPress={props.onClose} style={{ borderRadius: 50 }}>
                            <ThemedText style={{ height: "100%", lineHeight: 48 }}>
                                <Ionicons name="close-circle-outline" size={48} style={{ height: "100%" }} />
                            </ThemedText>
                        </TouchableHighlight>
                    </View>

                    {/* Content */}
                    <View style={{ flex: 1, padding: 8 }}>
                        <ThemedText >Nome: {props.name}</ThemedText>
                        <ThemedText >Tipo da partida: {props.match_type}</ThemedText>
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
                                            {
                                                id: userData?.id,
                                                available_cards: card_list,
                                                xp_points: 200
                                            }
                                        ]
                                    })
                                }
                            }}
                            style={{ backgroundColor: isFull ? '#888' : "#090", borderRadius: 8 }}
                        >
                            <Ionicons name="enter-outline" size={48} color="black" />
                        </TouchableHighlight>
                    </View>
                </ThemedView>
            </View >
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
        width: "90%",
        height: 300,
    },
})