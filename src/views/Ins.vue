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
        <h3>No of lessons</h3>
        <line-chart :chart-data="chartData" :options="options"></line-chart>
      </column>
      <column :lg="4" xs-push-12>
        <div class="legend">
        <div class="flex">
          <h1> {{ totalLessons }} <span class="total-lessons"> total lessons </span> <br/> <span class="legend-description">in {{ currentCountry }}</span></h1>
        </div>
        <div class="flex">
          <h1> {{ growthRate }}% <br/> <span class="legend-description">Last 12 Months</span></h1>
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
      currentCountry: "",
      totalLessons: "",
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100,
                stepSize: 25,
                reverse: false,
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.countries = getCountries();
    let initialCountry = 'Tanzania';
    this.updateChart(initialCountry);
    this.getTotalLessons();
    this.getGrowthRate();
    this.getAverage()
  },
  methods: {
    updateChart: function (country) {
      this.camps = getCamps(country);
      this.updateChartData(country);
      this.currentCountry = country;
      this.getTotalLessons(country);
      this.getGrowthRate(country);
      this.getAverage(country);
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

    //calculates total lessons in the selected country
    getTotalLessons(country) {
      let lessonsByYear = getLessonsByYear(country);
        this.totalLessons = lessonsByYear.lessons.reduce(
          (prev, curr) => prev + curr
        )
        },

    //calculates average to dynamically update y axis based on data 
    getAverage(country) {
      let lessonsByYear = getLessonsByYear(country)
      let average = this.totalLessons/lessonsByYear.lessons.length;
      this.average = average.toFixed(0);
        },

    //compares past year's lesson sum to current year's
   getGrowthRate(country) {
        let lessonsByYear = getLessonsByYear(country);
        const currentLesson = lessonsByYear.lessons.length -1;
        const growthRate = (lessonsByYear.lessons[currentLesson] / lessonsByYear.lessons[currentLesson-1] - 1) * 100;
        this.growthRate = growthRate.toFixed(0);
        }
  },
};
</script>

<style>
.chart-view {
  margin-top: 50px;
}


.container {
  align-items: center;
  font-family: Helvetica;
  display: flex;
  width: 80vw;
  padding: 20px;
}

//legend styles 
.legend {
  display: flex;
  justify-content: space-between;
}

h3 {
  align-self: flex-start;
  display: flex;
}

.total-lessons {
  font-size: 1.5rem;
}

.legend-description {
  font-size: .9rem;
  font-weight: 400;
  white-space: nowrap;
}

.flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
}
</style>
