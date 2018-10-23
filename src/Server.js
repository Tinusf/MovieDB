const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildASTSchema } = require('graphql');
const gql = require('graphql-tag');


// Example schema.
const schema = buildASTSchema(gql`
  # Queries
  type Query {
    posts: [Post]
    post(id: ID): Post
    authors: [Person]
    author(id: ID): Person
  }
  type Post {
    id: ID
    author: Person
    body: String
  }
  type Person {
    id: ID
    posts: [Post]
    firstName: String
    lastName: String
  }
  # Mutations
  type Mutation {
    submitPost(input: PostInput!): Post
    deletePost(id: ID!): Boolean
  }
  input PostInput {
    id: ID
    body: String!
  }
`)

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000);