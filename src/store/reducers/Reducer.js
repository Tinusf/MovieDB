import { combineReducers } from "redux";
import { SEARCH_MOVIES, SET_SEARCH_SETTINGS, SET_VIEW, LOAD_NEXT_PAGE } from "../actions/MovieActions";

let movies = (
  state = { searchText: "", pagenr: 0, asc: false, ordering: "vote_count", movies: [], viewName: "moviegrid", moreToLoad: true },
  action
) => {
  // oppdater hvilke filmer som skal vises
  // state = Object.assign({}, state, {
  //   movies: action.movies
  // })

  switch (action.type) {
    case SET_SEARCH_SETTINGS:
      return Object.assign({}, state, {
        movies: [],
        searchText: action.searchText,
        asc: action.asc,
        pagenr: 0,
        ordering: action.ordering,
        moreToLoad: true
      });
    case LOAD_NEXT_PAGE + "_FULFILLED":
      return Object.assign({}, state, {
        moreToLoad: action.payload.movies.length > 0,
        movies: state.movies.concat(action.payload.movies),
        pagenr: action.payload.pagenr + 1
      });
    case SEARCH_MOVIES:
      return Object.assign({}, state, {
        searchQuery: action.searchQuery
      });
    case SET_VIEW:
      return Object.assign({}, state, {
        viewName: action.viewName
      });
    default:
      return state;
  }
};

const movieApp = combineReducers({
  movies
});

export default movieApp;
