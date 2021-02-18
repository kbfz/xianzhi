<template>
 <div class="app-container calendar-list-container" id="app-container">
  <el-row>
     <el-col :span="24">
     <div class="app-container-left">
    <div class="filter-container">
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
              placeholder="请输入所属分销结算单编号"
              v-model="query.settleNo"
            ></el-input>
            <el-input
              @keyup.enter.native="getList"
              style="width: 200px;"
              class="filter-item"
              placeholder="请输入付款内容"
              v-model="query.payName"
            ></el-input>
      <el-button type="primary" @click="getList">查询</el-button>
      <el-button type="primary" @click="receivables">新增</el-button>
    </div>

    <div style="display: block;overflow: hidden">
      <el-table
        :data="list"
        v-loading="loading.tableLoading"
        element-loading-text="正在加载中......"
        border
        fit
        :height="elTableMediaHeight"
        highlight-current-row
        style="width: 100%;overfloe:hidden;"
        @row-click="detailName">
        <el-table-column width="70" align="center" label="序号" type="index"></el-table-column>
        <el-table-column width="180" align="center" label="公司名称" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.companyName}}</span>
          </template>
        </el-table-column>
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
          <el-table-column width="210" align="center" label="银行账号" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.account}}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="货币类型" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.currencyName}}</span>
          </template>
        </el-table-column>
        <el-table-column width="130" align="center" label="申请金额" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.applyAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column width="180" align="center" label="大写金额" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.payAmountZh}}</span>
          </template>
        </el-table-column>
        <el-table-column width="180" align="center" label="付款内容" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.payName}}</span>
          </template>
        </el-table-column>
        <el-table-column width="170" align="center" label="申请时间" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
          <el-table-column width="120" align="center" label="状态" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;" v-if="scope.row.processStatus == 0">待审批</span>
            <span style="cursor: pointer;" v-if="scope.row.processStatus == 1">审批中</span>
            <span style="cursor: pointer;" v-if="scope.row.processStatus == 2">已通过</span>
            <span style="cursor: pointer;" v-if="scope.row.processStatus == 3">已拒绝</span>
          </template>
        </el-table-column>
        <el-table-column width="220" align="center" label="操作" show-overflow-tooltip fixed="right">
          <template scope="scope">
            <el-button type="text" @click="editForm(scope.row)">编辑</el-button>
            <el-button type="text" @click="approval(scope.row)">发起审批</el-button>
            <el-button type="text" @click="reportForm(scope.row)">导出</el-button>
            <el-button type="text" @click="deleteForm(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.page"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
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
        <span class="formUpdate">*</span>
        <el-form-item label="公司名称:" style="margin-bottom: 22px">
          <el-select placeholder="请选择公司名称" v-model="form.companyName" style="width: 300px">
            <el-option v-for="item in companyList"
                       :key="item.companyCode"
                       :value="`${item.companyCode}|${item.companyName}`"
                       :label="item.companyName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属采购单编号:"  style="margin-bottom: 22px">
          <el-input v-model="form.purchaseNo" placeholder="请输入所属采购单编号" style="width:300px"></el-input>
        </el-form-item>
         <el-form-item label="所属分销结算单编号:">
          <el-input v-model="form.settleNo" placeholder="请输入所属分销结算单编号" style="width:300px"></el-input>
        </el-form-item>
        <span class="formUpdate">*</span>
        <el-form-item label="收款单位:">
          <el-input v-model="form.payee" placeholder="请输入收款单位" style="width:300px"></el-input>
        </el-form-item>
        <span class="formUpdate">*</span>
        <el-form-item label="开户银行:">
          <el-input v-model="form.bank" placeholder="请输入开户银行" style="width:300px"></el-input>
        </el-form-item>
        <span class="formUpdate">*</span>
        <el-form-item label="银行账号:">
          <el-input v-model="form.account" placeholder="请输入银行账号" style="width:300px"></el-input>
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
        <span class="formUpdate">*</span>
        <el-form-item label="申请金额:">
          <el-input v-model="form.applyAmount" placeholder="请输入申请金额" style="width:300px"></el-input>
          <span style="display:block;font-size: 12px;color: red;line-height: 20px;width: 300px;overflow: hidden">{{message}}</span>
        </el-form-item>
        <span class="formUpdate">*</span>
        <el-form-item label="大写金额:">
          <el-input v-model="form.payAmountZh" placeholder="请输入大写金额" style="width:300px"></el-input>
        </el-form-item>
        <span class="formUpdate">*</span>
        <el-form-item label="付款内容:" style="margin-bottom: 20px">
          <el-input v-model="form.payName" placeholder="请输入付款内容" style="width:300px"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialogExport">取 消</el-button>
        <!-- 新增 -->
        <el-button type="primary" @click="addForm" v-if="titleName == '新增付款申请'">确定</el-button>
        <!-- 编辑 -->
        <el-button type="primary" v-if="titleName == '编辑付款申请'" @click="updateForm">确定</el-button>
      </div>
    </el-dialog>
    </div>
        </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  payPage,
  payAdd,
  payObj,
  payUpdate,
  payDelete,
  approvalObj
} from "api/purchase/revenue/index";
import { mapGetters } from "vuex";
import {
  currencyObj
} from "api/purchase/application/index";
var dateUtils = require("silly-datetime");
export default {
  name: "payApplication",
  data() {
    return {
      titleName: "新增付款申请",
      loading: {
        tableLoading: false,
        childrenLoading: false
      },
      list: [],
      listQuery: {
        _type_: "equal",
        page: 1,
        limit: 10,
        orderBy: 'createTimedesc'
      },
      query: {
        payTimes: "",
        payName: '',
        purchaseNo:'',
        settleNo: ''
      },
      form: {
        id: "",
        purchaseNo: "",
        settleNo: "",
        payee: "",
        bank: "",
        account: "",
        currency: "",
        applyAmount: '',
        payAmountZh: '',
        payName: '',
        companyCode:'',
        companyName:''
      },
      companyList:[{"companyCode":"1","companyName":"河南全速通供应链管理有限公司"},{"companyCode":"2","companyName":"郑州航空港区全速通供应链管理有限公司"},{"companyCode":"3","companyName":"河南石鑫信息科技有限公司"},{"companyCode":"4","companyName":"河南紫鹰供应链管理有限公司"},{"companyCode":"5","companyName":"香港全速通供应链管理有限公司"},{"companyCode":"6","companyName":"河南全速通报关服务有限公司"},{"companyCode":"7","companyName":"郑州品速供应链管理有限公司"},{"companyCode":"8","companyName":"河南紫象供应链管理有限公司"},{"companyCode":"9","companyName":"蒋丽云"},{"companyCode":"10","companyName":"河南掌罗科技有限公司"}],
      dialogVisible: false,
      tableData: [],
      dialogImageUrl: "",
      dialogVisibleImg: false,
      message: '',
      selectCurrency: []
    };
  },
    computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
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
      this.titleName = "新增付款申请";
      this.form = {
        id: "",
        purchaseNo: "",
        settleNo: "",
        payee: "",
        bank: "",
        account: "",
        currency: "",
        applyAmount: '',
        payAmountZh: '',
        payName: '',
        companyCode:'',
        companyName:''
      };
    },
    editForm(row) {
      this.message = ''
      this.dialogVisible = true;
      this.titleName = "编辑付款申请";
      this.form.id = row.id;
      payObj(row.id).then(res => {
        if (res.rel) {
          this.form = res.data;
        }
      });
    },
    // 分页查询
    getList() {
      let param = {
        payName: this.query.payName,
        purchaseNo:this.query.purchaseNo,
        settleNo: this.query.settleNo,
        // times:localStorage.getItem('time'),
        ...this.listQuery
      };
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
    // 新增
    addForm() {
      let nForm = {
        id: this.form.id,
        purchaseNo: this.form.purchaseNo,
        settleNo: this.form.settleNo,
        payee: this.form.payee,
        bank: this.form.bank,
        account: this.form.account,
        currency: this.form.currency,
        applyAmount: this.form.applyAmount,
        payAmountZh: this.form.payAmountZh,
        payName: this.form.payName,
        companyCode:this.form.companyCode,
        companyName:this.form.companyName
      };

      if (!nForm.companyName){
        this.$message({
          message: "公司名称不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (nForm.companyName){
        const [lable, value] = this.form.companyName.split('|')
        console.log(lable)
        console.log(value)
        this.form.companyCode = lable
        this.form.companyName = value
        nForm.companyCode = lable;
        nForm.companyName = value;
      }
      if (!nForm.payee) {
        this.$message({
          message: "收款单位不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
       if (!nForm.bank) {
        this.$message({
          message: "开户银行不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (!nForm.account) {
        this.$message({
          message: "银行账号不能为空！",
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
      if (!nForm.applyAmount) {
        this.$message({
          message: "申请金额不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      let reg = /^\d+$|^\d+[.]?\d+$/;
      if (reg.test(nForm.applyAmount) === false) {
        this.$message({
          message: "申请金额只能为数字！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (!nForm.payAmountZh) {
        this.$message({
          message: "大写金额不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (!nForm.payName) {
        this.$message({
          message: "付款内容不能为空！",
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
        purchaseNo: this.form.purchaseNo,
        settleNo: this.form.settleNo,
        payee: this.form.payee,
        bank: this.form.bank,
        account: this.form.account,
        currency: this.form.currency,
        applyAmount: this.form.applyAmount,
        payAmountZh: this.form.payAmountZh,
        payName: this.form.payName,
        companyCode:this.form.companyCode,
        companyName:this.form.companyName
      };
      if (!nForm.companyName){
        this.$message({
          message: "公司名称不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (nForm.companyName){
        const [lable, value] = this.form.companyName.split('|')
        console.log(lable)
        console.log(value)
        this.form.companyCode = lable
        this.form.companyName = value
        nForm.companyCode = lable;
        nForm.companyName = value;
      }
      if (!nForm.payee) {
        this.$message({
          message: "收款单位不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
       if (!nForm.bank) {
        this.$message({
          message: "开户银行不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (!nForm.account) {
        this.$message({
          message: "银行账号不能为空！",
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
      if (!nForm.applyAmount) {
        this.$message({
          message: "申请金额不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      let reg = /^\d+$|^\d+[.]?\d+$/;
      if (reg.test(nForm.applyAmount) === false) {
        this.$message({
          message: "申请金额只能为数字！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (!nForm.payAmountZh) {
        this.$message({
          message: "大写金额不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (!nForm.payName) {
        this.$message({
          message: "付款内容不能为空！",
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
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
      });
    },
    // 发起审批
    approval(row) {
      this.$confirm("确定要发起审批吗?", "审批", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let query = {
          id: row.id
        }
        approvalObj(query).then(res => {
           if (res.rel) {
            this.$message({
              type: "success",
              message: "审批成功!"
            });
            this.getList();
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        })
      })
    },
    // 导出
    reportForm(row){
      let query = {
        id:row.id
      }
     let host = window.location.host
      window.location.href = '//' + host + '/api/ordersys/payDetailInfo/exportSignatureSheet?id=' + query.id
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
  left: 68px;
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
