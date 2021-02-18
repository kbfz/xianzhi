<template>
  <div class="right-bg-box">
    <div class="right-bg"> 
      <h3 class="model-title">订单申报报表</h3>
      <img class="arrow_r" src="../../../../../../assets/update/right_bg.jpg" alt="">
      <p class="status-top" v-if ="timeShow">（数据统计于 {{dateMonth.date}}）</p>
      <p class="status-top" v-else>（数据统计于 {{tableDataLine.statisticsDate}}）</p>
      <div class="status-box first">
        <percent-bar :value='orderProbability.declarationRate * 100' :options="options1"></percent-bar>
        <div class="status-tex">
          <span class="circle"></span>
          <span v-if="orderNumShow">接收申报 
            <countTo class="info-item-num textColor" :startVal='0' :endVal='tableDataLine.declarationAmount' :duration='2400'></countTo>
          <!-- {{tableDataLine.declarationAmount}} -->
          单</span>
          <span v-else>接收申报
            <!-- {{orderProbability.declaration}} -->
            <countTo class="info-item-num textColor" :startVal='0' :endVal='orderProbability.declaration' :duration='2400'></countTo>
            单</span>
        </div>
      </div>
      <div class="status-box">
        <percent-bar :value='orderProbability.declarationSuccessRate * 100' :options="options2"></percent-bar>
        <div class="status-tex">
          <span class="circle"></span>
          <span v-if="orderNumShow">接收放行
            <!-- {{tableDataLine.releaseAmount}} -->
            <countTo class="info-item-num textColor2" :startVal='0' :endVal='tableDataLine.releaseAmount' :duration='1000'></countTo>
            单</span>
           <span v-else>接收放行
             <!-- {{orderProbability.release}} -->
            <countTo class="info-item-num textColor2" :startVal='0' :endVal='orderProbability.release' :duration='1000'></countTo> 
             单</span>
        </div>
      </div>
      <div class="status-box">
        <percent-bar :value="orderProbability.checkRate * 100" :options="options3"></percent-bar>
        <div class="status-tex">
          <span class="circle"></span>
          <span v-if="orderNumShow">接收查验
            <!-- {{tableDataLine.checkAmountDay}} -->
            <countTo class="info-item-num textColor3" :startVal='0' :endVal='tableDataLine.checkAmountDay' :duration='1000'></countTo> 
            单</span>
          <span v-else>接收查验
            <!-- {{orderProbability.check}} -->
            <countTo class="info-item-num textColor3" :startVal='0' :endVal='orderProbability.check' :duration='1000'></countTo>             
            单</span>
        </div>
      </div> 
    </div>
  </div>
</template>
<script>
// import { addObj, putObj } from "api/orderSys/sellBsorderHead/index";
import percentBar from "svg-progress-bar"; //动态进度条
import countTo from "vue-count-to";
// import { mapGetters } from "vuex";
export default {
  name: "orderStatus",
  props: {
    dateMonth: { type: Object },
    orderProbability: { type: Object },
    tableDataLine: { type: Object }
  },
  data() {
    return {
      timeShow: true,
      orderNumShow: false
    };
  },
  components: { countTo, percentBar },
  computed: {
    options1() {
      return {
        radius: 50,
        text: function(value) {
          return (
            this.htmlifyNumber(value) +
            '<span style="font-size: 0.4em;">%</span>' +
            '<p style="font-size: 0.3em; color:#333;margin: -85% 0 0;">申报率</p>'
          );
        },
        textColor: "rgb(22, 197, 255)",
        pathColors: ["#dddddd", "rgb(22, 197, 255)"],
        circleWidth: 2
      };
    },
    options2() {
      return {
        radius: 50,
        text: function(value) {
          return (
            this.htmlifyNumber(value) +
            '<span style="font-size: 0.4em;">%</span>' +
            '<p style="font-size: 0.3em; color:#333;margin: -85% 0 0;">申报成功率</p>'
          );
        },
        textColor: "rgb(0, 144, 255)",
        pathColors: ["#dddddd", "rgb(0, 144, 255)"],
        circleWidth: 2
      };
    },
    options3() {
      return {
        radius: 50,
        text: function(value) {
          return (
            this.htmlifyNumber(value) +
            '<span style="font-size: 0.4em;">%</span>' +
            '<p style="font-size: 0.3em; color:#333;margin: -85% 0 0;">查验率</p>'
          );
        },
        textColor: "rgb(105, 94, 254)",
        pathColors: ["#dddddd", "rgb(105, 94, 254)"],
        circleWidth: 2
      };
    }
  }
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
p,
h3 {
  margin: 0;
  padding: 0;
}
.textColor{
  color: rgb(22, 197, 255);
  font-size: 14px;
}
.textColor2{
  color: rgb(0, 144, 255) 
}
.textColor3{
  color: rgb(105, 94, 254) 
}
.right-bg-box {
  position: relative;
  font-size: 13px;
  color: #333;
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
      margin: 27px 0 10px 40px;
    }
    .arrow_r {
      position: fixed;
      top: 120px;
    }
    .status-top {
      font-size: 13px;
      color: #999;
      margin: 0 0 10px 40px;
    }
    .first {
      border-style: solid none solid none !important;
      margin: 2% 0 0 7px;
    }
    .status-box {
      position: relative;
      padding: 1.5% 7%;
      margin-left: 7px;
      border: 1px #dddddd solid;
      border-style: none none solid none;
      .status-tex {
        margin: 1% -1%;
        .circle {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          float: left;
          margin: 7px;
          background-color: #959595;
        }
      }
    }
  }
}
@media screen and (max-width: 1650px) {
  .right-bg-box {
    font-size: 12px;
    .right-bg {
      .model-title {
        // font-size:19px;
        margin: 10px 0 5px 40px;
      }
      .first {
        margin: 1.5% 0 0 7px;
      }
      .status-box {
        padding: 1.3% 6%;
        .status-tex {
          margin: 0.5% -1%;
        }
      }
    }
  }
}
// @media screen and (max-width: 1600px){
//   .right-bg-box{
//     .right-bg {
//       .model-title{
//         // font-size:17px;
//         margin: 20px 0 10px 40px;
//       }
//       .arrow_r{
//         top: 110px;
//       }
//     }
//   }
// }
@media screen and (max-width: 1440px) {
  .right-bg-box {
    font-size: 11px;
    .right-bg {
      .model-title {
        // font-size:19px;
        margin: 5px 0 2px 20px;
      }
      .status-top {
        margin: 0 0 10px 20px;
      }
      .first {
        margin: 1% 0 0 7px;
      }
      .status-box {
        padding: 1% 6%;
        .status-tex {
          margin: 0 -1%;
        }
      }
    }
  }
}
</style>

