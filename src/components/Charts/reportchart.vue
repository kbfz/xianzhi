<template>
  <div :class="className" id="chart" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'

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
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.querySelector('#chart'))
      this.chart.setOption({
        backgroundColor: '#fafafa',
        title: {
          top: 20,
          text: '仓库完成实时订单  昨日16：00-今日16：00',
        //   subtext: '(昨日16：00-今日16：00)',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3',
          },
          left: '3%'
        },
        tooltip: {
          trigger: 'axis',
          show:true,
          backgroundColor:'#fff',
          borderColor:'#6dbaff',
          textStyle:{color :'#333'},
          borderWidth:1,
          axisPointer: {
            lineStyle: {
              color: '#999999',
              type: 'dashed',
            }
          }
        },
        grid: {
          top: 100,
          left: '3%',
          right: '4%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#e5e5e5'
            }
          },
          data: ['16:00', '18:00', '20:00', '22:00', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00']
        }],
        yAxis: [{
          type: 'value',
          name: '(单位：万)',
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
            }
          },
          splitLine: {
            lineStyle: {
              color: '#e5e5e5'
            }
          }
        }],
        series: {
          name: '仓库完成单量',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(109, 186, 255, 0.2)'
              }, {
                offset: 0.8,
                color: 'rgba(109, 186, 255, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(109, 186, 255)',
              borderColor: 'rgba(109, 186, 255,0.27)',
              borderWidth: 12

            }
          },
          data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122,234]
        }
      })
       window.onresize = () => {
       this.chart.resize()
     }
    }
  }
}
</script>
