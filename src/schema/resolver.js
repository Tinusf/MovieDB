import db from '../database/index';

//GraphQL Query Resolvers//

export async function resolveMovies(rootValue, {id} ){
  return await db.where('id', id).select('*').from('movies_metadata');
}

