import styled from "styled-components";
import { format, isToday } from "date-fns";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiMiniPencilSquare, HiMiniTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal"
import useCheckinCheckout from "../check-in-out/useCheckinCheckout";
import useDeleteBooking from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete"

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

export const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  & span:first-child {
    font-weight: 500;
    font-size: 1.6rem;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName, id: cabinId },
  }}) {
  const statusToTagName = {
    "unconfirmed": "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const {isDeleting, deletebooking} = useDeleteBooking(bookingId)
  const navigate = useNavigate()
  const {mutate: checkout} = useCheckinCheckout("checked-out")
  return (
    <Table.Row>
      <Cabin>{cabinId}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id = {bookingId}/>
            <Menus.List id={bookingId}>
                <Menus.Button icon = {<HiEye/>} onClick={() => navigate(`/bookings/${bookingId}`)}>
                    <span> See details </span>
                </Menus.Button>
                {(status === "unconfirmed" || status === "checked-in") && 
                    <Menus.Button icon = {<HiMiniPencilSquare/>} onClick={() => navigate(`/bookings/createupdate/${bookingId}`)}>
                        <span> Edit booking </span>
                    </Menus.Button>
                }
                {status === "unconfirmed" && <Menus.Button icon = {<HiArrowDownOnSquare/>} onClick={() => navigate(`/checkin/${bookingId}`)}>
                    <span> Check In </span>
                </Menus.Button>}
                {status === "checked-in" && <Menus.Button icon = {<HiArrowUpOnSquare/>}  onClick={() => checkout(bookingId)}>
                    <span> Check Out </span>
                </Menus.Button> }
                {(status === "checked-out" || status === "unconfirmed") && <Modal.Open opensWindowName= "delete-booking" >
                          <Menus.Button icon = {<HiMiniTrash/>}>
                              <span> Delete booking </span>
                          </Menus.Button>
                      </Modal.Open>
                }
            </Menus.List>
        </Menus.Menu>
              <Modal.Window name = "delete-booking">
                    <ConfirmDelete resourceName= {`booking #${bookingId}`} onConfirm={() => deletebooking(bookingId)} disabled= {isDeleting}/>
              </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
