import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} from 'graphql';
import {moviesMetadataType} from './types';
import {resolveMovies} from './resolver';

const Query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'world'
    },
    movies: {
      type: new GraphQLList(moviesMetadataType),
      args: {
        id: {
          id: 'id',
          type: GraphQLInt
        }
      },
      resolve: resolveMovies
    }
  }
});

export default Query;
