// Need to use the React-specific entry point to import createApi

//https://musicfun.it-incubator.app/api/1.0/playlists
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {FetchPlaylistsArgs, PlaylistsResponse} from "@/features/playlists/api/playlistsApi.types";

export const playlistsApi = createApi({
    reducerPath: 'playlistsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,//'https://musicfun.it-incubator.app/api/1.0',
        headers: {"API-KEY": import.meta.env.VITE_API_KEY},//{'API-KEY':'164dbeb3-c3ba-408e-80e7-adecc6008f38'},
    }),
    endpoints: (builder) => ({
        getPlaylists: builder.query<PlaylistsResponse, FetchPlaylistsArgs>({
            query: () => {
                return {
                    method: 'get',
                    url: `playlists`,
                }
            }
        }),
    }),
})

export const {useGetPlaylistsQuery} = playlistsApi