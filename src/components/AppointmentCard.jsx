import { ActionIcon, Badge, Card, Group, Text } from "@mantine/core";
import React from "react";
import { Trash } from "tabler-icons-react";

const AppointmentCard = ({ user, e, handleDelete }) => {
  return (
    <Card shadow="sm" p="lg">
      <Card.Section>
        <Badge color="red" variant="light" align="center">
          {e.startDate.slice(0, 10)} - {e.endDate.slice(0, 10)}
        </Badge>
      </Card.Section>
      <Card.Section style={{ marginBottom: 5, marginTop: 5 }}>
        <Text align="center">{e._id}</Text>
      </Card.Section>
      <Card.Section style={{ marginBottom: 5, marginTop: 5 }}>
        <Text align="center">{user.username}</Text>
      </Card.Section>
      <Card.Section style={{ marginBottom: 5 }}>
        <Text align="center">{e.participant[0].username}</Text>
      </Card.Section>
      <Card.Section style={{ marginBottom: 5 }}>
        <Text align="center">{e.city}</Text>
      </Card.Section>
      <Card.Section style={{ marginBottom: 5 }}>
        {e.pets.map((pet) => (
          <Text align="center">{pet.name}</Text>
        ))}
      </Card.Section>
      <Group position="center">
        <ActionIcon
          onClick={handleDelete.bind(this, e._id)}
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

export default AppointmentCard;
