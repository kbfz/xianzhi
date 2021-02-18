<template>
  <div class="right-bg-box">
    <div class="right-bg">
      <img src="../../../../../../assets/update/right_bg.jpg" alt=""> 
    </div>
   <h4 class="orderTitle">订单状态</h4>
    <el-row>
      <el-col :span="11">
        <div class="lefttime">
        <div class="timetex mt20">
         <span>{{stepData.createTime}}</span>
        </div>
       <div class="rightContent mt10" :class="{'bgColor': stepData.sendDeclarationStatus === 1 ? true : false, 'bgColor2': stepData.sendDeclarationStatus === 1 ? false : true}">
             <span class="rightLine"></span>
              <div class="bgImg bgRight" >
              <img src="../../../../../../assets/images/zt_flow_ico2.png" alt="">
        </div>
        <span class="bgContent bgLeftContent">申报中</span>
        </div>
         <div class="timetex pt46">
         <span>{{stepData.declarationTime}}</span>
        </div>
        <!-- <div class="mt44">
         <span>{{stepData.sendDeclarationTime}}</span>
        </div> -->
         <div class="rightContent mt90" :class="{'bgColor': stepData.sendWarehouseStatus === 1 ? true : false, 'bgColor2': stepData.sendWarehouseStatus === 1 ? false : true}">
             <span class="rightLine"></span>
              <div class="bgImg bgRight" >
             <img src="../../../../../../assets/images/zt_flow_ico4.png" alt="">
        </div>
        <span class="bgContent bgLeftContent">仓库作业</span>
        </div>
      <div class=" timetex pt46">
         <span>{{stepData.stockOutTime}}</span>
        </div>
          <div class="rightContent mt90" :class="{'bgColor': stepData.sendCustomerStatus === 1 ? true : false, 'bgColor2': stepData.sendCustomerStatus === 1 ? false : true}">
             <span class="rightLine"></span>
              <div class="bgImg bgRight" >
             <img src="../../../../../../assets/images/zt_flow_ico6.png" alt="">
        </div>
        <span class="bgContent bgLeftContent">回传客户数据</span>
        </div>
        </div>
      </el-col>
      <el-col :span="1">
        <div id="step" style="text-align:center">
          <div :class="{'lineColor': stepData.createStatus === 1 ? true : false, 'lineColor2': stepData.createStatus === 1 ? false : true}">
             <span class="lineContent lineTop"></span>
             <span class="spot">●</span>
          </div> 
          <div :class="{'lineColor': stepData.sendDeclarationStatus === 1 ? true : false, 'lineColor2': stepData.sendDeclarationStatus === 1 ? false : true}">
            <span class="lineContent h109"></span>
             <span class="spot">●</span>
          </div> 
          <div :class="{'lineColor': stepData.declarationStatus === 1 ? true : false, 'lineColor2': stepData.declarationStatus === 1 ? false : true}">
             <span class="lineContent h129"></span>
             <span class="spot">●</span>
          </div> 
          <div :class="{'lineColor': stepData.sendWarehouseStatus	 === 1 ? true : false, 'lineColor2': stepData.sendWarehouseStatus	 === 1 ? false : true}">
             <span class="lineContent h109"></span>
             <span class="spot">●</span>
          </div> 
          <div :class="{'lineColor': stepData.stockOutStatus === 1 ? true : false, 'lineColor2': stepData.stockOutStatus === 1 ? false : true}">
             <span class="lineContent h109"></span>
             <span class="spot">●</span>
          </div>
          <div :class="{'lineColor': stepData.sendCustomerStatus === 1 ? true : false, 'lineColor2': stepData.sendCustomerStatus === 1 ? false : true}">
             <span class="lineContent h109"></span>
             <span class="spot">●</span>
          </div>
        </div> 
      </el-col>
      <el-col :span="11">
         <div class="righttime">
           <div class="rightContent h20" :class="{'bgColor': stepData.createStatus === 1 ? true : false, 'bgColor2': stepData.createStatus === 1 ? false : true}">
             <span class="leftLine"></span>
              <div class="bgImg" >
             <img src="../../../../../../assets/images/zt_flow_ico1.png" alt="">
        </div>
        <span class="bgContent">接收订单</span>
           </div>
        <div class="timetex pt46">
         <span>{{stepData.sendDeclarationTime}}</span>
        </div>
         <div class="rightContent mt68" :class="{'bgColor': stepData.declarationStatus === 1 ? true : false, 'bgColor2': stepData.declarationStatus === 1 ? false : true}">
             <span class="leftLine"></span>
              <div class="bgImg" >
             <img src="../../../../../../assets/images/zt_flow_ico3.png" alt="">
        </div>
        <span class="bgContent">申报完成</span>
           </div>
          <div class="timetex pt46">
         <span>{{stepData.sendWarehouseTime}}</span>
        </div>
         <div class="rightContent mt92" :class="{'bgColor': stepData.stockOutStatus === 1 ? true : false, 'bgColor2': stepData.stockOutStatus === 1 ? false : true}">
             <span class="leftLine"></span>
              <div class="bgImg" >
             <img src="../../../../../../assets/images/zt_flow_ico5.png" alt="">
        </div>
        <span class="bgContent">出库</span>
           </div>
            <div class="timetex pt46 h40">
             <span>{{stepData.sendCustomerTime}}</span>
        </div>
        </div>
      </el-col>
     </el-row>
  </div>
</template>
<script>
// import { addObj, putObj } from "api/orderSys/sellBsorderHead/sellBsorderHeadInfo/index";
import { mapGetters } from "vuex";
export default {
  name: "sellBsorderHead",
  props: {
    stepData: {type: Object}
  },
  data() {
    return {
      formEdit: true,
      updateView: true
    };
  },
  computed: {
    lineHeight() {
      return window.screen.height;
    }
  },
  // created() {
  //   console.log(this.stepData.step1);
  // },
  methods: {
    // 清空表单
    resetFormFields() {
      this.$refs["form"].resetFields();
    },
    update(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          putObj(this.form.id, this.form).then(() => {
            // 调用父组件的方法， 第一个参数名为调用的方法名，第二个参数为需要传递的参数
            this.$emit("childMethod", "");
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    // 点击修改 改变状态，变为编辑模式
    change() {
      this.formEdit = false;
      this.updateView = false;
      // this.disabledForm = true
    },

  }
};
</script>
<style scoped>
.right-bg {
    height: 100%;
    padding-right: 10px;
    background-color: #ececec;
    position: fixed;
    bottom: 0;
    top:140px;
    width: 100%;
    z-index: -1;
}

.el-row {
    padding-left: 15%;
}
img{
  max-width: 100%;
}
span{
  font-size: 14px
}
.lefttime,.righttime{
  padding-top: 30px;
  text-align: center;
}

.timetex {
  text-align: center;
   height: 122px;
  padding-top: 20px;
}
.rightContent{
    width:100%;
    overflow: hidden;
}
.bgImg{
   border-radius: 50%;
   background: #B6B6B6;
   width:45%;
   height: 45%;
   margin-left: 30%;
}
.bgImg img{
  text-align: center;
  margin-top: 8%
}
.leftLine{
  width: 30%;
  border-top: 1px dashed #C9C9C9;
  float: left;
  margin-top: 30px;
}
.bgRight{
   margin-left: 20%;
}
.rightLine{
  width: 30%;
  border-top: 1px dashed #C9C9C9;
  float: right;
  margin-top: 30px;
}
.bgContent{
  display: block;
  text-align: center;
  margin-left: 20%;
  font-size: 13px;
  margin-top: 5px;
  margin-left: 10%;
}
.bgLeftContent{
  margin-left: -20%;
}
 .righttex {
  /* float: right; */
  font-size: 13px;
}
.lefttex {
  /* float: left; */
  font-size: 13px;
} 
 .image{
      width: 98px;
      height: 92px;
      line-height: 92px;
      color:white;
      margin: 20px auto 30px;
      font-size: 13px;
    }
.mt68{
  margin-top: -3px;
}
.mt90{
  margin-top: -3px;
}
.mt92{
  margin-top: -3px;
}
.lineContent{
  border-left: 1px solid #C9C9C9; 
  height:58px;
   width: 1px; 
   display: inline-block
}
.mt10{
  margin-top: -20px
}
.spot{
  display: block;
  margin-top: -8px;
  font-size: 11px;
  color: #C9C9C9
}
.h109{
  height: 90px
}
.h129{
  height: 90px
}
.orderTitle{
  margin: 0 auto;
   color: #333;
  margin: 20px 0 0 30px;
    margin-bottom: 40px;
    z-index: 33;
}
.bgColor{
  color: #455ff3
}
.bgColor .bgImg{
  background: #455ff3;
}
.bgColor .leftLine {
    border-top: 1px dashed #455ff3;
}
.bgColor .rightLine {
    border-top: 1px dashed #455ff3;
}
.bgColor2{
  color: #b5b5b5
}
.lineColor .lineContent{
  border-left: 1px solid #455ff3; 
}
.lineColor2 .lineContent{
  border-left: 1px solid #C9C9C9; 
}
.lineColor .spot{
  color: #455ff3; 
}
.lineColor2 .spot{
 color: #C9C9C9 
}
.pt46{
  padding-top: 32%;
}
@media screen and (max-width: 1910px){

.mt68 {
    margin-top: -3px;
}
.mt92 {
    margin-top: -1px;
}
.mt90 {
    margin-top: -3px;
}

}
@media screen and (max-width: 1840px){
  .mt68 {
    margin-top: -1px;
}
  .mt90 {
    margin-top: -1px;
}
.mt92 {
    margin-top: -3px;
}
.bgImg {
    border-radius: 50%;
    background: #B6B6B6;
    width: 49%;
    height: 42%;
    /* margin-left: 30%; */
}
}
@media screen and (max-width: 1790px){
  .mt90 {
    margin-top:-2px;
}
}
@media screen and (max-width: 1600px){
  .bgImg {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-left: 30%;
}
.bgImg img {
    text-align: center;
    margin-top: 8%;
    width: 85%;
}
.bgRight {
    margin-left: 18%;
}
.orderTitle{
  margin-bottom: 12px;
}

 .mt68, .mt90, .mt92{
    margin-top: -13px;
}
.h109, .h129 {
    height: 80px;
}
.bgLeftContent {
    margin-left: -10%;
}
.lineTop{
  height: 45px
}
.mt10{
  margin-top:-43px;
}
.mt20{
  padding-top: 8px;
}
.h20{
  margin-top: -13px;
}
.pt46{
  padding-top: 24%;
}
.h40{
  height: 80px
}
}
@media screen and (max-width: 1480px){
.bgRight {
    margin-left: 14%;
}
}
@media screen and (max-width: 1366px){
  .bgImg {
    border-radius: 50%;
    width: 46px;
    height: 47px;
    margin-left: 30%;
}

.h109, .h129 {
    height: 60px;
}
.mt10 {
    margin-top: -38px;
}
.mt68, .mt90, .mt92 {
    margin-top: -17px;
}
.mt59 {
    margin-top: 41px;
}
.mt44 {
    margin-top: 37px;
}
.bgRight{
  margin-left: 10px;
}
.bgImg img {
    text-align: center;
    margin-top: 8%;
}
.lineTop {
    height: 35px;
}
.timetex {
  text-align: center;
   height: 88px;
  padding-top: 0px;
}
.pt46{
  padding-top: 9%
}
.h20{
  margin-top: -22px;
}
.h40{
  height: 75px
}
}
@media screen and (max-width: 1300px){
 .bgRight {
    margin-left: 0px;
}
}
</style>

