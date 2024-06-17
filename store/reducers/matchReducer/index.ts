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
                deck: ['abraao', 'adao', 'daniel',
                    'davi', 'elias', 'ester',
                    'eva', 'jaco', "jose-do-egito",
                    "josue", "maria", "moises",
                    "noe", "salomao", "sansao",
                    'abraao', "moises", "sansao",],
                cards_in_hand: ['abraao', 'adao', 'daniel',
                    'davi', 'elias',],
                cards_in_prepare_zone: ['eva', 'jaco'],
                cards_in_battle_zone: ["jose-do-egito",
                    "josue"],
                cards_in_forgotten_sea: ["maria", "moises",],
            },
            {
                id: 2,
                wisdom: 3,
                deck: ['abraao', 'adao', 'daniel',
                    'davi', 'elias', 'ester',
                    'eva', 'jaco', "jose-do-egito",
                    "josue", "maria", "moises",
                    "noe", "salomao", "sansao",
                    'abraao', "moises", "sansao",],
                cards_in_hand: ['abraao', 'adao', 'daniel',
                    'davi', 'elias',],
                cards_in_prepare_zone: ['eva', 'jaco'],
                cards_in_battle_zone: ["jose-do-egito",
                    "josue"],
                cards_in_forgotten_sea: ["maria", "moises",],
            },
            {
                id: 3,
                wisdom: 3,
                deck: ['abraao', 'adao', 'daniel',
                    'davi', 'elias', 'ester',
                    'eva', 'jaco', "jose-do-egito",
                    "josue", "maria", "moises",
                    "noe", "salomao", "sansao",
                    'abraao', "moises", "sansao",],
                cards_in_hand: ['abraao', 'adao', 'daniel',
                    'davi', 'elias',],
                cards_in_prepare_zone: ['eva', 'jaco'],
                cards_in_battle_zone: ["jose-do-egito",
                    "josue"],
                cards_in_forgotten_sea: ["maria", "moises",],
            },
        ],
    }
}

const matchSlice = createSlice({
    name: "matchData",
    initialState,
    reducers: {
        enter: (state, action: PayloadAction<MatchApiProps>) => {
            state.data = action.payload.data
            console.log('Enter Match reducer...')
            console.log(state)
            console.log(action.payload)
        },
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