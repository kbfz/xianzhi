<template>
  <div class="finance">
    <div class="top">
      <div class="topfont">
          作业收费
      </div>
    </div>
    <ul class="financeul">
      <li class="financeTop">
        <span class="rightimg">
          <img src="../../../assets/images/cw_ico1.png">
        </span>
        <span class="smallfont">仓配</span>
        <p class="text-date">
          <span class="samll">￥</span>
          <countTo class="info-item-num" :startVal='0' :endVal='fee.totalWarehousFee' :decimals='2' :duration='1000'></countTo>
        </p>
      </li>
      <li class="financeTop">
        <span class="rightimg">
          <img src="../../../assets/images/cw_ico2.png">
        </span>
        <span class="smallfont">报关</span>
        <p class="text-date">
          <span class="samll">￥</span>
          <countTo class="info-item-num" :startVal='0' :endVal='fee.totalCustomsFee' :decimals='2' :duration='1000'></countTo>
        </p>
      </li>
      <li class="financeTop">
        <span class="rightimg">
          <img src="../../../assets/images/cw_ico3.png">
        </span>
        <span class="smallfont1">国际物流</span>
        <p class="text-date">
          <span class="samll">￥</span>
          <countTo class="info-item-num" :startVal='0' :endVal='fee.totalOutLogiticsFee' :decimals='2' :duration='1000'></countTo>
        </p>
      </li>
      <li class="financeTop">
        <span class="rightimg">
          <img src="../../../assets/images/cw_ico4.png">
        </span>
        <span class="smallfont1">国内物流</span>
        <p class="text-date">
          <span class="samll">￥</span>
          <countTo class="info-item-num" :startVal='0' :endVal='fee.totalInLogiticsFee' :decimals='2' :duration='1000'></countTo>
        </p>
      </li>
      <li class="financeTop">
        <span class="rightimg">
          <img src="../../../assets/images/cw_ico5.png">
        </span>
        <span class="smallfont1">技术服务</span>
        <p class="text-date">
          <span class="samll">￥</span>
          <countTo class="info-item-num" :startVal='0' :endVal='fee.totalTSFee' :decimals='2' :duration='1000'></countTo>
        </p>
      </li>
      <li class="financeTop">
        <span class="rightimg">
          <img src="../../../assets/images/cw_ico6.png">
        </span>
        <span class="smallfont1">待缴费用</span>
        <p class="text-date">
          <span class="samll">￥</span>
          <countTo class="info-item-num" :startVal='0' :endVal='fee.totaAdvanceFee' :decimals='2' :duration='1000'></countTo>
        </p>
      </li>
    </ul>
    <div class='chart-container'>
      <chart height='100%' width='100%' :resizeflag="childResize"></chart>
    </div>                      
  </div>  
</template>

<script>
import countTo from 'vue-count-to'
import Chart from '@/components/Charts/financialSys' 
import { feeStatics } from "api/financialSys/feeStatics/index";
var dateUtils = require("silly-datetime");
export default {
  // components:{percentBar},
  components: { countTo, Chart},
  name: '',
  props: {
    options: {
      useGrouping: false
    }
  },
  mounted() {
    window.onresize = () => {
      this.childResize = !this.childResize
    }
  },
  data () {
    return{
      fee: {
        totaAdvanceFee: 0,
        totalCustomsFee: 0,
        totalInLogiticsFee: 0,
        totalOutLogiticsFee: 0,
        totalTSFee: 0,
        totalWarehousFee: 0
      },
      childResize: true
    }
  },
  created() {
    this.getFeeStatics();
  },
  methods: {
    getFeeStatics() {
       let date = new Date();
       let end = dateUtils.format(date, "YYYY-MM-DD");
       date.setDate(1);
       let start = dateUtils.format(date, "YYYY-MM-DD");
       let param = {
       startTime:start,endTime:end
      };
      feeStatics(param).then(response => {
        this.$copyJsonProperty(this.fee, response.data);
      });
    }
  },
  computed: {
  }


}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
ul,p{
  padding: 0;
  margin: 0;
}
.finance{
  font-size: 14px;
  color: #666;
  .top{
    font-size: 22px;
    margin: 1% 0 0 2%;
    height: 50px;
    color: #333;
    font-weight: bold;
  }
  .financeul{
    height: 130px;
    margin: 1% 2%;
    .financeTop{
      width: 15.2%;
      background-color: #fcfcfc;
      padding-left: 10px;
      height: 130px;
      float: left;
      margin-right: 10px;
      .smallfont{
        text-align: center;
        display: block;
        padding-left: 90px;
        margin-top: -30px;
      }
       .smallfont1{
         text-align: center;
         display: block;
         padding-left: 110px;
         margin-top: -30px;
       }
      .text-date{
        color: #222;
        // padding: 38px 0 5px 0;
        font-size: 30px;
        text-align: center;
        line-height: 100px;
        .samll{
          font-size: 16px;
        }
      }
      .rightimg{
        height: 60px;
        width: 60px;
        text-align: center;
        display: block;
        margin: -25px auto;
        background-color: #fcfcfc;
        border-radius: 50%;
      }
    }
  }
  .chart-container{
    position: relative;
    // padding:20px 0;
    overflow: hidden;
    margin-top: 5%;
    width: 100%;
    height:50vh;
  }
}

@media screen  and (max-width: 1650px){
  .finance{
    .financeul{
      .financeTop{
        width: 30%;
        margin: 0 10px 30px 0;
        .rightimg{
          height: 60px;
          width: 60px;
          text-align: center;
          display: block;
          margin: -25px auto;
          background-color: #fcfcfc;
          border-radius: 50%;
        }
      }
    }
  }
}
@media screen  and (max-width: 1440px) {
  
}
</style>