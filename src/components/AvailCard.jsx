import { ActionIcon, Badge, Card, Container, Group, Text } from "@mantine/core";
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
      <Text>
        <strong>Dates : </strong>{" "}
        <Badge color="red" variant="light" align="center">
          {oneAvail.startDate.slice(0, 10)} - {oneAvail.endDate.slice(0, 10)}
        </Badge>
      </Text>
      <Text>Type: {oneAvail.actionType}</Text>
      {oneAvail.actionType === "request" && (
        <Text>
          Pets:
          {oneAvail.pets.map((onePet) => (
            <span> {onePet}</span>
          ))}
        </Text>
      )}
      {oneAvail.actionType === "offer" && <Text>Pets: to be confirmed</Text>}
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
