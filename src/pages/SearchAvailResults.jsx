import { Card } from "@mantine/core"
import { useContext } from "react"
import { useEffect, useState } from "react"
import { SessionContext } from "../context/SessionContext"
import { apiBase } from "../utils/reqBackEnd"


function SearchAvail (type, searchTimeFrame) {
    const [avail, setAvail] = useState()
    const [match, setMatch] = useState()
    const { isAuthenticated } = useContext(SessionContext)

    const fetchAvail = async () => {
        const response = await apiBase('api/avail')
        setAvail(response)
    }

    const checkMatch = async () => {
        const matches = await avail.map((e) => 
        (e.startDate < searchTimeFrame.startDate && e.endDate > searchTimeFrame.endDate))
        setMatch(matches)
    }

    useEffect(() => {
        if (isAuthenticated)
        fetchAvail()
        checkMatch() 
    }, [isAuthenticated])

    return <>
        {match.map(e => 
            <Card>
            <Card.Section>
            {e.username}
            </Card.Section>
            </Card>
            
            
            
        )}
        
    </>

}

export default SearchAvail