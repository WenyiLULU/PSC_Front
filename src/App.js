import './App.css';
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import UserProfile from './pages/UserProfile';
import NotAuth from './pages/NotAuth';
// import Signup from './modals/Signup';
// import Login from './modals/Login';
import { SessionContext } from './context/SessionContext'
import { useContext } from 'react';
import NotFound from './pages/NotFound';

function App() {
  const { isAuthenticated } = useContext(SessionContext)

  return (
    <>
      
      <Layout >  
        <Routes>
            <Route path='/' element={<HomePage />} />
            {/* <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} /> */}
            <Route path='/user/dashboard' element={isAuthenticated ? <Dashboard /> : <NotAuth/> } />
            <Route path='/user/:userId' element={isAuthenticated ? <UserProfile /> : <NotAuth/>} />
            <Route path='/user/pets' element={isAuthenticated ? <h1> Pets profiles </h1> : <NotAuth/>} />
            <Route path='/user/pets/:petId' element={isAuthenticated ? <h1> One pet profile </h1> : <NotAuth/>} />
            <Route path='/user/calendar/:userId' element={isAuthenticated ? <h1> User calendar </h1>: <NotAuth/>} />
            <Route path='/result' element={isAuthenticated ? <h1> Search results </h1> : <NotAuth/>} />
            <Route path='/result/:avaliId' element={isAuthenticated ? <h1> Appointment page </h1>: <NotAuth/>} />
            <Route path='/notauth' element={<NotAuth />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>    
    </>
  
  );
}

export default App;
