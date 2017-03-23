const request = require('request'),
      { getStarShipAndVehicleURLs, getStarShipInfo, getVehicleInfo } = require('./promise.spec');

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
      const [ starShipInfo, vehicleInfo ] = results
      lukeInfo.vehicle = vehicleInfo
      lukeInfo.starShip = starShipInfo
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

