import React from 'react';
import './App.css';
import NavBar from './components/NavBar';

<<<<<<< HEAD
function App() {
  
  function sayHello() {
    alert('Hello, World!');
  }



=======
export default function App() {
>>>>>>> 6a2de7fac177b7391c244f2200558e9e4ea0eb39
  return (

    <div className="App">
<<<<<<< HEAD
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
            <button onClick={sayHello}>Click me!</button>
          Learn React
        </a>
      </header>
=======
      <NavBar/>
>>>>>>> 6a2de7fac177b7391c244f2200558e9e4ea0eb39
    </div>
  );
}
