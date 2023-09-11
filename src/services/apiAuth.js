import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function Signup({fullName, email, password}){
    const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                Avatar: ""
            }
        }
    })
    if(error) throw new Error(error)

    return {data}
}
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

export async function updateCurrentUser({fullName, password, avatar}){
    let updateuser
    // 1. Update password or fullname separetly
    if(password) updateuser = {password}
    if(fullName) updateuser = {data: {fullName}}

    const {data, error} = await supabase.auth.updateUser(updateuser)
    if(error) throw new Error(error.message)
    if(!avatar) return data

    // 2. uppload avatar image
    const filename = `avatar-${data.user.id}-${Math.random()}`
    const {error: imageuploaderror} = await supabase.storage.from("avatar").upload(filename, avatar)
    if(imageuploaderror) throw new Error(imageuploaderror.message)
    //3. update avatar
    const {data: updateAvatar, error: error1} = await supabase.auth.updateUser({
        data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatar/${filename}`
        }
    })
    if(error1) throw new Error(error1.message)

    return updateAvatar

}