import axios from "axios";
import { useState, useEffect } from "react";
import { TasksIndex } from "./TasksIndex";
import { TasksNew } from "./TasksNew";
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

   const handleShow = (task) => {
       console.log("handleShow", task);
       setIsTasksShowVisible(true);
       setCurrentTask(task);
     };

    const handleUpdate = (id, params, successCallback) => {
        console.log("handleUpdate", params);
        axios.patch(`http://localhost:3000/tasks/${id}.json`, params).then((response) => {
          setTasks(
            tasks.map((task) => {
              if (task.id === response.data.id) {
                return response.data;
              } else {
                return task;
              }
            })
          );
          successCallback();
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
      <TasksNew onCreate={handleCreate} />
      <TasksIndex tasks={tasks} onShow={handleShow} />
      <Modal show={isTasksShowVisible} onClose={handleClose}>
        <TasksShow task={currentTask} onUpdate={handleUpdate} />
      </Modal>
    </main>
  );
}