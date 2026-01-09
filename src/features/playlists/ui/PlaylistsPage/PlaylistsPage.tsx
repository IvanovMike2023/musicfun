import {useDeletePlaylistsMutation, useGetPlaylistsQuery} from "@/features/playlists/api/playlistsApi";
import s from './PlaylistsPage.module.css'
import PlaylistForm from "@/features/playlists/ui/PlaylistsPage/PlaylistForm/PlaylistForm";
import {CreatePlaylistArgs, PlaylistData} from "@/features/playlists/api/playlistsApi.types";
import {useForm} from "react-hook-form";
import {ChangeEvent, useState} from "react";
import {PlaylistItem} from "@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistItem";
import {PlaylistEditForm} from "@/features/playlists/ui/PlaylistsPage/PlaylistEditForm/PlaylistEditForm";
import {useDebounceValue} from "@/common/hooks";
import {Pagination} from "@/common/Pagination/Pagination";

export const PlaylistsPage = () => {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(2)

    const debouncedValue = useDebounceValue(search)
    const {data, isLoading} = useGetPlaylistsQuery({
        search: debouncedValue, pageNumber: currentPage,
        pageSize,
    })
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
        } else {
            setplaylistId(null)
        }
    }

    const changePageSizeHandler = (size: number) => {
        setPageSize(size)
        setCurrentPage(1)
    }
    const changeFindTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(1)
        setSearch(e.target.value)
    }

    return (
        <div className={s.container}>
            <h1>PlaylistsPage</h1>
            <PlaylistForm/>
            <input type="search" placeholder='input title for search'
                   onChange={(e) => changeFindTitleHandler(e)}/>
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
            <Pagination currentPage={currentPage}
                        pagesCount={data?.meta.pagesCount || 1}
                        setCurrentPage={setCurrentPage}
                        pageSize={pageSize}
                        changePageSize={changePageSizeHandler}
            />
        </div>
    )
}