import React, { useEffect, useState } from 'react'
import { SessionContext } from "../context/SessionContext"
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

const PetList = () => {
  const { userId, apiWithToken } = useContext(SessionContext)



    return ( 
        <h1>Pets List</h1>
     );
}
 
export default PetList;