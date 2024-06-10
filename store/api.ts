import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// const URI = 'http://192.168.1.32:8000'
const URI = 'http://127.0.0.1:8000'

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
        })
    })
})


export const { useLoginMutation, useNewUserMutation } = api
export default api