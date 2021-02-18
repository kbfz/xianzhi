<template>
  <div class="app-container calendar-list-container" id="app-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="24">
        <div class="app-container-left uploadDialog">
          <div class="filter-container">
            <el-select
              v-model="query.customerCode"
              placeholder="请选择客户"
              class="filter-item"
              clearable
              filterable
              popper-class="optionsContent"
            >
              <el-option
                v-for="item in select.customer"
                :key="item.value"
                :label="item.key"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-date-picker v-model="query.month" type="month" placeholder="账单月份"></el-date-picker>
            <el-button
              class="filter-item"
              type="primary"
              v-waves
              icon="search"
              @click="handleFilter"
            >查询</el-button>
            <el-button class="filter-item" type="primary" @click="add">添加</el-button>
            <el-button class="filter-item" type="primary" @click="exportorder">导入</el-button>
            <el-button class="filter-item" type="primary" @click="downLoad">下载导入模板</el-button>
            <div class="btnMb"></div>
            <el-table
              :key="tableKey"
              :data="list"
              v-loading.body="listLoading"
              border
              fit
              highlight-current-row
              style="width: 100%"
              :height="elTableMediaHeight"
              :class="{'tabLayout':isList}"
            >
              <el-table-column min-width="150px" align="center" label="客户名称" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.customerName}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="150px" align="center" label="客户编号" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.customerCode}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="150px" align="center" label="账单月份" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.month}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="100px" align="center" label="包材编号" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.packagingCode}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="100px" align="center" label="包材名称" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.packagingName}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="120px" align="center" label="规格" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.specification}}</span>
                </template>
              </el-table-column>
                <el-table-column min-width="100px" align="center" label="单价" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.price}}</span>
                </template>
              </el-table-column>
                <el-table-column min-width="100px" align="center" label="数量" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.count}}</span>
                </template>
              </el-table-column>
                <el-table-column min-width="100px" align="center" label="总价" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.total}}</span>
                </template>
              </el-table-column>
              <el-table-column width="120px" align="center" label="操作" show-overflow-tooltip>
                <template scope="scope">
                  <el-button type="text" @click="update(scope.row)">编辑</el-button>
                  <el-button type="text" @click="delLogistic(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div v-show="!listLoading" class="pagination-container">
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
          </div>
          <!-- 添加/编辑包材 -->
          <el-dialog
            :title="materialText"
            :visible.sync="dialogFormMaterial"
            :before-close="closeMaterial"
            class="receiptWidth500"
          >
            <el-form :model="form" :rules="rules" ref="form" label-width="90px" :inline="true">
              <div style="position: relative;float: left">
                <span class="xhText" style="left: 15px">*</span>
                <el-form-item label="客户名称" class="marginListAdd">
                  <el-select
                    v-model="form.customerName"
                    placeholder="请选择客户"
                    class="filter-item"
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in select.customer"
                      :key="item.value"
                      :label="item.key"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <el-form-item label="客户编号" class="marginListAdd">
                <el-input
                  v-model="form.customerName.value"
                  placeholder="客户编号"
                  style="width:200px"
                  disabled
                ></el-input>
              </el-form-item>
              <div style="position: relative;float: left">
                <span class="xhText" style="left: 15px">*</span>
                <el-form-item label="账单月份" class="marginListAdd">
                  <el-date-picker
                    v-model="form.month"
                    type="month"
                    style="width:200px"
                    placeholder="选择月"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div style="position: relative;float: left">
                <span class="xhText" style="left: 15px">*</span>
                <el-form-item label="包材编号" class="marginListAdd">
                  <el-input v-model="form.packagingCode" placeholder="包材编号" style="width:200px"></el-input>
                </el-form-item>
              </div>
               <div style="position: relative;float: left">
                <span class="xhText" style="left: 15px">*</span>
                <el-form-item label="包材名称" class="marginListAdd">
                  <el-input v-model="form.packagingName" placeholder="包材名称" style="width:200px"></el-input>
                </el-form-item>
              </div>
               <div style="position: relative;float: left">
                <span class="xhText" style="left: 42px">*</span>
                <el-form-item label="规格" class="marginListAdd">
                  <el-input v-model="form.specification" placeholder="规格" style="width:200px"></el-input>
                </el-form-item>
              </div>
              <!-- <div style="position: relative;float: left">
                <span class="xhText" style="left: 42px">*</span>
                <el-form-item label="单价" class="marginListAdd">
                  <el-input v-model="form.price" placeholder="单价" style="width:200px"></el-input>
                </el-form-item>
              </div> -->
              <div style="position: relative;float: left">
                <span class="xhText" style="left: 42px">*</span>
                <el-form-item label="数量" class="marginListAdd">
                  <el-input v-model="form.count" placeholder="数量" style="width:200px"></el-input>
                </el-form-item>
              </div>
              <!-- <div style="position: relative;float: left">
                <span class="xhText" style="left: 42px">*</span>
                <el-form-item label="总价" class="marginListAdd">
                  <el-input v-model="form.total" placeholder="总价" style="width:200px"></el-input>
                </el-form-item>
              </div> -->
            </el-form>
            <div slot="footer" class="dialog-footer center">
              <el-button @click="closeMaterial">取消</el-button>
              <el-button type="primary" v-if="materialText == '添加'" @click="addSubmit">保存</el-button>
              <el-button type="primary" v-if="materialText == '编辑'" @click="updateSubmit">保存</el-button>
            </div>
          </el-dialog>
          <!-- 导入 -->
          <el-dialog
            title="导入"
            :visible.sync="dialogVisible"
            :before-close="closeDialogExport"
            :close-on-click-modal="false"
            class="receiptWidth600"
          >
            <div style="width: 100%;
          height: 100px">
              <input
                type="file"
                ref="clearFile"
                accept=".xls, .xlsx"
                name="file"
                class="noneborder"
                @change="getFile($event)"
              />
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="closeDialogExport">取 消</el-button>
              <el-button type="primary" @click="exportSave($event)">导 入</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getCustomerSelectList } from "api/financialSys/chargingStandard/index";
import { getPackageObj } from "@/api/financialSys/customerBill";
import { packAdd,packGet,packUpdate,packDel } from "api/financialSys/wareupload/index";
import { mapGetters } from "vuex";
import { getToken } from "utils/auth";
import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  name: "CustomerData",
  components: {
    // 引入编辑的组件
    // "contrast-status": () => import("./components/contrastStatus.vue")
  },
  data() {
    return {
      total: 0,
      loading: {
        tableLoading: false,
      },
      list: [],
      listQuery: {
        page: 1,
        limit: 10,
        orderBy: "createTimedesc",
        // customerCode: undefined,
      },
      query: {
        month: "",
        customerCode: "",
      },
      nameInfo: "",
      select: {
        customer: [],
        billName: [],
      },
      dialogFormMaterial: false,
      materialText: "添加",
      rules: {},
      form: {
         id: "",
        customerCode: "",
        customerName: { key: "", value: "" },
        packagingCode: "",
        month: "",
        packagingName: "",
        price: "",
        specification:'',
        total:'',
        count:''
      },
      dialogVisible: false,
      filePath: {},
       event:''
    };
  },
  created() {
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
        month:
          this.query.month === ""
            ? ""
            : dateUtils.format(this.query.month, "YYYY-MM"),
        customerCode: this.query.customerCode,
        ...this.listQuery,
      };
      getPackageObj(param).then((response) => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.getList();
      // this.orderTotal()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    // 获取客户信息
    customerNameInfo() {
      let param = {};
      getCustomerSelectList(param).then((response) => {
        this.select.customer = response.data;
      });
    },
    closeMaterial() {
      this.dialogFormMaterial = false;
    },
    update(row) {
      (this.materialText = "编辑"),
        packGet(row.id).then((res) => {
          let obj = {};
          for (var i = 0; i < this.select.customer.length; i++) {
            if (res.data.customerCode == this.select.customer[i].value) {
              obj = this.select.customer[i];
            }
          }
          res.data.customerName = obj;
          this.form = res.data;
        });
      this.dialogFormMaterial = true;
    },
    add() {
      (this.materialText = "添加"), this.reset();
      this.dialogFormMaterial = true;
    },
    reset() {
      this.form = {
        id: "",
        customerCode: "",
        customerName: { key: "", value: "" },
        packagingCode: "",
        month: "",
        packagingName: "",
        price: "",
        specification:'',
        total:'',
        count:''
      };
    },
    // 新增保存
    addSubmit() {
      let obj = {
        customerCode: this.form.customerName.value,
        customerName: this.form.customerName.key,
        month:
          this.form.month === ""
            ? ""
            : dateUtils.format(this.form.month, "YYYY-MM"),
        packagingCode:this.form.packagingCode,
        packagingName:this.form.packagingName,
        specification: this.form.specification,
        // price: this.form.price,
        count: this.form.count,
        // total: this.form.total,
        id: this.form.id,
      };
      if (!obj.customerName) {
        this.$message({
          message: "客户名称不能为空",
          type: "error",
        });
        return false;
      }
      if (!obj.month) {
        this.$message({
          message: "账单月份不能为空",
          type: "error",
        });
        return false;
      }
      if (!obj.packagingCode) {
        this.$message({
          message: "包材编码不能为空",
          type: "error",
        });
        return false;
      }
      if (!obj.packagingName) {
        this.$message({
          message: "包材名称不能为空",
          type: "error",
        });
        return false;
      }
       if (!obj.specification) {
        this.$message({
          message: "规格不能为空",
          type: "error",
        });
        return false;
      }
      
      // if (!obj.price) {
      //   this.$message({
      //     message: "单价不能为空",
      //     type: "error",
      //   });
      //   return false;
      // }
      if (!obj.count) {
        this.$message({
          message: "数量不能为空",
          type: "error",
        });
        return false;
      }
      // if (!obj.total) {
      //   this.$message({
      //     message: "总价不能为空",
      //     type: "error",
      //   });
      //   return false;
      // }
      this.$confirm("确定要保存吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        packAdd(obj).then((res) => {
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "保存成功",
              type: "success",
              duration: 2000,
            });
            this.dialogFormMaterial = false;
            this.getList();
          } else {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000,
            });
          }
        });
      });
    },
    // 编辑保存
    updateSubmit() {
           let obj = {
        customerCode: this.form.customerName.value,
        customerName: this.form.customerName.key,
        month:
          this.form.month === ""
            ? ""
            : dateUtils.format(this.form.month, "YYYY-MM"),
        packagingCode:this.form.packagingCode,
        packagingName:this.form.packagingName,
        specification: this.form.specification,
        // price: this.form.price,
        count: this.form.count,
        // total: this.form.total,
        id: this.form.id,
      };
      if (!obj.customerName) {
        this.$message({
          message: "客户名称不能为空",
          type: "error",
        });
        return false;
      }
      if (!obj.month) {
        this.$message({
          message: "账单月份不能为空",
          type: "error",
        });
        return false;
      }
      if (!obj.packagingCode) {
        this.$message({
          message: "包材编码不能为空",
          type: "error",
        });
        return false;
      }
      if (!obj.packagingName) {
        this.$message({
          message: "包材名称不能为空",
          type: "error",
        });
        return false;
      }
       if (!obj.specification) {
        this.$message({
          message: "规格不能为空",
          type: "error",
        });
        return false;
      }
      
      // if (!obj.price) {
      //   this.$message({
      //     message: "单价不能为空",
      //     type: "error",
      //   });
      //   return false;
      // }
      if (!obj.count) {
        this.$message({
          message: "数量不能为空",
          type: "error",
        });
        return false;
      }
      // if (!obj.total) {
      //   this.$message({
      //     message: "总价不能为空",
      //     type: "error",
      //   });
      //   return false;
      // }
      this.$confirm("确定要保存吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        packUpdate(obj.id, obj).then((res) => {
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "保存成功",
              type: "success",
              duration: 2000,
            });
            this.dialogFormMaterial = false;
            this.getList();
          } else {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000,
            });
          }
        });
      });
    },
    // 删除
    delLogistic(row) {
      this.$confirm("确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        packDel(row.id).then((res) => {
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000,
            });
            this.getList();
          } else {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000,
            });
          }
        });
      });
    },
    closeDialogExport() {
      this.dialogVisible = false;
    },
    exportorder() {
      this.dialogVisible = true;
    },
    getFile(event) {
      this.filePath = event.target.files[0];
    },
     exportSave(event) {
      this.event = event;
      if (this.filePath === "") {
        this.$message({
          message: "提交失败,请选择上传文件！",
          type: "error",
          duration: 2000,
        });
        return false;
      }
       this.event.preventDefault();
      var formData = new FormData();
      formData.append("file", this.filePath);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
          // accessToken: getToken(),
        },
      };
      this.$http
        .post(
          "/api/ordersys/customerFinanceBillPackage/importPackage",
          formData,
          config
        )
        .then((res) => {
          this.$refs.clearFile.value = "";
          if (res.data.rel == true) {
            this.$notify({
              title: "成功",
              message: "导入成功",
              type: "success",
              duration: 2000,
            });
            this.dialogVisible = false;
            this.getList();
          } else {
            this.$notify({
              title: "失败",
              message: res.data.message,
              type: "error",
              duration: 2000,
            });
          }
          if (res.data.status !== 200) {
            this.$notify({
              title: "失败",
              message: res.data.message,
              type: "error",
              duration: 2000,
            });
          }
        });
    },
    downLoad() {
      let query = {
        fileType: "package",
      };
      let host = window.location.host;
      window.location.href = "//" + host + "/api/ordersys/financeFileTemplate/getTemplate?fileType=" + query.fileType;
      // })
    },
  },
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
.enterpriseStyle {
  width: 100%;
  overflow: hidden;
}
.enterpriseStyle p {
  margin: 0;
}
.enterpriseStyle ul {
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  margin-top: 10px;
  font-size: 14px;
}
.enterpriseStyle ul li {
  width: 100%;
  height: 35px;
  line-height: 35px;
}
.xhText {
  position: absolute;
  top: 9px;
  left: 10px;
  color: red;
  float: left;
}

</style>



