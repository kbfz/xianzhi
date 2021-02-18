<template>
  <div :class="className"
       id="chart"
       :style="{height:height,width:width}"></div>
</template>

<script>
import {
  getChart
} from 'api/orderSys/orderIndex/index'
// import echarts from 'echarts';
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    resizeflag: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      chart: null,
      timeChart: [],
      numChart: []
    };
  },
  watch: {
    resizeflag: function () {
      this.chart.resize()
    }
  },
  methods: {
    // 获取时间和数量
     getChartNum () {
       let self = this
       getChart().then(response => {
         for (var i = 0; i < response.data.everyDayOrderNum.length; i++) {
           let timeObj = null
           let numObj = null
           timeObj = response.data.everyDayOrderNum[i].date
           numObj = response.data.everyDayOrderNum[i].num
           this.timeChart.push(timeObj)
           this.numChart.push(numObj)
           self.initChart();
         }
       })
     },
    initChart () {
      let self = this
      self.chart = echarts.init(document.querySelector('#chart'))
      self.chart.setOption({
        tooltip: {
          trigger: 'axis',
          show: true,
          backgroundColor: '#fff',
          borderColor: '#9BBB59',
          colors: '#5793f3',
          textStyle: { color: '#333' },
          borderWidth: 1,
          axisPointer: {
            lineStyle: {
              color: '#e5e5e5',
              type: 'dashed',
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: self.timeChart
        },
        yAxis: [{
          type: 'value',
          name: '单位（单）',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#e5e5e5'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            },
            formatter: function (value, index) {
              if (value < 1000) {
                return value
              } else if (value >= 1000 && value < 10000) {
                return value / 1000 + 'K'
              } else if (value >= 10000 && value < 1000000) {
                return value / (10000) + 'W'
              } else if (value >= 1000000) {
                return value / (1000 * 1000) + 'M'
              }
            }
          },
          splitLine: {
            lineStyle: {
              color: '#e5e5e5'
            }
          }
        }],
        series: [{
          name: '订单量',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true
            }
          },
          data: self.numChart
        }]
      })
    }
  },
  mounted () {
    this.getChartNum()
  }
}
</script>
