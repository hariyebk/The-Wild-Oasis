import { useMutation, useQueryClient } from "@tanstack/react-query"
import {updateBooking} from "../../services/apiBookings"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function useCheckin() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {isLoading: isCheckingIn, mutate: checkIn} = useMutation({
        mutationFn: (bookingId) => updateBooking(bookingId, {
            status: "checked-in",
            isPaid: true
        }),
        onSuccess: (data) => {
            console.log(data)
            // toast.success(`Booking #${data.id} has successfullty Checked In`)
            queryClient.invalidateQueries({active: true})
            navigate(`/checkin/${data.id}/success`)
        },
        onError: () => toast.error("There was A problem Checking In thebooking ")
    })

    return {isCheckingIn, checkIn}
}

export default useCheckin
