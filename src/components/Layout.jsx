import React, { useState } from 'react'
import { ActionIcon, Anchor, AppShell, Box, Header, Image, Navbar, Title, MediaQuery, Burger, Text, useMantineTheme, Footer } from '@mantine/core'
import { NavLink, useMatch } from 'react-router-dom'

function Layout({children}) {
    const theme = useMantineTheme();
    const match = useMatch('/');
    const [opened, setOpened] = useState(false);
    // console.log(match)
    return (
    <>
      {match === null && 
        <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        fixed
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
            <Anchor component={NavLink} to="/user/dashboard">
          Dashboard
        </Anchor>
        <Anchor component={NavLink} to="/user/calendar/:userId">
          My Calendar
        </Anchor>
        <Anchor component={NavLink} to="/user/pets">
          My Pets
        </Anchor>
        <Anchor component={NavLink} to="/user/:userId">
          My Profile
        </Anchor>
        <Anchor component={NavLink} to="/">
          Logout
        </Anchor>
          </Navbar>
        }
        footer={
          <Footer height={40} p="md">
            Ironhack 2022
          </Footer>
        }
        header={
          <Header height={70} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Image src="../../public/logo_b.svg" alt="logo" />
              <Text>PSC Pet Social Club</Text>
            </div>
          </Header>
        }
      >
        {children}
        </AppShell>}

    {match !== null  && <>{children}</>}
    </>
  )
}

export default Layout