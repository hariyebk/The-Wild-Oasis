import Select from "./Select"
import {useContext} from "react"
import { TableOperationsContext } from "./TableOperations"
import { useSearchParams } from "react-router-dom"

function SortBy({sort}) {
    const {CabinSortOptions, BookingSortOptions, GuestSortOptions} = useContext(TableOperationsContext)
    const [searchParams, setSearchParams] = useSearchParams()
    function handleChange(e){
        searchParams.set("sortBy", e.target.value)
        setSearchParams(searchParams)
    }
    return (
        <Select options={sort === "cabins" ? CabinSortOptions : sort === "guests" ? GuestSortOptions : BookingSortOptions} value = {searchParams.get("sortBy") || ""} type= "white" onChange = {handleChange}/>
    )
}

export default SortBy
