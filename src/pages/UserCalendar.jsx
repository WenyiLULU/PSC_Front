import { useContext, useEffect, useState } from "react";
import AvailabilitiesList from "./AvailabilitiesList";
import TitleBar from "../components/TitleBar";
import StandardButton from "../components/StandardButton";
import AvailabilityCreate from "../modals/AvailabilityCreate";
import SearchAvail from "../modals/SearchAvail";
import { SessionContext } from "../context/SessionContext";

function UserCalendar() {
  const [availModalOpen, setAvailModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [avail, setAvail] = useState([]);

  const { apiWithToken, userId } = useContext(SessionContext);

  const fetchAvail = async () => {
    const allAvail = await apiWithToken("avail");
    const filterAvail = await allAvail.filter((e) => e.author._id === userId);
    console.log(filterAvail);
    setAvail(filterAvail);
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
          />
          <SearchAvail
            searchModalOpen={searchModalOpen}
            setSearchModalOpen={setSearchModalOpen}
            user={user}
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
