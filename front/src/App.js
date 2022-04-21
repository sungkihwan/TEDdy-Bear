import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./component/Main/Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
