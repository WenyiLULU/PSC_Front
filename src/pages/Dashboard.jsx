import { ActionIcon, Badge, Button, Card, Container, Group, Text } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash } from "tabler-icons-react";
import DeleteButton from "../components/DeleteButtonIcon";
import { SessionContext } from "../context/SessionContext";
import SearchAvail from "../modals/SearchAvail";

function Dashboard() {
  const [user, setUser] = useState({});
  const [appointments, setAppointments] = useState({});
  const navigate = useNavigate();
  const { userId, apiWithToken, isAuthenticated, apiDeleteWithToken } = useContext(SessionContext);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  const fetchUser = async () => {
    try {
      const userInfo = await apiWithToken(`user/${userId}`);
      setUser(userInfo);
    } catch (error) {
      console.log("error", error);
      navigate("*");
    }
  };

  const fetchAppointments = async () => {
    try {
      const userAppointments = await apiWithToken('appointment')
      const filteredAppointments = await userAppointments.filter(e => (e.creator === userId) || (e.participant.includes(userId)))
      setAppointments(filteredAppointments)
      console.log(filteredAppointments)
      setIsLoading(false)
    } catch (error) {
      console.log("error", error);
    }
  }

  const deleteAppointment = async (appId) => {
    try {
      await apiDeleteWithToken(`appointment/${appId}`);
      console.log(">>>> deleted");
      fetchAppointments()
    } catch (error) {
      console.log(">>> error: ", error);
      // navigate("*");
    }
  }

  useEffect(() => {
    userId ? fetchUser() : navigate("/notauth");
  }, [userId]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointments()
    }
  }, [])

  const handleDelete = (appId) => {
    deleteAppointment(appId)
  }

  return (
    <>
    {isLoading && <p>Loading...</p>}
    {!isLoading && <><div>
        <Button
          onClick={() => {
            setSearchModalOpen(true);
          }}
        >
          Become a pet sitter /Find a pet sitter
        </Button> 
      </div>
      <Container size='md' px='md' style={{margin:10}}>
          {appointments.map(e =>  
          <Card style={{width:250}}  shadow="sm" p="lg">
          <Card.Section align='center' >
            <Badge color="red" variant="light" align='center'>{e.startDate.slice(0,10)} - {e.endDate.slice(0,10)}</Badge>
          </Card.Section>
          <Card.Section  style={{marginBottom:5, marginTop:5}}>
            <Text align='center'>{user.username}</Text>
          </Card.Section>
          <Card.Section style={{marginBottom:5}}>
            <Text align='center'>{e.participant[0].username}</Text>
          </Card.Section>  
          <Card.Section style={{marginBottom:5}}>
            <Text align='center'>{e.city}</Text>
          </Card.Section>
          <Group position="center">
          <ActionIcon onClick={handleDelete.bind(this, e._id)} color="red" size="md" variant="filled">
          <Trash size={48} strokeWidth={2} color={"white"}/>
          </ActionIcon></Group>
          </Card>)}
      </Container>
      <SearchAvail
        searchModalOpen={searchModalOpen}
        setSearchModalOpen={setSearchModalOpen}
        user={user}
      /></>}
    </>
  );
}

export default Dashboard;
