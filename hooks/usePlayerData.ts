import { RootReducer } from "@/store"
import { useSelector } from "react-redux"


export function usePlayerData(player_id: number): PlayersInMatchApiProps | undefined {
    try {
        const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)

        let player_data = undefined
        matchData!.players_in_match!.map((_team, _team_index) => {
            _team.map(player => {
                if (player.id === player_id) {
                    player_data = player;
                }
            })
        })

        return player_data

    } catch (error) {
        return undefined
    }
}