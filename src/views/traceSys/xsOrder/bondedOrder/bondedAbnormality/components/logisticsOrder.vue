<template>
  <div class="right-bg-box">
    <p class="order_text">查询订单号为
      <span>{{tableLogistics.tableLogisticsOrder}}</span>
    </p>
    <div id="step"
         class="wAuto"
         ref="wAuto">
      <ul>
        <li v-for="(item , index) in loginsticsArr.traceLines">
          <div class="lineBox">
            <div class="timetex textColor">
              <span>{{item.time}}</span>
            </div>
            <div>
              <span class="spot dColor1">●</span>
              <span class="lineContent h129 "
                    v-if="(loginsticsArr.traceLines.length > 1 && index !== (loginsticsArr.traceLines.length - 1))"></span>
            </div>
            <div class="rightContent h20">
              <span class="bgContent textColor">{{item.des}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "sellBsorderHead",
  props: {
    loginsticsArr: { type: Object },
    tableLogistics: {
      type: Object
    }
  },
  data () {
    return {
      formEdit: true,
      updateView: true,
      query: {
        logisticsNo: ""
      }
    };
  },
  computed: {
    lineHeight () {
      return window.screen.height;
    }
  },
  methods: {


  },
  mounted () {
    //   左侧tree的高度自适应
    let self = this
    this.$refs.wAuto.style.height = window.innerHeight * 0.6 + "px"
    window.onresize = () => {
      self.$refs.wAuto.style.height = window.innerHeight * 0.6 + "px"
    }
  },
};
</script>
<style scoped>
.right-bg-box {
  width: 95%;
  z-index: -1;
  margin: 0 auto;
  margin-top: -20px;
}
.order_text {
  font-size: 16px;
  color: #666;
}
.order_text span {
  font-weight: 700;
}
img {
  max-width: 100%;
}
span {
  font-size: 14px;
}
.timetex {
  text-align: right;
  width: 50%;
  text-align: right;
  position: absolute;
  padding-right: 5%;
  color: #c9c9c9;
}
.rightContent {
  /* width:100%; */
  overflow: hidden;
  width: 50%;
  float: right;
  text-align: left;
  position: absolute;
  left: 50%;
  top: 0px;
  padding-left: 5%;
  color: #c9c9c9;
}
.bgContent {
  display: block;
  text-align: left;
  font-size: 13px;
}
.lineContent {
  /* border-left: 1px solid #c9c9c9; */
  border-left: 1px solid #455ff3;
  height: 58px;
  width: 1px;
  display: inline-block;
}
.spot {
  display: block;
  margin-top: -8px;
  font-size: 15px;
  color: #c9c9c9;
}
.h129 {
  height: 90px;
}
.lineBox {
  position: relative;
}
.dColor1 {
  color: #455ff3;
}
.textColor {
  color: #333;
}
.wAuto {
  text-align: center;
  /* height: 600px; */
  overflow: auto;
}
.wAuto ul{
  margin-left: -40%;
  margin-right: 5%;
}
</style>