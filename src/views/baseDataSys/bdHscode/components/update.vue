<template>
  <div> 
   <h5 v-if="updateView">详情</h5> 
   <h5 v-else>编辑</h5> 
   <el-form :model="form" :rules="rules" ref="form" label-width="120px"> 
    <el-form-item label="hs编码" prop="hscode"> 
     <el-input v-model="form.hscode" placeholder="请输入hs编码" :disabled="formEdit" ></el-input> 
    </el-form-item> 
    <el-form-item label="hs名称" prop="hsname"> 
     <el-input v-model="form.hsname" placeholder="请输入hs名称" :disabled="formEdit" ></el-input> 
    </el-form-item> 
    <!-- <el-form-item label="第一计量单位" prop="legalunit1"> 
     <el-input v-model="form.legalunit1" placeholder="请输入第一计量单位" :disabled="formEdit" v-if="updateView" style="width:227px"></el-input> 
     <el-select v-model="form.legalunit1" @visible-change="getFirstUnit" v-if="!updateView">
       <el-option
          v-for="item in selects.cusUnit"
          :key="item.code"
          :label="item.name"
          :value="item.code">
        </el-option>
     </el-select>
    </el-form-item> 
    <el-form-item label="第二计量单位" prop="legalunit2">
     <el-input v-model="form.legalunit2" placeholder="请输入第二计量单位" :disabled="formEdit" v-if="updateView" style="width:227px"></el-input> 
     <el-select v-model="form.legalunit2" @visible-change="getFirstUnit" v-if="!updateView">
       <el-option
          v-for="item in selects.cusUnit"
          :key="item.code"
          :label="item.name"
          :value="item.code">
        </el-option>
     </el-select>
    </el-form-item>  -->
    <el-form-item label="消费税率" prop="consumptionvat"> 
     <el-input v-model="form.consumptionvat" placeholder="请输入消费税率" :disabled="formEdit"></el-input> 
    </el-form-item> 
    <el-form-item label="税率" prop="vat"> 
     <el-input v-model="form.vat" placeholder="请输入税率" :disabled="formEdit"></el-input> 
    </el-form-item> 
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
import { addObj, putObj } from "api/baseDataSys/bdHscode/index";
import { getCusUnitData } from "api/baseDataSys/bdCusUnit/index";
import { mapGetters } from "vuex";
import { numberValidator } from 'utils/validate'
export default {
  name: "bdHscode",
  data() {
    return {
      form: {
        indx: undefined,
        hscode: undefined,
        hsname: undefined,
        legalunit1: undefined,
        legalunit2: undefined,
        consumptionvat: undefined,
        vat: undefined
      },
      selects: {
        cusUnit: []
      },
      rules: {
          hscode: [
          {
            required: true,
            message: "请输入hs编码",
            trigger: "blur"
          }
        ],
        hsname: [
          {
            required: true,
            message: "请输入hs名称",
            trigger: "blur"
          }
        ],
        legalunit1: [
          {
            required: true,
            message: "请输入第一计量单位",
            trigger: "blur"
          }
        ],
        legalunit2: [
          {
            required: true,
            message: "请输入第二计量单位",
            trigger: "blur"
          }
        ],
        consumptionvat: [
          {
            required: true,
            message: "请输入消费税率",
            // trigger: "blur"
          },
          {
            validator: numberValidator,
            trigger: "blur"
          }
        ],
        vat: [
          {
            required: true,
            message: "请输入税率",
            // trigger: "blur"
          },
          {
            validator: numberValidator,
            trigger: "blur"
          }
        ]
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
          putObj(this.form.indx, this.form).then((response) => {
            // 调用父组件的方法， 第一个参数名为调用的方法名，第二个参数为需要传递的参数
            if(response.rel){
              this.$emit("childMethod", "");
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success",
                duration: 2000
              });
            }else{
               this.$notify({
                title: "失败",
                message: "修改失败",
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
    },
  // 获取第一计量单位
    getFirstUnit() {
      getCusUnitData().then(res=> {
        if(res.rel){
          this.selects.cusUnit = res.data;
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
.el-input, .el-select{
  width: 200px
}
@media screen and (max-width:1632px) {
 .el-form {
  margin-left: -20px;
}
}
@media screen and (max-width:1366px) {
 .el-form {
  margin-left: -30px;
}
.el-input, .el-select{
  width: 160px
}
}
</style>