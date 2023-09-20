import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import { useNavigate } from "react-router-dom";
import useGetBookingData from "../features/bookings/useGetBookingData";

export const StyledConfirmDelete = styled.div`
  width: 48rem;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2rem 1rem;
  text-align: justify;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, closeModal, id}) {
  const {bookings} = useGetBookingData("allbookings")
  const name = resourceName.split("#")
  let referenceBooking
  if(name.at(0) === "guest ") referenceBooking = bookings?.filter(booking => booking.guestId === id)
  if(name.at(0) === "cabin ") referenceBooking = bookings?.filter(booking => booking.cabinId === id)
  const isRelated = name.at(0) === "guest " || name.at(0) === "cabin "
  const navigate = useNavigate()
  if( isRelated && referenceBooking?.length !== 0){
    return (
      // To prevent a foreign key constraint violation in a database. You need to delete the correlated booking first.
        <StyledConfirmDelete>
            <p> 
            To proceed with the requested action, you need to delete the related booking first. Please navigate to the bookings section and delete the booking associated with the {name.at(0)} you wish to modify or delete. Once the booking is removed, you can proceed with your desired operation on the guest record.
          </p>
          <div>
              <Button variation="secondary" disabled={disabled} onClick={() => closeModal()}>
                        Cancel
              </Button>
              <Button variation="primary" disabled={disabled} onClick={() => navigate(`/bookings/${referenceBooking.at(0).id}`)}>
                        Go to booking
              </Button>
          </div>
        </StyledConfirmDelete>
  )
}

  else {
      return (
          <StyledConfirmDelete>
            <Heading as="h3">Delete {resourceName}</Heading>
            <p>
              Are you sure you want to delete this {name.at(0)} permanently? This
              action cannot be undone.
            </p>

            <div>
              <Button variation="secondary" disabled={disabled} onClick={() => closeModal()}>
                Cancel
              </Button>
              <Button variation="danger" disabled={disabled} onClick={() => {
                closeModal()
                onConfirm()
              }
              }>
                Delete
              </Button>
            </div>
          </StyledConfirmDelete>
      );
    }
}

export default ConfirmDelete;
