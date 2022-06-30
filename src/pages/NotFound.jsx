import searchDog from '../assets/dog_2.gif'
import {Center} from '@mantine/core'

const NotFound = () => {
    return ( 
        <Center style={{display:"flex", flexDirection:"column"}}>
            <h1>404</h1>
            <div><img src={searchDog} alt="searching dog" /></div>
        </Center>
        
     );
}
 
export default NotFound;