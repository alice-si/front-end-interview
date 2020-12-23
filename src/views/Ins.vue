<template>
  <div>
    <h1>INS Lessons</h1>

    <row :gutter="12">
      <column>Countries: </column>
      <column><v-select :options="countries" v-on:change="onChange"></v-select></column>
      <column>Camps: </column>
      <column><v-select :options="camps"></v-select></column>
      <column>Schools: </column>
      <column><v-select :options="[]"></v-select></column>
    </row>

    <div class="chart-view">
      <row :gutter="12">
        <column :lg="4"></column>
        <column :lg="4">
          <line-chart :chart-data="chartData"></line-chart>
        </column>
      </row>
    </div>

  </div>
</template>

<script>
import LineChart from '../components/LineChart.js'
import { getCountries, getLessonsByYear, getCamps } from '../data/data-provider.js'

export default {
  components: {
    LineChart
  },
  data () {
    return {
      chartData: {},
      countries: [],
      camps: [],
      selectedCountry: ''
    }
  },
  mounted () {
    this.countries = getCountries()
    this.camps = getCamps('Kenya')
    this.updateChartData()
  },
  methods: {
    updateChartData () {
      let lessonsByYear = getLessonsByYear('Kenya')
      console.log('Years', lessonsByYear.lessons)
      this.chartData = {
        labels: lessonsByYear.years,
        datasets: [
          {
            label: 'Kenya',
            backgroundColor: 'transparent',
            borderColor: '#EC7181',
            data: lessonsByYear.lessons
          }
        ]
      }
    },
    onChange () {
      console.log('hi')
      this.camps = getCamps(this.selectedCountry)
    }
  }
}
</script>

<style>
  .chart-view {
    margin-top: 50px;
  }

</style>
