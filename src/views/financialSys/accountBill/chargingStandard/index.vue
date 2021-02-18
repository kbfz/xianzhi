<template>
  <div class="app-container calendar-list-container" id="app-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="24">
        <div class="app-container-left">
          <div class="filter-container">
            <el-select
              v-model="listQuery.customerCode"
              placeholder="请选择客户"
              class="filter-item"
              clearable
              filterable 
              popper-class="optionsContent"
            >
              <el-option
                v-for="item in customerList"
                :key="item.value"
                :label="item.key"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button
              class="filter-item"
              type="primary"
              v-waves
              icon="search"
              @click="handleFilter"
            >查询</el-button>
            <div class="btnMb"></div>
            <el-table
              :key="tableKey"
              :data="list"
              v-loading.body="listLoading"
              border
              fit
              highlight-current-row
              style="width: 100%"
              :height="elTableMediaHeight"
              :class="{'tabLayout':isList}"
            >
              <el-table-column min-width="230px" align="center" label="客户名称" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.customerName}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="150px" align="center" label="客户编号" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.customerCode}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="150px" align="center" label="当前收费标准" show-overflow-tooltip>
                <template scope="scope">
                  <el-button type="text" @click="texDetail(scope.row)">查看</el-button>
                </template>
              </el-table-column>
              <el-table-column min-width="150px" align="center" label="历史收费标准" show-overflow-tooltip>
                <template scope="scope">
                  <el-button type="text" @click="oldDetail(scope.row)">查看</el-button>
                </template>
              </el-table-column>
               <el-table-column min-width="100px" align="center" label="账单服务" show-overflow-tooltip>
                <template scope="scope">
                   <el-switch  v-model="scope.row.status" on-text="" off-text="" @change="changeStatus($event, scope.row)"></el-switch>
                </template>
              </el-table-column>
            </el-table>
            <div v-show="!listLoading" class="pagination-container">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="listQuery.page"
                :page-sizes="[10,20,30, 50]"
                :page-size="listQuery.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </div>
        <!-- 历史账单 -->
          <el-dialog
        title="历史收费标准"
        :visible.sync="dialogFormVisible"
        :before-close="closeWare"
        class="receiptWidth"
      >
          <old-detail 
          :customerRuleAttachFee= 'customerRuleAttachFee'
          :customerRuleExpress= 'customerRuleExpress'
          :customerRuleExpressProvinceList= 'customerRuleExpressProvinceList'
          :customerRuleOperateFeeList= 'customerRuleOperateFeeList'
          :customerRuleWarehouseFee = 'customerRuleWarehouseFee'
           :customerRulePackagingList = 'customerRulePackagingList'
          :options='ruleSelectListOptions'
          :valueCode="valueCode"
          ></old-detail>
      </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  getCustomerRatesList, 
  getCustomerSelectList, 
  getActiveRule, 
  getHistoryRule,  
  getHistoryRuleSelectList,
  getCustomerRuleByRuleCode,
  statusObj
} from "@/api/financialSys/chargingStandard";

import { page } from "api/financialSys/customerConfig/index";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  name: "CustomerData",
  components: {
    // 引入编辑的组件
    "old-detail": () => import("./oldDetail.vue")
  },
  data() {
    return {
      total: 0,
      loading: {
        tableLoading: false,
      },
      valueCode:'',
      customerCode:'', // 客户编号
      list: [],
      listQuery: {
        page: 1,
        limit: 10,
        orderBy: "createTimedesc",
        _type_:"equal",
        customerCode:undefined
      },
      query: {
        cusCbeName: "",
      },
      nameInfo: "",
      customerList:[], // 客户下拉列表
      dialogFormVisible: false,
      rules: {
      },
      historyRule:{}, // 历史账单
      ruleSelectListOptions:[], // 历史收费标准下拉框
      selectStatus: [
        {
          value: 0,
          label: "已生成",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
        },
        {
          value: 1,
          label: "未生成",
        },
      ],
    };
  },
  created() {
    this.getList();
    this.customerNameInfo();
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"]),
  },
  methods: {
    getList() {
      this.listLoading = true;
      getCustomerRatesList(this.listQuery).then((response) => {
        if(response.data.rows.length > 0){
          for(var i=0;i<response.data.rows.length;i++){
            if(response.data.rows[i].status == 0){
              response.data.rows[i].status = false
            } else if (response.data.rows[i].status == 1){
              response.data.rows[i].status = true
              
            }
          }
        }
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.getList();
      // this.orderTotal()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    closeWare(){
      this.dialogFormVisible = false
      this.valueCode = new Date();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    on_page_select(val) {
      this.pageChoose = val;
    },

    // 获取客户信息
    customerNameInfo() {
      let param = {};
      getCustomerSelectList(param).then((response) => {
           this.customerList = response.data
      });
    },
    // 查看当前收费标准
    texDetail(row) {
      let customerCode = row.customerCode
      let customerName = row.customerName
      let self = this;
      self.$router.push({
        path:'/index/financialSys/chargDetail',
        query:{customerCode,customerName}
      });
    },
    // 查看历史收费标准
    oldDetail(row){
     let params = {
       customerCode: row.customerCode
     } 
      getHistoryRule(params).then(res =>{
           if(res.data == undefined || res.data == ''){
             this.customerRuleAttachFee = {}
             this.customerRuleExpress = {}
             this.customerRuleExpressProvinceList = []
             this.customerRuleOperateFeeList = []
             this.customerRulePackagingList = []
             this.customerRuleWarehouseFee = {}
           }else{
             this.customerRuleAttachFee = res.data.customerRuleAttachFee
             this.customerRuleExpress = res.data.customerRuleExpress
             this.customerRuleExpressProvinceList = res.data.customerRuleExpressProvinceList
             this.customerRuleOperateFeeList = res.data.customerRuleOperateFeeList
             this.customerRulePackagingList = res.data.customerRulePackagingList
             this.customerRuleWarehouseFee = res.data.customerRuleWarehouseFee
           }
            this.getHistoryRuleSelectList(params); // 历史收费标准下拉框
            this.dialogFormVisible = true
      }); 
    },
    // 账单服务
    changeStatus($event,row){
      let query = {}
      if($event == true){
       query = {
        id: row.id,
        status: 1 
      }
      } else if($event == false){
        query = {
        id: row.id,
        status: 0 
      }
      }
      statusObj(query).then(res => {
           if (res.rel) {
            this.$message({
              type: "success",
              message: "账单服务更新成功!",
              type: 'success'
            });
            this.getList()
          } else {
            this.$message({
              type: "异常",
              message: res.message,
              type: 'error'
            });
          }
      })
    },
    // 历史收费标准下拉框
    getHistoryRuleSelectList(params){
      getHistoryRuleSelectList(params).then(res =>{
          this.ruleSelectListOptions = res.data
      })
    }
  },
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
// 右侧背景颜色
.lineHeight {
  height: 20px;
}
.btnMb {
  margin-bottom: 5px;
  // float: right;
  margin-right: 15px;
  margin-top: 10px;
  text-align: right;
}
.btnMb button {
  margin-left: 15px;
}
.el-input,
.el-select {
  width: 200px;
}
.dialog-footer {
  text-align: right;
  margin-top: -20px;
}
.btnSize {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  color: #fff;
  margin: 0;
  padding: 6px 14px;
  border-radius: 4px;
  margin-right: 3px;
  text-align: center;
  margin-top: 1px;
  margin-left: 4px;
}
</style>



