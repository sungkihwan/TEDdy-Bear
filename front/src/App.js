import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./component/main/Main";
import Prologue from "./component/prologue/Prologue";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/prologue" exact element={<Prologue />} />
      </Routes>
    </Router>
  );
}

export default App;
