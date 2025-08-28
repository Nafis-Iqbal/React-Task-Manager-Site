import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface BarChartProps {
  data: { completed: number; ongoing: number };
}

const CustomBarChart: React.FC<BarChartProps> = ({ data }) => {
  // Transform data into an array format for Recharts
  const chartData = [
    { name: "Completed", value: data.completed },
    { name: "Ongoing", value: data.ongoing },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData} layout="vertical">
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Bar dataKey="value" fill="#4CAF50" name="Tasks" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
