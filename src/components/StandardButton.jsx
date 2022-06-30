import { Button } from "@mantine/core";

const StandardButton = ({ setModalOpen, children }) => {
  return (
    <Button
      radius="lg"
      size="xs"
      variant="outline" 
      color="#7FC9CD" 
      style={{
        boxShadow: "2px 2px #302e36",
        margin:"0 10px", 
        background:"#e0f5eb",  
      }} 
      sx={()=>({
        height:"40px", 
        width:"100px",
        margin:"0 10px",
        '@media (max-width: 400px)': {
        height:"30px", 
        width:"100px",
        margin:"0 5px",
        }
      })}
      onClick={() => {
        // condition if logged in => redirect to Dashboard
        // else => open login modal
        setModalOpen(true);
      }}
    >
      {children}
    </Button>
  );
};

export default StandardButton;
