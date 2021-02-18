<template>
  <div>
    <h5 v-if="updateView">详情</h5>
    <h5 v-else>编辑</h5>
    <el-form :model="form"
             :rules="rules"
             ref="form"
             label-width="130px">
      <!-- <el-form-item label="全速通编码" prop="qstCode"> 
     <el-input v-model="form.qstCode" placeholder="请输入全速通编码" disabled></el-input> 
    </el-form-item>  -->
      <el-form-item label="客户名称"
                    prop="customerName">
        <el-input v-model="form.customerName"
                  placeholder="请输入客户名称"
                  :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="客户编码"
                    prop="customerCode">
        <el-input v-model="form.customerCode"
                  placeholder="请输入客户编码"
                  :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="电商平台名称"
                    prop="platformName">
        <el-select v-model="form.platformName"
                   placeholder="请选择电商平台名称"
                   style="width: 200px"
                   filterable
                   clearable
                   :disabled="formEdit">
          <el-option v-for="item in selectPlatfrom"
                     :key="item.value"
                     :label="item.label"
                     :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="回调地址"
                    prop="url">
        <el-input v-model="form.url"
                  placeholder="请输入回调地址"
                  :disabled="formEdit"></el-input>
        <p class="zhushi">多个回传地址用英文逗号分隔开</p>
      </el-form-item>
      <!-- <el-form-item label="平台类型"
                    style="margin-top:-30px">
        <el-select v-model="form.platformTypeName"
                   placeholder="请选择平台类型"
                   style="width: 200px"
                   filterable
                   clearable
                   @change="changeValue"
                   :disabled="formEdit">
          <el-option v-for="item in selectTypeName"
                     :key="item.value"
                     :label="item.label"
                     :value="item">
          </el-option>
        </el-select>
      </el-form-item> -->
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
import { addObj, putObj, platSelect } from "api/baseDataSys/ReturnCustomer/index";
import { mapGetters } from "vuex";
export default {
  name: "ReturnCustomer",
  data () {
    return {
      platTypeValue: false,
      form: {
        indx: '',
        customerName: '',
        customerCode: '',
        platformName: { label: '', value: '' },
        platformTypeName: { label: '', value: '' },
        platformCode: '',
        url: '',
      },
      radio: {
        type: 1
      },
      rules: {
        customerCode: [
          {
            required: true,
            message: '请选择客户名称',
            // trigger: 'blur'
            // trigger: "change"
          }
        ],
        platformName: [
          {
            required: true,
            message: '请选择电商平台名称',
            // trigger: 'blur'
          }
        ], url: [
          {
            required: true,
            message: '请输入回调地址',
            trigger: 'blur'
          }
        ]
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
            indx: that.form.indx,
            customerName: that.form.customerName,
            customerCode: that.form.customerCode,
            platformName: that.form.platformName.label,
            platformCode: that.form.platformName.value,
            platformTypeName: that.form.platformTypeName.label,
            platformType: that.form.platformTypeName.value,
            url: that.form.url
          };
          console.log(formDate)
          putObj(formDate.indx, formDate).then((res) => {
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
    },
    changeValue (val) {
      if (val == '') {
        this.form.platformTypeName = { label: '', value: '' }
      } else {
        this.form.platformType = val.value
      }
    },
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
  position: relative;
  top: -1px;
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