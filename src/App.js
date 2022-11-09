import React, { useContext } from "react";
import Form from "./components/Form";
import Terms from "./components/Terms";
import Context from "./context/Context";
import "./styles/main.css";

function App() {
  const {
    displayTerms,
  } = useContext(Context);

  return (
    <>
      {displayTerms && <Terms />}
      <Form />
    </>
  );
}

export default App;
