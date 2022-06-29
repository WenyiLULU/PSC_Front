import { Button, Card, Modal, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { SessionContext } from "../context/SessionContext";

function CreateAppointment({ user, request, appointModel, setAppointModel }) {
    const form = useForm({})
    const { apiPostWithToken } = useContext(SessionContext);
    const navigate = useNavigate()

    const createAppointment = async (newAppointment) => {
        const response = await apiPostWithToken("appointment/create", newAppointment);
        console.log("Response", response);
        // navigate(`/appointment/${response.id}`)
      };

    const handleSubmit = () => {
        console.log(request)
        const data = {city: request.city, startDate: request.startDate, endDate: request.endDate, availabiltyId: user._id, creator: request.author, participant: user.author._id}
        setAppointModel(false)
        createAppointment(data)
        navigate('/user/dashboard')
    }

  return (
    <>
      <Modal
        opened={appointModel}
        onClose={() => setAppointModel(false)}
        title="Request an appointment for a pet sitter / a pet sitting offer"
      >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text>Type: {request.actionType.toUpperCase()}</Text>
        <Text>City: {request.city}</Text>
        <Text>From: {request.name}</Text>
        <Text>To: {user.author.username}</Text>
        <Text>
          Time: {request.startDate.toString().slice(0,10)} TO {request.endDate.toString().slice(0,10)}
        </Text>
        <Button type="submit">Request Appointment</Button>
      </form>
      </Modal>
    </>
  );
}

export default CreateAppointment;
