import React, { useEffect, useState } from 'react'
import { SessionContext } from "../context/SessionContext"
import { useContext } from "react";

function UserProfile() {
  const [user, setUser] = useState({})

  const {apiWithToken, userId } = useContext(SessionContext)
  const fetchUser = async ()=>{
    const userInfo = await apiWithToken(`user/${userId}`)
    setUser(userInfo)
  }

  useEffect(()=>{
    fetchUser()
  }, [])

  const {username, email, country, city, image} = user

  return (
    <>
      <h1>Hello {username}</h1>
      <div><img src={image} alt="user photo" /></div>
    </>
   
  )
}

export default UserProfile