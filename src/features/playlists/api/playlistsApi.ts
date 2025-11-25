import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {
    CreatePlaylistArgs,
    FetchPlaylistsArgs,
    PlaylistData,
    PlaylistsResponse, UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types";

export const playlistsApi = createApi({
    reducerPath: 'playlistsApi',
    tagTypes: ['Playlist'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {"API-KEY": import.meta.env.VITE_API_KEY},
        prepareHeaders: (headers, api) => {
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
            return headers
        }
    }),
    endpoints: (builder) => {
        return ({
            getPlaylists: builder.query<PlaylistsResponse, FetchPlaylistsArgs>({
                query: () => `playlists`,
                providesTags: ['Playlist']
            }),
            addPlaylists: builder.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
                query: (body) => ({url: 'playlists', method: 'POST', body}),
                invalidatesTags: ['Playlist']
            }),
            deletePlaylists: builder.mutation<void, string>({
                query: (id) => ({url: `playlists/${id}`, method: 'delete'}),
                invalidatesTags: ['Playlist']
            }),
            updatePlaylists: builder.mutation<void, { playlistId: string, body: UpdatePlaylistArgs }>({
                query: ({playlistId, body}) => ({url: `playlists/${playlistId}`, method: 'put', body}),
                invalidatesTags: ['Playlist']
            }),
        });
    },

})

export const {
    useGetPlaylistsQuery,
    useAddPlaylistsMutation,
    useDeletePlaylistsMutation,
    useUpdatePlaylistsMutation
} = playlistsApi