import { useForm } from "@mantine/form";
import { Group, Button, Box, Input, NumberInput } from "@mantine/core";

function CreatePet() {
  const form = useForm({
    initialValues: {
      petName: "",
      age: "",
      
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

        <NumberInput 
            label="Age"
            placeholder="1"
            {...form.getInputProps("age")}
        />

        

        <Group position="right" mt="md">
          <Button type="submit">Create account</Button>
        </Group>
      </form>
    </Box>
  );
}


export default CreatePet