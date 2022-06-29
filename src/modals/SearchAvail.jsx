import { Button, Modal, Select, TextInput } from "@mantine/core";
import { RangeCalendar } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function SearchAvail({ searchModalOpen, setSearchModalOpen, user }) {
  const [searchDates, setSearchDates] = useState([Date | null, Date | null]);

  const [selectValue, setSelectValue] = useState();

  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      actionType: "",
      city: "",
      dates: searchDates,
    },
  });

  const handleSubmit = (values) => {
    const data = {startDate: values.dates[0], endDate: values.dates[1], author: user._id, actionType: values.actionType, city: values.city, name: user.username}
    setSearchModalOpen(false);
    navigate("/result", {state: data})
  };

  return (
    <Modal
      opened={searchModalOpen}
      onClose={() => setSearchModalOpen(false)}
      title="Find a pet sitter / 
      Find people looking for a pet sitter"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <RangeCalendar
          value={searchDates}
          onChange={setSearchDates}
          label="dates"
          {...form.getInputProps("dates")}
        />

        <Select
          value={selectValue}
          onChange={setSelectValue}
          label="Type"
          placeholder="Pick one"
          data={[
            { value: "offer", label: "Find requests" },
            { value: "request", label: "Find offers" },
          ]}
          {...form.getInputProps("actionType")}
        />
        <TextInput
          label="City"
          placeholder="Select a city"
          {...form.getInputProps("city")}
        />
        <Button type="submit">Select timeframe</Button>
      </form>
    </Modal>
  );
}

export default SearchAvail
