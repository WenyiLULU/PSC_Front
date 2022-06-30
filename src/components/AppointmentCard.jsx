import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Group,
  Space,
  Text,
  Title,
  Grid,
  Stack,
} from "@mantine/core";
import React from "react";
import { Trash } from "tabler-icons-react";

const AppointmentCard = ({ user, e, handleDelete, eIndex }) => {
  return (
    <Card shadow="sm" p="xl" radius="lg">
      <Title order={3}>{eIndex + 1}. Appointment</Title>
      <Space h="md" />
      <Text>
        <strong>Dates : </strong>{" "}
        <Badge color="red" variant="light" align="center">
          {e.startDate.slice(0, 10)} - {e.endDate.slice(0, 10)}
        </Badge>
      </Text>
      <Space h="sm" />
      <Text>
        <strong>Organizer : </strong>
        {e.creator.username}
      </Text>

      <Text>
        <strong>Participants : </strong>{" "}
        {e.participant[0] ? e.participant[0].username : "No other participants"}
      </Text>
      <Stack spacing="xs" justify="space-between" sx={{ height: 90 }}>
        <Text>
          <strong>Pets : </strong>
        </Text>
        {e.pets.length > 0 ? (
          <Grid gutter="sm">
            {e.pets.map((pet, index) => (
              <Grid.Col
                align="center"
                span={2}
                style={{ minHeight: 80 }}
                key={pet._id}
              >
                <Avatar radius="xl" size="lg" src={pet.img[0]} alt="my face" />
                {pet.name}{" "}
              </Grid.Col>
            ))}{" "}
          </Grid>
        ) : (
          <Grid gutter="sm">
            <Grid.Col span={1} style={{ minHeight: 80 }}>
              <Avatar color="#95b1db" radius="xl" size="lg">
                ?
              </Avatar>
            </Grid.Col>
          </Grid>
        )}

        <Text>
          <strong>City : </strong>
          {e.city}
        </Text>
      </Stack>
      <Space h="xl" />

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
