import { createContext, useContext, useEffect, useState } from 'react'
import { SessionContext } from './SessionContext'

const PetContext = createContext()

const PetContextProvider = ({children}) => {
    const [pets, setPets] = useState([])
    const [refreshPetContext, setRefreshPetContext] = useState(false);

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

    useEffect(() => {
        if (refreshPetContext) {
          fetchPets();
          setRefreshPetContext(false);
        }
      }, [refreshPetContext]);
      return <PetContext.Provider value={{ pets, refreshPetContext,setRefreshPetContext }}>{children}</PetContext.Provider>
}

export {PetContext, PetContextProvider }