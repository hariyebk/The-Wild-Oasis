import { useForm } from "react-hook-form"
import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import Textarea from "../../ui/Textarea"
import {Select, Option} from ".././Guests/CreateGuestForm"
import useGuests from "../Guests/useGuests"
import useGetCabinData from "../cabins/useGetCabinData"
import Button from "../../ui/Button"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { subtractDates } from "../../utils/helpers"
import useBooking from "./useBooking"
import useGetSettingData from "../settings/useGetSettingData"
import Spinner from "../../ui/Spinner"
import useCreateUpdateGuest from "../Guests/useCreateUpdateGuest"
import useGetBookingData from "./useGetBookingData"

const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4rem 6rem;
    gap: 3rem;
`

function CreateBookingForm() {
    const {id} = useParams()
    const {booking} = useBooking()
    const {bookings} = useGetBookingData(true)
    const {settings} = useGetSettingData()
    console.log(booking)
    const {register, handleSubmit, formState, getValues} = useForm({
        defaultValues: Boolean(booking) && {...booking, startDate: new Date(booking.startDate), endDate: new Date(booking.endDate)}
    })

    const isEditing = Boolean(id)
    const {errors} = formState
    const {isLoading, mutate} = useCreateUpdateGuest(isEditing ? id : null)
    const {guests} = useGuests()
    const {cabin: cabins} = useGetCabinData()
    const navigate = useNavigate()

    
    const allGuestIds = guests?.map(guest => guest.id)
    const allCabinIds = cabins?.map(cabin => cabin.id)
    // CABINS THAT ARE CURRENTLY ON USE
    const bookedCabins = bookings?.filter(booking => booking.status === "checked-in").map(el=> el.cabinId)

    // TO PREVENT DUPLICATE BOOKINGS BY ONE GUEST
    const bookedGuests = bookings?.filter(booking => booking.status !== "checked-out").map(el => el.guestId)

    // CABINS THAT ARE FREE FOR USE AND GUESTS THAT HAVE NOT BOOKED OR CHECKED-OUT
    const freeCabins = allCabinIds?.filter(cabinId => !bookedCabins?.includes(cabinId))
    const unbookedguests = allGuestIds?.filter(guestId => !bookedGuests?.includes(guestId))


    function onSubmit(data){
        // CALCULATE THE DURATION THAT THE STAYS BASED ON HIS/HER ARRIVAL AND DEPARTURE DATA
        const millisecondsPerDay = 24 * 60 * 60 * 1000
        const day1 = new Date(data.endDate)
        const day2 =  new Date(data.startDate)
        const duration = Math.floor((day1 - day2) / millisecondsPerDay)

        // CONVERT THE ARRIVAL AND DEPARTURE DATES INTO AN ISO STRING FORMAT
        const arrivalToIso = new Date(data.startDate).toISOString()
        const departureToIso = new Date(data.endDate).toISOString()

        // CONVERT YES/NO VALUES INTO BOOLEANS
        const breakfastToBoolean = data.hasBreakfast === "true" ? true : false
        const hasPaidToBoolean = data.isPaid === "true" ? true : false
        
        // CONVERT CABIN AND GUEST ID'S INTO A NUMBER

        const cabinid = Number(data.cabinId)
        const guestid = Number(data.guestId)


        // GET THE PRICE FOR THE SELECTED CABIN
        const cabin = cabins.find(cabin => cabinid === cabin.id)
        const priceforcabin =  duration * (cabin?.regularPrice - cabin?.discount)
        const Total = priceforcabin + data.extrasPrice

        // RE-ORGANIZE THE DATA FROM THE FORM TO SUITE THE DATABASE SCHEMA
        const newData = {...data, cabinId: cabinid, guestId: guestid, numNights: duration, observations: null, cabinPrice: priceforcabin, isPaid: hasPaidToBoolean, hasBreakfast: breakfastToBoolean, TotalPrice: Total , startDate: arrivalToIso , endDate: departureToIso}

        if(isEditing){
            return mutate({
                id,
                booking: newData
            })
        }
        else mutate(newData)
    }
    function onError(error){
        console.log(error.message)
    }

    if(isLoading) return <Spinner />

    return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type = "special">
        <Input id="created_at" disabled = {isLoading} hidden = {true} {...register("created_at", {
            required: "This field is required",
            value: new Date().toISOString()
            })} />

        <FormRow label = " Arrival date" error = {errors?.startDate?.message}>
            <Input type="date" disabled = {isLoading} id="startDate" {...register("startDate", {
            required: "This field is required",
            valueAsDate: true,
            validate: value => {
                return subtractDates(value.toISOString(), new Date().toISOString())  >= 0  || "You can't choose past time"
            }
            })} />
        </FormRow>

        <FormRow label = "Departure date" error = {errors?.endDate?.message}>
            <Input type="date" disabled = {isLoading} id="endDate" {...register("endDate", {
            required: "This field is required",
            valueAsDate: true,
            validate: value => {
                return value - getValues().startDate > 0 || "Departure date must be greater than Arrival date"
            }
            })} />
        </FormRow>

        <FormRow label = "Number of Guests" error = {errors?.numGuests?.message}>
            <Input type="number" disabled = {isLoading} id="numGuests" {...register("numGuests", {
            required: "This field is required",
            valueAsNumber: true,
            min: {
                value: 1,
                message: "The minimum capacity should 1"
            },
            max: {
                value: settings?.maxGuestperBooking,
                message: "Maximum number of guests exceeded"
            }
            })} />
        </FormRow>

        <FormRow label = "Includes Breakfast ?" error = {errors?.hasBreakfast?.message}>
            <Select id = "hasBreakfast" disabled = {isLoading} defaultValue= {false} {...register("hasBreakfast")}>
                <Option value=  {true}> Yes </Option>
                <Option value = {false}> No </Option>
            </Select>
        </FormRow>


        <FormRow label = " Breakfast Price" error = {errors?.extrasPrice?.message}>
            <Input type="number" defaultValue = {getValues().hasBreakfast ? settings?.breakfastPrice : 0} disabled = {isLoading} id="extrasPrice"  {...register("extrasPrice", {
                required: "This field is required",
                valueAsNumber: true,
                validate: value => {
                    return getValues().hasBreakfast === "true" ? value >= settings?.breakfastPrice || `The minumum breakfast price is ${settings?.breakfastPrice}` : value === 0 || "breakfast price can't be negative"
                }
            })} />
        </FormRow>

        <FormRow label = "status" error = {errors?.status?.message}>
            <Select id="status" disabled = {isLoading} defaultValue= "unconfirmed" {...register("status")}>
                <Option value= "unconfirmed"> Unconfirmed </Option>
                <Option value= "checked-in"> Checked-in </Option>
            </Select>
        </FormRow>

        <FormRow label = " Guest has paid full price ?" error = {errors?.isPaid?.message}>
            <Select id="isPaid" disabled = {isLoading} defaultValue= {true} {...register("isPaid")}>
                <Option value= {true} > Yes </Option>
                <Option value= {false}> No </Option>
            </Select>    
        </FormRow>

        <FormRow label = "Cabin Id"> 
            <Select id = "cabinId" disabled = {isLoading}  {...register("cabinId")}>
                {freeCabins?.map(cabinId =>  
                    <Option value = {cabinId} key={cabinId}>
                        {cabinId}
                    </Option>)
                }
            </Select>
        </FormRow>

        <FormRow label = "Guest Id" error = {errors?.guestId?.message}>
                <Select id = "guestId" disabled = {isLoading} {...register("guestId")}>
                    {unbookedguests?.map(guestId =>  
                        <Option value = {guestId} key={guestId}>
                            {guestId}
                        </Option>)
                    }
                </Select>
        </FormRow>

        <FormRow>
            <Div>
                <Button variation="secondary" type="reset" disabled = {isLoading} onClick= {() => navigate(-1)}>
                    Back
                </Button>
                <Button disabled = {isLoading}> {isEditing ? "Edit Booking" : "Create Booking"} </Button>
            </Div>
        </FormRow>
    </Form>
    )
}

export default CreateBookingForm
