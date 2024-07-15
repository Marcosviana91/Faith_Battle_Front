import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: UserStoreProps = {
    user_data: undefined,
}

const _initialState: UserStoreProps = {
    user_data: {
        id: 1,
        username: "user_test",
        email: "teste@teste.com",
        real_name: "Teste da Silva",
    },
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
        }
    }
})
export const { login, logout } = authSlice.actions
export default authSlice.reducer