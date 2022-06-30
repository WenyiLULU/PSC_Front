import React, { useEffect, useState } from "react";
import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";
import { Card, Container, SimpleGrid, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import AvailCard from "../components/AvailCard";

function AvailabilitiesList() {
  const [avail, setAvail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { apiWithToken, isAuthenticated, userId, apiDeleteWithToken } =
    useContext(SessionContext);

  const fetchAvail = async () => {
    const allAvail = await apiWithToken("avail");
    const filterAvail = await allAvail.filter((e) => e.author._id === userId);
    console.log(">>> get filtered availabilites: ", filterAvail);
    setAvail(filterAvail);
    setIsLoading(false);
  };

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

  useEffect(() => {
    if (isAuthenticated) {
      fetchAvail();
    }
  }, []);

  const handleDelete = (appId) => {
    deleteAvail(appId);
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
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
      )}
    </>
  );
}

export default AvailabilitiesList;
