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

export async function resolveRating(rootValue, {userId, movieId} ){
  return await db.where('userId ', userId).where('movieId', movieId).select('*').from('ratings').first(); 
}

//GraphQL Mutation Resolvers//

export async function resolveAddRating(rootValue, {userId, movieId, rating}){
  let date = new Date()
  
  let newRating = {
    userId: userId,
    movieId: movieId,
    rating: rating,
    timestamp: date.getTime()
  }
  
  await db('ratings').insert(newRating);
  return newRating;
}