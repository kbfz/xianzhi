<!--vue 看板页面 -->
<template>
  <div class="storage-box-right pull-right">
    <div class="dashboard-main clearfix">
        <div   class="dashboard-main-mokuai">
        <h2 class="dashboard-main-shuzi">
            <countTo class="info-item-num" :startVal='0' :endVal='23' :duration='2400' ></countTo>
        </h2>
        <p class="dashboard-main-duixiang">待审核客户</p>
        </div>
      <div class="dashboard-main-mokuai">
        <h2 class="dashboard-main-shuzi">
            <countTo class="info-item-num" :startVal='0' :endVal='4323' :duration='2400' ></countTo>
        </h2>
        <p class="dashboard-main-duixiang">待报关订单</p>
      </div>
      <div   class="dashboard-main-mokuai">
        <h2 class="dashboard-main-shuzi">
            <countTo class="info-item-num" :startVal='0' :endVal='3333' :duration='2400' ></countTo>
            </h2>
        <p class="dashboard-main-duixiang">异常订单</p>
      </div>
      <div  class="dashboard-main-mokuai">
        <h2 class="dashboard-main-shuzi">
            <countTo class="info-item-num" :startVal='0' :endVal='2323' :duration='2400' ></countTo>
        </h2>
        <p class="dashboard-main-duixiang">未推送报关草单</p>
      </div>
    </div>
    <div  class="histogram" id="container-histogram"></div>
  </div>
</template>

<script>
//   import {getDashBoardData} from '../../api/api'
//  var Cookies = require('cookies-js')
import countTo from 'vue-count-to' 
    export default {
        name: 'dashboard',
      data() {
          return {
            goodsNochecked: 0,
            goodsNodeclared: 0,
            abnormalOrder: 0,
            prerecordInCount: 0,
            orderSumCount: 0,
            orderNotOutCount: 0,
            chart: null,
            option: null,
//            user: Cookies.get('user') === null || Cookies.get('user') === undefined ? {user_id: '', customerCode: '', token: '', expire: ''} : JSON.parse(Cookies.get('user')),
            chartData: {
                 x: [], // [],
                y1: [], // [], // this.orderSumCount,
                y2: [], // [], // this.orderNotOutCount,
                y3: [] // [] // this.abnormalOrder
            }
          }
      },
    components: { countTo },
      methods: {
        //   getData() {
        //     let queryParam = {customerCode: this.customerCode}
        //     getDashBoardData(queryParam).then(res => {
        //       if (res.code === 0) {
        //         this.goodsNochecked = res.data.profile.goodsNochecked
        //         this.goodsNodeclared = res.data.profile.goodsNodeclared
        //         this.abnormalOrder = res.data.profile.abnormalOrder
        //         this.prerecordInCount = res.data.profile.prerecordInCount
        //         this.chartData.x = res.data.statistics.time
        //         this.chartData.y1 = res.data.statistics.orderSum
        //         this.chartData.y2 = res.data.statistics.orderNotOutCount
        //         this.chartData.y3 = res.data.statistics.abnormalOrder
        //         this.chart.setOption({
        //           xAxis: {
        //             data: this.chartData.x
        //           },
        //           series: [{
        //             // 根据名字对应到相应的系列
        //             name: '订单总数',
        //             data: this.chartData.y1
        //           },
        //             {
        //               // 根据名字对应到相应的系列
        //               name: '未出库订单数',
        //               data: this.chartData.y2
        //             },
        //             {
        //               // 根据名字对应到相应的系列
        //               name: '异常订单数',
        //               data: this.chartData.y3
        //             }
        //           ]
        //         })
        //       } else {
        //         this.$message({
        //           title: '系统异常',
        //           message: res.msg,
        //           type: 'info',
        //           offset: 100,
        //           duration: 1500,
        //           customClass: 'notiyClass'
        //         })
        //       }
        //     })
        //   },
          drawChart() {
//              console.log(this.chartData.y3)
            this.option = { // 渲染柱形图的配置
              title: {
                text: '订单看板',
                subtext: '单位：个',
                x: '2%',
                textStyle: {
                  color: '#000'
                },
                subtextStyle: {
                  color: '#000'
                }
              },
              color: ['#3398DB', '#8E388E', '#CAFF70'],
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
//            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  type: 'shadow',
                  label: {
                    backgroundColor: '#6a7985'
                  }
                }
              },
              legend: {
                textStyle: {
                  color: '#000'
                },
                left: '70%',
                data: ['订单总数量', '已报关订单数量', '待报关订单数量']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  splitLine: {
                    show: false
                  },
                  type: 'category',
                  data: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05'],
                  axisTick: {
                    show: false
                  },
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: '#000'
                    }
                  },
                  axisLine: {
                    show: true
                  }
                }
              ],
              yAxis: [
                {
                  splitLine: {
                    show: true
                  },
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: '#000'
                    },
                    formatter: function (value, index) {
                      if (value < 1000) {
                        return value
                      } else if (value >= 1000 && value < 1000000) {
                        return value / 1000 + 'K'
                      } else if (value >= 1000000) {
                        return value / (1000 * 1000) + 'M'
                      }
                    }
                  },
                  axisLine: {
                    show: true
                  },
                  axisTick: { show: false },
                  type: 'value'
                }
              ],
              dataZoom: [{ type: 'inside' }],
              series: [
                {
                  name: '订单总数量',
                  type: 'bar',
                  label: {
                    normal: {
                      show: true,
                      position: 'top',
                      textStyle: {
                        color: '#000'
                      },
                      formatter: function (p) {
                        let sp = Number.parseInt(p.value)
                        if (sp < 1000) {
                          return sp
                        } else if (sp >= 1000 && sp < 1000000) {
                          return Number.parseFloat(sp / 1000).toFixed(2) + 'K'
                        } else if (sp >= 1000000) {
                          return Number.parseFloat(sp / (1000 * 1000)).toFixed(2) + 'M'
                        }
                      }
                    }
                  },
                  barWidth: '10%',
                  data: [22, 22, 22, 22, 22]
                },
                {
                  name: '已报关订单数量',
                  type: 'bar',
                  label: {
                    normal: {
                      show: true,
                      position: 'top',
                      textStyle: {
                        color: '#000'
                      },
                      formatter: function (p) {
                        let sp = Number.parseInt(p.value)
                        if (sp < 1000) {
                          return sp
                        } else if (sp >= 1000 && sp < 1000000) {
                          return Number.parseFloat(sp / 1000).toFixed(2) + 'K'
                        } else if (sp >= 1000000) {
                          return Number.parseFloat(sp / (1000 * 1000)).toFixed(2) + 'M'
                        }
                      }
                    }
                  },
                  barWidth: '10%',
                  data: [33, 33, 33, 33, 33]
                },
                {
                  name: '待报关订单数量',
                  type: 'bar',
                  label: {
                    normal: {
                      show: true,
                      position: 'top',
                      textStyle: {
                        color: '#000'
                      },
                      formatter: function (p) {
                        let sp = Number.parseInt(p.value)
                        if (sp < 1000) {
                          return sp
                        } else if (sp >= 1000 && sp < 1000000) {
                          return Number.parseFloat(sp / 1000).toFixed(2) + 'K'
                        } else if (sp >= 1000000) {
                          return Number.parseFloat(sp / (1000 * 1000)).toFixed(2) + 'M'
                        }
                      }
                    }
                  },
                  barWidth: '10%',
                  data: [44, 44, 44, 44, 44]
                }
              ]
            }
            this.chart = echarts.init(document.querySelector('#container-histogram'))
            this.chart.setOption(this.option)
          }
      },
      mounted() {
        // this.getData()
        this.drawChart()
        window.onresize = () => {
          this.chart.resize()
        }
      }
    }
</script>

<style scoped>
.storage-box-right {
    width: 94%;
    height: 100%;
    overflow: auto;
    padding-left: 5px;
}
.storage-box-right .dashboard-main {
    width: 90%;
    margin: 0 auto;
    padding: 100px 0 34px;
    padding-top: 70px;
    padding-bottom: 100px;
}
.storage-box-right .dashboard-main .dashboard-main-mokuai {
    border: 1px solid #d7d7d7;
    background-color: #f2f2f2;
    color: #797979;
    text-align: center;
    padding: 28px 0px 12px 0;
    margin: 0 2%;
    width: 21%;
    float: left;
    text-decoration: none;
}
#container-histogram{
  width: 100%;
  height: 350px;
}
@media screen  and (max-width: 1600px){
   .storage-box-right .dashboard-main {
    width: 90%;
    margin: 0 auto;
    padding: 100px 0 34px;
    padding-top: 40px;
    padding-bottom: 80px;
} 
}
@media screen  and (max-width: 1366px){
   .storage-box-right .dashboard-main {
    width: 90%;
    margin: 0 auto;
    padding: 100px 0 34px;
    padding-top: 10px;
    padding-bottom: 40px;
} 
#container-histogram{
  width: 100%;
  height: 270px;
}
}
</style>
