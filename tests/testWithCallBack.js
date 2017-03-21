const request = require('request')

function getLuke(cb) {
    const lukeInfo = {
      name: 'Luke',
    }

    /* Here stars the callback hell. Please notice the if (error) return cb(error) redundant code */
    request('https://swapi.co/api/people/1', (error, response, body) => {
      if (error) return cb(error)

      const data = JSON.parse(body)
      const startShipURL = data.starships[0]
      const vehicleURL = data.vehicles[0]

      /* Once we have startShipURL and vehicleURL we could run these requests in parallel
         but callback based code does not easily allows us to do so */

      request(startShipURL, (error, response, body) => {
        if (error) return cb(error)

        const { name, model, starship_class } = JSON.parse(body)
        lukeInfo.startShip = { name, model, type: starship_class}

        request(vehicleURL, (error, response, body) => {
          if (error) return cb(error)

          const { name, model, vehicle_class } = JSON.parse(body)
          lukeInfo.vehicle = { name, model, type: vehicle_class}
          cb(null, lukeInfo) // <== Pass null as error and result as second arg
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

