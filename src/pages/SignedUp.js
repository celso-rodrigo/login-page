import React, { useContext } from "react";
import Context from "../context/Context";

function SignedUp() {
  const { problem } = useContext(Context);
  return (
    <>
      {Object.values(problem).every((problem) => problem === "") 
        ? <h1 className="signed-up">You successfully signed up!</h1>
        : <h1 className="signed-up">Please login first.</h1>
      }
    </>
  );
}

export default SignedUp;
