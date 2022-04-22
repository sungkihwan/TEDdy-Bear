import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./component/main/Main";
import Prologue from "./component/prologue/Prologue";
import LoginForm from "./component/user/LoginForm";
import RegisterForm from "./component/user/RegisterForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/prologue" exact element={<Prologue />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}
export default App;
