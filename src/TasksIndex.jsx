export function TasksIndex({ tasks }) {
  return (
    <div>
      <h1>All tasks</h1>
      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <img src={task.url} />
          <p>Start_Time: {task.start_time}</p>
          <p>End_Time: {task.end_time}</p>
          <p>Description: {task.description}</p>
        </div>
      ))}
    </div>
  );
}