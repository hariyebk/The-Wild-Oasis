import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import useGetCabinData from "../cabins/useGetCabinData";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const [searchParams] = useSearchParams()
  const lastDate = searchParams.get("last") || 7
  const {isLoadingBookings, recentBookings} = useRecentBookings()
  const {isLoadingStays, recentStays} = useRecentStays()
  const {isFetching, cabin: cabins} = useGetCabinData()



  if(isLoadingBookings || isLoadingStays || isFetching) return <Spinner />
  return (
    <StyledDashboardLayout>
        <Stats bookings={recentBookings} confirmedStays={recentStays} numDays={lastDate} numCabins={cabins?.length}/>
        <div> Today's Activity </div>
        <div> Chart stay durations </div>
        <div> Chart Sales </div>      
    </StyledDashboardLayout>
  )
}

export default DashboardLayout

