import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLBoolean, GraphQLFloat } from 'graphql';
import { movies_metadataType, RatingsType, CreditsType, KeywordsType } from './types';
import { resolveMovie, resolveMovies, resolveRating, resolveCredits, resolveKeywords, resolveRatingsForAMovie } from './resolver';

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
    },
    rating: {
      type: RatingsType,
      args: {
        userId: {
          userId: 'userId',
          type: GraphQLString
        },
        movieId: {
          movieId: 'movieId',
          type: GraphQLInt
        }
      },
      resolve: resolveRating
    },
    ratingsForAMovie: {
      type: new GraphQLList(RatingsType),
      args: {
        movieId: {
          movieId: 'movieId',
          type: GraphQLInt
        }
      },
      resolve: resolveRatingsForAMovie
    },
    credits: {
      type: CreditsType,
      args: {
        id: {
          id: 'id',
          type: GraphQLInt
        }
      },
      resolve: resolveCredits
    },
    keywords: {
      type: KeywordsType,
      args: {
        id: {
          id: 'id',
          type: GraphQLInt
        }
      },
      resolve: resolveKeywords
    }
  }
});

export default Query;
