import { useMutation, useQueryClient } from "@tanstack/react-query"
import {useNavigate, useParams} from "react-router-dom"
import { deleteBooking } from "../../services/apiBookings"
import {toast} from "react-hot-toast"

function useDeleteBooking(bookingId) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {id} = useParams()
    const {isLoading: isDeleting, mutate: deletebooking} = useMutation({
        mutationFn: deleteBooking,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["bookings"]
            })
            toast.success(`booking #${id || bookingId} has been deleted`)
            !bookingId && navigate("/bookings")
        },
        onError: (error) => toast.error(error.message)
    })

    return {isDeleting, deletebooking}
}

export default useDeleteBooking
