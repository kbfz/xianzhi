<template>
  <div class="changePassword">
    <div class="passTop">
      <p>修改密码</p>
    </div>

    <el-form :model="passwordForm"
             :rules="rules"
             ref="passwordChange"
             label-position="left"
             label-width="80px"
             class="card-box login-form">
      <el-form-item prop="oldPwd"
                    label="原始密码"
                    class="passInput">
        <el-input type="password"
                  v-model="passwordForm.oldPwd"
                  placeholder="请输入原始密码"
                 ></el-input>
        <div class="el-form-item__error">{{message}}</div>
      </el-form-item>
      <el-form-item prop="newPwd"
                    label="新密码"
                    class="passInput">
        <el-input type="password"
                  v-model="passwordForm.newPwd"
                  placeholder="请输入新密码"
                  @blur="newPassword"></el-input>
        <span v-show="showNew"
              class="el-form-item__error">两次输入密码不一致，请重新输入</span>
      </el-form-item>
      <el-form-item prop="confirmPwd"
                    label="确认密码"
                    class="passInput">
        <el-input type="password"
                  v-model="passwordForm.confirmPwd"
                  placeholder="请再次输入新密码"
                  @blur="newPasswordAgain"></el-input>
        <span v-if="showNewAgain"
              class="el-form-item__error">两次输入密码不一致，请重新输入</span>
      </el-form-item>
      <el-button type="primary"
                 class="login-btn"
                 :loading="loading"
                 @click.native="handleLogin">
        保存修改
      </el-button>
    </el-form>
  </div>
</template>
<script>
import {  updatePassword } from "api/admin/menu/index"
export default {
  name: 'changePassword',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      passwordForm: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      },
      message: '',
      loading: false,
      showNew: false,
      showNewAgain: false,
      rules: {
        oldPwd: [
          {
            required: true,
            message: "原始密码不能为空",
            trigger: "blur"
          }
        ],
        newPwd: [
          {
            required: true,
            message: '新密码不能为空',
            trigger: "blur",

          },
          {
            trigger: "blur",
            validator: validatePass
          }
        ],
        confirmPwd: [
          {
            required: true,
            message: "确认密码不能为空",
            trigger: "blur"
          },
          {
            trigger: "blur",
            validator: validatePass
          }
        ]
      },
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'name',
  //     'avatar'
  //   ])
  // },
  created () {
  },
  methods: {
    // // 校验密码
    // checkOldPassword () {
    //   if (this.passwordForm.oldPwd !== '') {
    //     let checkObj = {
    //       oldPwd: this.passwordForm.oldPwd
    //     }
    //     checkPassword(checkObj).then(response => {
    //       this.message = response.message
    //     })
    //   } else {
    //     this.message = ''
    //   }
    // },
    // 更新密码 
    handleLogin () {
      const self = this.$refs
      self.passwordChange.validate(valid => {
        if (valid) {
          this.loading = true
          updatePassword(this.passwordForm).then(response => {
            this.loading = false
            if (response.rel) {
              this.$notify({
                title: "成功",
                message: "密码修改成功",
                type: "success",
                duration: 2000
              });
              this.newForm()
              this.showNew = false
              this.showNewAgain = false
            } else {
              this.$notify({
                title: "失败",
                message: "密码修改失败",
                type: "error",
                duration: 2000
              });
              this.newForm()
              this.showNew = false
              this.showNewAgain = false
            }
            if (response.status !== 200) {
              this.$notify({
                title: "失败",
                message: response.message,
                type: "error",
                duration: 2000
              });
              this.newForm()
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    newForm () {
      this.passwordForm = {
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      }
    },
    // 判断新密码和确认密码是否一致 
    // 先填确认密码
    newPassword () {
      if (this.passwordForm.confirmPwd !== ''  && this.passwordForm.newPwd !== ''  && this.passwordForm.confirmPwd !== this.passwordForm.newPwd && this.passwordForm.newPwd.length >= 5 && this.passwordForm.confirmPwd.length >= 5) {
        this.showNew = true
        return
      } else if (this.passwordForm.confirmPwd === '' || this.passwordForm.newPwd === '' || this.passwordForm.confirmPwd === this.passwordForm.newPwd || this.passwordForm.newPwd.length < 5 || this.passwordForm.confirmPwd.length < 5) {
        this.showNew = false
      }
    },
    // 确认密码
    newPasswordAgain () {
      if (this.passwordForm.newPwd !== '' && this.passwordForm.confirmPwd !== '' && this.passwordForm.newPwd !== this.passwordForm.confirmPwd && this.passwordForm.newPwd.length >= 5 && this.passwordForm.confirmPwd.length >= 5) {
        this.showNewAgain = true
        return
      } else if (this.passwordForm.newPwd === '' || this.passwordForm.confirmPwd === '' || this.passwordForm.newPwd === this.passwordForm.confirmPwd || this.passwordForm.newPwd.length < 5 || this.passwordForm.confirmPwd.length < 5) {
        this.showNewAgain = false
      }
    },
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
  // float: right;
  margin-left: 103px;
}
.login-form {
  width: 281px;
  color: #ffffff;
  margin-top: 40px;
  margin-left: 67px;
}
.el-form-item {
  border: none;
  // width: 281px;
  // height: 42px;
  background-color: #ffffff;
  // border-radius: 24px;
  // border: solid 1px #389ef6;
  color: #b3b3b3;
  margin-bottom: 35px;
}
.changePassword {
  width: 100%;
  height: 100%;
  padding-top:90px;
  .passTop {
    width: 98%;
    margin: 0 auto;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #b3b3b3;
    color: #389ef6;
    p {
      border-bottom: 2px solid #389ef6;
      height: 40px;
      width: 67px;
    }
  }
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


