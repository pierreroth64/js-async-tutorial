const request = require('request')

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

async function getLuke() {
    const lukeInfo = {
      name: 'Luke',
    }
    const { starShipURL, vehicleURL } = await getPeopleInfo('https://swapi.co/api/people/1')
    const results = await Promise.all([getStarShipInfo(starShipURL), getVehicleInfo(vehicleURL)])
    lukeInfo.startShip = results[0]
    lukeInfo.vehicle = results[1]
    return lukeInfo
}

describe('Example with async/await', () => {

  it('should get Luke details', async () => {
    try {
      const info = await getLuke()
      console.log(info);
    } catch (error) {
      done(error)
    }
  })
})

