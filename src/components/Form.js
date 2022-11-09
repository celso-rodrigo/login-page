import React, { useContext } from "react";
import { validatePassword, validateUsername, validateEmail } from "../helpers/validation";
import * as e from "../helpers/problemList";
import Context from "../context/Context";
import "../styles/form.css";

function Form() {
  const {
    problem,
    agreedTerms,
    setAgreedTerms,
    setProblem,
    toggleTerms,
  } = useContext(Context);

  const usernameValidation = (username) => {
    let currProblem = "";
    if(!validateUsername(username)) currProblem = e.INVALID_NAME;
    if(username.length <= 2) currProblem = e.SHORT_NAME;
    if(username.length > 15) currProblem = e.LONG_NAME;
    setProblem((prevState) => ({...prevState, username: currProblem}));
  };

  const emailValidation = (email) => {
    let currProblem = "";
    if(!validateEmail(email)) currProblem = e.INVALID_EMAIL;
    setProblem((prevState) => ({...prevState, email: currProblem}));
  };

  const passwordValidation = (password) => {
    let currProblem = "";
    if(!validatePassword(password)) currProblem = e.INVALID_PASSWORD;
    if(password.length <= 7) currProblem = e.SHORT_PASSWORD;
    if(password.length > 15) currProblem = e.LONG_PASSWORD;
    if(password.search(/[0-9]/) === -1) currProblem = e.NO_NUMBER_PASSWORD;
    if(password.search(/[A-Z]/) === -1) currProblem = e.NO_UPPERCASE_PASSWORD;
    if(password.search(/[a-z]/) === -1) currProblem = e.NO_LOWERCASE_PASSWORD;
    setProblem((prevState) => ({...prevState, password: currProblem}));
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
    let hasProblem = signInValidation();
    if (!hasProblem.length) return console.log("sign in");
    setProblem((prevState) => (
      {...prevState, terms: hasProblem}
    ));
  };

  return (
    <form>
      <label>
        Username:
        <input
          type="text"
          onBlur={({ target }) => usernameValidation(target.value)}
        />
      </label>
      <p className="problem">{problem.username === "EMPTY" ? "" : problem.username}</p>
      <label>
        Email:
        <input
          type="email"
          onBlur={({ target }) => emailValidation(target.value)}
        />
      </label>
      <p className="problem">{problem.email === "EMPTY" ? "" : problem.email}</p>
      <label>
        Password:
        <input
          type="password"
          onBlur={({ target }) => passwordValidation(target.value)}
        />
      </label>
      <p className="problem">{problem.password === "EMPTY" ? "" : problem.password}</p>
      <p className="problem">{problem.terms === "EMPTY" ? "" : problem.terms}</p>
      <div className="terms-container">
        <label>
          <input type="checkbox" 
            checked={agreedTerms} 
            onChange={() => setAgreedTerms((prevState) => (!prevState))}
          />
        </label>
        <p>I read and agreed to 
          <span className="terms-link" onClick={toggleTerms}>Terms & Conditions</span>
        </p>
      </div>
      <input
        type="button"
        value="Sign Up"
        onClick={handleSignIn}
      />
    </form>
  );
}

export default Form;
