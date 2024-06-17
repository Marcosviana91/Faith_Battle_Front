import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const URI = 'http://192.168.1.32:8000'
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