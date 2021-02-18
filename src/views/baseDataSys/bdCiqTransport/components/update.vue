<template>
  <div> 
   <h5 v-if="updateView">详情</h5> 
   <h5 v-else>编辑</h5> 
   <el-form :model="form" :rules="rules" ref="form" label-width="120px"> 
    <el-form-item label="编码" prop="code"> 
     <el-input v-model="form.code" placeholder="请输入编码" :disabled="formEdit" ></el-input> 
    </el-form-item> 
    <el-form-item label="中文名称" prop="cname"> 
     <el-input v-model="form.cname" placeholder="请输入中文名称" :disabled="formEdit" ></el-input> 
    </el-form-item> 
    <el-form-item label="英文名称" prop="ename"> 
     <el-input v-model="form.ename" placeholder="请输入英文名称" :disabled="formEdit" ></el-input> 
    </el-form-item> 
   </el-form> 
   <div slot="footer" class="dialog-footer"> 
    <el-button type="primary" @click="change" v-if="updateView">
     修改
    </el-button> 
    <el-button type="primary" @click="update('form')" v-else>
     保存
    </el-button> 
   </div> 
  </div>
</template>

<script>
import { addObj, putObj } from "api/baseDataSys/bdCiqTransport/index";
import { mapGetters } from "vuex";
export default {
  name: "bdCiqTransport",
  data() {
    return {
      form: {
        indx: undefined,
        code: undefined,
        cname: undefined,
        ename: undefined
      },
      rules: {
        code: [
          {
            required: true,
            message: "请输入编码",
            trigger: "blur"
          }
        ],
        cname: [
          {
            required: true,
            message: "请输入中文名称",
            trigger: "blur"
          }
        ],
        ename: [
          {
            required: true,
            message: "请输入英文名称",
            trigger: "blur"
          }
        ]
      },
      formEdit: true,
      updateView: true
    };
  },
  computed: {
    lineHeight() {
      return window.screen.height;
    }
  },
  methods: {
    // 清空表单
    resetFormFields() {
      this.$refs["form"].resetFields();
    },
    update(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          putObj(this.form.indx, this.form).then((res) => {
            // 调用父组件的方法， 第一个参数名为调用的方法名，第二个参数为需要传递的参数
            this.$emit("childMethod", "");
            if (res.rel) {
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success",
                duration: 2000
              });
            } else {
              this.$notify({
                title: "失败",
                message: "系统异常",
                type: "error",
                duration: 2000
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    // 点击修改 改变状态，变为编辑模式
    change() {
      if(this.form.indx === undefined){
          this.$notify({
          title: "操作提醒",
          message: "请先选择修改对象",
          type: "warning",
          duration: 2000
        });
        return;
        }
      this.formEdit = false;
      this.updateView = false;
    }
  }
};
</script>
<style scoped>
.el-form {
  margin-left: 4%;
}
.el-input, .el-select{
  width: 200px
}
@media screen and (max-width:1632px) {
 .el-form {
  margin-left: -17px;
}
}
@media screen and (max-width:1366px) {
 .el-form {
  margin-left: -25px;
}
.el-input, .el-select{
  width: 160px
}
}
</style>