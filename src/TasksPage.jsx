import axios from "axios";
import { useState, useEffect } from "react";
import { TasksIndex } from "./TasksIndex";

export function TasksPage() {

  const [tasks, setTasks] = useState([]);

  const handleIndex = () => {
    console.log("handleIndex");
    axios.get("http://localhost:3000/tasks.json").then((response) => {
      console.log(response.data);
      setTasks(response.data);
    });
  };

  useEffect(handleIndex, []);

  return (
    <main>
      <TasksIndex tasks={tasks} />
    </main>
  );
}