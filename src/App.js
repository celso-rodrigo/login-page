import React from "react";
import { Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import NotFound from "./pages/NotFound";
import SignedUp from "./pages/SignedUp";
import "./styles/main.css";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Form /> } />
      <Route exact path="/signedup" element={<SignedUp />} />
      <Route exact path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
