import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import SearchRoom from '@/pages/game/searchRoom';
import GameRoom from '@/pages/game/gameRoom';
import GameBoard from '@/pages/game/gameBoardTable';


export default function GamePage() {
    const roomData = useSelector((state: RootReducer) => state.matchReducer.room_data)
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    const playerData = useSelector((state: RootReducer) => state.matchReducer.player_data)
    const userData = useSelector((state: RootReducer) => state.authReducer.user_data)


    if (roomData) {
        return <GameRoom />
    }
    else if (matchData) {
        return <GameBoard />
    }
    return <SearchRoom />
}
