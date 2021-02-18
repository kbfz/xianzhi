<template>
  <div> 
   <h5 v-if="updateView">详情</h5> 
   <h5 v-else>编辑</h5> 
   <el-form :model="form" :rules="rules" ref="form" label-width="120px"> 
    <el-form-item label="仓库名称" prop="areaWarehouseName"> 
     <el-input v-model="form.areaWarehouseName" placeholder="请输入仓库名称" disabled ></el-input> 
    </el-form-item> 
    <el-form-item label="仓库类型" prop="type"> 
     <!-- <el-input v-model="form.typeDesc" placeholder="请输入仓库类型" :disabled="formEdit"  v-if="formEdit"></el-input>  -->
         <el-select v-model="form.type" placeholder="请选择仓库" :disabled="formEdit"  v-if="formEdit">
            <el-option value="1" label="保税仓"></el-option>
            <el-option value="2" label="普通仓"></el-option>
            <el-option value="3" label="海外仓"></el-option>
          </el-select>
     <el-select v-model="form.type" placeholder="请选择" :disabled="formEdit"  v-if="!formEdit">
            <el-option value="1" label="保税仓"></el-option>
            <el-option value="2" label="普通仓"></el-option>
            <el-option value="3" label="海外仓"></el-option>
          </el-select>
    </el-form-item>
    <el-form-item label="第三方编码" prop="outCode"> 
     <el-input v-model="form.outCode" placeholder="请输入第三方编码" :disabled="formEdit" ></el-input> 
    </el-form-item> 
     <!-- <el-form-item label="账册编码" prop="accountCode"> 
     <el-input v-model="form.accountCode" placeholder="请输入账册编码" :disabled="formEdit" ></el-input> 
    </el-form-item>  -->
    <el-form-item label="url地址" prop="url"> 
     <el-input v-model="form.url" placeholder="请输入url地址" :disabled="formEdit" ></el-input> 
    </el-form-item> 
    <el-form-item label="服务名"> 
     <el-input v-model="form.serviceName" placeholder="请输入服务名" :disabled="formEdit" ></el-input> 
    </el-form-item>

    <!-- <el-form-item label="区内名称" prop="areaWarehouseName"> 
     <el-input v-model="form.areaWarehouseName" placeholder="请输入区内名称" :disabled="formEdit" ></el-input> 
    </el-form-item> 
    <el-form-item label="区内编码" prop="areaWarehouseCode"> 
     <el-input v-model="form.areaWarehouseCode" placeholder="请输入区内编码" :disabled="formEdit" ></el-input> 
    </el-form-item> 
   
    
     <el-form-item label="是否推送" prop="isPush"> 
      <el-radio-group v-model="form.isPush">
        <el-radio class="radio" :label="1" :disabled="formEdit">是</el-radio>
        <el-radio class="radio" :label="0" :disabled="formEdit">否</el-radio>
      </el-radio-group>
    </el-form-item> -->
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
import { addObj, putObj } from "api/baseDataSys/bdWarehouse/index";
import { mapGetters } from "vuex";
export default {
  name: "bdWarehouse",
  data() {
    return {
      form: {
        indx: undefined,
        areaWarehouseName:undefined,
        type: "1",      
        outCode: undefined,       
        // accountCode: undefined,
        url: undefined,
        serviceName:undefined

        // qstCode: undefined,
        // outCode: undefined,
        // areaWarehouseName: undefined,
        // areaWarehouseCode: undefined,
        // accountCode: undefined,
        // isPush: 1,
        // url: undefined,
        // type: '1',
        // typeDesc: '保税仓'
      },
      rules: {
         areaWarehouseName: [
          {
            required: true,
            message: "请输入仓库名称",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请输入仓库类型",
            trigger: "blur"
          }
        ],
        outCode: [
          {
            required: true,
            message: "请输入第三方编码",
            trigger: "blur"
          }
        ],
        // areaWarehouseName: [
        //   {
        //     required: true,
        //     message: "请输入区内名称",
        //     trigger: "blur"
        //   }
        // ],
        // areaWarehouseCode: [
        //   {
        //     required: true,
        //     message: "请输入区内编码",
        //     trigger: "blur"
        //   }
        // ],
        // accountCode: [
        //   {
        //     required: true,
        //     message: "请输入账册编码",
        //     trigger: "blur"
        //   }
        // ],
        url: [
          {
            required: true,
            message: "请输入url地址",
            trigger: "blur"
          }
        ],
        
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
