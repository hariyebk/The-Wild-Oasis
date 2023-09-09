import BookingTable from "../features/bookings/BookingTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import TableOperations from "../ui/TableOperations";

function Bookings() {
  return <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <TableOperations type = "bookings" />
      </Row>
      <BookingTable />
  </>
}

export default Bookings;
