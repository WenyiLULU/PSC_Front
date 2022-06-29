import { Button } from '@mantine/core'

const StartButton = ({ setLoginModalOpen }) => {
  return (
      <Button radius="lg" size="25px" style={{backgroundColor:"#7FC9CD", marginTop:"20px", width:"300px", height:"40px", boxShadow: "4px 4px #302e36"}} 
      onClick={() => {
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
