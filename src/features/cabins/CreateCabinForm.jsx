import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import useCreateAndEdit from "./useCreateAndEdit";
import Spinner from "../../ui/Spinner";
import { StyledModal} from "../../ui/Modal";

function CreateCabinForm({cabinTobeEdited = {}, closeEditForm, closeModal}) {
  // If the cabin has an Id , it means  it's going to be edited
  const isEditing = Boolean(cabinTobeEdited.id)

  const {register, handleSubmit, getValues, formState} = useForm({
    defaultValues: isEditing && cabinTobeEdited
    })
  // cutom hook to Create and Edit cabin
  const {isLoading, mutate} = useCreateAndEdit(isEditing, cabinTobeEdited, closeEditForm, closeModal)

  const {errors} = formState

  function onSubmit(data){
    isEditing ? typeof getValues().image === "object" ? mutate({...data, image: data.image[0]}) : mutate(data) : mutate({...data, image: data.image[0]})
  }

  function onError(errors){
    console.log(errors.message)
  }
  function handleCancel(e){
    e.preventDefault()
    isEditing ? closeEditForm(false) : closeModal(false)
  }

  if(isLoading) return (
    <StyledModal type = "spinner">
        <Spinner />
    </StyledModal>

  )

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type = {closeModal ? "modal" : "regular"}>
      <FormRow label = "Cabin name" error = {errors?.name?.message}>
        <Input type="text" id="name" disabled = {isLoading}  {...register("name", {
          required: "This field is required"
        })} />
      </FormRow>

      <FormRow label = "Maximum Capacity" error = {errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity"  disabled = {isLoading} {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: "The minimum capacity should 1"
          }
        })} />
      </FormRow>

      <FormRow label = "Regular Price" error = {errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice"  disabled = {isLoading} {...register("regularPrice", {
          required: "This field is required",
          min: {
            value: 1,
            message: "The minimum capacity should 1"
          }
        })} />
      </FormRow>

      <FormRow label = "Discount" error = {errors?.discount?.message}>
        <Input type="number" id="discount"  defaultValue= {0} disabled = {isLoading} {...register("discount", {
          required: "This field is required",
          validate: value => value < +getValues().regularPrice || "Discount should be less than the Regular price",
        })} />
      </FormRow>

      <FormRow label = "Description" error = {errors?.description?.message}>
        <Textarea type="number" id="description" disabled = {isLoading} defaultValue= "" {...register("description", {
          required: "This field is required"
        })}/>
      </FormRow>

      <FormRow label = "Image" error = {errors?.image?.message}>
        <FileInput id="image" accept="image/*"  disabled = {isLoading} {...register("image", {
          required: isEditing ? false : "This field is required"
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disable = {isLoading} onClick= {handleCancel}>
          Cancel
        </Button>
        <Button disable = {isLoading} >{isEditing ? "Edit cabin" : "Add Cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
