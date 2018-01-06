import React, { Component } from 'react';
import './App.css';
import Search from './Components/Search/Search';

class App extends Component {
  render() {
    return (
      <div className="App">
       <h1 className="header">{'<DevWeather />'}</h1>
       <Search />
      </div>
    );
  }
}

export default App;
