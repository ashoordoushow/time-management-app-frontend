import TasksPieChart from "./TasksPieChart"; // Import the pie chart component

export function TasksIndex({ tasks }) {
  return (
    <div>
      {/* Pie Chart for Task Priority Breakdown */}
      <h2>Task Priority Breakdown</h2>
      <TasksPieChart tasks={tasks} />
    </div>
  );
}
