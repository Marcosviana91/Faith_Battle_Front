import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

import { RootReducer } from '@/store';

import Home from '@/pages/home/home';
import Login from '@/pages/home/login';

import useWebSocket from 'react-use-websocket';
import { URI } from "@/store/server_urls";

export default function HomeScreen() {
    const userData = useSelector((state: RootReducer) => state.authReducer.user_data)
    const [ws_url, setWsUrl] = useState("")


    const WS = useWebSocket(ws_url, {
        share: true, onOpen: () => {
            WS.sendJsonMessage(
                {
                    "data_type": "create_connection",
                    "player_data": {
                        "id": userData?.id,
                        "token": userData?.token
                    }
                }
            )
        }
    });

    useEffect(() => {
        console.log(userData)
        if (userData) {
            setWsUrl(`ws://${URI}/ws/`)
        }
        else {
            setWsUrl(``)
        }
    }, [userData])


    if (userData) {
        return <Home />;
    }
    return < Login />
}