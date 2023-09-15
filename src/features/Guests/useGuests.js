import {useQuery, useQueryClient} from "@tanstack/react-query"
import { getGuests } from "../../services/apiGuests"
import { useSearchParams } from "react-router-dom"
import { PAGE_SIZE } from "../../ui/Pagination"

function useGuests() {
    // const [searchParams] = useSearchParams()
    // const queryClient = useQueryClient()
    // const filtervalue = searchParams.get("Gender") || "all"
    // const filter = {field: "Gender", value: filtervalue}
    // const sortvalue = searchParams.get("sortBy") || "fullName-asc"
    // const [field, direction] = sortvalue.split("-") 
    // const sort = {field, direction}
    // const page = +searchParams.get("page") || 1
    const {isLoading: isFetching, data: {data: guests, count} = {}, error} = useQuery({
        queryKey: ["guests"],
        queryFn: getGuests
    })
    // const pageCount = Math.ceil(count / PAGE_SIZE)
    // // Pre-fetching next page and previous page 
    // if(page !== pageCount){
    //     queryClient.prefetchQuery({
    //         queryKey: ["guests", filter, sort, page + 1],
    //         queryFn: () => getGuests(filter, sort, page + 1)
    //     })
    // }
    // if(page !== 1){
    //     queryClient.prefetchQuery({
    //         queryKey: ["guests", filter, sort, page - 1],
    //         queryFn: () => getGuests(filter, sort, page - 1)
    //     })
    // }

    return {isFetching, guests, count, error}
}

export default useGuests
