import { createContext, useContext, useEffect, useState } from 'react'
import { SessionContext } from './SessionContext'

const PetContext = createContext()

const PetContextProvider = ({children}) => {
    const [pets, setPets] = useState([])
    const { isAuthenticated, apiWithToken } = useContext(SessionContext)

    const fetchPets = async () => {
        try {
          const data = await apiWithToken("pet");
          // console.log(">>>> Response: ", data);
          setPets(data);
        } catch (error) {
          console.log(">>> error: ", error);
          // navigate("*");
        }
      };

    useEffect(() => {
        if (isAuthenticated) {
          fetchPets()
        }
      }, [isAuthenticated])

      return <PetContext.Provider value={{ pets }}>{children}</PetContext.Provider>
}

export {PetContext, PetContextProvider}