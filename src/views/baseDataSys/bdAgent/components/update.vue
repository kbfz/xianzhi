<template>
  <div> 
   <h5 v-if="updateView">详情</h5> 
   <h5 v-else>编辑</h5> 
   <el-form :model="form" :rules="rules" ref="form" label-width="120px"> 
    <!-- <el-form-item label="全速通编码" prop="qstCode">  -->
     <!-- <el-input v-model="form.qstCode" placeholder="请输入全速通编码" disabled ></el-input> 
    </el-form-item> 
    <el-form-item label="第三方编码" prop="outCode"> 
     <el-input v-model="form.outCode" placeholder="请输入第三方编码" :disabled="formEdit" ></el-input> 
    </el-form-item>  -->
     <el-form-item label="报关行名称" prop="copName"> 
     <el-input v-model="form.copName" placeholder="请输入报关行名称" :disabled="formEdit" ></el-input> 
    </el-form-item> 
    <el-form-item label="海关名称" prop="cusAgentName"> 
     <el-input v-model="form.cusAgentName" placeholder="请输入海关名称" :disabled="formEdit" ></el-input> 
    </el-form-item> 
    <el-form-item label="海关编码" prop="cusAgentCode"> 
     <el-input v-model="form.cusAgentCode" placeholder="请输入海关编码" :disabled="formEdit" ></el-input> 
    </el-form-item> 
    <!-- <el-form-item label="报关员姓名" prop="declarantName"> 
     <el-input v-model="form.declarantName" placeholder="请输入报关员姓名" :disabled="formEdit" ></el-input> 
    </el-form-item> 
    <el-form-item label="报关员联系方式" prop="declarantContact"> 
     <el-input v-model="form.declarantContact" placeholder="请输入报关员联系方式" :disabled="formEdit" ></el-input> 
    </el-form-item> 
    <el-form-item label="推送订单Url" prop="url"> 
     <el-input v-model="form.url" placeholder="请输入推送订单Url" :disabled="formEdit" ></el-input> 
    </el-form-item> 
    <el-form-item label="取消订单url" prop="cancelOrderUrl">
      <el-input v-model="form.cancelOrderUrl" placeholder="请输入取消订单url" :disabled="formEdit"></el-input>
    </el-form-item>
    <el-form-item label="appKey" prop="appKey">
      <el-input v-model="form.appKey" placeholder="请输入appKey" :disabled="formEdit"></el-input>
    </el-form-item>
    <el-form-item label="appSecret" prop="appSecret">
      <el-input v-model="form.appSecret" placeholder="请输入appSecret" :disabled="formEdit"></el-input>
    </el-form-item> -->
    <el-form-item label="服务名"> 
     <el-input v-model="form.serviceName" placeholder="请输入服务名" :disabled="formEdit" ></el-input> 
    </el-form-item>

    <!-- <el-form-item label="企业传输编码" prop="copCode"> 
     <el-input v-model="form.copCode" placeholder="请输入企业传输编码" :disabled="formEdit" ></el-input> 
    </el-form-item>
       <el-form-item label="企业传输ID" prop="dxpId"> 
     <el-input v-model="form.dxpId" placeholder="请输入企业传输ID" :disabled="formEdit" ></el-input> 
    </el-form-item> 
     <el-form-item label="仓储企业地址" prop="warehouseAddr"> 
     <el-input v-model="form.warehouseAddr" placeholder="请输入仓储企业地址" :disabled="formEdit" ></el-input> 
    </el-form-item> 
    
    <el-form-item label="国检名称" prop="ciqAgentName"> 
     <el-input v-model="form.ciqAgentName" placeholder="请输入国检名称" :disabled="formEdit" ></el-input> 
    </el-form-item>  -->
    <!-- <el-form-item label="国检编码" prop="ciqAgentCode"> 
     <el-input v-model="form.ciqAgentCode" placeholder="请输入国检编码" :disabled="formEdit" ></el-input> 
    </el-form-item>  -->
    
    <!-- <el-form-item label="关区代码" prop="districtCode">
      <el-input v-model="form.districtCode" placeholder="请输入关区代码" :disabled="formEdit"></el-input>
    </el-form-item>
    <el-form-item label="是否推送" prop="isPush"> 
     <el-radio-group v-model="form.isPush">
      <el-radio class="radio" :label="1" :disabled="formEdit" >是</el-radio>
      <el-radio class="radio" :label="0" :disabled="formEdit" >否</el-radio>
      </el-radio-group>
    </el-form-item>  -->
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
import { addObj, putObj } from "api/baseDataSys/bdAgent/index";
import { mapGetters } from "vuex";
export default {
  name: "bdAgent",
  data() {
    return {
      form: {
        indx: '',
        copName: '',
        cusAgentName: '',
        cusAgentCode: '',
        // declarantName: '',
        // declarantContact: '',
        // url: '',
        // cancelOrderUrl: '',
        // appKey: '',
        // appSecret: '',
        serviceName:''
      },
      rules: {
        // outCode: [
        //   {
        //     required: true,
        //     message: "请输入第三方编码",
        //     trigger: "blur"
        //   }
        // ],
        cusAgentName: [
          {
            required: true,
            message: "请输入海关名称",
            trigger: "blur"
          }
        ],
        cusAgentCode: [
          {
            required: true,
            message: "请输入海关编码",
            trigger: "blur"
          }
        ],
        // ciqAgentName: [
        //   {
        //     required: true,
        //     message: "请输入国检名称",
        //     trigger: "blur"
        //   }
        // ],
        // ciqAgentCode: [
        //   {
        //     required: true,
        //     message: "请输入国检编码",
        //     trigger: "blur"
        //   }
        // ],
        declarantName: [
          {
            required: true,
            message: "请输入报关员姓名",
            trigger: "blur"
          }
        ],
        declarantContact: [
          {
            required: true,
            message: "请输入报关员联系方式",
            trigger: "blur"
          }
        ],
        copName: [
          {
            required: true,
            message: "请输入报关行名称",
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
        url: [
          {
            required: true,
            message: "请输入推送订单Url",
            trigger: "blur"
          }
        ],
         cancelOrderUrl: [
          {
            required: true,
            message: "请输入取消订单Url",
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
            message: "请输入appSecret",
            trigger: "blur"
          }
        ],
        //   districtCode: [
        //   {
        //     required: true,
        //     message: "请输入关区代码",
        //     trigger: "blur"
        //   }
        // ],
        // warehouseAddr: [
        //   {
        //     required: true,
        //     message: "请输入仓储企业地址",
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
          putObj(this.form.indx, this.form).then((res) => {
            // 调用父组件的方法， 第一个参数名为调用的方法名，第二个参数为需要传递的参数
            this.$emit("childMethod", "");
            if(res.rel){
                this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success",
                duration: 2000
                });
             }else{
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
  margin-left: -10px;
}
}
@media screen and (max-width:1366px) {
 .el-form {
  margin-left: -10px;
}
.el-input, .el-select{
  width:160px;
}
}


</style>
