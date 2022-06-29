import React, { useEffect, useState } from "react";
import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";
import { Card, Container, Text } from "@mantine/core";
import { Link } from "react-router-dom";

function AvailabilitiesList() {
    const [avail, setAvail] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {apiWithToken, isAuthenticated, userId} = useContext(SessionContext)

    const fetchAvail = async () => {
        const allAvail = await apiWithToken('avail')
        const filterAvail = await allAvail.filter(e=> (e.author._id===userId))
        console.log(filterAvail)
        setAvail(filterAvail)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchAvail()
    },[]) 

    return (<>
        {isLoading && <p>Loading...</p>}
        {!isLoading && <Container>
            {avail.map(e => <>
            <Card
              shadow="sm"
              p="xl"
              component={Link}
              to={`/avail/${e._id}`}
              sx={{
                "&:hover": {
                  backgroundColor: "red",
                },
              }}
              key={e._id}
              singleAvail={e}>
              <Text size="lg" weight={500} align="left">
                {e.name}
            </Text></Card>
            </>
            )}</Container>

        
        }

    </> 
     );
}

export default AvailabilitiesList;