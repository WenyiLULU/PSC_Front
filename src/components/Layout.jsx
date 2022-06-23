import React, { useState } from 'react'
import { ActionIcon, Anchor, AppShell, Box, Header, Image, Navbar, Title, MediaQuery, Burger, Text, useMantineTheme, Footer } from '@mantine/core'

function Layout({children}) {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
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
        <Text>Application navbar</Text>
      </Navbar>
    }
    footer={
      <Footer height={40} p="md">
        Hi, I'm a footer
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

          <Text>Application header</Text>
        </div>
      </Header>
    }
  >
    <Text>Resize app to see responsive navbar in action</Text>
    {children}
    </AppShell>
  )
}

export default Layout