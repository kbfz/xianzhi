<template>
  <div class="chars">
    <ul class="titlebox">
      <li class="title">本年单量</li>
      <ul class="right-tex">
        <li>月单量</li>
          <li>
            <el-pagination small layout="prev, pager, next" :total="120">
            </el-pagination>
        </li>
      </ul>
    </ul>
    <div class="middlebox">
      <div class="middleleft">
        <ul>
          <li><i class="el-icon-minus blue"></i>&nbsp;&nbsp;进口订单总额</li>
          <li class="bluetex">
            <countTo class="info-item-num" :startVal='0' :endVal='order.allNum' :duration='2400'></countTo>
          </li>
          <li><img src="./ERP_nav2_03.png"></li>
        </ul>
        <ul>
          <li><i class="el-icon-minus red"></i>&nbsp;&nbsp;出口订单总额</li>
          <li class="redtex">
             <countTo class="info-item-num" :startVal='0' :endVal='order.allMoney' :duration='2400'></countTo>
          </li>
          <li><img src="./ERP_nav2_05.png"></li>
        </ul>
      </div>
      <div class="middleright">
        <div class="rightbox">
          <h3>01月份订单量</h3>
          <ul style="padding-left:0">
            <li>
              <span>进口订单</span><br>
              &nbsp;&nbsp;&nbsp; <countTo class="info-item-num" :startVal='0' :endVal='68334' :duration='2400'></countTo>
            </li>
          </ul>
          <ul>
            <li>
              <span>出口订单</span><br>
              &nbsp;&nbsp;&nbsp;<countTo class="info-item-num" :startVal='0' :endVal='7383' :duration='1400'></countTo>
            </li>
          </ul>
        </div>
        <div class="rightbox second">
          <h3>02月份订单量</h3>
          <ul style="padding-left:0">
            <li>
              <span>进口订单</span><br>
              &nbsp;&nbsp;&nbsp;<countTo class="info-item-num" :startVal='0' :endVal='8888' :duration='2400'></countTo>
            </li>
          </ul>
          <ul>
            <li>
              <span>出口订单</span><br>
              &nbsp;&nbsp;&nbsp;<countTo class="info-item-num" :startVal='0' :endVal='6555' :duration='2400'></countTo>
            </li>
          </ul>
        </div>
        <div class="rightbox third">
          <h3>03月份订单量</h3>
          <ul style="padding-left:0">
            <li>
              <span>进口订单</span><br>
              &nbsp;&nbsp;&nbsp;<countTo class="info-item-num" :startVal='0' :endVal='39883' :duration='2400'></countTo>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="charts">
      <div id="myChart1" class="echartHeight"></div>
    </div>
  </div>
   
</template>
<script>
  import countTo from 'vue-count-to';
  // var echarts = require('echarts/lib/echarts')
export default {
  name: "newIndex",
  data() {
    return {
       order: {
        allNum: Math.floor(Math.random() * 1000000),
        allMoney: Math.floor(Math.random() * 1000000)
      },
      mainChart: undefined

    };
  },
  components: { countTo },
  methods: {
     rendrenEchart(){
     this.mainChart = echarts.init(document.querySelector('#myChart1'))// 基于准备好的dom，初始化echarts实例
     // 指定图表的配置项和数据
     let option = {
         title: {
              text: ''
           },
         tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#ddd'
            }
          },
          backgroundColor: 'rgba(255,255,255,1)',
          // padding: [5, 10],
          textStyle: {
            color: '#7588E4',
          },
          extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
        },
          xAxis: {
            type: 'category',
            data: ['00:00','2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00'],
            boundaryGap: false,
            splitLine: {
              show: true,
              interval: 'auto',
              lineStyle: {
                color: ['#e9ecec']
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#e9ecec'
              }
            },
            axisLabel: {
              // margin: 10,
              textStyle: {
                fontSize: 14
              }
            }
          },
          yAxis: {
            type: 'value',
            splitLine: {
            lineStyle: {
              color: ['#e9ecec']
              }
            },
            axisTick: {
            show: false
            },
            axisLine: {
            lineStyle: {
              color: '#e9ecec'
              }
            },
            axisLabel: {
            // margin: 10,
            textStyle: {
              fontSize: 14
              }
            }
          },
          series: [{
            name: '进口',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: ['1200', '1400', '1008', '1411', '1026', '1288', '1300', '800', '1100', '1000','2000','1800' ],
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(252, 230, 231,0.65)'
                    }, {
                        offset: 1,
                        color: 'rgba(229, 235, 250,0.65)'
                    }], false)
                }
            },
            itemStyle: {
                normal: {
                    color: '#f7b851'
                }
            },
            lineStyle: {
                normal: {
                    width: 2
                }
            }
          }, {
            name: '出口',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: ['1200', '1400', '808', '811', '626', '488', '1600', '1100', '500', '300', '600','300'],
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(229, 235, 250,1)'
                    }, {
                        offset: 1,
                        color: 'rgba(229, 235, 250,1)'
                    }], false)
                }
            },
            itemStyle: {
                normal: {
                    color: '#1353ff'
                }
            },
            lineStyle: {
                normal: {
                    width: 2
                }
            }
        }]
      };
         this.mainChart.setOption(option, true)
     window.onresize = () => {
       this.mainChart.resize()
     }
     }
  },
  mounted(){
    this.rendrenEchart();
  }
};
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.chars {
  font-size: 14px;
  .titlebox {
    padding: 0 3%;
    height: 50px;
    .title {
      font-size: 22px;
      color: #333333;
      font-weight: bold;
      float: left;
    }
    .right-tex{
      font-size: 12px;
      float: right;
      line-height: 30px;
      li{
        float: left;
      }
    }
  }
  .middlebox{
    padding-left: 5%;
    margin-bottom: 5%;
    .middleleft{
      ul{
        float: left;
        margin-right: 5%;
      }
      .blue{
        color: #1353ff;
      }
      .red{
        color: #e65d65;
      }
      .bluetex{
        font-size: 24px;
        color: #1353ff;
      }
      .redtex{
        font-size: 24px;
        color: #e65d65;
      }
    }
    .middleright{
      float: right;
      color: white;
      .rightbox{
        background: url('./y_qx.png') no-repeat bottom , #455ff3;
        padding: 10px 80px 10px 30px;
        height: 150px;
        font-size: 12px;
        border-radius: 5px;
        float: left;
        margin-right: 10px;
        // box-shadow: 0 12px 0 #3347b4;
        h3{
          font-size: 16px;
        }
        ul{
          float: left;
          margin-left: 0;
          span{
            border-left: 2px white solid;
            padding-left: 5px;
          }
        }
      }
      .second{
        padding: 0px 50px 8px 20px;
        height: 140px;
        background-color: #4d68f2;
      }
      .third{
        padding: 0 0 0 10px;
        height: 120px;
        background-color: #687ff4;
      }

    }
  }
}
.echartHeight{
  height: 500px;
  width: 100%
}
@media screen and (max-width: 1600px) {
  .echartHeight{
  height: 350px;
  width: 100%
}
}
@media screen and (max-width: 1366px) {
  .echartHeight{
  height: 250px;
  width: 90%
}
}
@media screen and (max-width: 1310px) {
  .chars .middlebox .middleleft ul[data-v-2337b7c6] {
    float: left;
    margin-right: 1.5%;
}
.chars .middlebox[data-v-2337b7c6] {
   padding-left: 0%;
    margin-bottom: 5%;
}
}
</style>


