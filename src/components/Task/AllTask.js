import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

function AllTask({ task }) {
  return (
    <>
      <tr>
        <td>{task.name}</td>
        <td>{task.startdate}</td>
        <td>{task.enddate}</td>
        <td>{task.assignees}</td>
        <td>{task.projects}</td>
        <td>{task.priority}</td>
        <td>
          <Link to="#">
            <AiFillEdit style={{ color: "blue" }} />
          </Link>
        </td>
        <td>
          <Link to="#">
            <AiFillDelete style={{ color: "red" }} />
          </Link>
        </td>
      </tr>
    </>
  );
}

export default AllTask;
