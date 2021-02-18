<template>
  <div>
    <h5 v-if ="updateView">详情</h5>
    <h5  v-else>编辑</h5>
      <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="formLeft"> 
      <el-form-item label="供应商名称" prop="qstName"> 
          <el-input v-model="form.qstName" placeholder="请输入供应商名称" :disabled="formEdit"></el-input> 
      </el-form-item> 
      <el-form-item label="联系人电话"> 
          <el-input v-model="form.contactTel" placeholder="请输入联系人电话" :disabled="formEdit"></el-input> 
      </el-form-item> 
      <el-form-item label="联系人姓名"> 
          <el-input v-model="form.contactName" placeholder="请输入联系人姓名" :disabled="formEdit"></el-input> 
      </el-form-item>
      <el-form-item label="类型"> 
          <el-select v-model="form.type" placeholder="请选择" v-if="formEdit" disabled>
              <el-option v-for="item in selectType" :value="item.value" :label="item.label" :key="item.label"></el-option>
          </el-select>
           <el-select v-model="form.type" placeholder="请选择" v-if="!formEdit">
              <el-option v-for="item in selectType" :value="item.value" :label="item.label" :key="item.label"></el-option>
          </el-select>
      </el-form-item> 
      <el-form-item label="备注"> 
          <el-input v-model="form.remark" placeholder="请输入备注" :disabled="formEdit"></el-input> 
      </el-form-item> 
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button  type="primary" @click="change" v-if = "updateView" class="mt">修改</el-button>
          <el-button  type="primary" @click="update('form')" v-else class="mt">保存</el-button>
      </div>
  </div>
</template>

<script>
import { addObj, putObj } from "api/baseDataSys/bdSupplier/index";
import { mapGetters } from "vuex";
var dateUtils = require("silly-datetime");
export default {
  name: "bdSupplier",
  data() {
    return {
      form: {
        indx: undefined,
        // outCode: undefined,
        qstName: undefined,
        contactTel: undefined,
        contactName: undefined,
        createtime: undefined,
        type: undefined,
        remark: undefined
      },
      rules: { 
        // outCode: [
        //   {
        //     required: true,
        //     message: "请输入客户编码",
        //     trigger: "blur"
        //   }
        // ],
        qstName: [
          {
            required: true,
            message: "请输入供应商名称",
            trigger: "blur"
          }
        ]
      },
      formEdit: true,
      updateView: true,
      selectType: [
         {
            value: '1',
            label: '国外'
          },
           {
            value: '2',
            label: '国内'
          }
      ]
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
            // console.log(this.form.type)
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
       if (this.form.indx === undefined) {
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
      //            this.disabledForm = true
    }
  }
};
</script>
<style scoped>
.el-form {
  margin-left: 4%;
}
.el-input, .el-select{
  width:200px;
}
@media screen and (max-width:1632px) {
 .el-form {
  margin-left: -15px;
}
/* .mt{
  margin-top: -8px;
} */
}
@media screen and (max-width:1366px) {
 .el-form {
  margin-left: -20px;
}
.el-input, .el-select{
  width:160px;
}
}

</style>

