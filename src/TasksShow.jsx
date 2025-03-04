export function TasksShow({ task, onUpdate, onDestroy }) {
        
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    onUpdate(task.id, params, () => event.target.reset());
  };

  return (
    <div>
      <h1>Task information</h1>
      <p>Title: {task.title}</p>
      <p>URL: {task.url}</p>
      <p>Start_Time: {task.start_time}</p>
      <p>End_Time: {task.end_time}</p>
      <p>Description: {task.description}</p>
      <form onSubmit={handleSubmit}>
        <div>
          Title: <input defaultValue={task.title} name="title" type="text" />
        </div>
        <div>
          Url: <input defaultValue={task.url} name="url" type="text" />
        </div>
        <div>
          Start_Time: <input defaultValue={task.start_time} name="start_time" type="datetime" />
        </div>
        <div>
          End_Time: <input defaultValue={task.end_time} name="end_time" type="datetime" />
        </div>
        <div>
          Description: <input defaultValue={task.description} name="description" type="text" />
        </div>
        <button type="submit">Update</button>
      </form>
      <button onClick={() => onDestroy(task.id)}>Destroy</button>
    </div>
  );
}