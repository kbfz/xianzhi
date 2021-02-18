<template>
  <div class="right-bg-box">
    <div id="step"
         style="text-align:center">
      <ul>
        <li v-for="(item , index) in loginsticsArr">
          <div class="lineBox">
            <div class="timetex textColor" >
              <span>{{item.time}}</span>
            </div>
            <div>
              <span class="spot dColor1" >●</span>
              <span class="lineContent h129 " v-if="(loginsticsArr.length > 1 && index !== (loginsticsArr.length - 1))"></span>
            </div>
            <!-- <div v-if="index == loginsticsArr.traceLines.length">
              <span class="spot">●</span>
            </div> -->

            <div class="rightContent h20">
              <span class="bgContent textColor" >{{item.des}}</span>
            </div>
          </div>
        </li>
      </ul>

      <!-- <div class="lineBox">
            <div class="timetex">
            <span>2018-03-30</span>
           </div>
            <div>
               <span class="spot">●</span>
                <span class="lineContent h129"></span>
            </div>
            
              <div class="rightContent h20" >
               <span class="bgContent">快件一杯郑州郑东新区四部签收 签收人: 同事/同学，感谢您使用中通快递，期待再次为您服务</span>
           </div>
          </div>  -->
      <!-- <div class="lineBox">
            <div class="timetex">
            <span>2018-03-30</span>
           </div>
            <div>
               <span class="spot">●</span>
                <span class="lineContent h129"></span>
            </div>
            
              <div class="rightContent h20" >
               <span class="bgContent">接收订单</span>
           </div>
          </div> -->
      <!-- <div class="lineBox">
            <div class="timetex">
            <span>2018-03-30</span>
           </div>
            <div>
               <span class="spot">●</span>
                <span class="lineContent h129"></span>
            </div>
            
              <div class="rightContent h20" >
               <span class="bgContent">接收订单</span>
           </div>
          </div> -->
      <!-- <div class="lineBox">
            <div class="timetex">
            <span>2018-03-30</span>
           </div>
            <div>
               <span class="spot">●</span>
                <span class="lineContent h129"></span>
            </div>
            
              <div class="rightContent h20" >
               <span class="bgContent">接收订单</span>
           </div>
          </div> -->
      <!-- <div class="lineBox">
            <div class="timetex">
            <span>2018-03-30</span>
           </div>
            <div>
               <span class="spot">●</span>
                <span class="lineContent h129"></span>
            </div>
            
              <div class="rightContent h20" >
               <span class="bgContent">接收订单</span>
           </div>
          </div> -->
      <!-- <div class="lineBox">
            <div class="timetex">
            <span>2018-03-30</span>
           </div>
            <div>
               <span class="spot">●</span>
            </div>
            
              <div class="rightContent h20" >
               <span class="bgContent">接收订单</span>
           </div>
          </div> -->
    </div>
  </div>
</template>
<script>

import { mapGetters } from "vuex";
export default {
  name: "sellBsorderHead",
  props: {
    loginsticsArr: {type: Array}
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

    
  }
};
</script>
<style scoped>
.right-bg-box {
  /* overflow: hidden; */
  padding-right: 10px;
  /* padding-top: 30px; */
  width: 50%;
  z-index: -1;
  /* margin: 0 auto; */
  padding-bottom: 15px;
  margin-left: 20%;
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
  color: #c9c9c9
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
  color: #c9c9c9
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
 .dColor1{
  color: #455ff3
}
.textColor{
  color: #333
}
</style>