import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

import { RootReducer } from '@/store';

import Home from '@/pages/home/home';
import Login from '@/pages/home/login';

import { setRoom, setPlayer, leaveMatch, setMatch, setCurrentSkill } from "@/store/reducers/matchReducer"
import { logout } from "@/store/reducers/authReducer"
import { setServerSettings } from '@/store/reducers/appReducer';
import { removeData } from '@/store/database';
import { useGetServerDataQuery } from '@/store/api'

import useAppWebSocket from '@/hooks/useAppWebSocket';

import { getAvatarFromServer } from '@/utils/FileSystem/Avatar';


export default function HomeScreen() {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const userData = useSelector((state: RootReducer) => state.authReducer.user_data)
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const roomData = useSelector((state: RootReducer) => state.matchReducer.room_data)
    const currentServerData = useSelector((state: RootReducer) => state.appReducer.server)

    const serverData = useGetServerDataQuery()
    const WS = useAppWebSocket()

    useEffect(()=>{
        serverData.refetch()
    }, [])

    useEffect(() => {
        if (serverData.data) {
            dispatch(setServerSettings(serverData.data))
        }
    }, [serverData])

    useEffect(() => {
        if (currentServerData.avatar_list && currentServerData.avatar_list.length > 0) {
            getAvatarFromServer(currentServerData.avatar_list)
        }
    }, [currentServerData.avatar_list])


    useEffect(() => {
        if (userData) {
            if (matchData || roomData) {
                navigation.navigate('Jogar' as never)
            }
        }
    }, [matchData, roomData])


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
            else if (data.data_type === "token_expired") {
                console.log('token_expired')
                removeData('faith_battle_user')
                dispatch(leaveMatch())
                dispatch(logout())
            }
            else if (data.data_type === "disconnected") {
                console.log('disconnected')
                dispatch(leaveMatch())
                dispatch(setCurrentSkill(undefined))
            }
            else if (data.data_type === "match_update") {
                console.log('match_update')
                dispatch(setRoom(undefined))
                if (data.match_data?.player_turn === userData?.id && matchData?.player_focus_id) {
                    dispatch(setMatch({ ...data.match_data!, player_focus_id: matchData!.player_focus_id }))
                } else {
                    dispatch(setMatch({ ...data.match_data!, player_focus_id: data.match_data?.player_turn }))
                }
            }
            else if (data.data_type === "card_skill") {
                console.log('card_skill')
                dispatch(setCurrentSkill(data.card_data!))
            }
        }
    }, [WS.lastJsonMessage])

    if (userData) {
        return <Home />;
    }
    return < Login />
}

