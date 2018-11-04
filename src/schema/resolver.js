import db from '../database/index';

// Hvor mange resultater som skal bli vist på en gang.
const resultsPerPage = 10;

//GraphQL Query Resolvers//

export async function resolveMovie(rootValue, {id} ){
  return await db.where('id', id).select('*').from('movies_metadata').first(); 
}

export async function resolveMovies(rootValue, { searchText, pagenr, ordering, asc }) {
  const sortby = asc ? "asc" : "desc"; // hvis asc-boolen er true så sortere vi med asc, hvis ikke desc.
  return await db.where("title", "like", "%" + searchText + "%").select('*').from('movies_metadata').orderBy(ordering, sortby).limit(resultsPerPage).offset(pagenr * resultsPerPage);
}