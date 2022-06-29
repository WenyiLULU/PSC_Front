import { Button } from "@mantine/core";
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
      console.log(filteredAppointments)
      setAppointments(filteredAppointments)
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
      <div>
        <Button
          onClick={() => {
            setSearchModalOpen(true);
          }}
        >
          Become a pet sitter /Find a pet sitter
        </Button>
      </div>
      <SearchAvail
        searchModalOpen={searchModalOpen}
        setSearchModalOpen={setSearchModalOpen}
        user={user}
      />
    </>
  );
}

export default Dashboard;
