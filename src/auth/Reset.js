import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Layout from "../core/Layout";

const Reset = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    resetPasswordLink: "",
    newPassword: "",
    buttonText: "Reset password"
  });

  useEffect(() => {
    let token = match.params.token;
    if (token) {
      let { name } = jwt.decode(token);
      setValues({ ...values, resetPasswordLink: token, name });
    }
  }, []);

  const { name, newPassword, resetPasswordLink, buttonText } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/reset-password`,
      data: { resetPasswordLink, newPassword }
    })
      .then(response => {
        console.log("RESET PASSWORD SUCCESS", response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "Done" });
      })
      .catch(err => {
        console.log("RESET PASSWORD ERROR", err);
        toast.error(err.response.data.error);
        setValues({ ...values, buttonText: "Reset password" });
      });
  };

  const resetForm = () => (
    <form>
      <div className="form-group">
        <label className="text-mute">New Password</label>
        <input
          onChange={handleChange("newPassword")}
          value={newPassword}
          type="password"
          className="form-control"
          placeholder="Type new password"
          required
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
        <h1 className="text-center pt-5">Reset password</h1>
        <p className="text-center">Hey {name}, Type your new password</p>
        {resetForm()}
      </div>
    </Layout>
  );
};

export default Reset;
