import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    testemp: 28
  };

  componentDidMount() {
    setInterval(() => {
      fetch('http://192.168.1.10:5000')
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({
            cpu_temp: Math.round((data.temp + Number.EPSILON) * 100) / 100,
            cpu_percent: data.percent
          });
        });

      fetch('http://192.168.1.10:5000/temp')
        .then(res => res.json())
        .then(data => {
          this.setState(prevState => ({
            ...prevState,
            temp: Math.round((Number(data.temp) + Number.EPSILON) * 100) / 100
          }));
        });
    }, 1000);

    fetch('http://192.168.1.10:5000/exchange')
      .then(res => res.json())
      .then(data => {
        this.setState(prevState => ({
          ...prevState,
          kurs: Math.round((Number(data.kurs) + Number.EPSILON) * 100) / 100
        }));
      });
  }

  renderButtons = obj => {
    const list = Object.keys(obj).map(function(item) {
      return (
        <div className="Button">
          <h3>{`${obj[item]}${item === 'cpu_percent' ? '%' : ''}`}</h3>
        </div>
      );
    });

    return list;
  };

  render() {
    return (
      <div className="App">
        <div className="container-sqr">{this.state ? this.renderButtons(this.state) : null}</div>

        <div className="square">
          <div class="container">
            <div class="gauge-a"></div>
            <div class="gauge-b"></div>
            <div class="gauge-c"></div>
            <div class="gauge-data">
              <h1 id="percent">0%</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
