<template>
  <div class="app-container calendar-list-container"
       id="app-container">
    <div class="app-container-left">
      <div class="filter-container">
        <el-select placeholder="请选择客户名称"
                   v-model="query.customerCode"
                   clearable
                   popper-class="optionsContent"
                   style="width: 200px"
                   filterable
                   @keyup.enter.native="handleFilter">
          <el-option v-for="item in selectCustom"
                     :key="item.value"
                     :lable="item.label"
                     :value="item.label"></el-option>
        </el-select>
        <el-input @keyup.enter.native="handleFilter"
                  style="width: 200px;"
                  class="filter-item"
                  placeholder="请输入订单号"
                  clearable
                  v-model="query.orderNo"> </el-input>
        <el-input @keyup.enter.native="handleFilter"
                  style="width: 200px;"
                  class="filter-item"
                  placeholder="请输入唯品订单号"
                  clearable
                  v-model="query.odsOrderSn"> </el-input>
        <el-select placeholder="请选择订单状态"
                   v-model="query.orderStatusCode"
                   popper-class="optionsContent"
                   clearable
                   style="width: 200px"
                   filterable
                   @keyup.enter.native="handleFilter">
          <el-option v-for="item in selectOrder"
                     :key="item.value"
                     :value="item.value"
                     :label="item.label"></el-option>
        </el-select>
        <el-date-picker type="datetimerange"
                        placeholder="请选择入库时间段"
                        style="width: 330px;"
                        class="filter-item"
                        popper-class="timeSelect"
                        @keyup.enter.native="handleFilter"
                        range-separator=" ~ "
                        v-model="query.pushTime">
        </el-date-picker>
        <el-button class="filter-item"
                   type="primary"
                   v-waves
                   icon="search"
                   @click="handleFilter">查询</el-button>
      </div>
      <el-table :data="list"
                v-loading="loading.tableLoading"
                element-loading-text="正在加载中......"
                border
                fit
                highlight-current-row
                style="width: 100%;"
                :height="elTableMediaHeight">
        <el-table-column label="客户名称"
                         align="center"
                         show-overflow-tooltip
                         min-width="150">
          <template scope="scope">
            <span>{{scope.row.customerName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="订单号"
                         show-overflow-tooltip
                         min-width="180">
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.orderNo}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="唯品订单号"
                         show-overflow-tooltip
                         min-width="180">
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.odsOrderSn}}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态"
                         align="center"
                         show-overflow-tooltip
                         min-width="160">
          <template scope="scope">
            <span>{{scope.row.orderStatusName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="入库时间"
                         show-overflow-tooltip
                         min-width="180">
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.pushTime}}</span>
          </template>
        </el-table-column>

      </el-table>
      <div class="pagination-container">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page"
                       :page-sizes="[10,20,30, 50]"
                       :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>

    </div>
  </div>
</template>
<script>
import {
  page,
  OrderStatusSelect,
  customerSelect,
  // addObj
} from "api/orderSys/xsOrder/erpAdapter/vipOrderInquiry/index.js";
import { mapGetters } from "vuex";
// import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  name: "vipOrderInquiry",
  data () {
    return {
      total: 0,
      list: [],
      loading: {
        tableLoading: false
      },
      query: {
        customerCode: "",
        orderNo: '',
        orderStatusCode: '',
        pushTime: '',
        odsOrderSn:''
      },
      listQuery: {
        page: 1,
        limit: 10,
        _type_: "equal",
        orderBy: 'pushTimedesc'
      },
      selectCustom: [],
      selectOrder: [],
    };
  },
  created () {
    this.getList();
    this.customerName()
    this.OrderStatus()
  },

  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
  methods: {
    getList () {
      this.loading.tableLoading = true;
      let param = {
        // customerCode: this.query.customerCode, 
        customerCode: this.query.customerCode.substring(this.query.customerCode.indexOf("(") + 1, this.query.customerCode.indexOf(")")),
        orderNo: this.query.orderNo,
        orderStatusCode: this.query.orderStatusCode,
        pushTime: this.query.pushTime,
        odsOrderSn:this.query.odsOrderSn,
        ...this.listQuery
      };
      if (param.pushTime !== '') {
        var start = param.pushTime[0] === null ? null : dateUtils.format(param.pushTime[0], "YYYY-MM-DD HH:mm:ss")
        var end = param.pushTime[1] === null ? null : dateUtils.format(param.pushTime[1], "YYYY-MM-DD HH:mm:ss")
        param.pushTime = `${start} ~ ${end}`
      }
      if (param.pushTime == 'null ~ null') {
        param.pushTime = ''
      }
      page(param).then(response => {
        this.loading.tableLoading = false;
        this.list = response.data.rows;
        this.total = response.data.total;
      });
    },
    handleFilter () {
      this.getList();
    },
    handleSizeChange (val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange (val) {
      this.listQuery.page = val;
      this.getList();
    },
    // 客户下拉选择
    customerName () {
      customerSelect().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = '(' + response.data[i].value + ')' + ' ' + response.data[i].key
          cutObj.value = response.data[i].value
          this.selectCustom.push(cutObj)
        }
      });
    },
    // 订单状态下拉选择
    OrderStatus () {
      OrderStatusSelect().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectOrder.push(cutObj)
        }
      });
    },
  }
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.el-table {
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  background-color: #fff;
  border: 1px solid #dfe6ec;
  font-size: 14px;
  color: #1f2d3d;
  cursor: pointer;
}
</style>


   
