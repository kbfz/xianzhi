<template>
  <div>
    <table class="table_box">
      <tr>
      <td>订单号：<span>{{orderInfo.orderno}}</span></td>
      <td>收货人名称：<span>{{orderInfo.receiverName}}</span></td>
      <td>收货人省份：<span>{{orderInfo.receiverProvince}}</span></td>
    </tr>
   <tr>
      <td>物流单号：<span>{{orderInfo.logisticsNo}}</span></td>
      <td>收货人电话：<span>{{orderInfo.receiverPhone}}</span></td>
      <td>收货人县/区：<span>{{orderInfo.receiverCounty}}</span></td>
    </tr>
    <tr>
      <td>支付单号：<span>{{orderInfo.paymentNo}}</span></td>
      <td>收货人国家：<span>{{orderInfo.receiverCountry}}</span></td>
      <td>收货人地址：<span>{{orderInfo.receiverAddress}}</span></td>
    </tr>
    </table>
  <!-- 订单流程 -->
  <div class="orderLine">
    <div class="borderLine">
      <!-- 接收订单 -->
       <div class="iconWth w130">
          <div class="receiveWth colorBlue2">
            <span class="circle bgColor1" ></span>
          <span class="circleLine dashedLine2"></span>
          <div class="iconImg bgColor1">
             <img src="../../../../../assets/images/ddjh_ico1.png" alt="">
          </div>
          </div> 
          <div class="receive">
            <p class="dColor1">接收订单</p>
            <p class="dColor1">{{orderData.orderArrivalTime}}</p>
          </div>
       </div>
      <!-- 申报中 -->
        <div class="iconWth w150">
          <div class="decOrder w150" :class="{'colorBlue1': orderData.orderDeclaringTime === undefined ? false : true, 'colorLine3': orderData.orderDeclaringTime === undefined ? true : false}">
            <span class="circle circleBottom"  :class="{'bgColor1': orderData.orderDeclaringTime === undefined ? false : true, 'bgColor2': orderData.orderDeclaringTime === undefined ? true : false}"></span>
          <span class="circleLine circleLineBottom" :class="{'dashedLine2': orderData.orderDeclaringTime === undefined ? false : true, 'dashedLine1': orderData.orderDeclaringTime === undefined ? true : false}"></span>
          <div class="iconImg imgBottom" :class="{'bgColor1': orderData.orderDeclaringTime === undefined ? false : true, 'bgColor2': orderData.orderDeclaringTime === undefined ? true : false}">
             <img src="../../../../../assets/images/ddjh_ico2.png" alt="">
          </div>
          </div> 
          <div class="receive w150 dection">
            <p :class="{'dColor1': orderData.orderDeclaringTime === undefined ? false : true, 'dColor2': orderData.orderDeclaringTime === undefined ? true : false}">申报中</p>
            <p :class="{'dColor1': orderData.orderDeclaringTime === undefined ? false : true, 'dColor2': orderData.orderDeclaringTime === undefined ? true : false, 'hidden': orderData.orderDeclaringTime === undefined ? true : false, 'show': orderData.orderDeclaringTime === undefined ? false : true}">{{orderData.orderDeclaringTime}}</p>
          </div>
       </div>
      <!-- 申报完成 -->
       <div class="iconWth w150">
          <div class="receiveWth w150" :class="{'colorBlue2': orderData.orderDeclaredTime === undefined ? false : true, 'colorLine4': orderData.orderDeclaredTime === undefined ? true : false}">
            <span class="circle circleTop" :class="{'bgColor1': orderData.orderDeclaredTime === undefined ? false : true, 'bgColor2': orderData.orderDeclaredTime === undefined ? true : false}"></span>
          <span class="circleLine circleLineTop" :class="{'dashedLine2': orderData.orderDeclaredTime === undefined ? false : true, 'dashedLine1': orderData.orderDeclaredTime === undefined ? true : false}"></span>
          <div class="iconImg iconImgTop" :class="{'bgColor1': orderData.orderDeclaredTime === undefined ? false : true, 'bgColor2': orderData.orderDeclaredTime === undefined ? true : false}">
             <img src="../../../../../assets/images/ddjh_ico3.png" alt="">
          </div>
          </div> 
          <div class="receive w150">
            <p :class="{'dColor1': orderData.orderDeclaredTime === undefined ? false : true, 'dColor2': orderData.orderDeclaredTime === undefined ? true : false}">申报完成</p>
            <p :class="{'dColor1': orderData.orderDeclaredTime === undefined ? false : true, 'dColor2': orderData.orderDeclaredTime === undefined ? true : false}">{{orderData.orderDeclaredTime}}</p>
          </div>
       </div>
      <!-- 订单入库 -->
       <div class="iconWth w150">
          <div class="decOrder w150 colorBlue1" :class="{'colorBlue1': orderData.orderInboundTime === undefined ? false : true, 'colorLine3': orderData.orderInboundTime === undefined ? true : false}">
            <span class="circle circleBottom" :class="{'bgColor1': orderData.orderInboundTime === undefined ? false : true, 'bgColor2': orderData.orderInboundTime === undefined ? true : false}"></span>
          <span class="circleLine circleLineBottom" :class="{'dashedLine2': orderData.orderInboundTime === undefined ? false : true, 'dashedLine1': orderData.orderInboundTime === undefined ? true : false}"></span>
          <div class="iconImg imgBottom"  :class="{'bgColor1': orderData.orderInboundTime === undefined ? false : true, 'bgColor2': orderData.orderInboundTime === undefined ? true : false}">
             <img src="../../../../../assets/images/ddjh_ico4.png" alt="">
          </div>
          </div> 
          <div class="receive w150 dection">
            <p :class="{'dColor1': orderData.orderInboundTime === undefined ? false : true, 'dColor2': orderData.orderInboundTime === undefined ? true : false}">订单入库</p>
            <p :class="{'dColor1': orderData.orderInboundTime === undefined ? false : true, 'dColor2': orderData.orderInboundTime === undefined ? true : false, 'hidden': orderData.orderDeclaringTime === undefined ? true : false, 'show': orderData.orderDeclaringTime === undefined ? false : true}">{{orderData.orderInboundTime}}</p>
          </div>
       </div>
      <!-- 拣货中 -->
      <div class="iconWth w150">
          <div class="receiveWth w150" :class="{'colorBlue2': orderData.orderPickingTime === undefined ? false : true, 'colorLine4': orderData.orderPickingTime === undefined ? true : false}">
            <span class="circle circleTop"  :class="{'bgColor1': orderData.orderPickingTime === undefined ? false : true, 'bgColor2': orderData.orderPickingTime === undefined ? true : false}"></span>
          <span class="circleLine circleLineTop" :class="{'dashedLine2': orderData.orderPickingTime === undefined ? false : true, 'dashedLine1': orderData.orderPickingTime === undefined ? true : false}"></span>
          <div class="iconImg iconImgTop" :class="{'bgColor1': orderData.orderPickingTime === undefined ? false : true, 'bgColor2': orderData.orderPickingTime === undefined ? true : false}">
             <img src="../../../../../assets/images/ddjh_ico5.png" alt="">
          </div>
          </div> 
          <div class="receive w150">
            <p :class="{'dColor1': orderData.orderPickingTime === undefined ? false : true, 'dColor2': orderData.orderPickingTime === undefined ? true : false}">拣货中</p>
            <p :class="{'dColor1': orderData.orderPickingTime === undefined ? false : true, 'dColor2': orderData.orderPickingTime === undefined ? true : false}">{{orderData.orderPickingTime}}</p>
          </div>
       </div>
      <!-- 拣货完成 -->
      <div class="iconWth w150">
          <div class="decOrder w150" :class="{'colorBlue1': orderData.orderPickupTime === undefined ? false : true, 'colorLine3': orderData.orderPickupTime === undefined ? true : false}">
            <span class="circle circleBottom" :class="{'bgColor1': orderData.orderPickupTime === undefined ? false : true, 'bgColor2': orderData.orderPickupTime === undefined ? true : false}"></span>
          <span class="circleLine circleLineBottom" :class="{'dashedLine2': orderData.orderPickupTime === undefined ? false : true, 'dashedLine1': orderData.orderPickupTime === undefined ? true : false}"></span>
          <div class="iconImg imgBottom" :class="{'bgColor1': orderData.orderPickupTime === undefined ? false : true, 'bgColor2': orderData.orderPickupTime === undefined ? true : false}">
             <img src="../../../../../assets/images/ddjh_ico6.png" alt="">
          </div>
          </div> 
          <div class="receive w150 dection">
            <p :class="{'dColor1': orderData.orderPickupTime === undefined ? false : true, 'dColor2': orderData.orderPickupTime === undefined ? true : false}">拣货完成</p>
            <p :class="{'dColor1': orderData.orderPickupTime === undefined ? false : true, 'dColor2': orderData.orderPickupTime === undefined ? true : false, 'hidden': orderData.orderPickupTime === undefined ? true : false, 'show': orderData.orderPickupTime === undefined ? false : true}">{{orderData.orderPickupTime}}</p>
          </div>
       </div>
      <!-- 已复核 -->
      <div class="iconWth w150">
          <div class="receiveWth w150" :class="{'colorBlue2': orderData.orderCheckedTime === undefined ? false : true, 'colorLine4': orderData.orderCheckedTime === undefined ? true : false}">
            <span class="circle circleTop" :class="{'bgColor1': orderData.orderCheckedTime === undefined ? false : true, 'bgColor2': orderData.orderCheckedTime === undefined ? true : false}"></span>
          <span class="circleLine circleLineTop" :class="{'dashedLine2': orderData.orderCheckedTime === undefined ? false : true, 'dashedLine1': orderData.orderCheckedTime === undefined ? true : false}"></span>
          <div class="iconImg iconImgTop" :class="{'bgColor1': orderData.orderCheckedTime === undefined ? false : true, 'bgColor2': orderData.orderCheckedTime === undefined ? true : false}">
             <img src="../../../../../assets/images/ddjh_ico7.png" alt="">
          </div>
          </div> 
          <div class="receive w150">
            <p :class="{'dColor1': orderData.orderCheckedTime === undefined ? false : true, 'dColor2': orderData.orderCheckedTime === undefined ? true : false}">已复核</p>
            <p :class="{'dColor1': orderData.orderCheckedTime === undefined ? false : true, 'dColor2': orderData.orderCheckedTime === undefined ? true : false}">{{orderData.orderCheckedTime}}</p>
          </div>
       </div>
      <!-- 已出区 -->
      <div class="iconWth w150" >
          <div class="decOrder w150" :class="{'colorBlue1': orderData.orderExitTime === undefined ? false : true, 'colorLine3': orderData.orderExitTime === undefined ? true : false}">
            <span class="circle circleBottom" :class="{'bgColor1': orderData.orderExitTime === undefined ? false : true, 'bgColor2': orderData.orderExitTime === undefined ? true : false}"></span>
          <span class="circleLine circleLineBottom" :class="{'dashedLine2': orderData.orderExitTime === undefined ? false : true, 'dashedLine1': orderData.orderExitTime === undefined ? true : false}"></span>
          <div class="iconImg imgBottom" :class="{'bgColor1': orderData.orderExitTime === undefined ? false : true, 'bgColor2': orderData.orderExitTime === undefined ? true : false}">
             <img src="../../../../../assets/images/ddjh_ico8.png" alt="">
          </div>
          </div> 
          <div class="receive dection w150">
            <p :class="{'dColor1': orderData.orderExitTime === undefined ? false : true, 'dColor2': orderData.orderExitTime === undefined ? true : false}">已出库</p>
            <p :class="{'dColor1': orderData.orderExitTime === undefined ? false : true, 'dColor2': orderData.orderExitTime === undefined ? true : false, 'hidden': orderData.orderExitTime === undefined ? true : false, 'show': orderData.orderExitTime === undefined ? false : true}">{{orderData.orderExitTime}}</p>
          </div>
       </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
   orderData: {type: Object},
    orderInfo: {type: Object}
  },
  data () {
    return{
    }
  },
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.table_box{
  clear: both;
  border: #cccccc 1px solid;
  margin:130px auto 0 auto;
  width: 88%;
  tr{
    border: 1px #cccccc solid;
    td{
      border: #cccccc 1px solid;
      line-height: 54px;
      font-size: 13px;
      color: #333333;
      padding-left: 30px;
    }
  }
}
.orderLine{
  width: 88%;
  margin: 0 auto;
  margin-top:12%;
  height: 100px;
  font-size: 13px;
  .borderLine{
    width: 100%;
  }
  .iconWth{
    float: left;
  }
  .receiveWth{
     width: 150px; 
     border-bottom: 1px solid #b5b5b5;
     position: relative;
  }
 .circle{
    display: inline-block;
    width: 5px;
    height: 5px;
    background: #b5b5b5;
    border-radius: 50%;
    position: absolute;
    left: 70px;
    top:-2px
  }
 .circleLine{
    display: inline-block;
    height: 40px;
    border-left: 1px dashed #b5b5b5;
    position: absolute;
    left: 72px;
    top: -42px
  }
  .iconImg{
    position: absolute;
    top: -77px;
    left: 52px;
    background: #b5b5b5;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    padding-top: 5px;
  }
  .receive{
    width:150px;
    text-align:center;
    line-height: 10px
  }
.w130{
  width: 150px;
  float: left;
}
.w150{
  width: 190px;
  float: left;
}
// 申报中
.decOrder{
   width: 190px; 
   border-top: 1px solid #b5b5b5;
   position: relative;
}
 .circleBottom{
    position: absolute;
    left: 90px;
    top:-3px
  }
  .circleLineBottom{
    position: absolute;
    left: 92px;
    top: 0px
  }
.imgBottom{
  position:absolute;
  top: 41px;
  left: 72px;
}
.dection{
  margin-top: -60px;
}
.circleTop{
   position: absolute;
    left: 90px;
    top:-2px
}
.circleLineTop{
   position: absolute;
    left: 92px;
    top: -42px
}
.iconImgTop{
  position: absolute;
    top: -77px;
    left: 72px;
}
}
// 线的颜色
.iconWth .colorBlue1{
  border-top: 1px solid #455ff3
}
.iconWth .colorBlue2{
  border-bottom: 1px solid #455ff3
}
.iconWth .colorLine3{
  border-top: 1px solid #b5b5b5
}
.iconWth .colorLine4{
  border-bottom: 1px solid #b5b5b5
}
// 点状线
.iconWth .dashedLine1{
  border-left: 1px dashed #b5b5b5
}
.iconWth .dashedLine2{
  border-left: 1px dashed #455ff3
}
// 点的颜色
.iconWth .dColor1{
  color: #455ff3
}
.iconWth .dColor2{
  color:  #b5b5b5
}
// 图片背景色
.iconWth .bgColor1{
  background: #455ff3
}
.iconWth .bgColor2{
  background: #b5b5b5
}
// 显示隐藏
.hidden{
  display: none
}
.show{
  display: block
}
@media screen and (max-width: 1900px) {
  .decOrder{
   width: 180px;}
 .orderLine  .w150{
     width: 180px
   }
}
@media screen and (max-width: 1810px) {
  .decOrder{
   width: 170px;}
 .orderLine  .w150{
     width: 170px
   }
}
@media screen and (max-width: 1749px) {
  .decOrder{
   width: 160px;}
 .orderLine  .w150{
     width: 160px
   }
}
@media screen and (max-width: 1670px) {
  .decOrder{
   width: 150px;}
 .orderLine  .w150{
     width: 150px
   }
 .orderLine .circleTop{
    position: absolute;
    left: 70px;
    top:-2px
  }
  .orderLine  .circleLineTop {
    position: absolute;
    left: 72px;
    top: -42px;
  }
  .orderLine .iconImgTop {
    position: absolute;
    top: -77px;
    left: 52px;
}
.orderLine .circleBottom {
    position: absolute;
    left: 72px;
    top: -3px;
}
.orderLine .circleLineBottom {
    position: absolute;
    left: 74px;
    top: 0px;}
  .orderLine .imgBottom {
    position: absolute;
    top: 41px;
    left: 54px;}
}
@media screen and (max-width: 1600px) {
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
@media screen and (max-width: 1585px){
   .decOrder{
   width: 140px;}
 .orderLine  .w150{
     width: 140px
   }
  .orderLine .w130 {
    width: 130px;
    float: left;
}
}
@media screen and (max-width: 1485px){
   .decOrder{
   width: 130px;}
 .orderLine  .w150{
     width: 130px
   }
  .orderLine .w130 {
    width: 120px;
    float: left;
}
}
@media screen and (max-width: 1400px){
  .table_box {
    clear: both;
    border: #cccccc 1px solid;
    margin: 100px auto 0 auto;
    width: 88%;
}
 .decOrder{
   width: 125px;}
 .orderLine  .w150{
     width: 125px
   }
  .orderLine .w130 {
    width: 100px;
    float: left;
}
.orderLine {
    margin-top: 10%;
}
.orderLine .receiveWth {
    width: 125px;
    border-bottom: 1px solid #b5b5b5;
    position: relative;}
}
@media screen and (max-width: 1342px){
   .decOrder{
   width: 105px;}
 .orderLine  .w150{
     width: 105px
   }
  .orderLine .w130 {
    width: 100px;
    float: left;
}
.orderLine {
    margin-top: 10%;
}
.orderLine .receive[data-v-48a9bc7a] {
    width: 105px;
    /* text-align: center; */
    line-height: 10px;
}
}
</style>