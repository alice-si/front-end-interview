<template>
  <div class="chart">
    <h1>Number of Lessons using INS</h1>
   <row :gutter="12">
      <column :lg="1">Countries: </column>
      <column :lg="3"
        ><v-select :options="countries"  @input="updateChart""></v-select
      ></column>
      <column :lg="1">Camps: </column>
      <column :lg="3"><v-select :options="camps"></v-select></column>
      <column :lg="1">Schools: </column>
      <column :lg="3"><v-select :options="[]"></v-select></column>
    </row>
 <row :gutter="12">
      <column :lg="8" xs-pull-12>
        <h3 style="float: left">No of lessons</h3>
        <line-chart :chart-data="chartData" :options="options"></line-chart>
      </column>
      <column :lg="4" xs-push-12>
        <div class="legend">
        <div class="flex">
          <h2> {{ totalLessons }} lessons</h2>
          <p>in {{ currentCountry }}</p>
        </div>
        <div class="flex">
          <h1>{{ arrow }} {{ growthRate }}%</h1>
          <p>Last 12 Months</p>
        </div>
        </div>
      </column>
    </row>
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
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 250,
                stepSize: 50,
                reverse: false,
                beginAtZero: true,
              },
            },
          ],
        },
      },
      currentCountry: "",
      totalLessons: "",
      arrow: "",
      growthRate: "",
    };
  },
  mounted() {
    this.countries = getCountries();
    this.updateChart("Kenya");
    this.getTotalLessons();
    this.getGrowthRate();
  },
  methods: {
    updateChart: function (country) {
      this.camps = getCamps(country);
      this.updateChartData(country);
      this.currentCountry = country;
      this.getTotalLessons(country);
      this.getGrowthRate(country);
    },
    updateChartData(country) {
      let lessonsByYear = getLessonsByYear(country);
      let color = country === "Kenya" ? "#EC6E7B" : "#9D6BD0";
      this.chartData = {
        labels: lessonsByYear.years,
        datasets: [
          {
            label: country,
            backgroundColor: "transparent",
            borderColor: color,
            lineTension: 0,
            pointStyle: "circle",
            pointRadius: 4,
            pointHoverRadius: 7,
            pointHoverBorderWidth: 2,
            pointHoverBackgroundColor: color,
            pointBackgroundColor: "#FFF",
            data: lessonsByYear.lessons,
          },
        ],
      };
    },
    getTotalLessons(country) {
      let lessonsByYear = getLessonsByYear(country);
      if (lessonsByYear.lessons.length > 0) {
        this.totalLessons = lessonsByYear.lessons.reduce(
          (prev, curr) => prev + curr
        )};
        },
   getGrowthRate(country) {
         let lessonsByYear = getLessonsByYear(country);
        const recentYears = lessonsByYear.lessons.slice(-2);
        const growthRate = (recentYears[1] / recentYears[0] - 1) * 100;
        this.growthRate = growthRate.toFixed(0);}
  },
};
</script>

<style>
.chart-view {
  margin-top: 50px;
}


.container {
  align-items: center;
  display: flex;
  width: 80vw;
  padding: 20px;
}


.legend {
  display: flex;
  align-items: center;
    justify-content: space-between;
}

.flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
