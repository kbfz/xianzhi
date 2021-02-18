<template>
  <div>
    <h5 v-if="updateView">详情</h5>
    <h5 v-else>编辑</h5>
    <el-form :model="form"
             :rules="rules"
             ref="form"
             class="mb15"
             label-width="152px">
      <span class="xhText">*</span>
      <el-form-item label="客户名称"
                    prop="customerName"
                    style="margin-top: -20px">
        <el-input v-model="form.customerName.label"
                  placeholder="请输入客户名称"
                  disabled></el-input>
        <!-- <el-select placeholder="请选择客户名称"
                   v-model="form.customerName"
                   clearable
                   style="width: 200px"
                   filterable
                   disabled>
          <el-option v-for="item in selectCustom"
                     :key="item.value"
                     :label="item.label"
                     :value="item.label"></el-option>
        </el-select> -->
      </el-form-item>
      <span class="xhText">*</span>
      <el-form-item label="关区名称"
                    style="margin-top: -20px"
                    prop="districtName">
        <el-select placeholder="请选择关区名称"
                   v-model="form.districtName"
                   clearable
                   style="width: 200px"
                   filterable
                   :disabled="formEdit">
          <el-option v-for="item in selectpayment"
                     :key="item.value"
                     :label="item.label"
                     :value="item"></el-option>
        </el-select>
        <div class="el-form-item__error"
             v-if="cbeValue">请选择关区名称</div>
      </el-form-item>
      <span class="xhText l45">*</span>
      <el-form-item label="电商平台名称"
                    prop="platformName"
                    style="margin-top: -20px">
        <el-select v-model="form.platformName"
                   placeholder="请选择电商平台名称"
                   style="width: 200px"
                   filterable
                   :disabled="formEdit"
                   clearable>
          <el-option v-for="item in selectplat"
                     :key="item.value"
                     :label="item.label"
                     :value="item">
          </el-option>
        </el-select>
        <div class="el-form-item__error"
             v-if="platformNameCallback">请选择电商平台名称</div>
      </el-form-item>
      <span class="xhText l48">*</span>
      <el-form-item label="申报身份"
                    prop="cbeName"
                    style="margin-top: -22px">
        <el-select placeholder="请选择申报身份"
                   v-model="form.cbeName"
                   clearable
                   style="width: 200px"
                   filterable
                   :disabled="formEdit">
          <el-option v-for="item in selectCbeName"
                     :key="item.value"
                     :label="item.label"
                     :value="item"></el-option>
        </el-select>
        <div class="el-form-item__error"
             v-if="cbeValue">请选择申报身份</div>
      </el-form-item>
      <span class="xhText l57">*</span>
      <el-form-item label="报关行企业"
                    style="margin-top: -20px"
                    prop="agentName">
        <el-select placeholder="请选择报关行企业"
                   v-model="form.agentName"
                   clearable
                   style="width: 200px"
                   filterable
                   :disabled="formEdit">
          <el-option v-for="item in selectdeclarationName"
                     :key="item.value"
                     :label="item.label"
                     :value="item"></el-option>
        </el-select>
        <div class="el-form-item__error"
             v-if="platValue">请选择报关行企业</div>
      </el-form-item>
      <span class="xhText l98">*</span>
      <el-form-item label="仓库"
                    style="margin-top: -20px"
                    prop="warehouseName">
        <el-select placeholder="请选择仓库"
                   v-model="form.warehouseName"
                   clearable
                   style="width: 200px"
                   filterable
                   :disabled="formEdit">
          <el-option v-for="item in selectstorage"
                     :key="item.value"
                     :label="item.label"
                     :value="item"></el-option>
        </el-select>
        <div class="el-form-item__error"
             v-if="warehouseValue">请选择仓库</div>
      </el-form-item>
      <el-form-item label="关区标识">
        <el-input v-model="form.districtOutCode"
                  placeholder="请输入关区标识"
                  :disabled="formEdit"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button type="primary"
                 @click="change"
                 v-if="updateView"
                 class="mt">
        修改
      </el-button>
      <el-button type="primary"
                 @click="update('form')"
                 v-else
                 class="mt">
        保存
      </el-button>
    </div>
  </div>
</template>

<script>
import {
  putObj,
  customerSelect,
  clarationSelect,
  storageSelect,
  cbeNameSelect,
  paymentSelect,
  platSelect
} from "api/baseDataSys/customer/CustomsDeployment/index";
import { mapGetters } from "vuex";
export default {
  name: "bdPayment",
  data () {
    return {
      form: {
        indx: '',
        customerName: { label: '', value: '' },
        qstCode: "",
        districtCode: "",
        districtName: { label: '', value: '' },
        agentQstCode: "",
        agentName: { label: '', value: '' },
        warehouseName: { label: '', value: '' },
        cbeName: { label: '', value: '' },
        warehouseQstCode: "",
        districtOutCode: '',
        platformName: { label: '', value: '' },
      },
      selectCustom: [],
      selectCbeName: [],
      selectplat: [],
      selectdeclarationName: [],
      selectstorage: [],
      selectpayment: [],
      selectlogistics: [],
      rules: {
        ebusinessQstcode: [
          {
            required: true,
            message: "请输入电商企业全速通编码",
            trigger: "blur"
          }
        ]      },
      formEdit: true,
      updateView: true,
      customerValue: false,
      cbeValue: false,
      platValue: false,
      warehouseValue: false
    };
  },
  created () {
    this.customerName()
    this.cbeNameName()
    this.clarationName()
    this.paymentName()
    this.storageName()
    this.paltName()
  },
  computed: {
    lineHeight () {
      return window.screen.height;
    }
  },
  methods: {
    // 清空表单
    resetFormFields () {
      this.$refs["form"].resetFields();
    },
    // 客户下拉选择
    customerName () {
      customerSelect().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectCustom.push(cutObj)
        }
      });
    },
    // 报关行企业
    clarationName () {
      clarationSelect().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectdeclarationName.push(cutObj)
        }
      });
    },
    // 默认申报身份
    cbeNameName () {
      cbeNameSelect().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectCbeName.push(cutObj)
        }
      });
    },
    // 默认电商平台 
    paltName () {
      platSelect().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectplat.push(cutObj)
        }
      });
    },

    // 仓库
    storageName () {
      storageSelect().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectstorage.push(cutObj)
        }
      });
    },
    // 关区名称
    paymentName () {
      paymentSelect().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectpayment.push(cutObj)
        }
      });
    },
    update (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          let set = this
          let formData = {
            indx: set.form.indx,
            customerName: set.form.customerName.label,
            qstCode: set.form.customerName.value,
            districtCode: set.form.districtName.value,
            districtName: set.form.districtName.label,
            agentQstCode: set.form.agentName.value,
            agentName: set.form.agentName.label,
            warehouseName: set.form.warehouseName.label,
            warehouseQstCode: set.form.warehouseName.value,
            cbeCode: set.form.cbeName.value,
            cbeName: set.form.cbeName.label,
            districtOutCode: set.form.districtOutCode,
            platformName: set.form.platformName.label,
            platformCode: set.form.platformName.value
          }
          if (!formData.districtName && !formData.agentName && !formData.warehouseName) {
            this.cbeValue = true
            this.platValue = true
            this.warehouseValue = true
            return false
          }
          //电商平台判空
          if (!formData.platformName) {
            this.platformNameCallback = true
            return false
          } else {
            this.platformNameCallback = false
          }
          if (!formData.customerName) {
            this.customerValue = true
          } else {
            this.customerValue = false
          }
          if (!formData.districtName) {
            this.cbeValue = true
          } else {
            this.cbeValue = false
          }
          if (!formData.agentName) {
            this.platValue = true
          } else {
            this.platValue = false
          }
          if (!formData.warehouseName) {
            this.warehouseValue = true
          } else {
            this.warehouseValue = false
          }
          if (!formData.customerName || !formData.districtName || !formData.agentName || !formData.warehouseName) {
            return false
          }
          this.$confirm('确定要保存吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {


            putObj(formData.indx, formData).then(res => {
              // 调用父组件的方法， 第一个参数名为调用的方法名，第二个参数为需要传递的参数

              if (res.rel) {
                this.$notify({
                  title: "成功",
                  message: "修改成功",
                  type: "success",
                  duration: 2000
                });
                this.$emit("childMethod", "");
              } else {
                this.$notify({
                  title: "失败",
                  message: "系统异常",
                  type: "error",
                  duration: 2000
                });
              }
            });
          }).catch(() => { })
        } else {
          return false;
        }
      });
    },
    // 点击修改 改变状态，变为编辑模式
    change () {
      if (this.form.indx === '') {
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
  margin-left: 2%;
}
.el-input {
  width: 200px;
}
.xhText {
  display: inline-block;
  position: relative;
  top: 9px;
  left: 76px;
  color: red;
}
.l57 {
  left: 62px;
}
.l45 {
  left: 45px;
}
.l98 {
  left: 104px;
}
.ta6 {
  top: 16px;
}
@media screen and (max-width: 1632px) {
  .el-form {
    margin-left: -20px;
  }
  .mt {
    margin-top: -8px;
  }
}
@media screen and (max-width: 1366px) {
  .el-form {
    margin-left: -20px;
  }
  .el-input,
  .el-select {
    width: 160px;
  }
}
</style>
