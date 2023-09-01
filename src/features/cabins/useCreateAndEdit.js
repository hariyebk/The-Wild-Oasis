import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createOrEditCabin } from "../../services/apiCabins"
import { toast } from "react-hot-toast"

export default function useCreateAndEdit (isEditing , cabinTobeEdited, setEditShowForm, setCreateShowForm){
    const queryClient = useQueryClient()
    const {mutate, isLoading} = useMutation({
        mutationFn: (data) =>  isEditing ? createOrEditCabin(data, cabinTobeEdited.id) : createOrEditCabin(data),
        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["cabins"]
        })
        toast.success(isEditing ? "cabin edited successfully" : setCreateShowForm ? "New cabin created successfully" : "cabin duplicated  successfully")
        isEditing ? setEditShowForm(false) : setCreateShowForm && setCreateShowForm(false)
        },
        onError: (err) => toast.error(err.message)
    })

    return {isLoading, mutate}
}