<template>
  <div class="app-container calendar-list-container"
       id="app-container">
    <div class="app-container-left">
      <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter"
                  style="width: 260px;"
                  class="filter-item"
                  placeholder="请输入订单号"
                  v-model="query.orderNo"> </el-input>
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
                style="width: 100%"
                :class="{'tabLayout':isList}"
                :height="elTableMediaHeight">
        <el-table-column label="订单号"
                         align="center"
                         show-overflow-tooltip
                         prop="orderNo"
                         min-width="260">
        </el-table-column>
        <el-table-column label="电商平台"
                         align="center"
                         show-overflow-tooltip
                         min-width="150">
          <template scope="scope">
          <span style="cursor: pointer;"
                  v-if="scope.row.popType === 'YZ'">有赞</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.popType === 'KL'">考拉</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.popType === 'PDD'">拼多多</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.popType === 'SN'">苏宁易购</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.popType === 'HQBS'">环球捕手</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.popType === 'YT'">一条</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.popType === 'YO'">宝妈时光</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.popType === 'HZW'">孩子王</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.popType === 'WN'">唯妮</span>
                   <span style="cursor: pointer;"
                  v-if="scope.row.popType === 'HPK'">海拍客</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="店铺名称"
                         show-overflow-tooltip
                         min-width="180">
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.popName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="创建时间"
                         show-overflow-tooltip
                         min-width="180">
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.gmtCreate}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="异常类型"
                         show-overflow-tooltip
                         min-width="150">
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.errorType}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="描述"
                         width="280"
                         class-name="descName">
          <template scope="scope">
            <span style="cursor: pointer; ">{{scope.row.errorDesc}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page"
                       :page-sizes="[10,20,30, 50]"
                       :page-size="listQuery.rows"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalNum">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {
  page
} from "api/orderSys/xsOrder/erpAdapter/erpAbnormalLog/index";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  name: "erpOrder",
  data () {
    return {
      showUpdata: true,
      showOrder: false,
      // 订单数据
      totalNum: 0,
      list: [],
      tableContent: [],
      // total: null,
      loading: {
        tableLoading: false
      },
      query: {
        orderNo: ""
      },
      listQuery: {
        page: 1,
        rows: 10
      },
      tableKey: 0,
      isList: true
    };
  },
  created () {
    if (window.sessionStorage.getItem('tid')) {
      this.query.orderNo = window.sessionStorage.getItem('tid')
      window.sessionStorage.removeItem('tid')
      this.getList();
    }
    this.getList();
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
  methods: {
    getList () {
      this.loading.tableLoading = true;
      let param = {
        orderNo: $.trim(this.query.orderNo),
        page: this.listQuery.page,
        rows: this.listQuery.rows
      }
      page(param).then(response => {
        this.loading.tableLoading = false;
        this.list = response.data;
        this.totalNum = response.totalNum;
        if (response.data.length > 14) {
          this.isList = false
        } else {
          this.isList = true
        }
      });
    },
    handleFilter () {
      this.getList();
    },
    handleSizeChange (val) {
      this.listQuery.rows = val;
      this.getList();
    },
    handleCurrentChange (val) {
      this.listQuery.page = val;
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
// .el-table .descName .cell{
//   height: 50px;
//   overflow-y: auto;
//   text-align: left
// }
</style>



