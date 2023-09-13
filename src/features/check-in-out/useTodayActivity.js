import { useQuery } from "@tanstack/react-query"
import {getStaysTodayActivity} from "../../services/apiBookings"

function useTodayActivity() {
    const {data: activities, isLoading} = useQuery({
        queryKey: ["activities"],
        queryFn: getStaysTodayActivity
    })

    return {activities, isLoading}
}

export default useTodayActivity
