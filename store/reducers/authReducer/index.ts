import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: UserStoreProps = {
    data: undefined
}

const ainitialState: UserStoreProps = {
    data: {
        id: 1,
        username: "Marcox00",
        real_name: "Marcos Viana",
        email: "marcos.viana.91@gmail.com",
    }
}

const authSlice = createSlice({
    name: "userAuthData",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserProps>) => {
            console.log('Login reducer...')
            if (action.payload.id) {
                state.data = action.payload
            }
            console.log(state.data)
            console.log(action.payload.id)
        },
        logout: (state) => {
            state.data = undefined
            console.log('Logout reducer...')
        }
    }
})
export const { login, logout } = authSlice.actions
export default authSlice.reducer