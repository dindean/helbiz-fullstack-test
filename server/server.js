const { ApolloServer, AuthenticationError } = require('apollo-server');
const typeDefs = require('./schema');
const HelbizAPI = require('./dataSources');
const resolvers = require('./resolvers');

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources: () => ({
    helbizAPI: new HelbizAPI(),
  }),
  context: ({ req }) => { 
    // Get the user token from the headers
    const token = req.headers.authorization || 'no token in header';
    if (token !== 'Bearer') {
      console.log('wrong token: ', token)
      throw new AuthenticationError('your token is wrong!');
    }
    return { token };
  },
 });

server.listen({ port: process.env.PORT || 4000 } )
  .then(({ url }) => {
    console.log(`Apollo server ready at ${url}`);
});

// if (process.env.NODE_ENV === 'production') {
//   const app = express();
//   server.applyMiddleware({ app });
//   // statically serve everything in the build folder on the route '../dist'
//   app.use('/dist', express.static(path.join(__dirname, '../dist')));
//   // respond with main app serve index.html on the route '/'
//   app.get('/', (req, res) => {
//     res.status(200).sendFile(path.join(__dirname, '../index.html'));
//   });
//   // catch-all route handler for any requests to an unknown route
//   app.use((req, res) => res.sendStatus(404));

//   app.listen(process.env.PORT || 4000, () => {
//     console.log(`Listening on port ${PORT}`);
//   });
// }

module.exports = {
  server,
};