<template>
   <div class="app-container calendar-list-container" id="app-container">
      <el-row>
          <!-- 左边 -->
          <el-col :span="19">
       <div class="app-container-left">
    <div class="filter-container">
      <!-- <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入仓库名称" v-model="query.logisticsNo"> </el-input>       -->
      <!-- <el-select v-model="query.stateMonitoring" clearable style="width: 150px" placeholder="请选择仓库作业状态">
         <el-option v-for="item in selectWareHouse" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select> -->
        <el-select placeholder="请选择仓库" v-model="query.storage_qstcode" clearable filterable popper-class="optionsContent">
          <el-option v-for="item in selectCustom" :key="item.key" :lable="item.label" :value="item.label"></el-option>
      </el-select>
         <el-select placeholder="请选择客户名称" v-model="query.ebusiness_qstcode" clearable style="width: 200px" filterable popper-class="optionsContent">
          <el-option v-for="item in selectCustomCode" :key="item.value" :lable="item.label" :value="item.label"></el-option>
      </el-select>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入订单号" v-model="query.orderno"> </el-input>
      <el-date-picker
      type="date"
      placeholder="请选择申报完成日期"
      style="width: 200px;" class="filter-item"
      @keyup.enter.native="handleFilter"
      format="yyyy-MM-dd"
      v-model="query.createTime"
       popper-class="timeSelect"
      >
    </el-date-picker>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">查询</el-button>
      <!-- <el-button class="filter-item" v-if="sellBsorderHeadManager_btn_add" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button> -->
    </div>
    <el-table 
    :data="list" 
    v-loading="loading.tableLoading"
    element-loading-text="正在加载中......"
    border fit 
    highlight-current-row 
    style="width: 100%" 
    :height="elTableMediaHeight"
     @expand="tableClick" >
      <el-table-column 
       align="center" 
       type="expand"
       >
        <template scope="scope">
             <el-table
            border
            style="width: 100%"
            :data="scope.row.children"
            v-loading="loading.tableLoading"
            element-loading-text="正在加载中......"
            id="tableCenter"
            >
      <el-table-column
      label="序号"
      width="70"
      align="center"
      type="index"
      >
      </el-table-column>
    <el-table-column
      label="商品货号"
      width="150"
      align="center"
      show-overflow-tooltip
      prop="goodsSku">
    </el-table-column>
   <el-table-column
      label="商品条码"
      width="157"
      align="center"
      prop="goodsBarCode"
      show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
      label="商品名称"
      width="365"
      align="center"
      show-overflow-tooltip
      prop="goodsName"
    >
    </el-table-column>
     <el-table-column
      label="单价"
      width="140"
      align="center"
      prop="goodsPrice"
      show-overflow-tooltip
  >
    </el-table-column>
     <el-table-column
      label="数量"
       width="100"
      align="center"
      prop="goodsQuantity"
      show-overflow-tooltip
      >
    </el-table-column>
     <el-table-column
      label="总价"
      width="100"
      align="center"
      show-overflow-tooltip>
      <template scope="scope">
         <span>{{scope.row.goodsQuantity * scope.row.goodsPrice}}</span>
      </template>
    </el-table-column>
    </el-table>
  </template>
    </el-table-column>
    <el-table-column 
        width="160px" 
        align="center" 
        label="仓库编码" 
        show-overflow-tooltip
        >
      <template scope="scope">
        <span style="cursor: pointer;">{{scope.row.storage_qstcode}}</span>
      </template>
    </el-table-column>
      <el-table-column 
        width="220px" 
        align="center" 
        label="客户名称" 
        show-overflow-tooltip
        >
      <template scope="scope">
        <span style="cursor: pointer;">{{scope.row.ebusiness_name}}</span>
      </template>
    </el-table-column>
        <el-table-column 
        width="200px" 
        align="center" 
        label="订单号" 
        show-overflow-tooltip
        >
      <template scope="scope">
        <span style="cursor: pointer;">{{scope.row.orderno}}</span>
      </template>
    </el-table-column>
        <el-table-column 
        width="200" 
        align="center" 
        label="物流单号"  
        show-overflow-tooltip 
       >
      <template scope="scope">
        <span style="cursor: pointer;">{{scope.row.logistics_no}}</span>
      </template>
    </el-table-column>
     <el-table-column  
     width="170" 
     align="center" 
     label="接收时间" 
     show-overflow-tooltip>
      <template scope="scope">
        <span style="cursor: pointer;">{{scope.row.create_time}}</span>
      </template>
    </el-table-column>
      <el-table-column  
     width="170" 
     align="center" 
     label="申报完成时间" 
     show-overflow-tooltip>
      <template scope="scope">
        <span style="cursor: pointer;">{{scope.row.declaration_time}}</span>
      </template>
    </el-table-column>
       <!-- <el-table-column  
     width="215" 
     align="center" 
     label="订单入库时间" 
     show-overflow-tooltip>
      <template scope="scope">
        <span style="cursor: pointer;">{{scope.row.send_warehouse_time}}</span>
      </template>
    </el-table-column> -->
           <!-- <el-table-column  
     width="180" 
     align="center" 
     label="订单出库时间" 
     show-overflow-tooltip>
      <template scope="scope">
        <span style="cursor: pointer;">{{scope.row.stock_out_time}}</span>
      </template>
    </el-table-column> -->
          <el-table-column  
     width="150" 
     align="center" 
     label="超时时长(分钟)" 
     show-overflow-tooltip>
      <template scope="scope">
        <span style="cursor: pointer;">{{scope.row.overtime}}</span>
      </template>
    </el-table-column>
     <!-- <el-table-column  
     width="180" 
     align="center" 
     label="订单类型" 
     show-overflow-tooltip>
     <template scope="scope">
        <span style="cursor: pointer; color:#fc7d20" v-if="scope.row.stateMonitoring === 0">仓库作业超时</span>
        <span style="cursor: pointer;" v-if="scope.row.stateMonitoring === 1">正常仓库作业</span>
      </template>
    </el-table-column> -->
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
                  <update-element ref="update"  v-if="showUpdata" :orderNum="orderNum"></update-element>
              </div>
          </el-col>
      </el-row>
  </div>
</template>
<script>
import {
  page,
  detailObj,
  orderStatistics,
  selectObj,
  selectCustomer
} from "api/orderSys/xsOrder/bondedOrder/bondedWarehouse/index";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  name: "sellBsorderHead",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/update.vue")
  },
  data() {
    return {
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
      orderNum: {
        averageTime: 0,
        exceedTime: 0,
        countOrder: 0,
        storageOrder: 0,
        countCustomer: 0,
        storage: ''
      },
      list: [],
      tableContent: [],
      // total: null,
      loading: {
        tableLoading: false
      },
      query: {
        orderno: "",
        createTime: "",
        status: 5,
         stateMonitoring: 0,
        storage_qstcode: '',
        ebusiness_qstcode: ''
      },
      listQuery: {
        page: 1,
        limit: 10,
        // limitTime: 1,
        // orderBy: 'createTimedesc'
      },
      tableKey: 0,
      keyValue: "",
       selectCustom: [],
       selectCustomCode: []
      //  selectWareHouse: [
        //  {
          //  value: 1,
          //  label: '正常仓库作业'
        //  },
        //  {
          //  value: 0,
          //  label: '仓库作业超时'
        //  }
      //  ]
    };
  },
  created() {
    this.getList();
    this.orderTotal();
    this.customerName();
    this.customerCode()
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
  methods: {
    getList() {
      this.loading.tableLoading = true;
      let param = {
        orderno: $.trim(this.query.orderno),
        createTime:
          this.query.createTime === ""
            ? ""
            : dateUtils.format(this.query.createTime, "YYYY-MM-DD"),
        status: 5,
         stateMonitoring: this.query.stateMonitoring,
        storage_qstcode: $.trim(this.query.storage_qstcode),
        ebusiness_qstcode: this.query.ebusiness_qstcode,
        total: this.total,
        ...this.listQuery
      };
      page(param).then(response => {
        // console.log(response.data)
        this.loading.tableLoading = false;
        this.list = response.data.rows;
        this.total = response.data.total;
      });
    },
    handleFilter() {
      this.getList();
      this.orderTotal()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    // 商品明细 _type_: 'equal'精准查询，查询速度快
    tableClick(row, expanded) {
      if (expanded === true) {
        this.loading.tableLoading = true;
        let param = {
          orderUuid: row.order_uuid,
          limit: 100,
          page: 1,
          _type_: "equal"
        };
        detailObj(param).then(response => {
          this.loading.tableLoading = false;
          row.children = response.data.rows;
        });
      }
    },
    // 订单统计
    orderTotal() {
      var time = new Date();
      // console.log(time)
      let param = {
        status: this.query.status,
        createTime:
          this.query.createTime === ""
            ? ""
            : dateUtils.format(this.query.createTime, "YYYY-MM-DD"),
          storage_qstcode: this.query.storage_qstcode,
          orderno: this.query.orderno,
          stateMonitoring: this.query.stateMonitoring
      }
      orderStatistics(param).then(response => {
        // this.orderNum = response.data;
        // console.log(response.data)
        this.$copyJsonProperty(this.orderNum, response.data)
        // console.log(param)
      });
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
    },
            // 客户下拉选择
    customerCode() {
      selectCustomer().then(response => {
        // this.selectCustom = response.data;
        for (var i=0; i< response.data.length; i++) {
          let cutObj = {};
          cutObj.label = '(' + response.data[i].value + ')' + ' ' + response.data[i].key
          cutObj.value = response.data[i].value
          this.selectCustomCode.push(cutObj)
        }
          // console.log(this.selectCustom)
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
// 右侧背景颜色
.lineHeight {
  height: 20px;
}
</style>



