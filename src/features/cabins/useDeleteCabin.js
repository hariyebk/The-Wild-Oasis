import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCabin } from "../../services/apiCabins"
import { toast } from "react-hot-toast"

export default function useDeleteCabin() {
    const queryClient = useQueryClient()
    const {isLoading: isDeleting, mutate: deletecabin} = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
    queryClient.invalidateQueries({
        queryKey: ["cabins"]
    })
    toast.success("cabin deleted successfully")
    },
    onError: (err) => toast.error(err.message)
})

    return {isDeleting, deletecabin}
}
