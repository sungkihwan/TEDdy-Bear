import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/user/LoginForm";
import RegisterForm from "./components/user/RegisterForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<LoginForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
