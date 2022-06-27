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
        setAvail(response) 
        console.log('All availabilities: ',avail)
    }

    const checkMatch = async () => {
        const matches = await avail.map((e) => 
        ((e.endDate < location.state.endDate)))
        // && e.startDate > Date(location.state.startDate))
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