import { useContext, useState } from "react";
import { RangeCalendar } from "@mantine/dates";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { Button, Group, Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SessionContext } from "../context/SessionContext";
import AvailabilitiesList from "./AvailabilitiesList";
import TitleBar from "../components/TitleBar";
import StandardButton from "../components/StandardButton";

function UserCalendar() {
  const { userId } = useParams();

  const { apiPostWithToken } = useContext(SessionContext);

  const [calendarValue, setCalendarValue] = useState([
    Date | null,
    Date | null,
  ]);

  const [selectValue, setSelectValue] = useState();

  const navigate = useNavigate();
  const [availModalOpen, setAvailModalOpen] = useState(false);
  const [appointModalOpen, setAppointModalOpen] = useState(false);
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
    <>
      <TitleBar
        title={"My Calendar"}
        options={
          <>
            <StandardButton setModalOpen={setAvailModalOpen}>
              Add Availabilty
            </StandardButton>
            <StandardButton setModalOpen={setAppointModalOpen}>
              New Appointment
            </StandardButton>
          </>
        }
      />
      <Group>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Text align="center">Create an availability</Text>
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
          <Button component={NavLink} to="/user/avail">
            Edit availabilities
          </Button>
        </form>
      </Group>
    </>
  );
}

export default UserCalendar;
