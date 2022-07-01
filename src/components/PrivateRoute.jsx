import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionContext } from "../context/SessionContext";
import { Image } from "@mantine/core"
import loadingImg from "../assets/hamster_1.gif"

const PrivateRoute = ({children}) => {
    const {isAuthenticated, isVerified} = useContext(SessionContext)
     
    if(!isVerified){
        return <Image src={loadingImg} alt="loading ..." />
    }
    if(!isAuthenticated){
       return <Navigate to="/notauth"/>
    }
    return (<>{children}</>)
     
}
 
export default PrivateRoute;