import { Button } from "@mui/material";
import React from "react";

interface ButtonProps {
  name: string; 
  onClick?: () => void; 
}

const SecondaryButton: React.FC<ButtonProps> = ({ name, onClick }) => {
  return (
    <Button
      variant="outlined"
      fullWidth
      sx={{ mt: 3, mb: 2, borderColor: "primary.main" , color:"primary.main" , py: 1 , fontSize:"18px"}}
      onClick={onClick}
    >
      {name}
    </Button>
  );
};

export default SecondaryButton;
