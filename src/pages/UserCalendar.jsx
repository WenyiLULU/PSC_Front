import { useContext, useEffect, useState } from "react";
import AvailabilitiesList from "./AvailabilitiesList";
import TitleBar from "../components/TitleBar";
import StandardButton from "../components/StandardButton";
import AvailabilityCreate from "../modals/AvailabilityCreate";
import SearchAvail from "../modals/SearchAvail";
import { SessionContext } from "../context/SessionContext";
import { SimpleGrid } from "@mantine/core";
import AvailCard from "../components/AvailCard";

function UserCalendar() {
  const [availModalOpen, setAvailModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [avail, setAvail] = useState([]);

  const { apiWithToken, userId, apiDeleteWithToken } =
    useContext(SessionContext);

  const fetchAvail = async () => {
    const allAvail = await apiWithToken("avail");
    console.log(">>> All avail: ", allAvail[0].author._id, userId);
    const filterAvail = allAvail.filter((avail) => avail.author._id === userId);
    console.log(">>> filtered avail: ", filterAvail);
    setAvail(filterAvail);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAvail();
  }, []);

  const deleteAvail = async (appId) => {
    try {
      await apiDeleteWithToken(`avail/${appId}`);
      console.log(">>>> deleted");
      fetchAvail();
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
