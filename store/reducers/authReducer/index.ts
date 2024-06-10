import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const ainitialState: UserStoreProps = {
    data: undefined
}

const initialState: UserStoreProps = {
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
            state.data = action.payload
            console.log('Login reducer...')
            console.log(state)
            console.log(action.payload)
        },
        logout: (state) => {
            state.data = undefined
            console.log('Logout reducer...')
        }
    }
})
export const { login } = authSlice.actions
export default authSlice.reducer