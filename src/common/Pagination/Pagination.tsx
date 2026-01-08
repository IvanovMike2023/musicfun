import s from './Pagination.module.css'
import {playlistsApi, useGetPlaylistsQuery} from "@/features/playlists/api/playlistsApi";
import {useDispatch} from "react-redux";
import {useEffect} from "react";

type PaginationType = {
    pageCountArray: any[]
    setPageNumber: (page:number)=> void
}
export const Pagination = ({setPageNumber,pageCountArray}: PaginationType) => {
    const dispatch = useDispatch()
    const handlerpageCount = (page: number) => {
        setPageNumber(page)
        // const {data, isLoading} = useGetPlaylistsQuery({pageNumber:page})
        //dispatch(useGetPlaylistsQuery({pageNumber:page}))
        ///playlistsApi.getPlaylists({pageNumber:page})
        //const {data, isLoading} = useGetPlaylistsQuery({pageNumber: page})

    }
    return (<div>
            {
                pageCountArray?.map((el) =>
                    <span key={el} onClick={() => handlerpageCount(el)} className={s.item}>{el}</span>
                )
            }
        </div>
    )
}