import supabase, {supabaseUrl} from "./supabase";

export async function getCabins(){
    const { data, error, count } = await supabase.from('cabins').select('*', {
        count: "exact"
    })
    if(error){
        console.log(error)
        throw new Error("can't load cabins data")
    }
    return {data, count}
}
export async function deleteCabin(id){
    const { data, error } = await supabase.from('cabins').delete().eq('id', id)
    if(error){
        console.log(error)
        throw new Error("can't delete cabin")
    }

    return data
}

export async function createOrEditCabin(newCabin, id){
    const hasImagePath = typeof newCabin.image === "object" ? newCabin.image.name.startsWith(supabaseUrl) : newCabin.image.startsWith(supabaseUrl)
    
    //1. create the new cabin
    let imageName
    if(!hasImagePath) imageName = `${Math.random()}-${newCabin.image.name.replaceAll("/", "")}`
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    let query
    if(!id) query = supabase.from('cabins').insert([{...newCabin, image: imagePath}])
    if(id) query = supabase.from('cabins').update({...newCabin, image: imagePath}).eq('id', id)

    const {data, error} = await query.select().single()

    if(error){
        console.log(error)
        throw new Error("can't create a new cabin")
    }
    if(!hasImagePath){
        //2. upload the image to supabase bucket
        const {error: fileUploadError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image)
    
        // If the error occurs while the image is uploading, we have to delete the newly created cabin.
    
        if(fileUploadError){
            console.log(fileUploadError.message)
            // delete if its newly created cabin
            !id && await supabase.from('cabins').delete().eq('id', data.id)
            throw new Error("cabin image could not be uploaded and the cabin was not created ")
        }
    }
    return data
}