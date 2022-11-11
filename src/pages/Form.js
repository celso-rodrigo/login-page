import React, { useContext } from "react";
import { validatePassword, validateUsername, validateEmail } from "../helpers/validation";
import { useNavigate } from "react-router-dom";
import * as e from "../helpers/problemList";
import Context from "../context/Context";
import Terms from "../components/Terms";
import "../styles/form.css";

function Form() {
  const {
    problem,
    agreedTerms,
    displayTerms,
    toggleTerms,
    setAgreedTerms,
    setProblem,
  } = useContext(Context);

  const navigate = useNavigate();

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
    if (!hasProblem.length) return navigate("/test");
    setProblem((prevState) => (
      {...prevState, terms: hasProblem}
    ));
  };

  return (
    <>
      {displayTerms && <Terms />}
      <form>
        <label>
          Username:
          <input
            type="text"
            onBlur={({ target}) => setProblem((prevState) => (
              {...prevState, username: validateUsername(target.value)}))}
          />
        </label>
        <p className="problem">{problem.username === "EMPTY" ? "" : problem.username}</p>
        <label>
          Email:
          <input
            type="email"
            onBlur={({ target}) => setProblem((prevState) => (
              {...prevState, email: validateEmail(target.value)}))}
          />
        </label>
        <p className="problem">{problem.email === "EMPTY" ? "" : problem.email}</p>
        <label>
          Password:
          <input
            type="password"
            onBlur={({ target}) => setProblem((prevState) => (
              {...prevState, password: validatePassword(target.value)}))}
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
    </>
  );
}

export default Form;
