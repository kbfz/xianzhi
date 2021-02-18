<template>
  <div class="app-container calendar-list-container" id="app-container">
    <div class="app-container-left">
      <div class="filter-container">
        <el-input
          @keyup.enter.native="handleFilter"
          style="width: 200px;"
          class="filter-item"
          placeholder="请输入groupId"
          v-model="query.groupId"
        ></el-input>
        <el-input
          @keyup.enter.native="handleFilter"
          style="width: 200px;"
          class="filter-item"
          placeholder="请输入topicId"
          v-model="query.topicId"
        ></el-input>
        <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">查询</el-button>
      </div>
      <el-table
        :data="list"
        v-loading="loading.tableLoading"
        element-loading-text="正在加载中......"
        border
        fit
        highlight-current-row
        style="width: 100%"
        :height="elTableMediaHeight"
      >
        <el-table-column min-width="150" align="center" label="名称" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.kafkaName}}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="180" align="center" label="消息内容" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.message}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="150" align="center" label="异常描述" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.exception}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="130" align="center" label="groupId" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.groupId}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100" align="center" label="topicId" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.topicId}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100" align="center" label="时间" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template scope="scope">
            <el-button
              class="btnSize"
              type="primary"
              size="small"
              @click="handleinstall(scope.row)"
            >修改</el-button>
            <el-button
              class="btnSize"
              type="primary"
              size="small"
              @click="reset(scope.row)"
            >重发</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
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
      <el-dialog
        title="修改"
        :visible.sync="dialogFormVisible"
        :before-close="closeDialogDetail"
        :close-on-click-modal="false"
        class="codeWidth"
      >
        <!-- <login-order :loginsticsArr="loginsticsArr"></login-order> -->
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          label-width="130px"
        >
          <el-form-item label="消息内容" prop="message" style="width:100%">
            <el-input v-model="form.message" placeholder="请输入消息内容" type="textarea" :rows="3"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
           class="dialog-footer">
        <el-button @click="closeDialogDetail()">取 消</el-button>
        <el-button type="primary"
                   @click="installObj()">确 定</el-button>
      </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  page,
  getObj,
  installObj,
 orderReset,
  //   selectObj
} from "api/orderSys/xsOrder/bondedOrder/Kafka/index";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  components: {
    //   // 引入编辑的组件
    // "login-order": () => import("./compoments/loginOrder")
  },
  name: "sellBsorderHead",
  data() {
    return {
      total: 0,
      list: [],
      loading: {
        tableLoading: false
      },
      query: {
        groupId: "",
        topicId: ""
      },
      listQuery: {
        page: 1,
        limit: 10
      },
      form: {
        message: "",
        id:''
      },
      selectCustom: [],
      dialogFormVisible: false,
      loginsticsArr: []
    };
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight", "name"])
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading.tableLoading = true;
      let param = {
        groupId: this.query.groupId,
        topicId: this.query.topicId,
        ...this.listQuery
      };
      // return false
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
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    //修改
    handleinstall(row) {
      getObj(row.id).then(response => {
        this.dialogFormVisible = true;
        this.form.message = row.message;
        this.form.id=row.id
      });
    },
    closeDialogDetail() {
      this.dialogFormVisible = false;
    },
    installObj () {
      let param = {
        message: this.form.message,
        id: this.form.id,
      }

      const set = this.$refs;
      this.$confirm('确定要保存吗？', '操作确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        installObj(param).then(res => {
          this.dialogFormVisible = false
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "修改成功",
              type: "success",
              duration: 2000
            });
            this.getList();
          } else {
            this.$notify({
              title: "失败",
              message: "系统异常",
              type: "error",
              duration: 2000
            });
          }
          if (res.status !== 200) {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000
            });
          }
        })
      }).catch(() => { })
    },

    reset (row) {
      this.$confirm("确定要重发么？", "提示", {
        confirmButtonText: "重试",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let param = { id: row.id};
        console.log(param)
        orderReset(param).then(response => {
          if (response.rel === true) {
            this.$notify({
              title: "成功",
              message: "重置订单成功",
              type: "success",
              duration: 2000
            });
            this.getList();
          } else {
            this.$notify({
              title: "失败",
              message: response.message,
              type: "success",
              duration: 2000
            });
          }
          if (response.status !== 200) {
            this.$notify({
              title: "失败",
              message: response.message,
              type: "error",
              duration: 2000
            });
          }
        });
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
.show2 {
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



