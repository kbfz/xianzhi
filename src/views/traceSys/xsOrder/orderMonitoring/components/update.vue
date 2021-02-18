<template>
  <div>
    <div class="top_box">
      <div class="left_title">正常订单</div>
      <div class="right_seach">
        <input type="text" placeholder="请输入搜索内容">
        <button>搜索</button>
      </div>
    </div>
    <table class="table_box">
      <tr>
      <td>订单号：<span>854625913</span></td>
      <td>收货人名称：<span>admin</span></td>
      <td>收货人省份：<span>河南</span></td>
    </tr>
   <tr>
      <td>物流单号：<span>854625913</span></td>
      <td>收货人电话：<span>13838388888</span></td>
      <td>收货人县/区：<span>金水区</span></td>
    </tr>
    <tr>
      <td>支付单号：<span>854625913</span></td>
      <td>收货人国家：<span>中国</span></td>
      <td>收货人地址：<span>郑州市郑东新区金水路与心怡路交叉口楷林IFC D座1301-1303室</span></td>
    </tr>
    </table>
  <!-- 订单流程 -->
  <div class="orderLine">
    <div class="borderLine">
       <div class="iconWth">
          <span class="circle">●</span>
          <span class="circleLine"></span>
       </div>
    </div>
  </div>
  </div>
</template>

<script>
import Chart from '@/components/Charts/orderchart'
import percentBar from 'svg-progress-bar';  //动态进度条
export default {
  components: {},
  name: '',
  data () {
    return{
    }
  },
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
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
  }
  button{
    line-height: 45px;
    width: 90px;
    background-color: #3571e6;
    border: none;
    font-size: 14px;
    color: #ffffff;
    margin-left: -4px;
    outline: none;
  }
}
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
  width: 90%;
  margin: 0 auto;
  margin-top: 150px;
  position: relative;
  .borderLine{
    width: 100%;
    border-bottom: 1px solid #b5b5b5;
  }
  .iconWth{
    position: relative;
  }
  .circle{
    position: absolute;
    top: -9px
  }
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
</style>