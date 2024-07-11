import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import useWebSocket from 'react-use-websocket';
import { URI } from "@/store/server_urls";

import SearchRoom from '@/pages/game/searchRoom';
import GameRoom from '@/pages/game/gameRoom';
import GameBoard from '@/pages/game/gameBoardTable';


export default function GamePage() {
    const roomData = useSelector((state: RootReducer) => state.matchReducer.room_data)
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const playerData = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const userData = useSelector((state: RootReducer) => state.authReducer.user_data)

    const WS = useWebSocket(`ws://${URI}/ws/`, { share: true });


    // console.log(roomData)


    if (roomData) {
        // return null
        return <GameRoom />
        // else if (roomData.room_stage === 2) {
        //     return <GameBoard />
        // }
    }
    return <SearchRoom />
}
