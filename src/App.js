import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
const App = () => {
  const [text, setText] = useState();
  useEffect(() => {
    fetch("http://localhost:9000/")
      .then((response) => response.text())
      .then(setText);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{text}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
