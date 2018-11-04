import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import reducer from './store/reducers/Reducer'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import MovieView from './components/MovieView';

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <MovieView />
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </Provider>
    );
  }
}

export default App;
