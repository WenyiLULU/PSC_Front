import { useForm } from "@mantine/form";
import {
  PasswordInput,
  Group,
  Button,
  TextInput,
  Modal
} from "@mantine/core";
import { useContext } from "react";
import { logIn } from "../utils/reqBackEnd";
import { SessionContext } from "../context/SessionContext"
import { Link, Navigate } from "react-router-dom"
import SignupButton from "../components/SignupButton";
import Signup from "./Signup";



function Login({ loginModalOpen, setLoginModalOpen, signupModalOpen, setSignupModalOpen }) {
  const { authenticateUser } = useContext(SessionContext)
    
  const form = useForm({
    initialValues: {
      userName: "",
      password: "secret",
    },
  });

  const logUser = async credentials => {
    try {
      const response = await logIn(credentials)
      console.log(response)
      if (response.status === 'KO') {
        throw new Error(response.message)
      } else {
        authenticateUser(response.token)
        Navigate('/user/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (values) => {
    logUser(values);
  };

  return (
    <Modal opened={loginModalOpen} onClose={() => setLoginModalOpen(false)} title='Login'>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Username"
          placeholder="Your Username"
          {...form.getInputProps("username")}
        />

        <PasswordInput
          required
          label="Password"
          placeholder="Your Password"
          {...form.getInputProps("password")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Login</Button>
        </Group>
      </form>
      <p>Don't have an account yet?</p>
      <SignupButton 
        setSignupModalOpen={setSignupModalOpen} 
        setLoginModalOpen={setLoginModalOpen}/>
      
      </Modal>
  );
}

export default Login