import { RootReducer } from "@/store"
import { useSelector } from "react-redux"

export const AVATAR = [
    {
        name: "Abraão",
        path: require("@/assets/images/Avatar/1.png"),
    },
    {
        name: "Adão",
        path: require("@/assets/images/Avatar/2.png"),
    },
    {
        name: "Davi",
        path: require("@/assets/images/Avatar/3.png"),
    },
    {
        name: "Ester",
        path: require("@/assets/images/Avatar/4.png"),
    },
    {
        name: "Eva",
        path: require("@/assets/images/Avatar/5.png"),
    },
    {
        name: "Josué",
        path: require("@/assets/images/Avatar/6.png"),
    },
    {
        name: "Maria",
        path: require("@/assets/images/Avatar/7.png"),
    },
    {
        name: "Moisés",
        path: require("@/assets/images/Avatar/8.png"),
    },
    {
        name: "Salomão",
        path: require("@/assets/images/Avatar/9.png"),
    },
    {
        name: "Sansão",
        path: require("@/assets/images/Avatar/10.png"),
    },
]

export function useAvatar(
    props: { avatar_index: number }
) {
    return AVATAR[props.avatar_index].path
}

export function usePlayerData(player_id: number) {
    const matchData = useSelector((state: RootReducer) => state.matchReducer.match_data)
    
    const _data = matchData!.players_in_match!.filter((player) => player.id === player_id)
    return _data[0]
}