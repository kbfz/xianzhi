<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
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
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        backgroundColor: '#fafafa',
        color: ['#1f98ff'],
        title: {
            subtext: '退货商品排行',
            left:'8%',
            },
            tooltip: {
              trigger: 'axis',
              show:true,
              backgroundColor:'#fcfcfc',
              borderColor:'#c3d7f3',
              textStyle:{color :'#333'},
              borderWidth:1,
              axisPointer : {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0)',
                  type: 'dashed',
                }
              }
            },
            legend: {
              data:['次数']
            },
            xAxis: {
              type : 'category',
              data: ['8801042564985','8801042564985','8801042564985','8801042564985','8801042564985'],
              axisLine: {
                lineStyle: {
                  color: '#eaeaea'
                }
              },
              axisLabel: {
                color: '#eaeaea',
                fontSize: 12,
                interval:0,  
                // rotate:40  
              }
            },
            yAxis: {
              // name: "单位（万元）",
              // nameTextStyle: {
              //     color: '#eaeaea',
              //     fontSize: 12
              // },
              axisLine: {
              lineStyle: {
                  color: '#eaeaea'
                  }
              },
              axisLabel: {
                  color: '#eaeaea',
                  fontSize: 12
              },
              splitLine: {
                show:false,
                lineStyle: {
                  color: '#eaeaea'
                }
              },
              interval:1000,
              max:5000
            },
            series: [{
              name: '退货数量',
              type: 'bar',
              barWidth: '15%',
              data: [4800, 4000, 3500, 2300, 1500]
            }]
      })
       window.onresize = () => {
       this.chart.resize()
     }
    }
  }
}
</script>
