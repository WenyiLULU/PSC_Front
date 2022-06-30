import React, { useEffect, useState } from "react";
import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import PetCreate from "../modals/PetCreate";
import StandardButton from "../components/StandardButton";
import PetCard from "../components/PetCard";
import { SimpleGrid } from "@mantine/core";
import "../App.css";
import TitleBar from "../components/TitleBar";

const PetList = () => {
  const { apiWithToken, isAuthenticated, userId } = useContext(SessionContext);
  const [createPetModal, setCreatePetModal] = useState(false);
  const [pets, setPets] = useState([]);
  const [needRefresh, setNeedRefresh] = useState(false);
  // console.log("pets: ", pets);

  // FETCH PETS

  const fetchPets = async () => {
    try {
      const data = await apiWithToken("pet");
      // console.log(">>>> Response: ", data);
      setPets(data);
    } catch (error) {
      // console.log(">>> error: ", error);
      // navigate("*");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPets();
    }
  }, [isAuthenticated, setPets]);

  useEffect(() => {
    if (needRefresh) {
      fetchPets();
      setNeedRefresh(false);
    }
  }, [needRefresh]);

  return (
    <div>
      <TitleBar
        title={"My Little Friends"}
        options={
          <StandardButton setModalOpen={setCreatePetModal}>
            Add a Pet
          </StandardButton>
        }
      />

      <PetCreate
        createPetModal={createPetModal}
        setCreatePetModal={setCreatePetModal}
        setNeedRefresh={setNeedRefresh}
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
        {pets
          .filter((onePet) => onePet.owner === userId)
          .map((onePet) => (
            <PetCard
              shadow="sm"
              p="xl"
              component={Link}
              to={`/pet/${onePet._id}`}
              sx={{
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              key={onePet._id}
              onePet={onePet}
            ></PetCard>
          ))}
      </SimpleGrid>
    </div>
  );
};

export default PetList;
