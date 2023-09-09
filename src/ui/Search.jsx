import { useState } from "react"
import { toast } from "react-hot-toast"
import { useSearchParams } from "react-router-dom"
import { styled } from "styled-components"

const StyledSearch = styled.input`
    font-size: 1.4rem;
    padding: 0.8rem 2rem;
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
`
function Search({type}) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState("")
    function handleSubmit (e){
        e.preventDefault()
        if(!query || query === "") return
        if(typeof query !== "number") return toast.error(`${type} id must be a number`)
        searchParams.set("query", query)
        setSearchParams(searchParams)
        setQuery("")
    }
    return (
        <form onSubmit={handleSubmit}>
            <StyledSearch type = "number" placeholder= {`Search ${type} by id`} value={query} onChange={(e) => setQuery(+e.target.value)}/>
        </form>
    )
}

export default Search
