import React, { useState } from "react";
import { validatePassword, validateUsername, validateEmail } from "../helpers/validation";
import * as e from "../helpers/problemList";
import Terms from "./Terms";
import "../styles/form.css";

function Form() {
  const [signedUp, setSignedUp] = useState(false);
  const [displayTerms, setDisplayTerms] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [problem, setProblem] = useState({
    username: "EMPTY",
    email: "EMPTY",
    password: "EMPTY",
    terms: "EMPTY"
  });

  const toggleTerms = () => {
    setDisplayTerms((prevState) => (!prevState));
  };

  const signInValidation = () => {
    const { username, email, password } = problem;
    if (!agreedTerms) return e.NOT_AGREED;
    if (username.length) return e.EMPTY_NAME;
    if (email.length) return e.EMPTY_EMAIL;
    if (password.length) return e.EMPTY_PASSWORD;
    return "";
  };

  const handleSignIn = () => {
    const hasProblem = signInValidation();
    if (!hasProblem.length) return setSignedUp(true);
    setProblem((prevState) => (
      {...prevState, terms: hasProblem}
    ));
  };

  return (
    <>
      {displayTerms && <Terms toggle={toggleTerms} />}
      {signedUp
        ? <h1 className="signed-up">You successfully signed up!</h1>
        : (
          <form>
            <label>
              Username:
              <input
                type="text"
                onBlur={({ target}) => setProblem((prevState) => (
                  {...prevState, username: validateUsername(target.value)}))}
              />
              <p className="problem">{problem.username === "EMPTY" ? "" : problem.username}</p>
            </label>

            <label>
              Email:
              <input
                type="email"
                onBlur={({ target}) => setProblem((prevState) => (
                  {...prevState, email: validateEmail(target.value)}))}
              />
              <p className="problem">{problem.email === "EMPTY" ? "" : problem.email}</p>
            </label>

            <label>
              Password:
              <input
                type="password"
                onBlur={({ target}) => setProblem((prevState) => (
                  {...prevState, password: validatePassword(target.value)}))}
              />
              <p className="problem">{problem.password === "EMPTY" ? "" : problem.password}</p>
            </label>

            <div className="terms-container">
              <p className="problem">{problem.terms === "EMPTY" ? "" : problem.terms}</p>
              <label>
                <input type="checkbox" 
                  checked={agreedTerms} 
                  onChange={() => setAgreedTerms((prevState) => (!prevState))}
                />
                <p>
                  {"I read and agreed to "}
                  <span className="terms-link" onClick={toggleTerms}>Terms & Conditions</span>
                </p>
              </label>
            </div>

            <button type="button" onClick={handleSignIn} className="sign-btn">
              Sign Up
            </button>
          </form>
        )
      }
    </>
  );
}

export default Form;
