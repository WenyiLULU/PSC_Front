import './App.css';
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      
      <Layout >  
        <Routes>
            <Route path='/homepage' element={<HomePage />} />
            <Route path='/signup' element={<h1> Signup form</h1>} />
            <Route path='/login' element={<h1> Login form</h1>} />
            <Route path='/user/dashboard' element={<Dashboard />} />
            <Route path='/user/:userId' element={<h1> User profile </h1>} />
            <Route path='/user/pets' element={<h1> Pets profiles </h1>} />
            <Route path='/user/pets/:petId' element={<h1> One pet profile </h1>} />
            <Route path='/user/calendar/:userId' element={<h1> User calendar </h1>} />
            <Route path='/result' element={<h1> Search results </h1>} />
            <Route path='/result/:avaliId' element={<h1> Appointment page </h1>} />
        </Routes>
      </Layout>    
    </>
  
  );
}

export default App;
