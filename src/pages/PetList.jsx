import React, { useEffect, useState } from "react";
import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import PetCreate from "../modals/PetCreate";
import StandardButton from "../components/StandardButton";
import { SimpleGrid } from "@mantine/core";
import PetCard from "../components/PetCard";

const PetList = () => {
  const { apiWithToken, isAuthenticated, userId } = useContext(SessionContext);
  const [createPetModal, setCreatePetModal] = useState(false);
  const [pets, setPets] = useState([]);
  console.log("pets: ", pets);
  // const [user, setUser] = useState({});
  // console.log("user: ", user);
  // const navigate = useNavigate();

  // FETCH PETS

  const fetchPets = async () => {
    try {
      const data = await apiWithToken("pet");
      console.log(">>>> Response: ", data);
      setPets(data);
    } catch (error) {
      console.log(">>> error: ", error);
      // navigate("*");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPets();
    }
  }, [isAuthenticated]);

  // FETCH USER

  // const fetchUser = async () => {
  //   try {
  //     const userInfo = await apiWithToken(`user/${userId}`);
  //     setUser(userInfo);
  //   } catch (error) {
  //     console.log("error", error);
  //     navigate("*");
  //   }
  // };

  // useEffect(() => {
  //   userId ? fetchUser() : navigate("/notauth");
  // }, [userId]);

  return (
    <div>
      <h1>Pets List</h1>
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
                  backgroundColor: "red",
                },
              }}
              key={onePet._id}
              onePet={onePet}
            />
          ))}
      </SimpleGrid>
      <StandardButton setModalOpen={setCreatePetModal}>
        Add a Pet
      </StandardButton>
      <PetCreate
        createPetModal={createPetModal}
        setCreatePetModal={setCreatePetModal}
      />
    </div>
  );
};

export default PetList;
