import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import matchReducer from './reducers/matchReducer'

import api from './api'

export const store = configureStore({
    reducer: {
        authReducer: authReducer,
        matchReducer: matchReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>