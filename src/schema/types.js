import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} from 'graphql';

export const moviesMetadata = new GraphQLObjectType({
  name: 'MoviesMetadata',
  description: 'Metadata about movies',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Movie id',
    },
    title: {
      type: GraphQLString,
      description: 'Title of movie'
    },
    overview: {
      type: GraphQLString,
      description: 'Movie description'
    }
  })
});
