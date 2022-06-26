import React, { useContext, useState } from 'react'
import { ActionIcon, Anchor, AppShell, Box, Header, Image, Navbar, Title, MediaQuery, Burger, Text, useMantineTheme, Footer } from '@mantine/core'
import { NavLink, useMatch } from 'react-router-dom'
import logo from '../assets/logo_b.svg'
import logoutIcon from '../assets/logout.png'
import { SessionContext } from '../context/SessionContext'


function Layout({children}) {
    const theme = useMantineTheme();
    const match = useMatch('/');
    //const notFound = useMatch('*')
    const [opened, setOpened] = useState(false);
    const { userId, isAuthenticated, logout } = useContext(SessionContext)
    //console.log(notFound)
    return (
    <>
      {match !== null ? 
        <>{children}</> 
        : <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        fixed
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>

            <Anchor component={NavLink} to={isAuthenticated ? "/user/dashboard" : "/notauth"}>
            Dashboard
            </Anchor>
            <hr />
            <Anchor component={NavLink} to={isAuthenticated ? "/user/calendar/:userId" : "/notauth"}>
              My Calendar
            </Anchor>
            <Anchor component={NavLink} to={isAuthenticated ? "/user/pets":"/notauth"}>
              My Pets
            </Anchor>
            <Anchor component={NavLink} to={isAuthenticated ? `/user/${userId}`: "/notauth"}>
              My Profile
            </Anchor>

          <hr />
        <ActionIcon onClick={logout}>
          <img src={logoutIcon} alt="Logout" />
        </ActionIcon>

          </Navbar>
        }
        footer={
          <Footer height={40} p="md">
            Ironhack 2022
          </Footer>
        }
        header={
          <Header height={70} p="md">

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <div style={{display: 'flex', justifyContent: 'right', alignItems: 'center', width: '100vw'}}>
                <Image 
                  height={50}
                  width={50} 
                  color={"red"}
                  src={logo} 
                  alt="logo" />
                <Text style={{marginLeft: '2vw'}}>Pet Social Club</Text>
              </div>
                
              
            </div>
          </Header>
        }
      >
        {children}
        </AppShell>

     }
    </>
  )
}

export default Layout