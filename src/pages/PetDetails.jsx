import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteButton from "../components/DeleteButtonIcon";
import PetUpdate from "../modals/PetUpdate";
import StandardButton from "../components/StandardButton";
import { SessionContext } from "../context/SessionContext";
import ImageDropzonePets from "../modals/ImageDropzonePets";
import { Badge, Button, Image, SimpleGrid } from "@mantine/core";
import TitleBar from "../components/TitleBar";

const PetDetails = () => {
  const { apiWithToken, isAuthenticated, apiDeleteWithToken } =
    useContext(SessionContext);
  const [pet, setPet] = useState({});
  const { petId } = useParams();
  //   console.log(">>>> petId: ", petId);
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dropModalOpen, setDropModalOpen] = useState(false);
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
            <TitleBar
              title={name}
              options={
                <>
                  <StandardButton setModalOpen={setEditModalOpen}>
                    Edit Info
                  </StandardButton>
                  <StandardButton setModalOpen={setDropModalOpen}>
                    Add photos
                  </StandardButton>
                  <DeleteButton handleDelete={handleDelete} />
                </>
              }
            />
            <p>Age: {age}</p>
            <p>
              Habits:{" "}
              {habits.map((element, index) => (
                <Badge color="gray" variant="light" align="center" key={index}>
                  {element}
                </Badge>
              ))}
            </p>

            <p>
              Special Needs:{" "}
              {specialNeeds.map((element, index) => (
                <Badge color="gray" variant="light" align="center" key={index}>
                  {element}
                </Badge>
              ))}
            </p>
            <ul></ul>
            <p>Category: {category}</p>
            <p>Size: {sizeText()}</p>
            <SimpleGrid
              breakpoints={[
                { maxWidth: 2000, cols: 6, spacing: "md" },
                { maxWidth: 1750, cols: 5, spacing: "md" },
                { maxWidth: 1500, cols: 3, spacing: "md" },
                { maxWidth: 1100, cols: 2, spacing: "sm" },
                { maxWidth: 800, cols: 1, spacing: "sm" },
              ]}
            >
              {img.map((photo, index) => (
                <Image key={index} radius="lg" src={photo} alt="my pet photo" />
              ))}
            </SimpleGrid>

            <PetUpdate
              modalOpen={editModalOpen}
              setModalOpen={setEditModalOpen}
              pet={pet}
              setPet={setPet}
            />
            <ImageDropzonePets
              dropModalOpen={dropModalOpen}
              setDropModalOpen={setDropModalOpen}
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
