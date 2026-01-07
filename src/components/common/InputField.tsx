import React, { ChangeEvent } from "react";
import { TextField, InputAdornment } from "@mui/material";

interface InputProps {
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode; // Icon inside input
  label?: string;         // Input label
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  name,
  value,
  onChange,
  icon,
  label,
}) => {
  return (
    <div className="w-full mb-4">
      <TextField
        fullWidth
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
        variant="outlined"
        className="bg-gray-100 rounded-md" // Tailwind background + rounded
        InputProps={{
          startAdornment: icon ? (
            <InputAdornment position="start">
              <span className="text-gray-400">{icon}</span>
            </InputAdornment>
          ) : null,
          className: "text-gray-700 text-sm h-14", // Tailwind text color & height
        }}
        InputLabelProps={{
          className: "text-gray-700 text-sm font-medium",
        }}
      />
    </div>
  );
};

export default Input;
