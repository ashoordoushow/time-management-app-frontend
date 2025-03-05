import TasksPieChart from "./TasksPieChart";

export function TasksIndex({ tasks, onUpdateTask, onDeleteTask }) {
  return (
    <div>
      <h2>Task Priority Breakdown</h2>
      {/* ✅ Now correctly passing onDeleteTask */}
      <TasksPieChart 
        tasks={tasks} 
        onUpdateTask={onUpdateTask} 
        onDeleteTask={onDeleteTask} 
      />
    </div>
  );
}
