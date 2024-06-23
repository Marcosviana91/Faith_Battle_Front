import { createSlice, PayloadAction } from '@reduxjs/toolkit'

var initialState: MatchReducerProps = {
    room_data: undefined,
    player_data: undefined
}

var _0initialState: MatchReducerProps = {
    room_data: {
        id: 1,
        stage: 0,
        room_name: "Sala de Teste",
        room_current_players: 3,
        room_game_type: "survival",
        room_max_players: 8,

        players_in_match: [
            {
                id: 1,
                ready: true,
            },
            {
                id: 2,
                ready: true,
            },
            {
                id: 3,
                ready: true,
            },
        ]
    },
    player_data: undefined
}

var _1initialState: MatchReducerProps = {
    room_data: {
        id: 1,
        stage: 1,
        room_name: "Sala de Teste",
        room_current_players: 3,
        room_game_type: "survival",
        room_max_players: 8,

        players_in_match: [
            {
                id: 1,
                ready: false,
            },
            {
                id: 2,
                ready: false,
            },
            {
                id: 3,
                ready: true,
            },
        ]
    },
    player_data: {
        id: 3,
        ready: true,
        cards_in_hand: [
            'abraao', 'adao', 'daniel',
            'davi', 'elias',
        ]
    }
}

var _2initialState: MatchReducerProps = {
    room_data: {
        id: 1,
        stage: 2,
        room_name: "Sala de Teste",
        room_current_players: 3,
        room_game_type: "survival",
        room_max_players: 8,

        start_match: '0000000000',

        players_in_match: [
            {
                id: 1,
                ready: false,
                cards_in_prepare_zone: ['adao', 'daniel'],
                cards_in_battle_zone: ["sansao"],
                cards_in_forgotten_sea: [],
                wisdom: 2,
                faith: 15
            },
            {
                id: 2,
                ready: false,
                cards_in_prepare_zone: ['jaco', "jose-do-egito"],
                cards_in_battle_zone: ["noe"],
                cards_in_forgotten_sea: [],
                wisdom: 2,
                faith: 15
            },
            {
                id: 3,
                ready: false,
                cards_in_prepare_zone: ["salomao", "sansao"],
                cards_in_battle_zone: ['jaco'],
                cards_in_forgotten_sea: [],
                wisdom: 2,
                faith: 15
            },
        ]
    },
    player_data: {
        id: 3,
        cards_in_hand: [
            'abraao', 'adao', 'daniel',
            'davi', 'elias', 'ester',
            "maria",
        ]
    }
}

const matchSlice = createSlice({
    name: "matchData",
    initialState,
    reducers: {
        setMatch: (state, action: PayloadAction<MatchReducerProps>) => {
            state.room_data = action.payload.room_data
            state.player_data = action.payload.player_data
        },
        setPlayerFocus: (state, action: PayloadAction<number>) => {
            state.room_data!.player_focus = action.payload
        },
        leaveMatch: (state) => {
            state.room_data = undefined
            state.player_data = undefined
        },

    }
})
export const { setMatch, setPlayerFocus, leaveMatch } = matchSlice.actions
export default matchSlice.reducer