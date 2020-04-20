import React from 'react';
import logo from './logo.svg';
import PropTypes from 'prop-types';
import { CircleSlider } from 'react-circle-slider';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import './App.css';

const styles = {
  root: {
    width: 300,
    color: 'white',
  },
  markLabel: {
    color: 'white',
  },
};

const marks = [
  {
    value: 0,
    label: '0°',
  },
  {
    value: 90,
    label: '90°',
  },
  {
    value: 180,
    label: '180°',
  },
];

class App extends React.Component {
  state = {
    value: 0,
  };

  // valuetext = (value) => {
  //   console.log(value);
  //   // this.setState((prev) => {
  //   //   if (prev.value != value) {
  //   //     return value;
  //   //   }
  //   // });
  // };

  handleChange = (e, value) => {
    console.log(`Changed value ${value}`);
    this.setState((prevState) => {
      if (prevState.value != value) {
        return { value };
      }
    });
  };

  // handleChangeRange = (event) => {
  //   this.setState({
  //     value: event.target.valueAsNumber,
  //   });
  // };

  componentDidMount() {
    setInterval(() => {
      // fetch('http://192.168.1.1:5000')
      //   .then(res => res.json())
      //   .then(data => {
      //     console.log("Console Log",data);
      //     this.setState({
      //       cpu_temp: Math.round((data.temp + Number.EPSILON) * 100) / 100,
      //       cpu_percent: data.percent
      //     });
      //   });
      // fetch('http://192.168.1.3:5000/temp')
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log('Console Log', data);
      //     this.setState((prevState) => ({
      //       ...prevState,
      //       temp: Math.round((Number(data.temp) + Number.EPSILON) * 100) / 100,
      //     }));
      //   });
    }, 3000);

    // fetch('http://192.168.1.9:5000/exchange')
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState(prevState => ({
    //       ...prevState,
    //       kurs: Math.round((Number(data.kurs) + Number.EPSILON) * 100) / 100
    //     }));
    //   });
  }

  componentDidUpdate() {
    console.log('Updated was called');
    fetch('http://192.168.1.15:5000/deg', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deg: this.state.value,
      }),
    });
  }

  renderButtons = (obj) => {
    const list = Object.keys(obj).map(function (item) {
      if (item != 'style') {
        return (
          <div className="Button">
            <h3>{obj[item]}</h3>
          </div>
        );
      }
    });

    return list;
  };

  render() {
    const { classes } = this.props;
    //Stops window from scrolling
    document.addEventListener(
      'touchmove',
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );
    return (
      <div className="App">
        <div className="container-sqr">{this.state ? this.renderButtons(this.state) : null}</div>
        <div className="square">
          <div className={classes.root}>
            <Typography id="discrete-slider-custom" gutterBottom>
              Temperature
            </Typography>
            <Slider
              classes={{ markLabel: classes.markLabel }}
              onChange={this.handleChange}
              defaultValue={90}
              aria-labelledby="discrete-slider-custom"
              valueLabelDisplay="auto"
              step={10}
              marks
              min={0}
              max={180}
              marks={marks}
            />
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

// <div class="container">
// <div class="gauge-a"></div>
// <div class="gauge-b"></div>
// <div class="gauge-c" style={this.state.style}></div>
// <div className="rainbow"></div>
// <div class="gauge-data">
//   <h1 id="percent">0%</h1>
// </div>
// </div>
// <CircleSlider value={this.state.value} onChange={(e) => this.handleChange(e)} />
