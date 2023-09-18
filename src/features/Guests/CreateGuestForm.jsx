import Form from "../../ui/Form"
import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import {useForm} from "react-hook-form"
import Button from "../../ui/Button"
import useCreateUpdateGuest from "./useCreateUpdateGuest"
import styled from "styled-components"

export const Select = styled.select`
    background-color: var(--color-grey-0);
    width: 30rem;
    height: 4rem;
    padding-left: 2rem;
    border: none;
`
export const Option = styled.option`
    font-size: 2rem;
    font-weight: 500;
`
function CreateGuestForm({closeModal, Guest, isEditing}) {

    const {register, handleSubmit, formState} = useForm({
        defaultValues: isEditing && Guest
    })

    const {isLoading, mutate} = useCreateUpdateGuest(isEditing)

    const {errors} = formState

    function onSubmit(data){
        if(isEditing){
            mutate({id: Guest.id, Guest: data})
            closeModal()
        }
        else{
            mutate({Guest: data})
            closeModal()
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} type = {isEditing ? "modal" : "regular"}>
            <FormRow>
                <Input type="date" id="created_at" hidden = {true} {...register("created_at", {
                    value: new Date().toISOString()
                })} />
            </FormRow>
            <FormRow label = "Full name" error = {errors?.fullName?.message}>
                <Input type="text" id="fullName" disabled = {isLoading} {...register("fullName", {
                    required: "full name is a required field",
                    minLength: {
                        value: 5,
                        message: "Name must be at least 5 characters long"
                    }
                })} />
            </FormRow>
            <FormRow label = "Email Address" error = {errors?.email?.message}>
                <Input type="email" id="email" disabled = {isLoading} {...register("email", {
                required: "email is a required field",
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address"
                }
                })} />
            </FormRow>
            <FormRow label = "Nationality" error = {errors?.nationality?.message}>
                <Input type="text" id="nationality" disabled = {isLoading} {...register("nationality", {
                    required: "nationality is a required field",
                })} />
            </FormRow>

            <FormRow label = "Country Flag" error = {errors?.countryFlag?.message}>
                <Input type="url" id="countryFlag" disabled = {isLoading} {...register("countryFlag", {
                    required: "country flag is a required field",
                    // validate: value => value  || "Invalid url",
                })} />
            </FormRow>

            <FormRow label = "National Id" error = {errors?.nationalID?.message}>
                <Input type="number" id="nationalID" disabled = {isLoading} {...register("nationalID", {
                    required: "national id is a required field",
                    valueAsNumber: true
                })}/>
            </FormRow>

            <FormRow label= "Gender">
                    <Select id = "Gender" defaultValue= "Male" {...register("Gender")}>
                        <Option value= "Male"> Male </Option>
                        <Option value = "Female"> Female </Option>
                    </Select>
            </FormRow>

            <FormRow label = "Age" error = {errors?.Age?.message}>
                <Input type="number" id="Age" disabled = {isLoading} {...register("Age", {
                    required: "Age id is a required field",
                    validate: value => value >= 18 || "guest must be 18 or older",
                    valueAsNumber: true
                })}/>
            </FormRow>

            <FormRow label = "Diet Preference" error = {errors?.Diet?.message}>
                <Input type="text" id="Diet" disabled = {isLoading} {...register("Diet", {
                    required: "diet is a required field",
                })}/>
            </FormRow>

            <FormRow label = "Address" error = {errors?.address?.message}>
                <Input type="text" id="address" disabled = {isLoading} {...register("address", {
                        required: "address is a required field",
                })}/>
            </FormRow>

            <FormRow>
                    <Button variation="secondary" type="reset" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button disabled = {isLoading}>{isEditing ? "Edit Guest" : "Add Guest"}</Button>
            </FormRow>
        </Form>
    )
}

export default CreateGuestForm
