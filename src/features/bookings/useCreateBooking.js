import { useMutation, useQueryClient} from "@tanstack/react-query"
import { CreateUpdateBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"

function useCreateBooking(id) {
    const queryClient = useQueryClient()
    const {isLoading, mutate} = useMutation({
        mutationFn: id ? ({booking, id}) => CreateUpdateBooking(booking, id) : CreateUpdateBooking,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["bookings"]
            })
            id ? toast.success(`booking #${data.id} updated successfully `) : toast.success("booking created successfully")
        },
        onError: (error) => toast.error(error.message)
    })

    return {isLoading, mutate}
}

export default useCreateBooking
