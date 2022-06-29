import React from "react";
import { Button, Card, Image, Space, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import StandardButton from "./StandardButton";

function PetCard({ onePet }) {
  return (
    <Card
      align="center"
      shadow="sm"
      p="xl"
      radius="lg"
      component={Link}
      to={`/user/pets/${onePet._id}`}
      sx={{
        "&:hover": {
          backgroundColor: "#EEEEEE",
        },
      }}
    >
      <Text size="lg" weight={500} align="left">
        {onePet.name}
      </Text>
      <Image
        radius="lg"
        src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
        alt="dog"
      />
      <Space h="md" />
      <Button component={Link} to={`/user/pets/${onePet._id}`}>
        details
      </Button>
    </Card>
  );
}

export default PetCard;
