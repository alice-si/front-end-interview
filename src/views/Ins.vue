<template>
  <div class="main-container">
    <h1>INS Lessons</h1>

    <row :gutter="12">
      <column>Countries: </column>
      <column><v-select :options="countries" @input="updatePage($event)"></v-select></column>
      <column>Camps: </column>
      <column><v-select :options="camps"></v-select></column>
      <column>Schools: </column>
      <column><v-select :options="[]"></v-select></column>
    </row>

    <div class="chart-view">
      <line-chart :chart-data="chartData" :height=400 :width=900></line-chart>
      <row :gutter="12">
        <column :lg="4"></column>
        <column :lg="4">
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
      camps: []
    }
  },
  mounted () {
    this.countries = getCountries()
    this.updateChartData()
  },
  methods: {
    updateChartData (country) {
      let lessonsByYear = getLessonsByYear(country)
      this.chartData = {
        labels: lessonsByYear.years,
        datasets: [
          {
            label: country,
            backgroundColor: 'transparent',
            borderColor: '#EC7181',
            data: lessonsByYear.lessons,
            lineTension: 0,
            pointRadius: 4,
            pointBorderWidth: 3,
            pointBackgroundColor: '#fff',
            pointHoverBackgroundColor: '#aaa',
            pointHoverRadius: 6,
            pointHoverBorderWidth: 3,
            maintainAspectRatio: false
          }
        ]
      }
    },
    updatePage (country) {
      this.camps = getCamps(country)
      this.updateChartData(country)
    }
  }
}
</script>

<style>
  .chart-view {
    margin-top: 50px;
  }
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

</style>
