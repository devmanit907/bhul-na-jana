import React, { useState } from "react";
import { useDispatch } from "react-redux";
import usersData from "./database/allUsers";
import { authActions } from "./features/authorize/authSlice";
import { Card } from "antd";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const dispatching = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    let result = usersData.allUsers.filter((user) => {
      return (
        user.email === loginData.email && user.password === loginData.password
      );
    });

    if (result[0]) {
      dispatching(authActions.login({ ...result[0] }));
    } else {
      alert("Failed to Login");
    }
  };

  return (
    <>
      <div className="login_page">
        <img src="./assets/logo.png" alt="logo" width={500} />
        <Card style={{ backgroundColor: "grey", width: "300px" }}>
          <form onSubmit={handleLogin}>
            <div className="form">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(event) =>
                  setLoginData({ ...loginData, email: event.target.value })
                }
              />
            </div>

            <div className="form">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(event) =>
                  setLoginData({ ...loginData, password: event.target.value })
                }
              />
            </div>

<button className="primary" >Login</button>

           
          </form>
        </Card>
      </div>
    </>
  );
};

export default Login;
