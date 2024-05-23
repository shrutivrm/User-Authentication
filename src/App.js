import "./App.css";
import SignUpForm from "./Components/SignUpForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Success from "./Components/Success";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUpForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
