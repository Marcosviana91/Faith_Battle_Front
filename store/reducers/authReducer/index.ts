import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: UserStoreProps = {
    user_data: undefined,
    player_data: undefined,
}


const authSlice = createSlice({
    name: "userAuthData",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserProps>) => {
            if (action.payload.id) {
                state.user_data = action.payload
            }
        },
        logout: (state) => {
            state.user_data = undefined
            state.player_data = undefined
        }
    }
})
export const { login, logout } = authSlice.actions
export default authSlice.reducer