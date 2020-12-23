<template>
  <div class="contanier">
    <h1>INS Lessons</h1>
    <h2>Number of lessons using INS</h2>
    <row :gutter="12">
      <column>Countries: </column>
      <column><v-select :options="countries" v-model="selectedCountry" v-on:change="onChange"></v-select></column>
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
      this.chartData = {
        labels: lessonsByYear.years,
        datasets: [
          {
            label: 'Kenya',
            backgroundColor: 'transparent',
            borderColor: '#EC7181',
            lineTension: 0,
            pointStyle: 'circle',
            pointRadius: 4,
            pointBackgroundColor: '#FFF',
            data: lessonsByYear.lessons
          },
          {
            label: 'Years',
            backgroundColor: 'transparent',
            borderColor: '#EC7181',
            lineTension: 0,
            pointStyle: 'circle',
            pointRadius: 4,
            pointBackgroundColor: '#FFF',
            data: lessonsByYear.years
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
  .contanier {
    background-color: #f5f6fa;
  }
  .contanier h1, .contanier h2 {
    text-align: left;
    padding: 20px;
    color: #a88ccc;
  }
  .chart-view {
    margin-top: 50px;
  }
  input {
    background-color: #9cd0fa !important;
    border: none !important
  }

</style>
