import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import matchReducer from './reducers/matchReducer'
import notificationReducer from './reducers/notificationReducer'
import appReducer from './reducers/appReducer'

import api from './api'

export const store = configureStore({
    reducer: {
        appReducer: appReducer,
        authReducer: authReducer,
        matchReducer: matchReducer,
        notificationReducer: notificationReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>