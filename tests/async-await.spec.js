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
 * Get starShip details
 * @param  {string} url API end point to get starShip information
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
 *  Note that the aync/wait version relies on the same promise-based routines as the promise example
 *  It's only at the top level that async/await makes asynchronous code look synchronous and is easier to
 *  read
 */

async function getLuke() {
    const lukeInfo = {
      name: 'Luke',
    }
    try {
      const { starShipURL, vehicleURL } = await getStarShipAndVehicleURLs('https://swapi.co/api/people/1')
      const results = await Promise.all([getStarShipInfo(starShipURL), getVehicleInfo(vehicleURL)])  // <== parallel requests
      const [ startShipInfo, vehicleInfo ] = results
      lukeInfo.vehicle = vehicleInfo
      lukeInfo.startShip = startShipInfo
      return Promise.resolve(lukeInfo)
    } catch (error) {
      return Promise.reject(error)
    }

}

if (process.env.RUN_ALL || process.env.RUN_ASYNC_AWAIT) {

  describe('Example with async/await', () => {

    it('should get Luke details', () => {
        return getLuke().then(console.log);
    })
  })
}

