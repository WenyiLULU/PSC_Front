import { useForm } from "@mantine/form";
import { PasswordInput, Group, Button, Box, Input, Modal, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { signUp } from "../utils/reqBackEnd";

function Signup({ signupModalOpen, setSignupModalOpen }) {
    const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      userName: "",
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

      navigate('/user/dashboard')
    } catch (error) {
      form.setErrors({ username: error.message })
    }
  }

  const handleSubmit = (values) => {
    createUser(values)
  }

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