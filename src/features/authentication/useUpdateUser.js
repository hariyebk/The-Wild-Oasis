import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCurrentUser } from "../../services/apiAuth"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function useUpdateUser(password) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {isLoading: isUpdating, mutate: updateuser} = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"]
            })
            if(password){
                toast.success("Please reauthenticate with Your new Password")
                navigate("/login")
                return
            }
            toast.success("User Account updated successfully")
        },
        onError: () => toast.error("can't update the current user")
    })

    return {isUpdating, updateuser}
}

export default useUpdateUser
