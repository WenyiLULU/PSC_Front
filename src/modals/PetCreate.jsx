import { useForm } from "@mantine/form";
import { Group, Button, Box, Input, NumberInput, Select } from "@mantine/core";

function CreatePet() {
  const form = useForm({
    initialValues: {
      petName: "",
      age: "",
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Input
          label="Pet Name"
          placeholder="Your pet's name"
          {...form.getInputProps("petName")}
        />

        <NumberInput
          label="Age"
          placeholder="1"
          {...form.getInputProps("age")}
        />
        
        <Select
          label="Type"
          placeholder="Pick a type"
          data={[
            { value: "dog", label: "Dog" },
            { value: "cat", label: "Cat" },
          ]}
        />

        <Select
          label="Size"
          placeholder="Select a size"
          data={[
            { value: "s", label: "Small" },
            { value: "m", label: "Medium" },
            { value: "l", label: "Large" },
          ]}
        />

        <Group position="right" mt="md">
          <Button type="submit">Create account</Button>
        </Group>
      </form>
    </Box>
  );
}

export default CreatePet;
