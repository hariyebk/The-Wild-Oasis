import supabase from "./supabase"

export async function getGuests(){
    const { data, error, count } = await supabase
    .from('guests')
    .select('*', {
        count: "exact"
    })
    
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

export async function CreateUpdateGuest(id, Guest){
    let query
    if(id) query = supabase.from("guests").update({...Guest}).eq("id", id)
    if(!id) query = supabase.from("guests").insert([{...Guest}])
    const {data, error} = await query.select("*")

    if(error){
        console.log(error.message)
        throw new Error(error)
    }

    return {data}
}