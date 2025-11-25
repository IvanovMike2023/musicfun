import {PlaylistData} from "@/features/playlists/api/playlistsApi.types";

type Props = {
    playlist: PlaylistData,
    deletePlayList: (playlistId: string) => void
    EditUpdatePlaylist: (playlist: string | null) => void

}
export const PlaylistItem = ({playlist, deletePlayList, EditUpdatePlaylist}: Props) => {
    return (
        <div>
            <div> {playlist.attributes.title}</div>
            <div>{playlist.attributes.description}</div>
            <div>{playlist.attributes.user.name}</div>
            <button onClick={() => deletePlayList(playlist.id)}>delete</button>
            <button onClick={() => EditUpdatePlaylist(playlist.id)}>update
            </button>
        </div>
    )
}