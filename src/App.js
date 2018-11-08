import React, { Component } from "react";
import "typeface-roboto";
import "./App.css";
import reducer from "./store/reducers/Reducer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import MovieView from "./components/MovieView";
import MovieSearch from "./components/MovieSearch";

const store = createStore(reducer);



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <MovieSearch />
          <MovieView />
        </div>
      </Provider>
    );
  }
}

export default App;