import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {};

  componentDidMount() {
    setInterval(() => {
      fetch('http://192.168.1.10:5000')
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({ ...data });
        });
    }, 1000);

    fetch('http://192.168.1.10:5000/exchange')
      .then(res => res.json())
      .then(data => {
        this.setState(prevState => ({ ...prevState, ...data }));
      });
  }

  renderButtons = obj => {
    const list = Object.keys(obj).map(function(item) {
      return (
        <div className="Button">
          <h3>{`${obj[item]}${item === 'percent' ? '%' : '°C'}`}</h3>
        </div>
      );
    });

    return list;
  };

  render() {
    return <div className="App">{this.state ? this.renderButtons(this.state) : null}</div>;
  }
}

export default App;
