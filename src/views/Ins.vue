<template>
  <div>
    <h1>INS Lessons</h1>

    <row :gutter="12">
      <column>Countries: </column>
      <column
        ><v-select :options="countries" @input="changeCamps"></v-select
      ></column>
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
import LineChart from "../components/LineChart.js";
import {
  getCountries,
  getCamps,
  getLessonsByYear
} from "../data/data-provider.js";

export default {
  components: {
    LineChart
  },
  data() {
    return {
      chartData: {},
      countries: [],
      camps: []
    };
  },
  mounted() {
    this.countries = getCountries();
    this.updateChartData("Tanzania");
  },
  methods: {
    changeCamps: function(value) {
      this.camps = getCamps(value);
      this.updateChartData(value);
    },
    updateChartData(value) {
      let lessonsByYear = getLessonsByYear(value);

      this.chartData = {
        labels: lessonsByYear.years,
        datasets: [
          {
            label: value,
            backgroundColor: "transparent",
            borderColor: "#EC7181",
            data: lessonsByYear.lessons
          }
        ]
      };
    }
  }
};
</script>

<style>
.chart-view {
  margin-top: 50px;
}
</style>
