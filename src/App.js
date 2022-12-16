import React from "react";

import "./App.css";
import { useSelector } from "react-redux";

import Layout from "./Components/Layout";
import Login from "./Components/LoginForm";

function App() {
  const loggedInUser = useSelector((state) => {
    return state.auth.loggedInUser;
  });

  return (
    <>
      {loggedInUser ? (
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
