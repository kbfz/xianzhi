<template>
  <div class="login-main">
    <div class="login-container">
      <div class="imgTitle">
        <img src="../../assets/images/logoTop.png"
             alt="">
      </div>
      <div class="xzName">
        <img src="../../assets/images/photo.png"
             alt="">
      </div>
      <div class=" rightBg">
        <div class="rightbox">
          <div class="login_tab">
            <span class="textLeft"
                  :class="{'textColor':cuntomerUser}"
                  @click="cuntomerClick">企业用户</span>
            <!-- <div class="lineStyle" :class="{'move': cuntomerUser,'move1':adminUser}"></div>
            <span class="ml19">|</span> -->
            <span class="textRight"
                  :class="{'textColor':adminUser}"
                  @click="adminClick">管理员</span>
            <!-- <div class="topBorder"></div> -->
          </div>
          <el-form autoComplete="on"
                   :model="logincuntomerUser"
                   :rules="cuntomerUserRules"
                   ref="loginUser"
                   label-position="left"
                   label-width="0px"
                   class="card-box login-form"
                   v-show="cuntomerUser">
            <el-form-item prop="username" class="customer">
              <input name="username"
                     type="text"
                     v-model="logincuntomerUser.username"
                     autoComplete="on"
                     placeholder="请输入手机号"
                     onfocus="this.placeholder=''"
                     onblur="this.placeholder='请输入手机号'">
              <span class="icon"><img src="../../assets/images/userName.png"
                     style="width:26px;height: 26px"></span>
              <span v-if="showPhone"
                    class='phoneText'>请输入正确的手机号</span>
            </el-form-item>
            <el-form-item prop="password" class="customer">
              <input name="password"
                     type="password"
                     v-model="logincuntomerUser.password"
                     autoComplete="on"
                     placeholder="请输入密码"
                     onfocus="this.placeholder=''"
                     onblur="this.placeholder='请输入密码'">
              <span class="icon"><img src="../../assets/images/password.png"
                     style="width:25px;height: 27px"></span>
            </el-form-item>
            <el-form-item class="code"
                          prop="barCode">
              <input name="code"
                     type="text"
                     v-model="logincuntomerUser.barCode"
                     autoComplete="on"
                     placeholder="请输入验证码"
                     @keyup.enter="handleCuntomerUser"
                     @focus="verCode"
                     onfocus="this.placeholder=''"
                     onblur="this.placeholder='请输入验证码'"
                     style="padding-left: 18px">
              <div class="el-form-item__error"
                   v-show="barCodeText">{{message}}</div>
            </el-form-item>
            <div class="code ver-code-img"><img @click="refreshBarCode"
                   :src="barCodeUrl"></div>
            <div class="loginPass">
              <span class="forgetWord">
                忘记密码
                <div class="forgetImg">
                  <img src="../../assets/images/lxkf.png"
                       alt="">
                </div>
              </span>
              <el-button type="primary"
                         class="login-btn"
                         :loading="loading"
                         @click.native="handleCuntomerUser">
                登 录
              </el-button>

            </div>

          </el-form>

          <el-form autoComplete="on"
                   :model="loginForm"
                   :rules="loginRules"
                   ref="loginSys"
                   label-position="left"
                   label-width="0px"
                   class="card-box login-form"
                   v-show="adminUser">
            <el-form-item prop="username" class="customer">
              <input name="username"
                     type="text"
                     v-model="loginForm.username"
                     autoComplete="on"
                     placeholder="请输入管理员账号"
                     onfocus="this.placeholder=''"
                     onblur="this.placeholder='请输入管理员账号'">
              <span class="icon"><img src="../../assets/images/userName.png"
                     style="width:26px;height: 26px"></span>
            </el-form-item>
            <el-form-item prop="password" class="customer">
              <input name="password"
                     type="password"
                     v-model="loginForm.password"
                     autoComplete="on"
                     placeholder="请输入密码"
                     onfocus="this.placeholder=''"
                     onblur="this.placeholder='请输入密码'">
              <span class="icon"><img src="../../assets/images/password.png"
                     style="width:25px;height: 27px"></span>
            </el-form-item>
            <el-form-item class="code"
                          prop="barCode">
              <input name="code"
                     type="text"
                     v-model="loginForm.barCode"
                     autoComplete="on"
                     placeholder="请输入验证码"
                     @keyup.enter="handleLogin"
                     @focus="verCode"
                     onfocus="this.placeholder=''"
                     onblur="this.placeholder='请输入验证码'"
                     style="padding-left: 18px">
              <div class="el-form-item__error"
                   v-show="barCodeForm">{{message}}</div>
            </el-form-item>
            <div class="code ver-code-img"><img @click="refreshBarCode"
                   :src="barCodeUrl"></div>
            <div class="loginPass">
              <el-button type="primary"
                         class="login-btn ml0"
                         :loading="loading"
                         @click.native="handleLogin">
                登录
              </el-button>
            </div>
          </el-form>
        </div>
        <div class="textDom">
          {{textContent}}
        </div>
      </div>

    </div>
    <div class="footom">Copyright © 河南全速通供应链管理有限公司 版权所有 保留一切权利 | 豫ICP备14022453号-4</div>
  </div>
</template>

<script>
import { getSessionId } from "utils/auth";
import Cookies from 'js-cookie'
export default {
  // components: {
  //   socialSign
  // },
  name: "login",
  data () {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        userType: '1',
        username: "",
        password: "",
        barCode: '',
        sessionId: '',
      },
      logincuntomerUser: {
        userType: '0',
        username: "",
        password: "",
        barCode: '',
        sessionId: '',
      },
      activeName: 'second',
      barCodeUrl: '/api/auth/jwt/captcha.file?',
      loginRules: {
        username: [
          {
            required: true,
            message: "账户不能为空",
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
      cuntomerUserRules: {
        username: [
          {
            required: true,
            message: "手机号不能为空",
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
      message: '',
      textContent: '',
      cuntomerUser: true,
      adminUser: false,
      showPhone: false,
      showTextPhone: false,
      showTextCode: false,
      barCodeText: true,
      barCodeForm: true
    }
  },
  methods: {
    // 登录文字随机切换
    loginText () {
      var len = 40;
      var textLength = Math.floor(Math.random() * len);
      var textIcon = ["人生，可以痛苦，更要懂得追求快乐", "既然认准了一条路，那就坚持走下去", "命运不会辜负每一个认真而努力的人", "再过五年你将会感谢今天发狠的自己",
        "总有一天，你会活成，自己喜欢的那个样子", "改变自己，需要一个持之以恒的心态", "不管什么年纪，别辜负最好的自己", "把每一句“我不会”都改为“我可以学", "把每一句“我不敢”都改为“我一定行",
        "尝试总比永远不敢开始要强", "选择了安逸，就不必羡慕别人精彩充实", "选择了惊涛骇浪，就无须向往岁月静好", "不同的选择给予你不同的生活路径", "每个人都会是自己的人生赢家", "世界是很公平的，放弃了就不要抱怨",
        "要得到必须付出，要付出你还要学会坚持", "我可以不完美，但一定要真实", "生活是公平的，要活出精彩", "行动成就梦想，奋斗成就人生", "阳光这么好，何必自寻烦恼", "你要是不走，就看不到山顶上的风景", "请不要忘了你曾经为了梦想而有过的勇气", "坚持下去，你终将遇见更好的自己", "体会空气的清新，体味事物的美好",
        "依赖于别人，很多时候，也就是缺少担当", "你现在拥有的，才是你真正要珍惜的", "如果你想做一个追梦人，那就用自己的努力来证明吧", "请在雨天给没伞的人撑起一方晴空", "请在需要献爱心的地方，慷慨解囊",
        "请在公车上给老幼妇残者让个座", "要懂得选择换位思考，理解，宽容和忍让", "生活就是一种承受，我们要学会支撑自己", "走过一些路，才知道辛苦", "跨过一些坎，才知道超越", "有些事情本身我们无法控制，只好控制自己",
        "成功的母亲是失败，成功的父亲是汗水", "不必每分钟都学习，但求学习中每分钟都有收获", "紧张而有序，效率是关键", "改变能改变的，接受不能改变的", "世界上最成功的人往往不是最有才华的人"]
      this.textContent = textIcon[textLength]
    },
    verCode () {
      this.message = ''
    },
    refreshBarCode () {
      this.barCodeUrl = '/api/auth/jwt/captcha.file?_ttp=' + Math.random();
      // console.log(Cookies.get('sessionId'));
    },
    // 企业用户
    handleCuntomerUser () {
      this.$refs.loginUser.validate(valid => {
        if (valid) {
          if (this.logincuntomerUser.userType === '0') {
            var reg = /^\d+$/
            if (reg.test(this.logincuntomerUser.username) === false) {
              this.showPhone = true
              return
            } else {
              this.showPhone = false
            }
          }
          this.loading = true;
          this.barCodeText = true
          this.logincuntomerUser.sessionId = Cookies.get('sessionId');
          // console.log(Cookies.get('sessionId'));
          this.$store.dispatch("LoginByEmail", this.logincuntomerUser).then((response) => {
            this.loading = false;
            if (response.rel !== true) {
              this.message = response.message
              return;
            } else if (response.status === 303) {
              this.message = response.message
              return;
            } else if (response.status === 304) {
              this.message = response.message
              return;
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
    // 管理员
    handleLogin () {
      this.$refs.loginSys.validate(valid => {
        if (valid) {
          this.loading = true
          this.barCodeForm = true
          this.loginForm.sessionId = Cookies.get('sessionId');
          // console.log(Cookies.get('sessionId'));
          this.$store.dispatch("LoginByEmail", this.loginForm).then((response) => {
            this.loading = false;
            if (response.rel !== true) {
              this.message = response.message
              return;
            } else if (response.status === 303) {
              this.message = response.message
              return;
            } else if (response.status === 304) {
              this.message = response.message
              return;
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

    // 企业用户
    cuntomerClick () {
      this.refreshBarCode()
      this.cuntomerUser = true
      this.adminUser = false
      this.showPhone = false
      this.barCodeText = false
      this.logincuntomerUser = {
        username: "",
        password: "",
        barCode: '',
        sessionId: '',
        userType: '0'
      }
      this.$nextTick(() => {
        this.$refs['loginUser'].resetFields();
      })
    },
    // 管理员
    adminClick () {
      this.refreshBarCode()
      this.cuntomerUser = false
      this.adminUser = true
      this.barCodeForm = false
      this.loginForm = {
        username: "",
        password: "",
        barCode: '',
        sessionId: '',
        userType: '1'
      }
      this.$nextTick(() => {
        this.$refs['loginSys'].resetFields();
      })
    },
    afterQRScan () {
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
  created () {
    // window.addEventListener('hashchange', this.afterQRScan);
    this.loginText()
  },
  destroyed () {
    // window.removeEventListener('hashchange', this.afterQRScan);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import 'src/styles/mixin.scss';
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-text-fill-color: #333 !important;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  background-color: transparent;
  background-image: none;
  transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
  // color: #b3b3b3;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #b3b3b3;
  opacity: 1;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #b3b3b3;
  opacity: 1;
}

input:-ms-input-placeholder {
  color: #b3b3b3;
  opacity: 1;
}
input::-webkit-input-placeholder {
  color: #b3b3b3;
  opacity: 1;
}
.login-main {
  background: url('../../assets/images/logoBg.jpg') no-repeat;
  height: 100%;
  width: 100%;
  position: fixed;
  background-size: cover;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
}

.login-container {
  @include relative;
  width: 1100px;
  height: 100%;
  margin: 0 auto;
  background-position: 62% 30%;
  .imgTitle {
    width: 100%;
    // margin-top:52px;
    position: absolute;
    top: 7%;
    left: 0;
    img {
      width: 302px;
    }
  }
  .xzName {
    height: 728px;
    font-size: 40px;
    font-weight: 550;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    position: absolute;
    left: 0;
    top: 23%;
    float: left;
    // p {
    //   margin-left: 45px;
    //   margin-bottom: 66px;
    // }
    img {
      width: 668px;
      height: 504px;
    }
  }
  .rightBg {
    width: 374px;
    height: 433px;
    float: right;
    position: absolute;
    right: 0;
    top: 26.5%;
    .rightbox {
      background: url('../../assets/images/baikuang.png') center no-repeat;
      width: 364px;
      height: 408px;
      margin: 0 auto;
      padding-top: 46px;
      .login_tab {
        // margin-left: 80px;
        font-size: 18px;
        width: 279px;
        height: 44px;
        background-color: #ffffff;
        border-radius: 10px;
        border: solid 1px #389ef6;
        margin-left: 40px;
        .textLeft,
        .textRight {
          cursor: pointer;
          color: #999999;
          display: inline-block;
          width: 50%;
          text-align: center;
          height: 44px;
          float: left;
          line-height: 44px;
          font-size: 17px;
        }
        .textLeft {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        .textRight {
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
        .ml19 {
          margin-left: 19px;
          margin-right: 19px;
          color: #389ef6;
        }
        .textColor {
          color: #ffffff;
          font-size: 19px;
          background-color: #389ef6;
          height: 44px;
          // margin-left: -1px;
          margin-top: -1px;
        }

        .lineStyle {
          height: 2px;
          width: 143px;
          position: absolute;
          left: 41px;
          top: 78px;
          transition: 0.3s;
          background-color: #1b8cea;
        }
        .move {
          left: 41px;
        }
        .move1 {
          left: 185px;
        }
        .topBorder {
          border: 0.5px solid #d1dbe5;
          width: 288px;
          margin-top: 10px;
          margin-left: -44px;
        }
      }
      .el-form-item__content {
        line-height: 36px;
        position: relative;
        font-size: 16px;
      }
      .user {
        text-align: center;
        color: #368ae3;
        font-size: 28px;
      }
      .topImg {
        text-align: center;
        width: 134px;
        // height: 63px;
        margin-left: 109px;
        margin-top: 25px;
      }
    }
    .textDom {
      text-align: center;
      font-size: 16px;
      color: #ffffff;
      margin-top: 4%;
    }
  }

  input {
    background: transparent;
    border: 0;
    -webkit-appearance: none;
    line-height: 42px;
    height: 42px;
    width: 100%;
    border-radius: 6px;
    // text-indent: 4.6em;
    padding-left: 55px;
    padding-right: 15px;
    color: #333;
  }
  input:focus {
    border-radius: 6px;
    border: 2px;
    color: #333;
    border: none;
    outline: none;
  }
  .el-input {
    display: inline-block;
    width: 88%;
    color: #333;
  }

  .login-form {
    width: 281px;
    left: 12.4%;
    top: 28%;
    position: absolute;
    color: #ffffff;
  }
  .loginPass {
    width: 100%;
    padding-top: 6px;
    overflow: hidden;
    overflow: hidden;
    .forgetWord {
      float: left;
      display: inline-block;
      font-size: 17px;
      color: #389ef6;
      line-height: 42px;
      cursor: pointer;
      margin-left: 30px;
      .forgetImg {
        margin-left: -15px;
        margin-top: -10px;
        display: none;
      }
    }
    .login-btn {
      width: 152px;
      height: 42px;
      font-size: 18px;
      background-color: #389ef6;
      background-image: linear-gradient(
          0deg,
          rgba(3, 0, 0, 0.13) 0%,
          rgba(255, 255, 255, 0.13) 100%
        ),
        linear-gradient(#4890ea, #4890ea);
      background-blend-mode: overlay, normal;
      border-radius: 19px;
      float: right;
    }
    .ml0 {
      margin: 0 auto;
      float: none;
      margin-left: 63px;
    }
  }
  .forgetWord:hover .forgetImg {
    display: block;
  }
  .icon {
    margin: -35px 0 0 20px;
    display: block;
  }
  .el-form-item {
    border: none;
    width: 281px;
    height: 42px;
    background-color: #ffffff;
    border-radius: 24px;
    border: solid 1px #389ef6;
    color: #b3b3b3;
    margin-bottom: 22px;
  }
  .code {
    width: 48%;
    float: left;
    margin-right: 0px;
    span {
      width: 20%;
    }
    .el-input {
      width: 80%;
    }
  }
  .ver-code-img {
    width: 47%;
    height: 45px;
    margin-right: 0;
    border-radius: 5px;
    text-align: right;
    // border-color: #f5f5f5;
    img {
      width: 120px;
      height: 40px;
    }
  }
}
.footom {
  text-align: center;
  color: #fff;
  font-size: 12px;
  bottom: 10px;
  position: absolute;
  width: 99%;
}
.phoneText {
  color: #ff4949;
  font-size: 12px;
  line-height: 1;
  padding-top: 0px;
  display: block;
  width: 240px !important;
}
</style>
