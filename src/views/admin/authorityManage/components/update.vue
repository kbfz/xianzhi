<!-- 点击编辑 -->
<template>
     <div>
        <h5 v-if ="updateView">数据权限管理</h5>
        <h5  v-else>数据权限管理
        </h5>
       <el-form :model="form"  ref="form" label-width="100px" :rules="rules">
      <el-form-item label="	url地址" prop="requestUrl">
        <el-input v-model="form.requestUrl" placeholder="请输入url地址 " :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="数据权限规则描述" prop="requestFilterField">
        <el-input v-model="form.requestFilterField" placeholder="请输入数据权限规则描述"  :disabled="formEdit"></el-input>
    </el-form-item>
    <el-form-item label="文字描述" prop="desc">
        <el-input v-model="form.des" placeholder="请输入文字描述"  :disabled="formEdit"></el-input>
    </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button @click="cancel('form')">取 消</el-button> -->
      <el-button  type="primary" @click="change" v-if = "updateView">修改</el-button>
      <el-button  type="primary" @click="update('form')" v-else>保存</el-button> 
    </div> 
     </div>
</template>
<script>
import { 
  putObj
} from 'api/admin/authorityManage/index';
import {strLength} from "utils/validate"
export default {
  name: 'update',
  data () {
    return {
       form: {
        id: undefined,
        requestUrl: undefined,
        des: undefined,
        requestFilterField: undefined
      },
      formEdit: true,
      disabledForm: true,
      updateView: true,
      rules: {
        requestUrl: [
          {
            required: true,
            message: "请输入URL地址",
            trigger: "blur"
          }
        ],
        requestFilterField: [
          {
            required: true,
            message: "请输入数据权限规则描述",
            trigger: "blur"
          }
        ],
        des: [
          {
            required: true,
            message: "请输入文字描述",
            trigger: "blur"
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
      update(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          let formTemp = {id: this.form.id, requestUrl: this.form.requestUrl,requestFilterField: $.parseJSON(this.form.requestFilterField),des: this.form.des}
          putObj(formTemp.id, formTemp).then((res) => {
            // 调用父组件的方法， 第一个参数名为调用的方法名，第二个参数为需要传递的参数
            this.$emit("childMethod", "");
            if(res.rel === true) {
              // this.$emit('childMethod', '');
              this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
             })
            } else {
               this.$notify({
              title: "异常",
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
  change() {
    this.formEdit = false
    this.updateView = false
    this.disabledForm = true
  }
  }
}
</script>
<style scoped>
  .dialog-footer{
    margin-left: 40%;
  }
</style>


