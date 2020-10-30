module.exports = {
  Query: {
    // destructure context(third argument) to access the dataSource defined in dataSource.js
    bikes: (parent, args, { dataSources }) => {
      return dataSources.helbizAPI.getAllBikes(args.bike_id)},
  }
};