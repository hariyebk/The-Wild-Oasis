import {useQuery} from "@tanstack/react-query"
import { getCurrentUser } from "../../services/apiAuth"
function useAuthorization() {
    const {isLoading: isgettinguser, data} = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser
    })
    return {isgettinguser, isAuthenticated: data?.user?.role === "authenticated", data}
}

export default useAuthorization
