import {
    useDeletePlaylistsMutation,
    useGetPlaylistsQuery,
    useUpdatePlaylistsMutation
} from "@/features/playlists/api/playlistsApi";
import s from './PlaylistsPage.module.css'
import PlaylistForm from "@/features/playlists/ui/PlaylistsPage/PlaylistForm/PlaylistForm";
import {CreatePlaylistArgs, PlaylistData, UpdatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types";
import {SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import {PlaylistItem} from "@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistItem";
import {PlaylistEditForm} from "@/features/playlists/ui/PlaylistsPage/PlaylistEditForm/PlaylistEditForm";


export const PlaylistsPage = () => {
    const {data} = useGetPlaylistsQuery()
    console.log(data)
    const [playlistId, setplaylistId] = useState<string | null>(null)
    const [deletePlayList] = useDeletePlaylistsMutation()
    const {register, handleSubmit} = useForm<CreatePlaylistArgs>()
    const deletePlayListHandler = (playlistId: string) => {
        if (confirm('Are you sure you want to delete the playlist?')) {
            deletePlayList(playlistId)
        }
    }
    const EditUpdatePlaylistHandler = (playlist: PlaylistData | null) => {

        if (playlist) {
            setplaylistId(playlist.id)
            //reset({title:})
        } else {
            setplaylistId(null)
        }
    }
    return (
        <div className={s.container}>
            <h1>PlaylistsPage</h1>
            <PlaylistForm/>
            <div className={s.items}>
                {
                    data?.data.map((playlist) => {
                        const isEditPlayList = playlistId === playlist.id
                        return (
                            <div key={playlist.id} className={s.item}>
                                {isEditPlayList ?
                                    <PlaylistEditForm playlistId={playlistId}
                                                      EditUpdatePlaylist={EditUpdatePlaylistHandler}
                                                      handleSubmit={handleSubmit} setplaylistId={setplaylistId}
                                                      register={register}/>
                                    :
                                    <PlaylistItem playlist={playlist} deletePlayList={deletePlayListHandler}
                                                  EditUpdatePlaylist={EditUpdatePlaylistHandler}/>
                                }
                            </div>)
                    })
                }
            </div>
        </div>
    )
}