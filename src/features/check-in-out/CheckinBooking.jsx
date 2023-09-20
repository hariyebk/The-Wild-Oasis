import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import { toast } from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Checkbox from "../../ui/Checkbox"
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckinCheckout from "./useCheckinCheckout";
import useGetSettingData from "../settings/useGetSettingData";
import { useParams } from "react-router-dom";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const {id} = useParams()
  const {isFetching, booking, error} = useBooking(id)
  const [confirmPaid, setConfirmPaid] = useState(false)
  const [addBreakfast, setAddBreakfast] = useState(false)
  const {isLoading: isFetchingSetting, settings} = useGetSettingData()
  const {isLoading: isCheckingIn, mutate: checkIn} = useCheckinCheckout("checked-in")

  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false)
  }, [booking])

  const moveBack = useMoveBack();
  const {
    id: bookingId,
    guests,
    totalPrice,
    isPaid,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking || {};

  const breakfastPrice = settings?.breakfastPrice * numNights * numGuests


  function handleCheckin() {
    if(!confirmPaid) return
    if(addBreakfast){
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: breakfastPrice,
          totalPrice: totalPrice + breakfastPrice
        }
      })
    }
    else{
      checkIn({bookingId, breakfast: {}})
    }
  }


  if(error) return toast.error("can't get this booking")
  if(isFetching || isCheckingIn || isFetchingSetting) return <Spinner />
  if(!booking) return <Empty />

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && <Box>
          <Checkbox
          checked={addBreakfast}
          onChange={() => setAddBreakfast((addBreakfast) => !addBreakfast)}
          id = "breakfast"
          > 
            Want to Add a breakfast for {formatCurrency(breakfastPrice)} ?
          </Checkbox>
      </Box>}
      <Box>
          <Checkbox
          checked={confirmPaid}
          disabled= {isPaid ? addBreakfast ? true : false : isCheckingIn}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          id = "confirm"
          > 
              I confirm that {guests.fullName} has paid A Total Amount of {!addBreakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice + breakfastPrice)} (${formatCurrency(totalPrice)} +  ${formatCurrency(breakfastPrice)} breakfast)`}
          </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled = {!confirmPaid || isCheckingIn}> Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
