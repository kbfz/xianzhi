<template>
  <div> 
   <h5 v-if="updateView">详情</h5> 
   <h5 v-else>编辑</h5> 
   <el-form :model="form" :rules="rules" ref="form" label-width="120px"> 
    <!-- <el-form-item label="全速通编码" prop="qstCode"> 
     <el-input v-model="form.qstCode" placeholder="请输入全速通编码" :disabled="true"></el-input> 
    </el-form-item>  -->
    <el-form-item label="支付企业名称" prop="copName"> 
     <el-input v-model="form.copName" placeholder="请输入支付企业名称" :disabled="formEdit"></el-input> 
    </el-form-item> 
    <!-- <el-form-item label="第三方编码" prop="outCode"> 
     <el-input v-model="form.outCode" placeholder="请输入第三方编码" :disabled="formEdit"></el-input> 
    </el-form-item>
    <el-form-item label="企业传输编码" prop="copCode"> 
     <el-input v-model="form.copCode" placeholder="请输入企业传输编码" :disabled="formEdit"></el-input> 
    </el-form-item> 
    <el-form-item label="企业传输ID" prop="dxpId"> 
     <el-input v-model="form.dxpId" placeholder="请输入企业传输ID" :disabled="formEdit"></el-input> 
    </el-form-item>  -->
    <el-form-item label="海关名称" prop="cusPaymentName"> 
     <el-input v-model="form.cusPaymentName" placeholder="请输入海关名称" :disabled="formEdit"></el-input> 
    </el-form-item> 
    <el-form-item label="海关编码" prop="cusPaymentCode"> 
     <el-input v-model="form.cusPaymentCode" placeholder="请输入海关编码" :disabled="formEdit"></el-input> 
    </el-form-item> 
    <!-- <el-form-item label="国检名称" prop="ciqPaymentName"> 
     <el-input v-model="form.ciqPaymentName" placeholder="请输入国检名称" :disabled="formEdit"></el-input> 
    </el-form-item> 
    <el-form-item label="国检编码" prop="ciqPaymentCode"> 
     <el-input v-model="form.ciqPaymentCode" placeholder="请输入国检编码" :disabled="formEdit"></el-input> 
    </el-form-item>  -->
   </el-form> 
   <div slot="footer" class="dialog-footer"> 
    <el-button type="primary" @click="change" v-if="updateView" class="mt">
     修改
    </el-button> 
    <el-button type="primary" @click="update('form')" v-else class="mt">
     保存
    </el-button> 
   </div> 
  </div>
</template>

<script>
import { addObj, putObj } from "api/baseDataSys/bdPayment/index";
import { mapGetters } from "vuex";
export default {
  name: "bdPayment",
  data() {
    return {
      form: {
        indx: undefined,
        qstCode: undefined,
        // outCode: undefined,
        cusPaymentName: undefined,
        cusPaymentCode: undefined,
        // ciqPaymentName: undefined,
        // ciqPaymentCode: undefined,
        copName: undefined,
        // copCode: undefined,
        // dxpId: undefined
      },
      rules: {
        // qstCode: [
        //   {
        //     required: true,
        //     message: "请输入全速通编码",
        //     trigger: "blur"
        //   }
        // ],
        // outCode: [
        //   {
        //     required: true,
        //     message: "请输入第三方编码",
        //     trigger: "blur"
        //   }
        // ],
        cusPaymentName: [
          {
            required: true,
            message: "请输入海关名称",
            trigger: "blur"
          }
        ],
        cusPaymentCode: [
          {
            required: true,
            message: "请输入海关编码",
            trigger: "blur"
          }
        ],
        // ciqPaymentName: [
        //   {
        //     required: true,
        //     message: "请输入国检名称",
        //     trigger: "blur"
        //   }
        // ],
        // ciqPaymentCode: [
        //   {
        //     required: true,
        //     message: "请输入国检编码",
        //     trigger: "blur"
        //   }
        // ],
        copName: [
          {
            required: true,
            message: "请输入支付企业名称",
            trigger: "blur"
          }
        ],
        // copCode: [
        //   {
        //     required: true,
        //     message: "请输入企业传输编码",
        //     trigger: "blur"
        //   }
        // ],
        // dxpId: [
        //   {
        //     required: true,
        //     message: "请输入企业传输ID",
        //     trigger: "blur"
        //   }
        // ]
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
.el-input{
  width:200px;
}
@media screen and (max-width:1632px) {
 .el-form {
  margin-left: -15px;
}
.mt{
  margin-top:-8px ;
}
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
