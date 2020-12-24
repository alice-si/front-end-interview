<template>
  <div>
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
            data: lessonsByYear.lessons
          }
        ]
      }
    },
    updatePage (country) {
      console.log(country)
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

</style>
