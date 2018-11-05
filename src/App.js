import React, { Component } from 'react';
import './App.css';
import CountDown from './CountDown';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2> Countdown </h2>
        <CountDown />
      </div>
    );
  }
}

export default App;
