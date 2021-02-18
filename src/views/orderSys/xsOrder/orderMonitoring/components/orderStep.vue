<template>
  <div class="orderstep">
    <div class="right-bg">
      <img src="../../../../../assets/update/right_bg.jpg" alt=""> 
    </div>
   <h4 v-if="updateView" class="orderTitle" style="font-size: 16px">订单状态</h4> 
    <el-row>
      <el-col :span="12" class="leftbox">
        <!-- 接收客户数据 时间 -->
        <div class="stepnum" :class="{'stepnum1': stepData.createStatus === 1 ? true : false}"><span>{{stepData.createTime}}</span></div>
        <!-- 海外仓作业 图标 -->
        <div :class="{'stepicon': stepData.sendOverseasStatus === 1 ? false : true, 'stepicon1': stepData.sendOverseasStatus === 1 ? true :false, 'blueborder': stepData.sendOverseasStatus === 1 ? true : false}">
          <hr class="dashhr">
          <div class="smallcircle"></div>
          <div class="circle">
            <img src="../../../../../assets/images/zt2_flow_ico2.png">
          </div>
          <div class="stepfont" :class="{'stepfont1': stepData.sendOverseasStatus === 1 ? true : false}">海外仓作业中</div>
        </div>
      <!-- 海外仓出库 时间 -->
        <div class="stepnum" :class="{'stepnum1': stepData.overseasStatus === 1 ? true : false}"><span>{{stepData.overseasTime}}</span></div>
        <!-- 机场作业 机场完成时间 -->
        <div class="stepfour" :class="{'stepicon':false, 'stepicon1':true,'blueborder':true}">
          <hr class="dashhr">
          <div class="smallcircle"></div>
          <div class="bgclortwo"></div>
            <div class="circle">
              <img src="../../../../../assets/images/zt2_flow_ico5.png">
            </div>
            <div class="stepfont" :class="{'stepfont1':false}">申报完成</div>
            <div class="circle circletwo">
              <img src="../../../../../assets/images/zt2_flow_ico4 .png">
            </div>
            <div class="stepfont" :class="{'stepfont1':false}">机场作业</div>
        </div>
        <!-- 出区时间 -->
        <div class="stepnum" :class="{'stepnum1': stepData.stockOutStatus === 1 ? true : false}"><span>{{stepData.stockOutTime}}</span></div>
        <!-- 回传客户数据 图标 -->
        <div class="mt20" :class="{'stepicon': stepData.sendCustomerStatus === 1 ? false : true, 'stepicon1': stepData.sendCustomerStatus === 1 ? true : false}">
          <hr class="dashhr">
          <div class="smallcircle"></div>
          <div class="circle">
            <img src="../../../../../assets/images/zt2_flow_ico7.png">
          </div>
          <div class="stepfont" :class="{'stepfont1': stepData.sendCustomerStatus === 1 ? true : false}">回传客户数据</div>
        </div>
      </el-col>
     <!-- 接收客户数据 图标 -->
      <el-col :span="12" class="rightbox">
        <div :class="{'stepicon': stepData.createStatus === 1 ? false : true, 'stepicon1': stepData.createStatus === 1 ? true : false,'blueborder': stepData.createStatus === 1 ? true : false}">
          <hr class="dashhr firsthr">
          <div class="smallcircle"></div>
          <div class="circle">
            <img src="../../../../../assets/images/zt2_flow_ico1.png">
          </div>
          <div class="stepfont" :class="{'stepfont1': stepData.createStatus === 1 ? true : false}">接收客户数据</div>
        </div>
        <!-- 海外仓作业时间 -->
        <div class="stepnum" :class="{'stepnum1': stepData.sendOverseasStatus === 1 ? true : false}"><span>{{stepData.sendOverseasTime}}</span></div>
        <!-- 海外仓出库 图标 -->
        <div :class="{'stepicon': stepData.overseasStatus === 1 ? false : true, 'stepicon1': stepData.overseasStatus === 1 ? true : false,'blueborder': stepData.overseasStatus === 1 ? true : false}">
          <hr class="dashhr">
          <div class="smallcircle"></div>
          <div class="circle">
            <img src="../../../../../assets/images/zt2_flow_ico3.png">
          </div>
          <div class="stepfont" :class="{'stepfont1': stepData.overseasStatus === 1 ? true : false}">海外仓出库</div>
        </div>
        <!-- 机场  申报 完成时间 -->
        <div class="stepnum stepfour" :class="{'stepnum1':true}"><span>2018-01-22 14:21:55</span></div>
        <!-- 出区 图标 -->
        <div :class="{'stepicon': stepData.stockOutStatus === 1 ? false : true, 'stepicon1': stepData.stockOutStatus === 1 ? true : false,'blueborder': stepData.stockOutStatus === 1 ? true : false}">
          <hr class="dashhr">
          <div class="smallcircle"></div>
          <div class="circle">
            <img src="../../../../../assets/images/zt2_flow_ico6.png">
          </div>
          <div class="littlefont" :class="{'stepfont1': stepData.stockOutStatus === 1 ? true : false}">出区</div>
        </div>
        <!-- 回传客户数据 时间 -->
        <div class="stepnum last" :class="{'stepnum1': stepData.sendCustomerStatus === 1 ? true : false}"><span>{{stepData.sendCustomerTime}}</span></div>
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
    }
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
      //            this.disabledForm = true
    }
  }
};
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
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
.orderTitle{
  margin: 0 auto;
   color: #333;
  margin: 20px 0 0 30px;
    margin-bottom: 40px;
    z-index: 33;
}
.orderstep{
  // background-color: #ececec;
  font-size: 13px;
  color: #666;
  .leftbox{
    float: left;
    .stepnum{
      position: relative;
      text-align: right;
      padding-right: 5%; 
    }
    .circle{
      margin: -25px 0 0 30%;
    }
    .dashhr{
      margin: 80px 0 0 50%;
    }
    .smallcircle{
      margin: -4px 0 0 99%;
    }
    .stepfont{
      margin: 2% 0 2% 25%;
    }
    .stepfour{
      height: 110px;
      .dashhr{
        margin: 110px 0 0 50%;
      }
      .circle{
      margin: -85px 0 0 30%;
      }
      .circletwo{
        margin: 15px 0 0 30%;
      }
      .stepfont{
        width: 30px;
        margin: -40px 0 0 15px;
      }
      .bgclortwo{
        width: 50px;
        height: 60px;
        background-color: #ececec;
        border: 1px #b5b5b5 dashed;
        border-style: dashed dashed dashed none;
        margin: -30px 0 0 50%;
      }
    }
    .stepnum1{
      border-right: #455ff3 1px solid;
      margin-right: -1px;
    }
    .blueborder{
      border-right: #455ff3 1px solid;
      margin-right: -1px;
      position: relative;
    }
  }
  .rightbox{
    float: left;
    border-left: #b5b5b6 1px solid;
    height: 610px;
    .stepnum{
      position: relative;
      text-align: right;
      padding-left: 5%;
    }
    .circle{
      margin: -25px 0 0 30%;
    }
    .firsthr{
      margin: 25px 50% 0 0 !important;
    }
    .dashhr{
      margin: 80px 50% 0 0;
    }
    .smallcircle{
      margin: -4px 0 0 -3px;
    }
    .stepfont{
      margin: 2% 0 2% 25%;
    }
    .littlefont{
      margin: 2% 0 2% 35%;
    }
    .stepfour{
      height: 110px;
      line-height: 110px;
    }
    .stepnum1{
      border-left: #455ff3 1px solid;
      margin-left: -1px;
    }
    .blueborder{
      border-left: #455ff3 1px solid;
      margin-left: -1px;
      position: relative;
    }
    .last{
      height: 25px;
    }
  }
  .stepfont{
    font-size: 12px;
    color: #333;
  }
  .stepfont1{
    color: #455ff3;
  }
  .stepnum{
    height: 50px;
    line-height: 50px;
  }
  .stepicon{
    height: 80px;
    .circle{
      background-color: #b5b5b5;
    }
    .dashhr{
      border-top:1px dashed #b5b5b5;
    }
    .smallcircle{
      background-color: #b5b5b5;
    }
  }
  .stepicon1{
    height: 80px;
    .circle{
      background-color: #455ff3;
    }
    .dashhr{
      border-top:1px dashed #455ff3;
    }
    .smallcircle{
      background-color: #455ff3;
    }
    .bgclortwo{
      border: 1px #455ff3 dashed !important;
      border-style: dashed dashed dashed none !important;
    }
  }
  .circle{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    img{
      width: 36px;
      height: 36px;
      margin: 7px;
    }
  }
  .dashhr{
    height: 1px;
    border:none;
    padding: 0;
  }
  .smallcircle{
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }
}
@media screen  and (max-width: 1860px){
   .orderstep .rightbox{
      height: 560px;}
   .mt20{
     margin-top: -48px
   }
}
@media screen  and (max-width: 1650px){
  .orderstep{
    font-size: 11px;
    .leftbox{
      .stepnum{
        padding:0 3% 0 0; 
      }
      .circle{
        margin: -23px 0 0 30%;
      }
      .dashhr{
        margin: 70px 0 0 50%;
      }
      .stepfont{
        margin: 2% 0 2% 20%;
      }
      .stepfour{
        height: 85px;
        .dashhr{
          margin: 70px 0 0 50%;
        }
        .circle{
        margin: -70px 0 0 30%;
        }
        .circletwo{
          margin: 15px 0 0 30%;
        }
        .stepfont{
          width: 30px;
          margin: -38px 0 0 8px;
        }
      }
    }
    .rightbox{
      height: 510px;
      .stepnum{
        padding: 0 0 0 5%;
      }
      .circle{
        margin: -24px 0 0 30%;
      }
      .firsthr{
        margin: 24px 50% 0 0 !important;
      }
      .dashhr{
        margin: 70px 50% 0 0;
      }
      .stepfont{
        margin: 2% 0 2% 20%;
      }
      .stepfour{
        height: 55px;
        line-height: 55px;
      }
    }
    .circle{
      width: 40px;
      height: 40px;
      img{
        width: 32px;
        height: 32px;
        margin: 4px;
      }
    }
    .stepnum{
      height: 48px;
      line-height: 48px;
    }
    .stepicon{
    height: 70px;
    }
    .stepicon1{
    height: 70px;
    }
  }
  .mt20 {
    margin-top: -2px;
   }
}
@media screen  and (max-width: 1450px) {
  .orderstep{
    font-size: 11px;
    .leftbox{
      .stepnum{
        padding: 0; 
      }
      .stepnum1{
        text-align: right; 
        padding: 5%;
      }
      .circle{
        margin: -20px 0 0 30%;
      }
      .dashhr{
        margin: 50px 0 0 50%;
      }
      .stepfont{
        margin: 2% 0 2% 15%;
      }
      .stepfour{
        height: 65px;
        .dashhr{
          margin: 60px 0 0 50%;
        }
        .circle{
        margin: -68px 0 0 30%;
        }
        .circletwo{
          margin: 15px 0 0 30%;
        }
        .stepfont{
          width: 30px;
          margin: -35px 0 0 0;
        }
        .bgclortwo{
          width: 30px;
          height: 60px;
        }
      }
    }
    .rightbox{
      height: 410px;
      .stepnum{
        padding: 0;
      }
      .stepnum1{
        text-align: left; 
        padding: 3% 5%;
      }
      .circle{
        margin: -20px 0 0 30%;
      }
      .firsthr{
        margin: 20px 50% 0 0 !important;
      }
      .dashhr{
        margin: 50px 50% 0 0;
      }
      .stepfont{
        margin: 2% 0 2% 15%;
      }
      .stepfour{
        height: 65px;
        line-height: 1;
        padding: 15% 5%;
      }
      .last{
      height: 24px;
    }
    }
    .circle{
      width: 35px;
      height: 35px;
      img{
        width: 30px;
        height: 30px;
        margin: 3px;
      }
    }
    .stepnum{
      line-height: 1;
      
    }
    .stepnum1{
      height: 40px;
    }
    .stepicon{
    height: 50px;
    }
    .stepicon1{
    height: 50px;
    }
  }
  .mt20 {
    margin-top: 0px;
}
}
</style>

