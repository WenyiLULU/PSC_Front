import React, { useContext, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  Group,
  Button,
  Modal,
  Input,
  NumberInput,
  Select,
  TextInput,
  MultiSelect,
} from "@mantine/core";
import { SessionContext } from "../context/SessionContext";
import { useNavigate, useParams } from "react-router-dom";

function CreatePet({ createPetModal, setCreatePetModal }) {
  // const { userId } = useParams();
  const { apiPostWithToken, userId } = useContext(SessionContext);
  const [selectValue, setSelectValue] = useState();
  const [habits, setHabits] = useState([
    "Sociable",
    "Quiet",
    "Run after other dogs",
    "Friendly to other spieces",
  ]);

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      age: 0,
      breed: "",
      img: [],
      habits: [],
      // specialNeeds: [],
      category: "",
      size: "",
    },
  });

  const createPet = async (newPet) => {
    const response = await apiPostWithToken("pet/create", newPet);
    // const response = await axios.post(`${BASE_API_URL}/pet/create`, newPet);
    console.log(">>>> Response: ", response);
  };

  const handleSubmit = (values) => {
    // console.log(">>>> user Id: ", userId);
    const data = {
      name: values.name,
      age: values.age,
      breed: values.breed,
      img: values.img,
      habits: values.habits,
      specialNeeds: values.specialNeeds,
      category: values.category,
      size: values.size,
      owner: userId,
    };
    // console.log(">>>> data: ", data);
    createPet(data);
    setCreatePetModal(false);
  };

  return (
    <Modal
      opened={createPetModal}
      onClose={() => setCreatePetModal(false)}
      title="Add a new little friend"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Pet Name"
          placeholder="Your pet's name"
          {...form.getInputProps("name")}
        />

        <NumberInput
          label="Age"
          placeholder="1"
          {...form.getInputProps("age")}
        />

        <MultiSelect
          label="Habits"
          data={habits}
          limit={5}
          placeholder="Select habits"
          {...form.getInputProps("habits")}
          searchable
          creatable
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => setHabits((current) => [...current, query])}
        />

        <Select
          value={selectValue}
          onChange={setSelectValue}
          label="Category"
          placeholder="Pick a category"
          {...form.getInputProps("category")}
          data={[
            { value: "Dog", label: "Dog" },
            { value: "Cat", label: "Cat" },
          ]}
        />

        <Select
          value={selectValue}
          onChange={setSelectValue}
          label="Size"
          placeholder="Select a size"
          {...form.getInputProps("size")}
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
    </Modal>
  );
}

export default CreatePet;
