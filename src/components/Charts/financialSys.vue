<template>
  <div :class="className" id="chart" :style="{height:height,width:width}"></div>
</template>

<script>
// import echarts from 'echarts'
import { cusTotalFee } from "api/financialSys/feeStatics/index";
var dateUtils = require("silly-datetime");
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
  data() {
    return {
      chart: null
    }
  },
  watch: {
    resizeflag: function() {
      this.chart.resize()
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
    getFeeStatics() {
      
    },
    initChart() {
      this.chart = echarts.init(document.querySelector('#chart'))
 let date = new Date();
       let end = dateUtils.format(date, "YYYY-MM-DD");
       date.setDate(1);
       let start = dateUtils.format(date, "YYYY-MM-DD");
       let param = {
       startTime:start,endTime:end,count:3
      };
      let customerName = [];
      let price = [];
      cusTotalFee(param).then(response => {
        for (var value of response.data) { 
          customerName.push(value.customerName);
          price.push(value.price);
        }
      this.chart.setOption({
        // backgroundColor: '#fafafa',
        color: ['#1f98ff'],
        title: {
            text: ''
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
              data:['']
            },
            xAxis: {
              type : 'category',
              data: customerName,
              axisLine: {
                lineStyle: {
                  color: '#eaeaea'
                }
              },
              axisLabel: {
                color: '#666',
                fontSize: 12,
                lineHeight: 80,
                interval:0,  
                // rotate:40  
              }
            },
            yAxis: {
              name: "单位（元）",
              nameTextStyle: {
                  color: '#666',
                  fontSize: 12
              },
              axisTick: {
              show: false
            },
              axisLine: {
                  lineStyle: {
                    color: '#eaeaea'
                  }
              },
              axisLabel: {
                color: '#666',
                fontSize: 14,
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
                show:true,
                lineStyle: {
                  color: '#eaeaea'
                }
              }
            },
            series: [{
              name: '收费金额',
              type: 'bar',
              barWidth: '10%',
              data: price
            }]
      })
     });
    }
  }
}
</script>
