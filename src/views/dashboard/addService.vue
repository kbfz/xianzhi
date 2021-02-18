<!--vue 看板页面 -->
<template>
  <div style="margin-right:8px">
    <div class="storage-box-right pull-right mt15">
      <div class="dashboard-main clearfix">
        <h4>增值服务使用须知</h4>
        <div class="footerTop">
          <p>①增值服务内容如合同另有约定则按照合同执行；</p>
          <p>②增值服务费用随月度账单一起，双方按照合同约定账单确认时间进行确认，并根据合同付款期限进行付款；</p>
          <p>③增值服务所述“元”均为人民币，以人民币外的其他币种在中国境外支付服务费用的，按付汇当日的中国银行零时零分开盘价（现汇卖出价）结算；</p>
          <p>④增值服务定价不含税，相关票据及税费按照国家相关政策执行。</p>
        </div>
      </div>
    </div>
    <div class="storage-box-right pull-right  mt30">
      <div class="dashboard-main clearfix">
        <h4>增值服务数据总览</h4>
        <div class="filter-container"
             style="padding-bottom: 20px;">
          <el-date-picker type="month"
                          placeholder="开始月份"
                          style="width: 150px;"
                          class="filter-item"
                          popper-class="timeSelect"
                          @keyup.enter.native="handleFilter"
                          format="yyyy-MM"
                          v-model="startTime">
          </el-date-picker>
          <span> ~ </span>
          <el-date-picker type="month"
                          placeholder="结束月份"
                          style="width: 150px;"
                          popper-class="timeSelect"
                          class="filter-item"
                          @keyup.enter.native="handleFilter"
                          format="yyyy-MM"
                          v-model="endTime">
          </el-date-picker>
          <el-button class="filter-item"
                     type="primary"
                     v-waves
                     icon="search"
                     @click="handleFilter">查询</el-button>
          <!-- <el-date-picker v-model="value6"
                          type="monthrange"
                          placeholder="选择日期范围">
          </el-date-picker> -->
        </div>
        <div style="display: block;height: 180px;">
          <div class="dashboard-main-mokuai"
               style="margin-left:0">
            <p class="dashboard-main-duixiang">增值服务申请条数</p>
            <h2 class="dashboard-main-shuzi">
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='form.serviceTotalCount'
                       :duration='1000'></countTo>
            </h2>
          </div>
          <div class="dashboard-main-mokuai">
            <p class="dashboard-main-duixiang">仓库作业已完结</p>
            <h2 class="dashboard-main-shuzi">
              <countTo class="info-item-num"
                       :startVal='0'
                       :endVal='form.storageFinishCount'
                       :duration='1000'></countTo>
            </h2>
          </div>
          <div class="dashboard-main-mokuai">
            <p class="dashboard-main-duixiang">当前完结率</p>
            <h2 class="dashboard-main-shuzi">
              <!-- <el-input class="info-item-num" type="text"
                       v-model="form.finishRate"></el-input> -->
              <span class="info-item-num">{{form.finishRate}}</span>
            </h2>
          </div>
        </div>
        <div class="dashboard-main-mokuaimoney"
             style="margin-left:0">
          <p class="dashboard-main-duixiang">申请总金额（不含税）</p>
          <h2 class="dashboard-main-shuzi">
            <countTo class="info-item-num"
                     :startVal='0'
                     :endVal='form.serviceTotalPrice'
                     :duration='1000'
                     :decimals='2'></countTo>
          </h2>

        </div>
        <div class="dashboard-main-mokuaimoney">
          <p class="dashboard-main-duixiang">实际总金额（不含税）</p>
          <h2 class="dashboard-main-shuzi">
            <countTo class="info-item-num"
                     :startVal='0'
                     :endVal='form.actualTotalPrice'
                     :duration='1000'
                     :decimals='2'></countTo>
          </h2>
        </div>

        <div class="dashboard-main-mokuaimoney">
          <p class="dashboard-main-duixiang">实际总税费</p>
          <h2 class="dashboard-main-shuzi">
            <countTo class="info-item-num"
                     :startVal='0'
                     :endVal='form.totalTax'
                     :duration='1000'
                     :decimals='2'></countTo>
          </h2>
        </div>
        <div class="dashboard-main-mokuaimoney">
          <p class="dashboard-main-duixiang">实际总优惠</p>
          <h2 class="dashboard-main-shuzi">
            <countTo class="info-item-num"
                     :startVal='0'
                     :endVal='form.totalDiscount'
                     :duration='1000'
                     :decimals='2'></countTo>
          </h2>
        </div>

        <div class="dashboard-main-mokuaimoney">
          <p class="dashboard-main-duixiang">实际应付</p>
          <h2 class="dashboard-main-shuzi">
            <countTo class="info-item-num"
                     :startVal='0'
                     :endVal='form.totalActualPayment'
                     :duration='1000'
                     :decimals='2'></countTo>
          </h2>
        </div>
        <div class="footer">
          <p>* 统计范围不包括处于“已撤销，已删除，已拒绝”状态的申请</p>
          <p>* 申请的项目和数量，与实际作业情况出现不同时，全速通会及时告知相应客户，并且实际金额、税费、应付金额的计算均以实际作业为准</p>
          <p>* 由于仓库作业完结后才能计算实际金额和税费，所以这些数据的刷新可能有延迟</p>
          <p>* 所有统计数字均根据四舍五入保留小数点后两位</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script> 
import {
  countObj
} from "api/addService/myaddService/index";
import countTo from 'vue-count-to'
var dateUtils = require("silly-datetime");
export default {
  name: 'dashboard',
  data () {
    return {
      startTime: '',
      endTime: '',
      form: {
        serviceTotalCount: 0,
        storageFinishCount: 0,
        finishRate: '',
        serviceTotalPrice: 0,
        actualTotalPrice: 0,
        totalTax: 0,
        totalDiscount: 0,
        totalActualPayment: 0
      }
    }
  },
  components: { countTo },
  mounted () {
  },
  methods: {
    // 比较时间大小
    tab (date1, date2) {
      var oDate1 = new Date(date1);
      var oDate2 = new Date(date2);
      if(oDate1.getTime() > oDate2.getTime()){//转换成毫秒进行比较
        return false;
    } else {
        return true;
    }
    },

    handleFilter () {
      // if (this.startTime === '' && this.endTime !== '' || this.endTime === '' && this.startTime !== '') {
      //   this.$message({
      //     message: "请选择时间段！",
      //     type: 'error',
      //     duration: 2000
      //   });
      //   return false;
      // }
      if (this.tab(this.startTime, this.endTime)==false) {
        this.$message({
          message: "开始月份应小于结束月份！",
          type: 'error',
          duration: 2000
        });
        return false;
      }
      // this.tab(this.startTime, this.endTime);
      // console.log(this.query)  
      this.total();
      // }
    },
    total () {
      let param = {
        startTime:
          this.startTime === ""
            ? ""
            : dateUtils.format(this.startTime, "YYYY-MM"),
        endTime:
          this.endTime === ""
            ? ""
            : dateUtils.format(this.endTime, "YYYY-MM"),
      };
      countObj(param).then(response => {
        this.form = response.data
        // console.log(this.form)
      });
      // countObj().then(res => {
      //   this.form = res.data
      // })
    }
  },
  created () {
    this.total()
  }
}
</script>

<style scoped>
.storage-box-right {
  width: 99%;
  overflow: hidden;
  margin: 0 auto;
  border: 1px solid #f2f2f2;
}
.mt30 {
  margin-top: 30px;
}
.mt15 {
  margin-top: 15px;
}
.storage-box-right .dashboard-main {
  width: 98%;
  margin: 0 auto;
  padding-bottom: 20px;
  margin-top: 15px;
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
  margin: 0 1%;
  width: 17%;
  float: left;
  text-decoration: none;
  height: 160px;
}
.storage-box-right .dashboard-main .dashboard-main-mokuai p {
  width: 100%;
  background-color: #f2f2f2;
  margin-top: 0;
  height: 40px;
  line-height: 40px;
  color: #333333;
  border-bottom: 1px solid #d8d8d8;
  font-size: 15px;
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
  line-height: 75px;
  color: #333333;
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
