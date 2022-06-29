import { Button, Card, Text } from "@mantine/core"
import { useContext } from "react"
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { SessionContext } from "../context/SessionContext"
import { apiBase } from "../utils/reqBackEnd"
import CreateAppointment from "./CreateAppointment"


function SearchAvailResults () {
    const location = useLocation();
    const [avail, setAvail] = useState({})
    const [match, setMatch] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [appointModel, setAppointModel] = useState(false)
    const { isAuthenticated } = useContext(SessionContext)
    const {apiWithToken} = useContext(SessionContext)
    const navigate = useNavigate()

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
        ((Date.parse(e.endDate) >= Date.parse(location.state.endDate)) && (Date.parse(e.startDate) <= Date.parse(location.state.startDate)) && location.state.actionType !== e.actionType && location.state.city === e.city))
        console.log('Matches:', matches) 
        setMatch(matches) 
        setIsLoading(false)
    }

    useEffect(() => {
        fetchAvail()
        // checkMatch()
        console.log('State:', location.state)
    }, [])

    // useEffect(() => {
    //     if (isAuthenticated)
    //      checkMatch() 
    // }, [isAuthenticated])
    const handleCreate = (availId) => {
        const data = {startDate: location.state.startDate, endDate: location.state.endDate, name: location.state.name, id: location.state.author}
        navigate(`/result/${availId}`, {state: data})
    }

    return <>
            {isLoading && <p>...Loading</p>}
            {!isLoading && <><div>
            <p>City: {location.state.city}</p>
            <p>Type of search: {location.state.actionType}</p>
            </div>
            <h1>Results</h1>
            {match.map(singleAvail => 
            <div style={{width: 300}}>
            <Card name={singleAvail.author.username} align='center'>
            <Text>Start Date: {(singleAvail.startDate).toString().slice(0,10)}</Text>
            <Text>End Date: {(singleAvail.endDate).toString().slice(0,10)}</Text>
            <Text weight={500} align='center'>
            {singleAvail.author.username}
            </Text>
            <Text weight={500} align='center'>
            {location.state.city}
            </Text>
            
            <Button align='center' onClick={()=>handleCreate(singleAvail._id)} >Create appointment</Button>
            </Card>
            {/*  <CreateAppointment requestData={location.state} userData={singleAvail}/>*/}
            </div>
            )}
             
            {/* <CreateAppointment
                appointModel={appointModel}
                setAppointModel={setAppointModel}
                userData={singleAvail}
                requestData={location.state}
             /> */}
            
            
            </>
            }
            </>
      

}

export default SearchAvailResults