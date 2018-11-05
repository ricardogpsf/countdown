import React, { Component } from 'react';
import './CountDown.css';

class CountDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: false,
      minutes: 0,
      seconds: 0
    }

    this.sound = new Audio('ROOSTER1.wav');
    this.sound.load();

    this.toggleEnableCountDown = this.toggleEnableCountDown.bind(this);
    this.addTime = this.addTime.bind(this);
  }

  componentWillUnmount() {
    this.cleanUp();
  }

  cleanUp() {
    if (this.timerID) {
      clearInterval(this.timerID);
      this.timerID = null;
    }
  }

  startInterval() {
    this.timerID = setInterval(
      () => this.decrementTime(),
      1000
    );
  }

  toggleEnableCountDown() {
    this.setState((state, props) => {
      const enabled = !state.enabled;

      if (enabled){
        this.startInterval();
      } else {
        this.cleanUp();
      }

      return {enabled: enabled};
    });
  }

  addTime(timeType, value) {
    this.cleanUp();

    this.setState((state, props) => {
      const newState = {enabled: false};
      const newValue = state[timeType] + value;

      if (newValue > 59) {
        newState[timeType] = 0;
      } else if (newValue < 0) {
        newState[timeType] = 59;
      } else {
        newState[timeType] = newValue;
      }

      return newState
    });
  }

  decrementTime() {
    if (this.state.minutes === 0 && this.state.seconds === 0){
      this.cleanUp();
      this.setState({enabled: false});
      this.sound.play();
      return;
    }

    this.setState((state, props) => {
      const newDate = new Date(null, null, null, 0, state.minutes, state.seconds);
      newDate.setMilliseconds(-1);
      return {
        minutes: newDate.getMinutes(),
        seconds: newDate.getSeconds()
      }
    });
  }

  formatNumber(value) {
    return value.toLocaleString('pt-BR', { minimumIntegerDigits: 2 })
  }

  render() {
    const minutes = this.formatNumber(this.state.minutes);
    const seconds = this.formatNumber(this.state.seconds);
    const btnStartClass = this.state.enabled ? "btn-common btn-stop" : "btn-common btn-start";

    return (
      <div>
        <div className='counter'>
          {minutes}:{seconds}
        </div>
        <div>
          <button className='btn-common btn-left' onClick={(e) => this.addTime('minutes', 1)}> + </button><button className='btn-common btn-left' onClick={(e) => this.addTime('minutes', -1)}> - </button>
          &nbsp;
          <button className='btn-common btn-right' onClick={(e) => this.addTime('seconds', 1)}> + </button><button className='btn-common btn-right' onClick={(e) => this.addTime('seconds', -1)}> - </button>
        </div>
        <div>
          <button className={btnStartClass} onClick={this.toggleEnableCountDown}>{this.state.enabled ? 'Stop' : 'Start'}</button>
        </div>
      </div>
    );
  }
}

export default CountDown;
