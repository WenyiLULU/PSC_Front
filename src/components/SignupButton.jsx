import { Button } from '@mantine/core'

const SignupButton = ({ setLoginModalOpen, setSignupModalOpen }) => {
  return (
      <Button 
        radius="lg" 
        size="md" 
        style={{
          backgroundColor:"#7FC9CD", 
          boxShadow: "2px 2px 2px 0 #302e36"
        }} 
        onClick={() => {
        setLoginModalOpen(false)
        setSignupModalOpen(true)        
        }}>
      Signup
    </Button>

  )
}

export default SignupButton
