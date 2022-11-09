import React, { useState } from "react";
import Context from "./Context";
import PropTypes from "prop-types";

function Provider({ children }) {
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [problem, setProblem] = useState({username: "EMPTY", email: "EMPTY", password: "EMPTY", terms: "EMPTY"});

  const providerValue = {
    problem,
    agreedTerms,
    setProblem,
    setAgreedTerms,
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