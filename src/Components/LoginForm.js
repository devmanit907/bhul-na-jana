import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./features/authorize/authSlice";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "antd";
import { useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";

const Login = () => {
  let navigate = useNavigate();
  const [loginData, setLoginData] = useState({});
  const [passwordShown, setPasswordShown] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const visiblity = () => {
    setPasswordShown(!passwordShown);
  };
  const dispatching = useDispatch();
  const signedInUser = useSelector((state) => {
    return state.auth.signUpUser;
  });
  const handleUser = (values) => {
    dispatching(authActions.signUp(values));
    handleSignUp();
  };
  const handleSignUp = () => {
    setSignUp(!signUp);
  };

  const handleBack = () => {
    setSignUp(!signUp);
  };

  const handleLogin = (e) => {
    console.log(signedInUser);
    e.preventDefault();
    let result = signedInUser.filter((user) => {
      return (
        user.email === loginData.email && user.password === loginData.password
      );
    });

    if (result[0]) {
      dispatching(authActions.login({ ...result[0] }));
      navigate("/");
    } else {
      let text = "Incorrect User Credentials! Need to SignUp??";
      if (window.confirm(text) === true) {
        setSignUp(!signUp);
      }
    }
  };

  return (
    <>
      <div className="login_page">
        <img src="./assets/logo.png" alt="logo" width={500} />
        {!signUp ? (
          <Card style={{ backgroundColor: "rgb(196,199,207)", width: "300px" }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="jk">
                {" "}
                <label htmlFor="email">
                  Email<span className="star">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(event) =>
                    setLoginData({ ...loginData, email: event.target.value })
                  }
                />
              </div>

              <div className="jk">
                {" "}
                <label htmlFor="password">
                  Password<span className="star">*</span>
                </label>
                <input
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={(event) =>
                    setLoginData({ ...loginData, password: event.target.value })
                  }
                />
                <span className="cp">
                  {passwordShown ? (
                    <EyeFilled className="eye1" onClick={visiblity} />
                  ) : (
                    <EyeInvisibleFilled className="eye1" onClick={visiblity} />
                  )}
                </span>
              </div>

              <div className="btndiv">
                <span onClick={handleLogin}>
                  <Button type="primary">Login</Button>
                </span>
                <span onClick={handleSignUp}>
                  <Button type="primary">Sign Up</Button>
                </span>
              </div>
            </form>
          </Card>
        ) : (
          <Card
            className="signUp"
            style={{ backgroundColor: "rgb(196,199,207)", width: "400px" }}
          >
            <h2>Sign Up</h2>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={Yup.object({
                firstName: Yup.string()
                  .max(15, "Must be 15 characters or less")
                  .required("Required"),
                lastName: Yup.string()
                  .max(20, "Must be 20 characters or less")
                  .required("Required"),
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),
                password: Yup.string()
                  .required("No password provided")
                  .min(8, "Password is too short - should be 8 chars minimum.")
                  .matches(
                    /[a-zA-Z]/,
                    "Password can only contain Latin letters."
                  ),
                confirmPassword: Yup.string()
                  .required("Confirm your password")
                  .oneOf([Yup.ref("password"), null], "Password not matched"),
              })}
              onSubmit={(values) => {
                handleUser(values);
              }}
            >
              <Form className="regis_form">
                <div className="spacebetween">
                  <label htmlFor="firstName">
                    First Name<span className="star">*</span>
                  </label>
                  <Field name="firstName" type="text" />
                </div>
                <div className="er-msg">
                  {" "}
                  <ErrorMessage name="firstName" />
                </div>

                <div className="spacebetween">
                  <label htmlFor="lastName">
                    Last Name<span className="star">*</span>
                  </label>
                  <Field name="lastName" type="text" />
                </div>
                <div className="er-msg">
                  {" "}
                  <ErrorMessage name="lastName" />
                </div>

                <div className="spacebetween">
                  <label htmlFor="email">
                    Email Address<span className="star">*</span>
                  </label>
                  <Field name="email" type="email" />
                </div>
                <div className="er-msg">
                  {" "}
                  <ErrorMessage name="email" />
                </div>
                <div className="spacebetween">
                  <label htmlFor="password">
                    Create Password<span className="star">*</span>
                  </label>

                  <Field
                    name="password"
                    type={passwordShown ? "text" : "password"}
                  />
                  <span className="np">
                    {passwordShown ? (
                      <EyeFilled className="eye" onClick={visiblity} />
                    ) : (
                      <EyeInvisibleFilled className="eye" onClick={visiblity} />
                    )}
                  </span>
                </div>
                <div className="er-msg">
                  {" "}
                  <ErrorMessage name="password" />
                </div>

                <div className="spacebetween">
                  <label htmlFor="email">
                    Confirm Password<span className="star">*</span>
                  </label>

                  <Field
                    name="confirmPassword"
                    type={passwordShown ? "text" : "password"}
                  />
                  <span className="cp">
                    {passwordShown ? (
                      <EyeFilled className="eye1" onClick={visiblity} />
                    ) : (
                      <EyeInvisibleFilled
                        className="eye1"
                        onClick={visiblity}
                      />
                    )}
                  </span>
                </div>

                <div className="er-msg">
                  {" "}
                  <ErrorMessage name="confirmPassword" />
                </div>
                <button style={{ cursor: "pointer" }} onClick={handleBack}>
                  Back to Login
                </button>
                <button className="button" type="submit">
                  <Button type="primary">Sign Up</Button>
                </button>
              </Form>
            </Formik>
          </Card>
        )}
      </div>
    </>
  );
};

export default Login;
