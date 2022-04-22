import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./component/Main/Main";
import Prologue from "./component/prologue/Prologue";
import Lecture from './component/Lecture/Lecture';
import Header from './component/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/prologue" exact element={<Prologue />} />
        <Route path="/media" exact element={<Lecture />} />
      </Routes>
    </Router>
  );
}

export default App;
