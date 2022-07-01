import { Button, Text, Card, Center,Space, Badge } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { PetContext } from "../context/PetContext";
import { SessionContext } from "../context/SessionContext";

function CreateAppointment({ requestData }) {
  const location = useLocation();
  const { availId } = useParams();
  const form = useForm({});
  const { apiPostWithToken, apiWithToken } = useContext(SessionContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const {pets}= useContext(PetContext)

  const fetchSingleAvail = async (id) => {
    const response = await apiWithToken(`avail/${id}`);
    console.log("Response:", response);
    await setUserData(response);
    setIsLoading(false);
  };

  const createAppointment = async (newAppointment) => {
    const response = await apiPostWithToken(
      "appointment/create",
      newAppointment
    );
    console.log("Response", response);
    // navigate(`/appointment/${response.id}`)
  };

  const handleSubmit = () => {
    let filterPets =[]
    for (let i=0;i<location.state.pets.length;i+=1) {
      filterPets.push(pets.filter(e => e.name===location.state.pets[i]))
      }
    const petsData = filterPets.map(e => e.map(subE => subE._id))
    console.log('PetIDs:' , petsData)
    const data = {
      city: userData.city,
      startDate: location.state.startDate,
      endDate: location.state.endDate,
      availabiltyId: userData._id,
      creator: userData.author._id,
      participant: location.state.id,
      pets: petsData
    };
    console.log(data);
    createAppointment(data);
    navigate("/user/dashboard");
  };

  useEffect(() => {
    console.log("reqData:", location.state.name);
    fetchSingleAvail(availId);
    console.log("userData", userData);
  }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <Center >
          <Card style={{width:300}}  align='center'>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Text><strong>Type:</strong> {userData.actionType.toUpperCase()}</Text>
          <Space h="md" />
          <Text><strong>City:</strong> {userData.city}</Text>
          <Space h="md" />
          <Text><strong>From:</strong> {userData.author.username}</Text>
          <Space h="md" />
          <Text><strong>To:</strong> {location.state.name}</Text>
          <Space h="md" />
          <Badge color="red" variant="light" align="center">
          {location.state.startDate.toString().slice(0, 10)} ~ {" "}
            {location.state.endDate.toString().slice(0, 10)}
          </Badge>
          <Space h="md" />
          <Button type="submit">Request Appointment</Button>
        </form>
        </Card>
        </Center>
        
        
      )}
    </>
  );
}

export default CreateAppointment;
