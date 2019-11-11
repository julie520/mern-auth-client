import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Layout from "./Layout";
import { isAuth, getCookie, signout, updateUser } from "../auth/helpers";

const Private = ({ history }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    buttonText: "Submit"
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const { name, email, password, buttonText } = values;

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${getCookie("token")}`
      }
    })
      .then(response => {
        // console.log("PROFILE LOAD SUCCESS", response);
        const { name, email } = response.data;
        setValues({ ...values, name, email });
      })
      .catch(err => {
        console.log("PROFILE LOAD ERROR", err);
        if (err.response.status === 401) {
          signout(() => {
            history.push("/");
          });
        } else {
          toast.error(err.response.data.error);
        }
      });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/user/update`,
      headers: {
        Authorization: `Bearer ${getCookie("token")}`
      },
      data: { name, password }
    })
      .then(response => {
        console.log("PROFILE UPDATE SUCCESS", response);
        updateUser(response, () => {
          setValues({
            ...values,
            buttonText: "Submitted"
          });
          toast.success("Profile updated successfully");
        });
      })
      .catch(err => {
        console.log("PROFILE UPDATE ERROR", err);
        setValues({ ...values, buttonText: "Submit" });
        if (err.response.status === 401) {
          signout(() => {
            history.push("/");
          });
        } else {
          toast.error(err.response.data.error);
        }
      });
  };

  const updateForm = () => (
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
          type="email"
          defaultValue={email}
          className="form-control"
          disabled
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
        <h1 className="text-center pt-5">Private</h1>
        <p className="lead text-center">Profile update</p>
        {updateForm()}
      </div>
    </Layout>
  );
};

export default Private;
