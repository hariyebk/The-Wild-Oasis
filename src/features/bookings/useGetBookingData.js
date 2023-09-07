import {useQuery, useQueryClient} from "@tanstack/react-query"
import { getAllBookigs } from "../../services/apiBookings"
import {useSearchParams} from "react-router-dom"
import { PAGE_SIZE } from "../../ui/Pagination"

function useGetBookingData() {
    const [searchParams] = useSearchParams()
    const queryClient = useQueryClient()
    const filterValue = searchParams.get("status") || "all"
    const sortValue = searchParams.get("sortBy") || "startDate-desc"
    const filter = filterValue === "all" ? null : {field: "status", value: filterValue}
    const [field, direction] = sortValue.split("-")
    const sort = {field, direction}
    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"))
    const {isLoading: isFetching, data:{data:bookings, count} = {} , error} = useQuery({
        queryKey: ["bookings", filter, sort, page],
        queryFn: () => getAllBookigs(filter, sort, page)
    })
    const pageCount = Math.ceil(count / PAGE_SIZE)
    // Pre-fetching next page and previous page 
    if(page !== pageCount){
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sort, page + 1],
            queryFn: () => getAllBookigs(filter, sort, page + 1)
        })
    }
    if(page !== 1){
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sort, page - 1],
            queryFn: () => getAllBookigs(filter, sort, page - 1)
        })
    }
    return {isFetching, bookings, count, error}
}

export default useGetBookingData
