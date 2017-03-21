const request = require('request')

/**
 * Get URLs to later get starship & vehicle info
 * @param  {Function} cb Callback(err, {startShipURL, vehicleURL})
 */
const getStarShipAndVehicleURLs = (url, cb) => {
  request('https://swapi.co/api/people/1', (error, response, body) => {
    if (error) return cb(error)

    const data = JSON.parse(body)
    const starShipURL = data.starships[0]
    const vehicleURL = data.vehicles[0]
    cb(null, {vehicleURL, starShipURL})
  })
}

/**
 * Get starShip details
 * @param  {string} url API end point to get starShip information
 * @param  {Function} cb Callback(err, starShipInfo)
 */
const getStarShipInfo = (url, cb) => {
  request(url, (error, response, body) => {
    if (error) return cb(error)

    const { name, model, starship_class } = JSON.parse(body)
    cb(null, { name, model, type: starship_class})
  })
}

/**
 * Get vehicle details
 * @param  {string} url API end point to get vehicle information
 * @param  {Function} cb Callback(err, vehicleInfo)
 */
const getVehicleInfo = (url, cb) => {
  request(url, (error, response, body) => {
    if (error) return cb(error)

    const { name, model, vehicle_class } = JSON.parse(body)
    cb(null, { name, model, type: vehicle_class})
  })
}

/**
 * Get Luke's information
 * @param  {Function} cb Callback(err, lukeInfo)
 */
function getLuke(cb) {
    const lukeInfo = {
      name: 'Luke',
    }

    /* Here stars the callback hell. Please notice the if (error) return cb(err) repeated code */
    getStarShipAndVehicleURLs('https://swapi.co/api/people/1', (err, urls) => {
      if (err) return cb(err)
      const { vehicleURL, starShipURL } = urls

      /*
        Note that here we have vehicleURL and starShipURL so we could request this APIs in parallel
        But it's not easy with callbacks: we could do it using by using settimeout but there's still the
        join to be done.
       */
      getStarShipInfo(starShipURL, (err, starShipInfo) => {
        if (err) return cb(err)
        lukeInfo.starShip = starShipInfo

        getVehicleInfo(vehicleURL, (err, vehicleInfo) => {
          if(err) return cb(err)
          lukeInfo.vehicleInfo = vehicleInfo

          cb(null, lukeInfo) // <== success, run the callback with null as err, and data a
        })
      })
    })
}

if (process.env.RUN_ALL || process.env.RUN_CALLBACK) {

  describe('Example with Callbacks (Callback Hell)', () => {

    it('should get Luke details', (done) => {
      getLuke((error, info) => {
        if (error) return done(error)
        console.log(info)
        done()
      });
    })
  })
}

