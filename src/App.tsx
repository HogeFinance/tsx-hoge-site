import React from 'react';
import logo from './logo.svg';
import './App.css';
import ContractInfo from './components/ContractInfo';
import JsonCalc from './components/JsonCalc';
import Top20 from './components/Ethplorer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ContractInfo />
        <JsonCalc />
        <Top20 />
      </header>
    </div>
  );
}

export default App;
