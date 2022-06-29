import { Button, Card, Container, Text } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../context/SessionContext";
import SearchAvail from "../modals/SearchAvail";

function Dashboard() {
  const [user, setUser] = useState({});
  const [appointments, setAppointments] = useState({});
  const navigate = useNavigate();
  const { userId, apiWithToken, isAuthenticated } = useContext(SessionContext);
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

  useEffect(() => {
    userId ? fetchUser() : navigate("/notauth");
  }, [userId]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointments()
    }
  }, [])

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
      <Container size='md' px='md'>
          {appointments.map(e =>  
          <Card style={{width:250}}  shadow="sm" p="lg">
          <Card.Section>
            <Text align='center'>{e.startDate.slice(0,10)} - {e.endDate.slice(0,10)}</Text>
          </Card.Section>
          <Card.Section>
            <Text align='center'>{user.username}</Text>
          </Card.Section>  
          <Card.Section>
            <Text align='center'>{e.participant[0].username}</Text>
          </Card.Section>  
            
            
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
