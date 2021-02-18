<template>
  <div class="right-bg-box">
    <div class="right-bg">
      <h4 class="model-title">订单详情</h4>
      <img class="arrow_r"
           src="../../../../../../assets/update/right_bg.jpg"
           alt="">
      <div class="modular_box">
        <div class="modular1">
          <div class="text_box">
            <p class="text-date">
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='allNum.orderPerday'
                       :duration='2400'
                       v-if="orderQuery.orderStatus == ''"></countTo>
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='orderNum.orderPerday'
                       :duration='2400'
                       v-if="orderQuery.orderStatus === '[0,1]'"></countTo>
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='abnoumalityNum.orderPerday'
                       :duration='2400'
                       v-if="orderQuery.orderStatus === -1"></countTo>
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='cancellationNum.orderPerday'
                       :duration='2400'
                       v-if="orderQuery.orderStatus === 2"></countTo>
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='returnNum.orderPerday'
                       :duration='2400'
                       v-if="orderQuery.orderStatus === 3"></countTo>
            </p>
            <p class="text-title"
               v-if="orderQuery.orderStatus == ''">昨日单量</p>
            <p class="text-title"
               v-if="orderQuery.orderStatus === '[0,1]'">当日正常单量</p>
            <p class="text-title"
               v-if="orderQuery.orderStatus === -1">当日异常单量</p>
            <p class="text-title"
               v-if="orderQuery.orderStatus === 2">当日取消单量</p>
            <p class="text-title"
               v-if="orderQuery.orderStatus === 3">当日退货单量</p>
          </div>
          <img class="icon01"
               src="../../../../../../assets/update/yc_ico1_b.png"
               alt="">
          <img class="icon02"
               src="../../../../../../assets/update/yc_ico1_w.png"
               alt="">
        </div>
        <div class="modular2">
          <div class="text_box">
            <p class="text-date">
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='allNum.orderTotal'
                       :duration='2400'
                       v-if="orderQuery.orderStatus == ''"></countTo>
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='orderNum.orderTotal'
                       :duration='2400'
                       v-if="orderQuery.orderStatus === '[0,1]'"></countTo>
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='abnoumalityNum.orderTotal'
                       :duration='2400'
                       v-if="orderQuery.orderStatus === -1"></countTo>
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='cancellationNum.orderTotal'
                       :duration='2400'
                       v-if="orderQuery.orderStatus === 2"></countTo>
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='returnNum.orderTotal'
                       :duration='2400'
                       v-if="orderQuery.orderStatus === 3"></countTo>
            </p>
            <p class="text-title"
               v-if="orderQuery.orderStatus == ''">总单量</p>
            <p class="text-title"
               v-if="orderQuery.orderStatus === '[0,1]'">总正常单量</p>
            <p class="text-title"
               v-if="orderQuery.orderStatus === -1">总异常单量</p>
            <p class="text-title"
               v-if="orderQuery.orderStatus === 2">总取消单量</p>
            <p class="text-title"
               v-if="orderQuery.orderStatus === 3">总退货单量</p>
          </div>
          <img class="icon01"
               src="../../../../../../assets/update/icon_b2.png"
               alt="">
          <img class="icon02"
               src="../../../../../../assets/update/icon_w2.png"
               alt="">
        </div>
        <div class="modular3">
          <div class="text_box">
            <p class="text-date">
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='allNum.taxTotal'
                       :duration='2400'
                       :decimals='2'
                       v-if="orderQuery.orderStatus == ''"></countTo>
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='orderNum.taxTotal'
                       :duration='2400'
                       :decimals='2'
                       v-if="orderQuery.orderStatus === '[0,1]'"></countTo>
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='abnoumalityNum.taxTotal'
                       :duration='2400'
                       :decimals='2'
                       v-if="orderQuery.orderStatus === -1"></countTo>
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='cancellationNum.taxTotal'
                       :duration='2400'
                       :decimals='2'
                       v-if="orderQuery.orderStatus === 2"></countTo>
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='returnNum.taxTotal'
                       :duration='2400'
                       :decimals='2'
                       v-if="orderQuery.orderStatus === 3"></countTo>
            </p>
            <p class="text-title"
               v-if="orderQuery.orderStatus == ''">总税费</p>
            <p class="text-title"
               v-if="orderQuery.orderStatus === '[0,1]'">正常总税费</p>
            <p class="text-title"
               v-if="orderQuery.orderStatus === -1">异常总税费</p>
            <p class="text-title"
               v-if="orderQuery.orderStatus === 2">取消总税费</p>
            <p class="text-title"
               v-if="orderQuery.orderStatus === 3">退货总税费</p>
          </div>
          <img class="icon01 allSF"
               src="../../../../../../assets/update/icon_b3.png"
               alt="">
          <img class="icon02 allSF2"
               src="../../../../../../assets/update/icon_w3.png"
               alt="">
        </div>
        <div class="modular4">
          <div class="text_box">
            <p class="text-date">
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='allNum.valueTotal'
                       :duration='2400'
                       :decimals='2'
                       v-if="orderQuery.orderStatus == ''"></countTo>
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='orderNum.valueTotal'
                       :duration='2400'
                       :decimals='2'
                       v-if="orderQuery.orderStatus === '[0,1]'"></countTo>
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='abnoumalityNum.valueTotal'
                       :duration='2400'
                       :decimals='2'
                       v-if="orderQuery.orderStatus === -1"></countTo>
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='cancellationNum.valueTotal'
                       :duration='2400'
                       :decimals='2'
                       v-if="orderQuery.orderStatus === 2"></countTo>
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='returnNum.valueTotal'
                       :duration='2400'
                       :decimals='2'
                       v-if="orderQuery.orderStatus === 3"></countTo>
            </p>
            <p class="text-title"
               v-if="orderQuery.orderStatus == ''">总货值</p>
            <p class="text-title"
               v-if="orderQuery.orderStatus === '[0,1]'">正常总货值</p>
            <p class="text-title"
               v-if="orderQuery.orderStatus === -1">异常总货值</p>
            <p class="text-title"
               v-if="orderQuery.orderStatus === 2">取消总货值</p>
            <p class="text-title"
               v-if="orderQuery.orderStatus === 3">退货总货值</p>
          </div>
          <img class="icon01 allSF"
               src="../../../../../../assets/update/icon_b4.png"
               alt="">
          <img class="icon02 allSF2"
               src="../../../../../../assets/update/icon_w4.png"
               alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { addObj, putObj } from "api/orderSys/sellBsorderHead/index";
import countTo from 'vue-count-to'
import { mapGetters } from "vuex";
export default {
  name: "update",
  props: {
    orderNum: { type: Object },
    orderQuery: { type: Object },
    abnoumalityNum: { type: Object },
    cancellationNum: { type: Object },
    cancellationNum: { type: Object },
    returnNum: { type: Object },
    allNum: { type: Object }
  },
  data () {
    return {
      //  jde
    }
  },
  components: { countTo },
} 
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
      margin: 27px 0 30px 40px;
    }
    .arrow_r {
      position: fixed;
      top: 120px;
    }
    .modular_box {
      position: relative;
    }
    .modular1,
    .modular2,
    .modular3,
    .modular4 {
      background: url('../../../../../../assets/update/w_ico.png') no-repeat;
      background-size: contain;
      width: 238px;
      height: 152px;
      position: absolute;
      left: 11.85%;
      margin-left: -169px;
      margin-bottom: 20px;
      .text_box {
        display: inline-block;
        .text-date {
          color: #455ff3;
          padding: 38px 0 0 20px;
          font-size: 20px;
        }
        .text-title {
          color: #455ff3;
          margin: 18px 0 0 20px;
          border-left: 2px solid #455eee;
          padding-left: 9px;
        }
      }
      .icon01 {
        float: right;
        margin: 65px 12px 0 0;
        width: 50px;
      }
      .icon02 {
        display: none;
        width: 50px;
      }
    }
    .modular2 {
      top: 159px;
    }
    .modular3 {
      top: 318px;
    }
    .modular4 {
      top: 478px;
    }
    .modular1:hover,
    .modular2:hover,
    .modular3:hover,
    .modular4:hover {
      background: url('../../../../../../assets/update/l_ico.png') no-repeat;
      background-size: contain;
      .text-date {
        color: #d3ecfe;
      }
      .text-title {
        color: #fff;
        border-left: 2px solid #d2edfe;
      }
      .icon01 {
        display: none;
      }
      .icon02 {
        display: block;
        float: right;
        margin: 65px 12px 0 0;
      }
    }
  }
}
@media screen and (max-width: 1680px) {
  .right-bg-box {
    .right-bg {
      .model-title {
        // font-size:19px;
        margin: 27px 0 23px 40px;
      }
      .modular1,
      .modular2,
      .modular3,
      .modular4 {
        width: 216px;
        height: 152px;
        margin-left: -151px;
        .text_box {
          .text-date {
            padding: 32px 0 0 15px;
            font-size: 20px;
          }
          .text-title {
            margin: 18px 0 0 20px;
            font-size: 15px;
          }
        }
        .icon01 {
          margin: 55px 12px 0 0;
          width: 45px;
        }
        .allSF {
          margin: 55px 12px 0 0;
          width: 45px;
        }
      }
      .modular2 {
        top: 144px;
      }
      .modular3 {
        top: 288px;
      }
      .modular4 {
        top: 428px;
      }
      .modular1:hover,
      .modular2:hover,
      .modular3:hover,
      .modular4:hover {
        width: 216px;
        height: 152px;
        margin-left: -151px;
        .icon02 {
          margin: 55px 12px 0 0;
          width: 45px;
        }
        .allSF2 {
          margin: 55px 12px 0 0;
          width: 45px;
        }
      }
    }
  }
}
@media screen and (max-width: 1600px) {
  .right-bg-box {
    .right-bg {
      .model-title {
        // font-size:17px;
        margin: 20px 0 17px 40px;
      }
      .arrow_r {
        top: 110px;
      }
      .modular1,
      .modular2,
      .modular3,
      .modular4 {
        width: 190px;
        height: 152px;
        margin-left: -139px;
        .text_box {
          .text-date {
            // padding: 32px 0 0 15px;
            font-size: 19px;
          }
          .text-title {
            // margin: 18px 0 0 20px;
            font-size: 14px;
          }
        }
        .icon01 {
          margin: 57px 10px 0 0;
          width: 37px;
        }
        .allSF {
          margin: 57px 12px 0 0;
          width: 37px;
        }
      }
      .modular2 {
        top: 129px;
      }
      .modular3 {
        top: 258px;
      }
      .modular4 {
        top: 383px;
      }
      .modular1:hover,
      .modular2:hover,
      .modular3:hover,
      .modular4:hover {
        width: 190px;
        height: 152px;
        margin-left: -139px;
        .icon02 {
          margin: 57px 10px 0 0;
          width: 37px;
        }
        .allSF2 {
          margin: 57px 12px 0 0;
          width: 37px;
        }
      }
    }
  }
}
@media screen and (max-width: 1440px) {
  .right-bg-box {
    .right-bg {
      .model-title {
        // font-size:16px;
        // margin: 20px 0 17px 40px;
      }
      .modular1,
      .modular2,
      .modular3,
      .modular4 {
        width: 184px;
        height: 152px;
        margin-left: -136px;
        .text_box {
          .text-date {
            font-size: 18px;
          }
        }
        .icon01 {
          margin: 57px 10px 0 0;
          width: 37px;
        }
        .allSF {
          margin: 57px 12px 0 0;
          width: 37px;
        }
      }
      .modular2 {
        top: 125px;
      }
      .modular3 {
        top: 250px;
      }
      .modular4 {
        top: 371px;
      }
      .modular1:hover,
      .modular2:hover,
      .modular3:hover,
      .modular4:hover {
        width: 184px;
        height: 152px;
        margin-left: -136px;
        .icon02 {
          margin: 57px 10px 0 0;
          width: 37px;
        }
        .allSF2 {
          margin: 57px 12px 0 0;
          width: 37px;
        }
      }
    }
  }
}
@media screen and (max-width: 1366px) {
  .right-bg-box {
    .right-bg {
      .model-title {
        // font-size:15px;
        margin: 13px 0 10px 40px;
      }
      .arrow_r {
        top: 100px;
      }
      .modular1,
      .modular2,
      .modular3,
      .modular4 {
        width: 144px;
        height: 152px;
        margin-left: -112px;
        .text_box {
          .text-date {
            padding: 22px 0 0 12px;
            font-size: 14px;
          }
          .text-title {
            margin: 10px 0 0 14px;
            font-size: 11px;
            padding-left: 6px;
          }
        }
        .icon01 {
          margin: 30px 6px 0 0;
          width: 37px;
        }
        .allSF {
          margin: 30px 12px 0 0;
          width: 37px;
        }
      }
      .modular2 {
        top: 99px;
      }
      .modular3 {
        top: 198px;
      }
      .modular4 {
        top: 293px;
      }
      .modular1:hover,
      .modular2:hover,
      .modular3:hover,
      .modular4:hover {
        width: 144px;
        height: 152px;
        margin-left: -112px;
        .icon02 {
          margin: 30px 6px 0 0;
          width: 38px;
        }
        .allSF2 {
          margin: 30px 12px 0 0;
          width: 37px;
        }
      }
    }
  }
}
</style>

