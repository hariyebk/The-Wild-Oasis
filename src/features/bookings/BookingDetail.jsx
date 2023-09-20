import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import { toast } from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiMiniTrash } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import useCheckinCheckout from "../check-in-out/useCheckinCheckout";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal"
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {id} = useParams()
  const {isFetching, booking, error} = useBooking(id)
  const {isDeleting, deletebooking} = useDeleteBooking()
  const navigate = useNavigate()
  const {isLoading:isCheckingOut, mutate: checkout} = useCheckinCheckout("checked-out")

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  function handlemoveback (){
    moveBack()
  }

  if(error) return toast.error("can't get this booking")
  if(isFetching || isCheckingOut) return <Spinner />
  if(!booking) return <Empty />
  const {status, id:bookingId} = booking
  return <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={handlemoveback}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
        <ButtonGroup>
            {status === "unconfirmed" && 
              <Button icon = {<HiArrowDownOnSquare/>} onClick={() => navigate(`/checkin/${bookingId}`)}>
                          <span> Check In </span>
              </Button>
            } 
            {status === "checked-in" && 
              <Button icon = {<HiArrowUpOnSquare/>} disabled = {isCheckingOut} onClick={() => checkout(bookingId)}>
                          <span> Check Out </span>
              </Button>
            }
            {(status === "unconfirmed" || status === "checked-out") && <>
                <Modal>
                    <Modal.Open opensWindowName= "delete-booking" >
                          <Button variation = "danger" icon = {<HiMiniTrash/>}>
                          <span> Delete booking </span>
                          </Button>
                    </Modal.Open>
                    <Modal.Window name = "delete-booking">
                          <ConfirmDelete resourceName= {`booking #${bookingId}`} onConfirm={() => deletebooking(bookingId)} disabled= {isDeleting}/>
                    </Modal.Window>
                </Modal>
            </>}
          <Button variation="secondary" disabled = {isCheckingOut} onClick={handlemoveback}>
            Back
          </Button>
        </ButtonGroup>
    </>
}

export default BookingDetail;
