// src/dashboard/components/CropWiseChart.tsx
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

// Dummy data (Crop-wise farmer queries)
const cropWiseData = [
  { crop: "Wheat", queries: 120 },
  { crop: "Rice", queries: 95 },
  { crop: "Maize", queries: 70 },
  { crop: "Cotton", queries: 60 },
  { crop: "Sugarcane", queries: 45 },
  { crop: "Sugarcane", queries: 45 },
  { crop: "Sugarcane", queries: 45 },
  { crop: "Sugarcane", queries: 45 },
  { crop: "Sugarcane", queries: 45 },
];

const CropWiseChart: React.FC = () => {
  return (
    <Card sx={{ borderRadius: 3,p:3,backgroundColor:"background.default" }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Crop-wise Farmer Queries
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cropWiseData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="crop" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="queries"
              radius={[6, 6, 0, 0]}
              fill="#1976d2" // Blue color
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CropWiseChart;
