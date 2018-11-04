import Schema from './schema';
import {printSchema}  from 'graphql';
const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();
const cors = require('cors');

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true
}));


console.log(printSchema(Schema))

app.listen(4000);