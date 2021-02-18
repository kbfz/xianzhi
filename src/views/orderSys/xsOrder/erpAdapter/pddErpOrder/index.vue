<template>
  <div class="app-container calendar-list-container"
       id="app-container">
    <div class="app-container-left">
      <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter"
                  style="width: 260px;"
                  class="filter-item"
                  placeholder="请输入申报单号或报销单号"
                  clearable
                  v-model="query.orderNo"> </el-input>
        <el-select placeholder="请选择订单状态"
                   v-model="query.pushFlag"
                   clearable
                   style="width: 200px"
                   filterable
                    popper-class="optionsContent">
          <el-option v-for="item in select.status"
                     :key="item.value"
                     :value="item.value"
                     :label="item.label"></el-option>
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
        <!-- <el-table-column align="center"
                         label="订单号"
                         show-overflow-tooltip
                         min-width="260">
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.purchaseOrderNo}}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="订单号"
                         align="center"
                         show-overflow-tooltip
                         min-width="260">
          <template scope="scope">
            <span style="cursor: pointer; color:#20A0FF;display: inline-block;height: 38px;line-height: 38px"
                  @click="homeSearch(scope.row)"
                  v-if="scope.row.pushFlag !== 0">{{scope.row.tid}}</span>
            <span style="cursor: pointer; color:#20A0FF;display: inline-block;height: 38px;line-height: 38px"
                  v-if="scope.row.pushFlag === 0"
                  @click="abnormalSearch(scope.row)">{{scope.row.tid}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="销售单号"
                         show-overflow-tooltip
                         min-width="180">
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.purchaseOrderNo}}</span>
          </template>
        </el-table-column>
        <el-table-column label="电商平台"
                         align="center"
                         show-overflow-tooltip
                         min-width="180">
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
                         label="订单类型"
                         show-overflow-tooltip
                         min-width="150">
          <template scope="scope">
            <span style="cursor: pointer;"
                  v-if="scope.row.purchaseOrderFlag === 1">分销单</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.purchaseOrderFlag === undefined || scope.row.purchaseOrderFlag === 0 || scope.row.purchaseOrderFlag === null || scope.row.purchaseOrderFlag === ''">普通单</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="入库时间"
                         show-overflow-tooltip
                         min-width="180">
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.gmtCreate}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center"
                         label="更新时间"
                         show-overflow-tooltip
                         min-width="180">
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.gmtModified}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="订单状态"
                         show-overflow-tooltip
                         min-width="140">
          <template scope="scope">
            <span style="cursor: pointer;"
                  v-if="scope.row.pushFlag === 0">未推送先知</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.pushFlag === 1">已推送先知</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.pushFlag === 2">订单已取消</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.pushFlag === 3">已完成发货</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="备注"
                         show-overflow-tooltip
                         min-width="100">
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.memo}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="操作"
                         show-overflow-tooltip
                         min-width="140">
          <template scope="scope">
            <div class="btnCancel">
              <el-button type="primary"
                         v-if="scope.row.pushFlag === 0"
                         @click="cancelStatus(scope.row)">
                取消发货
              </el-button>
            </div>

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
  pagePdd,
  cancelOrderPdd
} from "api/orderSys/xsOrder/erpAdapter/erpOrder/index";
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
      // totalNum: null,
      loading: {
        tableLoading: false
      },
      query: {
        orderNo: "",
        pushFlag: 0,
        // logisticsNo: ""
      },
      listQuery: {
        page: 1,
        rows: 10
      },
      select: {
        status: [
          {
            value: 0,
            label: '未推送先知'
          },
          {
            value: 1,
            label: '已推送先知'
          },
          {
            value: 2,
            label: '订单已取消'
          },
          {
            value: 3,
            label: '已完成发货'
          }
        ],
      },
      tableKey: 0,
      listClass: true
    };
  },
  created () {
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
        pushFlag: this.query.pushFlag,
        page: this.listQuery.page,
        rows: this.listQuery.rows
      }
      pagePdd(param).then(response => {
        this.loading.tableLoading = false;
        this.list = response.data;
        this.totalNum = response.totalNum;
        // if (response.data.length > 14) {
        //   this.listClass = false
        // } else {
        //   this.listClass = true
        // }
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
    },
    homeSearch (row) {
      let self = this
      window.sessionStorage.setItem('tid', '')
      window.sessionStorage.setItem('tid', row.tid)
      self.$router.push('/index/orderSys/bondedNormal')
    },
    abnormalSearch (row) {
      let self = this
      window.sessionStorage.setItem('tid', '')
      window.sessionStorage.setItem('tid', row.tid)
      self.$router.push('/index/orderSys/pddErpAbnormalLog')
    },
    // 取消
    cancelStatus (row) {
      this.$confirm("确定要取消该订单吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let param = {
          orderNo: row.tid,
        }
        cancelOrderPdd(param).then(res => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "订单取消成功!",
              type: 'success'
            });
            this.getList()
          } else {
            this.$message({
              type: "异常",
              message: res.msg,
              type: 'error'
            });
          }
        })
      }).catch(() => { })
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
.btnCancel .el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c4c4c4;
  color: #1f2d3d;
  margin: 0;
  padding: 8px 8px;
  border-radius: 4px;
}
.btnCancel .el-button--primary {
  color: #fff;
  background-color: #20a0ff;
  border-color: #20a0ff;
}
</style>


   
