import React, { useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import UserProfile from "./components/UserProfile"; // Import your UserProfile component
import { MdDarkMode, MdSunny } from "react-icons/md";


function App() {
  const [tasks, setTasks] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);

  const addTask = (title) => {
    const newTask = { id: Date.now(), title, completed: false };
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

  const getCompletedTasks = () => tasks.filter((task) => task.completed);
  const getRemainingTasks = () => tasks.filter((task) => !task.completed);

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
  };

  const pageStyle = {
    backgroundColor: darkTheme ? "#111" : "#f0f0f0",
    color: darkTheme ? "white" : "black",
    transition: "background-color 0.5s, color 0.5s",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column", // Changed to column layout
  };

  const navBarStyle = {
    width: "100%",
    backgroundColor: darkTheme ? "#333" : "#ddd",
    color: darkTheme ? "white" : "black",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
  };

  const dashboardStyle = {
    width: "15%",
    backgroundColor: darkTheme ? "#222" : "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    transition: "background-color 0.5s",
  };

  const dashboardItemStyle = {
    padding: "1rem",
    cursor: "pointer",
    color: darkTheme ? "#ccc" : "#333",
    borderBottom: "1px solid " + (darkTheme ? "#444" : "#ddd"),
  };
  const logout = {
    padding: "1rem",
    cursor: "pointer",
    color: rgb(217, 83, 79),
    borderBottom: "1px solid " + (darkTheme ? "#444" : "#ddd"),
  };

  const frameContainerStyle = {
    display: "flex",
    width: "100%",
  };

  const profileFrameStyle = {
    width: "15%",
  };

  const taskFrameStyle = {
    width: "70%",
  };

  return (
    <div style={pageStyle}>
      <div style={navBarStyle}>
        {/* Navigation Bar Content */}
        <UserProfile />
        <div>
          {darkTheme ? (
            <MdSunny
              onClick={toggleTheme}
              style={{
                backgroundColor: "#ccc",
                cursor: "pointer",
                padding: "0.5rem",
                borderRadius: "50%",
                color: darkTheme ? "white" : "black",
                fontSize: "1.5rem",
              }}
            />
          ) : (
            <MdDarkMode
              onClick={toggleTheme}
              style={{
                backgroundColor: "#ccc",
                cursor: "pointer",
                padding: "0.5rem",
                borderRadius: "50%",
                color: darkTheme ? "white" : "black",
                fontSize: "1.5rem",
              }}
            />
          )}
        </div>
      </div>
      <div style={frameContainerStyle}>
        <div style={dashboardStyle}>
          <div style={dashboardItemStyle}><a href="https://ashraf2004.github.io/ManagePro_chart/">Ghant chart</a></div>
          <div style={dashboardItemStyle}><a href="https://ashraf2004.github.io/ManagePro_Members/">Members</a></div>
          <div style={logout}><a href="https://manage-pro-black.vercel.app/#home" >Logout</a></div>
        </div>
        <div style={profileFrameStyle}>
          {/* Profile content */}
        </div>
        <div style={taskFrameStyle}>
          <div
            style={{
              width: "80%",
              maxWidth: "1000px",
              padding: "2rem",
              backgroundColor: darkTheme ? "#222" : "#fff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              transition: "background-color 0.5s",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h1
                style={{
                  textTransform: "uppercase",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: darkTheme ? "#ccc" : "#333",
                }}
              >
                My Tasks
              </h1>
            </div>
            <div style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "8px", margin: "1rem 0" }}>
              <AddTaskForm darkTheme={darkTheme} onAddTask={addTask} />
            </div>
            <div
              style={{
                overflow: "auto",
                padding: "1rem",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                backgroundColor: darkTheme ? "#333" : "#f0f0f0",
                borderRadius: "8px",
                transition: "background-color 0.5s",
              }}
            >
              <div
                style={{
                  overflow: "hidden",
                  margin: "0.5rem 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: darkTheme ? "#ccc" : "#888",
                  borderBottom: "1px solid " + (darkTheme ? "#444" : "#ddd"),
                  padding: "0.5rem 0",
                }}
              >
                <p>{getRemainingTasks().length} tasks left</p>
                <button
                  onClick={clearTasks}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#d9534f",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  Clear all tasks
                </button>
              </div>
              {tasks.length ? (
                <TaskList
                  tasks={tasks}
                  onEditTask={editTask}
                  onDeleteTask={deleteTask}
                  onToggleCompleted={toggleCompleted}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    color: darkTheme ? "#ccc" : "#888",
                  }}
                >
                  <p style={{ textAlign: "center" }}>Empty task</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
