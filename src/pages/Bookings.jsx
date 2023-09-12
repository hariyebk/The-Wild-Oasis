import BookingTable from "../features/bookings/BookingTable";
import Filter from "../ui/Filter";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Search from "../ui/Search";
import SortBy from "../ui/SortBy";
import TableOperations from "../ui/TableOperations";

const type = "bookings"
function Bookings() {
  return <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <TableOperations>
            <Filter filter= {type} />
            <SortBy sort= {type} />
            <Search type = {type} />
        </TableOperations>
      </Row>
      <BookingTable />
  </>
}

export default Bookings;
