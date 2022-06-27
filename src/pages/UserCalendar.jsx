import { useContext, useState } from "react";
import { RangeCalendar } from "@mantine/dates";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SessionContext } from "../context/SessionContext";

function UserCalendar() {
  const { userId } = useParams();

  const { apiPostWithToken } = useContext(SessionContext);

  const [calendarValue, setCalendarValue] = useState([
    Date | null,
    Date | null,
  ]);

  const [selectValue, setSelectValue] = useState();

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
    // navigate(`/appointment/${response.id}`)
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
    <>
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
          placeholder="Your city (should be user city)"
          {...form.getInputProps("city")}
        />
        <Button type="submit">Select timeframe</Button>
      </form>
    </>
  );
}

export default UserCalendar;
