import { Button, Card, Modal, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { SessionContext } from "../context/SessionContext";

function CreateAppointment({ requestData}) {
    const {availId} = useParams()
    const form = useForm({})
    const { apiPostWithToken, apiWithToken } = useContext(SessionContext);
    const navigate = useNavigate()
    const [userData, setUserData] = useState([])

    const fetchSingleAvail = async (id) => {
      const response = await apiWithToken(`avail/${availId}`)
      console.log('Response:', response)
    }

    const createAppointment = async (newAppointment) => {
        const response = await apiPostWithToken("appointment/create", newAppointment);
        console.log("Response", response);
        // navigate(`/appointment/${response.id}`)
      };

    const handleSubmit = () => {
              const data = {city: userData.city, startDate: requestData.startDate, endDate: requestData.endDate, availabiltyId: userData._id, creator: requestData.author, participant: userData.author._id}
        createAppointment(data)
        navigate('/user/dashboard')
    }

    useEffect(() => {
      console.log('Request', requestData)
    },[])

  return (
    <>
      
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text>Type: {requestData.actionType.toUpperCase()}</Text>
        <Text>City: {requestData.city}</Text>
        <Text>From: {requestData.name}</Text>
        <Text>To: {userData.author.username}</Text>
        <Text>
          Time: {requestData.startDate.toString().slice(0,10)} TO {requestData.endDate.toString().slice(0,10)}
        </Text>
        <Button type="submit">Request Appointment</Button>
      </form>
    </>
  );
}

export default CreateAppointment;
