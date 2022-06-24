import { useForm } from "@mantine/form";
import {
  PasswordInput,
  Group,
  Button,
  Box,
  Input,
  TextInput,
} from "@mantine/core";

function Login() {
  const form = useForm({
    initialValues: {
      userName: "",
      password: "secret",
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
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
    </Box>
  );
}
