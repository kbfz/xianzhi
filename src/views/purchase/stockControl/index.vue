<template>
  <div class="app-container calendar-list-container stockControl"
       id="app-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="24">
        <div class="app-container-left">
          <div class="filter-container">
            <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="请输入商品条形码"
                      v-model="query.productBarcode"> </el-input>
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
                    :height="elTableMediaHeight"
                    @selection-change="on_page_select">
            <el-table-column min-width="250px"
                             align="center"
                             label="商品条形码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.productBarcode}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="200px"
                             align="center"
                             label="商品名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.productName}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="180px"
                             align="center"
                             label="总库存"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.stockQuantity}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="200px"
                             align="center"
                             label="更新时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.updateTime}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="操作"
                             min-width="200"
                             align="center"
                            >
              <template scope="scope">
                <el-button type="text"
                           @click="handleUpdate(scope.row)">编辑</el-button>
                <el-button type="text"
                           @click="handleDelete(scope.row)">删除</el-button>

              </template>
            </el-table-column> -->
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
          <!--增加库存 -->
          <el-dialog :title="nameInfo"
                     :visible.sync="dialogFormVisible"
                     :before-close="closeDialog"
                     :close-on-click-modal="false"
                     class="receiptWidth600">
            <el-form :model="form"
                     :rules="rules"
                     ref="form"
                     class="customerdata"
                     label-width="110px">
              <span class="formUpdate">*</span>
              <el-form-item label="商品条形码："
                            style="width:100%">
                <el-input v-model="form.productBarcode"
                          placeholder="请输入商品条形码"
                          style="width:300px"></el-input>
              </el-form-item>
              <span class="formUpdate" style="left: 26px;">*</span>
              <el-form-item label="商品名称:"
                            class="marginListAdd">
                <el-input v-model="form.productName"
                          placeholder="请输入商品名称"
                          style="width:300px"></el-input>
              </el-form-item>
              <span class="formUpdate" style="left: 40px;">*</span>
              <el-form-item label="库存数:">
                <el-input v-model="form.stockQuantity"
                          placeholder="请输入库存数"
                          style="width:300px"></el-input>
              </el-form-item>

            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="cancel('form')">取 消</el-button>
              <el-button v-if="nameInfo == '新增库存'"
                         type="primary"
                         @click="create('form')">确 定</el-button>
              <el-button v-else
                         type="primary"
                         @click="update('form')">确 定</el-button>
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
  addObj,
  setInfo,
  getObj,
  delObj
} from "api/purchase/stockControl/index";
import { mapGetters } from "vuex";
import $ from "jquery";
export default {
  name: "stockControl",
  data () {
    return {
      total: 0,
      loading: {
        tableLoading: false
      },
      list: [],
      listQuery: {
        orderBy:'updateTimedesc',
        page: 1,
        limit: 10,
      },
      query: {
        cusCbeName: '',
        orderno: ''
      },
      form: {
        id: '',
        productBarcode: '',
        productName: '',
        stockQuantity: '',
      },
      dialogFormVisible: false,
      rules: {
      },
    };
  },
  created () {
    this.getList();

  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"]),
  },
  methods: {
    getList () {
      this.loading.tableLoading = true;
      let param = {
        productBarcode: this.query.productBarcode,
        ...this.listQuery
      };
      page(param).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.loading.tableLoading = false;
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
    // 关闭按钮 
    closeDialog () {
      this.dialogFormVisible = false
      // this.$refs['form'].resetTemp()
    },
    cancel (formName) {
      this.dialogFormVisible = false;
      // const set = this.$refs;
      // set[formName].resetTemp();
    },
    // 新增
    addDiction () {
      this.resetTemp();
      this.nameInfo = '新增库存'
      this.dialogFormVisible = true    },
    //编辑
    handleUpdate (row) {
      let self = this
      this.nameInfo = '编辑库存'
      getObj(row.id).then(response => {
        // console.log(response.data.fixDate)
        self.form = response.data;
        this.dialogFormVisible = true
      });
    },
    update (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          if (!this.form.productBarcode) {
            this.$message({
              message: "商品条形码不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          if (!this.form.productName) {
            this.$message({
              message: "商品名称不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          if (!this.form.stockQuantity) {
            this.$message({
              message: "库存数不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
          if (reg.test(this.form.stockQuantity) === false) {
            this.$message({
              message: "库存数只能为数字且不能为负数！",
              type: 'error',
              duration: 2000
            });
            return false;
          }
          let nForm = {
            id: this.form.id,
            productBarcode: this.form.productBarcode,
            productName: this.form.productName,
            stockQuantity: this.form.stockQuantity,
          }
          setInfo(nForm)
            .then((response) => {
              
              if (response.rel== true) {
                this.$notify({
                  title: "成功",
                  message: "修改成功",
                  type: "success",
                  duration: 2000
                });
                this.dialogFormVisible = false;
              this.getList();
              } else {
                this.$notify({
                  title: "失败",
                  message: response.message,
                  type: "error",
                  duration: 2000
                });
              }
            })
        }
      });
    },
    create (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          if (!this.form.productBarcode) {
           this.$message({
              message: "商品条形码不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          if (!this.form.productName) {
           this.$message({
              message: "商品名称不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          if (!this.form.stockQuantity) {
           this.$message({
              message: "库存数不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
          if (reg.test(this.form.stockQuantity) === false) {
            this.$message({
              message: "库存数只能为数字且不能为负数！",
              type: 'error',
              duration: 2000
            });
            return false;
          }
          let nForm = {
            productBarcode: this.form.productBarcode,
            productName: this.form.productName,
            stockQuantity: this.form.stockQuantity,
          }

          addObj(nForm)
            .then((response) => {
              if (response.rel== true) {
                this.$notify({
                  title: "成功",
                  message: "新增成功",
                  type: "success",
                  duration: 2000
                });
                this.dialogFormVisible = false;
                this.getList();
              } else {
                this.$notify({
                  title: "失败",
                  message: response.message,
                  type: "error",
                  duration: 2000
                });
              }
            })
        }
      });
    },

    //删除
  handleDelete (row) {
    this.$confirm("此操作将永久删除, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }).then(() => {
      delObj(row.id).then((res) => {
        if (res.rel == true) {
        this.$notify({
          title: "成功",
          message: "删除成功",
          type: "success",
          duration: 2000
        });
        const index = this.list.indexOf(row);
        this.list.splice(index, 1);
      }else {
            this.$notify({
              title: "失败",
              message: res.message,
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
      }).catch(() => { });
    });
  },

  resetTemp () {
    this.form = {
      productBarcode: '',
        productName: '',
        stockQuantity: '',
    }
  }
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
.notecss {
  font-size: 13px;
  color: #9eb1c6;
}
.w85 {
  width: 85%;
  margin: 0 auto;
}
.exportSpan {
  display: block;
  margin-top: -13px;
  margin-bottom: 10px;
  color: #20a0ff;
}
.formUpdate {
  display: inline-block;
  position: relative;
  top: 27px;
  left: 8px;
  color: red;
}
.el-form-item{
  margin-bottom: 8px;
}
</style>



