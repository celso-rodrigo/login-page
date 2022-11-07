import React, { useState } from "react";
import Context from "./Context";
import PropTypes from "prop-types";
import { useEffect } from "react";

function Provider({ children }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validLogin, setValidLogin] = useState(false);

  useEffect(() => {
    const validateInputs = () => {
      const validUser = username.length >= 1;
      const validEmail = email.length >= 1;
      const validPassword = password.length === 2;
      setValidLogin(validUser && validEmail && validPassword);
    };
    validateInputs();
  }, [username, email, password]);

  const providerValue = {
    username,
    email,
    password,
    setUsername,
    setEmail,
    setPassword,
    validLogin,
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