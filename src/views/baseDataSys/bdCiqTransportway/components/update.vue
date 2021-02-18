<template>
  <div> 
   <h5 v-if="updateView">详情</h5> 
   <h5 v-else>编辑</h5> 
   <el-form :model="form" :rules="rules" ref="form" label-width="120px"> 
    <el-form-item label="编码" prop="itemcode"> 
     <el-input v-model="form.itemcode" placeholder="请输入编码" :disabled="formEdit"></el-input> 
    </el-form-item> 
    <el-form-item label="名称" prop="itemname"> 
     <el-input v-model="form.itemname" placeholder="请输入名称" :disabled="formEdit"></el-input> 
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
import { addObj, putObj } from "api/baseDataSys/bdCiqTransportway/index";
import { mapGetters } from "vuex";
export default {
  name: "bdCiqTransportway",
  data() {
    return {
      form: {
        indx: undefined,
        itemcode: undefined,
        itemname: undefined
      },
      rules: {
        itemcode: [
          {
            required: true,
            message: "请输入编码",
            trigger: "blur"
          }
        ],
        itemname: [
          {
            required: true,
            message: "请输入名称",
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
        // console.log(this.form.indx);
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          putObj(this.form.indx, this.form).then(res => {
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
  margin-left: -30px;
}
}
@media screen and (max-width:1366px) {
 .el-form {
  margin-left: -40px;
}
.el-input, .el-select{
  width: 160px
}
}
</style>