import {
    useDeletePlaylistsMutation,
    useGetPlaylistsQuery,
    useUpdatePlaylistsMutation
} from "@/features/playlists/api/playlistsApi";
import s from './PlaylistsPage.module.css'
import PlaylistForm from "@/features/playlists/ui/PlaylistsPage/PlaylistForm/PlaylistForm";
import {CreatePlaylistArgs, PlaylistData, UpdatePlaylistArgs} from "@/features/playlists/api/playlistsApi.types";
import {SubmitHandler, useForm} from "react-hook-form";
import {ChangeEvent, ChangeEventHandler, useState} from "react";
import {PlaylistItem} from "@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistItem";
import {PlaylistEditForm} from "@/features/playlists/ui/PlaylistsPage/PlaylistEditForm/PlaylistEditForm";
import {useDebounceValue} from "@/common/hooks";
import {logLevels} from "vite-plugin-checker/dist/checkers/vls/diagnostics";


export const PlaylistsPage = () => {

    const [search, setSearch] = useState('')
    const debouncedValue = useDebounceValue(search)

    const {data, isLoading} = useGetPlaylistsQuery({search: debouncedValue})
    const [playlistId, setplaylistId] = useState<string | null>(null)
    const [deletePlayList] = useDeletePlaylistsMutation()
    const {register, handleSubmit} = useForm<CreatePlaylistArgs>()

    const pagesCount = data?.meta.pagesCount
    let pageCountArray = []
    if(pagesCount){
        for (let i = 1; i <= pagesCount; i++) {
            pageCountArray.push(i)
        }
    }

    const deletePlayListHandler = (playlistId: string) => {
        if (confirm('Are you sure you want to delete the playlist?')) {
            deletePlayList(playlistId)
        }
    }
    const EditUpdatePlaylistHandler = (playlist: PlaylistData | null) => {

        if (playlist) {
            setplaylistId(playlist.id)
        } else {
            setplaylistId(null)
        }
    }
    return (
        <div className={s.container}>
            <h1>PlaylistsPage</h1>
            <PlaylistForm/>
            <input type="search" placeholder='input title for search'
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}/>
            <div>
                {

                    pageCountArray?.map((el)=>
                        <span >{el}</span>
                    )
                }
            </div>
            <div className={s.items}>
                {!data?.data.length && !isLoading && <h2>Not found this title</h2>}
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
                                                  editUpdatePlaylist={EditUpdatePlaylistHandler}/>
                                }
                            </div>)
                    })
                }
            </div>
        </div>
    )
}