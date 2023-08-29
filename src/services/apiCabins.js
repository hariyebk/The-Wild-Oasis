import supabase from "./supabase";

const { data: cabins, error } = await supabase.from('cabins').select('*')
