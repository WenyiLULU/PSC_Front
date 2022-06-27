import { Card } from "@mantine/core"
import { useContext } from "react"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { SessionContext } from "../context/SessionContext"
import { apiBase } from "../utils/reqBackEnd"


function SearchAvailResults () {
    const [avail, setAvail] = useState()
    const [match, setMatch] = useState()
    const { isAuthenticated } = useContext(SessionContext)
    const {apiWithToken} = useContext(SessionContext)
    const location = useLocation();

    const fetchAvail = async () => {
        const response = await apiWithToken('avail')
        console.log(response)
        setAvail(response)
    }

    // const checkMatch = async () => {
    //     const matches = await avail.map((e) => 
    //     (e.startDate < data.startDate && e.endDate > data.endDate))
    //     setMatch(matches)
    // }

    useEffect(() => {
        if (isAuthenticated)
        fetchAvail()
        console.log(location.state)
        // checkMatch() 
    }, [isAuthenticated])

    return <>
        
           <p>{location.state.city}</p> 
            
        
    </>

}

export default SearchAvailResults