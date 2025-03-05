import axios from "axios";
import { useState, useEffect } from "react";
import { TasksIndex } from "./TasksIndex";
import { Modal } from "./Modal";
import { TasksShow } from "./TasksShow";

export function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [isTasksShowVisible, setIsTasksShowVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

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

  const handleTaskSwitch = (selectedTask) => {
    if (selectedTask.required_time > 0) {
      alert(`You must complete at least ${selectedTask.required_time} minutes before switching tasks!`);
      return;
    }
    handleShow(selectedTask);
  };

  const handleShow = (task) => {
    console.log("handleShow", task);
    setIsTasksShowVisible(true);
    setCurrentTask(task);
  };

  const handleUpdate = (id, params, successCallback) => {
    console.log("handleUpdate", params);
    axios.patch(`http://localhost:3000/tasks/${id}.json`, params).then((response) => {
      setTasks(
        tasks.map((task) => (task.id === response.data.id ? response.data : task))
      );
      successCallback();
      handleClose();
    });
  };

  const handleDestroy = (id) => {
    console.log("handleDestroy", id);
    axios.delete(`http://localhost:3000/tasks/${id}.json`).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
      handleClose();
    });
  };

  const handleClose = () => {
    console.log("handleClose");
    setIsTasksShowVisible(false);
  };

  useEffect(handleIndex, []);

  return (
    <main>
      {/* REMOVED: <TasksNew onCreate={handleCreate} /> */}
      <TasksIndex tasks={tasks} onShow={handleTaskSwitch} />
      <Modal show={isTasksShowVisible} onClose={handleClose}>
        <TasksShow task={currentTask} onUpdate={handleUpdate} onDestroy={handleDestroy} />
      </Modal>
    </main>
  );
}
