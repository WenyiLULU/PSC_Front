import { Button, Modal, Select, Text, TextInput } from "@mantine/core";
import { RangeCalendar } from "@mantine/dates";
import React, { useContext, useState } from "react";
import { useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router-dom";
import { SessionContext } from "../context/SessionContext";

function AvailabilityCreate({ availModalOpen, setAvailModalOpen }) {
  const [selectValue, setSelectValue] = useState();

  const { userId } = useParams();

  const { apiPostWithToken } = useContext(SessionContext);

  const [calendarValue, setCalendarValue] = useState([
    Date | null,
    Date | null,
  ]);

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      city: "",
      actionType: "",
      dates: calendarValue,
    },
  });

  const createAvailability = async (newAvailability) => {
    const response = await apiPostWithToken("avail/create", newAvailability);
    console.log("Response", response);
    navigate("/user/dashboard");
  };

  const handleSubmit = (values) => {
    // setValue(value)
    const data = {
      startDate: values.dates[0],
      endDate: values.dates[1],
      author: userId,
      actionType: values.actionType,
      city: values.city,
    };
    console.log("data: ", data);
    createAvailability(data);
  };
  return (
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
        <TextInput
          label="City"
          placeholder="Select a city"
          {...form.getInputProps("city")}
        />
        <Button type="submit" style={{ marginRight: 5 }}>
          Select timeframe
        </Button>
      </form>
    </Modal>
  );
}

export default AvailabilityCreate;
