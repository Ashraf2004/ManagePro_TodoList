import React, { useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import UserProfile from "./components/UserProfile"; 
import { MdDarkMode, MdSunny } from "react-icons/md";

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);

  const addTask = (title, assignedMember) => {
    const newTask = { id: Date.now(), title, completed: false, assignedMember };
    setTasks([...tasks, newTask]);
  };

  const editTask = (id, title) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, title } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const getRemainingTasks = () => tasks.filter((task) => !task.completed);

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <div style={{ backgroundColor: darkTheme ? "#111" : "#f0f0f0", color: darkTheme ? "white" : "black", transition: "background-color 0.5s, color 0.5s", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navigation Bar */}
      <div style={{ width: "100%", backgroundColor: darkTheme ? "#333" : "#ddd", color: darkTheme ? "white" : "black", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
        <UserProfile />
        <div>
          {darkTheme ? (
            <MdSunny
              onClick={toggleTheme}
              style={{ backgroundColor: "#ccc", cursor: "pointer", padding: "0.5rem", borderRadius: "50%", color: "white", fontSize: "1.5rem" }}
            />
          ) : (
            <MdDarkMode
              onClick={toggleTheme}
              style={{ backgroundColor: "#ccc", cursor: "pointer", padding: "0.5rem", borderRadius: "50%", color: "black", fontSize: "1.5rem" }}
            />
          )}
        </div>
      </div>
      
      {/* Main content */}
      <div style={{ display: "flex", width: "100%" }}>
        {/* Dashboard */}
        <div style={{ width: "15%", backgroundColor: darkTheme ? "#222" : "#fff", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px", transition: "background-color 0.5s" }}>
          <div style={{ padding: "1rem", cursor: "pointer", color: darkTheme ? "#ccc" : "#333", borderBottom: "1px solid " + (darkTheme ? "#444" : "#ddd") }}>
            <a href="https://ashraf2004.github.io/ManagePro_chart/">Ghant chart</a>
          </div>
          <div style={{ padding: "1rem", cursor: "pointer", color: darkTheme ? "#ccc" : "#333", borderBottom: "1px solid " + (darkTheme ? "#444" : "#ddd") }}>
            <a href="https://ashraf2004.github.io/ManagePro_Members/">Members</a>
          </div>
          <div style={{ padding: "1rem", cursor: "pointer", color: darkTheme ? "#ccc" : "#333", borderBottom: "1px solid " + (darkTheme ? "#444" : "#ddd") }}>
            <a href="https://manage-pro-black.vercel.app/#home" >Logout</a>
          </div>
        </div>

        {/* Profile frame */}
        <div style={{ width: "15%" }}>
          {/* Profile content */}
        </div>

        {/* Task frame */}
        <div style={{ width: "70%" }}>
          {/* Task manager */}
          <div style={{ width: "80%", maxWidth: "1000px", padding: "2rem", backgroundColor: darkTheme ? "#222" : "#fff", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px", transition: "background-color 0.5s", display: "flex", flexDirection: "column" }}>
            {/* Task manager header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h1 style={{ textTransform: "uppercase", fontSize: "2rem", fontWeight: "bold", color: darkTheme ? "#ccc" : "#333" }}>My Tasks</h1>
            </div>
            
            {/* Add Task form */}
            <div style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px", margin: "1rem 0" }}>
              <AddTaskForm darkTheme={darkTheme} onAddTask={addTask} />
            </div>
            
            {/* Task list */}
            <div style={{ overflow: "auto", padding: "1rem", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", backgroundColor: darkTheme ? "#333" : "#f0f0f0", borderRadius: "8px", transition: "background-color 0.5s" }}>
              <div style={{ overflow: "hidden", margin: "0.5rem 0", display: "flex", alignItems: "center", justifyContent: "space-between", color: darkTheme ? "#ccc" : "#888", borderBottom: "1px solid " + (darkTheme ? "#444" : "#ddd"), padding: "0.5rem 0" }}>
                <p>{getRemainingTasks().length} tasks left</p>
                <button onClick={clearTasks} style={{ background: "none", border: "none", cursor: "pointer", color: "#d9534f", fontWeight: "bold", fontSize: "1rem" }}>Clear all tasks</button>
              </div>
              {tasks.length ? (
                <TaskList
                  tasks={tasks}
                  onEditTask={editTask}
                  onDeleteTask={deleteTask}
                  onToggleCompleted={toggleCompleted}
                />
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", color: darkTheme ? "#ccc" : "#888" }}>
                  <p style={{ textAlign: "center" }}>Empty task</p>
                </div>
              )}
            </div>
          </div>
        </div>
