import { useMutation} from "@tanstack/react-query"
import { Signup } from "../../services/apiAuth"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function useSignup() {
    const navigate = useNavigate()
    const {isLoading: isCreatingUser, mutate: signup} = useMutation({
        mutationFn: Signup,
        onSuccess: () => {
            navigate("/verifyEmail")
        },
        onError: (error) => toast.error(error.message)
    })

    return {isCreatingUser, signup}
}

export default useSignup
