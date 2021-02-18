<template>
  <div class="app-container calendar-list-container"
       id="app-container"
       v-loading="loading">
    <div class="head_wrapper">
      <div class="orderSeach" style= "width: 600px;margin: 0 auto;height: 50px;">
        <el-form :model="form" ref="form" style="width: 458px; float:left">
           <el-form-item label="运单号" label-width="80px">
                <el-input class="filter-item orderWidth"
                  placeholder="请输入运单号"
                  v-model="form.logisticsNo"> </el-input>
           </el-form-item>
        </el-form>
        <!-- <span>运单号 </span> -->
        <el-button class="filter-item"
                   type="primary"
                   icon="search"
                   @click="seachOrder" style="float:left">查询</el-button>
      </div>
    </div>
    <!-- 物流轨迹 -->
    <div v-if="showOrderDetail" class="compont">
      <logistics-order ref="loginForm" :loginsticsArr="loginsticsArr"> </logistics-order>
    </div>
  </div>
</template>
<script>
import { page } from "api/orderSys/xsOrder/logisticsQuery/index";
export default {
  name: "orderMonitoring",
  components: {
    //   // 引入编辑的组件
    "logistics-order": () => import("./components/logisticsOrder"),
  },
  data () {
    return {
      interval2Arg: undefined,
      showOrder: true,
      showOrderDetail: false,
      form: {logisticsNo: ''},
      orderUuid: '',
      pageQuery: {
        page: 100,
        limit: 20,
      },
      loginsticsArr: {
        collectTime: "",
        companyType: "",
          endTime:" ",
          id:"",
          logisticsNo: "",
           startTime: "",
           status: "",
          traceLines:[],
        updateTime: ""
      },
      loading: false
    }
  },
  destroyed () {
    clearInterval(this.interval2Arg)  },
  methods: {
    loginPage () {
      let param = {
        logisticsNo: this.form.logisticsNo,
        _type_:"equal"
      }
      page(param).then(response => {
        if (response.data.rows.length === 0) {
          this.$notify({
            title: '提示',
            message: '没有查询到物流信息,请输入正确的运单号',
            type: 'warning',
            duration: 2000
          });
          this.$nextTick(() => {
            this.loginsticsArr = {}
          })
        } else {
          this.$nextTick(() => {
            if (response.data.rows[0].traceLines.length === 1) {
              this.$refs.loginForm.formEdit = false
            }
            this.loginsticsArr = response.data.rows[0]
            this.loginsticsArr.traceLines = response.data.rows[0].traceLines.reverse()
          })
        }

      })
    },
    orderDetail () {
      //    let param = {
      //     logisticsNo: $.trim(this.logisticsNo),
      //     orderStatus: '[0, 1]',
      //     ...this.pageQuery
      //   }
      //   pageObj(param).then(response => {
      //    response.data.rows[0].receiverPhone = response.data.rows[0].receiverPhone.substr(0,3) + '****' + response.data.rows[0].receiverPhone.substr(7)
      //     this.$copyJsonProperty(this.orderInfo, response.data.rows[0])
      //   }) 
    },
    seachOrder () {
      // 清除定时任务
      clearInterval(this.interval2Arg)
      if (this.form.logisticsNo === '' || this.form.logisticsNo === undefined) {
        this.$message({
          showClose: true,
          message: '请输入需要查询的运单号',
          type: 'warning'
        });
      } else {
        // this.showOrder = false
        this.showOrderDetail = true
        // this.$nextTick(() => {
        //    this.$refs.loginForm.loginsticsArr = []
        // })
        // 订单详情先执行一次，再设置一个定时任务，每隔5秒执行一次
        this.loginPage()
        // this.interval2Arg = setInterval(() => {
        //    this.loginPage()
        //  },1000*5)
      }
    }
  }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.top_box {
  padding: 20px 60px 0 30px;
}
.left_title {
  float: left;
  font-size: 20px;
  font-weight: bold;
}
.right_seach {
  float: right;
  input {
    border: 1px solid #dde2ea;
    background-color: #ffffff;
    line-height: 43px;
    width: 400px;
    font-size: 12px;
    color: #999999;
    padding-left: 17px;
    outline: none;
    border-radius: 4px;
  }
  button {
    line-height: 45px;
    width: 90px;
    background-color: #3571e6;
    border: none;
    font-size: 14px;
    color: #ffffff;
    margin-left: 4px;
    outline: none;
    border-radius: 4px;
  }
}
#head_wrapper {
  position: relative;
  height: 38.2%;
  min-height: 293px;
  width: 1000px;
  margin: 0 auto;
}
.imgTop {
  width: 150px;
  margin: 0 auto;
  margin-top: 80px;
  margin-left: 710px;
}
.orderSeach {
  margin-top: 20px;
  span {
    display: inline;
    margin-left: 70px;
    font-size: 16px;
    color: #333
  }
}
.orderWidth {
  width: 350px;
  margin-left: 10px;
  float: left;
}
// 右侧背景颜色
.lineHeight {
  height: 20px;
}
.compont{
 
}
</style>



