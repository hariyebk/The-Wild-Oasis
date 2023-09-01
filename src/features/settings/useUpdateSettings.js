
import {useMutation, useQueryClient} from "@tanstack/react-query"
import { updateSetting } from "../../services/apiSettings"
import { toast } from "react-hot-toast"
function useUpdateSettings() {
    const queryClient = useQueryClient()
    const {isLoading: isUpdating, mutate} = useMutation({
        mutationFn: updateSetting,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["settings"]
            })
            toast.success("Settings updated successfully")
        },
        onError: (err) => toast.error(err.message)
    })

    return {isUpdating, mutate}
}

export default useUpdateSettings
