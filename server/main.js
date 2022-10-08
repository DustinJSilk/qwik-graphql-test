var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors');

const data = ['Shrek', 'The Matrix', 'The Lord of the Rings', 'Something else'];

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Film {
    id: String!
    title: String!
  }

  input AddFilmInput {
    title: String!
  }

  type Query {
    film(id: String!): Film
  }

  type Mutation {
    addFilm(input: AddFilmInput!): Film!
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  film: ({ id }) => {
    return {
      title: data[parseInt(id) % data.length],
      id,
    };
  },
  addFilm: ({ input }) => {
    const { title } = input;
    const id = data.length;
    data.push(title);
    return { title, id };
  },
};

var app = express();

app.use(cors());

app.use((req) => {
  console.log('Auth token received: ', req.headers['authorization']);
  req.next();
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(3000);

console.log('Running a GraphQL API server at http://localhost:3000/graphql');
