import React from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import NotFound from "./components/NotFound";
import "./styles/main.css";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Form /> } />
      <Route exact path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
