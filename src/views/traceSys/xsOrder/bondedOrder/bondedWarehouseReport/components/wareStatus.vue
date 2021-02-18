<template>
  <div class="right-bg-box">
    <div class="right-bg"> 
      <h4 class="model-title">仓库作业报表</h4>
      <p class="model-slot" v-if="timeShow">（数据统计{{dateMonth.date}}）</p>
      <p class="model-slot" v-else>（数据统计{{tableDataLine.statisticsDate}}）</p>
      <img class="arrow_r" src="../../../../../../assets/update/right_bg.jpg" alt="">
      <div class="modular_box">
        <div class="report"> 
          <ul class="reportul">
            <li class="reportTop">
              <percent-bar :value="orderProbability.warehouseRate * 100" :options="options1"></percent-bar>
            </li>
          </ul>
          <ul class="reportu2">
            <li class="receive">
              <img src="../../../../../../assets/images/ware_r_ico1.png" alt="">
            </li>
            <li class="text">
              <p class="re_text">仓库接收单量</p>
              <p class="re_num">
               <!-- {{orderProbability.warehouseStockIn}} -->
                 <countTo class="info-item-num" :startVal='0' :endVal='orderProbability.warehouseStockIn' :duration='1000'> </countTo>
                <span class="dan">单</span></p>
            </li>
          </ul>
          <ul class="reportu2">
            <li class="receive">
              <img src="../../../../../../assets/images/ware_r_ico2.png" alt="">
            </li>
            <li class="text">
              <p class="re_text">仓库出区单量</p>
              <p class="re_num">
                <!-- {{orderProbability.warehouseStockOut}} -->
                <countTo class="info-item-num"   :startVal='0'  :endVal='orderProbability.warehouseStockOut' :duration='1000'></countTo>
                <span class="dan">单</span></p>
            </li>
          </ul>
        </div>  
      </div> 
    </div>
  </div>
</template>
<script>
// import { addObj, putObj } from "api/orderSys/sellBsorderHead/index";
import Chart from "@/components/Charts/reportchart";
import percentBar from "svg-progress-bar"; //动态进度条
import countTo from 'vue-count-to'
import { mapGetters } from "vuex";
export default {
  // components:{percentBar},
  components: { countTo, Chart, percentBar },
  name: "wareStatus",
    props: {
      dateMonth: {type: Object},
      orderProbability: { type: Object},
      tableDataLine: {type: Object}
    },
  data() {
    return {
      timeShow: true,
      msgnum: Math.floor(Math.random() * 10000000)
    };
  },
  methods: {
  },
  computed: {
    options1() {
      return {
        radius: 55,
        text: function(value) {
          return (
            this.htmlifyNumber(value) +
            '<span style="font-size: 0.4em;">%</span>' +
            '<p style="font-size: 0.4em; color:#666;margin: -80% 0 0;">出区率</p>'
          );
        },
        textColor: 'rgb(69,95,243)',
        pathColors: ['#ddd', 'rgb(69,95,243)'],
        circleWidth: 2,
      };
    }
  }
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
p,
h4 {
  margin: 0;
  padding: 0;
}
.right-bg-box {
  position: relative;
  .right-bg {
    height: 100%;
    padding-right: 10px;
    background-color: #ececec;
    position: fixed;
    bottom: 0;
    top: 140px;
    width: 100%;
    .model-title {
      color: #333;
      // font-size:22px;
      margin: 27px 0 0 40px;
    }
    .model-slot{
      color: #999;
      font-size:13px;
      margin: 7px 0 30px 40px;

    }
    .arrow_r {
      position: fixed;
      top: 120px;
    }
    .modular_box {
      position: relative;
      .report{
         .reportul{
          width: 100%;
          padding: 27px 0 57px 5.5%;
          margin-left: 6px;
          border-bottom: 1px solid #ddd;
        }
      }
      .reportu2{
        padding: 15px 0 40px 4%;
        margin-left: 6px;
        border-bottom: 1px solid #ddd;
        .receive{
          float: left;
          margin-top: 5px;
          background:#455ff3;
          padding:12px;
          border-radius: 34px;
          margin-right: 30px;
        }
        .text{
          padding-top: 12px;
          .re_text{
            font-size: 14px;
            color:#333;
            margin-bottom: 5px;
          }
          .re_num{
            font-size: 25px;
            color:#455ff3;
            .dan{
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1600px){
  .right-bg-box {
    .right-bg {
      .model-title {
        margin: 27px 0 0 40px;
      }
      .model-slot{
        font-size:13px;
        margin: 7px 0 30px 36px;

      }
      .modular_box {
        .report{
          .reportul{
            padding: 15px 0 45px 4.3%;
          }
        }
        .reportu2{
          padding: 15px 0 40px 3.2%;
          .receive{
            padding:10px;
            margin-right: 20px;
          }
          .text{
            .re_text{
              font-size: 13px;
              margin-bottom: 5px;
            }
            .re_num{
              font-size: 23px;
              .dan{
                font-size: 13px;
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1366px){
  .right-bg-box {
    .right-bg {
      .model-title {
        // font-size: 14px;
        margin: 17px 0 0 26px;
      }
      .model-slot{
        font-size:12px;
        margin: 2px 0 20px 22px;

      }
      .arrow_r {
        top: 110px;
      }
      .modular_box {
        .report{
          .reportul{
            padding: 0 0 20px 4.2%;
          }
        }
        .reportu2{
          padding: 0 0 25px 2.5%;
          border-bottom: 1px solid #ddd;
          .receive{
            margin-right: 15px;
          }
          .text{
            padding-top: 14px;
            .re_text{
              font-size: 12px;
              margin-bottom: 5px;
            }
            .re_num{
              font-size: 21px;
              .dan{
                font-size: 11px;
              }
            }
          }
        }
      }
    }
  }  
}
</style>

