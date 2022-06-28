import { Button, Card, Text } from "@mantine/core"
import { useContext } from "react"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { SessionContext } from "../context/SessionContext"
import { apiBase } from "../utils/reqBackEnd"


function SearchAvailResults () {
    const location = useLocation();
    const [avail, setAvail] = useState({})
    const [match, setMatch] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { isAuthenticated } = useContext(SessionContext)
    const {apiWithToken} = useContext(SessionContext)

    const fetchAvail = async () => {
        const response = await apiWithToken('avail')
        console.log('Response:', response)
        setAvail(response) 
        
    }

    useEffect(() => {
        // console.log('All availabilities: ', avail)
        checkMatch() 
    }, [avail])

    const checkMatch = async () => {
        const matches = await avail.filter((e) => 
        ((Date.parse(e.endDate) > Date.parse(location.state.endDate)) && (Date.parse(e.startDate) < Date.parse(location.state.startDate)) && location.state.actionType !== e.actionType))
        console.log('Matches:', matches) 
        setMatch(matches) 
        setIsLoading(false)
    }

    useEffect(() => {
        fetchAvail()
    }, [])

    // useEffect(() => {
    //     if (isAuthenticated)
    //      checkMatch() 
    // }, [isAuthenticated])

    return <>
            {isLoading && <p>...Loading</p>}
            {!isLoading && <><div>
            <p>City: {location.state.city}</p>
            <p>Type of search: {location.state.actionType}</p>
            <p>Start Date: {Date(location.state.startDate)}</p>
            <p>End Date: {Date(location.state.endDate)}</p>
            </div>
            <h1>Results</h1>
            {match.map(e => 
            <div style={{width: 300}}>
            <Card name={e.author} align='center'>
            <Text weight={500} align='center'>
            {e.author}
            </Text>
            <Text weight={500} align='center'>
            {e.city}
            </Text>
            <Button align='center'>Create appointment</Button>
            </Card></div>
            )}
             
            
            
            
            </>
            }
            </>
      

}

export default SearchAvailResults