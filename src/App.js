import React, { Component } from "react";
import "typeface-roboto";
import "./App.css";
import reducer from "./store/reducers/Reducer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import MovieSearch from "./components/MovieSearch";
import MovieGrid from "./components/MovieGrid";

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <MovieSearch />
          <MovieView movieId={862} />
        </div>
      </Provider>
    );
  }
}

export default App;
