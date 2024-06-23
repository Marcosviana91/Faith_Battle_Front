import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {URI} from "@/store/server_urls";

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${URI}`
    }),
    endpoints: (builder) => ({
        login: builder.mutation<APIResponseProps, AuthProps>({// tipa o response, tipa o request
            query: userData => ({
                url: "/auth",
                method: "POST",
                body: userData
            })
        }),
        newUser: builder.mutation<any, UserProps>({
            query: newUserData => ({
                url: "/newuser",
                method: 'POST',
                body: newUserData
            })
        }),
        getRooms: builder.query<APIResponseProps, void>({
            query: () => ({
                url: "/match",
            })
        }),
    })
})


export const {
    useLoginMutation,
    useNewUserMutation,
    useGetRoomsQuery
} = api
export default api