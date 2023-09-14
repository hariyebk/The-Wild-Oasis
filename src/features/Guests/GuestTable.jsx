import toast from "react-hot-toast"
import Pagination from "../../ui/Pagination"
import Spinner from "../../ui/Spinner"
import Table from "../../ui/Table"
import useGuests from "./useGuests"
import GuestsRow from "./GuestsRow"
import AddNewGuest from "./AddNewGuest"

function GuestTable() {
    const {count, isFetching, guests, error} = useGuests()

    if(isFetching) return <Spinner />
    if(error) return toast.error(error.message)
    return (
        <Table role = "table" columns= "1.5fr 1.8fr 1fr 0.7fr 1.9fr 2.2fr 0.6fr">
            <Table.Header>
                <div> Name </div>
                <div> Address </div>
                <div> Gender </div>
                <div> Age </div>
                <div> Diet </div>
                <div> Country</div>
                <div></div>
                {/* <AddNewGuest /> */}
            </Table.Header>
            <Table.Body data={guests} render={guest => <GuestsRow guest = {guest} key = {guest.id} />} />
            <Table.Footer>
                <Pagination count = {count} />
            </Table.Footer>
        </Table>
    )
}

export default GuestTable
