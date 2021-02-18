<template>
<!-- <div data-vide-bg="http://192.168.1.66/Ipad"> -->
<div  class="login-main">
  <!-- <video autoplay="" loop="" muted="" style="margin: auto; position: absolute; z-index: -1; top: 50%; left: 50%; transform: translate(-50%, -50%); visibility: visible; width: 1905px; height: auto;">
    <source src="http://192.168.1.66/Ipad.mp4" type="video/mp4">
    <source src="http://192.168.1.66/Ipad.webm" type="video/webm">
    <source src="http://192.168.1.66/Ipad.ogv" type="video/ogg">
    </video> -->
  
<div class="login-container">
  <div class="left-img"><img src="./picture_denglu.png"></div>
  <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
    <img src="./logo.png" class="title">
    <el-form-item prop="username">
      <span :class="{'out-display': show, 'focus-display': hidden}"></span>
      <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" @focus="imgshow()" @blur="imgdisplay()"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <span :class="{'out-display1': show1, 'focus-display1': hidden1}"></span>
      <el-input name="password" type="password" v-model="loginForm.password" autoComplete="on" placeholder="登录密码" @focus="imgshow1()" @blur="imgdisplay1()"></el-input>
    </el-form-item>
    <el-form-item class="code" prop="barCode">
      <span :class="{'out-display2': showCode, 'focus-display2': hiddenCode}"></span>
      <el-input name="code" type="text" v-model="loginForm.barCode" autoComplete="on" placeholder="验证码" @focus="imgshow2()" @blur="imgdisplay2()" 
     @keyup.enter.native="handleLogin"></el-input>
     <div class="el-form-item__error" >{{message}}</div>
    </el-form-item>
    <div class="code ver-code-img"><img @click="refreshBarCode" :src="barCodeUrl"></div>
    <el-button type="primary" style="width:100%; height:40px" class="login-btn" :loading="loading" @click.native.prevent="handleLogin">
        登录
    </el-button>
  </el-form>
  

  <!-- <el-dialog title="第三方验证" :visible.sync="showDialog">
    邮箱登录成功,请选择第三方验证
    <social-sign></social-sign>
  </el-dialog> -->

</div>
<div class="footom">Copyright河南全速通供应链管理有限公司 版权所有 保留一切权利 | 豫ICP备14022453号-4</div>
</div>
<!-- </div> -->

</template>

<script>
import { getSessionId } from "utils/auth";
import Cookies from 'js-cookie'
export default {
  // components: {
  //   socialSign
  // },
  name: "login",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        barCode: '',
        sessionId: ''
      },
      barCodeUrl: '/api/auth/jwt/captcha.file?',
      loginRules: {
        username: [
          {
            required: true,
            message: "账户不能为空",
            trigger: "blur"
          },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePass
          }
        ],
        barCode: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      showDialog: false,
      show: false,
      hidden: true,
      show1: false,
      hidden1: true,
      showCode: false,
      hiddenCode: true,
      message: ''
    }
  },
  methods: {
    refreshBarCode() {
      this.barCodeUrl = '/api/auth/jwt/captcha.file?_ttp='+ Math.random();
      // console.log(Cookies.get('sessionId'));
    },
    imgshow(){
      this.show= true
      this.hidden= false
    },
    imgshow1 () {
      this.show1= true
      this.hidden1=false
    },
    imgshow2 () {
      this.showCode= true
      this.hiddenCode = false
      this.refreshBarCode();
    },
    imgdisplay () {
      if (this.loginForm.username ==='') {
        this.show= false,
        this.hidden= true
      } else {
        this.show = true,
        this.hidden= false
      }
    },
    imgdisplay1 (){
      if(this.loginForm.password===''){
      this.show1= false,
      this.hidden1= true
      }else{
        this.show1= true,
        this.hidden1= false
      }
    },
    imgdisplay2(){
      if (this.loginForm.code === '') {
      this.showCode = false,
      this.hiddenCode = true
      // console.log('111')
      } else {
        this.showCode = true,
        this.hiddenCode = false
        //  console.log('333')
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.loginForm.sessionId = Cookies.get('sessionId');
          // console.log(Cookies.get('sessionId'));
          this.$store
            .dispatch("LoginByEmail", this.loginForm)
            .then((response) => {
              this.loading = false;
              console.log(response);
              if (response.rel !== true) {
                 this.message = response.message
                 return ;
              } else if (response.status === 303) {
                  this.message = response.message
                  return ;
              } else if (response.status === 304) {
                this.message = response.message
                return ;
              }
              // } else if(response.status === 301) {
              //   message = response.message
              // } else if(response.status === 302) {
              // }
              this.$router.push({
                path: "/"
              });
              // this.showDialog = true;
            })
            .catch(() => {
              this.loading = false;
            });
          // this.$http.post('/oauth/token', {
          //   username: this.loginForm.username,
          //   password: this.loginForm.password
          // }, {
          //   headers: {
          //     Authorization: 'Basic enV1bDp6dXVs'
          //   },
          //   emulateJSON: true,
          //   emulateHTTP: true
          // }).then(function(response) {
          //   if (response.status === 200) {
          //     this.$store.dispatch('LoginByEmail', this.loginForm).then(() => {
          //       this.loading = false;
          //       this.$router.push({
          //         path: '/'
          //       });
          //       // this.showDialog = true;
          //     }).catch(() => {
          //       this.loading = false;
          //     });
          //   } else {
          //     this.loading = false;
          //     return false;
          //   }
          // }, function(error) {
          //   console.log('server error!!');
          //   this.loading = false;
          //   return false;
          // });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1);
      // const hashObj = getQueryObject(hash);
      // const originUrl = window.location.origin;
      // history.replaceState({}, '', originUrl);
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // };
      // const codeName = hashObj[codeMap[this.auth_type]];
      // if (!codeName) {
      //   alert('第三方登录失败');
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' });
      //   });
      // }
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan);
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
.login-main {
  position: absolute; 
  height: 100vh;
  top: 0px; 
  left: 0px; 
  bottom: 0px; 
  right: 0px; 
  overflow: hidden;
  background-position: 50% 50%;
  background: url('./dian.png') repeat , -webkit-linear-gradient(left top, #241547 , #262030); /* Safari 5.1 - 6.0 */
  background: url('./dian.png') repeat ,-o-linear-gradient(bottom right, #241547 , #262030); /* Opera 11.1 - 12.0 */
  background: url('./dian.png') repeat ,-moz-linear-gradient(bottom right, #241547 , #262030); /* Firefox 3.6 - 15 */
  background: url('./dian.png') repeat ,linear-gradient(to bottom right, #241547 , #262030); /* 标准的语法（必须放在最后） */ 
}
.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}

.login-container {
  @include relative;
  width: 80%;
  height: 95%;
  margin: 0 auto;
  // height: 833px;
  // background: url(' ./picture_denglu.png') no-repeat;
  // background-size: cover;
  // background-position: left 100px;
  /**background-color: #2d3a4b; **/
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
    //  box-shadow: 0 0 0 1000px white inset !important;
    // -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0;
    -webkit-appearance: none;
    line-height: 40px;
    height: 40px;
  }
  .el-input {
    display: inline-block;

    width: 88%;
    // float: left;
  }
  .out-display {
    background: url('./icon_1.png') no-repeat center center
  }
  .focus-display{
    background: url('./icon_2.png') no-repeat center center
  }
  .out-display1 {
    background: url('./icon_4.png') no-repeat center center
  }
  .focus-display1{
    background: url('./icon_3.png') no-repeat center center
  }
  .out-display2 {
    background: url('./icon_6.png') no-repeat center center
  }
  .focus-display2{
    background: url('./icon_5.png') no-repeat center center
  }
  .title {
    margin: 0 auto 40px;
    display: block;
  }
  .left-img{
    position: absolute;
    width: 60%;
    margin-top: 100px;
    img{
      width: 100%
    }
  }
  .login-form {
    position: absolute;
    right: 20%;
    width: 400px;
    padding: 0 35px 15px;
    margin: 15% auto;
  }
  .login-btn{
    border: none;
    background: -webkit-linear-gradient(left, #6dbaff , #936dff); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #6dbaff , #936dff); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #6dbaff , #936dff); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #6dbaff , #936dff); /* 标准的语法（必须放在最后） */ 
  }
  .el-form-item {
    border:none;
    background: white;
    border-radius: 5px;
    color: #333333;
    height: 40px;
    margin-bottom: 30px;
    span{
      display: block;
      width: 12% ;
      height: 40px;
      float: left;
    }
  }
.code{
  width: 45%;
  float: left;
  background: white;
  margin-right: 10px;
  span{
    width: 20%
  }
  .el-input{
    width: 80%
  }
}
  .ver-code-img {
    width: 51%;
    height: 40px;
    margin-right: 0;
    border-radius: 5px;
    img{
       width: 160px;
       height: 40px;
    }
    }

  // .forget-pwd {
  //   color: #fff;
  // }
}
.footom{
  text-align: center;
  color: #716c7d;
  font-size: 12px;
}
</style>
