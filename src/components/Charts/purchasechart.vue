<template>
  <div :class="className" id="chart" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts';
  import { orderStatics } from "api/orderSys/purchaseOrder/crossProcurement/arrivalDetails/index";
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
        chart: null,
       orderNum: {
          buyKeyValueVoList: [],
          numTotal: 0,
          orderTotal: 0,
          skuTotal: 0
       },
        orderKeyList : [],
        orderValueList : []
      };
    },
    mounted() {
      this.initChart();
      // this.chart = null;
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      initChart () {
        this.chart = echarts.init(document.querySelector('#chart'));
        let param = {}
        orderStatics(param).then(response => {
          for (var i = 0; i < response.data.buyKeyValueVoList.length; i++) {
          let orderKeyObj = {};
          let orderValueObj = {}
          orderKeyObj = response.data.buyKeyValueVoList[i].name;
          orderValueObj = response.data.buyKeyValueVoList[i].nums;
          // this.orderKeyList 国家数组 orderValueList单量数组
          this.orderKeyList.push(orderKeyObj);
          this.orderValueList.push(orderValueObj);
         }
       this.chart.setOption({
          backgroundColor: '#fff',
              title: {
                text: "",
                subtext: ""
              },
              color: ['#455ff3'], //进度条颜色
              tooltip: {
                trigger: "axis",
                show:false
              },
              legend: {
                data: [""]
              },
              grid: {
                left: 0,
                right: 0,
                top: 0,
                bottom: '1%',
                containLabel: true
              },
              calculable: true,
              xAxis: [{
                type: "value",
                boundaryGap: [0, 0],
                show: false,
                axisLine: {
                  show: false
                },
                splitLine: {
                  show: false
                },
                axisTick: {
                  show: false
                }
              }],
              yAxis: [{
                type: "category",
                data: this.orderKeyList,
                axisLine: {
                  show: false
                },
                splitLine: {
                  show: false
                },
                axisTick: {
                  show: false
                } 
              },
              {
                type: "category",
                 data: this.orderValueList,
                 axisLine: {
                 show: false
                 },
                 splitLine: {
                   show: false
                 },
               axisTick: {
                   show: false
                 },
                axisLabel: {
                  formatter: function (value, index) {
                    if (value < 1000) {
                      return value + '单'
                    } else if (value >= 1000 && value < 10000) {
                        return value / 1000 + '千单'
                    } else if (value >= 10000 && value < 1000000) {
                        return value / (10000) + '万单'
                    } else if (value >= 1000000) {
                        return value / (1000 * 1000) + '百万单'
                    }
                    }
                }
              }],
              series: [{
                name: "",
                type: "bar",
                barWidth: '8', //统计条宽度 
                z: 10,
                tooltip:{
                show:false
                },
                data: this.orderValueList
            }, {
                type: "bar",
                barWidth: '8', //统计条宽度 
                silent: true,
                itemStyle: {
                    normal: {
                      color: '#ececec'
                    }
                },
                tooltip:{
                show:false
                },
                barGap: '-100%',
                data: [100000, 100000, 100000]
            }

            ]
        })
        })
      },
    }
  }
</script>
