import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

interface DashCardProps {
  icon: React.ReactNode;
  label?: string;
  count?: number;
  color?: string; // icon color
}

const DashCard: React.FC<DashCardProps> = ({
  icon,
  label,
  count,
  color = "#1976d2", // default MUI primary
}) => {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        backgroundColor: "#fff",
      }}
    >
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        {/* Icon */}
        <Box
          sx={{
            fontSize: 40,
            color: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: `${color}15`, // light background
          }}
        >
          {icon}
        </Box>

        {/* Text */}
        <Box>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            {count}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DashCard;
