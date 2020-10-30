import { gql } from '@apollo/client';

const query = {};

query.GET_ALL_BIKES = gql`
  query GetBikes {
    bikes {
      bike_id
      lat
      lon
      is_reserved
      is_disabled
      vehicle_type
    }
  }
`;

query.GET_BIKE = gql`
  query GetBike ($bike_id: String!) {
    bikes (bike_id: $bike_id) {
      bike_id
      lat
      lon
      is_reserved
      is_disabled
      vehicle_type
    }
  }
`;

export default query;