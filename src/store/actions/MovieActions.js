import { runGraphQLQuery } from "../../utils/Utils";

/*
 * action types
 */

export const SET_SEARCH_SETTINGS = "SET_SEARCH_SETTINGS";
export const SET_VIEW = "SET_VIEW";
export const LOAD_NEXT_PAGE = "LOAD_NEXT_PAGE";

/*
 * action creators
 */

// SetView endrer hvilket view vi er på. Om vi ser på moviegrid, altså mange små thumbsnails av filmen eller movieview, detaljert info om en film.
export function setView(viewName) {
  return { type: SET_VIEW, viewName };
}

// action for å laste flere filmer når du scroller nedover.
export function loadNewPage(searchText, asc, pagenr, ordering) {
  // Dette queriet gir ut et array med movies hvor hver movie har en id, poster_path og en title.
  var query = `
  query MoviesQuery($searchText: String!, $ordering: String!, $pagenr: Int!, $asc: Boolean) {
      movies(searchText: $searchText, ordering: $ordering, pagenr: $pagenr, asc: $asc) {
        id
        poster_path
        title
      }
    }`;
  return {
    type: LOAD_NEXT_PAGE,
    async payload() {
      const data = await runGraphQLQuery(query, { searchText, asc, pagenr, ordering });
      return { movies: data.movies, searchText: searchText, asc: asc, pagenr: pagenr, ordering };
    }
  };
}

// action for å laste filmer når du har endret searchtext, endret sorteringsrekkefølge (asc) eller noe sånt. 
export function setSearchSettings(searchText, asc, pagenr, ordering) {
  var query = `
  query MoviesQuery($searchText: String!, $ordering: String!, $pagenr: Int!, $asc: Boolean) {
      movies(searchText: $searchText, ordering: $ordering, pagenr: $pagenr, asc: $asc) {
        id
        poster_path
        title
      }
    }`;
  return {
    type: SET_SEARCH_SETTINGS,
    async payload() {
      const data = await runGraphQLQuery(query, { searchText, asc, pagenr, ordering });
      return { movies: data.movies, searchText: searchText, asc: asc, pagenr: pagenr, ordering };
    }
  };
  // return { type: SET_SEARCH_SETTINGS, searchText: searchText, asc: asc, pagenr: pagenr, ordering };
}
