import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { getBookingsAfterDate} from "../../services/apiBookings"
import { subDays } from "date-fns"

function useRecentBookings() {
    const [searchParams] = useSearchParams()
    const queryClient = useQueryClient()
    const lastDate = +searchParams.get("last") || 7
    const date = subDays(new Date(), lastDate).toISOString()
    const {isLoading: isLoadingBookings , data: recentBookings, error} = useQuery({
        queryKey: ["recent-bookings", lastDate],
        queryFn: () => getBookingsAfterDate(date)
    })
    //  //Pre-fetching Stats
    const date1 = subDays(new Date(), 30).toISOString()
    queryClient.prefetchQuery({
        queryKey: ["recent-bookings", 30],
        queryFn: () => getBookingsAfterDate(date1)
    })
    const date2 = subDays(new Date(), 90).toISOString()
    queryClient.prefetchQuery({
        queryKey: ["recent-bookings", 90],
        queryFn: () => getBookingsAfterDate(date2)
    })
    return {isLoadingBookings, recentBookings, error}
}

export default useRecentBookings
