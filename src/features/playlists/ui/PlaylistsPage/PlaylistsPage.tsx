import {
    useDeletePlaylistsMutation,
    useGetPlaylistsQuery,
    useUpdatePlaylistsMutation
} from "@/features/playlists/api/playlistsApi";
import s from './PlaylistsPage.module.css'
import PlaylistForm from "@/features/playlists/ui/PlaylistsPage/PlaylistForm/PlaylistForm";
import {CreatePlaylistArgs, UpdatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types";
import {SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";


export const PlaylistsPage = () => {
    const {data} = useGetPlaylistsQuery()
    const [playlistId,setplaylistId]=useState<string | null>(null)
    const [deletePlayList] = useDeletePlaylistsMutation()
    const [UpdatePlaylist] = useUpdatePlaylistsMutation()
    const { register, handleSubmit, reset } = useForm<CreatePlaylistArgs>()

    const deletePlayListHandler = (playlistId: string) => {
        if (confirm('Are you sure you want to delete the playlist?')) {
            deletePlayList(playlistId)
        }
    }
    const UpdatePlaylistHandler = (playlistId:string) => {
        UpdatePlaylist({playlistId,
            body:{
                title: '3453',
                description: '2',
                tagIds: []
            }
        })
    }
const editPlaylistHandler=(arg:null)=>{
    console.log(arg)
}
const onSubmit:SubmitHandler<CreatePlaylistArgs>=(data)=>{
    console.log(data)
}
    return (
        <div className={s.container}>
            <h1 className={s.title}>PlaylistsPage</h1>
            <PlaylistForm/>
            <div className={s.items}>
                {
                    data?.data.map((playlist) => {
                        const isEditPlayList=playlistId===playlist.id
                        return (
                            <div key={playlist.id} className={s.item}>
                                {isEditPlayList ? (
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <h2>Editr playlist</h2>
                                    <div>
                                        <input {...register('title')} placeholder={'title'} />
                                    </div>
                                    <div>
                                        <input {...register('description')} placeholder={'description'} />
                                    </div>
                                    <button type={'submit'}>save</button>
                                    <button type={'button'} onClick={() => editPlaylistHandler(null)}>
                                        cancel
                                    </button>
                                </form>)
                                :
                                    (<div>
                                <div> {playlist.attributes.title}</div>
                                <div>{playlist.attributes.description}</div>
                                <div>{playlist.attributes.user.name}</div>
                                <button onClick={() => deletePlayListHandler(playlist.id)}>delete</button>
                                <button onClick={() => UpdatePlaylistHandler(playlist.id)}>update</button>
                                </div>
                                )}
                                </div>)
                    })
                }
            </div>
        </div>
    )
}