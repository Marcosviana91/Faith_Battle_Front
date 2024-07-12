import { createSlice, PayloadAction } from '@reduxjs/toolkit'

var initialState: MatchReducerProps = {
    room_data: undefined,
    match_data: undefined,
    player_data: undefined
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