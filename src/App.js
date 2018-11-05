import React, { Component } from 'react';
import './App.css';
import CountDown from './CountDown';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Countdown
          <CountDown/>
        </header>
      </div>
    );
  }
}

export default App;
