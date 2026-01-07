import { Button } from "@mui/material";
import React from "react";

interface ButtonProps {
  name: string; 
  onClick?: () => void; 
}

const PrimaryButton: React.FC<ButtonProps> = ({ name, onClick }) => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{ mt: 3, mb: 2, backgroundColor: "primary.main" , color:"background.default" , py: 1 , fontSize:"18px"}}
      onClick={onClick}
    >
      {name}
    </Button>
  );
};

export default PrimaryButton;
