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
          console.log(data);
          this.setState({ temp: data.temp });
        });
    }, 3000);
  }

  render() {
    return (
      <div className="App">
        <div className="Button">
          <h3>{this.state.temp}°C</h3>
        </div>
      </div>
    );
  }
}

export default App;
