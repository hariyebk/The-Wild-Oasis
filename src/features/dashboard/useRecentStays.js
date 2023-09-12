import { useQuery, useQueryClient } from "@tanstack/react-query"
import { subDays } from "date-fns"
import { useSearchParams } from "react-router-dom"
import { getStaysAfterDate } from "../../services/apiBookings"

function useRecentStays() {
    const [searchParams] = useSearchParams()
    const queryClient = useQueryClient()
    const lastDate = +searchParams.get("last") || 7
    const date = subDays(new Date(), lastDate).toISOString()
    const {isLoading: isLoadingStays, data, error} = useQuery({
        queryKey: ["recent-stays", lastDate],
        queryFn: () => getStaysAfterDate(date)
    })
    const recentStays = data?.filter(booking => booking.status === "checked-in" || booking.status === "checked-out")
    //Pre-fetching Stats
    const date1 = subDays(new Date(), 30).toISOString()
    queryClient.prefetchQuery({
        queryKey: ["recent-stays", 30],
        queryFn: () => getStaysAfterDate(date1)
    })
    const date2 = subDays(new Date(), 90).toISOString()
    queryClient.prefetchQuery({
        queryKey: ["recent-stays", 90],
        queryFn: () => getStaysAfterDate(date2)
    })
    return {isLoadingStays, recentStays, error}


}



export default useRecentStays
