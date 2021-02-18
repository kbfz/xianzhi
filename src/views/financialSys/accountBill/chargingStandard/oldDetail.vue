<template>
  <div>
    <div class="listDetail">
      <p> 
        <el-select v-model="ruleCode" placeholder="请选择" @change='selectChange'>
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
        </el-select>
        收费标准如下：
      </p>
    </div>
    <div class="tableDetail" ref="tableDetail">
      <!-- 快递费 -->
      <div class="express">
        <div class="left">快递费：</div>
        <div class="right">
          <p>
            <span>首重 {{customerRuleExpress.firstWeight || "--"}} kg,续重{{customerRuleExpress.continuedWeight || "--"}} kg</span>
          </p>
          <el-table
            :key="tableKey"
            :data="customerRuleExpressProvinceList"
            v-loading.body="listLoading"
            border
            fit
            highlight-current-row
            style="width:582px;margin-top: 15px"
          >
            <el-table-column width="140px" align="center" label="首重（元）" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.firstWeightPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column width="140px" align="center" label="续重（元）" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.continuedWeightPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column width="300px" align="center" label="适用省份">
              <template scope="scope">
                <span>{{scope.row.province}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="express">
        <div class="left">操作费：</div>
        <div class="right">
          <p v-for="(item,index) in customerRuleOperateFeeList" :key="index">
            <span>单量 {{item.firstSign}} {{item.firstValue}}单，单量 {{item.secondSign}} {{item.secondValue}}单； {{item.price}}元/单</span>
          </p>
        </div>
      </div>
      <div class="express">
        <div class="left">超额附加费：</div>
        <div class="right">
          <p>
            <span>运单商品数小于等于 {{customerRuleAttachFee.baseCount  || "--"}} 件，0元/件；运单商品数大于 {{customerRuleAttachFee.baseCount || "--"}} 件，{{customerRuleAttachFee.price  || "--"}} 元/件</span>
          </p>
        </div>
      </div>
    <div class="express">
        <div class="left">包材费：</div>
        <div class="right">
          <el-table
            :key="tableKey"
            :data="customerRulePackagingList"
            v-loading.body="listLoading"
            border
            fit
            highlight-current-row
            style="width:583px;margin-top: 15px"
          >
            <el-table-column width="140px" align="center" label="包材编号" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.packagingCode}}</span>
              </template>
            </el-table-column>
            <el-table-column width="140px" align="center" label="包材" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.packagingName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="规格">
              <template scope="scope">
                <span>{{scope.row.specification}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="单价">
              <template scope="scope">
                <span>{{scope.row.price}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="express wareMoney">
        <div class="left">仓储费：</div>
        <div class="right">
          <p>
            <span>{{customerRuleWarehouseFee.price}}元/托</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCustomerRuleByRuleCode } from "@/api/financialSys/chargingStandard";
export default {
  props:['dialogData','options','valueCode','customerRuleAttachFee','customerRuleExpress','customerRuleExpressProvinceList','customerRuleOperateFeeList','customerRuleWarehouseFee','customerRulePackagingList'],
  name: "bdSupplier",
  data() {
    return {
      ruleCode:'',
      listLoading: false,
      listDetail: [],
      tableKey: 0,
    };
  },
  watch: {
    valueCode(val){
       this.ruleCode = ''
    }
  },
  computed: {
    elTableMediaHeight() {
      if (window.screen.height === 1080) {
        return window.screen.height / 2.3;
      }
      if (window.screen.height === 900) {
        return window.screen.height / 2.8;
      }
      if (window.screen.height === 768) {
        return window.screen.height / 2.8 - 25;
      }
    },
  },
    mounted () {
    //   左侧tree的高度自适应
    let self = this
    this.$refs.tableDetail.style.height = window.innerHeight * 0.55 + "px"
    window.onresize = () => {
      self.$refs.tableDetail.style.height = window.innerHeight * 0.55 + "px"
    }
  },
  created() {
  },
  methods: {
    // 
    selectChange(val){
       let params = {
          ruleCode:val
        }
        getCustomerRuleByRuleCode(params).then(res =>{
            this.customerRuleAttachFee = res.data.customerRuleAttachFee || {}
            this.customerRuleExpress = res.data.customerRuleExpress || {}
            this.customerRuleExpressProvinceList = res.data.customerRuleExpressProvinceList
            this.customerRuleOperateFeeList = res.data.customerRuleOperateFeeList
            this.customerRuleWarehouseFee = res.data.customerRuleWarehouseFee || {}
            this.customerRulePackagingList = res.data.customerRulePackagingList
        })
    }
  },
};
</script>
<style scoped>
.topDetai {
  width: 99%;
  overflow: hidden;
  margin: 0 auto;
  padding-bottom: 20px;
}
.leftDetail {
  float: left;
}
.listDetail {
  width: 99%;
  margin: 0 auto;
  border-bottom: 1px solid #eef1f6;
  height: 50px;
}
.listDetail p {
  line-height: 50px;
  padding-left: 16px;
  font-size: 14px;
  margin: 0;
  color: #555;
}
.listDetail ul li span {
  display: block;
  line-height: 27px;
}
.ml30 {
  margin-left: 50px;
}
.boldText {
  font-size: 16px;
  font-weight: bold;
}
.fzText {
  font-size: 14px;
}
.tableDetail {
  width: 99%;
  margin: 0 auto;
  overflow: auto;
  font-size: 14px;
}
.tableDetail .express {
  width: 100%;
  overflow: hidden;
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px dashed #cccccc;
}
.tableDetail .express .left {
  width: 100px;
  float: left;
  overflow: hidden;
  font-weight: bold;
  height: 30px;
  line-height: 30px;
  margin-left: 16px;
}
.tableDetail .express .right {
  margin-left: 100px;
  overflow: hidden;
}
.tableDetail .express .right p {
  margin: 0;
  height: 30px;
  line-height: 30px;
}
.tableDetail .express .right .add {
  margin-top: 5px;
}
.tableDetail .express .right .text1,
.tableDetail .express .right .text2 {
  display: block;
  font-size: 12px;
  color: #9e9e9e;
  text-align: left;
  overflow: hidden;
  line-height: 20px;
  margin-top: 10px;
}
.tableDetail .mb20 {
  border-bottom: none;
}
.mb20 {
  margin-bottom: 15px;
}
.pagination-container {
  margin-top: 20px;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  border: 1px dashed #bfcbd9;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
.warnText {
  display: inline-block;
  margin-top: 18px;
}
.addText {
  display: block;
  font-size: 12px;
  margin-top: 10px;
  color: #999;
}
.xhText {
  position: relative;
  top: 11px;
  left: 73px;
  color: red;
}
.ml45 {
  position: relative;
  top: 16px;
  left: 46px;
}
.input_bodyBox {
  margin-bottom: 10px;
}
.titltstyle {
  /* display: inline-block; */
  float: left;
  width: 80px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}
.iconFont_style {
  display: inline-block;
  font-size: 22px;
  vertical-align: middle;
  margin-left: 8px;
  color: #409eff;
  cursor: pointer;
}
.wareMoney{
  padding-bottom: 0;
  border-bottom: none;
}
</style>

