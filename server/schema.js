const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    bikes(bike_id: String): [VehicleStatus]!
  }

  type VehicleStatus {
    bike_id: String!
    lat: Float!
    lon: Float!
    is_reserved: Int!
    is_disabled: Int!
    vehicle_type: String!
  }
`;

// Not sure which properties are nullable in Bike type, but since the JSON object received from Helbiz api 
// has all properties under each bike, I make them all required.

module.exports = typeDefs;