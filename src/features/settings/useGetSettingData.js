import { getSettings } from "../../services/apiSettings"
import {useQuery} from "@tanstack/react-query"
function useGetSettingData() {
    const {isLoading, data: settings, error} = useQuery({
        queryKey: ["settings"],
        queryFn:  getSettings
    })

    return {isLoading, settings, error}
}

export default useGetSettingData
