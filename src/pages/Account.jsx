import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm"

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading> &nbsp;
        <Heading as="h2">Update user data</Heading>
        <UpdateUserDataForm />
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
    </>
  );
}

export default Account;
