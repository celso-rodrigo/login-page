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
} from "./helpers/problemList";
import Context from "./context/Context";
import "./index.css";

function App() {
  const {
    username,
    email,
    password,
    validLogin,
    problem,
    setUsername,
    setEmail,
    setPassword,
    setProblem,
  } = useContext(Context);

  const checkNameProblems = () => {
    if(!username.length) return;
    if(username.length <= 2) return setProblem(SHORT_NAME);
    if(username.length > 15) return setProblem(LONG_NAME);
    if(!validateUsername(username)) return setProblem(INVALID_NAME);
    setProblem("");
  };

  const checkEmailProblems = () => {
    if(!email.length) return;
    if(!validateEmail(username)) return setProblem(INVALID_EMAIL);
    setProblem("");
  };

  const checkPasswordProblems = () => {
    if(!password.length) return;
    if(password.length <= 7) return setProblem(SHORT_PASSWORD);
    if(password.length > 15) return setProblem(LONG_PASSWORD);
    if(password.search(/[0-9]/) === -1) return setProblem(NO_NUMBER_PASSWORD);
    if(password.search(/[A-Z]/) === -1) return setProblem(NO_UPPERCASE_PASSWORD);
    if(password.search(/[a-z]/) === -1) return setProblem(NO_LOWERCASE_PASSWORD);
    if(!validatePassword(password)) return setProblem(INVALID_PASSWORD);
    setProblem("");
  };

  return (
    <div className="main">
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          onBlur={checkNameProblems}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          onBlur={checkEmailProblems}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          onBlur={checkPasswordProblems}
        />
      </label>
      <p className="problem">{problem}</p>
      <button disabled={!validLogin}>Sign Up</button>
    </div>
  );
}

export default App;
