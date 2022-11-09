import React, { useContext } from "react";
import { validatePassword, validateUsername, validateEmail } from "./helpers/validation";
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
} from "./helpers/problemList";
import Context from "./context/Context";
import "./index.css";

function App() {
  const {
    problem,
    agreedTerms,
    setAgreedTerms,
    setProblem,
  } = useContext(Context);

  const usernameValidation = (username) => {
    if(username.length <= 2) return SHORT_NAME;
    if(username.length > 15) return LONG_NAME;
    if(!validateUsername(username)) return INVALID_NAME;
    return "";
  };

  const emailValidation = (email) => {
    if(!validateEmail(email)) return INVALID_EMAIL;
    return "";
  };

  const passwordValidation = (password) => {
    if(password.length <= 7) return SHORT_PASSWORD;
    if(password.length > 15) return LONG_PASSWORD;
    if(password.search(/[0-9]/) === -1) return NO_NUMBER_PASSWORD;
    if(password.search(/[A-Z]/) === -1) return NO_UPPERCASE_PASSWORD;
    if(password.search(/[a-z]/) === -1) return NO_LOWERCASE_PASSWORD;
    if(!validatePassword(password)) return INVALID_PASSWORD;
    return "";
  };

  const signInValidation = () => {
    const { username, email, password } = problem;
    if (!agreedTerms) return NOT_AGREED;
    if (username.length) return EMPTY_NAME;
    if (email.length) return EMPTY_EMAIL;
    if (password.length) return EMPTY_PASSWORD;
    return "";
  };

  const handleUsername = (username) => {
    const hasProblem = usernameValidation(username);
    setProblem((prevState) => ({...prevState, username: hasProblem}));
  };

  const handleEmail = (email) => {
    const hasProblem = emailValidation(email);
    setProblem((prevState) => ({...prevState, email: hasProblem}));
  };

  const handlePassword = (password) => {
    const hasProblem = passwordValidation(password);
    setProblem((prevState) => ({...prevState, password: hasProblem}));
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
          onBlur={({ target }) => handleUsername(target.value)}
        />
      </label>
      <p className="problem">{problem.username === "EMPTY" ? "" : problem.username}</p>
      <label>
        Email:
        <input
          type="email"
          onBlur={({ target }) => handleEmail(target.value)}
        />
      </label>
      <p className="problem">{problem.email === "EMPTY" ? "" : problem.email}</p>
      <label>
        Password:
        <input
          type="password"
          onBlur={({ target }) => handlePassword(target.value)}
        />
      </label>
      <p className="problem">{problem.password === "EMPTY" ? "" : problem.password}</p>
      <label>
        <input type="checkbox" 
          checked={agreedTerms} 
          onChange={() => setAgreedTerms((prevState) => (!prevState))}
        />
        <p>I read and agreed to <span>Terms & Conditions</span></p>
      </label>
      <p className="problem">{problem.terms === "EMPTY" ? "" : problem.terms}</p>
      <input
        type="button"
        value="Sign Up"
        onClick={handleSignIn}
      />
    </form>
  );
}

export default App;
