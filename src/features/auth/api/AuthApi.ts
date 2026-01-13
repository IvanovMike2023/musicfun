import {baseApi} from "@/app/api/baseApi";
import {AuthMe} from "@/features/auth/api/AuthApi.types";

export const AuthApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAuth: build.query<AuthMe, void>({
            query: () => ({ url: 'auth/me'
            })
        })
    })
})
export const {
    useGetAuthQuery
} = AuthApi