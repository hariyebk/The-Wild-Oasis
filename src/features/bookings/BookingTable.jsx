import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useGetBookingData from "./useGetBookingData";
import Spinner from "../../ui/Spinner";
import {toast} from "react-hot-toast"
import Empty from "../../ui/Empty"
import Pagination from "../../ui/Pagination";
import {useNavigate, useSearchParams} from "react-router-dom"
import Button from "../../ui/Button";
import { useDarkMode } from "../../context/DarkModeContext";
import AddBooking from "./AddBooking";

function BookingTable() {
  const {isFetching, bookings, count, error} = useGetBookingData()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const {isDarkMode} = useDarkMode()
  const query = +searchParams.get("query") || null
  let queryBooking
  if(query) queryBooking = bookings?.filter(booking => booking.id === query)
  if(query && queryBooking?.length === 0){
    toast.error(`No booking found with an id of ${query}`)
    setSearchParams(undefined)
  } 
  if(error) return toast.error(error.message)
  if(isFetching) return <Spinner />
  if(bookings?.length === 0) return <Empty resourceName = "bookings" />
  return (
    <Menus>
      <Table columns="1fr 2fr 2.4fr 1.4fr 1fr auto">
        <Table.Header>
          <div>Cabin Id</div>
          <div>Guest Name</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          {/* <AddBooking /> */}
          <Button size = "medium" variation = {isDarkMode ? "special": "primary"} onClick={() => navigate("/bookings/createupdate")}> New </Button>
        </Table.Header>

        <Table.Body
          data={queryBooking ? queryBooking.length === 0 ? bookings : queryBooking : bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
            <Pagination count = {count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
