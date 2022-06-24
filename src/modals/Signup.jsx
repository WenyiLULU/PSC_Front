import { useForm } from "@mantine/form";
import { PasswordInput, Group, Button, Box, Input } from "@mantine/core";

function Signup() {
  const form = useForm({
    initialValues: {
      userName: "",
      email: "",
      password: "secret",
      confirmPassword: "sevret",
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Input
          label="Username"
          placeholder="Your username"
          {...form.getInputProps("userName")}
        />

        <Input 
            label="Email"
            placeholder="email@internet.org"
            {...form.getInputProps("email")}
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
    </Box>
  );
}


export default Signup