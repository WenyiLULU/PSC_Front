import { Card } from "@mantine/core"
import { useContext } from "react"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { SessionContext } from "../context/SessionContext"
import { apiBase } from "../utils/reqBackEnd"


function SearchAvailResults () {
    const [avail, setAvail] = useState({})
    const [match, setMatch] = useState({})
    const { isAuthenticated } = useContext(SessionContext)
    const {apiWithToken} = useContext(SessionContext)
    const location = useLocation();

    const fetchAvail = async () => {
        const response = await apiWithToken('avail')
        await setAvail(response) 
        console.log('All availabilities: ', avail)
    }

    const checkMatch = async () => {
        const matches = await avail.map((e) => 
        ((Date.parse(e.endDate) > Date.parse(location.state.endDate)) && (Date.parse(e.startDate) < Date.parse(location.state.startDate))))
        console.log('Matches:', matches)
        // setMatch(matches)
    }

    useEffect(() => {
        if (isAuthenticated)
        fetchAvail()
        checkMatch() 
    }, [isAuthenticated])

    return <>
        
           <p>{location.state.city}</p> 
            
        
    </>

}

export default SearchAvailResults