import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar, HiUsers } from "react-icons/hi2"
import Stat from "./Stat"
import { formatCurrency } from "../../utils/helpers"
function Stats({bookings, confirmedStays, numDays, numCabins}) {
    const numBookings = bookings?.length
    //  customers Who Have Paid for the booking But Didn't Arrive Yet 
    const pending = bookings?.filter(booking => booking.isPaid === true && booking.status === "unconfirmed")
    const Revenue = confirmedStays?.reduce((acc, cur) => acc + cur.totalPrice, 0) + pending?.reduce((acc, cur) => acc + cur.totalPrice, 0) || 0
    // number of check-ins
    const numCheckins = confirmedStays?.length
    // occupancy rate = total nights occupied during check -ins / number of days * total cabins
    const occupancyRate = (confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0)) / (numDays * numCabins)


    return (
        <>
        <div>
            <Stat 
                icon={<HiOutlineBriefcase />}
                title= "bookings"
                value= {numBookings}
                color= "blue"
            />
        </div>
        <div>
            <Stat 
                icon={<HiOutlineBanknotes />}
                title= "sales"
                value= {formatCurrency(Revenue)}
                color= "green"
            />
        </div>
        <div>
            <Stat 
                icon={<HiUsers />}
                title= "prepaid guests"
                value= {pending?.length || 0}
                color= "purple"
            />
        </div>
        <div>
            <Stat 
                icon={<HiOutlineCalendarDays />}
                title= "check ins"
                value= {numCheckins}
                color= "indigo"
            />
        </div>
        <div>
            <Stat 
                icon={<HiOutlineChartBar />}
                title= "occupancy rate"
                value= {`${Math.ceil(occupancyRate  * 100)} %`}
                color= "yellow"
            />
        </div>
        </>
    )
}

export default Stats
