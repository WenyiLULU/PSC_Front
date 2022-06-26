import searchDog from '../assets/dog_2.gif'

const NotFound = () => {
    return ( 
        <>
            <h1>404</h1>
            <div><img src={searchDog} alt="searching dog" /></div>
        </>
        
     );
}
 
export default NotFound;