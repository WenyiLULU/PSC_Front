import { useForm } from "@mantine/form";
import { PasswordInput, Group, Button, Modal, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../context/SessionContext"
import { useContext, useState } from "react";
import { signUp, logIn } from "../utils/reqBackEnd";
import { useEffect } from "react";

function Signup({ signupModalOpen, setSignupModalOpen }) {
    const { authenticateUser } = useContext(SessionContext)
    const [ userCreated, setUserCreated] = useState(false)
    const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "secret",
      confirmPassword: "secret",
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const createUser = async newUser => {
    try {
      const response = await signUp(newUser)

      if (response.status === 'KO') {
        throw new Error(response.message)
      }
      if (response.status ==="OK"){
        setUserCreated(true)
      }
      //navigate('/user/dashboard')
    } catch (error) {
      form.setErrors({ username: error.message })
    }
  }

  const logUser = async credentials => {
    try {
      const response = await logIn(credentials)
      console.log("response", response)
      if (response.status === 'KO') {
        throw new Error(response.message)
      } else {
        authenticateUser(response.token)
        navigate('/user/dashboard')
      }
    } catch (error) {
      
      const errorStatus = error.response.status
      const message = error.response.data.message
      switch (errorStatus) {
        case 404:
          form.setErrors({email: message})
          break;
        case 403:
          form.setErrors({password: message})
          break;
        default:
          console.log("error", error)
          break;
      }
    }
  }

  const handleSubmit = async (values) => {
    await createUser(values)
    setSignupModalOpen(false)
    logUser({email: values.email, password:values.password})
  }
  useEffect(()=>{
    setUserCreated(false)
  }, [])
  

  return (
    <Modal opened={signupModalOpen} onClose={() => setSignupModalOpen(false)} title='Signup'>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Username"
          placeholder="Your username"
          {...form.getInputProps("username")}
        />

        <TextInput 
            label="Email"
            placeholder="email@internet.org"
            {...form.getInputProps("email")}
        />

        <TextInput
            label="Country"
            placeholder=""
            {...form.getInputProps("country")}
        />

        <TextInput
            label="City"
            placeholder=""
            {...form.getInputProps("city")}
        />

        <PasswordInput
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />

        <PasswordInput
          mt="sm"
          label="Confirm password"
          placeholder="Confirm password"
          {...form.getInputProps("confirmPassword")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Create account</Button>
        </Group>
      </form>
    </Modal>
  );
}


export default Signup