<template>
  <div class="app-container calendar-list-container" id="app-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="24">
        <div class="app-container-left">
          <div class="filter-container">
            <el-select
              v-model="query.platformCode"
              placeholder="请选择所属平台"
              @keyup.enter.native="getList"
              class="filter-item"
              popper-class="optionsContent"
              clearable
            >
              <el-option
                v-for="item in selectOrder"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
              <el-input @keyup.enter.native="getList"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="请输入结算单编号"
                      v-model="query.settleNo"> </el-input>
            <el-button class="filter-item" type="primary" v-waves icon="search" @click="getList">查询</el-button>
            <el-button class="filter-item" type="primary" v-waves @click="addStatement">新增分销结算单</el-button>
            <el-badge :value="dataArr.length">
              <el-button
                class="filter-item"
                type="primary"
                style="margin-left: 10px;"
                v-waves
                @click="handleFilter"
                :disabled="dataArr.length == 0"
              >提交</el-button>
            </el-badge>
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
            @selection-change="chooseData"
            @expand="tableClick"
          >
            <el-table-column type="selection" width="55" :selectable="selectBox"></el-table-column>
            <el-table-column align="center" type="expand">
              <template scope="scope">
                <el-table
                  border
                  style="width:66%"
                  :data="scope.row.childrenList"
                  v-loading="loading.childrenLoading"
                  element-loading-text="正在加载中......"
                  id="tableCenter"
                >
                  <el-table-column label="序号" width="70" align="center" type="index"></el-table-column>
                  <el-table-column
                    label="订单编号"
                    width="150"
                    align="center"
                    show-overflow-tooltip
                    prop="orderNo"
                  ></el-table-column>
                  <el-table-column
                    label="商品名称"
                    width="150"
                    align="center"
                    show-overflow-tooltip
                    prop="productName"
                  ></el-table-column>
                  <el-table-column
                    label="商品条码"
                    width="100"
                    align="center"
                    show-overflow-tooltip
                    prop="productBarcode"
                  ></el-table-column>
                  <el-table-column
                    label="商品数量"
                    width="100"
                    align="center"
                    show-overflow-tooltip
                    prop="productNumber"
                  ></el-table-column>
                  <el-table-column
                    label="采购价"
                    width="100"
                    align="center"
                    prop="payTotal"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="供货价"
                    width="100"
                    align="center"
                    prop="orderAmount"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="分销利润"
                    width="100"
                    align="center"
                    prop="orderProfit"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="分销备注"
                    width="120"
                    align="center"
                    prop="remark"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="订单交易时间"
                    width="173"
                    align="center"
                    prop="orderTime"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="上传时间"
                    width="160"
                    align="center"
                    prop="createTime"
                    show-overflow-tooltip
                  ></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column width="210" align="center" label="结算单编号" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.settleNo}}</span>
              </template>
            </el-table-column>
            <el-table-column width="170" align="center" label="提现时间" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.settleTime}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150" align="center" label="所属平台" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.platformName}}</span>
              </template>
            </el-table-column>
              <el-table-column width="118" align="center" label="回款账户" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.receiveAccount}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120" align="center" label="货币类型" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.currencyName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="133" align="center" label="订单总收入" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.orderAmountTotal}}</span>
              </template>
            </el-table-column>
            <el-table-column width="133" align="center" label="平台总支出" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.payTotal}}</span>
              </template>
            </el-table-column>
             <el-table-column width="100" align="center" label="其他扣款" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.couponAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120" align="center" label="回款总额" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.returnAmount}}</span>
              </template>
            </el-table-column>
          
              <el-table-column width="120" align="center" label="回款凭证" show-overflow-tooltip>
              <template scope="scope">
                 <el-button type="text" v-if="scope.row.returnCert" @click="lookImg(scope.row)">查看凭证</el-button>
                <el-button type="text" v-else @click="uploadImg(scope.row)">上传凭证</el-button>
              </template>
            </el-table-column>
            <el-table-column width="133" align="center" label="订单总利润" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.orderProfitTotal}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column width="120" align="center" label="提现手续费" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.cashoutAmount}}</span>
              </template>
            </el-table-column> -->
           
            <el-table-column width="118" align="center" label="结算单状态" show-overflow-tooltip>
              <template scope="scope">
                <span v-if="scope.row.settleStatus === '0'">未提交</span>
                <span v-if="scope.row.settleStatus === '1'">已提交</span>
                <span v-if="scope.row.settleStatus === '2'">已确认</span>
              </template>
            </el-table-column>
            <el-table-column width="170" align="center" label="创建时间" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="210" align="center" fixed="right">
              <template scope="scope">
                <el-button type="text" @click="handleUpdate(scope.row)" :disabled="scope.row.settleStatus === '2'">编辑</el-button>

                <el-button type="text" @click="handleDelete(scope.row)" :disabled="scope.row.settleStatus === '2'">删除</el-button>
                <el-button type="text" @click="uploadDetail(scope.row)" :disabled="scope.row.settleStatus === '2'">上传结算明细</el-button>
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
          <!-- 新增结算单 -->
          <el-dialog
            :title="titleName"
            :visible.sync="dialogFormStatement"
            :before-close="closeDialog"
            :close-on-click-modal="false"
            class="receiptWidth600 logisticsWidth"
          >
            <el-form :model="form" ref="form" label-width="150px" class="serviceForm">
              <span class="formUpdate">*</span>
              <el-form-item label="所属平台:" style="width:100%" prop="currency">
                <el-select
                  placeholder="请选择结算单所属平台"
                  style="width:300px"
                  v-model="form.platformCode"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="item in selectOrder"
                    :key="item"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
              <span class="formUpdate">*</span>
              <el-form-item label="货币类型:" style="width:100%" prop="currency">
                <el-select
                  placeholder="请选择货币类型"
                  style="width:300px"
                  v-model="form.currency"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="item in selectCurrency"
                    :key="item"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
              <span class="formUpdate">*</span>
              <el-form-item label="提现时间:">
                <el-date-picker
                  v-model="form.settleTime"
                  type="date"
                  placeholder="选择日期"
                  style="width: 300px;"
                ></el-date-picker>
              </el-form-item>
              <!-- <span class="formUpdate">*</span>
              <el-form-item label="提现手续费:" >
                <el-input v-model="form.cashoutAmount" style="width: 300px;" placeholder="输入提现手续费"></el-input>
              </el-form-item> -->
              <span class="formUpdate">*</span>
              <el-form-item label="回款总额:" style="margin-bottom: 20px">
                <el-input v-model="form.returnAmount" style="width: 300px;" placeholder="输入回款总额"></el-input>
              </el-form-item>
              <el-form-item label="其他扣款:">
                <el-input v-model="form.couponAmount" style="width: 300px;" placeholder="输入其他扣款"></el-input>
              </el-form-item>
              
            </el-form>
            <div style="margin-left: 70px" class="notecss">
              <p>注意：</p>
              <p>1.数据条数不超过500条，文件大小不超过3M</p>
              <p>2.货币类型以提现时所需货币类型为准</p>
            </div>
            <div slot="footer" class="footer">
              <el-button @click="closeDialog">取 消</el-button>
              <!-- 编辑确定 -->
              <el-button type="primary" @click="update('form')" v-if="titleName == '编辑分销结算单'">确定</el-button>
              <!-- 新增确定 -->
              <el-button type="primary" @click="addForm('form')" v-if="titleName == '新增分销结算单'">确定</el-button>
            </div>
          </el-dialog>
          <!-- 上传凭证 -->
           <el-dialog
      title="回款凭证"
      :visible.sync="dialogVisibleImg"
      :before-close="closeDialogExportImg"
      :close-on-click-modal="false"
      class="receiptWidth450"
    >
      <el-upload
        class="avatar-uploader"
        :action="imageUrl"
        :headers="accessToken"
        :show-file-list="false"
        :multiple="true"
        :auto-upload="true"
        :on-success="handleSuccess"
        :before-upload="handleBefore"
        :on-error="handleError"
        style="margin-left:100px"
      >
        <img v-if="formImg.payProof" :src="formImg.payProof" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
        <div slot="footer"
           class="dialog-footer center">
        <el-button @click="closeDialogExportImg">取消</el-button>
        <el-button type="primary"
        v-if="uploadFirst"
                   @click="sumbitAddForm"
                   >上传</el-button>
        <el-button type="primary"
        v-if="alginUpload"
                   @click="sumbitAddForm"
                  >重新上传</el-button>

      </div>
    </el-dialog>
          <!-- 上传结算单 -->
          <el-dialog
            title="上传分销单"
            :visible.sync="dialogVisible"
            :before-close="closeDialogExport"
            :close-on-click-modal="false"
            class="receiptWidth600"
          >
            <el-form class="customerdata" label-width="110px" :model="uploadForm">
              <el-form-item label="所属平台：" style="width:100%">
                <el-select
                  placeholder="请选择已结算订单所属平台 "
                  style="width:300px"
                  v-model="uploadForm.platformCode"
                  filterable
                  disabled
                  clearable
                >
                  <el-option
                    v-for="item in selectOrder"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="结算明细：" style="width:100%">
                <div class="w85">
                  <h5>1.下载模板</h5>
                  <a :href="href">
                    <span class="exportSpan">《分销结算订单模板》</span>
                  </a>
                </div>
                <div class="w85">
                  <h5 style="margin-bottom: 13px">2.填写模板并导入</h5>
                  <!-- <div class="w85" style="margin-top: 8px"> -->
                  <input
                    type="file"
                    ref="clearFile"
                    accept=".xls, .xlsx"
                    name="file"
                    class="noneborder"
                    @change="getFile($event)"
                  />
                </div>
              </el-form-item>
            </el-form>
            <p class="notecss w85" style="margin-top:15px">
              注意：
              <br />1.数据条数不超过500条，文件大小不超过3M。
              <br />2.每个平台订单号需确保唯一性
            </p>

            <div slot="footer" class="dialog-footer">
              <el-button @click="closeDialogExport">取 消</el-button>
              <el-button type="primary" @click="exportSave($event)">上传</el-button>
            </div>
          </el-dialog>
          <!-- </div> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { currencyObj } from "api/purchase/application/index";
import {
  page,
  orderObj,
  childPage,
  addObj,
  getDetail,
  updateObj,
  delObj,
  submitObj,
  addDownLoad,
  orderImgExportUrl
} from "api/purchase/statement/index";
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
      titleName: "新增分销结算单",
      total: 0,
      currDisabled: false,
      selectCurrency: [],
      selectOrder: [],
      loading: {
        tableLoading: false,
        childrenLoading: false
      },
      list: [],
      listQuery: {
        _type_: "equal",
        page: 1,
        limit: 10
      },
      query: {
        platformCode: "",
        settleNo:''
      },
      uploadForm: {
        id: "",
        platformName: "",
        filePath: ""
      },
      href: addDownLoad,
      form: {
        id: "",
        returnAmount: "",
        // cashoutAmount: "",
        settleTime: "",
        couponAmount: "",
        currency: "",
        platformCode: ""
      },
      selectStatus: [],
      dialogVisible: false,
      dialogVisibleImg: false,
      dialogFormStatement: false,
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
      },
      dataArr: [],
          imageUrl: orderImgExportUrl,
            accessToken: {
        accessToken: getToken()
      },
       formImg: {
         payProof: '',
         id: ''
      },
       uploadFirst: false,
      alginUpload: false
    };
  },
  created() {
    this.getList();
    this.currencyNameInfo();
    this.orderNameInfo();
    this.downLoad();
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
    // 下载模板
    downLoad() {
      addDownLoad().then(res => {
        let host = window.location.host;
        this.href = "//" + host + "/api/ordersys/saleOrderItems/downloadRetail";
      });
    },
    // 获取订单平台
    orderNameInfo() {
      let param = {
        templateType: 1
      };
      orderObj(param).then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let nameObj = {};
          nameObj.label = response.data[i].templateName;
          nameObj.value = response.data[i].platformCode;
          this.selectOrder.push(nameObj);
        }
      });
    },
    getList() {
      this.loading.tableLoading = true;
      let param = {
        platformCode: this.query.platformCode,
        settleNo: this.query.settleNo,
        settleType: 1,
        ...this.listQuery
      };
      page(param).then(response => {
        if (response.rel) {
          for (var i = 0; i < response.data.rows.length; i++) {
            response.data.rows[i].childrenList = [];
          }
          this.list = response.data.rows;
          this.total = response.data.total;
          this.loading.tableLoading = false;
        }
      });
    },
    // 查看详情
    // detailName(row) {
    //   this.loading.childrenLoading = true;
    //   let param = {
    //     settleId: row.id
    //   };
    //   childPage(param).then(response => {
    //     row.childrenList = response.data;
    //     this.loading.childrenLoading = false;
    //   });
    // },
    // 点击获取子表
    tableClick(row, expanded) {
      if (expanded === true) {
        this.loading.childrenLoading = true;
        let param = {
          settleId: row.id
        };
        childPage(param).then(response => {
          this.loading.childrenLoading = false;
          row.childrenList = response.data;
        });
      } else {
      }
    },
    // 勾选数据
    chooseData(val) {
      this.dataArr = val;
    },
    selectBox(row) {
      if (row.settleStatus == "1" || row.settleStatus == "2") {
        return false;
      } else {
        return true;
      }
    },
    handleFilter() {
      if (this.dataArr.length === 0) {
        this.$message({
          message: "请选择需要提交的订单",
          type: "error"
        });
        return;
      }
      for(var i= 0;i<this.dataArr.length; i++){
       if (!this.dataArr[i].returnCert) {
        this.$message({
          message: "请上传回款凭证",
          type: "error"
        });
        return;
      }
      }
      this.$confirm("确认要提交所选择的数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let ids = [];
          this.dataArr.forEach((item, index) => {
            ids.push(item.id);
          });
          let params = { ids: ids }; // 删除
          submitObj(params).then(res => {
            this.loading.tableLoading = false;
            if (res.rel) {
              this.$notify({
                title: "成功",
                message: "提交成功",
                type: "success",
                duration: 2000
              });
              this.dataArr = [];
              this.getList(); // 重新加载table数据
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
              this.dataArr = [];
            }
          });
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    //    新增结算单
    addStatement() {
      this.dialogFormStatement = true;
      this.titleName = "新增分销结算单";
      this.form = {
        id: "",
        returnAmount: "",
        // cashoutAmount: "",
        settleTime: "",
        couponAmount: "",
        currency: "",
        platformCode: ""
      };
    },
    closeDialog() {
      this.dialogFormStatement = false;
    },
    // 上传结算单明细
    closeDialogExport() {
      this.dialogVisible = false;
    },
// 回款凭证
    closeDialogExportImg() {
      this.dialogVisibleImg = false;
    },
        // 查看凭证
    lookImg(row) {
      this.formImg.payProof = ''
      this.dialogVisibleImg = true;
      this.formImg.id = row.id
      this.formImg.payProof = row.returnCert
      this.uploadFirst = false
      this.alginUpload = true
    },
     uploadImg(row) {
      this.dialogVisibleImg = true;
      this.formImg.payProof = ''
      this.formImg.id= row.id
      this.uploadFirst = true
      this.alginUpload = false
    },
      // 上传
    sumbitAddForm() {
      let obj = {
        id: this.formImg.id,
        returnCert: this.formImg.payProof
      }
      updateObj(obj.id,obj).then(res => {
        this.dialogVisibleImg = false
       if(res.rel) {
           this.$message({
              type: "success",
              message: "上传成功!"
            });
          this.getList()
       } else {
           this.$message({
              type: "error",
              message:res.message
            });
       }
      })
    },
    handleSuccess (response, file) {
      if (response.status === undefined || response.status !== 200) {
        this.$alert(response.msg, '图片上传失败')
        return
      } else {
        this.formImg.payProof = response.data;
      }
    },
    handleError (err, file) {
      this.$message({
        title: 'error',
        message: err
      })
      console.log(err)
    },
    handleBefore (file) {
      return true;
      const imgPng = file.type === 'image/png'
      const imgJpeg = file.type === 'image/jpeg'
      const imgSize = file.size / 1024 / 1024 < 2
      if (!imgPng && !imgJpeg) {
        this.$message.error('图片上传格式不对')
      }
      if (!imgSize) {
        this.$message.error('图片大小不能超过2M')
      }
      return (imgJpeg || imgPng) && imgSize
    },
    // 新增结算单
    addForm() {
      let nForm = {
        id: this.form.id,
        returnAmount: this.form.returnAmount,
        // cashoutAmount: this.form.cashoutAmount,
        settleTime:
          this.form.settleTime === ""
            ? ""
            : dateUtils.format(this.form.settleTime, "YYYY-MM-DD"),
        couponAmount: this.form.couponAmount,
        currency: this.form.currency,
        platformCode: this.form.platformCode,
        settleType: 1
      };
      if (!nForm.platformCode) {
        this.$message({
          message: "所属平台不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (!nForm.currency) {
        this.$message({
          message: "货币类型不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (!nForm.settleTime) {
        this.$message({
          message: "提现时间不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      // if (!nForm.cashoutAmount) {
      //   this.$message({
      //     message: "提现手续费不能为空！",
      //     type: "error",
      //     duration: 2000
      //   });
      //   return false;
      // }
       if (!nForm.returnAmount) {
        this.$message({
          message: "回款金额不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      let reg3 = /^\d+$|^\d+[.]?\d+$/;
      // if (reg3.test(nForm.cashoutAmount) === false) {
      //   this.$message({
      //     message: "提现手续费只能为数字！",
      //     type: "error",
      //     duration: 2000
      //   });
      //   return false;
      // }
      if (nForm.couponAmount && reg3.test(nForm.couponAmount) === false) {
        this.$message({
          message: "其他扣款只能为数字！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (reg3.test(nForm.returnAmount) === false) {
        this.$message({
          message: "回款金额只能为数字！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      this.$confirm("确定要保存吗?", "新增", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        addObj(nForm).then(res => {
          if (res.rel) {
            this.$message({
              type: "success",
              message: "保存成功!"
            });
            this.dialogFormStatement = false;
            this.getList();
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
      });
    },
    //编辑
    handleUpdate(row) {
      this.dialogFormStatement = true;
      this.titleName = "编辑分销结算单";
      this.resetFields();
      let self = this;
      getDetail(row.id).then(response => {
        if (response.rel) {
          self.form = response.data;
        } else {
          this.$message({
            type: "error",
            message: response.message
          });
        }
      });
    },
    update(formName) {
      let nForm = {
        id: this.form.id,
        returnAmount: this.form.returnAmount,
        // cashoutAmount: this.form.cashoutAmount,
        settleTime:
          this.form.settleTime === ""
            ? ""
            : dateUtils.format(this.form.settleTime, "YYYY-MM-DD"),
        couponAmount: this.form.couponAmount,
        currency: this.form.currency,
        platformCode: this.form.platformCode
      };
      if (!nForm.platformCode) {
        this.$message({
          message: "所属平台不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (!nForm.currency) {
        this.$message({
          message: "货币类型不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (!nForm.settleTime) {
        this.$message({
          message: "提现时间不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      // if (!nForm.cashoutAmount) {
      //   this.$message({
      //     message: "提现手续费不能为空！",
      //     type: "error",
      //     duration: 2000
      //   });
      //   return false;
      // }
      if (!nForm.returnAmount) {
        this.$message({
          message: "回款金额不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      // if (nForm.returnAmount == 0 || nForm.returnAmount == 0.00) {
      //   this.$notify({
      //     title: "提示",
      //     message: "提现手续费不能为0！",
      //     type: "error",
      //     duration: 2000
      //   });
      //   return false;
      // }
      let reg3 = /^\d+$|^\d+[.]?\d+$/;
      // if (reg3.test(nForm.cashoutAmount) === false) {
      //   this.$message({
      //     message: "提现手续费只能为数字！",
      //     type: "error",
      //     duration: 2000
      //   });
      //   return false;
      // }
      if (nForm.couponAmount && reg3.test(nForm.couponAmount) === false) {
        this.$message({
          message: "其他扣款只能为数字！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (reg3.test(nForm.returnAmount) === false) {
        this.$message({
          message: "回款金额只能为数字！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      this.$confirm("确定要保存吗?", "新增", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        updateObj(nForm.id, nForm).then(res => {
          if (res.rel) {
            this.$message({
              type: "success",
              message: "保存成功!"
            });
            this.dialogFormStatement = false;
            this.getList();
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
      });
    },
    // 上传结算单明细
    uploadDetail(row) {
      this.dialogVisible = true;
      this.uploadForm.platformCode = row.platformCode;
      this.uploadForm.id = row.id;
    },
    getFile(event) {
      this.uploadForm.filePath = event.target.files[0];
    },
    exportSave() {
      // this.$refs.clearFile.value = "";
      if (this.uploadForm.filePath === "") {
        this.$message({
          message: "提交失败,请选择上传文件！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (this.uploadForm.platformCode === "") {
        this.$message({
          message: "提交失败,请选择所属平台！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      this.event = event;
      this.event.preventDefault();
      var formData = new FormData();
      formData.append("file", this.uploadForm.filePath);
      formData.append("platformCode", this.uploadForm.platformCode);
      formData.append("id", this.uploadForm.id);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          accessToken: getToken()
        }
      };
      this.$http
        .post("/api/ordersys/settleAccount/importRetai", formData, config)
        .then(res => {
          // if (res.rel) {
          if (res.data.rel == true) {
            this.$notify({
              title: "成功",
              message: "导入成功",
              type: "success",
              duration: 2000
            });
            this.uploadForm.filePath = "";
            this.$refs.clearFile.value = "";
            this.dialogVisible = false;
            this.getList();
          } else {
            this.uploadForm.filePath = "";
            this.$refs.clearFile.value = "";
            this.$notify({
              title: "失败",
              message: res.data.message,
              type: "error",
              duration: 2000
            });
          }
          if (res.data.status !== 200) {
            this.uploadForm.filePath = "";
            this.$refs.clearFile.value = "";
            this.$notify({
              title: "失败",
              message: res.data.message,
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
              this.getList();
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
        returnAmount: "",
        // cashoutAmount: "",
        settleTime: "",
        couponAmount: "",
        currency: "",
        platformCode: ""
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
.w85 {
  // width: 85%;
  // margin: 0 auto;
  line-height: 20px;
  h5 {
    margin-top: 10px;
  }
}
.exportSpan {
  display: block;
  margin-top: -13px;
  margin-bottom: 10px;
  color: #20a0ff;
}
.notecss {
  font-size: 13px;
  color: #9eb1c6;
  margin-left: 30px;
}
.formUpdate {
  display: inline-block;
  position: relative;
  top: 27px;
  left: 56px;
  color: red;
}
.el-form-item {
  margin-bottom: 5px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  border: 1px dashed #d9d9d9;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>



