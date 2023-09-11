import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useAuthorization from "./useAuthorization";
import useUpdateUser from "./useUpdateUser";

function UpdateUserDataForm() {
  const {data} = useAuthorization()
  const {isUpdating, updateuser} = useUpdateUser()
  const currentFullName = data.user.user_metadata.fullName
  const email = data.user.email
  const [fullName, setFullName] = useState(currentFullName || "");
  const [avatar, setAvatar] = useState(null);

  

  function handleSubmit(e) {
    e.preventDefault();
    if(!fullName) return 
    updateuser({fullName, avatar}, {onSuccess: () => {
          setAvatar(null)
          // to clear out the name of the file choosen after it has been uploaded
          e.target.reset()
    }})
  }
  
  function handleCancel (){
    setFullName(currentFullName)
    setAvatar(null)
  }


  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled = {isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" onClick={handleCancel} variation="secondary" disabled = {isUpdating}>
          Cancel
        </Button>
        <Button disabled = {isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
