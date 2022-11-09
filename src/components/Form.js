import React, { useContext } from "react";
import { validatePassword, validateUsername, validateEmail } from "../helpers/validation";
import {
  SHORT_NAME,
  LONG_NAME,
  INVALID_NAME,
  INVALID_EMAIL,
  SHORT_PASSWORD,
  LONG_PASSWORD,
  NO_NUMBER_PASSWORD,
  NO_UPPERCASE_PASSWORD,
  NO_LOWERCASE_PASSWORD,
  INVALID_PASSWORD,
  NOT_AGREED,
  EMPTY_NAME,
  EMPTY_EMAIL,
  EMPTY_PASSWORD,
} from "../helpers/problemList";
import Context from "../context/Context";

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
    if(!validateUsername(username)) currProblem = INVALID_NAME;
    if(username.length <= 2) currProblem = SHORT_NAME;
    if(username.length > 15) currProblem = LONG_NAME;
    setProblem((prevState) => ({...prevState, username: currProblem}));
  };

  const emailValidation = (email) => {
    let currProblem = "";
    if(!validateEmail(email)) currProblem = INVALID_EMAIL;
    setProblem((prevState) => ({...prevState, email: currProblem}));
  };

  const passwordValidation = (password) => {
    let currProblem = "";
    if(!validatePassword(password)) currProblem = INVALID_PASSWORD;
    if(password.length <= 7) currProblem = SHORT_PASSWORD;
    if(password.length > 15) currProblem = LONG_PASSWORD;
    if(password.search(/[0-9]/) === -1) currProblem = NO_NUMBER_PASSWORD;
    if(password.search(/[A-Z]/) === -1) currProblem = NO_UPPERCASE_PASSWORD;
    if(password.search(/[a-z]/) === -1) currProblem = NO_LOWERCASE_PASSWORD;
    setProblem((prevState) => ({...prevState, password: currProblem}));
  };

  const signInValidation = () => {
    const { username, email, password } = problem;
    if (!agreedTerms) return NOT_AGREED;
    if (username.length) return EMPTY_NAME;
    if (email.length) return EMPTY_EMAIL;
    if (password.length) return EMPTY_PASSWORD;
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
        <p>I read and agreed to <span className="terms" onClick={toggleTerms}>Terms & Conditions</span></p>
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
