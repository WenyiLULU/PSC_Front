import React, { useContext, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  Group,
  Button,
  Modal,
  Input,
  NumberInput,
  Select,
} from "@mantine/core";
import { SessionContext } from "../context/SessionContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL } from "../utils/constants";

function CreatePet({ createPetModal, setCreatePetModal }) {
  const navigate = useNavigate();
  const { apiWithToken, apiTokenPost, userId } = useContext(SessionContext);

  const form = useForm({
    initialValues: {
      name: "",
      age: 0,
      category: "",
      size: "",
    },
  });

  const createPet = async (newPet) => {
    const petWithOwner = { ...newPet, userId };
    console.log(petWithOwner);
    const response = await apiTokenPost("pet/create", "POST", petWithOwner);
    // const response = await axios.post(`${BASE_API_URL}/pet/create`, newPet);
    return response;
  };

  const handleSubmit = (values) => {
    createPet(values);
  };

  return (
    <Modal
      opened={createPetModal}
      onClose={() => setCreatePetModal(false)}
      title="Add a new little friend"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Input
          label="Pet Name"
          placeholder="Your pet's name"
          {...form.getInputProps("name")}
        />

        <NumberInput
          label="Age"
          placeholder="1"
          {...form.getInputProps("age")}
        />

        <Select
          label="Category"
          placeholder="Pick a category"
          {...form.getInputProps("category")}
          data={[
            { value: "dog", label: "Dog" },
            { value: "cat", label: "Cat" },
          ]}
        />

        <Select
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
