import { useMutation, useQueryClient} from "@tanstack/react-query"
import { createBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function useCreateBooking(id) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {isLoading, mutate} = useMutation({
        mutationFn: id ? ({booking, id}) => createBooking(booking, id) : createBooking,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["bookings"]
            })
            id ? toast.success("booking created successfully") : toast.success(`booking #${data.id} updated successfully `)
            navigate(-1)
        },
        onError: (error) => toast.error(error.message)
    })

    return {isLoading, mutate}
}

export default useCreateBooking
