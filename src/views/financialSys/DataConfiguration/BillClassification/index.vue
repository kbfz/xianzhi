<template>
  <div class="app-container calendar-list-container"
       id="app-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="24">
        <div class="app-container-left">
          <div class="filter-container">
            <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="请输入分类名称"
                      v-model="query.name"> </el-input>
            <el-select v-model="query.state"
                       placeholder="请选择字典类型状态" clearable popper-class="optionsContent">
              <el-option v-for="item in selectStatus"
                         :key="item.value"
                         :value="item.value"
                         :label="item.label"></el-option>
            </el-select>
            <!-- <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请选择状态" v-model="query.dictName"> </el-input> -->
            <el-button class="filter-item"
                       type="primary"
                       v-waves
                       icon="search"
                       @click="handleFilter">查询</el-button>
          </div>
          <div class="btnMb">
            <el-button class="filter-item"
                       type="primary"
                       @click="addDiction">新增</el-button>
          </div>
          <el-table :data="list"
                    v-loading="loading.tableLoading"
                    element-loading-text="正在加载中......"
                    border
                    fit
                    style="width: 100%"
                    :height="elTableMediaHeight"
                    class="tableovercss">
            <el-table-column min-width="200px"
                             align="center"
                             label="账单分类">
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="200px"
                            align="center"
                             label="操作">
              <template scope="scope">
                <el-button type="danger"
                           @click="deleteDiction(scope.row)"
                           class="btnSize"
                           v-if="scope.row.state === 0"> 禁用</el-button>
                <el-button type="success"
                           @click="deleteReturn(scope.row)"
                           class="btnSize"
                           v-if="scope.row.state === 1"> 启用</el-button>
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
          <el-dialog title="新增"
                     :visible.sync="dialogFormVisible"
                     :before-close="closeDialog"
                     :close-on-click-modal="false"
                     style="width: 950px; margin: 0 auto">
            <el-form ref="form"
                     :model="form"
                     label-width="140px"
                     :rules="rules">
              <el-form-item label="账单分类名称"
                            prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button type="primary"
                         @click="saveDiction">保存</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  page,
  // selectObj,
  addObj,
  // delObj,
  putObj
} from "api/financialSys/DataConfiguration/BillClassification/index";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  name: "BillClassification",
  components: {
    // 引入编辑的组件
    // "contrast-status": () => import("./components/contrastStatus.vue")
  },
  data () {
    return {
      selectDiction: [],
      dialogFormVisible: false,
      // 订单数据
      total: 0,
      list: [],
      tableContent: [],
      // total: null,
      loading: {
        tableLoading: false
      },
      query: {
        name: '',
        state: ''
      },
      listQuery: {
        page: 1,
        limit: 10
      },
      sellBsorderHeadManager_btn_edit: false,
      sellBsorderHeadManager_btn_del: false,
      sellBsorderHeadManager_btn_add: false,
      tableKey: 0,
      form: {
        id: '',
        name: ''
      },
      cbQuery: '',
      queryStringCb: '',
      selectedOpetionsMap: {},
      rules: {
        name: [
          {
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          }
        ],
      },
      selectStatus: [
        {
          value: 1,
          label: '已禁用'
        },
        {
          value: 0,
          label: '已启用'
        }
      ]
    };
  },
  created () {
    this.getList();
    // this.selectType()
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"]),
    // typeCode(val){
    //   if(this.selectedOpetionsMap[this.form.dictTypeName]===1){
    //     return false;
    //   }
    //   return true;
    // }
  },
  methods: {
    getList () {
      this.loading.tableLoading = true;
      let param = {
        name: $.trim(this.query.name),
        state: this.query.state,
        ...this.listQuery
      };
      page(param).then(response => {
        this.loading.tableLoading = false;
        this.list = response.data.rows;
        // console.log(response.data.rows)
        this.total = response.data.total;
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
    querySearch (queryString, cb) {
      var selectDiction = this.selectDiction;
      var results = queryString ? selectDiction.filter(this.createFilter(queryString)) : selectDiction;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.code.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    // 数据字典类型下拉框
    // selectType() {
    //   let param = {}
    //   selectObj(param).then(response => {
    //     this.selectDiction.splice(0,this.selectDiction.length) // 循环之前清空数组
    //     for(var i=0; i<response.data.length; i++) {
    //       let diction = {}
    //       diction.value = response.data[i].dictTypeName
    //       diction.code = response.data[i].dictTypeCode
    //       this.selectDiction.push(diction)
    //       this.selectedOpetionsMap[diction.value]=1 // 转化为json格式
    //     }
    //   })
    // },
    handleSelect (item) {
      //  console.log(item.code);
      if (item.code === undefined) {
        this.hide = true
      } else {
        this.hide = false
      }
    },

    // 关闭按钮 
    closeDialog () {
      this.dialogFormVisible = false
      this.$refs['form'].resetFields()
    },
    // 新增数据字典
    addDiction () {
      this.addForm()
      this.dialogFormVisible = true
    },
    addForm () {
      this.form = {
        name: '',
        state: 0
      }
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
    deleteDiction (row) {
      this.$confirm('确认要禁用该项吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = { id: row.id, state: 1 }
        putObj(param).then(response => {
          this.$notify({
            title: '成功',
            message: '禁用成功',
            type: 'success'
          });
          this.getList()
        })
      }).catch(() => { })
    },
    deleteReturn (row) {
      this.$confirm('确认要启用该项吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = { id: row.id, state: 0 }
        putObj(param).then(response => {
          this.$notify({
            title: '成功',
            message: '启用成功',
            type: 'success'
          });
          this.getList()
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



