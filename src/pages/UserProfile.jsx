import React, { useEffect, useState } from 'react'
import { SessionContext } from "../context/SessionContext"
import { useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import StandardButton from '../components/StandardButton';
import EditUser from '../modals/EditUser';
import EditPassword from '../modals/EditPassword';
import SearchAvail from '../modals/SearchAvail';
import { Button } from '@mantine/core';

function UserProfile() {
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  const { apiWithToken } = useContext(SessionContext)
  const {userId} = useParams()
  const fetchUser = async ()=>{
    try {
      const userInfo = await apiWithToken(`user/${userId}`)
      setUser(userInfo)
    } catch (error) {
      console.log("error", error)
      navigate('*')
    }
    
  }

  useEffect(()=>{
    userId ? fetchUser() : navigate('/notauth')
  }, [userId])

  const {username, email, country, city, image} = user

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)

  return (
    <>
      <h1>Hello {username}</h1>
      <p><strong>Email : </strong>{email}</p>
      <p><strong>Country : </strong>{country}</p>
      <p><strong>City : </strong>{city}</p>
      <div><img src={image} alt="user" /></div>
      <StandardButton setEditModalOpen={setEditModalOpen} >Edit profile</StandardButton>
      <StandardButton setEditModalOpen={setPasswordModalOpen} >Edit password</StandardButton>
      <Button onClick={() => {setSearchModalOpen(true)}}>Become a pet sitter /Find a pet sitter</Button>
      <EditUser 
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen} 
        user={user}
        setUser={setUser}
        />
      <EditPassword 
        passwordModalOpen={passwordModalOpen}
        setPasswordModalOpen={setPasswordModalOpen} 
        user={user}
        setUser={setUser}
        />
      <SearchAvail
        searchModalOpen={searchModalOpen}
        setSearchModalOpen={setSearchModalOpen}
        user={user}
      />
    </>
   
  )
}

export default UserProfile