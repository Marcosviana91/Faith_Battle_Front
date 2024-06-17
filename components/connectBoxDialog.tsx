import { StyleSheet, View, Text, TouchableHighlight, Pressable, Modal, TextInput } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

type ModalProps = {
    onClose: () => void;
}

export default function ConnectBoxDialog(props: ModalProps & RoomApiProps) {


    return (
        <Modal presentationStyle='overFullScreen' transparent>

            <View style={styles.container}>
                <View style={styles.dialog}>
                    {/* Header */}
                    <View style={{ flexDirection: "row", width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ paddingStart: 8 }}>Sala: {props.id}</Text>
                        <TouchableHighlight onPress={props.onClose} style={{ alignSelf: 'flex-end', backgroundColor: '#700', borderRadius: 50 }}>
                            <Ionicons name="close-circle-outline" size={48} color="black" />
                        </TouchableHighlight>
                    </View>
                    {/* Content */}
                    <View style={{ flex: 1, padding: 8 }}>
                        <Text >{props.room_name}</Text>
                        <Text >{props.room_game_type}</Text>
                        <Text >{props.room_current_players} / {props.room_max_players}</Text>
                        {props.has_password && (
                            <View>
                                <Text>Digite a senha</Text>
                                <TextInput style={{backgroundColor:'#009'}} />
                            </View>
                        )}

                    </View>
                    {/* Footer */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 8 }}>
                        <TouchableHighlight onPress={() => {
                            console.log("Conectar")
                            props.onClose()
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