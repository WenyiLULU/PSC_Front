import React, { useEffect, useState } from 'react'
import { SessionContext } from "../context/SessionContext"
import { useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';

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

  return (
    <>
      <h1>Hello {username}</h1>
      <p><strong>Email : </strong>{email}</p>
      <p><strong>Country : </strong>{country}</p>
      <p><strong>City : </strong>{city}</p>
      <div><img src={image} alt="user photo" /></div>
    </>
   
  )
}

export default UserProfile