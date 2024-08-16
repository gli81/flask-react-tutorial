import { useState, useEffect, useRef } from "react";
import NavBar from "./Navbar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Home from "./Home.jsx"
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import CreateRecipe from "./CreateRecipe.jsx";
import "./styles/main.css"

function App() {
  useEffect(
    () => {
        fetch("/api/hello")
        .then(resp => resp.json())
        .then(data => setMessage(data.msg))
        .catch(err => console.log(err))
    },
    []
  );
  const [message, setMessage] = useState('');
  const [ct, setCt] = useState(0);
  const ctRef = useRef(null);
  useEffect(
    () => {
      console.log("RENDER");
    }
  )
  function handleClick() {
    ctRef.current.value = Math.floor(Math.random() * 1000000000).toString()
  }

  return (
    <Router>
      <div className="app">
          <h1>{message}</h1>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create_recipe" element={<CreateRecipe />} />
          </Routes>
          <input type="button" value='0' ref={ctRef} onClick={handleClick}></input>
          <button onClick={() => setCt(Math.floor(Math.random()  * 1000000000))}>
            {ct}
          </button>
      </div>
    </Router>
  )
}

export default App
