import {useGetTrucksInfiniteQuery} from "@/features/tracks/api/TracksApi";
import s from "./TracksPage.module.css"
import {buttonBaseClasses} from "@mui/material";

export const TracksPage = () => {
    const {data, isLoading,isFetching, hasNextPage,isFetchingNextPage,fetchNextPage } = useGetTrucksInfiniteQuery()
    console.log(hasNextPage)
    const pages = data?.pages.flatMap(page => page.data) || []
    const loadMoreHandler=()=>{
        if(hasNextPage && !isFetching){
            fetchNextPage()
        }
    }
    return (
        <div>
            <h1>Tracks page</h1>
            {pages.map((el: any) => {
                const {title, user, attachments} = el.attributes
                return <div key={el.id} className={s.container}>
                    <div className={s.item}>
                        <div>{title}</div>
                        <div>{user.name}</div>
                    </div>
                    <div>
                        {attachments.length ? <audio controls src={attachments[0].url}/> : "no file"}
                    </div>
                </div>
            })}
            {!isLoading && (
                <>
                    {hasNextPage ? (<button onClick={loadMoreHandler}>{isFetchingNextPage? 'Loading' : 'Load more' }</button>) :
                        (<span>Not load more</span>
                        )

                    }
                </>)}
        </div>
    )
}