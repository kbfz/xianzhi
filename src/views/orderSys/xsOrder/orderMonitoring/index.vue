<template>
   <div class="app-container calendar-list-container" id="app-container" v-loading="loading">
    <div class="head_wrapper" v-if="showOrder">
      <img src="../../../../assets/images/search.png" alt="" class="imgTop">
      <div class="orderSeach">
        <el-input  class="filter-item orderWidth" placeholder="请输入订单号" v-model="orderNo"> </el-input>
      <el-button class="filter-item" type="primary"  icon="search" @click="seachOrder">查询</el-button>
      </div>
    </div>
       <div class="top_box" v-if="showOrderDetail">
      <div class="left_title">订单流程</div>
      <div class="right_seach">
        <input type="text" placeholder="请输入搜索内容" v-model="orderNo">
        <button @click="seachOrder" type="button">查询</button>
        <!-- <el-button class="filter-item" type="primary"  icon="search" @click="seachOrder">查询</el-button> -->
      </div>
    </div>
    <div v-if="showOrderDetail">
        <order-mon-status ref="update" :orderData="orderData" :orderInfo="orderInfo"></order-mon-status>
    </div>
       </div>
</template>
<script>
import { page, pageObj } from "api/orderSys/xsOrder/orderMonitoring/index"
export default {
  name: "orderMonitoring",
 components: {
  //   // 引入编辑的组件
  "order-mon-status": () => import("./components/orderMonStatus.vue"),
 },
  data() {
    return {
      interval2Arg: undefined,
      showOrder: true,
      showOrderDetail: false,
      orderNo: '',
      orderUuid:'',
      orderData: {
        orderArrivalTime: undefined,
        orderDeclaringTime: undefined,
        orderDeclaredTime: undefined,
        orderInboundTime: undefined,
        orderPickingTime: undefined,
        orderPickupTime: undefined,
        orderCheckedTime: undefined,
        orderExitTime: undefined
      },
      orderInfo: {
          orderno: undefined,
          businessType: undefined,
          cbeCode: undefined,
          logisticsNo: undefined,
          paymentNo: undefined,
          cbeName: undefined,
          // consignee: undefined,
          receiverName: undefined,
          receiverProvince: undefined,
          // consigneeTel: undefined,
          receiverPhone: undefined,
          receiverCity: undefined,
          receiverCounty: undefined,
          receiverCountry: undefined,
          receiverAddress: undefined
      },
      pageQuery: {
        page: 100,
        limit: 20,
        orderBy: 'createTimedesc'
      },
      loading: false
    }
  },
   destroyed () {
    clearInterval(this.interval2Arg)},
  methods: {
    getDetail() {
      let param = {
       orderNo: $.trim(this.orderNo)
      }
      page(param).then(response => {
        this.$copyJsonProperty(this.orderData, response.data);
        //  console.log(response.data)
      }) 
    },
    orderDetail() {
       let param = {
        orderno: $.trim(this.orderNo),
        orderStatus: '[0, 1]',
        ...this.pageQuery
      }
      pageObj(param).then(response => {
       response.data.rows[0].receiverPhone = response.data.rows[0].receiverPhone.substr(0,3) + '****' + response.data.rows[0].receiverPhone.substr(7)
        this.$copyJsonProperty(this.orderInfo, response.data.rows[0])
      }) 
    },
    seachOrder() {
      // 清除定时任务
         clearInterval(this.interval2Arg)
         if (this.orderNo === '' || this.orderNo === undefined) {
         this.$message({
          showClose: true,
          message: '请输入需要查询的订单号',
          type: 'warning'
        });
       } else {
          this.showOrder = false
          this.showOrderDetail = true
          this.orderData = {
        orderArrivalTime: undefined,
        orderDeclaringTime: undefined,
        orderDeclaredTime: undefined,
        orderInboundTime: undefined,
        orderPickingTime: undefined,
        orderPickupTime: undefined,
        orderCheckedTime: undefined,
        orderExitTime: undefined
      }
        this.orderInfo = {
            orderno: undefined,
          businessType: undefined,
          cbeCode: undefined,
          logisticsNo: undefined,
          paymentNo: undefined,
          cbeName: undefined,
          // consignee: undefined,
          receiverName: undefined,
          receiverProvince: undefined,
          // consigneeTel: undefined,
          receiverPhone: undefined,
          receiverCity: undefined,
          receiverCountry: undefined,
          receiverAddress: undefined,
          receiverCounty: undefined
        }
      // 订单详情先执行一次，再设置一个定时任务，每隔5秒执行一次
         this.getDetail()
        this.orderDetail()
        this.interval2Arg = setInterval(() => {
           this.getDetail()
         },1000*5)
        }
    }
  }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.top_box{
  padding: 20px 60px 0 30px;
}
.left_title{
  float: left;
  font-size: 20px;
  font-weight: bold;
}
.right_seach{
  float: right;
  input{
    border: 1px solid #dde2ea;
    background-color: #ffffff;
    line-height: 43px;
    width: 440px;
    font-size: 12px;
    color: #999999;
    padding-left: 17px;
    outline: none;
    border-radius:4px;
  }
  button{
    line-height: 45px;
    width: 90px;
    background-color: #3571e6;
    border: none;
    font-size: 14px;
    color: #ffffff;
    margin-left: 4px;
    outline: none;
    border-radius:4px;
  }
}
#head_wrapper {
    position: relative;
    height: 38.2%;
    min-height: 293px;
    width: 1000px;
    margin: 0 auto;
    }
.imgTop{
  width: 150px;
  margin: 0 auto;
  margin-top: 80px;
  margin-left: 710px;
}
.orderSeach{
  margin-top: 50px;
  }
.orderWidth{
  width: 480px;
  margin-left: 540px
}
// 右侧背景颜色
.lineHeight {
  height: 20px;
}
@media screen and (max-width: 1600px) {
.imgTop {
    width: 120px;
    margin: 0 auto;
    margin-top: 50px;
    margin-left: 610px;
}
.orderWidth{
  width: 400px;
  margin-left: 450px
}
  .left_title{
    font-size: 17px;
  }
  .right_seach{
    input{
      line-height: 38px;
      width: 440px;
    }
    button{
      line-height: 40px;
      margin-left: -4px;
    }
  }
  .table_box{
    tr{
      td{
        line-height: 45px;
        font-size: 12px;
      }
    }
  }
}
@media screen and (max-width: 1366px) {
.imgTop {
    width: 100px;
    margin: 0 auto;
    margin-top: 50px;
    margin-left: 510px;
}
.orderWidth{
  width: 350px;
  margin-left: 380px
}
}
</style>



