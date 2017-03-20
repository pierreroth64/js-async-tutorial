var request = require('request')

describe('test with callback', () => {
  it('should get Luke first vehicle', (done) => {

    request('https://swapi.co/api/people/1', (error, response, body) => {
      const lukeInfo = {
        name: 'Luke',
      }
      if (error) return done(error)

      const data = JSON.parse(body)
      const startShipURL = data.starships[0]
      const vehicleURL = data.vehicles[0]

      request(startShipURL, (error, response, body) => {
        if (error) return done(error)

        const { name, model, starship_class } = JSON.parse(body)
        lukeInfo.startShip = { name, model, type: starship_class}

        request(vehicleURL, (error, response, body) => {
          if (error) return done(error)

          const { name, model, vehicle_class } = JSON.parse(body)
          lukeInfo.vehicle = { name, model, type: vehicle_class}
          console.log(lukeInfo)
          done()
        })
      })
    })
  })
})

