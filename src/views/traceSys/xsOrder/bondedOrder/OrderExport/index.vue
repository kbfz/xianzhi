<template>
  <div class="app-container calendar-list-container"
       id="app-container">
    <div class="app-container-left">
      <div class="filter-container">
        <p class="blodtext">订单导出结果</p>
        <div class="contenttip">
          * 本页面仅用于查看和下载订单导出文件，如需导出某些订单，请至左侧“订单查询”页面进行操作<br>
          * 一次最多同时存在3个处理状态为“处理中”导出数据
        </div>
      </div>
      <el-table :data="list"
                v-loading="loading.tableLoading"
                element-loading-text="正在加载中......"
                border
                fit
                highlight-current-row
                style="width: 100%"
                :height="elTableMediaHeight">
        <el-table-column min-width="150"
                         align="center"
                         label="导出时间"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="200"
                         align="center"
                         label="文件名称"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.fileName}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="120"
                         align="center"
                         label="处理状态"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;"
                  v-if="scope.row.status === 0">处理中</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.status === 1">完成</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.status === 2">失败</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="操作"
                         width="180">
          <template scope="scope">
            <el-button type="text"
                       v-if="scope.row.status === 1"
                       @click="Download(scope.row)"> 下载
            </el-button>
            <el-button type="text"
                       v-if="scope.row.status === 0"
                       style="color:#999"
                       :disabled="true"> 下载
            </el-button>
            <el-button type="text"
                       @click="Delete(scope.row)">删除
            </el-button>
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
  delObj
} from "api/orderSys/xsOrder/bondedOrder/OrderExport/index";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  components: {
    //   // 引入编辑的组件
    // "login-order": () => import("./compoments/loginOrder"),
  },
  name: "sellBsorderHead",
  data () {
    return {
      total: 0,
      list: [],
      loading: {
        tableLoading: false
      },
      listQuery: {
        page: 1,
        limit: 10,
        orderBy: 'createTimedesc'
      },
    };
  },
  computed: {
    ...mapGetters(["elements", "name"]),
    elTableMediaHeight () {
      if (window.screen.height === 1080) {
        return window.screen.height / 2.2;
      }
      if (window.screen.height === 900) {
        return window.screen.height / 2.7;
      }
      if (window.screen.height === 768) {
        return window.screen.height / 2.7 - 25;
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.loading.tableLoading = true;
      page(this.listQuery).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.loading.tableLoading = false;
      });
    },
    handleSizeChange (val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange (val) {
      this.listQuery.page = val;
      this.getList();
    },
    //删除
    Delete (row) {
      this.$confirm("确定要删除这条导出文件记录？", "删除确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj(row.id).then(res => {
          if (res.rel) {
            this.$message({
              type: "success",
              message: "删除成功!",
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
      }).catch(() => { })

    },
    Download (row) {
      window.location.href = row.url;
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
.blodtext {
  font-size: 16px;
  font-weight: bold;
}
.contenttip {
  background-color: #ffffe9;
  border: #dfe6ec 1px solid;
  color: red;
  font-size: 12px;
  padding: 10px;
  line-height: 20px;
}
</style>



