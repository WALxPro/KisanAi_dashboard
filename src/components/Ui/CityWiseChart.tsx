// src/dashboard/components/CityWiseChart.tsx
import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";
// src/dashboard/data/cityWiseData.ts
 const cityWiseData = [
  { city: "Lahore", farmers: 40 },
  { city: "Karachi", farmers: 55 },
  { city: "Islamabad", farmers: 30 },
  { city: "Multan", farmers: 20 },
  { city: "Faisalabad", farmers: 25 },
];


// Optional colors
const COLORS = ["#1976d2", "#4caf50", "#f44336", "#ff9800", "#9c27b0"];

const CityWiseChart: React.FC = () => {
  return (
    <Card sx={{ borderRadius: 3,backgroundColor:"background.default" , p:3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          City-wise Farmer Distribution
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={cityWiseData}
              dataKey="farmers"
              nameKey="city"
              cx="50%"
              cy="50%"
              innerRadius={0} // Makes it doughnut style
              outerRadius={120}
              paddingAngle={0}
              label
            >
              {cityWiseData.map((entry, index) => (
                <Cell  key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CityWiseChart;
