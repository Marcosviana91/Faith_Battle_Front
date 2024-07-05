import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {URI} from "@/store/server_urls";

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${URI}`
    }),
    endpoints: (builder) => ({
        login: builder.mutation<TokenAuthProps, AuthProps>({// tipa o response, tipa o request
            query: userData => ({
                url: "/auth/token",
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: new URLSearchParams(userData),
            })
        }),
        newUser: builder.mutation<any, UserProps>({
            query: newUserData => ({
                url: "/user/",
                method: 'POST',
                body: newUserData
            })
        }),
        editUser: builder.mutation<APIResponseProps, UserProps>({
            query: newUserData => ({
                url: `/user/${newUserData.id}`,
                method: 'PUT',
                headers: {"Authorization": `Bearer ${newUserData.token}`},
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
    useEditUserMutation,
    useGetRoomsQuery
} = api
export default api