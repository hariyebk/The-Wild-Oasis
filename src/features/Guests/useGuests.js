import { getGuests } from "../../services/apiGuests"
import {useQuery} from "@tanstack/react-query"

function useGuests() {
    const {isLoading: isFetching, data: {data: guests, count} = {}, error} = useQuery({
        queryKey: ["guests"],
        queryFn: getGuests
    })
    return {isFetching, guests, count, error}
}

export default useGuests
