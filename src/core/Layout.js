import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";

const Layout = ({ children, history }) => {
  const logout = () => {
    signout(() => {
      history.push("/");
    });
  };

  const authUrl = isAuth() && isAuth().role === "admin" ? "/admin" : "/private";

  const nav = () => (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink to="/" exact className="nav-link">
          Home
        </NavLink>
      </li>
      {!isAuth() && (
        <Fragment>
          <li className="nav-item">
            <NavLink to="/signin" className="nav-link">
              Signin
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/signup" className="nav-link">
              Signup
            </NavLink>
          </li>
        </Fragment>
      )}
      {isAuth() && (
        <Fragment>
          <li className="nav-item">
            <NavLink to={authUrl} className="nav-link">
              {isAuth().name}
            </NavLink>
          </li>
          <li className="nav-item">
            <span
              className="nav-link"
              onClick={logout}
              style={{ cursor: "pointer" }}
            >
              Signout
            </span>
          </li>
        </Fragment>
      )}
    </ul>
  );
  return (
    <Fragment>
      {nav()}
      <div className="container">{children}</div>
    </Fragment>
  );
};

export default withRouter(Layout);
