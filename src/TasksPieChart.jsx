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

      {/* ✅ Task Edit Modal (Fixed Visibility Issues) */}
      {isEditing && selectedTask && (
        <div style={styles.modal}>
          <h3 style={styles.title}>{selectedTask.id ? "Edit Task" : "Create Task"}</h3>
          <form onSubmit={handleFormSubmit} style={styles.form}>
            <div>
              <label style={styles.label}>Task Name:</label>
              <input type="text" name="title" defaultValue={selectedTask.title} required style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>Priority:</label>
              <select name="priority" defaultValue={selectedTask.priority} style={styles.input}>
                {priorityColors.map((item, index) => (
                  <option key={index} value={index + 1}>{item.meaning}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={styles.label}>Required Time (Minutes):</label>
              <input type="number" name="required_time" defaultValue={selectedTask.required_time} min="1" required style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>Reminder:</label>
              <input type="checkbox" name="reminder" defaultChecked={selectedTask.reminder} />
            </div>
            <button type="submit" style={styles.button}>Save</button>
            {selectedTask.id && <button type="button" onClick={handleDelete} style={styles.deleteButton}>Delete</button>}
            <button type="button" onClick={() => setIsEditing(false)} style={styles.cancelButton}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

const styles = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    color: "#000",
  },
  title: { fontSize: "18px", fontWeight: "bold", textAlign: "center", color: "#333" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  label: { fontWeight: "bold", color: "#222" },
  input: { padding: "8px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px", background: "#fff", color: "#000" },
  button: { backgroundColor: "#007bff", color: "#fff", padding: "8px", borderRadius: "4px", cursor: "pointer" },
  deleteButton: { backgroundColor: "#dc3545", color: "#fff", padding: "8px", borderRadius: "4px", cursor: "pointer" },
  cancelButton: { backgroundColor: "#6c757d", color: "#fff", padding: "8px", borderRadius: "4px", cursor: "pointer" },
};

export default TasksPieChart;
