import Schema from './schema';
const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();
const cors = require('cors');

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true
}));

// Kjører server på port 4000.
app.listen(4000);