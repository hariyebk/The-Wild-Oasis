import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import useGetCabinData from "../cabins/useGetCabinData";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodaysActivity from "../check-in-out/TodayActivity";


const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: auto 2fr auto auto 1fr;
  grid-template-rows: auto 35rem auto;
  gap: 2.4rem;
  row-gap: 5rem;
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
        <TodaysActivity />
        <DurationChart confirmedStays={recentStays}/>
        <SalesChart bookings={recentBookings} numDays={lastDate} />
    </StyledDashboardLayout>
  )
}

export default DashboardLayout

