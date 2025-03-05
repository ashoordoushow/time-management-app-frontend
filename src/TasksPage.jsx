import axios from "axios";
import { useState, useEffect } from "react";
import { TasksIndex } from "./TasksIndex";

export function TasksPage() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  const handleIndex = () => {
    axios.get("http://localhost:3000/tasks.json").then((response) => {
      setTasks(response.data);
    });
  };

  // Handle task creation & updates
  const handleUpdateTask = (updatedTask) => {
    if (!updatedTask.id) {
      // Create a new task
      axios
        .post("http://localhost:3000/tasks.json", updatedTask)
        .then((response) => {
          setTasks((prevTasks) => [...prevTasks, response.data]); 
        })
        .catch((error) => {
          console.error("Error creating task:", error);
        });
    } else {
      // Update an existing task
      axios
        .patch(`http://localhost:3000/tasks/${updatedTask.id}.json`, updatedTask)
        .then((response) => {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === response.data.id ? response.data : task
            )
          );
        })
        .catch((error) => {
          console.error("Error updating task:", error);
        });
    }
  };

  // ✅ Handle task deletion (Resets the pie chart section to "Unassigned")
  const handleDeleteTask = (taskId) => {
    axios
      .delete(`http://localhost:3000/tasks/${taskId}.json`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  useEffect(handleIndex, []);

  return (
    <main>
      <TasksIndex 
        tasks={tasks} 
        onUpdateTask={handleUpdateTask} 
        onDeleteTask={handleDeleteTask} 
      />
    </main>
  );
}
