import { Button } from '@mantine/core'

const StartButton = ({ setLoginModalOpen }) => {
  return (
      <Button onClick={() => {
        // condition if logged in => redirect to Dashboard
        // else => open login modal
        setLoginModalOpen(true)
        }
      }
    >
      Start
    </Button>

  )
}

export default StartButton
