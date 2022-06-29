import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  CardSection,
  Group,
  Space,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { Trash } from "tabler-icons-react";

const AppointmentCard = ({ user, e, handleDelete, eIndex }) => {
  return (
    <Card shadow="sm" p="lg">
      <CardSection>
        <Title order={3}>{eIndex + 1}. Sitting</Title>
        <Badge color="red" variant="light" align="center">
          {e.startDate.slice(0, 10)} - {e.endDate.slice(0, 10)}
        </Badge>
      </CardSection>
      <CardSection height={250}>
        {/* <Text>{e._id}</Text> */}

        <Text>Organizer: {e.creator.username}</Text>

        <Text>Participants: {e.participant[0].username}</Text>

        <Text>
          Participants: {}
          {e.pets.map((pet, index) => (
            <>
              <span key={index}>
                {pet.name}{" "}
                <Avatar radius="xl" size="lg" src={pet.img[0]} alt="my face" />{" "}
                ({pet.owner})
              </span>
            </>
          ))}
        </Text>
        <Text>City: {e.city}</Text>
      </CardSection>
      <Group position="right">
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
