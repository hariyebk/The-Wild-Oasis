import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DeleteGuest } from "../../services/apiGuests"
import toast from "react-hot-toast"

function useDeleteGuest() {
    const queryClient = useQueryClient()
    const {isLoading: isDeleting, mutate: deleteGuest} = useMutation({
        mutationFn: DeleteGuest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["guests"]
            })
            toast.success("guest deleted successfully")
        },
        onError: () => toast.error("failed to delete guest")
    })

    return {isDeleting, deleteGuest}
}

export default useDeleteGuest
