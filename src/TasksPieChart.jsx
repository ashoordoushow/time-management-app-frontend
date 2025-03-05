import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const TasksPieChart = ({ tasks }) => {
  // Define colors for priorities
  const priorityColors = { 
    1: "#FF0000",  // High Priority - Red
    2: "#FFA500",  // Medium Priority - Orange
    3: "#00FF00"   // Low Priority - Green
  };

  // Transform tasks into a format suitable for the pie chart
  const data = tasks.map(task => ({
    name: task.title,
    value: task.required_time || 30, // Default 30 minutes if not set
    color: priorityColors[task.priority] || "#0000FF" // Default Blue if no priority
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie data={data} dataKey="value" nameKey="name" outerRadius={150} fill="#8884d8">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default TasksPieChart;
