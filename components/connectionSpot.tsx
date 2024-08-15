// A single point to reveal WS connection status

import { RootReducer } from "@/store";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import useAppWebSocket from '@/hooks/useAppWebSocket';



export function ConnectionStatus() {
    const userData = useSelector((state: RootReducer) => state.authReducer.user_data)
    const WS = useAppWebSocket();

    const connectionStatusColor = [
        '#030',
        '#0F0',
        '#300',
        '#F00',
        '#777',
    ]


    const style = StyleSheet.create({
        point: {
            width: 10,
            height: 10,
            borderRadius: 5,
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 999,
            backgroundColor: connectionStatusColor[WS.readyState]
        },
        not_connected: {
            borderRadius: 0,
            width: "100%",
        }

    })

    if (userData) {
        return (
            <View style={[style.point, WS.readyState == 3 && style.not_connected]} />
        )
    }
}