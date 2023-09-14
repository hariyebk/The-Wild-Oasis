import { PAGE_SIZE } from "../ui/Pagination"
import supabase from "./supabase"

export async function getGuests(filter, sort, page){
    let query = supabase
    .from('guests')
    .select('*', {
        count: "exact"
    })

    //1. filter
    if(filter?.value !== "all") query = query.eq(filter?.field, filter?.value)
    //2. sort
    if(sort) query = query.order(sort.field, {
        ascending: sort.direction === "asc"
    })
    //3.Pagination
    if(page){
        const from = (page - 1) * PAGE_SIZE
        const to = from + PAGE_SIZE - 1
        query = query.range(from, to)
    }
    
    const { data, error, count } = await query
    if(error){
        console.error(error)
        throw new Error("can't get guests")
    } 

    return {data, count}
}
export async function DeleteGuest(id) {
    const { data, error } = await supabase
    .from("guests")
    .delete()
    .eq("id", id)

    if (error) {
        console.error(error);
        throw new Error("Guest Could not be deleted");
    }

    return data;
}