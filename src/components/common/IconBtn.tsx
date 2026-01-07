import { Button, CircularProgress } from "@mui/material";
import React from "react";

interface IconButtonProps {
  icon: React.ReactNode;
  text?: string;
  width?: string | number;
  onClick?: () => void;
  loading?: boolean;   
  disabled?: boolean;  
}

const IconBtn: React.FC<IconButtonProps> = ({
  icon,
  text,
  width = "100%",
  onClick,
  loading = false,
  disabled = false,
}) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      disabled={disabled || loading} // 🔒 disable on loading
      sx={{
        width,
        minWidth: 0,
        borderColor: "primary.main",
        color: "primary.main",
        py: 1,
        fontSize: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: text ? 1 : 0,
      }}
    >
      {loading ? (
        <CircularProgress size={22} color="inherit" />
      ) : (
        <>
          {icon}
          {text && text}
        </>
      )}
    </Button>
  );
};

export default IconBtn;
