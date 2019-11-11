import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Layout from "../core/Layout";

const Forgot = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    buttonText: "Request password reset link"
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/forgot-password`,
      data: { email }
    })
      .then(response => {
        console.log("FORGOT PASSWORD SUCCESS", response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "Requested" });
      })
      .catch(err => {
        console.log("FORGOT PASSWORD ERROR", err);
        toast.error(err.response.data.error);
        setValues({ ...values, buttonText: "Request password reset link" });
      });
  };

  const { email, buttonText } = values;

  const forgotForm = () => (
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
        <h1 className="text-center p-5">Forgot password</h1>
        {forgotForm()}
      </div>
    </Layout>
  );
};

export default Forgot;
