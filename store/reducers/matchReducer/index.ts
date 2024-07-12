import { createSlice, PayloadAction } from '@reduxjs/toolkit'

var initialState: MatchReducerProps = {
    room_data: undefined,
    match_data: undefined,
    player_data: undefined
}


var _initialState: MatchReducerProps = {
    match_data: {
        "id": "fake_match",
        "start_match": "2024-07-12T13:00:14.102025",
        "match_type": "survival",
        "round_match": 1,
        "player_turn": 0,
        "player_focus_id": 0,
        "can_others_move": false,
        "players_in_match": [
            {
                "id": 1,
                "card_hand": [
                    "josue",
                    "salomao",
                    "sansao",
                    "maria",
                    "ester",
                    "elias"
                ],
                "card_deck": [
                    "abraao",
                    "adao",
                    "daniel",
                    "davi",
                    "eva",
                    "jaco",
                    "jose-do-egito",
                    "moises",
                    "noe"
                ],
                "card_prepare_camp": [

                ],
                "card_battle_camp": [

                ],
                "card_in_forgotten_sea": [

                ],
                "faith_points": 15,
                "wisdom_points": 1,
                "wisdom_used": 0
            },
            {
                "id": 10,
                "card_hand": [
                    "moises",
                    "eva",
                    "maria",
                    "jose-do-egito",
                    "josue"
                ],
                "card_deck": [
                    "abraao",
                    "adao",
                    "daniel",
                    "davi",
                    "elias",
                    "ester",
                    "jaco",
                    "noe",
                    "salomao",
                    "sansao"
                ],
                "card_prepare_camp": [

                ],
                "card_battle_camp": [

                ],
                "card_in_forgotten_sea": [

                ],
                "faith_points": 15,
                "wisdom_points": 1,
                "wisdom_used": 0
            }
        ]
    },
    player_data: {
        id: 1,
        card_hand: [
            "josue",
            "salomao",
            "sansao",
            "maria",
            "ester",
            "elias"
        ],
    }
}

const matchSlice = createSlice({
    name: "matchData",
    initialState,
    reducers: {
        setRoom: (state, action: PayloadAction<RoomApiProps | undefined>) => {
            state.room_data = action.payload
        },
        setPlayer: (state, action: PayloadAction<PlayersInMatchApiProps>) => {
            state.player_data = action.payload
        },
        setMatch: (state, action: PayloadAction<MatchApiProps>) => {
            state.match_data = action.payload
        },
        setPlayerFocus: (state, action: PayloadAction<number>) => {
            state.match_data!.player_focus_id = action.payload
        },
        leaveMatch: (state) => {
            state.room_data = undefined
            state.match_data = undefined
            state.player_data = undefined
        },

    }
})
export const { setMatch, setRoom, setPlayer, setPlayerFocus, leaveMatch } = matchSlice.actions
export default matchSlice.reducer