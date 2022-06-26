import { Button } from "@mantine/core";

const TemporalButtonPets = ({ setCreatePetModal }) => {
  return (
    <Button
      onClick={() => {
        // condition if logged in => redirect to Dashboard
        // else => open login modal
        setCreatePetModal(true);
      }}
    >
      Add a pet
    </Button>
  );
};

export default TemporalButtonPets;
