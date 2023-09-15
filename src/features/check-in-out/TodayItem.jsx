import styled from "styled-components";
import Tag from "../../ui/Tag"
import {Flag} from "../../ui/Flag"
import Button from "../../ui/Button"
import { HiCheckBadge } from "react-icons/hi2";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton"


const StyledTodayItem = styled.li`
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({activity}) {
  const {id, status, guests, numNights, isPaid} = activity
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type = "green"> Arriving </Tag>}
      {status === "checked-in" && <Tag type = "blue"> Leaving </Tag>}
      <Flag src = {guests.countryFlag} alt = {`Flag of ${guests.country}`}/>
      <Guest> {guests.fullName} &nbsp;  {status === "unconfirmed" && isPaid && <HiCheckBadge style={{width: "20px", height: "15px"}} />} </Guest>
      <div> {numNights}  nights </div> 
      {status === "unconfirmed" && <Button size = "small" variation = "primary" as = {Link} to= {`/checkin/${id}`}> check in</Button>}
      {status === "checked-in" && <CheckoutButton bookingId={id}> check out</CheckoutButton>}
    </StyledTodayItem>
  )
}

export default TodayItem

