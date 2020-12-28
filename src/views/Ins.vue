<template>
  <div>
    <h1>INS Lessons</h1>

    <row :gutter="12">
      <column>Countries: </column>
      <column><v-select :options="countries"></v-select></column>
      <column>Camps: </column>
      <column><v-select :options="[]"></v-select></column>
      <column>Schools: </column>
      <column><v-select :options="[]"></v-select></column>
    </row>

    <div class="chart-view">
      <row :gutter="12">
        <column :lg="4"></column>
        <column :lg="4">
          <line-chart
            :chart-data="chartData"
            :options="chartOptions"
          ></line-chart>
        </column>
      </row>
    </div>
  </div>
</template>

<script>
import LineChart from "../components/LineChart.js";
import {
  getCountries,
  getLessonsByYear,
  getCamps,
} from "../data/data-provider.js";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      chartData: {},
      countries: [],
      camps: [],
    };
  },
  mounted() {
    this.countries = getCountries();
    this.camps = getCamps(this.countries);
    this.updateChartData();
  },
  methods: {
    updateChartData() {
      let lessonsByYear = getLessonsByYear();
     ç this.chartData = {
        labels: lessonsByYear.years,
        datasets: [
          {
            label: "Kenya",
            backgroundColor: "transparent",
            borderColor: "#EC7181",
            data: lessonsByYear.lessons,
          },
        ],
      };
    },
  },
};
</script>

<style>
.chart-view {
  margin-top: 50px;
}
</style>
