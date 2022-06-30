import raccoon from "../assets/raccoon.png"
import {Image, Center} from "@mantine/core"
import { useState } from "react";
import Login from "../modals/Login";
import StartButton from "../components/StartButton";
import Signup from "../modals/Signup";

const NotAuth = () => {
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

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
            <StartButton setLoginModalOpen={setLoginModalOpen} />
            <Login
                loginModalOpen={loginModalOpen}
                setLoginModalOpen={setLoginModalOpen}
                setSignupModalOpen={setSignupModalOpen}
            />
            <Signup
                signupModalOpen={signupModalOpen}
                setSignupModalOpen={setSignupModalOpen}
            />
        </Center>
        
        );
}
 
export default NotAuth;