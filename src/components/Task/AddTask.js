//Hooks
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";

//File
import FileBase from "react-file-base64";
//Actions
import { fecthAssignAction } from "../../redux/assignees/assignAction";
import { fecthProjectsAction } from "../../redux/project/projectAction";
import { AddTaskAction } from "../../redux/task/taskAction";

//Icons and Tostify Notification
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { IoIosAttach } from "react-icons/io";

//CSS Files
import "react-toastify/dist/ReactToastify.css";
import "./AddTask.css";

const AddTask = () => {
  const [inputs, setInputs] = useState({
    name: "",
    startdate: "",
    enddate: "",
    assignees: "",
    projects: "",
    description: "",
    priority: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [countCharacters, setCountCharacters] = useState(0);
  const [errMsg, setErrMsg] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateCharacters = (e) => {
    const countInitial = 30;
    //store value to states
    setInputs({ ...inputs, description: e.target.value });
    setCountCharacters(e.target.value.length);
    if (countCharacters >= countInitial) {
      return setErrMsg(true);
    } else {
      return setErrMsg(false);
    }
  };
  useEffect(() => {}, [countCharacters, inputs.description]);

  const getAssigns = useSelector((state) => state.getAssingees);
  const { assigns } = getAssigns;

  const getProject = useSelector((state) => state.getProjects);
  const { projects } = getProject;

  useEffect(() => {
    dispatch(fecthAssignAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fecthProjectsAction());
  }, [dispatch]);

  //fetching asignees into dropdown
  const assignees = assigns.map((option) => ({
    label: option.name,
    value: option.name,
  }));

  const onChangeHandler = (value) => {
    let values = value.map((assignee) => {
      return assignee.value;
    });
    let assigneesValues = values.join(" , ");

    return setInputs({
      ...inputs,
      assignees: assigneesValues,
    });
  };

  //fetching Projects into dropdown menu

  //fetching asignees into dropdown
  const projectsList = projects.map((option) => ({
    label: option.projectName,
    value: option.projectName,
  }));

  const prjectOnChangeHandler = (value) => {
    let values = value.map((project) => {
      return project.value;
    });
    let projectList = values.join(" , ");

    return setInputs({
      ...inputs,
      projects: projectList,
    });
  };
  // var message = () => {

  // };
  const submitHandler = (e) => {
    e.preventDefault();
    try {
      dispatch(AddTaskAction(inputs));
      setInputs({
        name: "",
        startdate: "",
        enddate: "",
        assignees: "",
        projects: "",
        description: "",
        priority: "",
      });
      window.location.href = "/fetchTask";
    } catch (error) {
      toast.error("Error!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    console.log(inputs);
  };

  useEffect(() => {
    if (!token) return (window.location.href = "/");
  }, [token]);

  return (
    <>
      <div className="wrapper">
        <form
          onSubmit={submitHandler}
          autoComplete="off"
          encType="multipart/form-data"
        >
          <div className="header">
            <div className="left-side">Create Task</div>
            <div className="right-side">
              <span>
                <AiOutlineSave className="header-icons" />
                Save Draft
              </span>
              <span>
                <AiOutlineClose className="header-icons" />
                Close
              </span>
            </div>
          </div>
          <div className="form-wrapper">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="input"
              style={{ padding: "1px" }}
              value={inputs.name}
              required
              placeholder="Task Name"
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            />

            <div className="row">
              <div className="col-6">
                <label htmlFor="startdate">Start Date</label>
                <input
                  type="date"
                  name="startdate"
                  className="input"
                  placeholder=""
                  required
                  value={inputs.startdate}
                  onChange={(e) =>
                    setInputs({ ...inputs, startdate: e.target.value })
                  }
                />
              </div>
              <div className="col-6">
                <label htmlFor="startdate">End Date</label>
                <input
                  type="date"
                  name="startdate"
                  required
                  placeholder=""
                  className="input"
                  value={inputs.enddate}
                  onChange={(e) =>
                    setInputs({ ...inputs, enddate: e.target.value })
                  }
                />
              </div>
            </div>
            <br />
            <label>Assignees</label>
            <div className="mult-select">
              <Select isMulti options={assignees} onChange={onChangeHandler} />
            </div>
            <br />
            <label>Projects</label>
            <div className="mult-select">
              <Select
                isMulti
                options={projectsList}
                onChange={prjectOnChangeHandler}
              />
            </div>
            <br />
            <p className={errMsg ? "leftMsg" : "hide"}>
              Characters are Execeded
            </p>
            <label>Description</label>
            <textarea
              placeholder="Description"
              className={errMsg ? "errMsg" : "input"}
              rows="5"
              cols="5"
              value={inputs.description}
              onChange={validateCharacters}
            ></textarea>
            <div className="countContainer">
              <p>{countCharacters} / 30</p>
            </div>
            <label>Priority</label>
            <div className="radio-buttons">
              <div className="radio-button">
                <input
                  type="radio"
                  name="priority"
                  value="Low"
                  onChange={(e) =>
                    setInputs({ ...inputs, priority: e.target.value })
                  }
                />
                &nbsp; Low
              </div>
              <div className="radio-button">
                <input
                  type="radio"
                  name="priority"
                  value="Normal"
                  onChange={(e) =>
                    setInputs({ ...inputs, priority: e.target.value })
                  }
                />
                &nbsp; Normal
              </div>
              <div className="radio-button">
                <input
                  type="radio"
                  name="priority"
                  value="High"
                  onChange={(e) =>
                    setInputs({ ...inputs, priority: e.target.value })
                  }
                />
                &nbsp; High
              </div>
            </div>
          </div>
          <div className="footer">
            <div className="left-side" style={{ marginTop: "20px" }}>
              <IoIosAttach />
              <input
                type="file"
                name="file"
                id="file"
                onChange={(e) =>
                  setInputs({ ...inputs, selectedFile: e.target.files[0] })
                }
              />
              <label for="file">Attach</label>
              {/* <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setInputs({ ...inputs, selectedFile: base64 })
                }
                className="inputfile"
              /> */}
            </div>
            <div className="right-side">
              <div className="draft">
                <button className="btn-cancel" type="reset">
                  Cancel
                </button>
              </div>
              <div className="close">
                <button
                  type="submit"
                  disabled={errMsg ? true : false}
                  className={errMsg ? "btn-cancel-disabled" : "btn-save"}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTask;
