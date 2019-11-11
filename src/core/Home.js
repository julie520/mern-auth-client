import React from "react";
import Layout from "./Layout";

const Home = () => {
  return (
    <Layout>
      <div className="col-md-6 offset-md-3 text-center">
        <h1 className="p-5">React Node MongoDB Authentication Boilerplate</h1>
        <h2>MREN STACK</h2>
        <hr />
        <div className="led">
          MERN stack login register system with account activation, forgot
          password, reset password, login with facebook and google as well as
          private and protected routes for authenticated user and users with the
          role of admin.
        </div>
        <h3 className="pt-3">Bonus</h3>
        <div className="led">
          Profile update & deployment to digital ocean cloud servers
        </div>
      </div>
    </Layout>
  );
};

export default Home;
