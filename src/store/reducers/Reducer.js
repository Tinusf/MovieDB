import { combineReducers } from "redux";
import { SET_SEARCH_SETTINGS, SET_VIEW, LOAD_NEXT_PAGE } from "../actions/MovieActions";

let movies = (
  state = { searchText: "", pagenr: 0, asc: false, ordering: "vote_count", movies: [], viewName: "moviegrid", moreToLoad: false },
  action
) => {
  switch (action.type) {
    case SET_SEARCH_SETTINGS + "_FULFILLED":
      // Dette er når det er første gang du loader filmer for dette søket.
      return Object.assign({}, state, {
        movies: action.payload.movies,
        searchText: action.payload.searchText,
        asc: action.payload.asc,
        pagenr: 1,
        ordering: action.payload.ordering,
        moreToLoad: true
      });
    // Dette er når du scroller ned for å laste inn flere filmer for samme søk.
    case LOAD_NEXT_PAGE + "_FULFILLED":
      return Object.assign({}, state, {
        moreToLoad: action.payload.movies.length > 0,
        // Legge til de nye filmene fra neste side.  
        movies: state.movies.concat(action.payload.movies),
        pagenr: action.payload.pagenr + 1
      });
    case SET_VIEW:
      return Object.assign({}, state, {
        // Veldig simpelt: skriv over viewname bare. Så lett reducer som det går ann.
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
