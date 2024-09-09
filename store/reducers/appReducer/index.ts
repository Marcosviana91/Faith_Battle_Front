import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: AppSettingReducer = {
    server: {
        version: '',
        active_cards: []
    },
    settings: {
        version: 'alpha-1.0.0',
    }
}


const matchSlice = createSlice({
    name: "matchData",
    initialState,
    reducers: {
        setAppSettings: (state, action: PayloadAction<AppSettingProps>) => {
            state.settings = action.payload
        },
        setServerSettings: (state, action: PayloadAction<ServerSettingProps>) => {
            state.server = action.payload
        },
    }
})
export const { setAppSettings, setServerSettings } = matchSlice.actions
export default matchSlice.reducer