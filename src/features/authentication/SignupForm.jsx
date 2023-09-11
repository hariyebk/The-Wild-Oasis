import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignup from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {isCreatingUser, signup} = useSignup()
  const {register, formState, handleSubmit, getValues, reset} = useForm()
  const {errors} = formState
  
  function onSubmit({fullName, email, password}){
    signup({fullName, email, password}, {
      onSettled: () => reset()
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error = {errors?.fullName?.message}>
        <Input type="text" id="fullName" disabled = {isCreatingUser} {...register("fullName", {
          required: "full name is a required"
        })} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email" disabled = {isCreatingUser} {...register("email", {
          required: "email is a required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid email address"
          }
        })}  />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password" disabled = {isCreatingUser} {...register("password", {
          required: "password is a required",
          minLength: {
            value: 8,
            message: "password must be at least 8 characters"
          }
        })} />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" disabled = {isCreatingUser} {...register("passwordConfirm", {
          required: "Repeat password is a required",
          validate: (value) => value === getValues().password || "passwords need to match"
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={reset}>
          Cancel
        </Button>
        <Button disabled = {isCreatingUser}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm
