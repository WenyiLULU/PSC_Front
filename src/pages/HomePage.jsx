import React, { useState } from "react";
import Login from "../modals/Login";
import StartButton from "../components/StartButton";
import Signup from "../modals/Signup";

import { BackgroundImage, Center, Text, Box, Title,Image } from '@mantine/core';
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
            height={150}
            width={150}
            color={"red"}
            src={logo}
            alt="logo"
          />
          <Title order={1} style={{color:"#302e36", fontSize: "60px", marginLeft:"20px", textShadow: "4px 4px #7fc9cd" }}>
             Pets Social Club
            </Title>
          </div>
            
          <Title order={2} style={{color:"#302e36",fontSize: "50px", margin:"30px 0"}}>
            Come play with me !
          </Title>
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
      </BackgroundImage>
  );
}

export default HomePage;
