import {PlaylistData} from "@/features/playlists/api/playlistsApi.types";
import defaultimages from "@/img/images.png"
import s from "./PlaylistItem.module.css"
import {ChangeEvent, ChangeEventHandler} from "react";
import {useUpdatePhotoPlayListMutation} from "@/features/playlists/api/playlistsApi";

type Props = {
    playlist: PlaylistData,
    deletePlayList: (playlistId: string) => void
    EditUpdatePlaylist: (playlist: PlaylistData) => void
}
export const PlaylistItem = ({playlist, deletePlayList, EditUpdatePlaylist}: Props) => {
    const [UpdatePhotoPlayList]=useUpdatePhotoPlayListMutation()
    const userImg = playlist.attributes.images.main?.find((f) => f.type === 'original')
    let src = userImg ? userImg.url : defaultimages
    const uploadCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const maxSize = 1024 * 1024 // 1 MB
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

        const file = event.target.files?.length && event.target.files[0]
        if (!file) return
        if (!allowedTypes.includes(file.type)) {
            alert('Only JPEG, PNG or GIF images are allowed')
            return
        }
        if (file.size > maxSize) {
            alert('Only file < 1024*1024')
            return
        }
        UpdatePhotoPlayList({playlistId:playlist.id, file})
        console.log(file)
    }
    return (
        <div>
            <img className={s.cover} src={src} alt="Photo"/>
            <input type="file" accept="image/jpeg,image/png,image/gif" onChange={uploadCoverHandler}/>
            <div> {playlist.attributes.title}</div>
            <div>{playlist.attributes.description}</div>
            <div>{playlist.attributes.user.name}</div>
            <button onClick={() => deletePlayList(playlist.id)}>delete</button>
            <button onClick={() => EditUpdatePlaylist(playlist)}>update
            </button>
        </div>
    )
}