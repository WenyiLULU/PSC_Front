import "./App.css";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import PetList from "./pages/PetList";
import PetDetails from "./pages/PetDetails";
import NotAuth from "./pages/NotAuth";
import NotFound from "./pages/NotFound";
import UserCalendar from "./pages/UserCalendar";
import SearchAvailResults from "./pages/SearchAvailResults";
import AvailabilitiesList from "./pages/AvailabilitiesList";
import AvailDetails from "./pages/AvailDetails";
import CreateAppointment from "./pages/CreateAppointment";
import { PetContextProvider } from "./context/PetContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
 
  return (
    <>
      <PetContextProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} /> */}
            <Route
              path="/user/dashboard"
              element={<PrivateRoute><Dashboard /></PrivateRoute>}
            />
            <Route
              path="/user/:userId"
              element={<PrivateRoute><UserProfile /></PrivateRoute>}
            />
            <Route
              path="/user/pets"
              element={<PrivateRoute><PetList /></PrivateRoute>}
            />
            <Route
              path="/user/pets/:petId"
              element={<PrivateRoute><PetDetails /></PrivateRoute>}
            />
            <Route
              path="/user/avail"
              element={<PrivateRoute><AvailabilitiesList /></PrivateRoute>}
            />
            <Route
              path="/user/avail/:availID"
              element={<PrivateRoute><AvailDetails /></PrivateRoute> }
            />
            <Route
              path="/user/calendar/:userId"
              element={<PrivateRoute><UserCalendar /></PrivateRoute> }
            />
            <Route
              path="/result"
              element={<PrivateRoute><SearchAvailResults /></PrivateRoute>}
            />
            <Route
              path="/result/:availId"
              element={
                <PrivateRoute><CreateAppointment /></PrivateRoute>}
            />
            <Route path="/notauth" element={<NotAuth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </PetContextProvider>
    </>
  );
}

export default App;
