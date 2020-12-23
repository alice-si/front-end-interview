const data = require('./ins-data.json')

// TODO: Fill with countries taken from the data object
export function getCountries () {
  let country = []
  data.map((item, index, obj) => {
    if (index === 0) {
      country.push(item.country)
    } else if (item.country !== obj[index - 1].country) {
      country.push(item.country)
    }
  })
  return country
  // Dummy answer
  // return ['Kenya', 'Tanzania']
}

// TODO: Fill with camps taken from the data object filtered by country
export function getCamps (country) {
  let camps = []
  const newData = data.filter(item => item.country === country)
  newData.map(item => camps.push(item.camp))
  return camps

  // Dummy answer
  // return ['Kakuma', 'Omaka']
}

// TODO: Fill with total lessons taken from the data object filtered by country
export function getLessonsByYear (country) {
  const newData = data.filter(item => item.country === country)
  let years = []
  let lessons = []
  newData.map(item => {
    years.push(item.year)
    lessons.push(item.lessons)
  })
  return {
    years,
    lessons
  }
  // Dummy answer
  // return {
  //   years: ['2018', '2019', '2020'],
  //   lessons: [100, 150, 130]
  // }
}
