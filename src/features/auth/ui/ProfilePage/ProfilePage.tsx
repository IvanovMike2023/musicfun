import {useGetAuthQuery} from "@/features/auth/api/AuthApi";

export const ProfilePage = () => {
    const {data}=useGetAuthQuery()

    return (
        <div>
            <h1>Profile page</h1>
            <h2> Your login: {data?.login}</h2>
            <h2> Your id: {data?.userId}</h2>
        </div>
    )
}