<template>
  <div class="topDetai" ref="topDetai">
    <div class="table-content" >
      <div class="table-title">快递费：</div>
      <div class="table-msg">
        <div class="models-box">
          <span>首重{{formDetail.customerRuleExpress.firstWeight}}kg，续重{{formDetail.customerRuleExpress.continuedWeight}}kg</span>
          <span
            v-if="isEdit"
            class="editBtn"
            type="text"
            data-mc="expressFee"
            data-title="快递费"
            @click="updateWeight"
          >编辑</span>
        </div>
        <el-table
          :data="formDetail.customerRuleExpressProvinceList"
          highlight-current-row
          class="marginTop"
          :class="{'tabLayout':isList}"
          border
        >
          <el-table-column
            label="首重（元）"
            prop="firstWeightPrice"
            align="center"
            min-width="100px"
          />
          <el-table-column
            label="续重（元）"
            prop="continuedWeightPrice"
            align="center"
            min-width="100px"
          />
          <el-table-column label="适用省份" prop="province" align="center" min-width="200px" />
          <el-table-column v-if="isEdit" label="操作" prop align="center">
            <template scope="scope">
              <el-button type="text">
                <span
                  data-mc="section"
                  data-title="快递费 编辑"
                  @click="payWeight(scope.row, scope.$index)"
                >编辑</span>
              </el-button>
              <el-button
                type="text"
                data-mc="section"
                @click="deleteEvent(scope.row, scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <span
          v-if="isEdit"
          class="editBtn el-icon-plus ml0"
          data-mc="section"
          @click="addWeight"
          data-title="添加区间"
          style="margin-top:14px"
        >添加区间</span>
      </div>
    </div>

    <div class="table-content">
      <div class="table-title">操作费：</div>
      <div class="table-msg">
        <div
          class="models-box"
          v-for="(item,index) in formDetail.customerRuleOperateFeeList"
          :key="item.id"
        >
          <span>单量{{item.firstSign}}{{item.firstValue}}，单量{{item.secondSign}}{{item.secondValue}}，{{item.price}}元/单</span>
          <span
            v-if="isEdit"
            class="editBtn"
            type="text"
            data-mc="handleFee"
            data-title="操作费："
            @click="updateCosts(item,index)"
          >编辑</span>
          <span
            v-if="isEdit"
            class="editBtn"
            type="text"
            data-mc="handleFee"
            data-title="操作费："
            @click="delCosts(item,index)"
          >删除</span>
        </div>
         <span
          v-if="isEdit"
          class="editBtn el-icon-plus ml0"
          data-mc="section"
          @click="addOperate"
          data-title="添加"
          style="margin-top:14px"
        >添加操作费</span>
      </div>
    </div>
    <div class="table-content" style="border-bottom: none">
      <div class="table-title">超额附加费：</div>
      <div class="table-msg">
        <div class="models-box">
          <span>运单商品数小于等于{{formDetail.customerRuleAttachFee.baseCount}}件，0元/件；运单商品数大于{{formDetail.customerRuleAttachFee.baseCount}}件，{{formDetail.customerRuleAttachFee.price}}元/件</span>
          <span
            v-if="isEdit"
            class="editBtn"
            type="text"
            data-mc="joinFee"
            data-title="超额附加费："
            @click="updateAttach"
          >编辑</span>
        </div>
      </div>
    </div>

    <div class="table-content">
      <div class="table-title">包材费：</div>
      <div class="table-msg">
        <el-table :data="formDetail.customerRulePackagingList" highlight-current-row :class="{'tabLayout':isList}" border>
          <el-table-column label="包材编号" prop="packagingCode" align="center" min-width="160px" />
          <el-table-column label="包材" prop="packagingName" align="center" min-width="160px" />
          <el-table-column label="规格" prop="specification" align="center" min-width="160px" />
          <el-table-column label="单价（元）" prop="price" align="center" min-width="100px" />
          <el-table-column v-if="isEdit" label="操作" prop align="center" min-width="120px">
            <template scope="scope">
              <el-button type="text">
                <span data-mc="material" data-title="包材费编辑" @click="editEvent(scope.row,scope.$index)">编辑</span>
              </el-button>
              <el-button type="text" data-mc="material" @click="deleteEvent(scope.row,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <span
          v-if="isEdit"
          class="editBtn el-icon-plus"
          data-mc="material"
          @click="addPacking"
          data-title="添加包材"
          style="margin-top:14px"
        >添加包材</span>
      </div>
    </div>

    <div class="table-content" style="border-bottom: none">
      <div class="table-title">仓储费：</div>
      <div class="table-msg">
        <div class="models-box">
          <span>{{formDetail.customerRuleWarehouseFee.price || "--"}}元/托</span>
          <span
            v-if="isEdit"
            class="editBtn"
            type="text"
            data-mc="storageFee"
            data-title="仓储费："
            @click="editWare"
          >编辑</span>
        </div>
      </div>
    </div>
    <!-- <div slot="footer" class="dialog-footer">
                <el-button v-if="!isEdit" @click="closeRecharge">取 消</el-button>
                <el-button v-else @click="amendComputClose">取 消</el-button>
                <el-button type="primary" v-if="!isEdit" @click="amendComput">修改并重新计算</el-button>
                <el-button type="primary" v-else @click="confirmEvent">确定并重新计算账单</el-button>
    </div>-->
    <!-- 编辑首重 或者 编辑首重续重费用&适用省份 -->
    <el-dialog
      :title="weightText"
      :visible.sync="dialogFormVisible"
      :before-close="closeDialog"
      :modal="false"
      class="receiptWidth600"
    >
           <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="首重" class="marginListAdd">
          <el-input placeholder="首重" style="width:400px" v-model="form.firstWeight"></el-input>
        </el-form-item>
        <!-- <span class="xhText">*</span> -->
        <el-form-item label="续重" class="marginListAdd">
          <el-input v-model="form.continuedWeight" placeholder="请输入数值" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item
          label="适用省份"
          class="marginListAdd"
          v-if="weightText == '编辑首重续重费用&适用省份' || weightText == '添加区间'"
        >
             <el-select v-model="form.province" multiple placeholder="请选择省份" style="width:420px">
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer center">
        <el-button @click="closeDialog">取消</el-button>
        <!-- 首重 -->
        <el-button type="primary" @click="sumbitFrist" v-if="weightText == '编辑首重续重数值'">保存</el-button>
        <!-- 编辑 -->
        <el-button type="primary" @click="updateProvince" v-if="weightText == '编辑首重续重费用&适用省份'">保存</el-button>
        <!-- 新增 -->
        <el-button type="primary" @click="addProvince" v-if="weightText == '添加区间'">保存</el-button>
      </div>
    </el-dialog>
    <!-- 操作费 -->
    <el-dialog
      :title="operateText"
      :visible.sync="dialogFormCosts"
      :before-close="closeCosts"
      :modal="false"
      width="650px"
    >
      <el-form :model="operateFeeFrom">
        <el-form-item label>
          <div class="input_bodyBox">
            <el-row>
              <el-col :span="6">
                <div class="baseItem borderRight">
                  <ul>
                    <li class="title">判断项目</li>
                    <li class="h100">单量</li>
                  </ul>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="baseItem borderRight">
                  <ul>
                    <li class="title">判断内容</li>
                    <li class="h100">
                        <div>
                            <div class="left">
                              <el-radio label=">" v-model="operateFeeFrom.firstSign" style="margin-left: 4px;font-weight: normal;">大于</el-radio>
                            <el-radio label=">=" v-model="operateFeeFrom.firstSign">大于等于</el-radio>
                            <el-radio label="<"  v-model="operateFeeFrom.secondSign">小于</el-radio>
                            <el-radio label="<=" v-model="operateFeeFrom.secondSign">小于等于</el-radio>   
                            </div>
                            
                        <div class="right">
                            <el-input placeholder="请输入数值" v-model="operateFeeFrom.firstValue"></el-input>
                            <el-input placeholder="请输入数值" v-model="operateFeeFrom.secondValue"></el-input>  
                        </div>
                        </div>
                    </li>
                  </ul>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="baseItem">
                  <ul>
                    <li class="title">操作费</li>
                    <li class="h100">
                        <el-input placeholder="操作费" style="width: 95%" v-model="operateFeeFrom.price"></el-input>
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer center">
        <el-button @click="closeCosts">取消</el-button>
        <el-button type="primary" @click="updateAddForm" v-if=" operateText == '编辑操作费'">保存</el-button>
          <el-button type="primary" @click="addAddForm" v-if=" operateText == '添加操作费'">保存</el-button>
      </div>
    </el-dialog>
    <!-- 超额附加费 -->
     <el-dialog
      title="编辑超额附加费"
      :visible.sync="dialogFormAttachFee"
      :before-close="closeAttachFee"
      :modal="false"
      width="650px"
    >
       <el-form :model="attachForm" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="判断项目" class="marginListAdd">
            <span class="goodsNum">运单商品数</span>
        </el-form-item>
        <el-form-item label="基准数" class="marginListAdd">
          <el-input v-model="attachForm.baseCount" placeholder="请输入数值" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item
          label="超额费用"
          class="marginListAdd"
        >
          <el-input  placeholder="超额费用" v-model="attachForm.price" style="width:400px"></el-input>
        </el-form-item>
      </el-form>
        <div slot="footer" class="dialog-footer center">
        <el-button @click="closeAttachFee">取消</el-button>
        <el-button type="primary" @click="saveAttach" >保存</el-button>
      </div>
     </el-dialog>
      <!-- 包材费 -->
      <el-dialog
        :title="materialText"
        :visible.sync="dialogFormMaterial"
        :before-close="closeMaterial"
         :modal="false"
        class="receiptWidth450"
      >
        <el-form :model="formMaterial" :rules="rules" ref="form" label-width="80px">
          <el-form-item label="包材" class="marginListAdd">
            <el-select v-model="formMaterial.materialValue" placeholder="请选择包材" style="width:300px" filterable >
              <el-option
                v-for="(item,index) in packMateria"
                :key="index"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <span class="xhText">*</span> -->
          <el-form-item label="单价" class="marginListAdd">
            <el-input v-model="formMaterial.price" placeholder="单价" style="width:300px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer center">
          <el-button @click="closeMaterial">取消</el-button>
          <el-button type="primary" @click="sumbitMaterial" v-if="materialText == '添加包材费'">保存</el-button>
          <el-button type="primary" @click="updateMaterial" v-else>保存</el-button>
        </div>
      </el-dialog>
      <!-- 编辑仓储费 -->
      <el-dialog
        title="编辑仓储费"
        :visible.sync="dialogFormWare"
        :before-close="closeWare"
         :modal="false"
        class="receiptWidth450"
      >
        <el-form :model="formWare" :rules="rules" ref="form" label-width="80px">
          <el-form-item label="单价" prop="payAccount" class="marginListAdd">
            <el-input
              v-model="formWare.price"
              placeholder="单价"
              style="width:200px;margin-right: 5px"
            ></el-input>
            <span>/托</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer center">
          <el-button @click="closeWare">取消</el-button>
          <el-button type="primary" @click="sumbitWare">保存</el-button>
        </div>
      </el-dialog>
    <div class="model" v-if="dialogFormCosts || dialogFormVisible || dialogFormAttachFee || dialogFormMaterial || dialogFormWare"></div>
  </div>
</template>

<script>
import formArr from "./formArr"; // form的参数
import { getActiveObj} from "@/api/financialSys/customerBill";
import {
  packSelect
} from "@/api/financialSys/chargingStandard";
export default {
  props: {
    title: {
      type: String,
      default: "计算当前账单的收费标准如下:",
    },
    formActive: {
      type: Object,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    formDetail: {
      type: Object,
    },
  },
  data() {
    return {
      isShowSelectDialog: false,
      dialogFormVisible: false,
      dialogFormCosts: false,
      dialogFormAttachFee:false,
      weightText: "编辑首重续重数值",
      operateText: '编辑操作费',
      materialText: "添加包材费",
      AddFormLists: [],
      foemTitle: "",
      isList: true,
      expressData: [
        {
          // 快递费
          client: "1131",
        },
      ],
       options: ["北京","天津","上海","重庆","河北","山西","陕西","甘肃","青海","辽宁","吉林","黑龙江","江苏","浙江","安徽","福建","江西","山东","河南","湖北","湖南","广东","海南","云南","四川","贵州","广西","宁夏","内蒙古","西藏","新疆"],
      queryForm: {},
      form: {
        index: "",
        province: "",
        continuedWeight: "",
        firstWeight: "",
      },
      formMaterial: {
        index: "",
        materialValue: {
          label: "",
          value: {
            packagingCode: "",
            packagingName: "",
            specification: "",
          },
        },
        price: "",
      },
         formWare: {
        id: "",
        price: "",
        ruleCode: "",
      },
      dialogFormMaterial: false,
      dialogFormWare: false,
      operateFeeFrom:{
          index:'',
          firstSign:'',
          firstValue:'',
          secondSign:'',
          secondValue:'',
          price:''
      },
      attachForm:{
          baseCount:'',
          price:''
      },
      costsList: [
        {
          name: "",
          num: "",
          money: "",
        },
      ],
      packMateria: []
    };
  },
  mounted() {
        let self = this
    this.$refs.topDetai.style.height = window.innerHeight * 0.6 + "px"
    window.onresize = () => {
      self.$refs.topDetai.style.height = window.innerHeight * 0.6 + "px"
    }
  },
  created() {
    // this.getActive();
    this.materiaSelect()
  },
  methods: {
    updateWeight() {
      this.dialogFormVisible = true;
      this.form = {
        continuedWeight: this.formDetail.customerRuleExpress.continuedWeight,
        firstWeight: this.formDetail.customerRuleExpress.firstWeight,
      };
      this.weightText = "编辑首重续重数值";
    },
    // 首重保存
    sumbitFrist() {
      this.formDetail.customerRuleExpress.continuedWeight = this.form.continuedWeight;
      this.formDetail.customerRuleExpress.firstWeight = this.form.firstWeight;
      this.$message({
        message: "保存成功",
        type: "success",
        duration: 2000,
      });
      this.dialogFormVisible = false;
    },
    addWeight() {
      this.dialogFormVisible = true;
      this.form = {
        continuedWeight: "",
        firstWeight: "",
        province: [],
      };
      this.weightText = "添加区间";
    },
    payWeight(row, index) {
      this.dialogFormVisible = true;
      let provinceArr = []
       if(!row.province){
              provinceArr = []
          }else{
             provinceArr = row.province.split('、')
          }
      this.form = {
        index: index,
        continuedWeight: row.continuedWeightPrice,
        firstWeight: row.firstWeightPrice,
        province: provinceArr,
      };
      this.weightText = "编辑首重续重费用&适用省份";
    },
    // 删除
    deleteEvent(row, index) {
      this.formDetail.customerRuleExpressProvinceList.splice(index, 1);
    },
    // 编辑省份
    updateProvince() {
       let province = this.form.province.length ? this.form.province.join('、') : '';
      for (
        var i = 0;
        i < this.formDetail.customerRuleExpressProvinceList.length;
        i++
      ) {
        let item = this.formDetail.customerRuleExpressProvinceList[i];
        if (this.form.index == i) {
          item.continuedWeightPrice = this.form.continuedWeight;
          item.firstWeightPrice = this.form.firstWeight;
          item.province = province;
        }
      }
      this.$message({
        message: "保存成功",
        type: "success",
        duration: 2000,
      });
      this.dialogFormVisible = false;
    },
    // 新增区间
    addProvince() {
       let province = this.form.province.length ? this.form.province.join('、') : '';
      let obj = {
        id: this.form.id,
        continuedWeightPrice: this.form.continuedWeight,
        firstWeightPrice: this.form.firstWeight,
        province: province,
      };
      this.$message({
        message: "保存成功",
        type: "success",
        duration: 2000,
      });
      this.dialogFormVisible = false;
      this.formDetail.customerRuleExpressProvinceList.push(obj);
    },
    //  编辑操作费
    updateCosts(row,index) {
      this.operateFeeFrom = {
          index:index,
          firstSign:row.firstSign,
          firstValue:row.firstValue,
          secondSign:row.secondSign,
          secondValue:row.secondValue,
          price:row.price
      }
      this.operateText = '编辑操作费'
      this.dialogFormCosts = true;
    },
    // 添加操作费
    addOperate(){
       this.operateFeeFrom = {
          index:'',
          firstSign:'',
          firstValue:'',
          secondSign:'',
          secondValue:'',
          price:''
      } 
      this.operateText = '添加操作费'
      this.dialogFormCosts = true;
    },
    delCosts(row, index) {
      this.formDetail.customerRuleOperateFeeList.splice(index, 1);
    },
    updateAddForm() {
         for (
        var i = 0;
        i < this.formDetail.customerRuleOperateFeeList.length;
        i++
      ) {
        let item = this.formDetail.customerRuleOperateFeeList[i];
        if (this.operateFeeFrom.index == i) {
          item.firstSign = this.operateFeeFrom.firstSign,
          item.firstValue = this.operateFeeFrom.firstValue,
          item.secondSign = this.operateFeeFrom.secondSign,
          item.secondValue = this.operateFeeFrom.secondValue,
          item.price = this.operateFeeFrom.price
        }
      }
      this.$message({
        message: "保存成功",
        type: "success",
        duration: 2000,
      });
      this.dialogFormCosts = false; 
    },
    addAddForm(){
        let obj = {
            index:this.operateFeeFrom.dialogFormCosts,
          firstSign:this.operateFeeFrom.firstSign,
          firstValue:this.operateFeeFrom.firstValue,
          secondSign:this.operateFeeFrom.secondSign,
          secondValue:this.operateFeeFrom.secondValue,
          price:this.operateFeeFrom.price
      }
     this.$message({
        message: "保存成功",
        type: "success",
        duration: 2000,
      });
      this.dialogFormCosts = false;
      this.formDetail.customerRuleOperateFeeList.push(obj);
    },
    closeDialog() {
      this.dialogFormVisible = false;
    },
    closeCosts() {
      this.dialogFormCosts = false;
    },
    closeAttachFee(){
        this.dialogFormAttachFee = false;
    },
//    超额附加费
updateAttach() {
    this.attachForm ={
          baseCount:this.formDetail.customerRuleAttachFee.baseCount,
          price:this.formDetail.customerRuleAttachFee.price
      },
     this.dialogFormAttachFee = true
   },
saveAttach(){
     this.formDetail.customerRuleAttachFee.baseCount = this.attachForm.baseCount;
      this.formDetail.customerRuleAttachFee.price = this.attachForm.price;
      this.$message({
        message: "保存成功",
        type: "success",
        duration: 2000,
      });
      this.dialogFormAttachFee = false;
},
// 包材费
  closeMaterial() {
      this.dialogFormMaterial = false;
    },
        // 包材费下拉框
    materiaSelect() {
      let query = {};
      packSelect(query).then((res) => {
        if (res.rel) {
          if (res.data.length > 0) {
            res.data.map((item) => {
              let obj = {
                label: "",
                value: {},
              };
              obj.label =
                item.packagingCode +
                "-" +
                item.packagingName +
                "-" +
                item.specification;
              obj.value.packagingCode = item.packagingCode;
              obj.value.packagingName = item.packagingName;
              obj.value.specification = item.specification;
              this.packMateria.push(obj);
            });
          }
        }
      });
    },
      resetMaterial() {
      this.formMaterial = {
        id: "",
        materialValue: {
          label: "",
          value: {
            packagingCode: "",
            packagingName: "",
            specification: "",
          },
        },
        price: "",
      };
    },
    // 添加包材费
  addPacking() {
    this.resetMaterial();
      this.dialogFormMaterial = true;
      this.materialText = "添加包材费";
  },
   sumbitMaterial() {
      let obj = {
        index: this.formMaterial.index,
        packagingCode: this.formMaterial.materialValue.value.packagingCode,
        packagingName: this.formMaterial.materialValue.value.packagingName,
        price: this.formMaterial.price,
        specification: this.formMaterial.materialValue.value.specification,
      }
      this.$message({
        message: "保存成功",
        type: "success",
        duration: 2000,
      });
      this.dialogFormMaterial = false;
      this.formDetail.customerRulePackagingList.push(obj);
    },
    // 编辑包材费
    editEvent(row,index){
      this.dialogFormMaterial = true;
      this.materialText = "编辑包材费";
          let obj = {};
          for (var i = 0; i < this.packMateria.length; i++) {
            if (row.packagingCode == this.packMateria[i].value.packagingCode) {
              obj = this.packMateria[i];
            }
          }
          let form = {
            index: index,
            materialValue: obj,
            price: row.price,
          };
          this.formMaterial = form;
    },
    // 编辑保存
    updateMaterial() {
           for (
        var i = 0;
        i < this.formDetail.customerRulePackagingList .length;
        i++
      ) {
        let item = this.formDetail.customerRulePackagingList [i];
        if (this.formMaterial.index == i) {
          item.packagingCode = this.formMaterial.materialValue.value.packagingCode,
          item.packagingName = this.formMaterial.materialValue.value.packagingName,
          item.price = this.formMaterial.price,
          item.specification = this.formMaterial.materialValue.value.specification
        }
      }
      this.$message({
        message: "保存成功",
        type: "success",
        duration: 2000,
      });
      this.dialogFormMaterial = false; 
    },
    // 删除
    deleteEvent(row,index){
      this.formDetail.customerRulePackagingList.splice(index, 1);
    },
      // 编辑仓储费
    closeWare() {
      this.dialogFormWare = false;
    },
    // 编辑
    editWare() {
      this.dialogFormWare = true
      this.formWare = {
        price: this.formDetail.customerRuleWarehouseFee.price
      };
    },
    // 编辑保存
     sumbitWare() {
      this.formDetail.customerRuleWarehouseFee.price = this.formWare.price;
      this.$message({
        message: "保存成功",
        type: "success",
        duration: 2000,
      });
      this.dialogFormWare = false;
    },
  },
};
</script>

<style lang='scss' scoped>
.topDetai {
  width: 99%;
  overflow: auto;
  margin: 0 auto;
  padding-bottom: 20px;
}
.table-content {
  width: 100%;
  border-bottom: 1px dashed #afafaf;
  display: flex;
  justify-content: space-between;
  padding: 24px 10px;
  box-sizing: border-box;
  .table-title {
    font-size: 14px;
    font-weight: bold;
    // width: 140px;
  }
  .table-msg {
    width: calc(100% - 100px);
  }
  .models-box {
    font-size: 14px;
    color: #333333;
    margin-bottom: 5px;
  }
}
.marginTop {
  margin-top: 16px;
}
.editBtn {
  margin-left: 10px;
  color: #20a0ff;
  cursor: pointer;
}
.ml0{
    margin-left: 0;
}
.model {
  z-index: 2000 !important;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
}
.baseItem {
  ul {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow: hidden;
    li {
      width: 100%;
      height:33px;
      font-size: 14px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #dfe6ec;
      border-top: 0;
      color: #1f2d3d;
    }
    .h100{
     height:100px;
    line-height: 100px;
    .left{
       float: left;
       width: 49%;
        height: 100px;  
    }
    .right{
        float: left;
        width: 49%;
        height: 100px;
    .el-input{
        float: left;
        width: 100%;
        height: 40px;
       line-height: 60px;
     }
    }
    }
    .title {
      background-color: #eef1f6;
      color: #1f2d3d;
      font-weight: bold;
    }
    .postStyle {
      height: 66px;
      line-height: 66px;
    }
  }
}
.borderRight ul li {
  border-right: none;
}
.el-radio-group {
    font-size: 0;
    width: 50%;
    float: left;
}
.el-radio+.el-radio {
     margin-left: 5px; 
    font-weight: normal;
}
.el-radio {
    color: #1f2d3d;
    cursor: pointer;
    white-space: nowrap;
    /* height: 30px; */
    line-height: 44px;
    height: 30px;
    margin-top: 8px;
    float: left;
}
.goodsNum{
    float: left;
    height: 36px;
    line-height: 36px;
}

</style>