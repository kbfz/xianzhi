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
            <el-input v-model="query.batchNo" placeholder="批次号" clearable></el-input>
            <el-input v-model="query.expressNo" placeholder="运单号" clearable></el-input>
            <el-input v-model="query.importUser" placeholder="添加人" clearable></el-input>
            <el-date-picker
              v-model="query.month"
              type="month"
              format='yyyy-MM' 
              @change="queryMonthChange"
              placeholder="账单月份">
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
              <el-table-column min-width="140px" align="center" label="批次号" prop='batchNo'   show-overflow-tooltip/>
              <el-table-column min-width="140px" align="center" label="运单号" prop='expressNo'   show-overflow-tooltip/>
              <el-table-column min-width="140px" align="center" label="托盘数" prop='trayQuantity' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="重量" prop='weight' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="计费重量/尺寸" prop='countWeight' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="车型" prop='carModel' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="提货费" prop='pickUpFee' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="分单提货费" prop='singlePickUpFee' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="危险品提货费" prop='dangerPickUpFee' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="仓储费" prop='warehouseFee' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="卸车费" prop='unloadFee' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="复重费" prop='repeatFee' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="核本费" prop='checkFee' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="直航费" prop='flightFee' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="转关费" prop='transferFee' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="操作费" prop='operateFee' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="装卸费" prop='loadUnloadFee' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="车费" prop='carFee' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="押夜/放空" prop='temporaryStorageFee' show-overflow-tooltip/>
              <el-table-column min-width="100px" align="center" label="总合计" prop='total' show-overflow-tooltip/>
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
               <el-form-item label="批次号" prop="batchNo" class="marginListAdd">
                <el-input v-model="form.batchNo" placeholder="批次号" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="运单号" prop="expressNo" class="marginListAdd">
                <el-input v-model="form.expressNo" placeholder="运单号" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="托盘数" prop="trayQuantity" class="marginListAdd">
                <el-input v-model="form.trayQuantity" placeholder="托盘数" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="重量" prop="weight" class="marginListAdd">
                <el-input v-model="form.weight"  placeholder="重量" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="计费重量/尺寸" prop="countWeight" class="marginListAdd">
                <el-input v-model="form.countWeight"  placeholder="计费重量/尺寸" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="车型" prop="carModel" class="marginListAdd">
                <el-input v-model="form.carModel"  placeholder="车型" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="提货费" prop="pickUpFee" class="marginListAdd">
                <el-input v-model="form.pickUpFee" placeholder="提货费" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="分单提货费" prop="singlePickUpFee" class="marginListAdd">
                <el-input v-model="form.singlePickUpFee" placeholder="分单提货费" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="危险品提货费" prop="dangerPickUpFee" class="marginListAdd">
                <el-input v-model="form.dangerPickUpFee" placeholder="危险品提货费" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="仓储费" prop="warehouseFee" class="marginListAdd">
                <el-input v-model="form.warehouseFee" placeholder="仓储费" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="卸车费" prop="unloadFee" class="marginListAdd">
                <el-input v-model="form.unloadFee" placeholder="卸车费" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="复重费" prop="repeatFee" class="marginListAdd">
                <el-input v-model="form.repeatFee" placeholder="复重费" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="核本费" prop="checkFee" class="marginListAdd">
                <el-input v-model="form.checkFee" placeholder="核本费" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="直航费" prop="flightFee" class="marginListAdd">
                <el-input v-model="form.flightFee" placeholder="直航费" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="转关费" prop="transferFee" class="marginListAdd">
                <el-input v-model="form.transferFee" placeholder="转关费" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="操作费" prop="operateFee" class="marginListAdd">
                <el-input v-model="form.operateFee" placeholder="操作费" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="装卸费" prop="loadUnloadFee" class="marginListAdd">
                <el-input v-model="form.loadUnloadFee" placeholder="装卸费" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="车费" prop="carFee" class="marginListAdd">
                <el-input v-model="form.carFee" placeholder="车费" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="押夜/放空" prop="temporaryStorageFee" class="marginListAdd">
                <el-input v-model="form.temporaryStorageFee" placeholder="押夜/放空" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="总合计" prop="total" class="marginListAdd">
                <el-input v-model="form.total" placeholder="总合计" style="width:200px"></el-input>
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
  getTransferPage,
  addTransfer,
  editTransfer,
  deleteTransfer,
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
        customerName:undefined, // 客户名称
        expressNo: undefined,
        importUser: undefined,
        batchNo: undefined,
        month:''
      },
      nameInfo: "",
      select: {
        customer: [],
        billName: [],
      },
      customerOption:[],
      dialogFormMaterial: false,
      materialText: '添加',
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
        customerName:'',
        customerCode:''
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
      getTransferPage(param).then((response) => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
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
    queryMonthChange(val){
       this.query.month = val
    },
    // 下载模板
    getTemplate(){
      let query = {
          fileType: "transfer",
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
      this.$http.post("/api/ordersys/customerFinanceBillTransfer/importTransfer",
          formData,
          config
        ).then((res) => {
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
          this.deleteBillReturn(row.id)
        }).catch(() => {});
    },
    //  删除
    deleteBillReturn(id){
      deleteTransfer(id).then(res =>{
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
          console.log(this.customerOption)
      });
    },
    closeMaterial() {
      this.dialogFormMaterial = false;
      this.form = {month:'',customerName:'',customerCode:''};
      this.id = ''
    },
    monthChange(val){
      this.formatMonth = val;
      this.form.month = val;
    },
    // 编辑
    editEvent(){
      if(this.form.customerName ==''){ return  this.$message({ message: '客户名称不能为空',type: 'warning'})}
      if(this.form.customerCode ==''){ return  this.$message({ message: '客户编号不能为空',type: 'warning'})}
      if(this.form.month ==''){ return  this.$message({ message: '账单月份不能为空',type: 'warning'})}
      if(this.form.expressNo ==''){ return  this.$message({ message: '运单号不能为空',type: 'warning'})}
      if(this.form.batchNo ==''){ return  this.$message({ message: '批次号不能为空',type: 'warning'})}
      if(this.form.trayQuantity ==''){ return  this.$message({ message: '托盘数不能为空',type: 'warning'})}
      if(this.form.weight ==''){ return  this.$message({ message: '重量不能为空',type: 'warning'})}
      if(this.form.countWeight ==''){ return  this.$message({ message: '计费重量/尺寸不能为空',type: 'warning'})}
      if(this.form.carModel ==''){ return  this.$message({ message: '车型不能为空',type: 'warning'})}
      if(this.form.pickUpFee ==''){ return  this.$message({ message: '提货费不能为空',type: 'warning'})}
      if(this.form.singlePickUpFee ==''){ return  this.$message({ message: '分单提货费不能为空',type: 'warning'})}
      if(this.form.dangerPickUpFee ==''){ return  this.$message({ message: '危险品提货费不能为空',type: 'warning'})}
      if(this.form.warehouseFee ==''){ return  this.$message({ message: '仓储费不能为空',type: 'warning'})}
      if(this.form.unloadFee ==''){ return  this.$message({ message: '卸车费不能为空',type: 'warning'})}
      if(this.form.repeatFee ==''){ return  this.$message({ message: '复重费不能为空',type: 'warning'})}
      if(this.form.checkFee ==''){ return  this.$message({ message: '核本费不能为空',type: 'warning'})}
      if(this.form.flightFee ==''){ return  this.$message({ message: '直航费不能为空',type: 'warning'})}
      if(this.form.transferFee ==''){ return  this.$message({ message: '转关费不能为空',type: 'warning'})}
      if(this.form.operateFee ==''){ return  this.$message({ message: '操作费不能为空',type: 'warning'})}
      if(this.form.loadUnloadFee ==''){ return  this.$message({ message: '装卸费不能为空',type: 'warning'})}
      if(this.form.carFee ==''){ return  this.$message({ message: '车费不能为空',type: 'warning'})}
      if(this.form.temporaryStorageFee ==''){ return  this.$message({ message: '押夜/放空不能为空',type: 'warning'})}
      if(this.form.total ==''){ return  this.$message({ message: '总合计不能为空',type: 'warning'})}
      let param = JSON.parse(JSON.stringify(this.form));
      param.id = this.id
      editTransfer(this.id,param).then(res =>{
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
      if(this.form.customerName ===''){ return  this.$message({ message: '客户名称不能为空',type: 'warning'})}
      if(this.form.customerCode ===''){ return  this.$message({ message: '客户编号不能为空',type: 'warning'})}
      if(this.form.month ===''){ return  this.$message({ message: '账单月份不能为空',type: 'warning'})}
      if(this.form.expressNo ===''){ return  this.$message({ message: '运单号不能为空',type: 'warning'})}
      if(this.form.batchNo ===''){ return  this.$message({ message: '批次号不能为空',type: 'warning'})}
      if(this.form.trayQuantity ===''){ return  this.$message({ message: '托盘数不能为空',type: 'warning'})}
      if(this.form.weight ===''){ return  this.$message({ message: '重量不能为空',type: 'warning'})}
      if(this.form.countWeight ===''){ return  this.$message({ message: '计费重量/尺寸不能为空',type: 'warning'})}
      if(this.form.carModel ===''){ return  this.$message({ message: '车型不能为空',type: 'warning'})}
      if(this.form.pickUpFee ===''){ return  this.$message({ message: '提货费不能为空',type: 'warning'})}
      if(this.form.singlePickUpFee ===''){ return  this.$message({ message: '分单提货费不能为空',type: 'warning'})}
      if(this.form.dangerPickUpFee ===''){ return  this.$message({ message: '危险品提货费不能为空',type: 'warning'})}
      if(this.form.warehouseFee ===''){ return  this.$message({ message: '仓储费不能为空',type: 'warning'})}
      if(this.form.unloadFee ===''){ return  this.$message({ message: '卸车费不能为空',type: 'warning'})}
      if(this.form.repeatFee ===''){ return  this.$message({ message: '复重费不能为空',type: 'warning'})}
      if(this.form.checkFee ===''){ return  this.$message({ message: '核本费不能为空',type: 'warning'})}
      if(this.form.flightFee ===''){ return  this.$message({ message: '直航费不能为空',type: 'warning'})}
      if(this.form.transferFee ===''){ return  this.$message({ message: '转关费不能为空',type: 'warning'})}
      if(this.form.operateFee ===''){ return  this.$message({ message: '操作费不能为空',type: 'warning'})}
      if(this.form.loadUnloadFee ===''){ return  this.$message({ message: '装卸费不能为空',type: 'warning'})}
      if(this.form.carFee ===''){ return  this.$message({ message: '车费不能为空',type: 'warning'})}
      if(this.form.temporaryStorageFee ===''){ return  this.$message({ message: '押夜/放空不能为空',type: 'warning'})}
      if(this.form.total ===''){ return  this.$message({ message: '总合计不能为空',type: 'warning'})}
       addTransfer(this.form).then(res =>{
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
        // let {customerName,customerCode,month,expressNo,returnExpressNo,returnAddress,weight,postFee} = row;
        // this.form = {customerName,customerCode,month,expressNo,returnExpressNo,returnAddress,weight,postFee} 
        
        Object.assign(this.form,row)
        this.form.weight = String(this.form.weight)
        this.form.postFee = String(this.form.postFee)

        this.materialText = '编辑',
        this.dialogFormMaterial = true;
    },
    add(){
        this.materialText = '添加',
        this.dialogFormMaterial = true;
        // this.form =  {customerName:0,customerCode:0,month:'', expressNo:0,
        // batchNo:0,trayQuantity:0,weight:0,countWeight:0, carModel:0,pickUpFee:0,singlePickUpFee:0,
        // dangerPickUpFee:0,warehouseFee:0, unloadFee:0,repeatFee:0,checkFee:0,flightFee:0,transferFee:0,
        // operateFee:0,loadUnloadFee:0,carFee:0, temporaryStorageFee:0,total:0}
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
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



