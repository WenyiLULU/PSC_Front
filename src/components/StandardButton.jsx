import { Button } from '@mantine/core'

const StandardButton = ({ setEditModalOpen, children }) => {
  return (
      <Button onClick={() => {
        // condition if logged in => redirect to Dashboard
        // else => open login modal
        setEditModalOpen(true)
        }
      }
    >
      {children}
    </Button>

  )
}

export default StandardButton