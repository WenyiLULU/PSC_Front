import React from "react";
import { Card, Text } from "@mantine/core";

function PetCard({ onePet }) {
  return (
    <Card>
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
    </Card>
  );
}

export default PetCard;
