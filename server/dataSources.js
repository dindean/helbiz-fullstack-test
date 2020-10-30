const { RESTDataSource } = require('apollo-datasource-rest');

class HelbizAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.helbiz.com/admin/reporting/arlington/gbfs';
  }

  async getAllBikes(bike_id) {
    try {
      const response = await this.get('free_bike_status.json');
      const bikesArr = response.data.bikes;
      
      if (bike_id) { // if bike_id is present, filter and get matching bike
        const filtered = bikesArr.filter(bikeData => bikeData.bike_id === bike_id)
        return filtered.length === 0 ? console.log('invalid bike ID') : filtered;

      } else { // if no bike_id passed in, return entire array (or empty array)
        return Array.isArray(bikesArr) ? bikesArr.map(bike => this.bikeReducer(bike)) : [];
      }
    } catch (error) {
      console.log('err'. error)
    }
  }

  // bikeReducer transforms fetched data into the form that our API will send back to client
  // normally there will be some logic to handle data we received from server then pass back to client
  bikeReducer(bike) {
    return {
      bike_id: bike.bike_id,
      lat: bike.lat,
      lon: bike.lon,
      is_reserved: bike.is_reserved,
      is_disabled: bike.is_disabled,
      vehicle_type: bike.vehicle_type,
    };
  }
}

module.exports = HelbizAPI;

// Partial query caching: The RESTDataSource class automatically caches responses from REST resources with no additional setup. 
// It enables you to take advantage of the caching logic that the REST API already exposes.