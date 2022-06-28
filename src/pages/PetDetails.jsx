import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../components/DeleteButtonIcon";
import PetUpdate from "../modals/PetUpdate";
import StandardButton from "../components/StandardButton";
import { SessionContext } from "../context/SessionContext";

const PetDetails = () => {
  const { apiWithToken, isAuthenticated, apiDeleteWithToken } =
    useContext(SessionContext);
  const [pet, setPet] = useState({});
  const { petId } = useParams();
  //   console.log(">>>> petId: ", petId);
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const fetchPet = async () => {
    try {
      const data = await apiWithToken(`pet/${petId}`);
      //   console.log(">>>> Response: ", data);
      console.log(data.habits);
      setPet(data);
    } catch (error) {
      console.log(">>> error: ", error);
      // navigate("*");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPet();
    }
  }, [isAuthenticated]);

  const { name, age, breed, img, habits, specialNeeds, category, size } = pet;

  const deletePet = async () => {
    try {
      await apiDeleteWithToken(`pet/${petId}`);
      console.log(">>>> deleted");
      navigate("/user/pets");
    } catch (error) {
      console.log(">>> error: ", error);
      // navigate("*");
    }
  };

  const handleDelete = () => {
    deletePet();
  };

  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      <p>Habits:</p>
      {/* <ul>
        {habits.map((element) => (
          <li>{element}</li>
        ))}
      </ul> */}
      <p>Special Needs: {specialNeeds}</p>
      <p>Category: {category}</p>
      <p>Size: {size}</p>

      <DeleteButton handleDelete={handleDelete} />
      <StandardButton setModalOpen={setEditModalOpen}>Edit Info</StandardButton>
      <PetUpdate
        modalOpen={editModalOpen}
        setModalOpen={setEditModalOpen}
        pet={pet}
        setPet={setPet}
      />
    </div>
  );
};

export default PetDetails;
