import {useGetAuthQuery} from "@/features/auth/api/AuthApi";

export const MainPage = () => {
    const {data}=useGetAuthQuery()
    return (
        <div>
            <h1>Main page.</h1>
            <h2> Your login: {data?.login}</h2>
        </div>
    )
}
