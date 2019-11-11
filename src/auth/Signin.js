import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Layout from "../core/Layout";
import { authenticate, isAuth } from "./helpers";
import Google from "./Google";
import Facebook from "./Facebook";

const Signin = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: "Submit"
  });

  const { email, password, buttonText } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const informParent = response => {
    // save the response (user,token) localstorage/cookie
    authenticate(response, () => {
      isAuth() && isAuth().role === "admin"
        ? history.push("/admin")
        : history.push("/private");
    });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password }
    })
      .then(response => {
        console.log("SIGNIN SUCCESS", response);
        // save the response (user,token) localstorage/cookie
        authenticate(response, () => {
          setValues({
            ...values,
            email: "",
            password: "",
            buttonText: "Submitted"
          });
          // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
          isAuth() && isAuth().role === "admin"
            ? history.push("/admin")
            : history.push("/private");
        });
      })
      .catch(err => {
        console.log("SIGNIN ERROR", err.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(err.response.data.error);
      });
  };

  const signinForm = () => (
    <form>
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
        <h1 className="text-center p-5">Signin</h1>
        <Google informParent={informParent} />
        <Facebook informParent={informParent} />
        {signinForm()}
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

export default Signin;
