import { Button, SimpleGrid } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentCard from "../components/AppointmentCard";
import TitleBar from "../components/TitleBar";
import { SessionContext } from "../context/SessionContext";
import SearchAvail from "../modals/SearchAvail";

function Dashboard() {
  const [user, setUser] = useState({});
  const [appointments, setAppointments] = useState({});
  const navigate = useNavigate();
  const { userId, apiWithToken, isAuthenticated, apiDeleteWithToken } =
    useContext(SessionContext);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const userInfo = await apiWithToken(`user/${userId}`);
      setUser(userInfo);
    } catch (error) {
      console.log("error", error);
      navigate("*");
    }
  };
  //
  const fetchAppointments = async () => {
    try {
      const userAppointments = await apiWithToken("appointment");
      // console.log(userAppointments);
      const filteredAppointments = userAppointments.filter(
        (e) =>
          e.creator._id === userId ||
          e.participant.some((part) => part._id === userId)
      );
      setAppointments(filteredAppointments);
      console.log(">>>> Filtered Appointments: ", filteredAppointments);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteAppointment = async (appId) => {
    try {
      await apiDeleteWithToken(`appointment/${appId}`);
      console.log(">>>> deleted");
      fetchAppointments();
    } catch (error) {
      console.log(">>> error: ", error);
      // navigate("*");
    }
  };

  useEffect(() => {
    userId ? fetchUser() : navigate("/notauth");
  }, [userId]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointments();
    }
  }, []);

  const handleDelete = (appId) => {
    deleteAppointment(appId);
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <>
          <TitleBar
            title={"Dashboard"}
            options={
              <Button
                radius="lg"
                size="xs"
                variant="outline"
                color="#7FC9CD"
                style={{
                  background: "#e0f5eb",
                  boxShadow: "2px 2px #302e36",
                  margin: "0 10px",
                }}
                sx={() => ({
                  height: "40px",
                  width: "150px",
                  margin: "0 10px",
                  "@media (max-width: 400px)": {
                    height: "30px",
                    width: "150px",
                    margin: "0 5px",
                  },
                })}
                onClick={() => {
                  setSearchModalOpen(true);
                }}
              >
                New Appointment
              </Button>
            }
          />
          <SimpleGrid
            breakpoints={[
              { maxWidth: 2500, cols: 3, spacing: "md" },
              { maxWidth: 1499, cols: 2, spacing: "sm" },
              { maxWidth: 1000, cols: 1, spacing: "sm" },
            ]}
          >
            {appointments.map((e, eIndex) => (
              <AppointmentCard
                key={eIndex}
                eIndex={eIndex}
                e={e}
                user={user}
                handleDelete={handleDelete}
              />
            ))}
          </SimpleGrid>
          <SearchAvail
            searchModalOpen={searchModalOpen}
            setSearchModalOpen={setSearchModalOpen}
            user={user}
          />
        </>
      )}
    </>
  );
}

export default Dashboard;
