import useWebSocket from 'react-use-websocket';
import { URI } from "@/store/server_urls";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootReducer } from '@/store';

export default function useAppWebSocket() {
    const userData = useSelector((state: RootReducer) => state.authReducer.user_data)
    const [ws_url, setWsUrl] = useState("ws://localhost")
    const WS = useWebSocket(ws_url, {
        share: true,
        onOpen: () => {
            console.log({
                "data_type": "create_connection",
                "player_data": {
                    "id": userData?.id,
                    "token": userData?.token
                }
            })
            WS.sendJsonMessage(
                {
                    "data_type": "create_connection",
                    "player_data": {
                        "id": userData?.id,
                        "token": userData?.token
                    }
                }
            )
        },
        // shouldReconnect: () => Boolean(userData?.token),
        // reconnectInterval: 50,
        // retryOnError: true,
    })

    useEffect(() => {
        if (userData) {
            setWsUrl(`ws://${URI}/ws/`)
        }
        else {
            setWsUrl('ws://localhost')
        }
    }, [userData])
    
    return WS
}