import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import useWebSocket from 'react-use-websocket';
import { useNavigation } from '@react-navigation/native';

import { RootReducer } from '@/store';
import { logout } from '@/store/reducers/authReducer';
import { leaveMatch } from '@/store/reducers/matchReducer';

import Home from '@/pages/home/home';
import Login from '@/pages/home/login';

import {URI} from "@/store/server_urls";


export default function HomeScreen() {
    const userData = useSelector((state: RootReducer) => state.authReducer.data)
    // const [socketUrl, setSocketUrl] = useState('ws://localhost')
    // const WS = useWebSocket(socketUrl, {share:true});
    const dispatch = useDispatch()
    const navigation = useNavigation()

    // useEffect(() => {
    //     if (userData) {
    //         setSocketUrl(`wss://${URI}/websocket_conn`)
    //         WS.sendJsonMessage({
    //             data_type: 'player_logged_in',
    //             user_data: userData
    //         })
    //     }
    //     if (!userData) {
    //         setSocketUrl('ws://localhost')
    //     }
    // }, [userData])
    
    // useEffect(() => {
    //     if (WS.readyState == 3 && socketUrl!=='ws://localhost') {
    //         console.log("Disconnected...")
    //         // dispatch(logout())
    //         dispatch(leaveMatch())
    //         // navigation.navigate('Home' as never)
    //     }

    // }, [WS.readyState])

    if (userData) {
        return <Home />;
    }
    return < Login />
}