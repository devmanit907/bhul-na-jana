import React from "react";

import "./App.css";
import { useSelector } from "react-redux";

import Layout from "./Components/Layout";
import Login from "./Components/LoginForm";

function App() {
  const loggedOutUser = useSelector((state) => {
    return state.auth.loggedOutUser;
  });

  return (
    <>
      {loggedOutUser ? (
        <Layout />
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
}

export default App;
