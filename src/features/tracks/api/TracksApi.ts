import {baseApi} from "@/app/api/baseApi";

export const AuthApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTrucks: build.infiniteQuery<any, void, string | null>({
            infiniteQueryOptions:{
                initialPageParam: null,
                getNextPageParam:(lastPage, allPages, lastPageParam, allPageParams, queryArg)=>{
                    return lastPage.meta.nextCursor || null
                },
            },
            query: ({pageParam}) => {
                return {
                    url: '/playlists/tracks',
                    params: {cursor:pageParam,pageSize:5,paginationType:'cursor'}
                }
            }
        })
    })
})
export const {
    useGetTrucksInfiniteQuery
} = AuthApi