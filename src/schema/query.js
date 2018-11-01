import {GraphQLObjectType, GraphQLString, GraphQLList} from 'graphql';
import {moviesMetadata} from './types';
import {resolveMovies} from './resolver';

const Query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'world'
    },
    movies: {
      type: new GraphQLList(moviesMetadata),
      args: {
        id: {
          id: 'id',
          type: GraphQLString
        }
      },
      resolve: resolveMovies
    }
  }
});

export default Query;
