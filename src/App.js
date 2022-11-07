import React, { useContext } from "react";
import Context from "./context/Context";
import "./index.css";

function App() {
  const {
    username,
    email,
    password,
    setUsername,
    setEmail,
    setPassword,
    validLogin,
  } = useContext(Context);

  return (
    <div className="main">
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button disabled={!validLogin}>Sign Up</button>
    </div>
  );
}

export default App;
