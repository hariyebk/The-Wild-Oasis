import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import useTodayActivity from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
  width: 8px;
  max-height: 5px;
}

  &::-webkit-scrollbar-thumb {
  background-color: #888; /* Set the color of the scrollbar thumb */
  border-radius: 10px; /* Add rounded corners to the thumb */
}

`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodaysActivity() {
  const {activities, isLoading} = useTodayActivity()
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>
      {!isLoading ? 
      activities?.length > 0 ? 
      <TodayList>
        {activities.map(activity => <TodayItem activity = {activity} key = {activity.id}/>)}
      </TodayList>:
      <NoActivity> There are no Activities for Today </NoActivity>:
      <Spinner />
      }
    </StyledToday>
  );
}

export default TodaysActivity;
