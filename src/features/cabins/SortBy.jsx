import Select from "../../ui/Select"
import {useContext} from "react"
import { TableOperationsContext } from "../../ui/TableOperations"
import { useSearchParams } from "react-router-dom"

function SortBy() {
    const {SortOptions} = useContext(TableOperationsContext)
    const [searchParams, setSearchParams] = useSearchParams()
    function handleChange(e){
        searchParams.set("sortBy", e.target.value)
        setSearchParams(searchParams)
    }
    return (
        <Select options={SortOptions} value = {searchParams.get("sortBy") || ""} type= "white" onChange = {handleChange}/>
    )
}

export default SortBy
