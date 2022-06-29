import React, { useEffect, useState } from "react";
import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";
import { Container } from "@mantine/core";

function AvailabilitiesList() {
    const [avail, setAvail] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {apiWithToken, isAuthenticated, userID} = useContext(SessionContext)

    const fetchAvail = async () => {
        const allAvail = await apiWithToken('avail')
        const filterAvail = await allAvail.filter(e=> (e._id===userID))
        console.log(filterAvail)
        setAvail(filterAvail)
        setIsLoading(false)
    }

    return (<>
        {isLoading && <p>Loading...</p>}
        {!isLoading && <Container>
            {avail.map(e => 
            <p>User Availability List</p>
            )}

        </Container>
        }

    </> 
     );
}

export default AvailabilitiesList;