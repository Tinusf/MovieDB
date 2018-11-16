import db from '../database/index';

// Hvor mange resultater som skal bli vist på en gang.
const resultsPerPage = 35;

//GraphQL Query Resolvers//

// Query for å hente all data for en bestemt film i movies_metadata tabellen
export async function resolveMovie(rootValue, { id }) {
  return await db.where('id', id).select('*').from('movies_metadata').first();
}

// Query for å hente filmer som inneholder en søketekst
export async function resolveMovies(rootValue, { searchText, pagenr, ordering, asc }) {
  const sortby = asc ? "asc" : "desc"; // hvis asc-boolen er true så sortere vi med asc, hvis ikke desc.
  return await db.where("title", "like", "%" + searchText + "%").select('*').from('movies_metadata').orderBy(ordering, sortby).limit(resultsPerPage).offset(pagenr * resultsPerPage);
}

// Query for å hente en rating fra en bestemt bruker og en bestem film
export async function resolveRating(rootValue, { userId, movieId }) {
  return await db.where('userId ', userId).where('movieId', movieId).select('*').from('ratings').first();
}

// Query for å hente ut all data for en bestemt film i credits tabellen
export async function resolveCredits(rootValue, { id }) {
  return await db.where('id', id).select('*').from('credits').first();
}

// Query for å hente ut all data for en bestemt film i keywords tabellen
export async function resolveKeywords(rootValue, { id }) {
  return await db.where('id', id).select('*').from('keywords').first();
}

// Denne henter hvilken rating og hvor mange som ratet det et visst antall stjerner for en film.
// SQL queryet ser ish sånn ut:
// select rating, count(*) as count from ratings where movieid={movieId} group by rating;
export async function resolveRatingsForAMovie(rootValue, { movieId }) {
  return await db.where("movieid", movieId).select("rating").select("movieId").count("* as count").from("ratings").groupBy("rating");
}

// imdb link må ha prefix https://www.imdb.com/title/tt
// tmdb link må ha prefix https://www.themoviedb.org/movie/
export async function resolveLinks(rootValue, { movieId }) {
  return await db.where('movieId', movieId).select('*').from('links').first();
}

//GraphQL Mutation Resolvers//

// Query for å legge til en rating 
export async function resolveAddRating(rootValue, { userId, movieId, rating }) {
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