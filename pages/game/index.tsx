import { useSelector } from 'react-redux'
import { RootReducer } from '@/store';

import SearchRoom from '@/pages/game/searchRoom';
import GameBoard from '@/pages/game/gameBoardTable';

export default function GamePage() {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.data)
    if (matchData) {
        return <GameBoard data={matchData} />
    }
    return <SearchRoom />
}
