<template>
  <div class="app-container calendar-list-container"
       id="app-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="24">
        <div class="app-container-left">
          <div class="filter-container">
            <el-select v-model="query.cusCbeName" placeholder="请选择客户" class="filter-item" clearable popper-class="optionsContent">
              <el-option
                  v-for="item in select.customer"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
            </el-select>
            <el-select v-model="query.state"
                       placeholder="请选择下载状态"  clearable popper-class="optionsContent">
              <el-option v-for="item in selectStatus"
                         :key="item.value"
                         :value="item.value"
                         :label="item.label"></el-option>
            </el-select>
            <el-date-picker
              v-model="query.creatTime"
              type="month"
              placeholder="选择日期" popper-class="timeSelect">
            </el-date-picker>
            <el-button class="filter-item"
                       type="primary"
                       v-waves
                       icon="search"
                       @click="handleFilter">查询</el-button>
            <div class="btnMb">
            </div>
            <el-table :data="list"
                      v-loading="loading.tableLoading"
                      element-loading-text="正在加载中......"
                      border
                      fit
                      highlight-current-row
                      style="width: 100%"
                      :height="elTableMediaHeight"
                      @selection-change="on_page_select">
              <el-table-column min-width="200px"
                               align="center"
                               label="客户名称"
                               show-overflow-tooltip>
                <template scope="scope">
                  <span style="cursor: pointer;">{{scope.row.cusCbeName}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="200px"
                               align="center"
                               label="账单类型名称"
                               show-overflow-tooltip>
                <template scope="scope">
                  <span style="cursor: pointer;">{{scope.row.billTypeName}}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column width="200"
                               align="center"
                               label="创建时间"
                               show-overflow-tooltip>
                <template scope="scope">
                  <span style="cursor: pointer;">{{scope.row.creatTime}}</span>
                </template>
              </el-table-column>
              <el-table-column width="150"
                               align="center"
                               label="客户编码"
                               show-overflow-tooltip>
                <template scope="scope">
                  <span style="cursor: pointer;">{{scope.row.cusCbeCode}}</span>
                </template>
              </el-table-column> -->
               <el-table-column min-width="180px"
                               align="center"
                               label="开始时间"
                               show-overflow-tooltip>
                <template scope="scope">
                  <span style="cursor: pointer;">{{scope.row.startTime}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="180px"
                               align="center"
                               label="结束时间"
                               show-overflow-tooltip>
                <template scope="scope">
                  <span style="cursor: pointer;">{{scope.row.endTime}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="180px"
                               align="center"
                               label="更新时间"
                               show-overflow-tooltip>
                <template scope="scope">
                  <span style="cursor: pointer;">{{scope.row.updateTime}}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column width=""
                               align="center"
                               label="文件地址"
                               show-overflow-tooltip>
                <template scope="scope">
                  <span style="cursor: pointer;">{{scope.row.fileUrl}}</span>
                </template>
              </el-table-column> -->
             
              <el-table-column min-width="150px"
                               align="center"
                               label="状态"
                               show-overflow-tooltip>
                <template scope="scope">
                  <!-- <span style="cursor: pointer;" v-if="state===0">{{scope.row.state}}</span> -->
                  <span v-if="scope.row.state == '0'">已生成</span>
                  <span v-if="scope.row.state == '1'">未生成</span>
                </template>
              </el-table-column>
              <el-table-column label="操作"
                               min-width="180px"
                               align="center">
                <template scope="scope">
                  
                  <a :href="scope.row.fileUrl" target="_blank" style="color:#20a0ff;padding-right: 10px;">
                    <span v-if="scope.row.state == '1'"></span>
                    <span v-if="scope.row.state == '0'">下载</span>
                  </a>
                  <el-button type="text"
                             @click="handleDelete(scope.row)">删除</el-button>
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
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  page,
  selectObj,
  // checkbox,
  // getObj,
  // addObj,
  delObj,
  // putObj
} from "api/financialSys/DataConfiguration/BillDownload/index";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  name: "CustomerData",
  components: {
    // 引入编辑的组件
    // "contrast-status": () => import("./components/contrastStatus.vue")
  },
  data () {
    return {
      total: 0,
      loading: {
        tableLoading: false
      },
      list: [],
      listQuery: {
        page: 1,
        limit: 10,
        orderBy:"updateTimedesc"
        // customerCode: undefined,
      },
      query: {
        cusCbeName:'',
        state: '',
        creatTime:'',
      },
      nameInfo: '',
      select: {
        customer: [],
        billName:[],
      },
      dialogFormVisible: false,
      rules: {
        // dictTypeName: [
        //   {
        //     required: true,
        //     message: '请输入字典类型名称',
        //     trigger: 'change'
        //   }
        // ],
      },
      selectStatus: [
        {
          value: 0,
          label: '已生成'
        },
        {
          value: 1,
          label: '未生成'
        }
      ]
    };
  },
  created () {
    this.getList();
    this.customerNameInfo();
    
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"]),
  },
  methods: {
    getList() {
      this.listLoading = true;
      let param = {
        cusCbeName: this.query.cusCbeName,
        state: this.query.state,
        creatTime: this.query.creatTime === "" ? "" : dateUtils.format(this.query.creatTime, "YYYY-MM"),
        // creatTime: this.query.creatTime,
        ...this.listQuery
      };
      page(param).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
        console.log(response.data.rows)
      });
    },
    handleFilter () {
      this.getList();
      // this.orderTotal()
    },
    handleSizeChange (val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange (val) {
      this.listQuery.page = val;
      this.getList();
    },
    on_page_select(val) {
      this.pageChoose = val
    },

    // 获取客户信息
    customerNameInfo () {
      let param = {}
      selectObj(param).then(response => {
        for (var i = 0; i < response.data.customerRows.length; i++) {
          let nameObj = {}
          nameObj.label = response.data.customerRows[i].cusCbeName
          nameObj.value = response.data.customerRows[i].cusCbeCode
          this.select.customer.push(nameObj)
        }
      })
    },

    // 关闭按钮 
    // closeDialog () {
    //   this.dialogFormVisible = false
    //   this.$refs['form'].resetFields()
    // },


    handleDelete(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj(row.id).then(() => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
          const index = this.list.indexOf(row);
          this.list.splice(index, 1);
        }).catch(() => {});
      });
    },
    // 保存
    saveDiction () {
      this.$refs["form"].validate(valid => {
        if (!valid) {
          return false;
        } else {
          this.$confirm("确定要保存吗", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            addObj(this.form).then(response => {
              this.getList();
              this.$refs['form'].resetFields()
              this.dialogFormVisible = false;
              //  console.log(response)
              if (response.status === 100) {
                this.$notify({
                  title: "失败",
                  message: "字典类型编码在该字典类型中已存在！",
                  type: "error",
                  duration: 2000
                });
                return
              }
              if (response.rel) {
                this.$notify({
                  title: "成功",
                  message: "保存成功",
                  type: "success",
                  duration: 2000
                });
              } else {
                this.$notify({
                  title: "失败",
                  message: "系统异常",
                  type: "error",
                  duration: 2000
                });
              }
            });
          }).catch(() => { });
        }
      });
    },

  }
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



