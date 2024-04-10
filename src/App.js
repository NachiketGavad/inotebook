import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <div>
          <Navbar />
          {/* <h1 className="text-center">This is iNotebook</h1>  */}
          <Routes>
            <Route path="/" element={<Home key="Home" />} />
            <Route path="/About" element={<About key="About" />} />
            <Route path="/Login" element={<Login key="Login" />} />
            <Route path="/Signup" element={<Signup key="Signup" />} />
          </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
