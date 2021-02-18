<template>
  <div class="dashboard-main clearfix">
    <h4>结算总支出</h4>
    <div class="filter-container" style="padding-bottom: 20px;">
      <el-date-picker
        type="daterange"
        placeholder="请选择打款时间"
        style="width: 330px;"
        class="filter-item"
         popper-class="timeSelect"
        @keyup.enter.native="getList"
        range-separator="~"
        v-model="query.payTimes"
      ></el-date-picker>
       <el-input
              @keyup.enter.native="getList"
              style="width: 200px;"
              class="filter-item"
              placeholder="请输入打款凭证号"
              v-model="query.paymentNo"
            ></el-input>
        <el-input
              @keyup.enter.native="getList"
              style="width: 200px;"
              class="filter-item"
              placeholder="请输入所属采购单编号"
              v-model="query.purchaseNo"
            ></el-input>
            <el-input
              @keyup.enter.native="getList"
              style="width: 200px;"
              class="filter-item"
              placeholder="请输入所属分销单编号"
              v-model="query.settleNo"
            ></el-input>
      <el-button type="primary" @click="getList">查询</el-button>
      <!-- <el-button type="primary" @click="receivables">新增</el-button> -->
    </div>
    <div style="display: block;overflow: hidden">
      <el-table
        :data="list"
        v-loading="loading.tableLoading"
        element-loading-text="正在加载中......"
        border
        fit
        highlight-current-row
        style="width: 100%;overfloe:hidden;"
        @row-click="detailName"
      >
        <el-table-column width="70" align="center" label="序号" type="index"></el-table-column>
        <el-table-column width="180" align="center" label="付款单编号" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.payNo}}</span>
          </template>
        </el-table-column>
        <el-table-column width="180" align="center" label="所属采购单编号" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.purchaseNo}}</span>
          </template>
        </el-table-column>
        <el-table-column width="180" align="center" label="所属分销结算单编号" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.settleNo}}</span>
          </template>
        </el-table-column>
        <el-table-column width="150" align="center" label="收款单位" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.payee}}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="开户银行" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.bank}}</span>
          </template>
        </el-table-column>
        <el-table-column width="180" align="center" label="银行账号" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.account}}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="申请金额" show-overflow-tooltip >
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.applyAmount}}</span>
          </template>
        </el-table-column>
         <el-table-column width="160" align="center" label="大写金额" show-overflow-tooltip  >
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.payAmountZh}}</span>
          </template>
        </el-table-column>
        <el-table-column width="160" align="center" label="付款内容" show-overflow-tooltip  >
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.payName}}</span>
          </template>
        </el-table-column>
        <el-table-column width="160" align="center" label="申请时间" show-overflow-tooltip  >
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
         <el-table-column width="120" align="center" label="货币类型" show-overflow-tooltip  fixed="right">
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.currencyName}}</span>
          </template>
        </el-table-column>
          <el-table-column width="120" align="center" label="货币汇率" show-overflow-tooltip  fixed="right">
          <template scope="scope">
            <span style="cursor: pointer;"  v-if="scope.row.currencyRates">{{scope.row.currencyRates}}</span>
            <el-button type="text" @click="ratesNum(scope.row)" v-else>填入汇率</el-button>
          </template>
        </el-table-column>
         <el-table-column width="120" align="center" label="付款金额" show-overflow-tooltip  fixed="right">
          <template scope="scope">
            <span style="cursor: pointer;" v-if="scope.row.payAmount">{{scope.row.payAmount}}</span>
            <el-button type="text" @click="moneyNum(scope.row)" v-else>填入金额</el-button>
          </template>
        </el-table-column>
          <el-table-column width="170" align="center" label="打款凭证号" show-overflow-tooltip fixed="right">
          <template scope="scope">
            <span style="cursor: pointer;" v-if="scope.row.paymentNo">{{scope.row.paymentNo}}</span>
            <el-button type="text" @click="paymentNum(scope.row)" v-else>填入凭证号</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column width="150" align="center" label="操作" show-overflow-tooltip fixed="right">
          <template scope="scope">
            <el-button type="text" @click="editForm(scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteForm(scope.row)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.page"
          :page-size="listQuery.limit"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
     <el-dialog
      :title="expendTitle"
      :visible.sync="dialogVisibleMoney"
      :before-close="closeDialogExportMoney"
      :close-on-click-modal="false"
      class="receiptWidth450"
    >
      <span style="margin-left: 10px;font-size: 14px;color: #48576a;">{{expendTitle}}：</span>
      <el-input v-model="formMoney.payAmount" style="width: 300px" v-if="expendTitle == '付款金额'"></el-input>
      <el-input v-model="formMoney.currencyRates" style="width: 300px" v-if="expendTitle == '货币汇率'"></el-input>
       <el-input v-model="formMoney.paymentNo" style="width: 300px" v-if="expendTitle == '打款凭证号'"></el-input>
      <div slot="footer" class="dialog-footer center">
        <el-button @click="closeDialogExportMoney">取消</el-button>
        <el-button type="primary" @click="sumbitAmount" v-if="expendTitle == '付款金额'">保存（金额）</el-button>
         <el-button type="primary" @click="sumbitRates" v-if="expendTitle == '货币汇率'">保存（货币汇率）</el-button>
           <el-button type="primary" @click="sumbitPayment" v-if="expendTitle == '打款凭证号'">保存（打款凭证号）</el-button>
      </div>
    </el-dialog>
    <!-- 确认收款 -->
    <el-dialog
      :title="titleName"
      :visible.sync="dialogVisible"
      :before-close="closeDialogExport"
      :close-on-click-modal="false"
      class="receiptWidth590"
    >
      <el-form
        :model="form"
        :rules="addRules"
        ref="form"
        style="margin-left: 30px"
        class="customerdata"
        label-width="150px"
      >
        <!-- <span class="formUpdate" style="left: 55px">*</span>
         <el-form-item label="付款单编号:" style="margin-bottom: 22px">
          <el-input v-model="form.payNo" placeholder="请输入付款单编号" style="width:300px"></el-input>
        </el-form-item> -->
        <el-form-item label="所属采购单编号:"  style="margin-bottom: 22px">
          <el-input v-model="form.purchaseNo" placeholder="请输入所属采购单编号" style="width:300px"></el-input>
        </el-form-item>
         <el-form-item label="所属分销结算单编号:">
          <el-input v-model="form.settleNo" placeholder="请输入所属分销结算单编号" style="width:300px" @blur="changeSettleNo"></el-input>
        </el-form-item>
        <span class="formUpdate">*</span>
        <el-form-item label="款项名称:">
          <el-input v-model="form.payName" placeholder="请输入款项名称" style="width:300px"></el-input>
        </el-form-item>
       <span class="formUpdate">*</span>
      <el-form-item label="货币类型"> 
          <el-select
                  placeholder="请选择货币类型"
                  style="width:300px"
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
              <span class="formUpdate" v-if="form.currency && form.currency !== 'CNY' " style="left:85px">*</span>
              <el-form-item label="汇率:" v-if="form.currency && form.currency !== 'CNY'">
                <el-input v-model="form.currencyRates" style="width: 300px;" placeholder="输入汇率"></el-input>
                <span class="addText">请保留小数点后四位，例如：10000.0000</span>
              </el-form-item>
        <span class="formUpdate">*</span>
        <el-form-item label="支出金额:">
          <el-input v-model="form.payAmount" placeholder="请输入支出金额" style="width:300px"></el-input>
          <span style="display:block;font-size: 12px;color: red;line-height: 20px;width: 300px;overflow: hidden">{{message}}</span>
        </el-form-item>
        <span class="formUpdate">*</span>
        <el-form-item label="经办人:">
          <el-input v-model="form.payeeName" placeholder="请输入经办人" style="width:300px"></el-input>
        </el-form-item>
        <!-- <span class="formUpdate">*</span> -->
        <!-- <el-form-item label="申请人:">
          <el-input v-model="form.applyName" placeholder="请输入申请人" style="width:300px"></el-input>
        </el-form-item> -->
        <span class="formUpdate">*</span>
        <el-form-item label="打款时间:" >
          <el-date-picker
            v-model="form.payTime"
            type="date"
            placeholder="选择打款时间"
            style="width: 300px"
          ></el-date-picker>
        </el-form-item>
        <span class="formUpdate">*</span>
        <el-form-item label="打款凭证号:" style="margin-bottom: 20px">
          <el-input v-model="form.paymentNo" placeholder="请输入打款凭证号" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="款项备注:">
          <el-input v-model="form.remark" placeholder="请输入款项备注" style="width:300px"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialogExport">取 消</el-button>
        <!-- 新增 -->
        <el-button type="primary" @click="addForm" v-if="titleName == '新增支出'">确定</el-button>
        <!-- 编辑 -->
        <el-button type="primary" v-if="titleName == '编辑支出'" @click="updateForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  payPage,
  payAdd,
  payObj,
  payUpdate,
  payDelete,
  payAmount,
  editPay
} from "api/purchase/revenue/index";
import {
  currencyObj
} from "api/purchase/application/index";
var dateUtils = require("silly-datetime");
export default {
  name: "dashboard",
  data() {
    return {
      dialogVisibleMoney: false,
      titleName: "新增支出",
      loading: {
        tableLoading: false,
        childrenLoading: false
      },
      expendTitle: '',
      list: [],
      listQuery: {
        _type_: "equal",
        page: 1,
        limit: 10,
        orderBy: 'createTimedesc'
      },
      query: {
        payTimes: "",
        paymentNo: '',
         purchaseNo:'',
        settleNo: ''
      },
      formMoney: {
        id: '',
        payAmount:'',
        currencyRates: '',
        paymentNo: ''
      },
      form: {
        id: "",
        payName: "",
        payAmount: "",
        payeeName: "",
        settleNo: "",
        remark: "",
        payTime: "",
        purchaseNo: "",
        paymentNo: '',
        currency: '',
        currencyRates: ''
      },
      dialogVisible: false,
      tableData: [],
      dialogImageUrl: "",
      dialogVisibleImg: false,
      message: '',
      selectCurrency: []
    };
  },
  mounted() {},
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
    closeDialogExport() {
      this.dialogVisible = false;
    },
    receivables() {
      this.message = ''
      this.dialogVisible = true;
      this.titleName = "新增支出";
      this.form = {
        id: "",
        payName: "",
        payAmount: "",
        payeeName: "",
        settleNo: "",
        remark: "",
        payTime: "",
        paymentNo: '',
        purchaseNo: "",
        // payNo: "",
        currency: '',
        currencyRates: ''
      };
    },
   closeDialogExportMoney() {
      this.dialogVisibleMoney = false;
    },
    //付款金额
   moneyNum (row){
      this.formMoney.id = ''
      this.formMoney.payAmount = ''
      this.expendTitle = "付款金额";
      this.formMoney.id = row.id
      this.formMoney.payAmount = row.payAmount
      this.dialogVisibleMoney = true;
    },
    // 货币汇率
    ratesNum(row){
      this.formMoney.id = ''
      this.formMoney.currencyRates = ''
      this.expendTitle = "货币汇率";
       this.formMoney.id = row.id
       this.formMoney.currencyRates = row.currencyRates
      this.dialogVisibleMoney = true;
    },
    // 凭证号
    paymentNum(row){
        this.formMoney.id = ''
      this.formMoney.paymentNo = ''
      this.expendTitle = "打款凭证号";
      this.formMoney.id = row.id
      this.formMoney.paymentNo = row.paymentNo
      this.dialogVisibleMoney = true;
    },
    sumbitAmount() {
       this.$confirm("确定要保存吗?", "修改金额", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let obj = {
          id:this.formMoney.id,
          payAmount: this.formMoney.payAmount
        }
        editPay(obj).then(res => {
          if(res.rel){
              this.$message({
              type: "success",
              message: "保存成功!"
            });
            this.dialogVisibleMoney = false;
            this.getList();
          } else {
             this.$message({
              type: "error",
              message:res.message
            });
          }
        })
      })
    },
    sumbitRates(){
           this.$confirm("确定要保存吗?", "修改汇率", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let obj = {
          id:this.formMoney.id,
          currencyRates: this.formMoney.currencyRates
        }
        editPay(obj).then(res => {
          if(res.rel){
              this.$message({
              type: "success",
              message: "保存成功!"
            });
            this.dialogVisibleMoney = false;
            this.getList();
          } else {
             this.$message({
              type: "error",
              message:res.message
            });
          }
        })
      })
    },
    sumbitPayment(){
         this.$confirm("确定要保存吗?", "修改凭证号", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let obj = {
          id:this.formMoney.id,
          paymentNo: this.formMoney.paymentNo
        }
        editPay(obj).then(res => {
          if(res.rel){
              this.$message({
              type: "success",
              message: "保存成功!"
            });
            this.dialogVisibleMoney = false;
            this.getList();
          } else {
             this.$message({
              type: "error",
              message:res.message
            });
          }
        })
      })
    },
    editForm(row) {
      this.message = ''
      this.dialogVisible = true;
      this.titleName = "编辑支出";
      this.form.id = row.id;
      payObj(row.id).then(res => {
        if (res.rel) {
          this.form = res.data;
          this.changeSettleNo()
        }
      });
    },
    // 分页查询
    getList() {
      let param = {
        payTimes: this.query.payTimes,
        paymentNo: this.query.paymentNo,
        purchaseNo:this.query.purchaseNo,
        settleNo: this.query.settleNo,
        times:localStorage.getItem('time'),
        processStatus:2,
        ...this.listQuery
      };
      if (param.payTimes !== "") {
        var start =
          param.payTimes[0] === null
            ? null
            : dateUtils.format(param.payTimes[0], "YYYY-MM-DD");
        var end =
          param.payTimes[1] === null
            ? null
            : dateUtils.format(param.payTimes[1], "YYYY-MM-DD");
        param.payTimes = `${start}~${end}`;
      }
      if (param.payTimes == "null~null") {
        param.payTimes = "";
      }
      payPage(param).then(res => {
        if (res.rel) {
          this.list = res.data.rows;
          this.total = res.data.total;
          this.loading.tableLoading = false;
        }
      });
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    // 分销结算单失去焦点
    changeSettleNo() {
      if(this.form.settleNo) {
        let param  = {
          settleNo: this.form.settleNo,
          id: this.form.id
        }
        payAmount(param).then(res => {
          if(res.rel) {
            this.message = res.message
          }
        })
      } else {
        this.message = ''
      }
    },
    // 新增
    addForm() {
      let nForm = {
        id: this.form.id,
        payName: this.form.payName,
        payAmount: this.form.payAmount,
        settleNo:this.form.settleNo,
        payeeName: this.form.payeeName,
        remark: this.form.remark,
        paymentNo:this.form.paymentNo,
        purchaseNo: this.form.purchaseNo,
        currency: this.form.currency,
          currencyRates: this.form.currencyRates,
        payTime:
          this.form.payTime === ""
            ? ""
            : dateUtils.format(this.form.payTime, "YYYY-MM-DD")
      };
      // if (!nForm.payNo) {
      //   this.$message({
      //     message: "付款单编号不能为空！",
      //     type: "error",
      //     duration: 2000
      //   });
      //   return false;
      // }
     
      if (!nForm.payName) {
        this.$message({
          message: "款项名称不能为空！",
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
      if (nForm.currency != "CNY") {
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
          message: "支出金额不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      let reg = /^\d+$|^\d+[.]?\d+$/;
      if (reg.test(nForm.payAmount) === false) {
        this.$message({
          message: "支出金额只能为数字！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (!nForm.payeeName) {
        this.$message({
          message: "经办人不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (!nForm.payTime) {
        this.$message({
          message: "打款时间不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
       if (!nForm.paymentNo) {
        this.$message({
          message: "打款凭证号不能为空！",
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
        payAdd(nForm).then(res => {
          if (res.rel) {
            this.$message({
              type: "success",
              message: "保存成功!"
            });
            this.dialogVisible = false;
            this.getList();
            this.$emit('child', '')
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
      });
    },
    // 编辑
    updateForm() {
      let nForm = {
        id: this.form.id,
        payName: this.form.payName,
        payAmount: this.form.payAmount,
        payeeName: this.form.payeeName,
        settleNo:this.form.settleNo,
         paymentNo:this.form.paymentNo,
        remark: this.form.remark,
        purchaseNo: this.form.purchaseNo,
        currency: this.form.currency,
          currencyRates: this.form.currencyRates,
        payTime:
          this.form.payTime === ""
            ? ""
            : dateUtils.format(this.form.payTime, "YYYY-MM-DD")
      };
      // if (!nForm.payNo) {
      //   this.$message({
      //     message: "付款单编号不能为空！",
      //     type: "error",
      //     duration: 2000
      //   });
      //   return false;
      // }
      if (!nForm.payName) {
        this.$message({
          message: "款项名称不能为空！",
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
            if (nForm.currency != "CNY") {
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
          message: "支出金额不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      let reg = /^\d+$|^\d+[.]?\d+$/;
      if (reg.test(nForm.payAmount) === false) {
        this.$message({
          message: "支出金额只能为数字！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (!nForm.payeeName) {
        this.$message({
          message: "经办人不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (!nForm.payTime) {
        this.$message({
          message: "打款时间不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
       if (!nForm.paymentNo) {
        this.$message({
          message: "打款凭证号不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      this.$confirm("确定要保存吗?", "编辑", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        payUpdate(nForm.id, nForm).then(res => {
          if (res.rel) {
            this.$message({
              type: "success",
              message: "保存成功!"
            });
            this.dialogVisible = false;
            this.getList();
            this.$emit('child', '')
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
      });
    },
    // 删除
    deleteForm(row) {
      this.$confirm("确定要删除吗?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        payDelete(row.id).then(res => {
          if (res.rel) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getList();
            this.$emit('child', '')
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
      });
    }
  },
  created() {
    this.getList();
    this.currencyNameInfo()
  }
};
</script>
<style scoped>
.storage-box-right {
  width: 99%;
  overflow: hidden;
  margin: 0 auto;
  border: 1px solid #f2f2f2;
}
.mt30 {
  margin-top: 15px;
  /* background: #eef1f6; */
  /* border-radius: 10px; */
  margin-bottom: 15px;
}
.mt15 {
  /* margin-top: 15px; */
}
.storage-box-right .dashboard-main {
  width: 98%;
  margin: 0 auto;
  padding-bottom: 20px;
  /* margin-top: 15px; */
}
.storage-box-right .dashboard-main h4 {
  color: #333333;
  margin-top: 20px;
}
.topCategory {
  font-size: 15px;
  font-weight: bold;
  color: #666666;
}
.topContent {
  font-size: 14px;
  color: #666666;
  margin-top: 10px;
  width: 100%;
  overflow: hidden;
}
.topContent span {
  float: left;
  margin-right: 20px;
}
.storage-box-right .dashboard-main .dashboard-main-mokuai {
  border: 1px solid #d8d8d8;
  background-color: #fff;
  color: #797979;
  text-align: center;
  margin: 0 2%;
  width: 200px;
  float: left;
  text-decoration: none;
  height: 200px;
  border-radius: 6px;
  margin-top: 15px;
}
.storage-box-right .dashboard-main .dashboard-main-mokuai p {
  width: 100%;
  background-color: #fff;
  margin: 0;
  margin-top: 35px;
  color: #333333;
  /* border-bottom: 1px solid #d8d8d8; */
  font-size: 17px;
}
.storage-box-right .dashboard-main .dashboard-main-mokuaimoney {
  border: 1px solid #d8d8d8;
  background-color: #fff;
  color: #797979;
  text-align: center;
  margin: 0 1%;
  width: 17%;
  float: left;
  text-decoration: none;
  height: 160px;
}
.storage-box-right .dashboard-main .dashboard-main-mokuaimoney p {
  width: 100%;
  background-color: #f2f2f2;
  margin-top: 0;
  height: 40px;
  line-height: 40px;
  color: #333333;
  border-bottom: 1px solid #d8d8d8;
  font-size: 15px;
}
.dashboard-main-shuzi {
  text-align: center;
  line-height: 65px;
  color: #333333;
  margin: 0;
  padding: 0;
}
.btn {
  width: 120px;
  margin: 0 auto;
  margin-top: 11px;
}
.footer {
  margin-top: 210px;
  font-size: 14px;
  color: #999999;
}
.footerTop {
  margin-top: 20px;
  font-size: 14px;
  color: #999999;
}
.formUpdate {
  display: inline-block;
  position: relative;
  top: 27px;
  left: 55px;
  color: red;
}
.el-form-item {
  margin-bottom: 5px;
}
.addText {
  display: block;
  font-size: 12px;
  margin-bottom: -15px;
  color: #999;
}
</style>