import { GraphQLSchema } from 'graphql';

import Query from './query';
import Mutation from './mutation';

// Schema er laget av queriesene våres og mutationsene våres.
const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
