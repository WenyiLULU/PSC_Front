import { Button, Modal, MultiSelect, Select, TextInput, Group } from "@mantine/core";
import { RangeCalendar } from "@mantine/dates";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router-dom";
import { SessionContext } from "../context/SessionContext";

function AvailabilityCreate({
  availModalOpen,
  setAvailModalOpen,
  userPets,
  setUserPets,
  setNeedRefresh,
}) {
  const [selectValue, setSelectValue] = useState();

  const { userId } = useParams();
  const { apiPostWithToken } = useContext(SessionContext);
  const [petNames, setPetNames] = useState([]);
  const [petIds, setPetIds] = useState([]);

  const [calendarValue, setCalendarValue] = useState([
    Date | null,
    Date | null,
  ]);

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      city: "",
      actionType: "",
      userPets: "",
      dates: calendarValue,
    },
  });

  useEffect(() => {
    const petId = userPets.map((e) => e.id);
    setPetIds(petId);
    const petName = userPets.map((e) => e.name);
    setPetNames(petName);
  }, []);

  const createAvailability = async (newAvailability) => {
    const response = await apiPostWithToken("avail/create", newAvailability);
    console.log("Response", response);
    setNeedRefresh(true);
    // navigate("/user/calendar/:userId");
  };

  const handleSubmit = (values) => {
    // setValue(value)
    if (values.actionType === "offer") {
      values.userPets = [];
    }
    const data = {
      startDate: values.dates[0],
      endDate: values.dates[1],
      author: userId,
      actionType: values.actionType,
      city: values.city,
      pets: values.userPets,
    };
    console.log("data: ", data);
    createAvailability(data);
    setAvailModalOpen(false);
  };
  return (
    <>
      <Modal
        opened={availModalOpen}
        onClose={() => setAvailModalOpen(false)}
        title="Select the days you are available"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <RangeCalendar
            value={calendarValue}
            onChange={setCalendarValue}
            label="dates"
            {...form.getInputProps("dates")}
          />

          <Select
            value={selectValue}
            onChange={setSelectValue}
            label="Type"
            placeholder="Pick one"
            data={[
              { value: "offer", label: "Offer" },
              { value: "request", label: "Request" },
            ]}
            {...form.getInputProps("actionType")}
          />

          <MultiSelect
            label="Your Pets"
            data={petNames}
            {...form.getInputProps("userPets")}
          />
          <TextInput
            label="City"
            placeholder="Select a city"
            {...form.getInputProps("city")}
          />
          <Group position="right" mt="md">
          <Button type="submit" style={{ marginRight: 5 }}>
            Select timeframe
          </Button>
          </Group>
          
        </form>
      </Modal>
    </>
  );
}

export default AvailabilityCreate;
