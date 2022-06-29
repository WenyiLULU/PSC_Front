import { Button } from "@mantine/core";

const StandardButton = ({ setModalOpen, children }) => {
  return (
    <Button
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
