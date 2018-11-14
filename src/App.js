import React, { Component } from "react";
import "typeface-roboto";
import "./App.css";
import reducer from "./store/reducers/Reducer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import MovieSearch from "./components/MovieSearch";
import MovieGrid from "./components/MovieGrid";
import promiseMiddleware from "redux-promise-middleware";

const composeStoreWithMiddleware = applyMiddleware(promiseMiddleware())(createStore);

const store = composeStoreWithMiddleware(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <MovieSearch />
          <MovieGrid />
        </div>
      </Provider>
    );
  }
}

export default App;
