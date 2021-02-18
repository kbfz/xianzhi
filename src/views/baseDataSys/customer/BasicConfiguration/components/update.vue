<template>
  <div>
    <h5 v-if="updateView">详情</h5>
    <h5 v-else>编辑</h5>
    <el-form :model="form"
             :rules="rules"
             ref="form"
             class="mb15"
             label-width="162px">
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
                     :value="item"></el-option>
        </el-select> -->
      </el-form-item>
      <span class="xhText l48 t16">*</span>
      <el-form-item label="默认电商平台"
                    prop="platformName"
                    style="margin-top: -18px">
        <el-select placeholder="请选择电商平台"
                   v-model="form.platformName"
                   clearable
                   style="width: 200px"
                   filterable
                   :disabled="formEdit">
          <el-option v-for="item in selectplat"
                     :key="item.value"
                     :label="item.label"
                     :value="item"></el-option>
        </el-select>
        <div class="el-form-item__error"
             v-if="platValue">请选择电商平台</div>
      </el-form-item>
      <el-form-item label="物流企业"
                    prop="logisticsName">
        <el-select placeholder="请选择物流企业"
                   v-model="form.logisticsName"
                   clearable
                   style="width: 200px"
                   filterable
                   :disabled="formEdit">
          <el-option v-for="item in selectlogistics"
                     :key="item.value"
                     :label="item.label"
                     :value="item"></el-option>
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="是否代获取物流单号"
                    prop="isLogisticsObtain">
        <el-radio v-model="form.isLogisticsObtain"
                  label="1"
                  :disabled="formEdit"
                  style="margin-left: 25px;margin-right: 40px">是</el-radio>
        <el-radio v-model="form.isLogisticsObtain"
                  label="0"
                  :disabled="formEdit">否</el-radio>
      </el-form-item>
      <el-form-item label="是否代获取支付单号"
                    prop="isPaymentObtain">
        <el-radio v-model="form.isPaymentObtain"
                  label="1"
                  :disabled="formEdit"
                  style="margin-left: 25px;margin-right: 40px">是</el-radio>
        <el-radio v-model="form.isPaymentObtain"
                  label="0"
                  :disabled="formEdit">否</el-radio>
      </el-form-item>
      <el-form-item label="是否全速通推送订单"
                    prop="isOrderPush">
        <el-radio v-model="form.isOrderPush"
                  label="1"
                  :disabled="formEdit"
                  style="margin-left: 25px;margin-right: 40px">是</el-radio>
        <el-radio v-model="form.isOrderPush"
                  label="0"
                  :disabled="formEdit">否</el-radio>
      </el-form-item>-->
      <el-form-item label="推送仓库开关"
                    prop="pushWmsSwitch">
        <el-radio v-model="form.pushWmsSwitch"
                  label="1"
                  :disabled="formEdit"
                  style="margin-left: 25px;margin-right: 40px">开启</el-radio>
        <el-radio v-model="form.pushWmsSwitch"
                  label="0"
                  :disabled="formEdit">不开启</el-radio>
      </el-form-item>
      <el-form-item label="是否截单"
                    prop="isPaymentPush">
        <el-radio v-model="form.isPaymentPush"
                  label="1"
                  :disabled="formEdit"
                  style="margin-left: 25px;margin-right: 40px">截单</el-radio>
        <el-radio v-model="form.isPaymentPush"
                  label="0"
                  :disabled="formEdit">不截单</el-radio>
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
  cbeNameSelect,
  platSelect,
  clarationSelect,
  storageSelect,
  paymentSelect,
  logisticsSelect
} from "api/baseDataSys/customer/basicConfiguration/index";
import { mapGetters } from "vuex";
export default {
  name: "bdPayment",
  data () {
    return {
      form: {
        indx: '',
        customerName: { label: '', value: '' },
        ebusinessQstcode: "",
        cbeCode: "",
        cbeName: { label: '', value: '' },
        platformCode: "",
        platformName: { label: '', value: '' },
        declarationQstcode: "",
        // declarationName: { label: '', value: '' },
        storageQstcode: "",
        // storageName: { label: '', value: '' },
        logisticsName: { label: '', value: '' },
        logisticsQstcode: "",
        // paymentName: { label: '', value: '' },
        paymentQstcode: "",
        // isLogisticsObtain: '0',
        // isOrderPush: '0',
        // isPaymentObtain: '0',
        isPaymentPush: '0',
        pushWmsSwitch: '0',
      },
      selectCustom: [],
      selectCbeName: [],
      selectplat: [],
      selectdeclarationName: [],
      selectstorage: [],
      selectpayment: [],
      selectlogistics: [],
      rules: {
        // isLogisticsObtain: [
        //   {
        //     required: true,
        //     message: "请选择是否代获取物流单号",
        //     trigger: 'change'
        //   }
        // ],
        // isPaymentObtain: [
        //   {
        //     required: true,
        //     message: "请选择是否代获取支付单号",
        //     trigger: 'change'
        //   }
        // ],
        // isOrderPush: [
        //   {
        //     required: true,
        //     message: "请选择是否全速通推送订单",
        //     trigger: 'change'
        //   }
        // ],
        pushWmsSwitch: [
          {
            required: true,
            message: "请选择推送仓库开关",
            trigger: 'change'
          }
        ],
        isPaymentPush: [
          {
            required: true,
            message: "请选择是否截单",
            trigger: 'change'
          }
        ],      },
      formEdit: true,
      updateView: true,
      customerValue: false,
      cbeValue: false,
      platValue: false,
    };
  },
  created () {
    this.customerName()
    this.cbeNameName()
    this.paltName()
    this.clarationName()
    this.logisticsName()
    this.paymentName()
    this.storageName()
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
    // 支付企业
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
    // 物流企业
    logisticsName () {
      logisticsSelect().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectlogistics.push(cutObj)
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
            ebusinessQstcode: set.form.customerName.value,
            platformCode: set.form.platformName.value,
            platformName: set.form.platformName.label,
            logisticsName: set.form.logisticsName.label || '',
            logisticsQstcode: set.form.logisticsName.value || '',
            isPaymentPush: set.form.isPaymentPush,
            pushWmsSwitch: set.form.pushWmsSwitch,
          }
          if (!formData.platformName) {
            this.platValue = true
            return false
          } else {
            this.platValue = false
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
.el-form-item {
  margin-bottom: 20px;
}
.xhText {
  display: inline-block;
  position: relative;
  top: 9px;
  left: 85px;
  color: red;
}
.l48 {
  left: 58px;
  top: 6px;
}
.t16 {
  top: 10px;
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
