import { useContext, useEffect, useState } from "react";
import TitleBar from "../components/TitleBar";
import StandardButton from "../components/StandardButton";
import AvailabilityCreate from "../modals/AvailabilityCreate";
import SearchAvail from "../modals/SearchAvail";
import { SessionContext } from "../context/SessionContext";
import { PetContext } from "../context/PetContext";
import { SimpleGrid, Image } from "@mantine/core";
import AvailCard from "../components/AvailCard";
import { useNavigate } from "react-router-dom";
import loadingImg from "../assets/hamster_1.gif"

function UserCalendar() {
  const [availModalOpen, setAvailModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [avail, setAvail] = useState([]);
  const [userPets, setUserPets] = useState([]);

  const { pets } = useContext(PetContext);
  const { apiWithToken, userId, apiDeleteWithToken } =
    useContext(SessionContext);
  const navigate = useNavigate();
  const [needRefresh, setNeedRefresh] = useState(false);


  const fetchAvail = async () => {
    const petsData = await pets.filter((e) => e.owner === userId);
    console.log("Your pets:", petsData);
    setUserPets(petsData);
    const allAvail = await apiWithToken("avail");
    console.log(">>> All avail: ", allAvail[0].author._id, userId);
    const filterAvail = allAvail.filter((avail) => avail.author._id === userId);
    console.log(">>> filtered avail: ", filterAvail);
    setAvail(filterAvail);
    setIsLoading(false);
  };

  const fetchUser = async () => {
    try {
      const userInfo = await apiWithToken(`user/${userId}`);
      setUser(userInfo);
    } catch (error) {
      console.log("error", error);
      navigate("*");
    }
  };

  useEffect(() => {
    fetchAvail();
    fetchUser();
  }, []);

  useEffect(() => {
    if (needRefresh) {
      fetchAvail();
      setNeedRefresh(false);
    }
  }, [needRefresh]);

  const deleteAvail = async (appId) => {
    try {
      await apiDeleteWithToken(`avail/${appId}`);
      console.log(">>>> deleted");
      navigate(`/user/calendar/${userId}`);
      fetchAvail();
      // setNeedRefresh = { setNeedRefresh };
    } catch (error) {
      console.log(">>> error: ", error);
      // navigate("*");
    }
  };

  const handleDelete = (appId) => {
    deleteAvail(appId);
  };

  return (
    <>
      {isLoading && <Image src={loadingImg} alt="loading ..." />}
      {!isLoading && (
        <>
          <TitleBar
            title={"My Calendar"}
            options={
              <>
                <StandardButton setModalOpen={setAvailModalOpen}>
                  Add Availabilty
                </StandardButton>
                <StandardButton setModalOpen={setSearchModalOpen}>
                  New Appointment
                </StandardButton>
              </>
            }
          />
          <SimpleGrid
            breakpoints={[
              { maxWidth: 2000, cols: 6, spacing: "md" },
              { maxWidth: 1750, cols: 5, spacing: "md" },
              { maxWidth: 1500, cols: 3, spacing: "md" },
              { maxWidth: 1100, cols: 2, spacing: "sm" },
              { maxWidth: 800, cols: 1, spacing: "sm" },
            ]}
          >
            {avail.map((oneAvail, index) => (
              <>
                <AvailCard
                  oneAvail={oneAvail}
                  key={oneAvail._id}
                  handleDelete={handleDelete}
                />
              </>
            ))}
          </SimpleGrid>
          <AvailabilityCreate
            availModalOpen={availModalOpen}
            setAvailModalOpen={setAvailModalOpen}
            userPets={userPets}
            setUserPets={setUserPets}
            setNeedRefresh={setNeedRefresh}
          />
          <SearchAvail
            searchModalOpen={searchModalOpen}
            setSearchModalOpen={setSearchModalOpen}
            user={user}
            userPets={userPets}
            setUserPets={setUserPets}
          />
          {/* <Button component={NavLink} to="/user/avail">
        Edit availabilities
      </Button> */}
        </>
      )}
    </>
  );
}

export default UserCalendar;
