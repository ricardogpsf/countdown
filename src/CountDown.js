import React, { Component } from 'react';

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
      if (newValue > -1) {
        if (newValue > 60) {
          newState[timeType] = 0;
        } else {
          newState[timeType] = newValue;
        }
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

  render() {
    const minutes = this.state.minutes;
    const seconds = this.state.seconds;

    return (
      <div>
        <div>
          {minutes}:{seconds}
        </div>
        <div>
          <button onClick={(e) => this.addTime('minutes', 1)}> + </button><button onClick={(e) => this.addTime('minutes', -1)}> - </button>
          &nbsp;
          <button onClick={(e) => this.addTime('seconds', 1)}> + </button><button onClick={(e) => this.addTime('seconds', -1)}> - </button>
        </div>
        <div>
          <button onClick={this.toggleEnableCountDown}>{this.state.enabled ? 'Stop' : 'Start'}</button>
        </div>
      </div>
    );
  }
}

export default CountDown;
