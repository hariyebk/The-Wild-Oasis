import GuestTable from "../features/Guests/GuestTable"
import Filter from "../ui/Filter"
import Heading from "../ui/Heading"
import Row from "../ui/Row"
import Search from "../ui/Search"
import SortBy from "../ui/SortBy"
import TableOperations from "../ui/TableOperations"

const type = "guests"

function Guests() {
    return (
        <>
        <Row type = "horizontal">
            <Heading as = "h1"> All Guests </Heading>
            <TableOperations>
                <Filter filter= {type} />
                <SortBy sort= {type} />
                <Search type ={type} />
            </TableOperations>
        </Row>
        <GuestTable />
        </>
    )
}

export default Guests
