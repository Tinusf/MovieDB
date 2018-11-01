import db from '../database/index';
// Hooray for Functional Programming //

//Helpers//


//GraphQL Query Resolvers//

export async function resolveMovies(rootValue, {id} ){
  
  return [{
    id: id, 
    title: await db.where('id', id).select('title').from('movies_metadata') 
  }];
}

