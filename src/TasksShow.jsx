export function TasksShow({ task }) {
  return (
    <div>
      <h1>Task information</h1>
      <p>Title: {task.title}</p>
      <p>URL: {task.url}</p>
      <p>Start_Time: {task.start_time}</p>
      <p>End_Time: {task.end_time}</p>
      <p>Description: {task.description}</p>
    </div>
  );
}