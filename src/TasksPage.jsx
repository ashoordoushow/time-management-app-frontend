import { useState, useEffect } from "react";
import apiClient from "./config/axios"; // Importing API client
import { TasksIndex } from "./TasksIndex";

export function TasksPage() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  const handleIndex = () => {
    apiClient.get("/tasks.json").then((response) => {
      setTasks(response.data);
    }).catch((error) => {
      console.error("Error fetching tasks:", error);
    });
  };

  // Handle task creation & updates
  const handleUpdateTask = (updatedTask) => {
    if (!updatedTask.id) {
      // Create a new task
      apiClient
        .post("/tasks.json", updatedTask)
        .then((response) => {
          setTasks((prevTasks) => [...prevTasks, response.data]); 
        })
        .catch((error) => {
          console.error("Error creating task:", error);
        });
    } else {
      // Update an existing task
      apiClient
        .patch(`/tasks/${updatedTask.id}.json`, updatedTask)
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
    apiClient
      .delete(`/tasks/${taskId}.json`)
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
