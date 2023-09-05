import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useGetBookingData from "./useGetBookingData";
import Spinner from "../../ui/Spinner";
import {toast} from "react-hot-toast"
import Empty from "../../ui/Empty"

function BookingTable() {
  const {isFetching, bookings, error} = useGetBookingData()

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
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
