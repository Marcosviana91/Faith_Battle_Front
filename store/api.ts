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
                body: userData,
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
        createRooms: builder.mutation<APIResponseProps, RoomApiProps>({
            query: (newRoomData) => ({
                url: "/room/",
                method: "POST",
                body: newRoomData
            })
        }),
        enterRooms: builder.mutation<APIResponseProps, RoomApiProps>({
            query: (roomData) => ({
                url: `/room/${roomData.id}/?password=${roomData.password}`,
                method: "POST",
                body: {
                    "id": roomData.connected_players![0].id,
                    "available_cards": roomData.connected_players![0].available_cards,
                    "xp_points": roomData.connected_players![0].xp_points
                }
            })
        }),
        getRooms: builder.query<APIResponseProps, void>({
            query: () => ({
                url: "/room/",
            })
        }),
    })
})


export const {
    useLoginMutation,
    useNewUserMutation,
    useEditUserMutation,
    useCreateRoomsMutation,
    useEnterRoomsMutation,
    useGetRoomsQuery
} = api
export default api