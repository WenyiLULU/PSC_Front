import { Button, Card, Modal, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { SessionContext } from "../context/SessionContext";

function CreateAppointment({ requestData}) {
    const location = useLocation();
    const {availId} = useParams()
    const form = useForm({})
    const { apiPostWithToken, user, apiWithToken } = useContext(SessionContext);
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState([])

    const fetchSingleAvail = async (id) => {
      const response = await apiWithToken(`avail/${id}`)
      console.log('Response:', response)
      await setUserData(response)
      setIsLoading(false)
      
    }

    const createAppointment = async (newAppointment) => {
        const response = await apiPostWithToken("appointment/create", newAppointment);
        console.log("Response", response);
        // navigate(`/appointment/${response.id}`)
      };

    const handleSubmit = () => {
              const data = {city: userData.city, startDate: location.state.startDate, endDate: location.state.endDate, availabiltyId: userData._id, creator: userData.author._id, participant: location.state.id}
              console.log(data)
        createAppointment(data)
        navigate('/user/dashboard')
    }

    useEffect(() => {
      console.log('reqData:', location.state.id)
      fetchSingleAvail(availId)
      console.log('userData', userData)
      
      
    },[])

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading &&  <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text>Type: {userData.actionType.toUpperCase()}</Text>
        <Text>City: {userData.city}</Text>
        <Text>From: {userData.author.username}</Text>
        <Text>To: {location.state.name}</Text>
        <Text>
          Time: {location.state.startDate.toString().slice(0,10)} TO {location.state.endDate.toString().slice(0,10)}
        </Text>
        <Button type="submit">Request Appointment</Button>
      </form>
      
      }
     
    </>
  );
}

export default CreateAppointment;
