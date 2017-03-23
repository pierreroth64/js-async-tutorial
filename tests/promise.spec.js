const request = require('request')

/**
 * Get URLs to later get starship & vehicle info
 * @param  {string} url API end point to get people information
 * @return {Promise}  Promise which resolves to an object with fields: starShipURL & vehicleURL
 */
const getStarShipAndVehicleURLs = (url) => {
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
 * Get starship details
 * @param  {string} url API end point to get starship information
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
 * @return {Promise}  Promise which resolves to a luke object with fields: name, starShip & vehicle
 */
const getLuke = () => {
    const lukeInfo = {
      name: 'Luke',
    }
    return getStarShipAndVehicleURLs('https://swapi.co/api/people/1')
      .then(({ starShipURL, vehicleURL}) => {
        return Promise.all([getStarShipInfo(starShipURL), getVehicleInfo(vehicleURL)]) // <== parallel requests
                .then((results) => {
                  const [ starShipInfo, vehicleInfo ] = results
                  lukeInfo.vehicle = vehicleInfo
                  lukeInfo.starShip = starShipInfo
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

/**
 * These functions are exported because async/await example also relies on promise based routines
 */
module.exports = {
  getStarShipAndVehicleURLs,
  getStarShipInfo,
  getVehicleInfo
}
