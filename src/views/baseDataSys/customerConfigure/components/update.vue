<template>
  <div>
    <h5 v-if="updateView">详情</h5>
    <h5 v-else>编辑</h5>
    <el-form :model="form"
             :rules="rules"
             ref="form"
             label-width="130px">
      <div style="position:relative">
        <span class="xhText">*</span>
        <el-form-item label="客户名称">
          <el-input v-model="form.customerName.label"
                    placeholder="请输入客户名称"
                    disabled></el-input>
        </el-form-item>
      </div>
      <div style="position:relative">
        <span class="xhText">*</span>
        <el-form-item label="平台名称">
          <el-select v-model="form.platformName"
                     placeholder="请选择平台名称"
                     style="width: 200px"
                     filterable
                     clearable
                     :disabled="formEdit"
                     @change="changeValue">
            <el-option v-for="item in selectTypeName"
                       :key="item.value"
                       :label="item.label"
                       :value="item">
            </el-option>
          </el-select>
          <div class="el-form-item__error"
               v-if="platValue">请选择电商平台名称</div>
        </el-form-item>
      </div>
      <div style="position:relative">
        <span class="xhText" style="left:62px">*</span>
        <el-form-item label="店铺ID">
          <el-input v-model="form.shopId"
                    placeholder="请输入店铺ID"
                    :disabled="formEdit"></el-input>
          <div class="el-form-item__error"
               v-if="idValue">请输入店铺ID</div>
        </el-form-item>
      </div>
      <div style="position:relative">
        <span class="xhText">*</span>
        <el-form-item label="店铺名称">
          <el-input v-model="form.shopName"
                    placeholder="请输入店铺名称"
                    :disabled="formEdit"></el-input>
          <div class="el-form-item__error"
               v-if="shopValue">请输入店铺名称</div>
        </el-form-item>
      </div>
      <div style="position:relative">
        <span class="xhText" style="left:57px">*</span>
        <el-form-item label="AppKey">
          <el-input v-model="form.appKey"
                    placeholder="请输入AppKey"
                    :disabled="formEdit"></el-input>
          <div class="el-form-item__error"
               v-if="keyValue">请输入AppKey</div>
        </el-form-item>
      </div>
      <div style="position:relative">
        <span class="xhText" style="left:42px">*</span>
        <el-form-item label="AppSecret">
          <el-input v-model="form.appSecret"
                    placeholder="请输入AppSecret"
                    :disabled="formEdit"></el-input>
          <div class="el-form-item__error"
               v-if="secretValue">请输入AppSecret</div>
        </el-form-item>
      </div>
      <div style="position:relative">
        <span class="xhText" style="left:69px">*</span>
        <el-form-item label="Token">
          <el-input v-model="form.platformToken"
                    placeholder="请输入Token"
                    :disabled="formEdit"></el-input>
          <div class="el-form-item__error"
               v-if="tokenValue">请输入Token</div>
        </el-form-item>
      </div>
      <div style="position:relative">
        <span class="xhText" style="left:80px">*</span>
        <el-form-item label="URL">
          <el-input v-model="form.platformUrl"
                    placeholder="请输入URL"
                    :disabled="formEdit"></el-input>
          <div class="el-form-item__error"
               v-if="urlValue">请输入URL</div>
        </el-form-item>
      </div>
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
import { putObj, platSelect, customerSelect } from "api/baseDataSys/customerConfigure/index";
import { mapGetters } from "vuex";
export default {
  name: "ReturnCustomer",
  data () {
    return {
      platValue: false,
      urlValue: false,
      idValue: false,
      shopValue: false,
      secretValue: false,
      keyValue: false,
      tokenValue: false,
      form: {
        id: '',
        customerName: { label: '', value: '' },
        platformName: { label: '', value: '' },
        platformUrl: '',
        shopId: '',
        shopName: '',
        appKey: '',
        appSecret: '',
        platformToken: ''
      },
      radio: {
        type: 1
      },
      formEdit: true,
      updateView: true,
      selectPlatfrom: [],
      selectTypeName: [
        {
          label: '菜鸟物流',
          value: '01'
        }
      ]
    };
  },
  computed: {
    lineHeight () {
      return window.screen.height;
    }
  },
  created () {
    this.platSelect();
  },
  methods: {
    // 清空表单
    resetFormFields () {
      this.$refs["form"].resetFields();
    },
    update (formName) {
      // console.log(this.form)
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          let that = this
          let formDate = {
            id: that.form.id,
            customerName: that.form.customerName.label,
            qstCode: that.form.customerName.value,
            platformName: that.form.platformName.label,
            platformType: that.form.platformName.value,
            platformUrl: that.form.platformUrl,
            shopId: that.form.shopId,
            shopName: that.form.shopName,
            appKey: that.form.appKey,
            appSecret: that.form.appSecret,
            platformToken: that.form.platformToken
          };
          if ( !formDate.platformName && !formDate.platformUrl && !formDate.shopId && !formDate.shopName && !formDate.appKey && !formDate.appSecret && !formDate.platformToken) {
            this.platValue = true
            this.urlValue = true
            this.idValue = true
            this.shopValue = true
            this.secretValue = true
            this.keyValue = true
            this.tokenValue = true
            return false
          }
          if (!formDate.platformName) {
            this.platValue = true
          } else {
            this.platValue = false
          }
          if (!formDate.shopId) {
            this.idValue = true
          } else {
            this.idValue = false
          }
          if (!formDate.shopName) {
            this.shopValue = true
          } else {
            this.shopValue = false
          }
          if (!formDate.appKey) {
            this.keyValue = true
          } else {
            this.keyValue = false
          }
          if (!formDate.appSecret) {
            this.secretValue = true
          } else {
            this.secretValue = false
          }
          if (!formDate.platformToken) {
            this.tokenValue = true
          } else {
            this.tokenValue = false
          }
          if (!formDate.platformUrl) {
            this.urlValue = true
          } else {
            this.urlValue = false
          }
          if (!formDate.platformName || !formDate.platformUrl || !formDate.shopId || !formDate.shopName || !formDate.appKey || !formDate.appSecret || !formDate.platformToken) {
            return false
          }
          putObj(formDate.id, formDate).then((res) => {
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
            if (res.status !== 200) {
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
    // 客户下拉选择
    customerName () {
      this.selectCustom = []
      customerSelect().then(response => {
        // console.log(response.data)
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          // cutObj.label = '(' + response.data[i].value + ')' + ' ' + response.data[i].key
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectCustom.push(cutObj)
        }
        // console.log(this.selectCustom)
      });
    },
    // 电商平台下拉框
    platSelect () {
      let param = {}
      platSelect(param).then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectPlatfrom.push(cutObj)
        }
      })
    },
    // 点击修改 改变状态，变为编辑模式
    change () {
      if (this.form.id === undefined) {
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
    },
    changeValue (val) {
      if (val == '') {
        this.form.platformName = { label: '', value: '' }
      } else {
        this.form.platformType = val.value
      }
    },
    changeValueCus (val) {
      if (val == '') {
        this.form.customerName = { label: '', value: '' }
      } else {
        this.form.qstCode = val.value
      }
    }
  }
};
</script>
<style scoped>
.el-form {
  margin-left: 4%;
}
.el-input {
  width: 200px;
}
.zhushi {
  font-size: 12px;
  color: #bfcbd9;
  line-height: 1;
}
.xhText {
  /* display: inline-block; */
  position: absolute;
  top: 10px;
  left: 53px;
  color: red;
}
@media screen and (max-width: 1632px) {
  .el-form {
    margin-left: -10px;
  }
  /* .mt{
  margin-top: -8px;
} */
}
@media screen and (max-width: 1366px) {
  .el-form {
    margin-left: -20px;
  }
  .el-input,
  .el-select {
    width: 160px;
  }
  .el-radio + .el-radio {
    margin-left: 6px;
  }
}
</style>