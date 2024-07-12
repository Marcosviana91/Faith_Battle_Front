import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

import { RootReducer } from '@/store';

import Home from '@/pages/home/home';
import Login from '@/pages/home/login';

import useWebSocket from 'react-use-websocket';
import { URI } from "@/store/server_urls";
import { setRoom, setPlayer, leaveMatch, setMatch } from "@/store/reducers/matchReducer"

export default function HomeScreen() {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const userData = useSelector((state: RootReducer) => state.authReducer.user_data)
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const roomData = useSelector((state: RootReducer) => state.matchReducer.room_data)
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

    useEffect(()=>{
        if (matchData || roomData) {
            navigation.navigate('Jogar' as never)
        }
    }, [matchData, roomData])

    useEffect(() => {
        if (userData) {
            setWsUrl(`ws://${URI}/ws/`)
        }
        else {
            setWsUrl(``)
        }
    }, [userData])

    useEffect(() => {
        if (WS.lastJsonMessage) {
            const data = WS.lastJsonMessage as APIResponseProps
            console.log('<<<<< RESP: ', data)
            if (data.data_type === "room_update") {
                console.log('room_update')
                dispatch(setRoom(data.room_data!))
            }
            else if (data.data_type === "player_update") {
                console.log('player_update')
                dispatch(setPlayer(data.player_data!))
            }
            else if (data.data_type === "disconnected") {
                console.log('disconnected')
                dispatch(leaveMatch())
            }
            else if (data.data_type === "match_update") {
                console.log('match_update')
                dispatch(setRoom(undefined))
                dispatch(setMatch(data.match_data!))
            }
        }
    }, [WS.lastJsonMessage])

    if (userData) {
        return <Home />;
    }
    return < Login />
}