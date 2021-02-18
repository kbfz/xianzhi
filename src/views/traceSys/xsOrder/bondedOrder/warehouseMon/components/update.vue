<template>
  <div class="right-bg-box">
    <div class="right-bg"> 
      <span class="smallicon"><img src="../../../../../../assets/images/yc_ico.png"></span>
      <h4 class="model-title">推送仓库超时单量</h4>
      <!-- <span class="smallicon" v-if="normal"><img src="../../../../../../assets/images/dui_ico.png"></span>
      <h4 class="model-title" v-if="normal">正常仓库作业订单</h4> -->
      <img class="arrow_r" src="../../../../../../assets/update/right_bg.jpg" alt="">
      <div class="modular_box">
        <div class="modular1">
          <p>
            <span class="text-data"><countTo class="info-item-num" :startVal='0' :endVal='orderNum.countOrder' :duration='1400'></countTo></span>
            <span>单</span>
          </p>
           <!-- <p v-if="normal">
            <span class="text-data" style="color:#07C144"><countTo class="info-item-num" :startVal='0' :endVal='1000' :duration='1400'></countTo></span>
            <span>单</span>
          </p> -->
          <p>{{orderNum.storage}}</p>
        </div>
        <!-- <div class="modular2">
          <ul>
            <li class="numtext">
              <span class="time"><countTo class="info-item-num" :startVal='0' :endVal='orderNum.exceedTime' :duration='1400' :decimals='1'></countTo></span>
              <span>H</span>
              <p>超时最长</p>
            </li>
            <li class="line"></li>
            <li class="numtext">
              <span class="time"><countTo class="info-item-num" :startVal='0' :endVal='orderNum.averageTime' :duration='1400' :decimals='1'></countTo></span>
              <span>H</span>
              <p>平均时长</p>
            </li>
          </ul>
        </div> -->
        <div class="modular3" >
          <div class="text_box">
            <p class="text-date">
             <countTo class="info-item-num" :startVal='0' :endVal='orderNum.storageOrder' :duration='2400'></countTo>
            </p>
            <p class="text-title">总申报成功单量</p>
          </div>
          <img class="icon01" src="../../../../../../assets/update/icon_b2.png" alt="">
          <img class="icon02" src="../../../../../../assets/update/icon_w2.png" alt="">
        </div>
        <div class="modular4" v-if="abnormal">
          <div class="text_box">
            <p class="text-date">
              <countTo class="info-item-num" :startVal='0' :endVal='orderNum.countCustomer' :duration='2400'></countTo>
            </p>
            <p class="text-title">总客户量</p>
          </div>
          <img class="icon01" src="../../../../../../assets/update/cw_ico1_pre.png" alt="">
          <img class="icon02" src="../../../../../../assets/update/cw_ico1_hover.png" alt="">
        </div>
      </div> 
    </div>
  </div>
</template>
<script>

// import { addObj, putObj } from "api/orderSys/sellBsorderHead/index";
import countTo from 'vue-count-to';
import { mapGetters } from "vuex";
export default {
  name: "update",
   props: {
    orderNum: {type: Object}
  },
  data() {
    return {  
      //  jde
     abnormal: true,
     normal: false
    }
  },
  components: { countTo }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
p,h4,ul{
  margin: 0;
  padding:0;
}
.right-bg-box{
  position: relative;
  .right-bg {
    height: 100%;
    padding-right: 10px;
    background-color: #ececec;
    position: fixed;
    bottom: 0;
    top:140px;
    width: 100%;
    .smallicon img{
      margin: 27px 0 30px 40px;
    }
    .model-title{
      color: #333;
      // font-size:22px;
      margin: -56px 0 30px 80px;
    }
    .arrow_r{
      position: fixed;
      top: 120px;
    }
    .modular_box{
      position: relative;
    }
    .modular1,.modular3,.modular4{
      width: 238px;
      position: absolute;
      left: 11.85%;
      margin-left: -169px;
      margin-bottom: 20px;
    }
    .modular1{
      height: 120px;
      font-size: 15px;
      color: #333;
      text-align: center;
      .text-data{
        font-size: 66px;
        color: #fc7d20;
      }
    }
    .modular2{
      top:130px;
      height: 150px;
      position: relative;
      padding: 1.5% 2%;
      margin-left: 7px;
      border: 1px #ddd solid;
      font-size: 14px;
      color: #333;
      .time{
        font-size: 30px;
        color: #222;
      }
      .numtext{
        float: left;
        width: 7%;
        text-align: center;
        margin-top: 1%
      }
      .line{
        float: left;
        width: 1px;
        background-color: #ddd;
        height: 50px;
        margin: 30px 0;
      }
    }
    .modular3,.modular4{
      height: 152px;
      background: url('../../../../../../assets/update/w_ico.png') no-repeat;
      background-size: contain;
      .text_box{
        display: inline-block;
        .text-date{
          color: #455ff3;
          padding: 38px 0 0 20px;
          font-size: 25px;
        }
        .text-title{
          color: #455ff3;
          margin: 18px 0 0 20px;
          border-left:2px solid #455eee;
          padding-left:9px;
        }
      }
      .icon01{
        float: right;
        margin: 42px 12px 0 0;
      }
      .icon02{
        display: none;
      }
    }
    .modular3{
      top:168px;
    }
    .modular4{
      top:338px;
    }
     .modular5{
      top:168px;
    }
    .modular6{
      top:338px;
    }
    .modular3:hover,.modular4:hover{
      background: url('../../../../../../assets/update/l_ico.png') no-repeat;
      background-size: contain;
      .text-date{
          color: #d3ecfe;
        }
      .text-title{
          color: #fff;
          border-left:2px solid #d2edfe;
        }
        .icon01{
          display: none;
        }
        .icon02{
          display: block;
          float: right;
          margin: 42px 12px 0 0;
        }
    }
  }
}

@media screen and (max-width: 1680px){
  .right-bg-box{
    .right-bg {
      .smallicon img{
        margin: 27px 0 23px 40px;
      }
      .model-title{
        margin: -49px 0 23px 80px;
      }
      .modular1,.modular3,.modular4{
        width: 216px;
        margin-left: -151px;
      }
      .modular1{
        height: 110px;
        .text-data{
          font-size: 60px;
        }
      }
      .modular2{
        top:120px;
        height: 140px;
        .time{
          font-size: 28px;
        }
        .line{
          height: 50px;
          margin: 25px 0;
        }
      }
      .modular3,.modular4{
        height: 152px;
        .text_box{
          .text-date{
            padding: 32px 0 0 15px;
            font-size: 20px;
          }
          .text-title{
            margin: 18px 0 0 20px;
            font-size: 15px;
          }
        }
        .icon01{
          margin: 39px 12px 0 0;
          width: 60px;
        }
      }
      .modular3{
        top:288px;
      }
      .modular4{
        top:428px;
      }
       .modular5{
        top:148px;
      }
      .modular6{
        top:308px;
      }
      .modular3:hover,.modular4:hover{
        width: 216px;
        height: 152px;
        margin-left: -151px;
        .icon02{
          margin: 39px 12px 0 0;
          width: 60px;
        }
      }
    }
  }
} 

@media screen and (max-width: 1600px){
  .right-bg-box{
    .right-bg {
      .smallicon img{
        margin: 20px 0 17px 40px;
      }
      .model-title{
        margin: -42px 0 23px 80px;
      }
      .arrow_r{
        top: 110px;
      }
      .modular1,.modular3,.modular4{
        width: 190px;
        margin-left: -139px;
      }
      .modular1{
        height: 100px;
        .text-data{
          font-size: 50px;
        }
      }
      .modular2{
        top:110px;
        height: 130px;
        .time{
          font-size: 28px;
        }
        .line{
          height: 50px;
          margin: 20px 0;
        }
      }
      .modular3,.modular4{
        height: 152px;
        .text_box{
          .text-date{
            // padding: 32px 0 0 15px;
            font-size: 19px;
          }
          .text-title{
            // margin: 18px 0 0 20px;
            font-size: 14px;
          }
        }
        .icon01{
          margin: 30px 10px 0 0;
          width: 55px;
        }
      }
      .modular3{
        top:258px;
      }
      .modular4{
        top:383px;
      }
       .modular5{
        top:138px;
      }
      .modular6{
        top:280px;
      }
      .modular3:hover,.modular4:hover{
        width: 190px;
        height: 152px;
        margin-left: -139px;
        .icon02{
          margin: 30px 10px 0 0;
          width: 55px;
        }
      }
    }
  }
} 
@media screen and (max-width: 1440px){
  .right-bg-box{
    .right-bg {
      .modular1,.modular3,.modular4{
        width: 184px;
        margin-left: -136px;
      }
      .modular1{
        height: 100px;
        .text-data{
          font-size: 50px;
        }
      }
      .modular2{
        top:110px;
        height: 130px;
        .time{
          font-size: 28px;
        }
        .line{
          height: 50px;
          margin: 20px 0;
        }
      }
      .modular3,.modular4{
        height: 152px;
        .text_box{
          .text-date{
            font-size: 18px;
          }
        }
        .icon01{
          width: 50px;
        }
      }
      .modular3{
        top:250px;
      }
      .modular4{
        top:371px;
      }
          .modular5{
        top:128px;
      }
      .modular6{
        top:268px;
      }
      .modular3:hover,.modular4:hover{
        width: 184px;
        height: 152px;
        margin-left: -136px;
        .icon02{
          margin: 30px 10px 0 0;
          width: 50px;
        }
      }
    }
  }
} 
@media screen and (max-width: 1366px){
  .right-bg-box{
    .right-bg {
      .smallicon img{
        margin: 13px 0 10px 40px;
      }
      .model-title{
        margin: -36px 0 23px 80px;
      }
      .arrow_r{
        top: 100px;
      }
      .modular1,.modular3,.modular4{
        width: 144px;
        margin-left: -112px;
      }
      .modular1{
        height: 80px;
        font-size: 12px;
        .text-data{
          font-size: 40px;
        }
      }
      .modular2{
        top:90px;
        height: 100px;
        font-size: 12px;
        .numtext{
          margin-top: 0.5%;
        }
        .time{
          font-size: 25px;
        }
        .line{
          height: 40px;
          margin: 10px 0;
        }
      }
      .modular3,.modular4{
        height: 152px;
        .text_box{
          .text-date{
            padding: 22px 0 0 12px;
            font-size: 14px;
          }
          .text-title{
            margin: 10px 0 0 14px;
            font-size: 11px;
            padding-left: 6px;
          }
        }
        .icon01{
          margin: 30px 6px 0 0;
          width: 38px;
        }
      }
      .modular3{
        top:198px;
      }
      .modular4{
        top:293px;
      }
       .modular5{
        top:100px;
      }
      .modular6{
        top:208px;
      }
      .modular3:hover,.modular4:hover{
        width: 144px;
        height: 152px;
        margin-left: -112px;
        .icon02{
          margin: 30px 6px 0 0;
          width: 38px;
        }
      }
    }
  }
} 
</style>

