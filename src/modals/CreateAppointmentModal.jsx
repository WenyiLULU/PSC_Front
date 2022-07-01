import { Button, Group, Modal, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { SessionContext } from "../context/SessionContext";

function CreateAppointment({ userData, requestData, appointModel, setAppointModel }) {
    const form = useForm({})
    const { apiPostWithToken } = useContext(SessionContext);
    const navigate = useNavigate()

    const createAppointment = async (newAppointment) => {
        const response = await apiPostWithToken("appointment/create", newAppointment);
        console.log("Response", response);
        // navigate(`/appointment/${response.id}`)
      };

    const handleSubmit = () => {
              const data = {city: userData.city, startDate: requestData.startDate, endDate: requestData.endDate, availabiltyId: userData._id, creator: requestData.author, participant: userData.author._id}
        setAppointModel(false)
        createAppointment(data)
        navigate('/user/dashboard')
    }

    useEffect(() => {
      console.log('User:', userData)
      console.log('Request', requestData)
    },[])

  return (
    <>
      <Modal
        opened={appointModel}
        onClose={() => setAppointModel(false)}
        title="Request an appointment for a pet sitter / a pet sitting offer"
      >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text>Type: {requestData.actionType.toUpperCase()}</Text>
        <Text>City: {requestData.city}</Text>
        <Text>From: {requestData.name}</Text>
        <Text>To: {userData.author.username}</Text>
        <Text>
          Time: {requestData.startDate.toString().slice(0,10)} TO {requestData.endDate.toString().slice(0,10)}
        </Text>
        <Group position="right" mt="md">
          <Button type="submit">Request Appointment</Button>
        </Group>
        
      </form>
      </Modal>
    </>
  );
}

export default CreateAppointment;
