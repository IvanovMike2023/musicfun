import {useFetchTracksInfiniteQuery} from "@/features/tracks/api/TracksApi";
import {LoadingTrigger} from "@/features/tracks/ui/LoadingTrigger/LoadingTrigger";
import {useInfiniteScroll} from "@/common/hooks/useInfinityScroll";
import {TracksList} from "@/features/tracks/ui/TracksList";

export const TracksPage = () => {
    const {data, isLoading, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage} = useFetchTracksInfiniteQuery()
    const pages = data?.pages.flatMap(page => page.data) || []
    const {observerRef} = useInfiniteScroll({isFetching, hasNextPage, fetchNextPage})
    return (
        <div>
            <h1>Tracks page</h1>
            <TracksList pages={pages}/>
            {hasNextPage && <LoadingTrigger observerRef={observerRef}  isFetchingNextPage={isFetchingNextPage}/>

            }
            {!hasNextPage && (<div>not more tracks</div>)}
        </div>
    )
}