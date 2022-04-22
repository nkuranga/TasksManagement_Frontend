/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInAction } from "../../redux/auth/authActions";
import { Link, Redirect } from "react-router-dom";
import "./signIn.css";
const signIn = () => {
  const [cred, setCred] = useState({
    username: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInAction(cred.username, cred.password));
    setCred({ username: "", password: "" });
  };

  return (
    <>
      <div className="card-body">
        <div className="card-title">
          <h4>SignIn</h4>
        </div>
        <section className="container">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <label htmlFor="names">UserName</label>
            <br />
            <input
              type="text"
              placeholder="Enter UserName"
              value={cred.username}
              onChange={(e) => setCred({ ...cred, username: e.target.value })}
            />
            <br />
            <label htmlFor="names">Password</label>
            <br />
            <input
              type="password"
              value={cred.password}
              onChange={(e) => setCred({ ...cred, password: e.target.value })}
            />
            <br />

            <button className="btn-signup">SignIn</button>
          </form>
        </section>
      </div>
    </>
  );
};

export default signIn;
