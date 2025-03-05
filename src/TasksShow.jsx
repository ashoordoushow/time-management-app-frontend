import { useEffect } from "react";

export function TasksShow({ task, onUpdate, onDestroy }) {
  
  useEffect(() => {
    if (task.reminder && task.priority === 1) {
      if (Notification.permission === "granted") {
        new Notification("Reminder", { body: `Focus on ${task.title}!` });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((perm) => {
          if (perm === "granted") {
            new Notification("Reminder", { body: `Focus on ${task.title}!` });
          }
        });
      }
    }
  }, [task]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    onUpdate(task.id, params, () => event.target.reset());
  };

  return (
    <div>
      <h1>Task information</h1>
      <p><strong>Title:</strong> {task.title}</p>
      <p><strong>URL:</strong> {task.url}</p>
      <p><strong>Start Time:</strong> {task.start_time}</p>
      <p><strong>End Time:</strong> {task.end_time}</p>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Priority:</strong> {task.priority === 1 ? "High" : task.priority === 2 ? "Medium" : "Low"}</p>
      <p><strong>Required Time:</strong> {task.required_time} minutes</p>
      <p><strong>Reminder:</strong> {task.reminder ? "Enabled" : "Disabled"}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label> 
          <input defaultValue={task.title} name="title" type="text" />
        </div>
        <div>
          <label>URL:</label> 
          <input defaultValue={task.url} name="url" type="text" />
        </div>
        <div>
          <label>Start Time:</label> 
          <input defaultValue={task.start_time} name="start_time" type="datetime-local" />
        </div>
        <div>
          <label>End Time:</label> 
          <input defaultValue={task.end_time} name="end_time" type="datetime-local" />
        </div>
        <div>
          <label>Description:</label> 
          <input defaultValue={task.description} name="description" type="text" />
        </div>
        <div>
          <label>Priority:</label>
          <select name="priority" defaultValue={task.priority}>
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
          </select>
        </div>
        <div>
          <label>Required Time (Minutes):</label> 
          <input defaultValue={task.required_time} name="required_time" type="number" min="1" />
        </div>
        <div>
          <label>Reminder:</label>
          <input type="checkbox" name="reminder" defaultChecked={task.reminder} />
        </div>
        <button type="submit">Update</button>
      </form>
      <button onClick={() => onDestroy(task.id)}>Destroy</button>
    </div>
  );
}
