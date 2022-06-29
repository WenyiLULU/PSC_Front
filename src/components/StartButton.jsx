import { Button } from '@mantine/core'

const StartButton = ({ setLoginModalOpen }) => {
  return (
      <Button 
      radius="lg" 
      size= "lg" 
      style={{
        backgroundColor:"#7FC9CD", 
        marginTop:"20px",   
      }} 
      sx={()=>({
        height:"40px", 
        width:"300px",
        boxShadow: "4px 4px #302e36",
        
        '@media (max-width: 400px)': {
        height:"30px", 
        width:"200px",
        boxShadow: "3px 3px #302e36",
        frontSize:"15px",
        }
      })}

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
