
import { View, Image, Text, StyleSheet } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';

import { URI } from "@/store/server_urls";


type Props = {
    id: number
    isReady?: boolean
}

export default function PlayerRoomMini(props: Props) {
    if (props.id === 0) {
        return (
            <View style={[styles.playerIcon, { backgroundColor: '#777', borderColor: '#444' }]}>
                <Text>OPEN</Text>
            </View>
        )

    }

    return (
        <View style={[styles.playerIcon, styles.playerImage]}>
            <Image
                style={{ height: 75, width: 75 }}
                source={{
                    uri: `http://${URI}/static/profile_images/${props.id}.png`,
                }}
            />
            {props.isReady &&
                <Ionicons name="checkmark-circle" size={32} color="black" style={{ position: 'absolute', bottom: -8, right: -8 }}
                />}
        </View>
    )
}

const styles = StyleSheet.create({
    playerIcon: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#88f",
        width: 75,
        height: 125,
        borderRadius: 25,
        borderColor: "blue",
        borderWidth: 2,
        overflow: "hidden",
    },
    playerImage: {
        justifyContent: "flex-start",
        alignItems: "center",
    },
})