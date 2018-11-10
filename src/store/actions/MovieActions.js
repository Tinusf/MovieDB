import { runGraphQLQuery } from '../../utils/Utils'


/*
 * action types
 */

export const SEARCH_MOVIES = "SEARCH_MOVIES";
export const SET_SEARCH_SETTINGS = "SET_SEARCH_SETTINGS";


/*
 * action creators
 */

export function searchMovies(searchQuery) {
  return { type: SEARCH_MOVIES, searchQuery };
}

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
}