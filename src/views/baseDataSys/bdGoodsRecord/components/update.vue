<template>
  <div>
    <h5 v-if="updateView">详情</h5>
    <h5 v-else>编辑</h5>
    <el-form :model="form"
             ref="form"
             label-width="135px"
             :rules="rules">

      <el-form-item label="申报身份"
                    prop="cusCode">
          <el-select placeholder="请选择申报身份"
                           v-model="form.cusCode"
                           clearable
                           style="width: 200px"
                           filterable
                           :disabled="formEdit">
                  <el-option v-for="item in selectCbeName"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
      </el-form-item>
      <el-form-item label="货号"
                    prop="goodsNo">
        <el-input v-model="form.goodsNo"
                  placeholder="请输入货号"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="海关账册备案料号"
                    prop="itemRecordNo">
        <el-input v-model="form.itemRecordNo"
                  placeholder="请输入海关账册备案料号"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="国检备案号">
        <el-input v-model="form.ciqRecordNo"
                  placeholder="请输入国检备案号"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="HS编码"
                    prop="hsCode">
        <el-input v-model="form.hsCode"
                  placeholder="请输入HS编码"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="上架商品名称"
                    prop="shelfGoodsName">
        <el-input v-model="form.shelfGoodsName"
                  placeholder="请输入上架商品名称"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="商品名称"
                    prop="goodsName">
        <el-input v-model="form.goodsName"
                  placeholder="请输入商品名称"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="规格"
                    prop="goodsModel">
        <el-input v-model="form.goodsModel"
                  placeholder="请输入规格"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="条码"
                    prop="barCode">
        <el-input v-model="form.barCode"
                  placeholder="请输入条码"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="价格"
                    prop="price">
        <el-input v-model="form.price"
                  placeholder="请输入价格"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="原产国"
                    prop="originCountry">
        <el-input v-model="form.originCountry"
                  placeholder="请输入原产国"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="单位"
                    prop="unit">
        <el-input v-model="form.unit"
                  placeholder="请输入单位"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="口岸代码"
                    prop="customsCode">
        <el-input v-model="form.customsCode"
                  placeholder="请输入口岸代码"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="毛重" prop="grossWeight">
        <el-input v-model="form.grossWeight"
                  placeholder="请输入毛重"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="净重"
                    prop="netWeight">
        <el-input v-model="form.netWeight"
                  placeholder="请输入净重"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="法定第一数量"
                    prop="qtyRate1">
        <el-input v-model="form.qtyRate1"
                  placeholder="请输入法定第一数量"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="法定第二数量"
                    prop="qtyRate2">
        <el-input v-model="form.qtyRate2"
                  placeholder="请输入法定第二数量"
                  :disabled="formEdit"></el-input>
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
import { addObj, putObj, cbeNameSelect} from "api/baseDataSys/bdGoodsRecord/index";
import { getCusUnitData } from "api/baseDataSys/bdCusUnit/index";
import { getCusMoneyData } from "api/baseDataSys/bdCusMoney/index";
import { mapGetters } from "vuex";
import { numberValidator } from "utils/validate";
var dateUtils = require("silly-datetime");
export default {
  name: "bdGoodsRecord",
  data () {
    let compareWeightAndNetWeight = (rule, value, callback) => {
      if (/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(this.form.grossWeight) && /^[0-9]+([.]{1}[0-9]+){0,1}$/.test(this.form.netWeight) && Number.parseFloat(this.form.grossWeight).toFixed(4) - Number.parseFloat(this.form.netWeight).toFixed(4) > 0) {
        callback()
      } else if (this.form.grossWeight === '' && /^[0-9]+([.]{1}[0-9]+){0,1}$/.test(this.form.netWeight)) {
        callback()
      } else {
        callback(new Error('净重必须小于毛重!'))
      }
    }
    return {
      form: {
        id: '',
        cusName: '',
        cusCode: '',
        goodsNo: '',
        itemRecordNo: '',
        ciqRecordNo: '',
        hsCode: '',
        shelfGoodsName: '',
        goodsName: '',
        goodsModel: '',
        barCode: '',
        price: '',
        originCountry: '',
        unit: '',
        customsCode: '',
        grossWeight: '',
        netWeight: '',
        qtyRate1:'',
        qtyRate2:''
      },
      selects: {
        cusUnit: [],
        cusMoney: []
      },
      rules: {
        cusCode: [
          {
            required: true,
            message: "请选择申报身份",
            trigger: "change"
          }
        ],
        goodsNo: [
          {
            required: true,
            message: "请输入货号",
            trigger: "blur"
          }
        ],
        itemRecordNo: [
          {
            required: true,
            message: "请输入海关账册备案料号",
            trigger: "blur"
          }
        ],
        // ciqRecordNo: [
        //   {
        //     required: true,
        //     message: "请输入国检备案号",
        //   }
        // ],
        hsCode: [
          {
            required: true,
            message: "请输入HS编码",
            trigger: "blur"
          }
        ],
        shelfGoodsName: [
          {
            required: true,
            message: "请输入上架商品名称",
            trigger: "blur"
          }
        ],
        goodsName: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "blur"
          }
        ],
        goodsModel: [
          {
            required: true,
            message: "请输入规格",
            trigger: "blur"
          }
        ],
        barCode: [
          {
            required: true,
            message: "请输入条码",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "请输入价格",
            // trigger: "blur"
          },
          {
            validator: numberValidator,
            // message: "请输入数字",
            // trigger: "blur"
          },
        ],
        originCountry: [
          {
            required: true,
            message: "请输入原产国",
            trigger: "blur"
          }
        ],
        unit: [
          {
            required: true,
            message: "请输入单位",
            trigger: "blur"
          }
        ],
        customsCode: [
          {
            required: true,
            message: "请输入口岸代码",
            trigger: "blur"
          }
        ],
        grossWeight: [
          {
            validator: numberValidator,
            trigger: "blur"
          }],
        netWeight: [
          {
            validator: numberValidator,
            trigger: "blur"
          },
          // {
          //   validator: compareWeightAndNetWeight,
          //   trigger: 'blur'
          // }
        ],
      },
      formEdit: true,
      updateView: true,
      selectCbeName: []
    };
  },
  computed: {
    lineHeight () {
      return window.screen.height;
    }
  },
  created() {
    this.cbeNameName()
  },
  methods: {
    // 清空表单
    resetFormFields () {
      this.$refs["form"].resetFields();
    },
    update (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          // let date = new Date();
          // this.form.updateTime = dateUtils.format(date, "YYYY-MM-DD  HH:mm:ss");
          putObj(this.form.id, this.form).then(res => {
            // 调用父组件的方法， 第一个参数名为调用的方法名，第二个参数为需要传递的参数
            // console.log(this.form.price)
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
            if(res.status !== 200) {
                this.$notify({
                title: "失败",
                message: res.message,
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
    change () {
      if (this.form.id === '') {
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
    },
    // 获取海关计量单位
    getCusUnit () {
      getCusUnitData().then(res => {
        if (res.rel) {
          this.selects.cusUnit = res.data;
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
    // 获取海关币制
    getCusMoney () {
      getCusMoneyData().then(res => {
        if (res.rel) {
          this.selects.cusMoney = res.data;
        }
      });
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
    margin-left: -15px;
  }
}
@media screen and (max-width: 1366px) {
  .el-form {
    margin-left: -15px;
  }
  .el-input,
  .el-select {
    width: 160px;
  }
}
</style>