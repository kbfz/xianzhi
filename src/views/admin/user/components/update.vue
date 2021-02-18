<!-- 点击编辑 -->
<template>
  <div>
    <h5 v-if="updateView">订单详情</h5>
    <h5 v-else>订单编辑
    </h5>
    <el-form :model="form"
             ref="form"
             label-width="100px"
             :rules="rules">
      <el-form-item label="姓名"
                    prop="name">
        <el-input v-model="form.name"
                  placeholder="请输入姓名 "
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="账户"
                    prop="username">
        <el-input v-model="form.username"
                  placeholder="请输入账户"
                  readonly
                  :disabled="disabledForm"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"
                  type="password"
                  placeholder="请输入账户密码"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="手机号"
                    prop="mobilePhone">
        <el-input v-model="form.mobilePhone"
                  placeholder="请输入手机号"
                  :disabled="formEdit" maxlength="13"></el-input>
      </el-form-item>
      <el-form-item label="固定电话">
        <el-input v-model="form.telPhone"
                  placeholder="请输入固定电话"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"
                    prop="email">
        <el-input v-model="form.email"
                  placeholder="请输入邮箱"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="鉴权">
        <el-input v-model="form.auth"
                  placeholder="请输入鉴权信息"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select class="filter-item"
                   v-model="form.sex"
                   placeholder="请选择"
                   disabled
                   v-if="updateView">
          <el-option v-for="item in  sexOptions"
                     :key="item"
                     :label="item"
                     :value="item"> </el-option>
        </el-select>

        <el-select class="filter-item"
                   v-model="form.sex"
                   placeholder="请选择"
                   v-else>
          <el-option v-for="item in  sexOptions"
                     :key="item"
                     :label="item"
                     :value="item"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="登录方式">
        <el-select class="filter-item"
                   v-model="form.type"
                   placeholder="请选择登录方式"
                   disabled
                   v-if="updateView">
          <el-option v-for="item in  userTypeOptions"
                     :key="item"
                     :label="item"
                     :value="item"> </el-option>
        </el-select>
        <el-select class="filter-item"
                   v-model="form.type"
                   placeholder="请选择"
                   v-else>
          <el-option v-for="item in  userTypeOptions"
                     :key="item"
                     :label="item"
                     :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述"
                    prop="description">
        <el-input type="textarea"
                  :autosize="{ minRows: 3, maxRows: 5}"
                  placeholder="请输入内容"
                  v-model="form.description"
                  :disabled="formEdit"> </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <!-- <el-button @click="cancel('form')">取 消</el-button> -->
      <el-button type="primary"
                 @click="change"
                 v-if="updateView">修改</el-button>
      <el-button type="primary"
                 @click="update('form')"
                 v-else>保存</el-button>
    </div>
  </div>
</template>
<script>
import {
  addObj,
  putObj
} from 'api/admin/user/index';
import { strLength, emailValidator, mobileValidator } from "utils/validate"
export default {
  name: 'update',
  data () {
    return {
      form: {
        id: null,
        username: null,
        name: null,
        sex: '男',
        password: null,
        description: null,
        type: 'app',
        refreshToken: null,
        refreshTokenExpire: null,
        auth: null,
        mobilePhone: null,
        telPhone: null,
        email: null,
        address: null
      },
      formEdit: true,
      disabledForm: true,
      sexOptions: ['男', '女'],
      userTypeOptions: ['app', 'api'],
      updateView: true,
      rules: {
        name: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            validator: strLength,
            trigger: 'blur'
          }
        ],
        username: [
          {
            required: true,
            message: '请输入账户',
            trigger: 'blur'
          },
          {
            validator: strLength,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur"
          }
        ],
        mobilePhone: [
          {
            validator: mobileValidator,
            message: "请输入正确的手机号",
          }
        ],
        email: [
          {
            validator: emailValidator,
            message: "请输入正确的邮箱格式",
          }
        ]
      }
    }
  },
  computed: {
    lineHeight () {
      return (window.screen.height)
    }
  },
  methods: {
    //  cancel(formName) {
    //   this.showView = false
    //   this.$refs[formName].resetFields();
    // },
    isJSON (str) {
      if (typeof str == 'string') {
        try {
          var obj = JSON.parse(str)
          if (typeof obj == 'object' && obj) {
            return true
          } else {
            return false
          }
        } catch (e) {
          console.log('error：' + str + '!!!' + e)
          return false
        }
      }
    },
    update (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          putObj(this.form.id, this.form).then((res) => {
            if (this.isJSON(this.form.auth) === false) {
              this.$notify({
                title: '提示',
                message: '鉴权格式不对，请输入正确的json格式',
                type: 'warning'
              });
            } else {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                duration: 2000
              });
              // 调用父组件的方法， 第一个参数名为调用的方法名，第二个参数为需要传递的参数
              this.$emit('childMethod', '');
            }
            if (res.status !== 200 || res.rel === false) {
              this.$notify({
                title: "失败",
                message: res.message,
                type: "error",
                duration: 2000
              });
            }
          });
        } else {
          return false;
        }
      })
    },
    // 清空表单 
    resetFormFields () {
      this.$refs['form'].resetFields();
    },
    // 点击修改 改变状态，变为编辑模式
    change () {
      if (this.form.id === '') {
        this.$notify({
          title: "操作提醒",
          message: "请先选择修改对象",
          type: "warning",
          duration: 2000
        });
        return;
      }
      this.formEdit = false
      this.updateView = false
      this.disabledForm = true
    }
  }
}
</script>
<style scoped>
.dialog-footer {
  margin-left: 40%;
}
</style>


