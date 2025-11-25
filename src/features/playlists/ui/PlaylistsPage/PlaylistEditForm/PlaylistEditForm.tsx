import {SubmitHandler, UseFormHandleSubmit, UseFormRegister} from "react-hook-form";
import {CreatePlaylistArgs, UpdatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types";
import {useUpdatePlaylistsMutation} from "@/features/playlists/api/playlistsApi";

type Props={
    playlistId:string,
    setplaylistId:(playlistId:null)=>void,
    register: UseFormRegister<UpdatePlaylistArgs>,
    handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>,
    EditUpdatePlaylist:(playlistId:null )=>void
}
export const PlaylistEditForm=({playlistId,setplaylistId,handleSubmit,register,EditUpdatePlaylist}:Props)=>{
    const [UpdatePlaylist] = useUpdatePlaylistsMutation()

    const onSubmit: SubmitHandler<CreatePlaylistArgs> = (data) => {
        UpdatePlaylist({
            playlistId,
            body: {
                title: data.title,
                description: data.description,
                tagIds: []
            }
        }).unwrap().finally(() => {
            setplaylistId(null)
        })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Editr playlist</h2>
            <div>
                <input  {...register('title')} placeholder={'title'}/>
            </div>
            <div>
                <input  {...register('description')} placeholder={'description'}/>
            </div>
            <button type={'submit'}>save</button>
            <button type={'button'} onClick={() => EditUpdatePlaylist(null)}>
                cancel
            </button>
        </form>
    )
}