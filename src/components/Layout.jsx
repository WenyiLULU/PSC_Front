import React, { useContext, useState } from "react";
import {
  ActionIcon,
  Anchor,
  AppShell,
  Header,
  Image,
  Navbar,
  MediaQuery,
  Burger,
  Text,
  useMantineTheme,
  Footer,
} from "@mantine/core";
import { NavLink, useMatch } from "react-router-dom";
import logo from "../assets/logo_w.svg";
import logoutIcon from "../assets/logout.png";
import { SessionContext } from "../context/SessionContext";
import { LayoutDashboard, CalendarStats, Bone, User } from "tabler-icons-react";
function Layout({ children }) {
  const theme = useMantineTheme();
  const match = useMatch("/");
  //const notFound = useMatch('*')
  const [opened, setOpened] = useState(false);
  const { userId, isAuthenticated, logout } = useContext(SessionContext);
  //console.log(notFound)
  return (
    <>
      {match !== null ? (
        <>{children}</>
      ) : (
        <AppShell

          styles={{
            main: {
              background: "#F0FAF5",
              color:"#302e36",
            },
          }}
          navbarOffsetBreakpoint="sm"
          fixed
          navbar={
            <Navbar
              onClick={() => setOpened((o) => !o)}
              p="lg"
              hiddenBreakpoint="sm"
              hidden={!opened}
              width={{ sm: 200, lg: 200 }}
              style={{
                background:"#F0FAF5",
                paddingLeft:"20px",
                boxShadow:"4px 0px 10px 0px #b5b2bd"
                }}
                
            >
              <Anchor
                component={NavLink}
                to={isAuthenticated ? "/user/dashboard" : "/notauth"}
              >
                <LayoutDashboard size={20} /> Dashboard
              </Anchor>
              <hr />
              <Anchor
                component={NavLink}
                to={isAuthenticated ? `/user/calendar/${userId}` : "/notauth"}
              >
                <CalendarStats size={20} /> My Calendar
              </Anchor>
              <Anchor
                component={NavLink}
                to={isAuthenticated ? "/user/pets" : "/notauth"}
              >
                <Bone size={20} /> My Pets
              </Anchor>
              <Anchor
                component={NavLink}
                to={isAuthenticated ? `/user/${userId}` : "/notauth"}
              >
                <User size={20} /> My Profile
              </Anchor>

              <hr />
              <ActionIcon onClick={logout}>
                <img src={logoutIcon} alt="Logout" />
              </ActionIcon>
            </Navbar>
          }
          footer={
            <Footer 
              height={40} 
              p="md"
              style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                background:"#95b1db",
                color:"white"
              }}
            >
              <Text>Ironhack 2022</Text>
              <div>© Esteban B | Sebastian M | Wenyi L</div>
            </Footer>
          }
          header={
            <Header
              height={70}
              p="md"
              style={{
              background:"#95b1db",
              boxShadow:"0px 4px 10px 1px #b5b2bd",
              border:"0"
              }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "100%",
                  color:"white",
                  fontWeight:"bold",
                }}
              >
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[2]}
                    mr="xl"
                  />
                </MediaQuery>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                    width: "100vw",
                  }}
                >
                  <Image
                    height={50}
                    width={50}
                    color={"red"}
                    src={logo}
                    alt="logo"
                  />
                  <Text style={{ marginLeft: "2vw", fontSize:"22px" }}>Pet Social Club</Text>
                </div>
              </div>
            </Header>
          }
        >
          {children}
        </AppShell>
      )}
    </>
  );
}

export default Layout;
