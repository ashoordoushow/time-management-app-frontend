import axios from "axios";
import { useState, useEffect } from "react";
import { TasksIndex } from "./TasksIndex";
import { TasksNew } from "./TasksNew";

export function TasksPage() {

  const [tasks, setTasks] = useState([]);

  const handleIndex = () => {
    console.log("handleIndex");
    axios.get("http://localhost:3000/tasks.json").then((response) => {
      console.log(response.data);
      setTasks(response.data);
    });
  };

  const handleCreate = (params, successCallback) => {
      console.log("handleCreate", params);
      axios.post("http://localhost:3000/tasks.json", params).then((response) => {
        setTasks([...tasks, response.data]);
        successCallback();
      });
    };

useEffect(handleIndex, []);

  return (
    <main>
      <TasksNew onCreate={handleCreate} />
      <TasksIndex tasks={tasks} />
    </main>
  );
}