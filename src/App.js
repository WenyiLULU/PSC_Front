import "./App.css";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import PetList from "./pages/PetList";
import PetDetails from "./pages/PetDetails";
import NotAuth from "./pages/NotAuth";
// import Signup from './modals/Signup';
// import Login from './modals/Login';
import { SessionContext } from "./context/SessionContext";
import { useContext } from "react";
import NotFound from "./pages/NotFound";
import UserCalendar from "./pages/UserCalendar";
import SearchAvailResults from "./pages/SearchAvailResults";
import AvailabilitiesList from "./pages/AvailabilitiesList";
import AvailDetails from "./pages/AvailDetails";
import CreateAppointment from "./pages/CreateAppointment";
import { PetContextProvider } from "./context/PetContext";

function App() {
  const { isAuthenticated } = useContext(SessionContext);

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
            element={isAuthenticated ? <Dashboard /> : <NotAuth />}
          />
          <Route
            path="/user/:userId"
            element={isAuthenticated ? <UserProfile /> : <NotAuth />}
          />
          <Route
            path="/user/pets"
            element={isAuthenticated ? <PetList /> : <NotAuth />}
          />
          <Route
            path="/user/pets/:petId"
            element={isAuthenticated ? <PetDetails /> : <NotAuth />}
          />
           <Route
            path="/user/avail"
            element={isAuthenticated ? <AvailabilitiesList /> : <NotAuth />}
          />
           <Route
            path="/user/avail/:availID"
            element={isAuthenticated ? <AvailDetails /> : <NotAuth />}
          />
          <Route
            path="/user/calendar/:userId"
            element={
              isAuthenticated ? (
                <h1>
                  {" "}
                  <UserCalendar />{" "}
                </h1>
              ) : (
                <NotAuth />
              )
            }
          />
          <Route
            path="/result"
            element={isAuthenticated ? <SearchAvailResults /> : <NotAuth />}
          />
          <Route
            path="/result/:availId"
            element={
              isAuthenticated ? <h1> <CreateAppointment /> </h1> : <NotAuth />
            }
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
