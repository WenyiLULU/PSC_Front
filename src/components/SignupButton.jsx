import { Button } from '@mantine/core'

const SignupButton = ({ setLoginModalOpen, setSignupModalOpen }) => {
  return (
      <Button onClick={() => {
        setLoginModalOpen(false)
        setSignupModalOpen(true)        
        }}>
      Signup
    </Button>

  )
}

export default SignupButton
