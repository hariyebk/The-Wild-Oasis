import toast from "react-hot-toast"
import Pagination from "../../ui/Pagination"
import Spinner from "../../ui/Spinner"
import Table from "../../ui/Table"
import useGuests from "./useGuests"
import GuestsRow from "./GuestsRow"
import AddNewGuest from "./AddNewGuest"
import { useSearchParams } from "react-router-dom"
import { PAGE_SIZE } from "../../ui/Pagination"


function GuestTable() {
    const {count, isFetching, guests, error} = useGuests()
    const [searchParams, setSearchParams] = useSearchParams()

    //1. FILTER
    const filtervalue = searchParams.get("Gender") || "all"
    const filter = {field: "Gender", value: filtervalue}
    let filteredGuest
    if(filtervalue === "all")  filteredGuest = guests
    if(filtervalue !== "all") filteredGuest = guests?.filter(guest => guest[filter.field] === filtervalue)

    //2. SORT
    const sortvalue = searchParams.get("sortBy") || "fullName-asc"
    const [fieldName, direction] = sortvalue.split("-") 
    const sortedGuest = filteredGuest?.sort((a, b) => {
        const valueA = a[fieldName]
        const valueB = b[fieldName]
        if(typeof valueA === "string")  return direction === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
        else return direction === "asc" ? valueA - valueB : valueB - valueA
    })

    //3. PAGINATION
    const page = +searchParams.get("page") || 1
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1
    const paginatedGuest = sortedGuest?.slice(from, to)

    //4. QUERY
    const query = searchParams.get("query")
    let queryGuest
    if(query) queryGuest = guests?.filter(guest => guest?.fullName.split(" ").at(0) === query)

    if(query && queryGuest?.length === 0){
        toast.error(`No guest found with a name of ${query.toLowerCase()}`)
        setSearchParams(undefined)
    }
    

    if(isFetching) return <Spinner />
    if(error) return toast.error(error.message)
    return (
        <Table role = "table" columns= "1.5fr 0.5fr 1.8fr 1fr 0.7fr 1.9fr 1.9fr 0.6fr">
            <Table.Header>
                <div> Name </div>
                <div> Id </div>
                <div> Address </div>
                <div> Gender </div>
                <div> Age </div>
                <div> Diet </div>
                <div> Country</div>
                <AddNewGuest />
            </Table.Header>
            <Table.Body data={queryGuest ? queryGuest : paginatedGuest} render={guest => <GuestsRow guest = {guest} key = {guest.id} />} />
            <Table.Footer>
                <Pagination count = {count} />
            </Table.Footer>
        </Table>
    )
}

export default GuestTable
