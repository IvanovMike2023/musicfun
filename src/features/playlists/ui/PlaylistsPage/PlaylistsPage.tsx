import {useGetPlaylistsQuery} from "@/features/playlists/api/playlistsApi";
import s from './PlaylistsPage.module.css'
import PlaylistForm from "@/features/playlists/ui/PlaylistsPage/PlaylistForm/PlaylistForm";
import {ChangeEvent, useState} from "react";
import {useDebounceValue} from "@/common/hooks";
import {Pagination} from "@/common/Pagination/Pagination";
import {PlayList} from "@/features/playlists/ui/PlaylistsPage/Playlist/PlayList";

export const PlaylistsPage = () => {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(2)

    const debouncedValue = useDebounceValue(search)
    const {data, isLoading} = useGetPlaylistsQuery({
        search: debouncedValue, pageNumber: currentPage,
        pageSize

    })

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
            <PlayList playlists={data?.data || [] } isLoading={isLoading} />
            <Pagination currentPage={currentPage}
                        pagesCount={data?.meta.pagesCount || 1}
                        setCurrentPage={setCurrentPage}
                        pageSize={pageSize}
                        changePageSize={changePageSizeHandler}
            />
        </div>
    )
}