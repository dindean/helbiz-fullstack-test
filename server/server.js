const { ApolloServer } = require('apollo-server');
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

module.exports = {
  server,
};