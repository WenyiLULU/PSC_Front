import { Button, Card, Text } from "@mantine/core";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SessionContext } from "../context/SessionContext";
import { apiBase } from "../utils/reqBackEnd";
import CreateAppointment from "./CreateAppointment";

function SearchAvailResults() {
  const location = useLocation();
  const [avail, setAvail] = useState({});
  const [match, setMatch] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [appointModel, setAppointModel] = useState(false);
  const { isAuthenticated } = useContext(SessionContext);
  const { apiWithToken } = useContext(SessionContext);
  const navigate = useNavigate();

  const fetchAvail = async () => {
    const response = await apiWithToken("avail");
    setAvail(response);
  };

  useEffect(() => {
    checkMatch();
  }, [avail]);

  const checkMatch = async () => {
    const matches = await avail.filter(
      (e) =>
        Date.parse(e.endDate) >= Date.parse(location.state.endDate) &&
        Date.parse(e.startDate) <= Date.parse(location.state.startDate) &&
        location.state.actionType !== e.actionType &&
        location.state.city === e.city
    );
    console.log("Matches:", matches);
    setMatch(matches);
    setIsLoading(false);
  };

  useEffect(() => {
    
    fetchAvail();
    // checkMatch()
    
  }, []);

  // useEffect(() => {
  //     if (isAuthenticated)
  //      checkMatch()
  // }, [isAuthenticated])
  const handleCreate = (availId) => {
    let petsData = [];
    if (location.state.pets !== undefined) {
      petsData = location.state.pets;
    } else {
      const singleAvailPets = avail.filter((e) => e._id===availId);
      console.log('Single Avail to extract pet names:', singleAvailPets.pets)
      petsData = singleAvailPets[0].pets;
    }
    const data = {
      startDate: location.state.startDate,
      endDate: location.state.endDate,
      name: location.state.name,
      id: location.state.author,
      pets: petsData,
      availabiltyId: availId
    };
    console.log('reqData to confirm:' , data)
    navigate(`/result/${availId}`, { state: data });
  };

  return (
    <>
      {isLoading && <p>...Loading</p>}
      {!isLoading && (
        <>
          <div>
            <p>City: {location.state.city}</p>
            <p>Type of search: {location.state.actionType}</p>
          </div>
          <h1>Results</h1>
          {match.map((singleAvail) => (
            <div style={{ width: 300 }}>
              <Card name={singleAvail.author.username} align="center">
                <Text>
                  Start Date: {singleAvail.startDate.toString().slice(0, 10)}
                </Text>
                <Text>
                  End Date: {singleAvail.endDate.toString().slice(0, 10)}
                </Text>
                <Text weight={500} align="center">
                  {singleAvail.author.username}
                </Text>
                <Text weight={500} align="center">
                  {location.state.city}
                </Text>
                {singleAvail.pets?.length !== 0 && (
                  <Text weight={500} align="center">
                    Pets: {singleAvail.pets.map((e) => e + " ")}
                  </Text>
                )}
                {/* {location.state.pets !== undefined && (
                  <Text weight={500} align="center">
                    Pets: {location.state.pets.map((e) => e + " ")}
                  </Text>
                )} */}

                <Button
                  align="center"
                  onClick={() => handleCreate(singleAvail._id)}
                >
                  Create appointment
                </Button>
              </Card>
            </div>
          ))}

        
        </>
      )}
    </>
  );
}

export default SearchAvailResults;
