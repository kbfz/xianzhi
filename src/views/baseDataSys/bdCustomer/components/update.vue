<template>
  <div>
    <h5 v-if="updateView">详情</h5>
    <h5 v-else>编辑</h5>
    <el-form :model="form"
             :rules="rules"
             ref="form"
             label-width="130px">
      <!-- <el-form-item label="全速通编码" prop="qstCode"> 
     <el-input v-model="form.qstCode" placeholder="请输入全速通编码" :disabled="formEdit"></el-input> 
    </el-form-item> 
    <el-form-item label="第三方编码" prop="outCode"> 
     <el-input v-model="form.outCode" placeholder="请输入第三方编码" :disabled="formEdit"></el-input> 
    </el-form-item>  -->
      <el-form-item label="电商平台名称"
                    prop="platformName">
        <el-select v-model="form.platformName"
                   placeholder="请选择电商平台名称"
                   style="width: 200px"
                   filterable
                   clearable
                   :disabled="formEdit"
                   @change="changeValue">
          <el-option v-for="item in selectPlatfrom"
                     :key="item.value"
                     :label="item.label"
                     :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电商平台编码"
                    prop="platformCode">
        <el-input v-model="form.platformName.value"
                  placeholder="请输入电商平台编码"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label="企业传输名称"
                    prop="copName">
        <el-input v-model="form.copName"
                  placeholder="请输入企业传输名称"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="企业传输编码"
                    prop="copCode">
        <el-input v-model="form.copCode"
                  placeholder="请输入企业传输编码"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="海关名称"
                    prop="cusCbeName">
        <el-input v-model="form.cusCbeName"
                  placeholder="请输入海关名称"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="国检名称"
                    prop="ciqCbeName">
        <el-input v-model="form.ciqCbeName"
                  placeholder="请输入国检名称"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="担保金账号"
                    prop="guaranteeNo">
        <el-input v-model="form.guaranteeNo"
                  placeholder="请输入担保金账号"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="企业传输ID"
                    prop="dxpId">
        <el-input v-model="form.dxpId"
                  placeholder="请输入企业传输ID"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="url地址"
                    prop="url">
        <el-input v-model="form.url"
                  placeholder="请输入url地址"
                  :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item label="电商类型"
                    prop="type">
        <el-radio class="radio"
                  v-model="form.type"
                  label="1"
                  :disabled="formEdit">国内</el-radio>
        <el-radio class="radio"
                  v-model="form.type"
                  label="2"
                  :disabled="formEdit">跨境</el-radio>
      </el-form-item>
      <el-form-item label="是否推送"
                    prop="isPush">
        <el-radio-group v-model="form.isPush">
          <el-radio class="radio"
                    :label="1"
                    :disabled="formEdit"
                    style="margin-right: 20px">是</el-radio>
          <el-radio class="radio"
                    :label="0"
                    :disabled="formEdit">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否开启oms服务"
                    prop="omsService">
        <el-radio-group v-model="form.omsService">
          <el-radio class="radio"
                    :label="1"
                    :disabled="formEdit"
                    style="margin-right: 20px">是</el-radio>
          <el-radio class="radio"
                    :label="0"
                    :disabled="formEdit">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否开启wms服务"
                    prop="wmsService">
        <el-radio-group v-model="form.wmsService">
          <el-radio class="radio"
                    :label="1"
                    :disabled="formEdit"
                    style="margin-right: 20px">是</el-radio>
          <el-radio class="radio"
                    :label="0"
                    :disabled="formEdit">否</el-radio>
        </el-radio-group>
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
import { addObj, putObj, selectObj } from "api/baseDataSys/bdCustomer/index";
import { mapGetters } from "vuex";
export default {
  name: "bdCustomer",
  data () {
    return {
      form: {
        indx: '',
        qstCode: '',
        outCode: '',
        cusCbeName: '',
        cusCbeCode: '',
        ciqCbeName: '',
        ciqCbeCode: '',
        platformName: { label: '', value: '' },
        platformCode: '',
        guaranteeNo: '',
        copName: '',
        copCode: '',
        type: '1',
        dxpId: '',
        url: '',
        isPush: '1',
        omsService: '1',
        wmsService: '1'
      },
      radio: {
        type: 1
      },
      rules: {
        qstCode: [
          {
            required: true,
            message: '请输入全速通编码',
            trigger: 'blur'
          }
        ],
        outCode: [
          {
            required: true,
            message: '请输入第三方编码',
            trigger: 'blur'
          }
        ], cusCbeName: [
          {
            required: true,
            message: '请输入海关名称',
            trigger: 'blur'
          }
        ], cusCbeCode: [
          {
            required: true,
            message: '请输入海关编码',
            trigger: 'blur'
          }
        ], ciqCbeName: [
          {
            required: true,
            message: '请输入国检名称',
            trigger: 'blur'
          }
        ], ciqCbeCode: [
          {
            required: true,
            message: '请输入国检编码',
            trigger: 'blur'
          }
        ], platformName: [
          {
            required: true,
            message: '请输入电商平台名称',
            // trigger: 'change'
          }
        ], platformCode: [
          {
            required: true,
            message: '请输入电商平台编码',
            trigger: 'blur'
          }
        ], guaranteeNo: [
          {
            required: true,
            message: '请输入担保金账号',
            trigger: 'blur'
          }
        ], copName: [
          {
            required: true,
            message: '请输入企业传输名称',
            trigger: 'blur'
          }
        ], copCode: [
          {
            required: true,
            message: '请输入企业传输编码',
            trigger: 'blur'
          }
        ], type: [
          {
            required: true,
            message: '请输入电商类型',
            trigger: 'blur'
          }
        ], dxpId: [
          {
            required: true,
            message: '请输入企业传输ID',
            trigger: 'blur'
          }
        ], url: [
          {
            required: true,
            message: '请输入url地址',
            trigger: 'blur'
          }
        ]
      },
      formEdit: true,
      updateView: true,
      selectPlatfrom: []
    };
  },
  computed: {
    lineHeight () {
      return window.screen.height;
    }
  },
  created () {
    this.platSelect()
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
          let formData = {
             indx: this.form.indx,
              qstCode: this.form.qstCode,
              outCode: this.form.outCode,
              cusCbeName: this.form.cusCbeName,
              cusCbeCode: this.form.cusCbeCode,
              ciqCbeName: this.form.ciqCbeName,
              ciqCbeCode: this.form.ciqCbeCode,
              platformName: this.form.platformName.label,
              platformCode: this.form.platformName.value,
              guaranteeNo: this.form.guaranteeNo,
              copName: this.form.copName,
              copCode: this.form.copCode,
              type: this.form.type,
              dxpId: this.form.dxpId,
              url: this.form.url,
              isPush: this.form.isPush,
              omsService: this.form.omsService,
              wmsService: this.form.wmsService
            }
          putObj(formData.indx,formData).then((res) => {
            // 调用父组件的方法， 第一个参数名为调用的方法名，第二个参数为需要传递的参数
            this.$emit("childMethod", "");
            if (res.rel) {
              this.$notify({
                title: "成功",
                message: "创建成功",
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
      if (this.form.indx === undefined || this.form.indx === '') {
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
    // 电商平台下拉框
    platSelect () {
      let param = {}
      selectObj(param).then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].platformName
          cutObj.value = response.data[i].platformCode
          this.selectPlatfrom.push(cutObj)
        }
      })
    },
    changeValue (val) {
      // console.log(val)
      if (val == '') {
        this.form.platformName = { label: '', value: '' }
      } else {
        this.form.platformCode = val.value
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