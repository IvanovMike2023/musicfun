import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {FetchPlaylistsArgs, PlaylistsResponse} from "@/features/playlists/api/playlistsApi.types";

export const playlistsApi = createApi({
    reducerPath: 'playlistsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {"API-KEY": import.meta.env.VITE_API_KEY},
        prepareHeaders:(headers, api)=>{
            headers.set('Authorization',`Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
            return headers
        }
    }),
    endpoints: (builder) => ({
        getPlaylists: builder.query<PlaylistsResponse, FetchPlaylistsArgs>({
            query: () =>  `playlists`,
        }),
        addPlaylists: builder.mutation<any, any>({
            query: (body) => ({
                url: 'playlists',
                method: 'POST',
                body,
            }),
        }),
    }),

})

export const {useGetPlaylistsQuery,useAddPlaylistsMutation} = playlistsApi