import React, { useEffect } from "react";
import "./fetchTask.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchTaskAction } from "../../redux/task/taskAction";
import { signOut } from "../../redux/auth/authActions";
import AllTask from "./AllTask";
// import { AiOutlinePoweroff } from "react-icons/ai";

function FetchTask() {
  const dispatch = useDispatch();
  const getTasks = useSelector((state) => state.fetchTasks);
  const { tasks } = getTasks;
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchTaskAction());
  }, [dispatch]);

  const logout = () => {
    dispatch(signOut());
  };

  if (!token) return (window.location.href = "/");

  return (
    <>
      <div className="card__title"></div>
      <div className="card__wrapper">
        <table className="users">
          <tr>
            <th colSpan={8} style={{ textAlign: "center" }}>
              All Task
              {/* <AiOutlinePoweroff /> */}
              <button
                onClick={logout}
                style={{ float: "right", padding: "7px", cursor: "pointer" }}
              >
                Logout
              </button>
            </th>
          </tr>
          <tr>
            <th>Task Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Assignees</th>
            <th>Projects</th>
            <th>Priority</th>
            <th colSpan={2}>Actions</th>
          </tr>
          {tasks.map((task) => (
            <AllTask key={task.id} task={task} />
          ))}
        </table>
      </div>
    </>
  );
}

export default FetchTask;
