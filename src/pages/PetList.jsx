import React, { useEffect, useState } from "react";
import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import TemporalButtonPets from "../components/TemporalButtonPets";
import PetCreate from "../modals/PetCreate";

const PetList = () => {
  const { userId, apiWithToken } = useContext(SessionContext);
  const [createPetModal, setCreatePetModal] = useState(false);

  return (
    <div>
      <h1>Pets List</h1>
      <TemporalButtonPets setCreatePetModal={setCreatePetModal} />
      <PetCreate
        createPetModal={createPetModal}
        setCreatePetModal={setCreatePetModal}
      />
    </div>
  );
};

export default PetList;
