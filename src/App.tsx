import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Photos from "./pages/Photos";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Photos />}>
            <Route path="*" element={<Photos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
