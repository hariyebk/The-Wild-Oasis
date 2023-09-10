import supabase from "./supabase";

export async function Login({email, password}){
    
    const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
    })
    if(error) throw new Error(error)

    return {data}
}

export async function Logout(){
    // removes the jsonwebtoken from the users local storage
    const {error} = await supabase.auth.signOut()
    if(error) throw new Error(error)
}

export async function getCurrentUser(){
    // checking if there is an autheniticated user
    const {data: session} = await supabase.auth.getSession()
    if(!session.session) return null
    // if yes, get the user
    const {data, error} = await supabase.auth.getUser()
    if(error) throw new Error(error)
    return data
}