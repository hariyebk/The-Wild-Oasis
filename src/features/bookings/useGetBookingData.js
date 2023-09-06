import {useQuery} from "@tanstack/react-query"
import { getAllBookigs } from "../../services/apiBookings"
import {useSearchParams} from "react-router-dom"

function useGetBookingData() {
    const [searchParams] = useSearchParams()
    const filterValue = searchParams.get("status") || "all"
    const sortValue = searchParams.get("sortBy") || "startDate-desc"
    const filter = filterValue === "all" ? null : {field: "status", value: filterValue}
    const [field, direction] = sortValue.split("-")
    const sort = {field, direction}
    const page = searchParams.get("page") || 1

    const {isLoading: isFetching, data:{data:bookings, count} = {} , error} = useQuery({
        queryKey: ["bookings", filter, sort, page],
        queryFn: () => getAllBookigs(filter, sort, page)
    })
    return {isFetching, bookings, count, error}
}

export default useGetBookingData
