import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import useCreateAndEdit from "./useCreateAndEdit";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({setCreateShowForm, cabinTobeEdited = {}, setEditShowForm}) {
  // If the cabin has an Id , it means  it's going to be edited
  const isEditing = Boolean(cabinTobeEdited.id)

  const {register, handleSubmit, getValues, formState} = useForm({
    defaultValues: isEditing && cabinTobeEdited
    })
  // cutom hook to Create and Edit cabin
  const {isLoading, mutate} = useCreateAndEdit(isEditing, cabinTobeEdited, setEditShowForm, setCreateShowForm)

  const {errors} = formState

  function onSubmit(data){
    // console.log(data)
    isEditing ? typeof getValues().image === "object" ? mutate({...data, image: data.image[0]}) : mutate(data) : mutate({...data, image: data.image[0]})
  }

  function onError(errors){
    console.log(errors.message)
  }

  if(isLoading) return <Spinner />
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" disabled = {isLoading}  {...register("name", {
          required: "This field is required"
        })} />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity"  disabled = {isLoading} {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: "The minimum capacity should 1"
          }
        })} />
        {errors?.maxCapacity?.message && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice"  disabled = {isLoading} {...register("regularPrice", {
          required: "This field is required",
          min: {
            value: 1,
            message: "The minimum capacity should 1"
          }
        })} />
        {errors?.regularPrice?.message && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" id="discount"  defaultValue= {0} disabled = {isLoading} {...register("discount", {
          required: "This field is required",
          validate: value => value < +getValues().regularPrice || "Discount should be less than the Regular price",
        })} />
        {errors?.discount?.message && <Error>{getValues().discount === "" && errors?.discount?.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea type="number" id="description" disabled = {isLoading} defaultValue= "" {...register("description", {
          required: "This field is required"
        })}/>
        {errors?.description?.message && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*"  disabled = {isLoading} {...register("image", {
          required: isEditing ? false : "This field is required"
        })} />
        {errors?.image?.message && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disable = {isLoading}>
          Cancel
        </Button>
        <Button disable = {isLoading} >{isEditing ? "Edit cabin" : "Add Cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
