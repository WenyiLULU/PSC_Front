import {
  Button,
  Group,
  Modal,
  MultiSelect,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext, useEffect, useState } from "react";
import { SessionContext } from "../context/SessionContext";

function PetUpdate({ modalOpen, setModalOpen, pet, setPet }) {
  const { apiPutWithToken, apiWithToken } = useContext(SessionContext);
  const [selectValue, setSelectValue] = useState();
  const [habits, setHabits] = useState([
    "Sociable",
    "Quiet",
    "Run after other dogs",
    "Friendly to other spieces",
  ]);

  const [needs, setNeeds] = useState([
    "Lactose-free milk",
    "Extra excercise",
    "Less exercise",
    "Have the leash all the time",
  ]);

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

  useEffect(() => {
    if (pet?.name) {
      const { name, age, breed, img, habits, specialNeeds, category, size } =
        pet;
      form.setValues({
        name,
        age,
        breed,
        img,
        habits,
        // specialNeeds,
        category,
        size,
      });
    }
  }, [pet]);

  const updatePet = async (newPetInfo) => {
    try {
      const response = await apiPutWithToken(`pet/${pet._id}`, newPetInfo);
      const newPet = await apiWithToken(`pet/${pet._id}`);
      setPet(newPet);
      if (response.status === "KO") {
        throw new Error(response.message);
      }
    } catch (error) {
      form.setErrors({ name: error.message });
    }
  };

  const handleSubmit = (values) => {
    console.log(values);
    updatePet(values);
    setModalOpen(false);
  };

  return (
    <Modal
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
      title="Update Info"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="Pet Name" {...form.getInputProps("name")} />

        <NumberInput label="Age" {...form.getInputProps("age")} />

        <TextInput label="Breed" {...form.getInputProps("breed")} />

        <p>Placeholder for Image</p>

        <MultiSelect
          label="Habits"
          data={habits}
          limit={5}
          {...form.getInputProps("habits")}
          searchable
          creatable
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => setHabits((current) => [...current, query])}
        />

        <MultiSelect
          label="Special Needs"
          data={needs}
          limit={5}
          {...form.getInputProps("specialNeeds")}
          searchable
          creatable
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => setNeeds((current) => [...current, query])}
        />

        <Select
          value={selectValue}
          onChange={setSelectValue}
          label="Category"
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
          {...form.getInputProps("size")}
          data={[
            { value: "s", label: "Small" },
            { value: "m", label: "Medium" },
            { value: "l", label: "Large" },
          ]}
        />

        <Group position="right" mt="md">
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </Modal>
  );
}

export default PetUpdate;
