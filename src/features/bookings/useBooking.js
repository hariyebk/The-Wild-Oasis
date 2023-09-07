import { useParams} from "react-router-dom"
import {useQuery} from "@tanstack/react-query"
import { getBooking } from "../../services/apiBookings"

function useBooking() {
    const {id} = useParams()
    const {isLoading: isFetching, data: booking, error} = useQuery({
        queryKey: ["booking", id],
        queryFn: () => getBooking(id),
        retry: false
    })
    return {isFetching, booking, error}
}

export default useBooking
