/*
 * action types
 */

export const SEARCH_MOVIES = "SEARCH_MOVIES";
export const SET_SEARCH_SETTINGS = "SET_SEARCH_SETTINGS";


/*
 * action creators
 */

export function searchMovies(searchQuery) {
  return { type: SEARCH_MOVIES, searchQuery};
}

export function setSearchSettings(orderBy, category) {
  return { type: SET_SEARCH_SETTINGS, orderBy, category };
}


