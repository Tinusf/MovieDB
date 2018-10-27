import {fetchQuery, graphql} from 'relay-runtime';
import environment from '../NetworkLayer';


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
  const query = graphql`
    query ExampleQuery($pageID: ID!) {
      page(id: $pageID) {
        name
      }
    }`;
  const variables = {
    pageID: '110798995619330',
  };
  return {
     type: SET_SEARCH_SETTINGS, 
     orderBy, 
     category,
     async payload() {
      const { data } = await fetchQuery(environment, query, variables)
      return { movies: data.movies };
    }  
  };
}