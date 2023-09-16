import {useMutation, useQueryClient} from "@tanstack/react-query"
import { CreateUpdateGuest } from "../../services/apiGuests"
import toast from "react-hot-toast"

function useCreateUpdateGuest(isEditing) {
    const queryClient = useQueryClient()
    const {isLoading, mutate} = useMutation({
        mutationFn: ({id, Guest}) => CreateUpdateGuest(id, Guest),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["guests"]
            })

            isEditing ? toast.success("Guest updated successfully") : toast.success("Guest created successfully")
        },

        onError: (error) => toast.error(error.message)
    }) 

    return {isLoading, mutate}
}

export default useCreateUpdateGuest
