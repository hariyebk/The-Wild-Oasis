import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useGetBookingData from "./useGetBookingData";
import Spinner from "../../ui/Spinner";
import {toast} from "react-hot-toast"
import Empty from "../../ui/Empty"
import Pagination from "../../ui/Pagination";
import {useSearchParams} from "react-router-dom"

function BookingTable() {
  const {isFetching, bookings, count, error} = useGetBookingData()
  const [searchParams, setSearchParams] = useSearchParams()
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
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
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
