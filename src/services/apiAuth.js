import supabase from "./supabase";

export async function Login({email, password}){
    
    const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
    })
    if(error) throw new Error(error)

    return {data}
}