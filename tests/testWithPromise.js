const request = require('request')

/**
 * Get people info
 * @param  {string} url API end point to get people information
 * @return {Promise}  Promise which resolves to an object with fields: starShipURL & vehicleURL
 */
const getPeopleInfo = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) return reject(error)
      const data = JSON.parse(body)
      const starShipURL = data.starships[0]
      const vehicleURL = data.vehicles[0]
      resolve({ starShipURL, vehicleURL} )
    })
  })
}

/**
 * Get startship details
 * @param  {string} url API end point to get startship information
 * @return {Promise}  Promise which resolves to an object with fields: name, model & type
 */
const getStarShipInfo = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) return reject(error)
      const { name, model, starship_class } = JSON.parse(body)
      resolve({ name, model, type: starship_class})
    })
  })
}

/**
 * Get vehicle details
 * @param  {string} url API end point to get vehicle information
 * @return {Promise}  Promise which resolves to an object with fields: name, model & type
 */
const getVehicleInfo = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) return reject(error)
      const { name, model, vehicle_class } = JSON.parse(body)
      resolve({ name, model, type: vehicle_class})
    })
  })
}

/**
 * Get Luke's details
 * @param  {string} url API end point to get Luke's information
 * @return {Promise}  Promise which resolves to a luke object with fields: name, startShip & vehicle
 */
const getLuke = () => {
    const lukeInfo = {
      name: 'Luke',
    }
    return getPeopleInfo('https://swapi.co/api/people/1')
      .then(({ starShipURL, vehicleURL}) => {
        return Promise.all([getStarShipInfo(starShipURL), getVehicleInfo(vehicleURL)]) // <== parallel requests
                .then((results) => {
                  lukeInfo.startShip = results[0]
                  lukeInfo.vehicle = results[1]
                  return Promise.resolve(lukeInfo)
                })
      })
}

if (process.env.RUN_ALL || process.env.RUN_PROMISE) {

  describe('Example with Promises', () => {

    it('should get Luke details', () => {
      return getLuke().then(console.log)
    })
  })
}
