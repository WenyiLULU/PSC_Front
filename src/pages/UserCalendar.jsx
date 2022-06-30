import { useContext, useEffect, useState } from "react";
import AvailabilitiesList from "./AvailabilitiesList";
import TitleBar from "../components/TitleBar";
import StandardButton from "../components/StandardButton";
import AvailabilityCreate from "../modals/AvailabilityCreate";
import SearchAvail from "../modals/SearchAvail";
import { SessionContext } from "../context/SessionContext";
import { PetContext } from "../context/PetContext";

function UserCalendar() {
  const [availModalOpen, setAvailModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [avail, setAvail] = useState([]);
  const [userPets, setUserPets] = useState([])

  const { pets } = useContext(PetContext)
  const { apiWithToken, userId } = useContext(SessionContext);

  const {name} = userPets

  const fetchAvail = async () => {
    const petsData = await pets.filter(e=> e.owner === userId)
    console.log('Your pets:' ,petsData) 
    setUserPets(petsData)
    const allAvail = await apiWithToken("avail");
    const filterAvail = await allAvail.filter((e) => e.author._id === userId);
    console.log(filterAvail);
    await setAvail(filterAvail);
    console.log('User Pets:', userPets)
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAvail();
  }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}
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
          <AvailabilitiesList />
          <AvailabilityCreate
            availModalOpen={availModalOpen}
            setAvailModalOpen={setAvailModalOpen}
            userPets={userPets}
            setUserPets={setUserPets}
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
