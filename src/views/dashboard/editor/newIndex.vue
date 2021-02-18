<template>
   <div class="box">
       <!-- 左边 -->
        <div class="storage-right">
            <div class="leftContent">
                <h5>欢迎您，超级管理员 | 在线: <span>1</span>人 </h5>
                <div class="leftContent-top">
                    <div>
                    <div class="topImg">
                        <div class="img-center" @click="move">
                            <img src="../../../assets/tb-img/2.png" alt="">
                            <span>商品资料</span>
                        </div>
                        <!-- 箭头 -->
                        <transition name="fade">
                        <div class="jt" v-if="show">
                            <ul>
                                <li class="liOne">
                                   <img src="../../../assets/tb-img/jiantou.png" alt="">
                                </li>
                                <li class="liTwo">
                                   <img src="../../../assets/tb-img/jiantou.png" alt="">
                                </li>
                                <li class="liThree">
                                   <img src="../../../assets/tb-img/jiantou.png" alt="">
                                </li>
                                <li class="liFour">
                                   <img src="../../../assets/tb-img/jiantou.png" alt="">
                                </li>
                                <li class="liFive">
                                   <img src="../../../assets/tb-img/jiantou.png" alt="">
                                </li>
                                <li class="liSix">
                                   <img src="../../../assets/tb-img/jiantou.png" alt="">
                                </li>

                                <li class="liSeven">
                                   <img src="../../../assets/tb-img/jiantou.png" alt="">
                                </li>
                                <li class="liEight">
                                   <img src="../../../assets/tb-img/jiantou.png" alt="">
                                </li>
                            </ul>
                        </div>
                     </transition>
                    
                        <div class="circleEdge">
                            <ul>
                                <!-- <li v-for="item in select" :value="item.src" :key="item.src">
                                    <img :src="item.src" alt="">
                                     <span>{{item.name}}</span>
                                </li> -->
                              <transition name="fade" >
                                  <li  v-if="show" class="liOne">
                                    <img src="../../../assets/tb-img/1.png" alt="">
                                     <span>仓库</span>
                                </li>
                              </transition>
                              <transition name="fade">
                                  <li v-if="show" class="liTwo">
                                    <img src="../../../assets/tb-img/3.png" alt="">
                                     <span>机构</span>
                                </li>
                               </transition>
                               <transition name="fade">
                                  <li v-if="show" class="liThree">
                                    <img src="../../../assets/tb-img/4.png" alt="">
                                     <span>供应商</span>
                                </li>
                              </transition>
                              <transition name="fade">
                                  <li v-if="show" class="liFour">
                                    <img src="../../../assets/tb-img/5.png" alt="">
                                     <span>部门资料</span>
                                </li>
                                  </transition>
                                  <transition name="fade">
                                  <li v-if="show" class="liFive">
                                    <img src="../../../assets/tb-img/6.png" alt="">
                                     <span>报价单</span>
                                </li>
                               </transition>
                               <transition name="fade">
                                  <li v-if="show" class="liSix">
                                    <img src="../../../assets/tb-img/7.png" alt="">
                                     <span>商品设置</span>
                                </li>
                               </transition>
                               <transition name="fade">
                                 <li v-if="show" class="liSeven">
                                    <img src="../../../assets/tb-img/8.png" alt="">
                                     <span>类别</span>
                                </li>
                               </transition>
                               <transition name="fade">
                                <li v-if="show" class="liEight">
                                    <img src="../../../assets/tb-img/9.png" alt="">
                                     <span>品牌</span>
                                </li>
                              </transition>
                            </ul>
                        </div>
                    </div>
                </div>
               </div>
               <div class="leftContent-buttom">
                   <div class="bottm-title">更多功能</div>
                   <div class="bottom-content">
                       <ul>
                           <li>客户</li>
                           <li>商品条码更改</li>
                           <li>自编码、标记码生成</li>
                           <li>商品检查</li>
                           <li>进价</li>
                           <li>售价</li>
                           <li>组合商品</li>
                           <li>货位</li>
                           <li>商品陈列</li>
                           <li>商品净重</li>
                       </ul>
                   </div>
               </div>
            </div>
            </div>
             <!-- 右边 -->
            <div class="rightContent">
                3232
            </div>
   </div>
   
</template>
<script>
export default {
  name: 'newIndex',
  data () {
    return {
    //   select: [
    //     {src: "../../../assets/tb-img/bz.jpg", name: '仓库'},
    //     {src: '../../../assets/tb-img/hua.jpg', name: '机构'},
    //     {src: '../../../assets/tb-img/lunpan.jpg', name: '供应商'},
    //     {src: '../../../assets/tb-img/lz.jpg', name: '部门资料'},
    //     {src: '../../../assets/tb-img/sh.jpg', name: '报价单'},
    //     {src: '../../../assets/tb-img/uwe.jpg', name: '商品设置'},
    //     {src: '../../../assets/tb-img/xigua.jpg', name: '类别'},
    //     {src: '../../../assets/tb-img/zs.jpg', name: '品牌'}         
    //   ]
    show: false
    }
  },
  methods: {
     move() {
        this.show = !this.show
     }
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
 ul{
     list-style: none;
 }
 .box{
     width: 100%;
     height: 100%;
     overflow: auto;
     .storage-right {
        width:70%;
		height:100%;
        padding-left:5px;
        padding-top: 3px;
        border-right:1px solid #DEDEE6;
        float: left;
        // background: #f4f4f4;
      }
       .leftContent {
          width:99%;
		 height: 100%;
		 margin:0 auto;
       }
       .leftContent-top{
           width:60%;
           margin:0 auto;
           margin-top:40px;
           
       }
       .topImg{
           width: 600px;
           height: 600px;
           position: relative;
        //    border: 1px solid red;
        //    border-radius: 50%
       }
       .img-center{
           width:160px;
           height: 160px;
           border: 3px solid #95CBE5;
           box-shadow: 3px 3px 3px #A0C9DD;
           border-radius: 50%;
           position: relative;
           top: 35%;
           left: 37%;
           background: -webkit-linear-gradient(bottom, rgba(#B0DDFC, 0), rgba(#B0DDFC,1));
           background: -o-linear-gradient(top, rgba(#B0DDFC,0), rgba(#B0DDFC,1));
           background: -moz-linear-gradient(top, rgba(#B0DDFC,0), rgba(#B0DDFC,1));
           background: linear-gradient(to top, rgba(#B0DDFC,0), rgba(#B0DDFC,1));
           cursor: pointer;
       }
       .img-center img{
           width: 50%;
           height: 50%;
           position: absolute;
           left: 25%;
           top: 30px
       }
        .img-center span{
            position: absolute;
            top:72%;
            left:48px
        }
        .circleEdge ul li {
            width: 100px;
            height: 100px;
            border: 3px solid red;
           box-shadow: 1px 1px 1px red;
           border-radius: 50%;
           position: relative;
           text-align: center;
           cursor: pointer;
        }
        .circleEdge ul li img{
           width: 50%;
           height: 50%;
           position: absolute;
            left: 25%;
           top: 10px
        }
        .circleEdge ul li span{
            font-size: 15px;
            text-align: center;
            position: absolute;
            top:65%;
            left:0;
            display: inline-block;
            width:100%;
        }
       .circleEdge ul li:nth-child(1) {
           position: absolute;
            top:8%;
            left:41%;
            border-color:#6BB850;
            box-shadow: 2px 2px 2px #98B690;
            background: -webkit-linear-gradient(bottom, rgba(#73D753, 0), rgba(#73D753,1));
            background: -o-linear-gradient(top, rgba(#73D753,0), rgba(#73D753,1));
            background: -moz-linear-gradient(top, rgba(#73D753,0), rgba(#73D753,1));
            background: linear-gradient(to top, rgba(#73D753,0), rgba(#73D753,1));
       }
       .circleEdge ul li:nth-child(2) {
           position: absolute;
            top:17%;
            left:65.5%;
             border-color:#A1C9E3;
            box-shadow: 2px 2px 2px #A6CFE5;
             background: -webkit-linear-gradient(bottom, rgba(#A5DAFA, 0), rgba(#A5DAFA,1));
            background: -o-linear-gradient(top, rgba(#A5DAFA,0), rgba(#A5DAFA,1));
            background: -moz-linear-gradient(top, rgba(#A5DAFA,0), rgba(#A5DAFA,1));
            background: linear-gradient(to top, rgba(#A5DAFA,0), rgba(#A5DAFA,1));
       }
       .circleEdge ul li:nth-child(3) {
           position: absolute;
            top:39%;
            left:75%;
             border-color:#939393;
            box-shadow: 2px 2px 2px #CACACA;
            background: -webkit-linear-gradient(bottom, rgba(#D0D0D0, 0), rgba(#D0D0D0,1));
            background: -o-linear-gradient(top, rgba(#D0D0D0,0), rgba(#D0D0D0,1));
            background: -moz-linear-gradient(top, rgba(#D0D0D0,0), rgba(#D0D0D0,1));
            background: linear-gradient(to top, rgba(#D0D0D0,0), rgba(#D0D0D0,1));
       }
       .circleEdge ul li:nth-child(4) {
           position: absolute;
            top:62%;
            left:66%;
            border-color:#84C066;
            box-shadow: 2px 2px 2px #8BC368;
            background: -webkit-linear-gradient(bottom, rgba(#90D467, 0), rgba(#90D467,1));
            background: -o-linear-gradient(top, rgba(#90D467,0), rgba(#90D467,1));
            background: -moz-linear-gradient(top, rgba(#90D467,0), rgba(#90D467,1));
            background: linear-gradient(to top, rgba(#90D467,0), rgba(#90D467,1));
       }
        .circleEdge ul li:nth-child(5) {
           position: absolute;
            top:72.5%;
            left:42%;
             border-color:#E0CA91;
            box-shadow: 2px 2px 2px #F4C377;
            background: -webkit-linear-gradient(bottom, rgba(#FFD093, 0), rgba(#FFD093,1));
            background: -o-linear-gradient(top, rgba(#FFD093,0), rgba(#FFD093,1));
            background: -moz-linear-gradient(top, rgba(#FFD093,0), rgba(#FFD093,1));
            background: linear-gradient(to top, rgba(#FFD093,0), rgba(#FFD093,1));
       }
         .circleEdge ul li:nth-child(6) {
            position: absolute;
             top:62%;
             left:18%;
              border-color:#9DCDE4;
            box-shadow: 2px 2px 2px #96DBFC;
             background: -webkit-linear-gradient(bottom, rgba(#A0E1FF, 0), rgba(#A0E1FF,1));
            background: -o-linear-gradient(top, rgba(#A0E1FF,0), rgba(#A0E1FF,1));
            background: -moz-linear-gradient(top, rgba(#A0E1FF,0), rgba(#A0E1FF,1));
            background: linear-gradient(to top, rgba(#A0E1FF,0), rgba(#A0E1FF,1));
        }
         .circleEdge ul li:nth-child(7) {
            position: absolute;
             top:40%;
             left:9%;
              border-color:#DDA4D7;
            box-shadow: 2px 2px 2px #FFCDFB;
              background: -webkit-linear-gradient(bottom, rgba(#FFC9F4, 0), rgba(#FFC9F4,1));
            background: -o-linear-gradient(top, rgba(#FFC9F4,0), rgba(#FFC9F4,1));
            background: -moz-linear-gradient(top, rgba(#FFC9F4,0), rgba(#FFC9F4,1));
            background: linear-gradient(to top, rgba(#FFC9F4,0), rgba(#FFC9F4,1));
        }
        .circleEdge ul li:nth-child(8) {
            position: absolute;
             top:18%;
             left:17%;
              border-color:#E3C69A;
            box-shadow: 2px 2px 2px #FDD9A7;
            background: -webkit-linear-gradient(bottom, rgba(#FFDBAE, 0), rgba(#FFDBAE,1));
            background: -o-linear-gradient(top, rgba(#FFDBAE,0), rgba(#FFDBAE,1));
            background: -moz-linear-gradient(top, rgba(#FFDBAE,0), rgba(#FFDBAE,1));
            background: linear-gradient(to top, rgba(#FFDBAE,0), rgba(#FFDBAE,1));
        }
        .leftContent-buttom{
            width: 100%;
            overflow: hidden;
            margin-top: 20px;
        }
        .bottm-title{
            border-bottom: 1px solid #CDD4DC;
            width:30%
        }
        .bottom-content{
            width: 100%;
            overflow: hidden;
            margin-left: -40px;
            margin-bottom: 20px
        }
        .bottom-content ul li{
            width: 23%;
            float: left;
            margin-top: 7px;
            border-bottom: 1px solid #CDD4DC;
            margin-right: 2%;
        }
        
        // 鼠标放上去变大
        .circleEdge ul li:hover{
            width: 120px;
            height: 120px
        }
        .circleEdge ul li:nth-child(1):hover{
           position: absolute;
           top:5%;
           left:40%;
        }
        .circleEdge ul li:nth-child(2):hover{
           position: absolute;
           top:14%;
           left:65.5%;
        }
        .circleEdge ul li:nth-child(3):hover{
           position: absolute;
           top:37%;
           left:75%;
        }
        .circleEdge ul li:nth-child(4):hover{
           position: absolute;
           top:60%;
            left:66%;
        }
        .circleEdge ul li:nth-child(5):hover{
           position: absolute;
           top:72.5%;
           left:40%;
        }
        .circleEdge ul li:nth-child(6):hover{
           position: absolute;
           top:60%;
            left:16%;
        }
        .circleEdge ul li:nth-child(7):hover{
           position: absolute;
            top:39%;
             left:7%;
        }
        .circleEdge ul li:nth-child(8):hover{
           position: absolute;
            top:16%;
             left:14%;
        }
      // 圆显示的动画
       .fade-enter-active, .fade-leave-active {
         transition: all 1s ease;
      }
        .liOne{
            // animation: rollout 1.2s cubic-bezier(0.55, 0.085, 0.68, 0.53); 
            animation: rollout 1.2s;            
        }
        @keyframes rollout {
            0% { transform: translatey(180%); opacity: 0;}
            100% { transform: translatey(3%); opacity: 1;}
            }
        .liTwo{
        //    animation: rolloutTwo 1.2s cubic-bezier(0.55, 0.085, 0.68, 0.53); 
           animation: rolloutTwo 1.2s;
        }
        @keyframes rolloutTwo {
            0% { transform: translate(-140%,140%); opacity: 0;}
            100% { transform: translatey(9%,9%); opacity: 1;}
            }
           .liThree{
        //    animation: rolloutThree 1.2s cubic-bezier(0.55, 0.085, 0.68, 0.53); 
           animation: rolloutThree 1.2s;
        }
        @keyframes rolloutThree {
            0% { transform: translate(-180%,0); opacity: 0;}
            100% { transform: translatey(9%,9%); opacity: 1;}
            }
          .liFour{
        //    animation: rolloutFour 1.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
           animation: rolloutFour 1.2s;
        }
        @keyframes rolloutFour {
            0% { transform: translate(-140%,-140%); opacity: 0;}
            100% { transform: translatey(9%,9%); opacity: 1;}
            }
         .liFive{
        //    animation: rolloutFive 1.2s cubic-bezier(0.55, 0.085, 0.68, 0.53); 
           animation: rolloutFive 1.2s; 
        }
        @keyframes rolloutFive {
            0% { transform: translate(0,-180%); opacity: 0;}
            100% { transform: translatey(9%,9%); opacity: 1;}
            }
         .liSix{
        //    animation: rolloutSix 1.2s cubic-bezier(0.55, 0.085, 0.68, 0.53);
           animation: rolloutSix 1.2s;  
        }
        @keyframes rolloutSix {
            0% { transform: translate(120%,-140%); opacity: 0;}
            100% { transform: translatey(9%,9%); opacity: 1;}
            }
         .liSeven{
        //    animation: rolloutSeven 1.2s cubic-bezier(0.55, 0.085, 0.68, 0.53); 
           animation: rolloutSeven 1.2s;
        }
        @keyframes rolloutSeven {
            0% { transform: translate(180%,-0); opacity: 0;}
            100% { transform: translatey(9%,9%); opacity: 1;}
            }
          .liEight{
        //    animation: rolloutEight 1.2s cubic-bezier(0.55, 0.085, 0.68, 0.53); 
           animation: rolloutEight 1.2s;
        }
        @keyframes rolloutEight {
            0% { transform: translate(140%,140%); opacity: 0;}
            100% { transform: translatey(9%,9%); opacity: 1;}
            }
        //箭头
        .jt ul li img {
           width: 30px;
           height:30px 
        }
        .jt ul li:nth-child(1) {
            position: absolute;
            left: 47%;
            top:28%
        }
        .jt ul li:nth-child(2) {
            position: absolute;
            left: 60%;
            top:32.5%;
            transform: rotate(45deg)
        }
         .jt ul li:nth-child(3) {
            position: absolute;
            left: 66%;
            top:44.5%;
            transform: rotate(90deg)
        }
        .jt ul li:nth-child(4) {
            position: absolute;
            left: 62%;
            top:56.5%;
            transform: rotate(135deg)
        }
        .jt ul li:nth-child(5) {
            position: absolute;
            left: 48%;
            top:63%;
            transform: rotate(180deg)
        }
        .jt ul li:nth-child(6) {
            position: absolute;
            left: 35%;
            top:56.5%;
            transform: rotate(225deg)
        }
         .jt ul li:nth-child(7) {
            position: absolute;
            left: 30%;
            top:45%;
            transform: rotate(270deg)
        }
        .jt ul li:nth-child(8) {
            position: absolute;
            left: 35%;
            top:33%;
            transform: rotate(315deg)
        }
    // 右侧内容
    .rightContent{
       width:30%;
		height:100%;
        float:right;
    }
 }
@media screen and (max-width: 1600px) {
   .box .topImg[data-v-7f6aa383] {
    width: 570px;
    height: 570px;
    position: relative;
    margin-left: -20%;
    margin-top: -20%
}
.box .jt ul li[data-v-716a8326]:nth-child(5) {
    position: absolute;
    left: 48%;
    top: 64%;
}
.box .jt ul li[data-v-716a8326]:nth-child(4) {
    position: absolute;
    left: 63%;
    top: 57.5%;}
.box .img-center[data-v-7f6aa383] {
    width: 23%;
    height: 23%;
    position: relative;
    top: 37%;
    left: 39%;}
.box .circleEdge ul li[data-v-7f6aa383] {
    width: 15%;
    height: 15%;}
.box .img-center span[data-v-7f6aa383] {
    position: absolute;
    top: 67%;
    left: 26px;
    font-size: 14px;
}
.box .jt ul li img[data-v-7f6aa383] {
    width: 20px;
    height: 20px;
}
.box .jt ul li[data-v-7f6aa383]:nth-child(1) {
    position: absolute;
    left: 47%;
    top: 32%;
}
.box .jt ul li[data-v-7f6aa383]:nth-child(2) {
    position: absolute;
    left: 58%;
    top: 35.5%;
}
.box .jt ul li[data-v-7f6aa383]:nth-child(3) {
    position: absolute;
    left: 63%;
    top: 44.5%;
}
.box .img-center img[data-v-7f6aa383] {
    position: absolute;
    left: 25%;
    top: 15px;
}
.box .jt ul li[data-v-7f6aa383]:nth-child(4) {
    position: absolute;
    left: 60%;
    top: 56.5%;}
.box .jt ul li[data-v-7f6aa383]:nth-child(5) {
    position: absolute;
    left: 48%;
    top: 61%;}
.box .jt ul li[data-v-7f6aa383]:nth-child(6) {
    position: absolute;
    left: 37%;
    top: 55.5%;}
.box .jt ul li[data-v-7f6aa383]:nth-child(7) {
    position: absolute;
    left: 34%;
    top: 45%;}
    .box .jt ul li[data-v-7f6aa383]:nth-child(8) {
    position: absolute;
    left: 38%;
    top: 36%;}
.box .circleEdge ul li[data-v-7f6aa383]:nth-child(1) {
    position: absolute;
    top: 15%;
    left: 41%;}
.box .circleEdge ul li[data-v-7f6aa383]:nth-child(2) {
    position: absolute;
    top: 21%;
    left: 62.5%;}
.box .circleEdge ul li[data-v-7f6aa383]:nth-child(3) {
    position: absolute;
    top: 39%;
    left: 71%;}
.box .circleEdge ul li[data-v-7f6aa383]:nth-child(4) {
    position: absolute;
    top: 60%;
    left: 64%;}
.box .circleEdge ul li[data-v-7f6aa383]:nth-child(5) {
    position: absolute;
    top: 68.5%;
    left: 43%;}
.box .circleEdge ul li[data-v-7f6aa383]:nth-child(6) {
    position: absolute;
    top: 59%;
    left: 22%;}
.box .circleEdge ul li[data-v-7f6aa383]:nth-child(7) {
    position: absolute;
    top: 40%;
    left: 16%;}
.box .circleEdge ul li[data-v-7f6aa383]:nth-child(8) {
    position: absolute;
    top: 22%;
    left: 22%;}
.box .leftContent-buttom[data-v-7f6aa383] {
    width: 100%;
    overflow: hidden;
    margin-top: -30px;
}
}
@media screen and (max-width: 1400px) {
   .box .topImg[data-v-7f6aa383] {
    width: 500px;
    height: 500px;
    position: relative;
    margin-left: -20%;
    margin-top: -20%
}
.box .jt ul li[data-v-716a8326]:nth-child(5) {
    position: absolute;
    left: 48%;
    top: 64%;
}
.box .jt ul li[data-v-716a8326]:nth-child(4) {
    position: absolute;
    left: 63%;
    top: 57.5%;}
.box .img-center[data-v-7f6aa383] {
    width: 23%;
    height: 23%;
    position: relative;
    top: 37%;
    left: 39%;}
.box .circleEdge ul li[data-v-7f6aa383] {
    width: 15%;
    height: 15%;}
.box .img-center span[data-v-7f6aa383] {
    position: absolute;
    top: 67%;
    left: 26px;
    font-size: 14px;
}
.box .jt ul li img[data-v-7f6aa383] {
    width: 20px;
    height: 20px;
}
.box .jt ul li[data-v-7f6aa383]:nth-child(1) {
    position: absolute;
    left: 47%;
    top: 32%;
}
.box .jt ul li[data-v-7f6aa383]:nth-child(2) {
    position: absolute;
    left: 58%;
    top: 35.5%;
}
.box .jt ul li[data-v-7f6aa383]:nth-child(3) {
    position: absolute;
    left: 63%;
    top: 44.5%;
}
.box .img-center img[data-v-7f6aa383] {
    position: absolute;
    left: 25%;
    top: 15px;
}
.box .jt ul li[data-v-7f6aa383]:nth-child(4) {
    position: absolute;
    left: 60%;
    top: 56.5%;}
.box .jt ul li[data-v-7f6aa383]:nth-child(5) {
    position: absolute;
    left: 48%;
    top: 61%;}
.box .jt ul li[data-v-7f6aa383]:nth-child(6) {
    position: absolute;
    left: 37%;
    top: 55.5%;}
.box .jt ul li[data-v-7f6aa383]:nth-child(7) {
    position: absolute;
    left: 34%;
    top: 45%;}
    .box .jt ul li[data-v-7f6aa383]:nth-child(8) {
    position: absolute;
    left: 38%;
    top: 36%;}
.box .circleEdge ul li[data-v-7f6aa383]:nth-child(1) {
    position: absolute;
    top: 15%;
    left: 41%;}
.box .circleEdge ul li[data-v-7f6aa383]:nth-child(2) {
    position: absolute;
    top: 21%;
    left: 62.5%;}
.box .circleEdge ul li[data-v-7f6aa383]:nth-child(3) {
    position: absolute;
    top: 39%;
    left: 71%;}
.box .circleEdge ul li[data-v-7f6aa383]:nth-child(4) {
    position: absolute;
    top: 60%;
    left: 64%;}
.box .circleEdge ul li[data-v-7f6aa383]:nth-child(5) {
    position: absolute;
    top: 68.5%;
    left: 43%;}
.box .circleEdge ul li[data-v-7f6aa383]:nth-child(6) {
    position: absolute;
    top: 59%;
    left: 22%;}
.box .circleEdge ul li[data-v-7f6aa383]:nth-child(7) {
    position: absolute;
    top: 40%;
    left: 16%;}
.box .circleEdge ul li[data-v-7f6aa383]:nth-child(8) {
    position: absolute;
    top: 22%;
    left: 22%;}
.box .leftContent-buttom[data-v-7f6aa383] {
    width: 100%;
    overflow: hidden;
    margin-top: -30px;
}
.box .circleEdge ul li span[data-v-7f6aa383] {
    font-size: 12px;
}
}
@media screen and (max-width: 1050px) {
    .box .topImg[data-v-7f6aa383][data-v-7f6aa383] {
    width: 500px;
    height: 500px;
    position: relative;
    margin-left: -40%;
    margin-top: -20%;
}
}
// @media screen and (max-width: 1100px) {
//     .box .topImg[data-v-716a8326] {
//     width: 570px;
//     height: 570px;
//     position: relative;
//     margin-left: -35%;
// }
// .box .img-center[data-v-716a8326] {
//     width: 150px;
//     height: 150px;
// }
// .box .circleEdge ul li[data-v-716a8326] {
//     width: 90px;
//     height: 90px;
// }
// .box .circleEdge ul li[data-v-716a8326]:hover{
//     width:110px;
//     height:110px;
// }
// .box .circleEdge ul li span[data-v-716a8326] {
//     font-size: 13px;}
// .box .img-center span[data-v-716a8326] {
//     position: absolute;
//     top: 74%;
//     left: 40px;
// }
// .box .jt ul li[data-v-716a8326]:nth-child(4) {
//     position: absolute;
//     left: 62%;
//     top: 56.5%;}
// .box .jt ul li[data-v-716a8326]:nth-child(5) {
//     position: absolute;
//     left: 48%;
//     top: 63%;
// }
// }
</style>


