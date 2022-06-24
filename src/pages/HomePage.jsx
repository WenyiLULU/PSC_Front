import React, { useState } from "react";
import { Button, Center } from "@mantine/core";
import Login from "../modals/Login";
import StartButton from "../components/StartButton";
import Signup from "../modals/Signup";

function HomePage() {
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  return (
    <Center style={{ width: 400, height: 200 }}>
      <div>
        <h1>The Home Page</h1>
        <p>Hello World!</p>
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
      </div>
    </Center>
  );
}

export default HomePage;
