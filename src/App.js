import logo from "./logo.svg";
import "./App.css";
import SignUpForm from "./Components/SignUpForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Success from "./Components/Success";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUpForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
