import { useMutation, useQueryClient } from "@tanstack/react-query"
import {updateBooking} from "../../services/apiBookings"
import { toast } from "react-hot-toast"
import { useNavigate} from "react-router-dom"

function useCheckinCheckout(type) {
    const queryClient = useQueryClient()
    const checkedIn = type === "checked-in"
    const navigate = useNavigate()
    const {isLoading, mutate} = useMutation({
        mutationFn: checkedIn ? ({bookingId, breakfast}) => updateBooking(bookingId, {
            status: type,
            isPaid: true,
            ...breakfast
        }) : (bookingId) => updateBooking(bookingId, {
            status: type
        }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({active: true})
            checkedIn ? navigate(`/checkin/${data.id}/success`) : navigate(`/checkout/${data.id}/success`)
        },
        onError: () => toast.error(`There was A problem ${checkedIn ? "Checking In" : "Checking Out"} thebooking`)
    })

    return {isLoading, mutate}
}

export default useCheckinCheckout
