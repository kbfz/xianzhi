<template>
  <div class="order">
    <!-- <div class="top">
       <div class="topfont">
          订单信息管理统计
           <span>2018.01.25</span> 
      </div>
    </div> -->
    <div class="order_top">
      <div>
        <h4 class="topfont">
          总览
        </h4>
        <img src="../../../assets/images/u34.png"
             alt=""
             class="topImg">
      </div>
      <ul class="orderul">
        <li class="orderTop">
          <div>
            <p class="topNum">
               <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='orderNum.todayOrderNum'
                       :duration='2400'
                       ></countTo></p>
            <span class="topText">昨日单量</span>
          </div>

          <!-- <percent-bar :value="orderNum.todayOrderNum"
                       :options="options1"></percent-bar> -->
        </li>
        <li class="orderTop">
          <!-- <percent-bar :value="orderNum.totalOrderNum"
                       :options="options2"></percent-bar> -->
          <div>
            <p class="topNum">
               <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='orderNum.totalOrderNum'
                       :duration='2400'
                       ></countTo></p>
            <span class="topText">总单量</span>
          </div>

        </li>
        <li class="orderTop">
          <!-- <percent-bar :value="orderNum.totalTax"
                       :options="options3"></percent-bar> -->
          <div>
            <p class="topNum">
               <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='orderNum.totalTax'
                       :duration='2400'
                       :decimals='2'
                       ></countTo></p>
            <span class="topText">总税费</span>
          </div>

        </li>
        <li class="orderTop"
            v-if="orderNum.securityBalance !== undefined">
          <!-- <percent-bar :value="orderNum.securityBalance"
                       :options="options4"></percent-bar> -->
          <div>
            <p class="topNum">
               <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='orderNum.securityBalance'
                       :duration='2400'
                       :decimals='2'
                       ></countTo></p>
            <span class="topText">保证金截余</span>
          </div>

        </li>
      </ul>
    </div>
    <div class="order_bottom">
      <h2>近15日订单详情</h2>
      <!-- <div class="orderTime">
        <el-date-picker v-model="startTime"
                        type="date"
                        format="yyyy-MM-dd"
                        placeholder="选择开始日期">
        </el-date-picker>
        <el-date-picker v-model="endTime"
                        type="date"
                        format="yyyy-MM-dd"
                        placeholder="选择结束日期" class="ml20">
        </el-date-picker>
        <el-button class="filter-item ml20"
                   type="primary" >查询</el-button>
      </div> -->
      <div class='chart-container'>
        <chart height='100%'
               width='100%'
               :resizeflag="childResize"></chart>
      </div>
    </div>

  </div>
</template>

<script>
import {
  getObj
} from 'api/orderSys/orderIndex/index'
import Chart from '@/components/Charts/orderchart'
import percentBar from 'svg-progress-bar';  //动态进度条
import countTo from 'vue-count-to'
export default {
  // components:{percentBar},
  components: { Chart, percentBar, countTo },
  name: '',
  data () {
    return {
      // msgnum: Math.floor(Math.random() * 10000000),
      radio: '日',
      childResize: true,
      startTime: '',
      endTime: '',
      orderNum: {
        todayOrderNum: 0,
        totalOrderNum: 0,
        totalTax: 0,
        securityBalance: 0
      }
    }
  },
  mounted () {
    window.onresize = () => {
      // 触发resize
      this.childResize = !this.childResize;
    }
  },
  created () {
    this.getNum()
  },
  methods: {
    getNum () {
      getObj().then(res => {
        this.orderNum = res.data
      })
    }
  },
  computed: {
    // options1 () {
    //   return {
    //     radius: 60,
    //     maxValue: 200000,
    //     text: function (value) {
    //       return '<span style="font-size: 0.8em;">' + this.htmlifyNumber(value) + ' </span>' + '<p style="font-size: 0.3em; color:#333;margin: -80% 0 0;">今日单量</p>';
    //     },
    //     textColor: 'rgb(109, 212, 255)',
    //     pathColors: ['#dddddd', 'rgb(109, 212, 255)'],
    //     circleWidth: 2,
    //   }
    // },
    // options2 () {
    //   return {
    //     radius: 60,
    //     maxValue: 500000,
    //     text: function (value) {
    //       return '<span style="font-size: 0.8em;">' + this.htmlifyNumber(value) + ' </span>' + '<p style="font-size: 0.3em; color:#333;margin: -80% 0 0;">总单量</p>';
    //     },
    //     textColor: 'rgb(109, 186, 255)',
    //     pathColors: ['#dddddd', 'rgb(109, 186, 255)'],
    //     circleWidth: 2,
    //   }
    // },
    // options3 () {
    //   return {
    //     radius: 60,
    //     maxValue: 500000,
    //     text: function (value) {
    //       return '<span style="font-size: 0.8em;">' + this.htmlifyNumber(value) + ' </span>' + '<p style="font-size: 0.3em; color:#333;margin: -80% 0 0;">总税费</p>';
    //     },
    //     textColor: '#D9001B',
    //     pathColors: ['#dddddd', '#D9001B'],
    //     circleWidth: 2,
    //   }
    // },
    // options4 () {
    //   return {
    //     radius: 60,
    //     maxValue: 500000,
    //     text: function (value) {
    //       return '<span style="font-size: 0.8em;">' + this.htmlifyNumber(value) + ' </span>' + '<p style="font-size: 0.3em; color:#333;margin: -80% 0 0;">保证金截余</p>';
    //     },
    //     textColor: '#D9001B',
    //     pathColors: ['#dddddd', '#D9001B'],
    //     circleWidth: 2,
    //   }
    // },

  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
ul {
  padding: 0;
}
.order {
  font-size: 12px;
  .order_top {
    width: 99%;
    height: 260px;
    margin: 0 auto;
    border: 1px solid #d4d4d4;
    .topfont {
      margin-left: 20px;
      margin-top: 20px;
      font-size: 17px;
      float: left;
      color: #7f7f7f;
    }
    .topImg {
      margin-top: 17px;
    }
    .orderul {
      height: 180px;
      width: 100%;
      margin-top: 40px;
    }
    .orderTop {
      float: left;
      width: 20%;
      text-align: center;
      div {
      width: 120px;
      height: 120px;
      text-align: center;
      border: 1px solid #dddddd;
      border-radius: 60px;
      margin: 0 auto;
      .topNum{
        font-size: 18px;
        color: rgb(109, 186, 255);
        margin-top: 45px;
        margin-bottom: 0;
      }
      .topText{
        display: inline-block;
        margin-top: 5px;
      }
      }
    }
  }
  .order_bottom {
    padding-top: 30px;
    width: 99%;
    margin: 0 auto;
    overflow: hidden;
    h2 {
      float: left;
      color: #aaaaaa;
    }
    .orderTime {
      width: 70%;
      margin: 0 auto;
      margin-top: 30px;
      text-align: center;
      .ml20 {
        margin-left: 20px;
      }
    }
  }
  .allnum {
    margin: 2% 5%;
    display: block;
    li {
      float: left;
      margin-right: 2%;
    }
  }

  .chart-container {
    position: relative;
    padding: 20px 0;
    overflow: hidden;
    width: 100%;
    height: 43vh;
  }
}
@media screen and (max-width: 1650px) {
  .orderTop ul {
    margin: 2% 25%;
  }
}
@media screen and (max-width: 1400px) {
  .orderTop ul {
    margin: 1% 20%;
  }
}
</style>