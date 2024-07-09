import { createSlice, PayloadAction } from '@reduxjs/toolkit'

var initialState: MatchReducerProps = {
    room_data: undefined,
    match_data: undefined,
    player_data: undefined
}

var _0initialState: MatchReducerProps = {
    room_data: {
        id: "1",
        room_stage: 0,
        name: "Sala de Teste",
        match_type: "survival",
        max_players: 8,

        connected_players: [
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
        id: "1",
        room_stage: 1,
        name: "Sala de Teste",
        match_type: "survival",
        max_players: 8,

        connected_players: [
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
        card_hand: [
            'abraao', 'adao', 'daniel',
            'davi', 'elias',
        ]
    }
}

var _2initialState: MatchReducerProps = {
    match_data: {
        id: "1",
        match_type: "survival",
        max_players: 8,

        start_match: '0000000000',

        players_in_match: [
            {
                id: 1,
                card_prepare_camp: ['adao', 'daniel'],
                card_battle_camp: ["sansao"],
                card_in_forgotten_sea: [],
                wisdom_points: 2,
                faith_points: 15,
                wisdom_used: 0,
            },
            {
                id: 2,
                card_prepare_camp: ['jaco', "jose-do-egito"],
                card_battle_camp: ["noe"],
                card_in_forgotten_sea: [],
                wisdom_points: 2,
                faith_points: 15,
                wisdom_used: 0,
            },
            {
                id: 3,
                card_prepare_camp: ["salomao", "sansao"],
                card_battle_camp: ['jaco'],
                card_in_forgotten_sea: [],
                wisdom_points: 2,
                faith_points: 15,
                wisdom_used: 0,
            },
        ]
    },
    player_data: {
        id: 3,
        card_hand: [
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