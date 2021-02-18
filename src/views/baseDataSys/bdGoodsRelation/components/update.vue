<template>
  <div>
    <h5 v-if="updateView">详情</h5>
    <h5 v-else>编辑</h5>
    <el-form :model="form"
             :rules="rules"
             ref="form"
             label-width="120px">
      <el-form-item label="客户编码"
                    prop="qstCode">
        <el-select v-model="form.qstCode"
                   placeholder="请选择客户编码"
                   class="filter-item"
                   clearable
                   :disabled="formEdit">
          <el-option v-for="item in select.customer"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="平台商品编码"
                    prop="complexBarcode">
        <el-input v-model="form.complexBarcode"
                  placeholder="请输入平台商品编码"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="平台商品名称"
                    prop="complexName">
        <el-input v-model="form.complexName"
                  placeholder="请输入平台商品名称"
                  :disabled="formEdit"></el-input>
      </el-form-item>
       <el-form-item label="供应商"
                   v-if="updateView" >
        <el-input v-model="form.supplierCode.label"
                  placeholder="请输入供应商"
                  :disabled="formEdit" ></el-input>
      </el-form-item>
      <el-form-item label="供应商" v-if="!updateView">
        <el-select v-model="form.supplierCode.label"
                   placeholder="请选择供应商"
                   class="filter-item"
                   clearable
                   @change="changeValue"
                  >
          <el-option v-for="item in select.supplierSelect"
                     :key="item.value"
                     :label="item.label"
                     :value="item">
          </el-option>
        </el-select>
        <div class="el-form-item__error"
             v-if="textTrue">请选择供应商编码</div>
      </el-form-item>
      <el-form-item label="货号">
        <el-input v-model="form.goodsCode"
                  placeholder="请输入货号"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="商品条形码">
        <el-input v-model="form.barCode"
                  placeholder="请输入商品条形码"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      
      <el-form-item label="HS编码">
        <el-input v-model="form.hsCode"
                  placeholder="请输入HS编码"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="form.goodsName"
                  placeholder="请输入商品名称"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="备案单价">
        <el-input v-model="form.originPrice"
                  placeholder="请输入备案单价"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="数量">
        <el-input v-model="form.count"
                  placeholder="请输入数量"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="商品净重">
        <el-input v-model="form.netWeight"
                  placeholder="请输入商品净重"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="法定第二数量">
        <el-input v-model="form.simpleCount"
                  placeholder="请输入法定第二数量"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="数据状态">
        <el-select v-model="form.status"
                   placeholder="数据状态"
                   :disabled="formEdit">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button type="primary"
                 @click="change"
                 v-if="updateView">
        修改
      </el-button>
      <el-button type="primary"
                 @click="update('form')"
                 v-else>
        保存
      </el-button>
    </div>
  </div>
</template>

<script>
import { addObj, putObj, supplierObj, selectObj } from "api/baseDataSys/bdGoodsRelation/index";
import { mapGetters } from "vuex";
export default {
  name: "bdGoodsRelation",
  data () {
    return {
      form: {
        id: null,
        qstCode: null,
        complexBarcode: null,
        complexName: null,
        supplierCode: {
          label: '',
          value: ''
        },
        supplierName: '',
        goodsCode:null,
        barCode: null,
        originPrice: null,
        hsCode: null,
        goodsName: null,
        count: null,
        netWeight: null,
        simpleCount: null,
        inTime: null,
        status: null
      },
      textTrue: false,
      rules: {
        qstCode: [
          {
            required: true,
            message: "请输入客户编码",
            // trigger: "change"
          }
        ],
        complexBarcode: [
          {
            required: true,
            message: "请输入口岸编码",
            trigger: "blur"
          }
        ],
        complexName: [
          {
            required: true,
            message: "请输入客户编码",
            trigger: "blur"
          }
        ],
        supplierCode: [
          {
            required: true,
            message: "请输入供应商编码",
            // trigger: "change"
          }
        ],
      },
      formEdit: true,
      updateView: true,
      show: false,
      options: [
        {
          label: '无效',
          value: 0
        },
        {
          label: '有效',
          value: 1
        }
      ],
      select: {
        customer: [],
        supplierSelect: []
      },
      value: 'QST1876'
    };
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
    // 客户下拉
    customerName () {
      this.select.customer = []
      selectObj().then(response => {
        // this.selectCustom = response.data;
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = '(' + response.data[i].value + ')' + ' ' + response.data[i].key
          cutObj.value = response.data[i].value
          this.select.customer.push(cutObj)
        }
        // console.log(this.selectCustom)
      });
    },
    // 供应商下拉
    supplierCustomer () {
      this.select.supplierSelect = []
      supplierObj().then(response => {
        // this.selectCustom = response.data;
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          // cutObj.label = '(' + response.data[i].value + ')' + ' ' + response.data[i].key
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.select.supplierSelect.push(cutObj)
        }
        // console.log(this.selectCustom)
      });
    },
    update (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          if (this.form.count < 1) {
            this.show = true
            return
          }
          let formData = {
            id: this.form.id,
            qstCode: this.form.qstCode,
            complexBarcode: this.form.complexBarcode,
            complexName: this.form.complexName,
            supplierCode: this.form.supplierCode.value,
            supplierName: this.form.supplierCode.label,
            barCode: this.form.barCode,
            originPrice: this.form.originPrice,
            hsCode: this.form.hsCode,
            goodsName: this.form.goodsName,
            count: this.form.count,
            netWeight: this.form.netWeight,
            simpleCount: this.form.simpleCount,
            inTime: this.form.inTime,
            status: this.form.status,
            goodsCode:this.form.goodsCode,
          }
          if (formData.supplierCode === '' || formData.supplierCode === undefined) {
            this.textTrue = true
            return
          } else {
            this.textTrue = false
          }
          console.log(formData)
          putObj(formData.id, formData).then(() => {
            // 调用父组件的方法， 第一个参数名为调用的方法名，第二个参数为需要传递的参数
            this.$emit("childMethod", "");
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    // 点击修改 改变状态，变为编辑模式
    change () {
      if (this.form.id === null) {
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
      this.customerName()
      this.supplierCustomer()
      //            this.disabledForm = true
    },
    changeValue (val) {
      // console.log(val)
      if (val == '') {
        this.form.supplierCode = { label: '', value: '' }
      } else {
        this.form.supplierName = val.label
      }
    },
    showText () {
      this.show = false
    }
  }
};
</script>
<style scoped>
.el-form {
  margin-left: 4%;
}
.el-input,
.el-select {
  width: 200px;
}
@media screen and (max-width: 1632px) {
  .el-form {
    margin-left: -5px;
  }
}
@media screen and (max-width: 1366px) {
  .el-form {
    margin-left: -5px;
  }
  .el-input,
  .el-select {
    width: 150px;
  }
}
</style>