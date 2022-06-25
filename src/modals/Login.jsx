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
import { useNavigate } from "react-router-dom"
import SignupButton from "../components/SignupButton";



function Login({ loginModalOpen, setLoginModalOpen, setSignupModalOpen }) {
  const { authenticateUser } = useContext(SessionContext)
  const navigate = useNavigate()
    
  const form = useForm({
    initialValues: {
      email: "",
      password: "secret",
    },
  });

  const logUser = async credentials => {
    try {
      const response = await logIn(credentials)
      
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

  const handleSubmit = (values) => {
    logUser(values);
  };

  return (
    <Modal opened={loginModalOpen} onClose={() => setLoginModalOpen(false)} title='Login'>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Email"
          placeholder="Your E-Mail"
          {...form.getInputProps("email")}
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