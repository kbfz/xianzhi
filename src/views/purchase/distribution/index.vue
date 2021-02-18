<template>
  <div class="app-container calendar-list-container"
       id="app-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="24">
        <div class="app-container-left">
          <div class="filter-container">
            <!-- <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="请输入商品条形码"
                      v-model="query.productBarcode"> </el-input> -->
            <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="请输入订单编号"
                      v-model="query.orderNo"> </el-input>
            <el-button class="filter-item"
                       type="primary"
                       v-waves
                       icon="search"
                       @click="handleFilter">查询</el-button>
            <!-- <el-button class="filter-item"
                       type="primary"
                       style="margin-left:0"
                       @click="addDiction">新增</el-button>
            <el-button class="filter-item"
                       type="primary"
                       style="margin-left:0"
                       @click="exportInfo">导入订单</el-button> -->
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
            <!-- <el-table-column width="70"
                             align="center"
                             label="序号"
                             show-overflow-tooltip
                             type="index"> -->
              <!-- <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.setDateRows}}</span>
              </template> -->
            <!-- </el-table-column> -->
            <el-table-column width="200"
                             align="center"
                             label="订单编号"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.orderNo}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120"
                             align="center"
                             label="所属平台"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.platformName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="170"
                             align="center"
                             label="商品名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.productName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120"
                             align="center"
                             label="商品条码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.productBarcode}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100"
                             align="center"
                             label="商品数量"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.productNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100"
                             align="center"
                             label="货币类型 "
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.currencyName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100"
                             align="center"
                             label="采购价"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.payTotal}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100"
                             align="center"
                             label="供货价"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.orderAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120"
                             align="center"
                             label="分销利润"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.orderProfit}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150"
                             align="center"
                             label="分销备注"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.remark}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120"
                             align="center"
                             label="回款账户"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.receiveAccount}}</span>
              </template>
            </el-table-column>
             <el-table-column width="147"
                             align="center"
                             label="订单交易时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.orderTime}}</span>
              </template>
            </el-table-column>
            <el-table-column width="147"
                             align="center"
                             label="上传时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             width="140"
                             align="center"
                             fixed="right">
              <template scope="scope">
                <el-button type="text"
                           @click="handleUpdate(scope.row)">编辑</el-button>
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
          <!--增加客户数据配置 -->
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
              <el-form-item label="所属平台:"
                            style="width:100%;margin-bottom:8px"
                            prop="platformCode"
                        >
                <el-select v-model="form.platformCode"
                       placeholder="请选择订单所属平台"
                       style="width:300px"
                       clearable>
              <el-option v-for="item in selectOrder"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
              </el-form-item>
              <span class="formUpdate">*</span>
              <el-form-item label="订单编号:"
                            style="width:100%"
                            prop="orderNo">
                <el-input v-model="form.orderNo"
                          placeholder="请输入订单编号"
                          style="width:300px"></el-input>
              </el-form-item>
              <el-form-item label="商品名称:"
                            prop="productName"
                            style="width:100%">
                <el-input v-model="form.productName"
                          placeholder="请输入商品名称"
                          style="width:300px"></el-input>
              </el-form-item>
              <el-form-item label="商品条码:"
                            style="width:100%">
                <el-input v-model="form.productBarcode"
                          placeholder="请输入商品条码"
                          style="width:300px"></el-input>
              </el-form-item>
              <el-form-item label="商品数量:"
                            style="width:100%;;margin-bottom:8px">
                <el-input v-model="form.productNumber"
                          placeholder="请输入商品数量"
                          style="width:300px"></el-input>
              </el-form-item>
              <span class="formUpdate">*</span>
              <el-form-item label="采购价:"
                            prop="payTotal"
                            style="width:100%; margin-bottom:8px">
                <el-input v-model="form.payTotal"
                          placeholder="请输入采购价"
                          style="width:300px"></el-input>
              </el-form-item>
              <span class="formUpdate">*</span>
              <el-form-item label="供货价:"
                            prop="orderAmount"
                            style="width:100%;margin-bottom:8px">
                <el-input v-model="form.orderAmount"
                          placeholder="请输入供货价"
                          style="width:300px"></el-input>
              </el-form-item>
              <span class="formUpdate">*</span>
              <el-form-item label="分销利润:"
                            prop="orderProfit"
                            style="width:100%">
                <el-input v-model="form.orderProfit"
                          placeholder="请输入分销利润"
                          style="width:300px"></el-input>
              </el-form-item>
              <el-form-item label="分销备注:"
                            style="width:100%">
                <el-input v-model="form.remark"
                          placeholder="请输入分销备注"
                          style="width:300px"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="cancel('form')">取 消</el-button>
              <el-button v-if="nameInfo == '新增分销单'"
                         type="primary"
                         @click="create('form')">确 定</el-button>
              <el-button v-else
                         type="primary"
                         @click="update('form')">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 订单批量上传导入 -->
          <el-dialog title="订单批量上传导入"
                     :visible.sync="dialogVisible"
                     :before-close="closeDialogExport"
                     :close-on-click-modal="false"
                     class="receiptWidth600">
            <el-form :model="form"
                     :rules="rules"
                     ref="form"
                     class="customerdata"
                     label-width="110px">
              <el-form-item label="所属平台："
                            style="width:100%"
                            prop="platformCode">
                <el-select placeholder="请选择已结算订单所属平台 "
                           style="width:300px"
                           v-model="formDown.platformCode"
                           filterable
                           clearable>
                  <el-option v-for="item in selectOrder"
                             :key="item.value"
                             :value="item.value"
                             :label="item.label"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="分销结算订单:">
                <div class="w85">
                  <h5>1.下载模板</h5>
                  <a :href="href"
                     target="_blank"><span class="exportSpan">《分销结算订单模板》</span></a>
                </div>
                <div class="w85">
                  <h5 style="margin-bottom: 13px">2.填写模板并导入</h5>
                  <input type="file"
                     ref="clearFile"
                     accept=".xls,.xlsx"
                     name="file"
                     class="noneborder"
                     @change="getFile($event)" />
                  <!-- <el-upload ref="uploadExcel"
                             :action="uploadUrls.excelUrl"
                             :headers="accessToken"
                             :file-list="uploadUrls.excelFileList"
                             :on-success="uploadExcelSuccess"
                             :on-error="uploadExcelError"
                             :before-upload="checkExcelFile"
                             accept=".xlsx,.xls"
                             :auto-upload="true">
                    <el-button slot="trigger"
                               size="small"
                               style="margin-top: -10px"
                               type="primary">上传分销结算订单</el-button>
                  </el-upload> -->
                </div>
              </el-form-item>
              <p class="notecss w85"
                 style="margin-top:15px">

                注意：<br>

                1.数据条数不超过500条，文件大小不超过3M。<br>

                2.每个平台订单号需确保唯一性。<br>

              </p>
            </el-form>

            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="cancelExport">取 消</el-button>
              <el-button type="primary"
                         @click="exportSave">确定</el-button>
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
  retailPage,
  orderObj,
  addObj,
  getObj,
  setInfo,
  delObj
} from "api/purchase/settlement/index";
import { mapGetters } from "vuex";
import $ from "jquery";
import { getToken } from 'utils/auth';
var dateUtils = require("silly-datetime");
import axios from "axios";
Vue.prototype.$http = axios;
export default {
  name: "distribution",
  components: {
    // 引入编辑的组件
    // "contrast-status": () => import("./components/contrastStatus.vue")
  },
  data () {
    return {
      // listLoading: true,
      total: 0,
      loading: {
        tableLoading: false
      },
      list: [],
      listQuery: {
        page: 1,
        limit: 10,
      },
      query: {
        orderNo: ''
      },
      nameInfo: '',
      form: {
        id: '',
        orderNo: '',
        productName: '',
        payTotal: '',
        orderAmount: '',
        orderProfit:'',
        remark:'',
        platformCode:'',
        productNumber:'',
        productBarcode:''
      },
      formDown:{
        filePath: '',
        platformCode:''
      },
      selectOrder: [],
      dialogFormVisible: false,
      dialogVisible: false,
      // 上传
      // uploadUrls: {
      //   // excelUrl: importDataUrl,
      //   excelUrl: '',
      //   excelFileList: []
      // },
      href: '',
      rules: {
        // cusCbeName: [
        //   {
        //     required: true,
        //     message: '请选择所属客户',
        //     trigger: 'change',
        //   }
        // ],
        // billTypeName: [
        //   {
        //     required: true,
        //     message: '请选择账单类型',
        //     trigger: 'change'
        //   }
        // ],
        // exportDateRows: [
        //   {
        //     required: true,
        //     message: '请选择月账期模式',
        //     trigger: 'change'
        //   }
        // ],
        // setDateRows: [
        //   {
        //     required: true,
        //     message: '请选择时间',
        //     trigger: 'change'
        //   }
        // ]
      },
    };
  },
  created () {
    this.getList();
    this.orderNameInfo();
    this.downLoad()

  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"]),
  },
  methods: {
    getList () {
      this.loading.tableLoading = true;
      let param = {
        orderNo: this.query.orderNo,
        ...this.listQuery
      };
      retailPage(param).then(response => {
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
        // 获取订单平台
    orderNameInfo () {
      let param = {
        templateType:1
      }
      orderObj(param).then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let nameObj = {}
          nameObj.label = response.data[i].templateName
          nameObj.value = response.data[i].platformCode
          this.selectOrder.push(nameObj)
        }
      })
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
      this.nameInfo = '新增分销单'
      this.dialogFormVisible = true
      // this.hide = false
    },
    //编辑
    handleUpdate (row) {
      this.formEdit = true;
      let self = this
      getObj(row.id).then(response => {
        self.form = response.data;
        this.dialogFormVisible = true
        this.nameInfo = "编辑分销单"
      });
    },
    update (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          let nForm = {
            id: this.form.id,
            orderNo: this.form.orderNo,
            productName: this.form.productName,
            orderAmount: this.form.orderAmount,
            payTotal: this.form.payTotal,
            orderProfit:this.form.orderProfit,
            remark:this.form.remark,
            platformCode:this.form.platformCode,
            productNumber:this.form.productNumber,
            productBarcode:this.form.productBarcode,
            orderType:1
          }
          if (!nForm.platformCode) {
            this.$message({
              message: "所属平台不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          if (!nForm.orderNo) {
            this.$message({
              message: "订单编号不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          // if (!nForm.productName) {
          //   this.$notify({
          //     title: "提示",
          //     message: "商品名称不能为空！",
          //     type: "error",
          //     duration: 2000
          //   });
          //   return false
          // }
          if (!nForm.payTotal) {
            this.$message({
              message: "采购价不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
           let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
             if (nForm.productNumber && reg.test(nForm.productNumber) === false) {
            this.$message({
              message: "商品数量只能为数字且不能为负数！",
              type: 'error',
              duration: 2000
            });
            return false;
          }
          if (reg.test(nForm.payTotal) === false) {
            this.$message({
              message: "采购价只能为数字且不能为负数！",
              type: 'error',
              duration: 2000
            });
            return false;
          }
          if (!nForm.orderAmount) {
            this.$message({
              message: "供货价不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          if (reg.test(nForm.orderAmount) === false) {
            this.$message({
              message: "供货价只能为数字且不能为负数！",
              type: 'error',
              duration: 2000
            });
            return false;
          }
          if (!nForm.orderProfit) {
            this.$message({
              message: "分销利润不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          if (reg.test(nForm.orderProfit) === false) {
            this.$message({
              message: "分销利润只能为数字且不能为负数！",
              type: 'error',
              duration: 2000
            });
            return false;
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
          let nForm = {
            orderNo: this.form.orderNo,
            productName: this.form.productName,
            orderAmount: this.form.orderAmount,
            payTotal: this.form.payTotal,
            orderProfit:this.form.orderProfit,
            remark:this.form.remark,
            platformCode:this.form.platformCode,
            productNumber:this.form.productNumber,
            productBarcode:this.form.productBarcode,
            orderType:1
          }
          if (!nForm.platformCode) {
            this.$message({
              message: "所属平台不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          if (!nForm.orderNo) {
            this.$message({
              message: "订单编号不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          // if (!nForm.productName) {
          //   this.$notify({
          //     title: "提示",
          //     message: "商品名称不能为空！",
          //     type: "error",
          //     duration: 2000
          //   });
          //   return false
          // }
          let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
           if (nForm.productNumber && reg.test(nForm.productNumber) === false) {
            this.$message({
              message: "商品数量只能为数字且不能为负数！",
              type: 'error',
              duration: 2000
            });
            return false;
          }
          if (!nForm.payTotal) {
            this.$message({
              message: "采购价不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          if (reg.test(nForm.payTotal) === false) {
            this.$message({
              message: "采购价只能为数字且不能为负数！",
              type: 'error',
              duration: 2000
            });
            return false;
          }
          if (!nForm.orderAmount) {
            this.$message({
              message: "供货价不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          if (reg.test(nForm.orderAmount) === false) {
            this.$message({
              message: "供货价只能为数字且不能为负数！",
              type: 'error',
              duration: 2000
            });
            return false;
          }
          
          if (!nForm.orderProfit) {
            this.$message({
              message: "分销利润不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          if (reg.test(nForm.orderProfit) === false) {
            this.$message({
              message: "分销利润只能为数字且不能为负数！",
              type: 'error',
              duration: 2000
            });
            return false;
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
    getFile (event) {
      this.formDown.filePath = event.target.files[0];
    },
    //上传清单
    closeDialogExport () {
      this.dialogVisible = false;
    },
    exportInfo () {
      this.formDown.filePath = ''
      this.formDown.platformCode=''
      this.dialogVisible = true;
    },
    // 下载文件
    downLoad () {
        let host = window.location.host
        this.href = '//' + host + '/api/ordersys/saleOrderItems/downloadRetail'
    },
    exportSave () {
      if (this.formDown.filePath === '') {
        this.$message({
          message: "提交失败,请选择上传文件！",
          type: 'error',
          duration: 2000
        });
        return false;
      }
      if (this.formDown.platformCode === '') {
        this.$message({
          message: "提交失败,请选择所属平台！",
          type: 'error',
          duration: 2000
        });
        return false;
      }
      this.event = event;
      this.event.preventDefault();
      var formData = new FormData();
      formData.append("file", this.formDown.filePath);
      formData.append("platformCode", this.formDown.platformCode);
      formData.append("orderType", 1);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          'accessToken': getToken()
        }
      };
      this.$http
        .post("/api/ordersys/saleOrderItems/import", formData, config)
        .then(res => {
          
          this.$refs.clearFile.value = "";
          // if (res.rel) {
          if (res.data.rel == true) {
            this.$notify({
              title: "成功",
              message: "导入成功",
              type: "success",
              duration: 2000
            });
            this.dialogVisible = false;
            this.getList()
          }else {
            this.$notify({
              title: "失败",
              message: res.data.message,
              type: "error",
              duration: 2000
            });
          }
          if (res.data.status !== 200) {
            this.$notify({
              title: "失败",
              message: res.data.message,
              type: "error",
              duration: 2000
            });
          }
      })
    },
    cancelExport () {
      this.dialogVisible = false;
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
        orderNo: '',
        productName: '',
        orderAmount: '',
        purchaseAmount: '',
        orderProfit:'',
        remark:'',
        platformCode:'',
        productNumber:'',
        productBarcode:''
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
  font-size: 13px !important;
  color: #9eb1c6;
}
.w85 {
  width: 100%;
  margin: 0 auto;
  margin: -10px auto 0;
  line-height: 20px;
  // font-size: 16px;
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
  left: 30px;
  color: red;
}
</style>



