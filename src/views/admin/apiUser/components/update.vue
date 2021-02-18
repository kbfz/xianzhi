<!-- 点击编辑 -->
<template>
  <div>
    <h5 v-if="updateView">API用户管理</h5>
    <h5 v-else>API用户管理
    </h5>
    <el-form :model="form"
             :rules="rules"
             ref="form"
             label-width="140px">
      <el-form-item label="客户名称"
                    prop="customerName">
        <el-input v-model="form.customerName"
                  placeholder="请输入客户名称 "
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="appKey"
                    prop="appKey">
        <el-input v-model="form.appKey"
                  placeholder="请输入appKey"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="签名密钥"
                    prop="appSecret">
        <el-input v-model="form.appSecret"
                  placeholder="请输入签名密钥"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="数据权限过滤字段" prop="auth">
        <el-input v-model="form.auth"
                  placeholder="请输入数据权限过滤字段"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea"
                  :autosize="{ minRows: 3, maxRows: 5}"
                  placeholder="请输入内容"
                  v-model="form.des"
                  :disabled="formEdit">
        </el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio-group v-model="form.isEnable">
          <el-radio class="radio"
                    :label="1"
                    :disabled="formEdit"
                    style="margin-right: 20px">启用</el-radio>
          <el-radio class="radio"
                    :label="2"
                    :disabled="formEdit">禁用</el-radio>
        </el-radio-group>
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
} from 'api/admin/apiUser/index';
import { strLength } from "utils/validate"
export default {
  name: 'update',
  data () {
    return {
      form: {
        id: undefined,
        customerName: undefined,
        appKey: undefined,
        appSecret: undefined,
        auth: undefined,
        des: undefined,
        isEnable: 1,
      },
      formEdit: true,
      disabledForm: true,
      updateView: true,
      rules: {
        customerName: [
          {
            required: true,
            message: "请输入客户名称",
            trigger: "blur"
          }
        ],
        appKey: [
          {
            required: true,
            message: "请输入appKey",
            trigger: "blur"
          }
        ],
        appSecret: [
          {
            required: true,
            message: "请输入签名密钥",
            trigger: "blur"
          }
        ],
          auth: [
          {
            required: true,
            message: "请输入数据权限过滤字段",
            trigger: "blur"
          }
        ]
      },
    }
  },
  computed: {
    lineHeight () {
      return (window.screen.height)
    }
  },
  methods: {

    update (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          let formData = { id: this.form.id, customerName: this.form.customerName, appKey: this.form.appKey, appSecret: this.form.appSecret, auth: $.parseJSON(this.form.auth), des: this.form.des, isEnable: this.form.isEnable }
          putObj(formData.id, formData).then((res) => {
            if (res.rel) {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              });
              // 调用父组件的方法， 第一个参数名为调用的方法名，第二个参数为需要传递的参数
              this.$emit('childMethod', '');
            } else {
              this.$notify({
                title: '失败',
                message: '系统异常',
                type: 'error',
                duration: 2000
              });
            }
            if (res.status !== 200) {
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


