import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Layout from "../core/Layout";
import { isAuth } from "./helpers";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    buttonText: "Submit"
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signupWithConfirm`,
      data: { name, email, password }
    })
      .then(response => {
        console.log("SIGNUP SUCCESS", response);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          buttonText: "Submitted"
        });
        toast.success(response.data.message);
      })
      .catch(err => {
        console.log("SIGNUP ERROR", err.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(err.response.data.error);
      });
  };

  const { name, email, password, buttonText } = values;

  const signupForm = () => (
    <form>
      <div className="form-group">
        <label className="text-mute">Name</label>
        <input
          onChange={handleChange("name")}
          value={name}
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-mute">Email</label>
        <input
          onChange={handleChange("email")}
          value={email}
          type="email"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-mute">Password</label>
        <input
          onChange={handleChange("password")}
          value={password}
          type="password"
          className="form-control"
        />
      </div>
      <div>
        <button className="btn btn-primary" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );
  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {isAuth() && <Redirect to="/" />}
        <h1 className="text-center p-5">Signup</h1>
        {signupForm()}
        <br />
        <Link
          to="/auth/password/forgot"
          className="btn btn-sm btn-outline-danger"
        >
          Forgot password
        </Link>
      </div>
    </Layout>
  );
};

export default Signup;
