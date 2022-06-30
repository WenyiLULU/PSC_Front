import React, { useState } from "react";
import Login from "../modals/Login";
import StartButton from "../components/StartButton";
import Signup from "../modals/Signup";
import dog from "../assets/dog_1.gif"

import { BackgroundImage, Center, Box, Image } from '@mantine/core';
import bacgroudImg from "../assets/background.png"
import logo from "../assets/logo_v3_shadow.svg"


function HomePage() {
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  return (
    <BackgroundImage
        src={bacgroudImg}
        radius="xs"
        style={{height:"100vh"}}
      >
        <Center style={{display: "flex", flexDirection:"column", margin:"0 auto", width: "100%", height: "100%" }}>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
          <Image
            src={logo}
            alt="logo"
            sx={()=>({
              height: "150px",
              width:"150px",
              '@media (max-width: 400px)': {
                height:"60px",
                width:"60px",
              }
            })}
          />
          <Box 
            style={{color:"#302e36", marginLeft:"20px", textShadow: "3px 3px #7fc9cd", fontWeight:"bold" }}
            sx={()=>({
              fontSize: "60px",
              '@media (max-width: 400px)': {
                fontSize: "30px"
              }
            })}
            >
             Pets Social Club
            </Box>
          </div>
            
          <Box 
            style={{color:"#302e36", margin:"30px 0",textShadow: "2px 2px #7fc9cd", fontWeight:"bold"}}
            sx={()=>({
              fontSize: "50px",
              '@media (max-width: 400px)': {
                fontSize: "25px"
              }
            })}
          >
            Come play with me !
          </Box>
          <StartButton setLoginModalOpen={setLoginModalOpen} />
          <Image
            src={dog}
            alt="dog walking"
            sx={()=>({
              width:"300px",
              '@media (max-width: 400px)': {
                width:"100px",
              }
            })}
          />
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
      </BackgroundImage>
  );
}

export default HomePage;
