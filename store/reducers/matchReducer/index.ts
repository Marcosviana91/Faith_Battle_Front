import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: MatchApiProps = {
    data: undefined
}

const ainitialState: MatchApiProps = {
    data: {
        id: 1,
        start_match: "2024-05-21 23:03:37.339495",
        // end_match: "2024-05-21 23:33:37.339495",
        match_type: 0,
        player_focus: undefined,
        players_in_match: [
            {
                id: 1,
                wisdom: 3,
                deck: [1, 2, 3, 4, 6, 7, 10, 11, 12, 13, 15, 16, 17, 21, 22, 23, 25, 26, 27, 28, 29, 31, 32, 34, 35, 36, 37, 39, 41, 42, 43],
                cards_in_hand: [5, 18, 33, 38, 40],
                cards_in_prepare_zone: [8, 14],
                cards_in_battle_zone: [9, 19],
                cards_in_forgotten_sea: [20, 24, 30],
            },
            {
                id: 32,
                wisdom: 3,
                cards_in_prepare_zone: [2, 6, 18],
                cards_in_battle_zone: [3, 4, 15],
                cards_in_forgotten_sea: [1, 20],
            },
            {
                id: 5,
                wisdom: 3,
                cards_in_prepare_zone: [7, 9, 10],
                cards_in_battle_zone: [8, 13, 16],
                cards_in_forgotten_sea: [],
            },

        ],
    }
}

const matchSlice = createSlice({
    name: "userAuthData",
    initialState,
    reducers: {
        start: (state, action: PayloadAction<MatchApiProps>) => {
            state.data = action.payload.data
            console.log('Start Match reducer...')
            console.log(state)
            console.log(action.payload)
        },
        setPlayerFocus: (state, action: PayloadAction<number>) => {
            if (state.data) {
                state.data.player_focus = action.payload
            }
        },
        move: (state, action: PayloadAction<MatchApiProps>) => {
            state.data = action.payload.data
            console.log('Move in Match reducer...')
            console.log(state)
            console.log(action.payload)
        },
        end: (state) => {
            state.data = undefined
            console.log('End Match reducer...')
        }
    }
})
export const { start, setPlayerFocus, move, end } = matchSlice.actions
export default matchSlice.reducer