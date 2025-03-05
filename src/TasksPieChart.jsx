import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useState, useEffect } from "react";

const TasksPieChart = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const priorityColors = [
    { color: "#FF0000", meaning: "Urgent/High Priority" },
    { color: "#FFA500", meaning: "Important but not urgent" },
    { color: "#FFFF00", meaning: "Pending/Medium Priority" },
    { color: "#00FF00", meaning: "Completed" },
    { color: "#0000FF", meaning: "Work/Meetings" },
    { color: "#800080", meaning: "Personal/Creative tasks" },
    { color: "#808080", meaning: "Low priority/Deferred" },
    { color: "#000000", meaning: "Default/Unassigned" },
  ];

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedTask && selectedTask.id) {
      const updatedTask = tasks.find((task) => task.id === selectedTask.id);
      if (updatedTask) {
        setSelectedTask(updatedTask);
      }
    }
  }, [tasks]);

  const priorityData = Array.from({ length: 8 }, (_, index) => {
    const matchingTask = tasks.find(task => task.priority === index + 1);
    return {
      id: matchingTask ? matchingTask.id : null,
      name: matchingTask ? matchingTask.title : `Unassigned Task ${index + 1}`,
      value: matchingTask ? matchingTask.required_time || 30 : 10,
      color: matchingTask ? priorityColors[index].color : "#000000",
      priority: index + 1
    };
  });

  // ✅ Fix: Make Pie Chart Clickable Again!
  const handleSectionClick = (data, index) => {
    if (data && index !== undefined) {
      const selectedData = priorityData[index];
      const taskToEdit = tasks.find(task => task.priority === selectedData.priority);
  
      setSelectedTask(
        taskToEdit || {
          id: null, 
          title: "",
          priority: selectedData.priority,
          required_time: 30,
          reminder: false, 
        }
      );
      setIsEditing(true);
    }
  };

  // ✅ Handle Save/Update Task
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const updatedTask = {
      id: selectedTask.id || null, 
      title: formData.get("title"),
      priority: parseInt(formData.get("priority")),
      required_time: parseInt(formData.get("required_time")),
      reminder: formData.get("reminder") === "on",
    };

    onUpdateTask(updatedTask);
    setIsEditing(false);
  };

  // ✅ Handle Delete Task
  const handleDelete = () => {
    if (selectedTask?.id) {
      onDeleteTask(selectedTask.id);
    }
    setIsEditing(false);
    setSelectedTask(null);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "50px" }}>
      {/* ✅ Left Side: Task Labels */}
      <div style={{ fontSize: "22px", textAlign: "right", minWidth: "250px" }}>
        <h3 style={{ fontSize: "26px", marginBottom: "10px" }}>Tasks</h3>
        {priorityData.map((entry, index) => (
          <div key={index} style={{ margin: "8px 0", fontWeight: "bold" }}>
            <span style={{ color: entry.color, fontSize: "24px" }}>●</span> {entry.name}
          </div>
        ))}
      </div>

      {/* ✅ Center: Pie Chart */}
      <PieChart width={600} height={600}>
        <Pie 
          data={priorityData} 
          dataKey="value" 
          nameKey="name" 
          outerRadius={220}  
          onClick={handleSectionClick} 
        >
          {priorityData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} onClick={() => handleSectionClick(entry, index)} /> 
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* ✅ Right Side: Legend */}
      <div style={{ fontSize: "22px", textAlign: "left", minWidth: "250px" }}>
        <h3 style={{ fontSize: "26px", marginBottom: "10px" }}>Priority Levels</h3>
        {priorityColors.map((item, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <div style={{
              width: "30px",
              height: "30px",
              backgroundColor: item.color,
              marginRight: "15px",
              border: "2px solid black"
            }}></div>
            <span>{item.meaning}</span>
          </div>
        ))}
      </div>

      {/* ✅ Task Edit Modal */}
      {isEditing && selectedTask && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", padding: "20px", border: "1px solid black", background: "#fff" }}>
          <h3>{selectedTask.id ? "Edit Task" : "Create Task"}</h3>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Task Name: </label>
              <input type="text" name="title" defaultValue={selectedTask.title} required />
            </div>
            <div>
              <label>Priority: </label>
              <select name="priority" defaultValue={selectedTask.priority}>
                {priorityColors.map((item, index) => (
                  <option key={index} value={index + 1}>{item.meaning}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Required Time (Minutes): </label>
              <input type="number" name="required_time" defaultValue={selectedTask.required_time} min="1" required />
            </div>
            <div>
              <label>Reminder: </label>
              <input type="checkbox" name="reminder" defaultChecked={selectedTask.reminder} />
            </div>
            <button type="submit">{selectedTask.id ? "Update" : "Save"}</button>
            {selectedTask.id && <button type="button" onClick={handleDelete}>Delete</button>}
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TasksPieChart;
