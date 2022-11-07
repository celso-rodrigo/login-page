import React, { useState, useEffect } from "react";
import { validateUsername, validateEmail, validatePassword } from "../helpers/validation";
import Context from "./Context";
import PropTypes from "prop-types";

function Provider({ children }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validLogin, setValidLogin] = useState(false);
  const [problem, setProblem] = useState("");

  useEffect(() => {
    const validateInputs = () => {
      const validUser = validateUsername(username);
      const validEmail = validateEmail(email);
      const validPassword = validatePassword(password);
      setValidLogin(validUser && validEmail && validPassword);
    };
    validateInputs();
  }, [username, email, password]);

  const providerValue = {
    username,
    email,
    password,
    validLogin,
    problem,
    setUsername,
    setEmail,
    setPassword,
    setProblem,
  };

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;