import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Logout } from "../../services/apiAuth"

function UseLogout(){
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const {isLoading: isLoggingOut, mutate: logout} = useMutation({
        mutationFn: Logout,
        onSuccess: () => {
            // remove all the queries from react-query's cache
            queryClient.removeQueries()
            navigate("/login", {replace: true})
        },
        onError: () => toast.error("logout failed please try again")
    })

    return {isLoggingOut, logout}
}

export default UseLogout