import { graphql} from 'relay-runtime';
import { runGraphQLQuery } from '../utils/Utils'


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
  // Eksempel implemntasjon 
  var query = `query MovieView_Query($movieId: Int!) {
    movies(id: $movieId) {
      title,
      budget,
      homepage,
      imdbId
    }
  }`;
  const movieId = 5
  return {
     type: SET_SEARCH_SETTINGS, 
     orderBy, 
     category,
     async payload() {
      const  data  = await runGraphQLQuery(query, {movieId});
      return { movies: data.movies };
    }  
  };
}