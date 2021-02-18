<template>
   <div class="app-container calendar-list-container" id="app-container">
      <el-row>
          <!-- 左边 -->
          <el-col :span="19">
       <div class="app-container-left">
    <div class="filter-container">
       <el-select placeholder="请选择查询方式" v-model="value" @change="dayShow" clearable popper-class="optionsContent">
          <el-option v-for="item in select" :key="item.value" :lable="item.label" :value="item.value"></el-option>
      </el-select>
      <el-date-picker
      type="month"
      placeholder="请选择月份"
      style="width: 200px;" class="filter-item"
      @keyup.enter.native="handleFilter"
      format="yyyy-MM"
      popper-class="timeSelect"
      v-model="query.statisticsDate"
      v-if="monthInput"
      >
    </el-date-picker>
      <el-date-picker
      type="date"
      placeholder="请选择日期"
      style="width: 200px;" class="filter-item"
      @keyup.enter.native="handleFilter"
      format="yyyy-MM-dd"
      popper-class="timeSelect"
      v-model="query.statisticsDate"
      v-if="dayInput"
      >
      </el-date-picker>
    <el-select placeholder="请选择仓库" v-model="query.storageQstcode" clearable style="width: 200px" filterable popper-class="optionsContent">
          <el-option v-for="item in selectCustom" :key="item.key" :lable="item.label" :value="item.label"></el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">查询</el-button>
    </div>
    <el-table 
    :data="list" 
    v-loading="loading.tableLoading"
    element-loading-text="正在加载中......"
    border fit 
    highlight-current-row 
    style="width: 100%" 
    :height="elTableMediaHeight"
    @row-click="orderTotal" >
      <el-table-column 
       align="center"
       type="index"
       label="序号"
       width="260"
       >
    </el-table-column>
        <el-table-column 
        width="270" 
        align="center" 
        label="仓库名称" 
        show-overflow-tooltip
        >
      <template scope="scope">
        <span style="cursor: pointer;">{{scope.row.ext1}}</span>
      </template>
    </el-table-column>
        <el-table-column 
        width="270" 
        align="center" 
        label="统计日期"    
        show-overflow-tooltip 
>
      <template scope="scope">
        <span style="cursor: pointer;">{{scope.row.statisticsDate}}</span>
      </template>
    </el-table-column>
     <el-table-column  
     width="265" 
     align="center" 
     label="仓库接收单量" 
     show-overflow-tooltip>
      <template scope="scope">
        <span style="cursor: pointer;">{{scope.row.stockInAmount}}</span>
      </template>
    </el-table-column>
        <el-table-column 
        width="267" 
        align="center" 
        label="仓库出区单量" 
        show-overflow-tooltip>
      <template scope="scope">
        <span style="cursor: pointer;">{{scope.row.stockOutAmount	}}</span>
      </template>
    </el-table-column>
    </el-table>
    <div  class="pagination-container">
      <el-pagination 
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      :current-page.sync="listQuery.page" 
      :page-sizes="[10,20,30, 50]" 
      :page-size="listQuery.limit" 
      layout="total, sizes, prev, pager, next, jumper" 
      :total="total"> 
    </el-pagination>
    </div>
       </div>
       </el-col>
          <!-- 右边 -->
          <!-- <el-col :span="1">
              <div class="border">
              </div>
          </el-col> -->
          <el-col :span="5">
              <div class="app-container-right" ref="lineHeight">
                  <!-- v-on:childMethod="getList"   在子组件里面调用父组件的getList方法 childMethod是子组件里面参数名 -->
                  <ware-status ref="wareStatus"  v-if="showUpdata"  :tableDataLine="tableDataLine" :dateMonth="dateMonth" :orderProbability="orderProbability"></ware-status>
                  <!-- <order-step ref="orderStep"   v-if="showOrder" :stepData="stepData"></order-step> -->
              </div>
          </el-col>
      </el-row>
  </div>
</template>
<script>
import {
  page,
  orderStatistics,
  selectObj
} from "api/orderSys/xsOrder/bondedOrder/bondedWarehouseReport/index";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  name: "sellBsorderHead",
  components: {
    // 引入编辑的组件
    "ware-status": () => import("./components/wareStatus.vue")
    // 'order-step': () => import('./components/orderStep.vue'),
  },
  data() {
    return {
      monthInput: true,
      dayInput: false,
      showUpdata: true,
      showOrder: false,
      stepData: {
        createStatus: undefined,
        declarationStatus: undefined,
        sendDeclarationStatus: undefined,
        sendWarehouseStatus: undefined,
        stockOutStatus: undefined,
        sendCustomerStatus: undefined,
        createTime: undefined,
        declarationTime: undefined,
        sendDeclarationTime: undefined,
        stockOutTime: undefined,
        sendCustomerTime: undefined
      },
      // 订单数据
      total: 0,
      orderProbability: {
        warehouseRate: 0,
        warehouseStockIn: 0,
        warehouseStockOut: 0
      },
      list: [],
      tableContent: [],
      // total: null,
      loading: {
        tableLoading: false
      },
      query: {
        statisticsDate: "",
        qstCode: "",
        storageQstcode: ""
      },
      listQuery: {
        page: 1,
        limit: 10,
        orderBy: 'statisticsDatedesc'
      },
      tableKey: 0,
      select: [
        {
          label: "月份",
          value: "月份"
        },
        {
          label: "日期",
          value: "日期"
        }
      ],
      value: "月份",
      keyValue: "",
      // 客户选择
      selectCustom: [],
      // 月选择器和日期选择器里面的值
      dateMonth: {
        date: ""
      },
      tableDataLine: {
        statisticsDate: ""
      }
    };
  },
  created() {
    this.getList();
    this.customerName();
    this.timeMonth();
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
  methods: {
    getList() {
      this.loading.tableLoading = true;
      let param = {};
      if (this.value === "月份") {
        param = {
          statisticsDate:
            this.query.createTime === ""
              ? ""
              : dateUtils.format(this.query.statisticsDate, "YYYY-MM"),
          storageQstcode: this.query.storageQstcode.substring(this.query.storageQstcode.indexOf("(")+1, this.query.storageQstcode.indexOf(")")),
          ...this.listQuery
        };
      } else {
        param = {
          statisticsDate:
            this.query.createTime === ""
              ? ""
              : dateUtils.format(this.query.statisticsDate, "YYYY-MM-DD"),
         storageQstcode: this.query.storageQstcode.substring(this.query.storageQstcode.indexOf("(")+1, this.query.storageQstcode.indexOf(")")),
          ...this.listQuery
        };
      }
      page(param).then(response => {
        this.loading.tableLoading = false;
        this.list = response.data.rows;
        this.total = response.data.total;
      });
    },
    handleFilter() {
      this.getList();
      this.monthDate();
      this.$refs.wareStatus.timeShow = true;
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    // 当前月份
    timeMonth() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      var mydate = year.toString() + "-" + month.toString();
      this.dateMonth.date = mydate;
      let param = {
        date: dateUtils.format(mydate, "YYYY-MM"),
        // storageQstcode: this.query.storageQstcode
        storageQstcode: this.query.storageQstcode.substring(this.query.storageQstcode.indexOf("(")+1, this.query.storageQstcode.indexOf(")")),
      };
      orderStatistics(param).then(response => {
        this.orderProbability = response.data;
      });
    },
    // 下拉框选择的时间
    monthDate() {
      let param = {};
      if (this.value === "月份") {
        this.dateMonth.date = dateUtils.format(
          this.query.statisticsDate,
          "YYYY-MM"
        );
        param = {
          date: dateUtils.format(this.query.statisticsDate, "YYYY-MM"),
          //  storageQstcode: this.query.storageQstcode,
          storageQstcode: this.query.storageQstcode.substring(this.query.storageQstcode.indexOf("(")+1, this.query.storageQstcode.indexOf(")")),
        };
      } else {
        this.dateMonth.date = dateUtils.format(
          this.query.statisticsDate,
          "YYYY-MM-DD"
        );
        param = {
          date: dateUtils.format(this.query.statisticsDate, "YYYY-MM-DD"),
          //  storageQstcode: this.query.storageQstcode,
          storageQstcode: this.query.storageQstcode.substring(this.query.storageQstcode.indexOf("(")+1, this.query.storageQstcode.indexOf(")")),
        };
      }
      orderStatistics(param).then(response => {
        this.orderProbability = response.data;
      });
    },
    // 订单统计
    orderTotal(row) {
      let param = { indx: row.indx };
      this.$refs.wareStatus.timeShow = false;
      this.tableDataLine.statisticsDate = dateUtils.format(
        row.statisticsDate,
        "YYYY-MM-DD"
      );
      orderStatistics(param).then(response => {
        this.orderProbability = response.data;
      });
    },
    // 月份 日期 切换
    dayShow(value) {
      if (value === "月份") {
        this.monthInput = true;
        this.dayInput = false;
      }
      if (value === "日期") {
        this.monthInput = false;
        this.dayInput = true;
      }
    },
    // 仓库下拉选择
     customerName() {
      selectObj().then(response => {
        for (var i=0; i< response.data.length; i++) {
          let cutObj = {};
          cutObj.label = '(' + response.data[i].value + ')' + ' ' + response.data[i].key
          cutObj.value = response.data[i].value
          this.selectCustom.push(cutObj)
        } 
      });
    }
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
// 右侧背景颜色
.lineHeight {
  height: 20px;
}
.el-select {
  display: inline-block;
  position: relative;
  width: 150px;
}
.filter-container .filter-item {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 3px;
}
</style>



