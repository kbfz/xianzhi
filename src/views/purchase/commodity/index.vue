<template>
  <div class="app-container calendar-list-container" id="app-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="24">
        <div class="app-container-left">
          <div class="filter-container">
            <el-input
              @keyup.enter.native="handleFilter"
              style="width: 200px;"
              class="filter-item"
              placeholder="请输入采购单编号"
              v-model="query.purchaseNo"
            ></el-input>
            <el-date-picker
              type="daterange"
              placeholder="请选择来货日期"
              style="width: 330px;"
              class="filter-item"
              @keyup.enter.native="handleFilter"
              range-separator=" ~ "
              popper-class="timeSelect"
              v-model="query.purchaseTimes"
            ></el-date-picker>
            <el-select
              v-model="query.isPayed"
              placeholder="请选择是否已付款"
              @keyup.enter.native="handleFilter"
              class="filter-item"
              popper-class="optionsContent"
              clearable
            >
              <el-option
                v-for="item in selectStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button
              class="filter-item"
              type="primary"
              v-waves
              icon="search"
              @click="handleFilter"
            >查询</el-button>
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
            @row-click="detailName"
          >
            <el-table-column align="center" type="expand">
              <template scope="scope">
                <el-table
                  border
                  style="width: 84.3%"
                  :data="scope.row.childrenList"
                  v-loading="loading.childrenLoading"
                  element-loading-text="正在加载中......"
                  id="tableCenter"
                >
                  <el-table-column label="序号" width="70" align="center" type="index"></el-table-column>
                  <el-table-column
                    label="商品条码"
                    width="210"
                    align="center"
                    show-overflow-tooltip
                    prop="productBarcode"
                  ></el-table-column>
                  <el-table-column
                    label="商品名称"
                    width="182"
                    align="center"
                    prop="productName"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="到货数量"
                    width="120"
                    align="center"
                    show-overflow-tooltip
                    prop="productQuantity"
                  ></el-table-column>
                  <!-- <el-table-column label="货币类型"
                                   width="100"
                                   align="center"
                                   prop="currencyName"
                                   show-overflow-tooltip>
                  </el-table-column>-->
                  <el-table-column
                    label="单价"
                    width="120"
                    align="center"
                    prop="productPrice"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="总价"
                    width="122"
                    align="center"
                    prop="productAmount"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="库存"
                    width="120"
                    align="center"
                    prop="stockQuantity"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="上传时间"
                    width="180"
                    align="center"
                    prop="createTime"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="备注"
                    width="256"
                    align="center"
                    prop="remark"
                    show-overflow-tooltip
                  ></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column width="210" align="center" label="采购单编号" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.purchaseNo}}</span>
              </template>
            </el-table-column>
            <el-table-column width="170" align="center" label="来货日期" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.purchaseTime}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100" align="center" label="货币类型" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.currencyName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120" align="center" label="申请金额" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.applyAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column width="133" align="center" label="来货总价" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.purchaseAmount}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column width="100"
                             align="center"
                             label="结转费"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.carryoverCost}}</span>
              </template>
            </el-table-column>-->
            <el-table-column width="120" align="center" label="到货总数量" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.purchaseQuantity}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100" align="center" label="总库存" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.stockQuantity}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120" align="center" label="采购单类型" show-overflow-tooltip>
              <template scope="scope">
                <span v-if="scope.row.purchaseType === 0">款到发货</span>
                <span v-if="scope.row.purchaseType === 1">以销待结</span>
              </template>
            </el-table-column>
            <el-table-column width="130" align="center" label="内容备注" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.remark}}</span>
              </template>
            </el-table-column>
            <el-table-column width="118" align="center" label="采购单状态" show-overflow-tooltip>
              <template scope="scope">
                <span v-if="scope.row.purchaseStatus === 0">待付款</span>
                <span v-if="scope.row.purchaseStatus === 1">已付款</span>
                <span v-if="scope.row.purchaseStatus === 2">进行中</span>
                <span v-if="scope.row.purchaseStatus === 3">已完成</span>
              </template>
            </el-table-column>
            <el-table-column width="138" align="center" label="付款单金额" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.payAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column width="118" align="center" label="打款凭证" show-overflow-tooltip>
              <template scope="scope">
                <a v-if="!scope.row.payCert">
                  <span style="cursor: pointer;">--</span>
                </a>
                <a v-else v-bind:href="scope.row.payCert" target="_blank">
                  <span style="cursor: pointer; color:#20a0ff">查看附件</span>
                </a>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190" align="center" fixed="right">
              <template scope="scope">
                <el-button type="text" @click="handleUpdate(scope.row)">编辑</el-button>
                <el-button type="text" @click="texDetail(scope.row)">查看详情</el-button>
                <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
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
          <!-- 上传凭证 -->
          <el-dialog
            title="编辑采购单"
            :visible.sync="dialogFormVisible"
            :close-on-click-modal="false"
            class="receiptWidth590 logisticsWidth"
          >
            <el-form :model="form" ref="form" label-width="139px" class="serviceForm">
              <!-- <el-form-item label="结转费:">
                <el-input v-model="form.carryoverCost"
                          style="width: 200px;"
                          placeholder="输入结转费"></el-input>
              </el-form-item>-->
              <el-form-item label="货币类型：" style="width:100%" prop="currency">
                <el-select
                  placeholder="请选择货币类型"
                  style="width:200px"
                  v-model="form.currency"
                  filterable
                  clearable
                  :disabled="currDisabled"
                >
                  <el-option
                    v-for="item in selectCurrency"
                    :key="item"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
              <span class="formUpdate" v-if="form.currency !== 'RMB'" style="left:85px">*</span>
              <el-form-item label="汇率:" v-if="form.currency !== 'RMB'">
                <el-input v-model="form.currencyRates" style="width: 200px;" placeholder="输入汇率"></el-input>
                <span class="addText">请保留小数点后四位，例如：10000.0000</span>
              </el-form-item>
              <span class="formUpdate">*</span>
              <el-form-item label="付款单金额:">
                <el-input v-model="form.payAmount" style="width: 200px;" placeholder="输入付款单金额"></el-input>
              </el-form-item>
              <span class="formUpdate" style="left:55px">*</span>
              <el-form-item label="打款凭证:">
                <!-- {{form.payCert}} -->
                <el-upload
                  class="avatar-uploader"
                  :action="imageUrl"
                  :show-file-list="false"
                  :multiple="true"
                  :auto-upload="true"
                  :on-success="handleSuccess"
                  :before-upload="handleBefore"
                  :on-error="handleError"
                >
                  <!-- {{form.payCert}} -->
                  <img v-if="form.payCert" :src="form.payCert" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <!-- <el-upload class="avatar-uploader"
                           style="margin-left: 28px"
                           :action="imageUrl"
                           :show-file-list="false"
                           :multiple="true"
                           :auto-upload="true"
                           :on-success="handleSuccess"
                           :before-upload="handleBefore"
                           :on-error="handleError">
                  <img v-if="form.payCert"
                       :src="form.payCert"
                       class="avatar">
                  <i v-else
                     class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>-->
              </el-form-item>
              <p class="notecss">
                注意：
                <br />1.付款单金额和上传凭证由财务上传。
                <br />2.针对以销待结业务，采销需将付款单标记为以销待结。
                <br />
              </p>
            </el-form>
            <div slot="footer" class="footer">
              <el-button @click="cancel('form')">取 消</el-button>
              <el-button type="primary" @click="update('form')">确认</el-button>
            </div>
          </el-dialog>
          <!-- </div> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  page,
  childPage,
  addObj,
  setInfo,
  getObj,
  addDownLoad,
  addUpload,
  delObj,
  ImgExportUrl,
  submitPay,
  currencyObj
} from "api/purchase/application/index";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
import { getToken } from "utils/auth";
export default {
  name: "commodity",
  components: {
    // 引入编辑的组件
    // "contrast-status": () => import("./components/contrastStatus.vue")
  },
  data() {
    return {
      total: 0,
      currDisabled: false,
      selectCurrency: [],
      loading: {
        tableLoading: false,
        childrenLoading: false
      },
      list: [{ childrenList: [] }],
      listQuery: {
        _type_: "equal",
        page: 1,
        limit: 10
      },
      query: {
        purchaseNo: "",
        isPayed: "",
        purchaseTimes: ""
      },
      imageUrl: ImgExportUrl,
      form: {
        id: "",
        payAmount: "",
        payCert: "",
        currency: "",
        currencyRates: ""
        // carryoverCost
      },
      selectStatus: [
        {
          value: 0,
          label: "未付款"
        },
        {
          value: 1,
          label: "已付款"
        }
      ],
      dialogFormVisible: false,

      rules: {
        purchaseType: [
          {
            required: true,
            message: "请选择采购单类型"
            // trigger: 'change'
          }
        ],
        currency: [
          {
            required: true,
            message: "请选择货币类型"
            // trigger: 'change'
          }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.currencyNameInfo();
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
  methods: {
    // 币种下拉
    currencyNameInfo() {
      let param = {
        type: "AMT"
      };
      currencyObj(param).then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let nameObj = {};
          nameObj.label = response.data[i].name;
          nameObj.value = response.data[i].code;
          this.selectCurrency.push(nameObj);
        }
      });
    },
    getList() {
      this.loading.tableLoading = true;
      let param = {
        purchaseNo: this.query.purchaseNo,
        isPayed: this.query.isPayed,
        purchaseTimes: this.query.purchaseTimes,
        ...this.listQuery
      };
      if (param.purchaseTimes !== "") {
        var start =
          param.purchaseTimes[0] === null
            ? null
            : dateUtils.format(param.purchaseTimes[0], "YYYY.MM.DD");
        var end =
          param.purchaseTimes[1] === null
            ? null
            : dateUtils.format(param.purchaseTimes[1], "YYYY.MM.DD");
        param.purchaseTimes = `${start}～${end}`;
      }
      if (param.purchaseTimes == "null～null") {
        param.purchaseTimes = "";
      }
      page(param).then(response => {
        for (var i = 0; i < response.data.rows.length; i++) {
          response.data.rows[i].childrenList = [];
        }
        this.list = response.data.rows;
        this.total = response.data.total;
        this.loading.tableLoading = false;
      });
    },
    // 查看详情
    detailName(row) {
      this.loading.childrenLoading = true;
      let param = {
        purchaseNo: row.purchaseNo
      };
      childPage(param).then(response => {
        row.childrenList = response.data;
        this.loading.childrenLoading = false;
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

    // 关闭按钮
    closeDialog() {
      this.dialogFormVisible = false;
      // this.$refs['form'].resetFields()
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      // const set = this.$refs;
      // set[formName].resetFields();
    },
    //  上传图片
    handleSuccess(response, file) {
      if (response.status === undefined || response.status !== 200) {
        this.$alert(response.msg, "图片上传失败");
        return;
      } else {
        // debugger
        this.$set(this.form, "payCert", response.data);
        // this.form.payCert = response.data;
      }
    },
    handleError(err, file) {
      this.$message({
        title: "error",
        message: err
      });
      console.log(err);
    },
    handleBefore(file) {
      return true;
      const imgPng = file.type === "image/png";
      const imgJpeg = file.type === "image/jpeg";
      const imgSize = file.size / 1024 / 1024 < 2;
      if (!imgPng && !imgJpeg) {
        this.$message.error("图片上传格式不对");
      }
      if (!imgSize) {
        this.$message.error("图片大小不能超过2M");
      }
      return (imgJpeg || imgPng) && imgSize;
    },
    //编辑
    handleUpdate(row) {
      this.resetFields();
      let self = this;
      this.dialogFormVisible = true;
      getObj(row.id).then(response => {
        self.form = response.data;
        // self.form.carryoverCost = row.carryoverCost;
        // self.form.currency = row.currency;
        // self.form.currencyRates = response.data.currencyRates
        if (response.data.currency) {
          this.currDisabled = true;
        } else {
          this.currDisabled = false;
        }
      });
    },
    update(formName) {
      const set = this.$refs;
      let nForm = {};
      if (this.form.currency == "RMB") {
        nForm = {
          id: this.form.id,
          payAmount: this.form.payAmount,
          payCert: this.form.payCert,
          // carryoverCost: this.form.carryoverCost,
          currency: this.form.currency
        };
      } else {
        nForm = {
          id: this.form.id,
          payAmount: this.form.payAmount,
          payCert: this.form.payCert,
          // carryoverCost: this.form.carryoverCost,
          currency: this.form.currency,
          currencyRates: this.form.currencyRates
        };
      }
      if (this.form.currency != "RMB") {
        if (!nForm.currencyRates) {
          this.$message({
            message: "汇率不能为空！",
            type: "error",
            duration: 2000
          });
          return false;
        }
        let reg = /^\d+(\.\d{4})?$/;
        let reg2 = /.*\..*/;
        if (
          reg.test(nForm.currencyRates) === false ||
          reg2.test(nForm.currencyRates) === false
        ) {
          this.$message({
            message: "汇率格式错误！",
            type: "error",
            duration: 2000
          });
          return false;
        }
      }
      if (!nForm.payAmount) {
        this.$message({
          message: "付款单金额不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      let reg3 = /^\d+$|^\d+[.]?\d+$/
      if (
        reg3.test(nForm.payAmount) === false
      ) {
        this.$message({
          message: "付款单金额只能为数字！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (!nForm.payCert) {
        this.$message({
          message: "提交失败,请上传打款凭证！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      // if (nForm.carryoverCost) {
      //   if (reg.test(nForm.carryoverCost) === false) {
      //     this.$message({
      //       message: "提交失败,付款单金额格式错误！",
      //       type: "error",
      //       duration: 2000
      //     });
      //     return false;
      //   }
      // }

      submitPay(nForm).then(response => {
        if (response.rel == true) {
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
      });
    },

    //删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj(row.id)
          .then(res => {
            if (res.rel == true) {
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
                duration: 2000
              });
              const index = this.list.indexOf(row);
              this.list.splice(index, 1);
            } else {
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
          })
          .catch(() => {});
      });
    },

    // 解析成功 跳转详情页
    texDetail(row) {
      let self = this;
      window.sessionStorage.setItem("purchaseNo", "");
      window.sessionStorage.setItem("purchaseNo", row.purchaseNo);
      window.sessionStorage.setItem("id", row.id);
      window.sessionStorage.setItem("roleId", 2);
      self.$router.push("/index/purchase/applicationDetail");
    },
    resetFields() {
      this.form = {
        payAmount: "",
        payCert: "",
        carryoverCost: "",
        currency: "",
        currencyRates: ""
      };
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
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #bfcbd9;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.formUpdate {
  display: inline-block;
  position: relative;
  top: 27px;
  left: 41px;
  color: red;
}
.el-form-item {
  margin-bottom: 0px;
}
.addText {
  display: block;
  font-size: 12px;
  margin-bottom: -15px;
  color: #999;
}
</style>



