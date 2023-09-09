import { useMutation } from "@tanstack/react-query"
import { Login } from "../../services/apiAuth"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

function useAuth() {
    const navigate = useNavigate()
    const {isLoading: isLogging, mutate: login} = useMutation({
        mutationFn:  Login,
        onSuccess: (data) => {
            console.log(data)
            toast.success("login successfull")
            navigate("/dashboard")
        },
        onError: (err) => toast.error(err.message)
    })

    return {isLogging, login}
}

export default useAuth
