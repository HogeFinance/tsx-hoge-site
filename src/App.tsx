import React from 'react';
import './App.css';
import ContractInfo from './components/ContractInfo';
import JsonCalc from './components/JsonCalc';
import logo from "./logo.svg";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br/>
        <ContractInfo />
        <JsonCalc />
        <p/>
      </header>
    </div>
  );
}

export default App;
