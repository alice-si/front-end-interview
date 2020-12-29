const data = require('./ins-data.json')
const _ = require('lodash')


//create object that is grouped by country and filtered for the following functions 
const groupedByCountry = _(data)
.groupBy("country")
//sets countries as key 
.mapValues(countries => ({
  //flattens camp values into unique array
  camps: _(countries)
    .flatMap("camp")
    .uniq()
    .value(),
    //filters and adds the lessons by year
  lessons: _(countries)
    .filter({ country: countries[0].country })
    .groupBy("year")
    .map(byYear => _(byYear).sumBy("lessons"))
    .value(),
    //flattens year values into a unique array
  years: _(countries)
    .flatMap("year")
    .uniq()
    .value(),
}))
.value();

  


//gets countries which are the keys of the filtered data 
export function getCountries () {
return Object.keys(groupedByCountry)

 }
    
//gets camps from the filtered data 
export function getCamps (country) {  
return groupedByCountry[country].camps
}

//returns lessons and years from the filtered data 
export function getLessonsByYear (country) {
  return {
    years: groupedByCountry[country].years,
    lessons: groupedByCountry[country].lessons
  }
}

