import { Button } from "@mantine/core";

const StandardButton = ({ setModalOpen, children }) => {
  return (
    <Button
      radius="lg" size="lg"
      onClick={() => {
        // condition if logged in => redirect to Dashboard
        // else => open login modal
        setModalOpen(true);
      }}
    >
      {children}
    </Button>
  );
};

export default StandardButton;
