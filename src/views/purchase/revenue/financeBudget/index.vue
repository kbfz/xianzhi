<!--vue 看板页面 -->
<template>
  <div style="margin-right:8px;">
    <div class="storage-box-right pull-right mt15">
      <h4 style="margin-left: 1%;">财务收支总览</h4>
        <div class="filter-container"
             style="padding-bottom: 20px;margin-left: 1%;">
          <el-date-picker
        type="daterange"
        placeholder="请选择打款时间"
        style="width: 330px;"
        class="filter-item"
        @keyup.enter.native="getData"
        popper-class="timeSelect"
        range-separator="~"
        v-model="financeTime"
      ></el-date-picker>
          <el-button class="filter-item"
                     type="primary"
                     v-waves
                     icon="search"
                     @click="getData">查询</el-button>
        </div>
      <div class="dashboard-main clearfix">
        <div class="dashboard-main-mokuai" style="margin-left:0">
          <p class="dashboard-main-duixiang">待确认回款</p>
          <h2 class="dashboard-main-shuzi">
            <countTo
              class="info-item-num"
              :startVal="0"
              :endVal="form.unConfirmedAmount"
              :duration="1000"
              :decimals="2"
            ></countTo>
          </h2>
          <!-- <el-button class="btn" >确认回款</el-button>
          -->
          <img src="../../../../assets/update/but_pressed.png" alt v-if="paymentStatus == true" />
          <img src="../../../../assets/update/but_normal.png" alt v-else @click="surePayment" />
        </div>
        <div class="dashboard-main-mokuai" style="margin-left:0">
          <p class="dashboard-main-duixiang">结算总支出</p>
          <h2 class="dashboard-main-shuzi">
            <countTo
              class="info-item-num"
              :startVal="0"
              :endVal="form.payTotalAmount"
              :duration="1000"
              :decimals="2"
            ></countTo>
          </h2>
          <!-- <el-button class="btn" @click="expenditureClick">查看详情</el-button> -->
          <img src="../../../../assets/update/but_pressed.png" alt v-if="expenditureStatus == true" />
          <img src="../../../../assets/update/but_normal.png" alt v-else @click="expenditureClick" />
        </div>
        <div class="dashboard-main-mokuai" style="margin-left:0">
          <p class="dashboard-main-duixiang">财务总实收</p>
          <h2 class="dashboard-main-shuzi">
            <countTo
              class="info-item-num"
              :startVal="0"
              :endVal="form.receiveAmount"
              :duration="1000"
              :decimals="2"
            ></countTo>
          </h2>
          <!-- <el-button class="btn" @click="collectionClick">编辑</el-button> -->
          <img src="../../../../assets/update/but_pressed.png" alt v-if="collectionStatus == true" />
          <img src="../../../../assets/update/but_normal.png" alt v-else @click="collectionClick" />
        </div>
        <el-tooltip class="item" effect="dark" content="订单总支出=订单总税费+订单总运费" placement="right-end">
           <div class="dashboard-main-mokuai" style="margin-left:0">
          <p class="dashboard-main-duixiang" style="margin-top: 60px">订单总支出</p>
          <h2 class="dashboard-main-shuzi">
            <countTo
              class="info-item-num"
              :startVal="0"
              :endVal="form.orderPayTotal"
              :duration="1000"
              :decimals="2"
            ></countTo>
          </h2>
        </div>
        </el-tooltip>
          <el-tooltip class="item" effect="dark" content="净收入=财务总实收-订单总支出-结算总支出" placement="right-end">
            <div class="dashboard-main-mokuai" style="margin-left:0">
              <p class="dashboard-main-duixiang" style="margin-top: 60px">净收入</p>
              <h2 class="dashboard-main-shuzi">
                <countTo
                  class="info-item-num"
                  :startVal="0"
                  :endVal="form.profitTotalAmount"
                  :duration="1000"
                ></countTo>
              </h2>
            </div>
          </el-tooltip>
      </div>
    </div>
    <div class="storage-box-right pull-right mt30">
      <payment-index v-if="paymentStatus"></payment-index>
      <!-- 财务总支出 -->
      <expenditure-index v-if="expenditureStatus" @child="getData"></expenditure-index>
      <!-- 财务回款 -->
      <collection-index v-if="collectionStatus"></collection-index>
    </div>
  </div>
</template>

<script>
import { dataAllObj } from "api/purchase/revenue/index";

import countTo from "vue-count-to";
var dateUtils = require("silly-datetime");
export default {
  name: "dashboard",
  components: {
    countTo,
    // 确认回款
    "payment-index": () => import("./components/paymentIndex.vue"),
    // 财务总支出
    "expenditure-index": () => import("./components/expenditureIndex.vue"),
    // 财务总回款
    "collection-index": () => import("./components/collectionIndex.vue")
  },
  data() {
    return {
      startTime: "",
      endTime: "",
      form: {
        payTotalAmount: 0,
        profitTotalAmountr: 0,
        receiveAmount: 0,
        unConfirmedAmount: 0,
        orderPayTotal: 0
      },
      paymentStatus: true,
      expenditureStatus: false,
      collectionStatus: false,
      financeTime:''
    };
  },
  mounted() {},
  methods: {
    // 确认回款
    surePayment() {
      this.paymentStatus = true;
      this.expenditureStatus = false;
      this.collectionStatus = false;
    },
    // 总支出
    expenditureClick() {
      this.paymentStatus = false;
      this.expenditureStatus = true;
      this.collectionStatus = false;
    },
    // 回款
    collectionClick() {
      this.paymentStatus = false;
      this.expenditureStatus = false;
      this.collectionStatus = true;
    },
    // handleFilter () {
    //   if (this.tab(this.startTime, this.endTime)==false) {
    //     this.$message({
    //       message: "开始月份应小于结束月份！",
    //       type: 'error',
    //       duration: 2000
    //     });
    //     return false;
    //   }
    //   this.getData();
    //   // }
    // },
    //  统计
    getData() {
      let param = {
        times: this.financeTime,
      };
      if (param.times !== "") {
        var start =
          param.times[0] === null
            ? null
            : dateUtils.format(param.times[0], "YYYY-MM-DD");
        var end =
          param.times[1] === null
            ? null
            : dateUtils.format(param.times[1], "YYYY-MM-DD");
        param.times = `${start}~${end}`;
      }
      if (param.times == "null~null") {
        param.times = "";
      }
      localStorage.setItem('time',param.times);
      dataAllObj(param).then(res => {
        if (res.rel) {
          this.form = res.data;
        }
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
.storage-box-right {
  width: 99%;
  overflow: hidden;
  margin: 0 auto;
  border: 1px solid #f2f2f2;
}
.mt30 {
  margin-top: 15px;
  /* background: #eef1f6; */
  /* border-radius: 10px; */
  margin-bottom: 15px;
}
.mt15 {
  /* margin-top: 15px; */
}
.storage-box-right .dashboard-main {
  width: 98%;
  margin: 0 auto;
  padding-bottom: 20px;
  /* margin-top: 15px; */
}
.storage-box-right .dashboard-main h4 {
  color: #333333;
  margin-top: 20px;
}
.storage-box-right .dashboard-main .dashboard-main-mokuai {
  border: 1px solid #d8d8d8;
  background-color: #fff;
  color: #797979;
  text-align: center;
  margin: 0 2%;
  width: 200px;
  float: left;
  text-decoration: none;
  height: 200px;
  border-radius: 6px;
  margin-top: 15px;
}
.storage-box-right .dashboard-main .dashboard-main-mokuai img {
  width: 40px;
  height: 40px;
}
.storage-box-right .dashboard-main .dashboard-main-mokuai p {
  width: 100%;
  background-color: #fff;
  margin: 0;
  margin-top: 35px;
  color: #333333;
  /* border-bottom: 1px solid #d8d8d8; */
  font-size: 17px;
}
.storage-box-right .dashboard-main .dashboard-main-mokuaimoney {
  border: 1px solid #d8d8d8;
  background-color: #fff;
  color: #797979;
  text-align: center;
  margin: 0 1%;
  width: 17%;
  float: left;
  text-decoration: none;
  height: 160px;
}
.storage-box-right .dashboard-main .dashboard-main-mokuaimoney p {
  width: 100%;
  background-color: #f2f2f2;
  margin-top: 0;
  height: 40px;
  line-height: 40px;
  color: #333333;
  border-bottom: 1px solid #d8d8d8;
  font-size: 15px;
}
.dashboard-main-shuzi {
  text-align: center;
  line-height: 65px;
  color: #333333;
  margin: 0;
  padding: 0;
}
.btn {
  width: 120px;
  margin: 0 auto;
  margin-top: 11px;
}
.footer {
  margin-top: 210px;
  font-size: 14px;
  color: #999999;
}
.footerTop {
  margin-top: 20px;
  font-size: 14px;
  color: #999999;
}
</style>
