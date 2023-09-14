import { useForm } from "react-hook-form"
import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import styled from "styled-components"
import Textarea from "../../ui/Textarea"
import {StyledSelect} from "../../ui/Select"

const StyledRadioInput = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
`

function CreateBookingForm() {
    const {register, handleSubmit, formstate, getValues} = useForm()

    function onSubmit(data){

    }
    function onError(error){

    }

    return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type = "modal">
        <FormRow label = " Arrival date">
            <Input type="date" id="startDate" {...register("startDate", {
            required: "This field is required"
            })} />
        </FormRow>
        <FormRow label = "Departure date">
            <Input type="date" id="enddate" {...register("endDate", {
            required: "This field is required"
            })} />
        </FormRow>
        <FormRow label = "Number of Guests">
            <Input type="number" id="numGuests" {...register("numGuests", {
            required: "This field is required",
            min: {
                value: 1,
                message: "The minimum capacity should 1"
            }
            })} />
        </FormRow>
        <FormRow label = "Stay Duration">
            <Input type="number" id="numNights" placeholder="number of nights" {...register("numNights", {
            required: "This field is required",
            min: {
                value: 1,
                message: "The minimum capacity should 1"
            }
            })} />
        </FormRow>
        <FormRow label = "Cabin Price">
            <Input type="number" id="cabinPrice" {...register("cabinPrice", {
            required: "This field is required",
            })} />
        </FormRow>
        <FormRow label = "Includes Breakfast ?">
                <Input type="radio" id="hasBreakfast" value={true} />
                {/* <Input type="radio"  id = "hasBreakfast" value = {false}>
                    No
                </Input> */}
        </FormRow>
        <FormRow label = " Breakfast Price">
            <Input type="number" id="extrasPrice"  {...register("extrasPrice", {
            required: "This field is required",
            })} />
        </FormRow>
        <FormRow label = "Total Price">
            <Input type="number" id="totalPrice" {...register("totalPrice", {
            required: "This field is required",
            })} />
        </FormRow>
        <FormRow label = "status">
            <StyledSelect id="status">
                <option value= "unconfirmed"> unconfirmed </option>
                <option  value= "checked-in"> checked-in </option>
            </StyledSelect>
        </FormRow>
        <FormRow label = "Has Paid ?">
            <div>
                <label> Yes
                    <input type="radio" name="color" value="red" />
                </label>
                <label> No
                    <input type="radio" name="color" value="blue" />
                </label>
            </div>
        </FormRow>
        <FormRow label = "Cabin Id">
            <Input type="number" id="cabinId" {...register("cabinId", {
            required: "This field is required",
            })} />
        </FormRow>
        <FormRow label = "Guest Id">
            <Input type="number" id="guestId" {...register("guestId", {
            required: "This field is required",
            })} />
        </FormRow>
        <FormRow label = "Observations">
            <Textarea type="text" id="observations" defaultValue= "" {...register("observations", {
            required: "This field is required"
            })}/>
        </FormRow>
    </Form>
    )
}

export default CreateBookingForm
