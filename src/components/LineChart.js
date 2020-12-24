import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  // props: ['options'],
  data () {
    return {
      options: {
        title: {
          display: true,
          position: 'top',
          text: 'Number of lessons'
        },
        legend: {
          display: true,
          position: 'right',
          align: 'center'
        },
        elements: {
          radius: 5
        }
      }
    }
  },
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}
