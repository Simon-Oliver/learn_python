import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    temp: 0
  };

  componentDidMount() {
    setInterval(() => {
      fetch('http://192.168.1.10:5000')
        .then(res => res.json())
        .then(data => {
          this.setState({ temp: data.temp });
        });
    }, 3000);
  }

  render() {
    return (
      <div className="App">
        <h3>{this.state.temp}°C</h3>
      </div>
    );
  }
}

export default App;
