import raccoon from "../assets/raccoon.png"
import {Image, Center} from "@mantine/core"
const NotAuth = () => {
    return ( 
        <Center style={{display:"flex", flexDirection:"column", fontColor:"#302e36"}}>
        <h1> Please login to see more infomations ^_^</h1>
        <Image 
            src={raccoon} 
            alt="oups"
            sx={()=>({
                width: "400px",
                '@media (max-width: 400px)':{
                    width:"300px"
                }
            })} 
            />
        </Center>
        
     );
}
 
export default NotAuth;