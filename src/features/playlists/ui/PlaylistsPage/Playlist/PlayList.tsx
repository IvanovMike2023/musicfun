import s from "@/features/playlists/ui/PlaylistsPage/PlaylistsPage.module.css";
import {PlaylistEditForm} from "@/features/playlists/ui/PlaylistsPage/PlaylistEditForm/PlaylistEditForm";
import {PlayListItem} from "@/features/playlists/ui/PlaylistsPage/PlayListItem/PlayListItem";
import {CreatePlaylistArgs, PlaylistData} from "@/features/playlists/api/playlistsApi.types";
import {useState} from "react";
import {useDeletePlaylistsMutation} from "@/features/playlists/api/playlistsApi";
import {useForm} from "react-hook-form";

type PlaylistType = {
    playlists: PlaylistData[],
    isLoading: boolean

}
export const PlayList = ({playlists, isLoading}: PlaylistType) => {
    const [playlistId, setplaylistId] = useState<string | null>(null)
    const [deletePlayList] = useDeletePlaylistsMutation()
    const {register, handleSubmit} = useForm<CreatePlaylistArgs>()
    const EditUpdatePlaylistHandler = (playlist: PlaylistData | null) => {

        if (playlist) {
            setplaylistId(playlist.id)
        } else {
            setplaylistId(null)
        }
    }

    const deletePlayListHandler = (playlistId: string) => {
        if (confirm('Are you sure you want to delete the playlist?')) {
            deletePlayList(playlistId)
        }
    }
    return (
        <div className={s.items}>
            {!playlists.length && !isLoading && <h2>Not found this title</h2>}
            {
                playlists.map((playlist) => {
                    const isEditPlayList = playlistId === playlist.id
                    return (
                        <div key={playlist.id} className={s.item}>
                            {isEditPlayList ?
                                <PlaylistEditForm playlistId={playlistId}
                                                  EditUpdatePlaylist={EditUpdatePlaylistHandler}
                                                  handleSubmit={handleSubmit} setplaylistId={setplaylistId}
                                                  register={register}/>
                                :
                                <PlayListItem playlist={playlist} deletePlayList={deletePlayListHandler}
                                              editUpdatePlaylist={EditUpdatePlaylistHandler}/>
                            }
                        </div>)
                })
            }
        </div>)
}