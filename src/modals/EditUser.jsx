import { useForm } from "@mantine/form";
import {
  Group,
  Button,
  Modal,
  TextInput,
  Checkbox,
  Textarea,
  Select
} from "@mantine/core";
import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";
import { useEffect, useState } from "react";

function EditUser({ editModalOpen, setEditModalOpen, user, setUser }) {
  const { apiPutWithToken, apiWithToken } = useContext(SessionContext);
  const [selectValue, setSelectValue] = useState();
  


  const form = useForm({
    initialValues: {
      username: "",
      //email: email,
      country: "",
      city: "",
      image: "",
      owner: false,
      sitter: false,
      description: "",
      experience: "",
    },
  });

  useEffect(() => {
    if (user?.username) {
      const {
        username,
        country,
        city,
        owner,
        sitter,
        description,
        experience,
      } = user;
      form.setValues({
        username,
        country,
        city,
        owner,
        sitter,
        description,
        experience,
      });
    }
  }, [user]);


  const updateUser = async (newUserInfo) => {
    try {
      const response = await apiPutWithToken(`user/${user._id}`, newUserInfo);
      const newUser = await apiWithToken(`user/${user._id}`);
      setUser(newUser);
      if (response.status === "KO") {
        throw new Error(response.message);
      }
    } catch (error) {
      form.setErrors({ username: error.message });
    }
  };

  const handleSubmit = (values) => {
    console.log("values", values);
    updateUser(values);
    setEditModalOpen(false);
  };

  return (
    <Modal
      opened={editModalOpen}
      onClose={() => setEditModalOpen(false)}
      title="EditUser"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="Username" {...form.getInputProps("username")} />

        <TextInput label="Country" {...form.getInputProps("country")} />

        <TextInput label="City" {...form.getInputProps("city")} />
        <Checkbox
          label="I'm a pets owner"
          color="cyan"
          {...form.getInputProps("owner")}
          
        />
        <Checkbox
          label="I want to be a pet sitter"
          color="cyan"
          {...form.getInputProps("sitter")}
        />
        <Textarea label="About you" {...form.getInputProps("description")} />

        <Select
          value={selectValue}
          onChange={setSelectValue}
          label="Experience"
          placeholder="Choose your experience of taking care of pets"
          {...form.getInputProps("experience")}
          data={[
            { value: "Beginner", label: "Beginner" },
            { value: "More than 3 years", label: "More than 3 years" },
            { value: "Professional", label: "Professional" },
          ]}
        />

        <Group position="right" mt="md">
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </Modal>
  );
}

export default EditUser;
