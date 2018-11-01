import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat
} from 'graphql';

export const moviesMetadataType = new GraphQLObjectType({
  name: 'MoviesMetadata',
  description: 'Movie metadata',
  fields: () => ({
    adult: {
      type: GraphQLString,
      description: "Adult movie or not"       
    },
    belongsToCollection: {
      type: GraphQLString,
      description: 'Movie collection',
    },
    budget: {
      type: GraphQLInt,
      description: 'Movie budget',
    },
    genres: {
      type: GraphQLString,
      description: 'Movie genres'
    },
    homepage: {
      type: GraphQLString,
      description: 'Movie homepage',
    },    
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Movie id',
    },
    imdbId: {
      type: GraphQLString,
      description: 'imdb id',
    },
      originalLanguage: {
      type: GraphQLString,
      description: 'Original movie language',
    },
    originalTitle: {
      type: GraphQLString,
      description: 'Original movie title',
    },
    overview: {
      type: GraphQLString,
      description: 'Movie overview',
    },
    popularity: {
      type: GraphQLFloat,
      description: 'Movie popularity',
    },
    posterPath: {
      type: GraphQLString,
      description: 'Link to movie poster',
    },
    revenue: {
      type: GraphQLInt,
      description: 'Movie revenue',
    },
    runtine: {
      type: GraphQLString,
      description: 'Movie runtime',
    },
    spokenLanguage: {
      type: GraphQLString,
      description: 'Spoken languages in movie',
    },
    status: {
      type: GraphQLString,
      description: 'Is the movie released',
    },
    tagline: {
      type: GraphQLString,
      description: 'Movie desctiption',
    },
    title: {
      type: GraphQLString,
      description: 'Movie title',
    },
    video: {
      type: GraphQLString,
      description: 'Movie video',
    },
    voteAverage: {
      type: GraphQLFloat,
      description: 'Average movie rating',
    },
    voteCount: {
      type: GraphQLInt,
      description: 'Movie rating count',
    }
  })
});


export const linksType = new GraphQLObjectType({
  name: 'Links',
  description: 'A lot of movie links.',
  fields: () => ({
    movieId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Movie id',
    },
    imdbId: {
      type: GraphQLString,
      description: 'imdb id',
    },
    tmdbId: {
      type: GraphQLString,
      description: 'tmdb id',
    } 
  })
});

export const KeywordsType = new GraphQLObjectType({
  name: 'Keywords',
  description: 'Movie keywords',
  fietlds: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Movie id'       
    },
    keywords: {
      type: GraphQLString,
      description: 'Movie keywords',
    }
  })
});

export const CreditsType = new GraphQLObjectType({
  name: 'Credits',
  description: 'Movie credits',
  fields: () => ({
    cast: {
      type: GraphQLString,
      description: 'Movie cast'       
    },
    crew: {
      type: GraphQLString,
      description: 'Movie crew',
    },
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Movie id',
    }
  })
});

export const RatingsType = new GraphQLObjectType({
  name: 'Ratings',
  description: 'Movie ratings',
  fields: () => ({
    userId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'User id that rated movie'       
    },
    movieId: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Movie id',
    },
      rating: {
      type: GraphQLFloat,
      description: 'Movie rating',
    },
      timestamp: {
      type: GraphQLInt,
      description: 'Movie rating timestamp',
    }
  })
});