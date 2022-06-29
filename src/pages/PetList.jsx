import React, { useEffect, useState } from "react";
import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import PetCreate from "../modals/PetCreate";
import StandardButton from "../components/StandardButton";
import PetCard from "../components/PetCard";
import { Card, SimpleGrid } from "@mantine/core";
import "../App.css";

const PetList = () => {
  const { apiWithToken, isAuthenticated, userId } = useContext(SessionContext);
  const [createPetModal, setCreatePetModal] = useState(false);
  const [pets, setPets] = useState([]);
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
  }, [isAuthenticated]);

  return (
    <div>
      <div className="titleBar">
        <h1>My little friends</h1>
        <StandardButton setModalOpen={setCreatePetModal}>
          Add a Pet
        </StandardButton>
        <PetCreate
          createPetModal={createPetModal}
          setCreatePetModal={setCreatePetModal}
        />
      </div>
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
            <PetCard shadow="sm"
              p="xl"
              component={Link}
              to={`/pet/${onePet._id}`}
              sx={{
                "&:hover": {
                  backgroundColor: "red",
                },
              }}
              key={onePet._id}
              onePet={onePet}> 
            </PetCard>
              
            
          ))}
      </SimpleGrid>
    </div>
  );
};

export default PetList;
