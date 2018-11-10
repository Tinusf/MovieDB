import { combineReducers } from "redux";
import { SEARCH_MOVIES, SET_SEARCH_SETTINGS } from "../actions/MovieActions";

let movies = (state = { searchText: "", asc: true, movies: [] }, action) => {
  // oppdater hvilke filmer som skal vises
  // state = Object.assign({}, state, {
  //   movies: action.movies
  // })
  switch (action.type) {
    case SET_SEARCH_SETTINGS + "_FULFILLED":
      return Object.assign({}, state, {
        movies: action.payload.movies,
        searchText: action.payload.searchText,
        asc: action.payload.asc,
        pagenr: action.payload.pagenr,
        ordering: action.payload.ordering
      });
    case SEARCH_MOVIES:
      return Object.assign({}, state, {
        searchQuery: action.searchQuery
      });
    default:
      return state;
  }
};


const movieApp = combineReducers({
  movies
});

export default movieApp;
