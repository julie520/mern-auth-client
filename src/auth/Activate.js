import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import jwt from "jsonwebtoken";
import Layout from "../core/Layout";
import "react-toastify/dist/ReactToastify.min.css";

const Activate = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true
  });

  const { name, token } = values;

  useEffect(() => {
    let token = match.params.token;
    if (token) {
      let { name } = jwt.decode(token);
      setValues({ ...values, name, token });
    }
  }, []); //any time state change

  const clickSubmit = event => {
    event.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token }
    })
      .then(response => {
        console.log("ACTIVATE SUCCESS", response);
        setValues({ ...values, show: false });
        toast.success(response.data.message);
      })
      .catch(err => {
        console.log("ACTIVATE ERROR", err.response.data.error);
        toast.error(err.response.data.error);
      });
  };

  const activationLink = () => (
    <div className="text-center">
      <h1 className="p-5">Hey {name}, Ready to activate your account?</h1>
      <button className="btn btn-outline-primary" onClick={clickSubmit}>
        Activate Account
      </button>
    </div>
  );
  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {activationLink()}
      </div>
    </Layout>
  );
};

export default Activate;
