import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import useAuth from "./useAuth";
import SpinnerMini from "../../ui/SpinnerMini"


function LoginForm() {
  const [email, setEmail] = useState("harunbekri6@gmail.com");
  const [password, setPassword] = useState("test1234");
  const {isLogging, login} = useAuth()

  function handleSubmit(e) {
    e.preventDefault()
    if(!email || !password) return
    login({email, password})
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          disabled = {isLogging}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          disabled = {isLogging}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">{isLogging ? <SpinnerMini /> : "Login"}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
