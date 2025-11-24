import {useDeletePlaylistsMutation, useGetPlaylistsQuery} from "@/features/playlists/api/playlistsApi";
import s from './PlaylistsPage.module.css'
import PlaylistForm from "@/features/playlists/ui/PlaylistsPage/PlaylistForm/PlaylistForm";


export const PlaylistsPage = () => {
    const {data} = useGetPlaylistsQuery()
    const [deletePlayList]=useDeletePlaylistsMutation()

    return (
        <div className={s.container}>
            <h1 className={s.title}>PlaylistsPage</h1>
            <PlaylistForm/>
            <div className={s.items}>
                {
                    data?.data.map((el) => {
                        return (
                            <div key={el.id} className={s.item}>
                                <div> {el.attributes.title}</div>
                                <div>{el.attributes.description}</div>
                                <div>{el.attributes.user.name}</div>
                                <button  onClick={()=>deletePlayList(el.id)}>delete</button>
                            </div>)
                    })
                }
            </div>
        </div>
    )
}