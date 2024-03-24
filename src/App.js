import React, { useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import UserProfile from "./components/UserProfile";
import { MdDarkMode, MdSunny } from "react-icons/md";
import ReactDOM from "react-dom";

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);
  const [members, setMembers] = useState([
    { id: 1, name: "John Doe", password: "password1" },
    { id: 2, name: "Jane Smith", password: "password2" },
    { id: 3, name: "Bob Johnson", password: "password3" },
  ]);
  const [showAssignedTasks, setShowAssignedTasks] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState([]);

  const addTask = (title, assignedMemberId) => {
  const assignedMember = members.find((member) => member.id === assignedMemberId);
  if (assignedMember) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      assignedMember: assignedMember,
    };
    setTasks([...tasks, newTask]);
  } else {
    console.error("Member not found for assignedMemberId: ", assignedMemberId);
  }
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

  const handleAssignedTasksClick = (memberId) => {
    setSelectedMemberId(memberId);
    setShowAssignedTasks(true);
    setEnteredPassword("");
  };

  const handlePasswordCheck = () => {
    const selectedMember = members.find(
      (member) => member.id === selectedMemberId
    );
    if (selectedMember && selectedMember.password === enteredPassword) {
      const assignedTasksForMember = tasks.filter(
        (task) =>
          task.assignedMember && task.assignedMember.id === selectedMemberId
      );
      setAssignedTasks(assignedTasksForMember);
      setShowModal(true);
    } else {
      alert("Incorrect password");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setAssignedTasks([]);
  };

  const Modal = ({ onClose, children }) => {
    return ReactDOM.createPortal(
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            position: "relative",
            backgroundColor: darkTheme ? "#222" : "#fff",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <button
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              backgroundColor: "transparent",
              border: "none",
              fontSize: "1.2rem",
              cursor: "pointer",
              color: darkTheme ? "#ccc" : "#333",
            }}
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div
      style={{
        backgroundColor: darkTheme ? "#111" : "#f0f0f0",
        color: darkTheme ? "white" : "black",
        transition: "background-color 0.5s, color 0.5s",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: darkTheme ? "#333" : "#ddd",
          color: darkTheme ? "white" : "black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
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
                color: "white",
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
                color: "black",
                fontSize: "1.5rem",
              }}
            />
          )}
        </div>
      </div>

      <div style={{ display: "flex", width: "100%" }}>
        <div
          style={{
            width: "15%",
            backgroundColor: darkTheme ? "#222" : "#fff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            transition: "background-color 0.5s",
          }}
        >
          <div
            style={{
              padding: "1rem",
              cursor: "pointer",
              color: darkTheme ? "#ccc" : "#333",
              borderBottom:
                "1px solid " + (darkTheme ? "#444" : "#ddd"),
            }}
          >
            <a href="https://ashraf2004.github.io/ManagePro_chart/">
              Ghant chart
            </a>
          </div>
          <div
            style={{
              padding: "1rem",
              cursor: "pointer",
              color: darkTheme ? "#ccc" : "#333",
              borderBottom:
                "1px solid " + (darkTheme ? "#444" : "#ddd"),
            }}
          >
            <a href="https://ashraf2004.github.io/ManagePro_Members/">Team Members</a>
          </div>
          {members.map((member) => (
            <div
              key={member.id}
              style={{
                padding: "1rem",
                cursor: "pointer",
                color: darkTheme ? "#ccc" : "#333",
                borderBottom:
                  "1px solid " + (darkTheme ? "#444" : "#ddd"),
              }}
              onClick={() => handleAssignedTasksClick(member.id)}
            >
              {member.name}'s Tasks
            </div>
          ))}
          <div
            style={{
              padding: "1rem",
              cursor: "pointer",
              color: darkTheme ? "#ccc" : "#333",
              borderBottom:
                "1px solid " + (darkTheme ? "#444" : "#ddd"),
            }}
          >
            <a href="https://manage-pro-black.vercel.app/#home">Logout</a>
          </div>
        </div>

        <div style={{ width: "15%" }}>
          {/* Profile content */}
        </div>

        <div style={{ width: "70%" }}>
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h1
                style={{
                  textTransform: "uppercase",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: darkTheme ? "#ccc" : "#333",
                }}
              >
                {showAssignedTasks
                  ? `${
                      members.find(
                        (member) => member.id === selectedMemberId
                      )?.name
                    }'s Tasks`
                  : "My Tasks"}
              </h1>
            </div>

            {showAssignedTasks && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <input
                  type="password"
                  placeholder="Enter password"
                  value={enteredPassword}
                  onChange={(e) => setEnteredPassword(e.target.value)}
                  style={{
                    padding: "0.5rem",
                    border: "none",
                    borderRadius: "4px",
                    backgroundColor: darkTheme ? "#333" : "#f0f0f0",
                    color: darkTheme ? "#ccc" : "#333",
                    marginRight: "0.5rem",
                  }}
                />
                <button
                  onClick={handlePasswordCheck}
                  style={{
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "4px",
                    backgroundColor: "#4caf50",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Check
                </button>
              </div>
            )}

            <div
              style={{
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                margin: "1rem 0",
              }}
            >
              <AddTaskForm
                darkTheme={darkTheme}
                onAddTask={addTask}
                members={members}
              />
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
              {!showAssignedTasks && (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal onClose={closeModal}>
          <div
            style={{
              backgroundColor: darkTheme ? "#222" : "#fff",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <h2
              style={{
                marginBottom: "1rem",
                color: darkTheme ? "#ccc" : "#333",
              }}
            >
              {`${
                members.find((member) => member.id === selectedMemberId)?.name
              }'s Tasks`}
            </h2>
            {assignedTasks.length ? (
              <TaskList
                tasks={assignedTasks}
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
        </Modal>
      )}
    </div>
  );
}

export default App;
