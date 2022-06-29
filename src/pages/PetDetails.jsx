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
  const [isLoading, setIsLoading] = useState(true);

  const fetchPet = async () => {
    try {
      const data = await apiWithToken(`pet/${petId}`);
      //   console.log(">>>> Response: ", data);
      console.log(data.habits);
      setPet(data);
      setIsLoading(false);
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

  const sizeText = () => {
    if (size === "s") {
      return <span>Small</span>;
    } else if (size === "m") {
      return <span>Medium</span>;
    } else if (size === "l") {
      return <span>Large</span>;
    }
  };

  const handleDelete = () => {
    deletePet();
  };

  return (
    <>
      {isLoading && <p>...Loading</p>}
      {!isLoading && (
        <>
          <div>
            <h1>{name}</h1>
            <p>Age: {age}</p>
            <p>Habits:</p>
            <ul>
              {habits.map((element, index) => (
                <li key={index}>{element}</li>
              ))}
            </ul>
            <p>Special Needs: </p>
            <ul>
              {specialNeeds.map((element, index) => (
                <li key={index}>{element}</li>
              ))}
            </ul>
            <p>Category: {category}</p>
            <p>Size: {sizeText()}</p>

            <DeleteButton handleDelete={handleDelete} />
            <StandardButton setModalOpen={setEditModalOpen}>
              Edit Info
            </StandardButton>
            <PetUpdate
              modalOpen={editModalOpen}
              setModalOpen={setEditModalOpen}
              pet={pet}
              setPet={setPet}
            />
          </div>
        </>
      )}
    </>
  );
};

export default PetDetails;
