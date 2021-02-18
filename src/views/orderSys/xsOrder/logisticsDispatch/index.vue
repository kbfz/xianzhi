<template>
   <div class="app-container calendar-list-container" id="app-container">
       <div class="app-container-left">
    <div class="filter-container">
      <el-select placeholder="请选择超期天数" v-model="query.timeOutDay" clearable style="width: 200px" filterable popper-class="optionsContent">
          <el-option v-for="item in select.timeDay" :key="item.value" :value="item.value" :label="item.label"></el-option>
      </el-select>
       <el-select placeholder="请选择状态" v-model="query.status" clearable style="width: 200px" filterable popper-class="optionsContent">
          <el-option v-for="item in select.timeStatus" :key="item.value"  :value="item.value" :label="item.label"></el-option>
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
     >
         <el-table-column  
     width="420" 
     align="center" 
     label="运单号"
     show-overflow-tooltip >
      <template scope="scope">
        <span style="cursor: pointer;">{{scope.row.logisticsNo}}</span>
      </template>
    </el-table-column>
     <el-table-column 
        width="420" 
        align="center" 
        label="揽收时间" 
        show-overflow-tooltip
        >
      <template scope="scope">
        <span style="cursor: pointer;">{{scope.row.collectTime}}</span>
      </template>
    </el-table-column>
    <el-table-column 
        width="420" 
        align="center" 
        label="签收时间" 
        show-overflow-tooltip
        >
      <template scope="scope">
        <span style="cursor: pointer;">{{scope.row.endTime}}</span>
      </template>
    </el-table-column>
     <el-table-column width="410" align="center" label="状态" show-overflow-tooltip>
      <template scope="scope">
        <span style="cursor: pointer;" v-if="scope.row.status === '0'">未签收</span>
        <span style="cursor: pointer;" v-if="scope.row.status === '1'">已签收</span>
        
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
       
  </div>
</template>
<script>
import {
  page
} from "api/orderSys/xsOrder/logisticsDispatch/index";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  name: "sellBsorderHead",
  data() {
    return {
      total: 0,
      list: [],
      loading: {
        tableLoading: false
      },
      query: {
      timeOutDay: '',
      status: ''
      },
      listQuery: {
        page: 1,
        limit: 10,
      },
      select: {
        timeDay: [
          {
            value: 1,
            label: '3天'
          },
          {
            value: 2,
            label: '5天'
          },
          {
            value: 3,
            label: '7天'
          },
          {
            value: 4,
            label: '9天'
          }
        ],
        timeStatus: [
           {
            value: 1,
            label: '已签收'
          },
          {
            value: 0,
            label: '未签收'
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight", "name"])
  },
  methods: {
    getList() {
      this.loading.tableLoading = true;
      let param = {
        status: $.trim(this.query.status),
      timeOutDay: this.query.timeOutDay,
        ...this.listQuery
      };
      page(param).then(response => {
        this.loading.tableLoading = false;
        this.list = response.data.rows;
        this.total = response.data.total;
      });
    },
    handleFilter() {
      this.getList();
    },
    handleSizeChange(val) {
   this.getList();
    },
    handleCurrentChange(val) {
      this.getList();
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
.btnSize {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  color: #fff;
  margin: 0;
  padding: 7px 7px;
  border-radius: 4px;
  margin-right: 3px;
  text-align: center;
  margin-left: 4px;
  // float: left;
}
.btnColor {
  background: #fff;
  border: 1px solid #c4c4c4;
  //  color: #1f2d3d;
  background: #c4c4c4;
}
.btnColor2 {
  background: #13ce66;
  border: 1px solid #13ce66;
  color: #fff;
}
.show {
  display: inline-block;
}
.show1 {
  display: inline-block;
}
.show2{
  display: inline-block;
}
.hidden2 {
  display: none;
}
.hidden1 {
  display: none;
}
.hidden {
  display: none;
}
.el-form-item {
  margin-bottom: 22px;
  /* float: left; */
  width: 50%;
  display: inline-block;
  float: left;
}
</style>



