import React from "react";
import { Button, Card, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import StandardButton from "./StandardButton";

function PetCard({ onePet }) {
  return (
    <Card
      shadow="sm"
      p="xl"
      component={Link}
      to={`/user/pets/${onePet._id}`}
      sx={{
        "&:hover": {
          backgroundColor: "#EEEEEE",
        },
      }}
    >
      <Text weight={500} align="left">
        Name: {onePet.name}
      </Text>
      <Text weight={500} align="left">
        Age: {onePet.age}
      </Text>
      <Text weight={500} align="left">
        Category: {onePet.category}
      </Text>
      <Text weight={500} align="left">
        Size: {onePet.size}
      </Text>
      <Button component={Link} to={`/user/pet/${onePet._id}`}>
        See details
      </Button>
    </Card>
  );
}

export default PetCard;
