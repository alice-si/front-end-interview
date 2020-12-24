const data = require('./ins-data.json')

// TODO: Fill with countries taken from the data object
export function getCountries () {
  const obj = {}
  data.forEach(entry => { obj[entry.country] = '' })
  return Object.keys(obj)
}

// TODO: Fill with camps taken from the data object filtered by country
export function getCamps (country) {
  if (!country) return null

  const compareStr = country.toUpperCase()
  const campsMap = {}

  data.reduce((camps, entry) => {
    if (entry.country.toUpperCase() === compareStr) {
      camps[entry.camp.charAt(0).toUpperCase() + entry.camp.slice(1)] = ''
    }
    return camps
  }, campsMap)

  return Object.keys(campsMap)
}

// TODO: Fill with total lessons taken from the data object filtered by country
export function getLessonsByYear (country) {
  // Dummy answer
  if (!country) return { years: [], lessons: [] }

  const compareStr = country.toUpperCase()
  const lessons = { years: [], lessons: [] }

  data.reduce((returnData, entry) => {
    if (entry.country.toUpperCase() === compareStr) {
      returnData.years.push(entry.year)
      returnData.lessons.push(entry.lessons)
    }
    return returnData
  }, lessons)

  return lessons
}

console.log(getLessonsByYear('tanzania'))
