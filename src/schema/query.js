import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLBoolean} from 'graphql';
import {movies_metadataType} from './types';
import { resolveMovie, resolveMovies } from './resolver';

const Query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'world'
    },
    movie: {
      type: movies_metadataType,
      args: {
        id: {
          id: 'id',
          type: GraphQLInt
        }
      },
      resolve: resolveMovie
    }, 
    movies: {
      type: new GraphQLList(movies_metadataType),
      args: {
        searchText: {
          searchText: 'searchText',
          type: GraphQLString
        }, 
        pagenr: {
          pagenr: 'pagenr',
          type: GraphQLInt
        },
        ordering: {
          ordering: 'ordering',
          type: GraphQLString
        },
        asc: {
          asc: 'asc',
          type: GraphQLBoolean
        }

      },
      resolve: resolveMovies
    }
  }
});

export default Query;
