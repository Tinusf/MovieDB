import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList, GraphQLBoolean } from 'graphql';
import { RatingsType } from './types';
import { resolveAddRating } from './resolver';

const Mutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    addRating: {
      type: RatingsType,
      args: {
        userId: {
          userId: 'userId',
          type: GraphQLString
        },
        movieId: {
          movieId: 'movieId',
          type: GraphQLInt
        },
        rating: {
          rating: 'rating',
          type: GraphQLFloat
        }
      },
      resolve: resolveAddRating
    }
  }
});

export default Mutation;