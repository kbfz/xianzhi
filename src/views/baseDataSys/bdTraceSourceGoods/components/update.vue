<template>
    <html>
 <head></head>
 <body>
  <div> 
   <h5 v-if="updateView">详情</h5> 
   <h5 v-else>编辑</h5> 
   <el-form :model="form" :rules="rules" ref="form" label-width="135px"> 
    <!-- <el-form-item label="海关申报单号" prop="customsDeclarationNumber"> 
     <el-input v-model="form.customsDeclarationNumber" placeholder="请输入海关申报单号" :disabled="formEdit" ></el-input> 
    </el-form-item>  -->
    <!-- <el-form-item label="海关申报时间" prop="customsDeclarationDate"> 
     <el-input v-model="form.customsDeclarationDate" placeholder="请输入海关申报时间" disabled></el-input> 
    </el-form-item>  -->
    <!-- <el-form-item label="国检申报单号" prop="ciqDeclarationNumber"> 
     <el-input v-model="form.ciqDeclarationNumber" placeholder="请输入国检申报单号" :disabled="formEdit" ></el-input> 
    </el-form-item>  -->
    <!-- <el-form-item label="国检申报时间" prop="ciqDeclarationDate"> 
     <el-input v-model="form.ciqDeclarationDate" placeholder="请输入国检申报时间" disabled></el-input> 
    </el-form-item>  -->
    <el-form-item label="商品编码" prop="goodsNo"> 
     <el-input v-model="form.goodsNo" placeholder="请输入商品编码" :disabled="formEdit" ></el-input> 
    </el-form-item> 
    <el-form-item label="商品名称" prop="goodsName"> 
     <el-input v-model="form.goodsName" placeholder="请输入商品名称" :disabled="formEdit"  ></el-input> 
    </el-form-item> 
    <el-form-item label="规格型号" prop="goodsModel"> 
     <el-input v-model="form.goodsModel" placeholder="请输入规格型号" :disabled="formEdit"  ></el-input> 
    </el-form-item> 
    <el-form-item label="数量" prop="goodsNum"> 
     <el-input v-model="form.goodsNum" placeholder="请输入数量" :disabled="formEdit"  ></el-input> 
    </el-form-item> 
    <el-form-item label="原产国" prop="originCountry"> 
     <el-input v-model="form.originCountry" placeholder="请输入原产国" :disabled="formEdit"  ></el-input> 
    </el-form-item> 
    <el-form-item label="起运国" prop="departureCountry"> 
     <el-input v-model="form.departureCountry" placeholder="请输入起运国" :disabled="formEdit"  ></el-input> 
    </el-form-item> 
    <el-form-item label="运输方式" prop="transportation"> 
     <el-input v-model="form.transportation" placeholder="请输入运输方式" :disabled="formEdit"  ></el-input> 
    </el-form-item> 
    <el-form-item label="进口口岸" prop="importPort"> 
     <el-input v-model="form.importPort" placeholder="请输入进口口岸" :disabled="formEdit"  ></el-input> 
    </el-form-item> 
    <el-form-item label="保税仓" prop="bondedWarehouse"> 
     <el-input v-model="form.bondedWarehouse" placeholder="请输入保税仓" :disabled="formEdit"  ></el-input> 
    </el-form-item> 
    <el-form-item label="二维码字符串" prop="twoCodenumber"> 
     <el-input v-model="form.twoCodenumber" placeholder="请输入二维码字符串" :disabled="formEdit"  ></el-input> 
    </el-form-item> 
    <el-form-item label="二维码区间最小值" prop="twoCodenumberMin"> 
     <el-input v-model="form.twoCodenumberMin" placeholder="请输入二维码区间最小值" :disabled="formEdit"  ></el-input> 
    </el-form-item> 
    <el-form-item label="二维码区间最大值" prop="twoCodenumberMax"> 
     <el-input v-model="form.twoCodenumberMax" placeholder="请输入二维码区间最大值" :disabled="formEdit"  ></el-input> 
    </el-form-item>
   </el-form> 
   <div slot="footer" class="dialog-footer"> 
    <el-button type="primary" @click="change" v-if="updateView" class="ml">
     修改
    </el-button> 
    <el-button type="primary" @click="update('form')" v-else class="ml">
     保存
    </el-button> 
   </div> 
  </div>
 </body>
</html>
</template>

<script>
import { addObj, putObj } from "api/baseDataSys/bdTraceSourceGoods/index";
import { mapGetters } from "vuex";
import { numberValidator, parValidator } from "utils/validate"
var dateUtils = require("silly-datetime");
export default {
  name: "bdTraceSourceGoods",
  data() {
    return {
      form: {
        indx: undefined,
        customsDeclarationNumber: undefined,
        customsDeclarationDate: undefined,
        ciqDeclarationNumber: undefined,
        ciqDeclarationDate: undefined,
        goodsNo: undefined,
        goodsName: undefined,
        goodsModel: undefined,
        goodsNum: undefined,
        originCountry: undefined,
        departureCountry: undefined,
        transportation: undefined,
        importPort: undefined,
        bondedWarehouse: undefined,
        twoCodenumber: undefined,
        twoCodenumberMin: undefined,
        twoCodenumberMax: undefined,
        createTime: undefined,
        updateTime: undefined,
        operator: undefined
      },
      rules: {
       customsDeclarationNumber: [
          {
            required: true,
            message: "请输入海关申报单号",
            trigger: "blur"
          }
        ],
        ciqDeclarationNumber: [
          {
            required: true,
            message: "请输入国检申报单号",
            trigger: "blur"
          }
        ],
        goodsNo: [
          {
            required: true,
            message: "请输入商品编码",
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
            message: "请输入规格型号",
            trigger: "blur"
          }
        ],
        goodsNum: [
          {
            required: true,
            message: "请输入数量",
            trigger: "blur"
          }
        ],
        originCountry: [
          {
            required: true,
            message: "请输入原产国",
            trigger: "blur"
          }
        ],
        departureCountry: [
          {
            required: true,
            message: "请输入起运国",
            trigger: "blur"
          }
        ],
        transportation: [
          {
            required: true,
            message: "请输入运输方式",
            trigger: "blur"
          }
        ],
        importPort: [
          {
            required: true,
            message: "请输入进口口岸",
            trigger: "blur"
          }
        ],
        bondedWarehouse: [
          {
            required: true,
            message: "请输入保税仓",
            trigger: "blur"
          }
        ],
        twoCodenumber: [
          {
            required: true,
            message: "请输入二维码字符串",
            // trigger: "blur"
          },{
             validator: numberValidator,
             trigger: 'true'
           },
           {
             validator: parValidator,
             trigger: 'true'
           }
        ],
        twoCodenumberMin: [
          {
            required: true,
            message: "请输入二维码区间最小值",
            // trigger: "blur"
          },{
             validator: numberValidator,
             trigger: 'true'
           },
           {
             validator: parValidator,
             trigger: 'true'
           }
        ],
        twoCodenumberMax: [
          {
            required: true,
            message: "请输入二维码区间最大值",
            // trigger: "blur"
          },{
             validator: numberValidator,
             trigger: 'true'
           },
           {
             validator: parValidator,
             trigger: 'true'
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
          let date = new Date();
          this.form.updateTime = dateUtils.format(date, "YYYY-MM-DD  HH:mm:ss");
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
      //            this.disabledForm = true
    }
  }
};
</script>
<style scoped>
.el-form {
  margin-left: 1.5%;
}
.el-input{
  width: 200px
}
@media screen and (max-width:1632px) {
 .el-form {
  margin-left: -5px;
}
.el-input{
  width: 154px
}
.ml{
  margin-left: 10px;
}
}
@media screen and (max-width:1366px) {
 .el-form {
  margin-left: -5px;
}
.el-input{
  width: 105px
}
}
</style>