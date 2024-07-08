import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RootReducer } from '@/store';

import useWebSocket from 'react-use-websocket';
import { URI } from "@/store/server_urls";
import { setMatch, leaveMatch } from "@/store/reducers/matchReducer"

import SearchRoom from '@/pages/game/searchRoom';
import GameRoom from '@/pages/game/gameRoom';
import GameBoard from '@/pages/game/gameBoardTable';


export default function GamePage() {
    const dispatch = useDispatch()
    const roomData = useSelector((state: RootReducer) => state.matchReducer.room_data)
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const playerData = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const userData = useSelector((state: RootReducer) => state.authReducer.user_data)

    const WS = useWebSocket(`ws://${URI}/websocket_conn`, { share: true });

    // console.log(roomData)

    // useEffect(() => {
    //     if (WS.lastJsonMessage) {
    //         const data = WS.lastJsonMessage as APIResponseProps
    //         console.log('<<<<< RESP: ', data)
    //         if (data.data_type === "created") {
    //             WS.sendJsonMessage({
    //                 data_type: 'connect',
    //                 room_data: {
    //                     id: data.room_data?.id
    //                 },
    //                 user_data: {
    //                     id: userData?.id
    //                 }
    //             })
    //         }
    //         else if (data.data_type === "room_update") {
    //             console.log('Updating room...')
    //             dispatch(setMatch({
    //                 room_data: data.room_data,
    //                 player_data: playerData,
    //             }))
    //         }
    //         else if (data.data_type === "player_update") {
    //             console.log('Updating player...')
    //             dispatch(setMatch({
    //                 room_data: roomData,
    //                 player_data: data.player_data,
    //             }))
    //         }
    //         else if (data.data_type === "disconnected") {
    //             console.log('Leaving the room...')
    //             dispatch(leaveMatch())
    //         }
    //     }

    // }, [WS.lastJsonMessage])

    if (roomData) {
        // return null
        return <GameRoom />
        // else if (roomData.room_stage === 2) {
        //     return <GameBoard />
        // }
    }
    return <SearchRoom />
}
