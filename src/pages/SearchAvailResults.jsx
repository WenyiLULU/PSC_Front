import { Button, Card, Text, Image, Center, SimpleGrid, Badge } from "@mantine/core";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { SessionContext } from "../context/SessionContext";
import loadingImg from "../assets/hamster_1.gif"
import notfoundImg from "../assets/dog_2.gif"

function SearchAvailResults() {
  const location = useLocation();
  const [avail, setAvail] = useState({});
  const [match, setMatch] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useContext(SessionContext);
  const { apiWithToken } = useContext(SessionContext);
  const navigate = useNavigate();

  const fetchAvail = async () => {
    const response = await apiWithToken("avail");
    setAvail(response);
  };

  useEffect(() => {
    if (isAuthenticated)
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
      {isLoading && <Image src={loadingImg} alt="loading ..." />}
      {!isLoading && (
        <>
          <div>
            <p>City: {location.state.city}</p>

            {/* change depending on type of search */}
            <p>Type of search: {location.state.actionType}</p>
          </div>
          <h1>Results</h1>
          {match.length === 0 && 
          <Center style={{dislay:"flex",flexDirection:"column"}}>
            <p>Sorry, no results found... Try another time or city</p>
            <Button
                component={Link}
                to={isAuthenticated ? "/user/dashboard" : "/notauth"}
              >
               Dashboard
            </Button>
            <Image src={notfoundImg} alt="not found" />
          </Center>}
          <SimpleGrid
            breakpoints={[
              { maxWidth: 2000, cols: 6, spacing: "md" },
              { maxWidth: 1750, cols: 5, spacing: "md" },
              { maxWidth: 1500, cols: 3, spacing: "md" },
              { maxWidth: 1100, cols: 2, spacing: "sm" },
              { maxWidth: 800, cols: 1, spacing: "sm" },
            ]}
          >
          {match.map((singleAvail) => (
            <div style={{ width: 300 }}>
              <Card name={singleAvail.author.username} align="center">
                
                <Badge color="red" variant="light" align="center">
                  {singleAvail.startDate.toString().slice(0, 10)} ~ {singleAvail.endDate.toString().slice(0, 10)}
                </Badge>
                
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
                {location.state.pets !== undefined && (
                  <Text weight={500} align="center">
                    Pets: {location.state.pets.map((e) => e + " ")}
                  </Text>
                )}

                <Button
                  align="center"
                  onClick={() => handleCreate(singleAvail._id)}
                >
                  Create appointment
                </Button>
              </Card>
            </div>
          ))}
          </SimpleGrid>
          

        
        </>
      )}
    </>
  );
}

export default SearchAvailResults;
