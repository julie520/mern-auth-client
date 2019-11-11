import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Home from "./core/Home";
import Private from "./core/Private";
import Admin from "./core/Admin";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Activate from "./auth/Activate";
import Forgot from "./auth/Forgot";
import Reset from "./auth/Reset";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/auth/activate/:token" component={Activate} />
        <Route path="/auth/password/forgot" component={Forgot} />
        <Route path="/auth/password/reset/:token" component={Reset} />
        <PrivateRoute path="/private" component={Private} />
        <AdminRoute path="/admin" component={Admin} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
