var request = require('request')

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

const getStarShipInfo = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) return reject(error)
      const { name, model, starship_class } = JSON.parse(body)
      resolve({ name, model, type: starship_class})
    })
  })
}

const getVehicleInfo = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) return reject(error)
      const { name, model, vehicle_class } = JSON.parse(body)
      resolve({ name, model, type: vehicle_class})
    })
  })
}

const getLuke = () => {
    const lukeInfo = {
      name: 'Luke',
    }
    return getPeopleInfo('https://swapi.co/api/people/1')
      .then(({ starShipURL, vehicleURL}) => {
        const requests = []
        requests.push(getStarShipInfo(starShipURL), getVehicleInfo(vehicleURL))
        return Promise.all(requests)
                .then((results) => {
                  lukeInfo.startShip = results[0]
                  lukeInfo.vehicle = results[1]
                  return Promise.resolve(lukeInfo)
                })
      })
}

describe('Example with Promises', () => {

  it('should get Luke details', (done) => {

    getLuke()
      .then((info) => {
        console.log(info)
        done()
      })
      .catch((error) => done(error))
  })
})

