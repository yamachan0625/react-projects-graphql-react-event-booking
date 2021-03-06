const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const graphQlSchema = require('./graohql/schema/index');
const graphQlResolvers = require('./graohql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }
//   next();
// });
app.use(cors());

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(
    // `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@portfolio.tzurq.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@portfolio-shard-00-00.tzurq.mongodb.net:27017,portfolio-shard-00-01.tzurq.mongodb.net:27017,portfolio-shard-00-02.tzurq.mongodb.net:27017/${process.env.MONGO_DB}?ssl=true&replicaSet=atlas-refh68-shard-0&authSource=admin&retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(5000);
    console.log('ok!!!');
  })
  .catch((err) => {
    console.log(err);
    console.log('dbエラー');
  });
