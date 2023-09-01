import { getCabins } from "../../services/apiCabins";
import {useQuery} from "@tanstack/react-query"

export default function useGetCabinData() {
    const {isLoading: isFetching, data: cabin, error} = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,
    })

    return {isFetching, cabin, error}
    
}
