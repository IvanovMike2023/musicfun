import {
    CreatePlaylistArgs, FetchPlaylistsArgs,
    PlaylistData,
    PlaylistsResponse,
    UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types";
import {baseApi} from "@/app/api/baseApi";

export const playlistsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPlaylists: build.query<PlaylistsResponse,FetchPlaylistsArgs>({
            query: () => `playlists`,
            providesTags: ['Playlist']
        }),
        addPlaylists: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
            query: (body) => ({url: 'playlists', method: 'POST', body}),
            invalidatesTags: ['Playlist']
        }),
        deletePlaylists: build.mutation<void, string>({
            query: (id) => ({url: `playlists/${id}`, method: 'delete'}),
            invalidatesTags: ['Playlist']
        }),
        updatePlaylists: build.mutation<void, { playlistId: string, body: UpdatePlaylistArgs }>({
            query: ({playlistId, body}) => ({url: `playlists/${playlistId}`, method: 'put', body}),
            invalidatesTags: ['Playlist']
        }),

    }),

})
export const {
    useGetPlaylistsQuery,
    useAddPlaylistsMutation,
    useDeletePlaylistsMutation,
    useUpdatePlaylistsMutation
} = playlistsApi