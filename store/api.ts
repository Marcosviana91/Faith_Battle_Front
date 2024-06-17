import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// WWW
const URI = 'http://marcosvianadev2.ddns.net:3188'
// Local Network
// const URI = 'http://192.168.1.32:8000'
// Docker
// const URI = 'http://192.168.1.32:3188'
// Local Machine
// const URI = 'http://127.0.0.1:8000'

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: URI
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
        api: builder.mutation<any, any>({
            query: apiData => ({
                url: "/match",
                method: 'POST',
                body: apiData
            })
        }),
        getRooms: builder.query<RoomApiProps[], void>({
            query: () => ({
                url: "/match",
            })
        }),
        matchHandle: builder.mutation<any, APIGameDataProps>({
            query: data_type => ({
                url: `/match/handle/${data_type.room_id}`,
                method: 'POST',
                body: data_type
            })
        })
    })
})


export const {
    useLoginMutation,
    useNewUserMutation,
    useApiMutation,
    useMatchHandleMutation,
    useGetRoomsQuery
} = api
export default api