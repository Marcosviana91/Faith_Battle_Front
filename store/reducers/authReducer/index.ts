import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: UserStoreProps = {
    data: undefined
}


const authSlice = createSlice({
    name: "userAuthData",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserProps>) => {
            if (action.payload.id) {
                state.data = action.payload
            }
        },
        logout: (state) => {
            state.data = undefined
        }
    }
})
export const { login, logout } = authSlice.actions
export default authSlice.reducer