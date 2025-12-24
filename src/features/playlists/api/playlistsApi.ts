import {
    CreatePlaylistArgs, FetchPlaylistsArgs,
    PlaylistData,
    PlaylistsResponse,
    UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types";
import {baseApi} from "@/app/api/baseApi";
import {Images} from "@/common/types/types";

export const playlistsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getPlaylists: build.query<PlaylistsResponse, void>({
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
        updatePhotoPlayList: build.mutation<Images, { playlistId: string, file: any }>({
            query: ({playlistId, file}) => {
                const formData = new FormData()
                formData.append('file', file)
                return {
                    url: `playlists/${playlistId}/images/main`, method: 'post', body: formData
                }
            },
            invalidatesTags: ['Playlist']
        }),
        deletePlayListCover: build.mutation<void, { playlistId: string}>({
            query: ({playlistId}) =>({
                    url: `playlists/${playlistId}/images/main`, method: 'delete'
                })
            ,
            invalidatesTags: ['Playlist']
        }),

    }),

})
export const {
    useGetPlaylistsQuery,
    useAddPlaylistsMutation,
    useDeletePlaylistsMutation,
    useUpdatePlaylistsMutation,
    useUpdatePhotoPlayListMutation,
    useDeletePlayListCoverMutation
} = playlistsApi