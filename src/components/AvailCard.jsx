import { ActionIcon, Card, Group, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { Trash } from "tabler-icons-react";

const AvailCard = ({ oneAvail, handleDelete }) => {
  return (
    <Card
      shadow="sm"
      p="xl"
      radius="lg"
      component={Link}
      to={`/avail/${oneAvail._id}`}
      sx={{
        "&:hover": {
          backgroundColor: "#EEEEEE",
        },
      }}
    >
      <Text size="lg" weight={500} align="left">
        Dates: {oneAvail.startDate.slice(0, 10)} -{" "}
        {oneAvail.endDate.slice(0, 10)}
      </Text>
      <Text>Type: {oneAvail.actionType}</Text>
      <Text>City: {oneAvail.city}</Text>

      <Group position="right">
        <ActionIcon
          onClick={handleDelete.bind(this, oneAvail._id)}
          color="red"
          size="md"
          variant="filled"
        >
          <Trash size={48} strokeWidth={2} color={"white"} />
        </ActionIcon>
      </Group>
    </Card>
  );
};

export default AvailCard;
