<template>
  <div class="app-container calendar-list-container" id="app-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="24">
        <div class="app-container-left">
          <div class="filter-container">
            <el-select
              v-model="query.customerName"
              placeholder="请选择客户"
              class="filter-item"
              clearable
            >
              <el-option
                v-for="(item,index) in select.customer"
                :key="index"
                :label="item.key"
                :value="item.key"
              ></el-option>
            </el-select>
            <el-input v-model="query.importUser" placeholder="添加人" clearable></el-input>
            <el-date-picker
              v-model="query.month"
              type="month"
              format='yyyy-MM' 
              @change="queryMonthChange"
              placeholder="账单月份">
            </el-date-picker>
            <el-date-picker
              v-model="query.payTime"
              type="date"
              format='yyyy-MM-dd'
              @change="queryDateChange"  
              placeholder="赔付时间">
            </el-date-picker>
            <el-button
              class="filter-item"
              type="primary"
              v-waves
              icon="search"
              @click="handleFilter"
            >查询</el-button>
             <el-button
              class="filter-item"
              type="primary"
              @click="add"
            >添加</el-button>
             <el-button
              class="filter-item"
              type="primary"
              @click="exportorder"
            >导入</el-button>
             <el-button
              class="filter-item"
              type="primary"
              @click="getTemplate"
            >下载导入模板</el-button>
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
              <el-table-column min-width="150px" align="center" label="客户名称" prop='customerName' show-overflow-tooltip/>
              <el-table-column min-width="150px" align="center" label="客户编号" prop='customerCode' show-overflow-tooltip />
              <el-table-column min-width="150px" align="center" label="账单月份" prop='month' show-overflow-tooltip/>
              <el-table-column min-width="150px" align="center" label="添加人" prop='importUser' show-overflow-tooltip/>
              <el-table-column min-width="140px" align="center" label="赔付时间" prop='payTime'   show-overflow-tooltip/>
              <el-table-column min-width="140px" align="center" label="订单号" prop='orderNo' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="运单号" prop='expressNo' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="快递公司" prop='expressCompany' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="赔付原因" prop='reason' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="货物价值" prop='goodsValue' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="赔付确定金额" prop='payAmount' show-overflow-tooltip/>
              <el-table-column width="120px" align="center" label="操作">
                <template scope="scope">
                  <el-button type="text" @click="editRow(scope.row)">编辑</el-button>
                  <el-button type="text" @click="deleteBill(scope.row)">删除</el-button>
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
              <el-form-item label="客户名称" class="marginListAdd" prop='customerName'>
                <!-- <el-input placeholder="客户名称" style="width:200px" v-model="form.customerName"></el-input> -->
                <el-select
                      v-model="form.customerName"
                      placeholder="客户名称"
                      class="filter-item"
                      clearable
                      @change='customerNameChange'>
                      <el-option
                        v-for="(item,index) in customerOption"
                        :key="index"
                        :label="item.key"
                        :value="item.key"
                      ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="客户编号" prop="customerCode" class="marginListAdd">
                <el-input v-model="form.customerCode" placeholder="客户编号" style="width:200px" disabled></el-input>
              </el-form-item>
               <el-form-item label="账单月份" class="marginListAdd">
                <el-date-picker
                  v-model="form.month"
                  type="month"
                  format='yyyy-MM'
                  @change="monthChange"  
                  placeholder="选择月"
                  style="width:200px">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="赔付时间" class="marginListAdd">
                <el-date-picker
                  v-model="form.payTime"
                  type="date"
                  format='yyyy-MM-dd'
                  @change="dataChange"  
                  placeholder="赔付时间"
                  style="width:200px">
                </el-date-picker>
              </el-form-item>
               <el-form-item label="订单号" prop="orderNo" class="marginListAdd">
                <el-input v-model="form.orderNo" placeholder="订单号" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="运单号" prop="expressNo" class="marginListAdd">
                <el-input v-model="form.expressNo" placeholder="运单号" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="快递公司" prop="expressCompany" class="marginListAdd">
                <el-input v-model="form.expressCompany" placeholder="快递公司" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="赔付原因" prop="reason" class="marginListAdd">
                <el-input v-model="form.reason" placeholder="赔付原因" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="货物价值" prop="goodsValue" class="marginListAdd">
                <el-input v-model="form.goodsValue"  placeholder="货物价值" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="赔付确定金额" prop="payAmount" class="marginListAdd">
                <el-input v-model="form.payAmount" placeholder="赔付确定金额" style="width:200px"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer center">
              <el-button @click="closeMaterial">取消</el-button>
              <el-button type="primary" @click="editEvent" v-if="materialText == '编辑'">保存</el-button>
              <el-button type="primary" @click="addEvent" v-else>添加</el-button>
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
              <el-button type="primary" @click="exportSave">导 入</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  getCustomerSelectList,
  getBillPayPage,
  addBillPay,
  editBillPay,
  deleteBillPay,
  getTemplate,
} from "api/financialSys/serviceUpload/index";
import { page } from "api/financialSys/customerConfig/index";
import { mapGetters } from "vuex";
import $ from "jquery";
import { getToken } from "utils/auth";
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
      dialogVisible:false,
      filePath:'',
      list: [],
      id:'',
      formatMonth:'',
      listQuery: {
        page: 1,
        limit: 10,
        orderBy: "createTimedesc",
        _type_:'equal'
        // customerCode: undefined,
      },
      enterpriseList: [
          {name: '河南领澜供应链管理有限公司'}, {name: '河南领澜供应链管理有限公司'}, {name: '河南领澜供应链管理有限公司'}, {name: '河南领澜供应链管理有限公司'}
      ],
      query: {
        month:'',
        payTime:''
      },
      nameInfo: "",
      select: {
        customer: [],
        billName: [],
      },
      dialogFormMaterial: false,
      materialText: '添加',
      customerOption:[],
      rules: {},
      selectStatus: [
        {
          value: 0,
          label: "已生成",
        },
        {
          value: 1,
          label: "未生成",
        },
      ],
      form: {
        month:'',
        payTime:'',
        customerCode:'',
        customerName:''
      }
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
        ...this.query,
        ...this.listQuery,
      };
      getBillPayPage(param).then((response) => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    queryMonthChange(val){
       this.query.month = val
    },
    queryDateChange(val){
       this.query.payTime = val
    },
    // 下载模板
    getTemplate(){
      let query = {
          fileType: "pay",
        };
      let host = window.location.host;
      window.location.href = `//${host}/api/ordersys/financeFileTemplate/getTemplate?fileType=${query.fileType}`;
    },
    // 导入
    exportorder() {
      this.dialogVisible = true;
    },
    closeDialogExport() {
      this.dialogVisible = false;
      this.filePath = ''
    },
    getFile(event) {
      this.filePath = event.target.files[0];
    },
     exportSave() {
      if (this.filePath === "") {
        this.$message({
          message: "提交失败,请选择上传文件！",
          type: "error",
          duration: 2000,
        });
        return false;
      }
      var formData = new FormData();
      formData.append("file", this.filePath);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          accessToken: getToken(),
        },
      };
      this.$http
        .post(
          "/api/ordersys/customerFinanceBillPay/importPay",
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
    // 删除
    deleteBill(row){
       this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteBillPay(row.id)
        }).catch(() => {});
    },
    //  删除
    deleteBillPay(id){
      deleteBillPay(id).then(res =>{
        if(res.status == 200){
              this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            });
            this.getList();
        }
      })
    },
    handleFilter() {
      this.listQuery.limit = 10;
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
    on_page_select(val) {
      this.pageChoose = val;
    },

    // 获取下拉客户信息
    customerNameInfo() {
      let param = {};
      getCustomerSelectList(param).then((res) => {
          this.select.customer = res.data
          this.customerOption = res.data
      });
    },
    closeMaterial() {
      this.dialogFormMaterial = false;
      this.form = {month:'',payTime:'',customerCode:'',customerName:''};
      this.id = ''
    },
    // 客户名称
    customerNameChange(val){
        let item_val = this.customerOption.find(item =>{
          if(item.key == val){
            return item
          }
        })
        if(val){
           this.form.customerCode = item_val.value
        }
    },
    monthChange(val){
      this.formatMonth = val;
      this.form.month = val;
    },
    dataChange(val){
      this.form.payTime = val;
    },
    // 编辑
    editEvent(){
      if(this.form.customerName ==''){ return  this.$message({ message: '客户名称不能为空',type: 'warning'})}
      if(this.form.customerCode ==''){ return  this.$message({ message: '客户编号不能为空',type: 'warning'})}
      if(this.form.month ==''){ return  this.$message({ message: '账单月份不能为空',type: 'warning'})}
      if(this.form.payTime == ''){ return  this.$message({ message: '赔付时间不能为空',type: 'warning'})}
      if(this.form.orderNo ==''){ return  this.$message({ message: '订单号不能为空',type: 'warning'})}
      if(this.form.expressNo ==''){ return  this.$message({ message: '运单号不能为空',type: 'warning'})}
      if(this.form.expressCompany ==''){ return  this.$message({ message: '快递公司不能为空',type: 'warning'})}
      if(this.form.reason ==''){ return  this.$message({ message: '赔付原因不能为空',type: 'warning'})}
      if(this.form.goodsValue ==''){ return  this.$message({ message: '货物价值不能为空',type: 'warning'})}
      if(this.form.payAmount ==''){ return  this.$message({ message: '赔付确定金额不能为空',type: 'warning'})}

      let param = JSON.parse(JSON.stringify(this.form));
      param.id = this.id
      editBillPay(this.id,param).then(res =>{
        if(res.status == 200){
           this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success'
            });
            this.getList();
        }else{
            this.$notify.error({
              title: '错误',
              message: res.message
            });
        }
         this.dialogFormMaterial = false; 
      })
    },
    // 添加
    addEvent(){
      if(!this.form.customerName){ return  this.$message({ message: '客户名称不能为空',type: 'warning'})}
      if(!this.form.customerCode){ return  this.$message({ message: '客户编号不能为空',type: 'warning'})}
      if(!this.form.month){ return  this.$message({ message: '账单月份不能为空',type: 'warning'})}
      if(!this.form.payTime){ return  this.$message({ message: '赔付时间不能为空',type: 'warning'})}
      if(!this.form.orderNo){ return  this.$message({ message: '订单号不能为空',type: 'warning'})}
      if(!this.form.expressNo){ return  this.$message({ message: '运单号不能为空',type: 'warning'})}
      if(!this.form.expressCompany){ return  this.$message({ message: '快递公司不能为空',type: 'warning'})}
      if(!this.form.reason){ return  this.$message({ message: '赔付原因不能为空',type: 'warning'})}
      if(!this.form.goodsValue){ return  this.$message({ message: '货物价值不能为空',type: 'warning'})}
      if(!this.form.payAmount){ return  this.$message({ message: '赔付确定金额不能为空',type: 'warning'})}
       addBillPay(this.form).then(res =>{
          if(res.status == 200){
            this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success'
              });
              this.getList();
          }else{
              this.$notify.error({
                title: '错误',
                message: res.message
              });
          }
          this.dialogFormMaterial = false;
      })
    },
    editRow(row){
        this.id = row.id;
        let {customerName,customerCode,month,payTime,orderNo,expressNo,expressCompany,reason,goodsValue,payAmount} = row;
        this.form = {customerName,customerCode,month,payTime,orderNo,expressNo,expressCompany,reason,goodsValue,payAmount} 
        this.form.weight = String(this.form.weight)
        this.form.postFee = String(this.form.postFee)
        this.materialText = '编辑',
        this.dialogFormMaterial = true;
    },
    add(){
        this.materialText = '添加',
        this.dialogFormMaterial = true;
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
.enterpriseStyle{
    width: 100%;
    overflow: hidden;
}
.enterpriseStyle p{
   margin: 0;
}
.enterpriseStyle ul{
    width: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
    margin-top: 10px;
    font-size: 14px;
}
.enterpriseStyle ul li{
  width: 100%;
  height: 35px;
  line-height: 35px;  
}
</style>



