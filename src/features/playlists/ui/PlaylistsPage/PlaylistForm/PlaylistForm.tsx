import { useForm, SubmitHandler } from "react-hook-form"
import {useAddPlaylistsMutation} from "@/features/playlists/api/playlistsApi";
import {CreatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types";

export default function PlaylistForm() {
    const { register, handleSubmit, reset } = useForm<CreatePlaylistArgs>()
    const [createPlayList]=useAddPlaylistsMutation()

    const onSubmit: SubmitHandler<CreatePlaylistArgs> = (data) => {
        createPlayList(data).unwrap().then(()=>reset())

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Create new playlist</h2>
            <div><input {...register("title")} placeholder={'title'} /></div>
            <div><input {...register("description")} placeholder={'description'}/></div>
            <input type="submit" />
        </form>
    )
}