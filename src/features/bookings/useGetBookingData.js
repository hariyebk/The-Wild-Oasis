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

    const {isLoading: isFetching, data:bookings, error} = useQuery({
        queryKey: ["bookings", filter, sort],
        queryFn: () => getAllBookigs(filter, sort)
    })
    return {isFetching, bookings, error}
}

export default useGetBookingData
