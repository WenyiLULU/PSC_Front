import { ActionIcon } from "@mantine/core";
import { Trash } from "tabler-icons-react";

const DeleteButton = ({ handleDelete }) => {
  return (
    <ActionIcon onClick={handleDelete}>
      <Trash size={48} strokeWidth={2} color={"#bf4058"} />
    </ActionIcon>
  );
};

export default DeleteButton;
