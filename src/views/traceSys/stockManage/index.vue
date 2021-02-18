<template>
  <div class="app-container calendar-list-container"
       id="app-container">
    <div class="app-container-left">
      <div class="filter-container">
        <el-select placeholder="请选择客户名称"
                   v-model="query.customerCode"
                   clearable
                   style="width: 200px"
                   filterable
                   popper-class="optionsContent">
          <el-option v-for="item in selectCustom"
                     :key="item.value"
                     :label="item.label"
                     :value="item.label">
          </el-option>
        </el-select>
        <el-input @keyup.enter.native="handleFilter"
                  style="width: 200px;"
                  class="filter-item"
                  placeholder="请输入商品编码"
                  v-model="query.goodsNo"> </el-input>
        <el-select placeholder="请选择仓库名称"
                   v-model="query.storageQstcode"
                   clearable
                   style="width: 200px"
                   popper-class="optionsContent"
                   filterable>
          <el-option v-for="item in warehouseCustom"
                     :key="item.value"
                     :label="item.label"
                     :value="item.label">
          </el-option>
        </el-select>
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
                :class="{'tabLayout': listClass}"
                :height="elTableMediaHeight">
        <el-table-column label="客户编码"
                         align="center"
                         show-overflow-tooltip
                         min-width="180">
          <template scope="scope">
            <span>{{scope.row.customerName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品编码"
                         align="center"
                         show-overflow-tooltip
                         min-width="150">
          <template scope="scope">
            <span>{{scope.row.goodsNo}}</span>

          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="商品名称"
                         show-overflow-tooltip
                         min-width="180">
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.goodsName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="良次类型"
                         show-overflow-tooltip
                         min-width="130">
          <template scope="scope">
            <span v-if="scope.row.storageType === 1 || scope.row.storageType === 2">良品</span>
            <span v-if="scope.row.storageType === 4">次品</span>
            <span v-if="scope.row.storageType === 6">耗材</span>
          </template>
        </el-table-column>

        <el-table-column align="center"
                         label="商品个数"
                         show-overflow-tooltip
                         min-width="100">
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.totalQuantity}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="冻结个数"
                         show-overflow-tooltip
                         min-width="100">
          <template scope="scope">
            <span>{{scope.row.lockQuantity}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="效期"
                         show-overflow-tooltip
                         min-width="120">
          <template scope="scope">
            <span>{{scope.row.expireDate}}</span>
          </template>
        </el-table-column>
         <el-table-column align="center"
                         label="仓库名称"
                         show-overflow-tooltip
                         min-width="180">
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.storageName}}</span>
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
                       :total="totalNum">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {
  page,
  selectObj,
  bdWarehouseSelectList
} from "api/orderSys/stockManage/index";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  name: "erpOrder",
  data () {
    return {
      selectCustom: [],
      warehouseCustom: [],
      showUpdata: true,
      showOrder: false,
      // 订单数据
      totalNum: 0,
      list: [],
      tableContent: [],
      // totalNum: null,
      loading: {
        tableLoading: false
      },
      query: {
        storageQstcode: '',
        customerCode: '',
        goodsNo: ''
      },
      listQuery: {
        page: 1,
        limit: 10
      },
      tableKey: 0,
      listClass: true
    };
  },
  created () {
    this.getList();
    this.customerName()
    this.bdWarehouseList()
  },

  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
  methods: {
    getList () {
      this.loading.tableLoading = true;
      let param = {
        customerCode: this.query.customerCode.substring(this.query.customerCode.indexOf("(") + 1, this.query.customerCode.indexOf(")")),
        goodsNo: $.trim(this.query.goodsNo),
        storageQstcode: this.query.storageQstcode.substring(this.query.storageQstcode.indexOf("(") + 1, this.query.storageQstcode.indexOf(")")),
        ...this.listQuery
      }
      page(param).then(response => {
        this.loading.tableLoading = false;
        this.list = response.data.rows;
        this.totalNum = response.data.total;
        if (response.data.length > 14) {
          this.listClass = false
        } else {
          this.listClass = true
        }
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
      selectObj().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = '(' + response.data[i].value + ')' + ' ' + response.data[i].key
          cutObj.value = response.data[i].value
          this.selectCustom.push(cutObj)
        }
      });
    },
    // 仓库下拉选择
    bdWarehouseList () {
      bdWarehouseSelectList().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = '(' + response.data[i].value + ')' + ' ' + response.data[i].key
          cutObj.value = response.data[i].value
          this.warehouseCustom.push(cutObj)
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
</style>



