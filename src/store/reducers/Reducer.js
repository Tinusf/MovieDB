import { combineReducers } from "redux";
import { SEARCH_MOVIES, SET_SEARCH_SETTINGS } from "../actions/Movie-actions";

let movies = (state =  {category: "all", sortBy: "rating", searchQuery: "", movies: []}, action) => {
  // oppdater hvilke filmer som skal vises
  state = Object.assign({}, state, {
    movies: action.movies
  })

  switch (action.type) {
    case SET_SEARCH_SETTINGS:
      return Object.assign({}, state, {
        movies: action.movies
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
