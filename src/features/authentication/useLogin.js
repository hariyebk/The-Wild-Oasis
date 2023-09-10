import { useMutation} from "@tanstack/react-query"
import { Login} from "../../services/apiAuth"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function UseLogin() {
    const navigate = useNavigate()
    const {isLoading: isLoggingIn, mutate: login} = useMutation({
        mutationFn:  Login,
        onSuccess: (user) => {
            // queryClient.setQueriesData("user", user)
            toast.success("Logged in successfully")
            navigate("/dashboard")
        },
        onError: () => toast.error("Invalid login credentials")
    })

    return {isLoggingIn, login}
}


export default UseLogin


