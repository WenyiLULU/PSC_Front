import React, { useState } from "react";
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
      {onePet.img[0] && (
        <Image radius="lg" height={300} src={onePet.img[0]} alt="pet photo" />
      )}
      {!onePet.img[0] && (
        <Image
          radius="lg"
          height={300}
          src={
            "https://res.cloudinary.com/cocktail-lab/image/upload/v1656498682/pscImage/rwcotpwxgwvuv2t3zk4i.jpg"
          }
          alt="pet photo"
        />
      )}

      <Space h="md" />
      <Button component={Link} to={`/user/pets/${onePet._id}`}>
        details
      </Button>
    </Card>
  );
}

export default PetCard;
