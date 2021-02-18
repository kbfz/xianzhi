<template>
  <div class="app-container calendar-list-container" id="app-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="24">
        <div class="app-container-left">
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
              <el-table-column min-width="100px" align="center" label="项次" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.item}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="120px" align="center" label="起运地" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.origin}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="120px" align="center" label="目的地" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.destination}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="120px" align="center" label="平台" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.platform}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="100px" align="center" label="板数" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.boardNumber}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="160px" align="center" label="发车日期" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.startTime}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="160px" align="center" label="运抵日期" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.endTime}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="100px" align="center" label="车型" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.carModel}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="100px" align="center" label="运费" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.postFee}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="100px" align="center" label="过磅费" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.weighFee}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="120px" align="center" label="Total(RMB)" show-overflow-tooltip>
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
           
              <el-form-item label="客户编号"  class="marginListAdd">
                <el-input v-model="form.customerName.value" disabled placeholder="客户编号" style="width:200px"></el-input>
              </el-form-item>
              <div style="position: relative;float: left">
               <span class="xhText" style="left: 15px">*</span>
              <el-form-item label="账单月份"  class="marginListAdd">
                <el-date-picker
                  v-model="form.month"
                  type="month"
                  placeholder="选择月"
                  style="width:200px"
                ></el-date-picker>
              </el-form-item>
              </div>
              <div style="position: relative;float: left">
               <span class="xhText" style="left: 42px">*</span>
              <el-form-item label="项次"  class="marginListAdd">
                <el-input v-model="form.item" placeholder="项次" style="width:200px"></el-input>
              </el-form-item>
              </div>
              <div style="position: relative;float: left">
               <span class="xhText" style="left: 30px">*</span>
              <el-form-item label="起运地"  class="marginListAdd">
                <el-input v-model="form.origin" placeholder="起运地" style="width:200px"></el-input>
              </el-form-item>
              </div>
              <div style="position: relative;float: left">
               <span class="xhText" style="left: 30px">*</span>
              <el-form-item label="目的地"  class="marginListAdd">
                <el-input v-model="form.destination" placeholder="目的地" style="width:200px"></el-input>
              </el-form-item>
              </div>
              <div style="position: relative;float: left">
               <span class="xhText" style="left: 42px">*</span>
              <el-form-item label="平台"  class="marginListAdd">
                <el-input v-model="form.platform" placeholder="平台" style="width:200px"></el-input>
              </el-form-item>
              </div>
              <div style="position: relative;float: left">
               <span class="xhText" style="left: 42px">*</span>
              <el-form-item label="板数"  class="marginListAdd">
                <el-input v-model="form.boardNumber" placeholder="板数" style="width:200px"></el-input>
              </el-form-item>
              </div>
              <div style="position: relative;float: left">
               <span class="xhText" style="left: 15px">*</span>
              <el-form-item label="发车日期"  class="marginListAdd">
                 <el-date-picker
                    v-model="form.startTime"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                    :picker-options="pickerOptions0">
                    </el-date-picker>
              </el-form-item>
              </div>
              <div style="position: relative;float: left">
               <span class="xhText" style="left: 15px">*</span>
               <el-form-item label="运抵日期" class="marginListAdd">
                 <el-date-picker
                    v-model="form.endTime"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px"
                    :picker-options="pickerOptions0">
                    </el-date-picker>
              </el-form-item>
              </div>
              <div style="position: relative;float: left">
               <span class="xhText" style="left: 42px">*</span>
              <el-form-item label="车型"  class="marginListAdd">
                <el-input v-model="form.carModel" placeholder="车型" style="width:200px"></el-input>
              </el-form-item>
              </div>
              <div style="position: relative;float: left">
               <span class="xhText" style="left: 42px">*</span>
              <el-form-item label="运费"  class="marginListAdd">
                <el-input v-model="form.postFee" placeholder="运费" style="width:200px"></el-input>
              </el-form-item>
              </div>
              <div style="position: relative;float: left">
               <span class="xhText" style="left: 30px">*</span>
              <el-form-item label="过磅费"  class="marginListAdd">
                <el-input v-model="form.weighFee" placeholder="过磅费" style="width:200px"></el-input>
              </el-form-item>
              </div>
              <div style="position: relative;float: left">
               <span class="xhText" style="left: 0px">*</span>
              <el-form-item label="Total(RMB)"  class="marginListAdd">
                <el-input v-model="form.total" placeholder="Total(RMB)" style="width:200px"></el-input>
              </el-form-item>
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer center">
              <el-button @click="closeMaterial">取消</el-button>
              <el-button type="primary" @click="addSubmit" v-if="materialText == '添加'">保存</el-button>
              <el-button type="primary" @click="updateSubmit" v-if="materialText == '编辑'">保存</el-button>
            </div>
          </el-dialog>
          <!-- 导入 -->
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
                accept=".xls,.xlsx"
                name="file"
                class="noneborder"
                @change="getFile($event)"
              />
          </div>
             
            <div slot="footer" class="dialog-footer">
              <el-button @click="closeDialogExport">取 消</el-button>
              <el-button type="primary" @click="exportSave($event)" >导 入</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {getCustomerSelectList}  from "api/financialSys/chargingStandard/index";
import { page,addObj,getObj,updateObj,delObj,addUpload } from "api/financialSys/logisticsUpload/index";
import { mapGetters } from "vuex";
import { getToken } from 'utils/auth';
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
      },
      query: {
        month:'',
        customerCode:''
      },
      nameInfo: "",
      dialogVisible:false,
      select: {
        customer: [],
        billName: [],
      },
      dialogFormMaterial: false,
      materialText: "添加",
      rules: {},
      form: {
       boardNumber:'',
       carModel:'',
       createTime:'',
       customerCode:'',
       customerName:{key:'',value: ''},
       destination:'',
       endTime:'',
       importUser:'',
       importUserAccount:'',
       item:'',
       month:'',
       origin:'',
       platform:'',
       postFee:'',
       startTime:'',
       total:'',
       weighFee:'',
       id:''
      },
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
       month:this.query.month === '' ? '' : dateUtils.format(this.query.month, "YYYY-MM"),
        customerCode:this.query.customerCode,
        ...this.listQuery,
      };
      page(param).then((response) => {
        this.listLoading = false;
        this.list = response.data.rows;
        this.total = response.data.total;
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
    on_page_select(val) {
      this.pageChoose = val;
    },

    // 获取客户信息
    customerNameInfo() {
      let param = {};
      getCustomerSelectList(param).then((response) => {
        this.select.customer= response.data
      })
    },
    closeMaterial() {
      this.dialogFormMaterial = false;
    },

    update(row) {
      this.materialText = "编辑"
      getObj(row.id).then(res => {
         let obj = {};
          for (var i = 0; i < this.select.customer.length; i++) {
            if (res.data.customerCode == this.select.customer[i].value) {
              obj = this.select.customer[i];
            }
          }
        res.data.customerName = obj
        this.form = res.data
      })
      this.dialogFormMaterial = true
    },
    add() {
      this.materialText = "添加"
      this.reset()
      this.dialogFormMaterial = true
       
    },
    reset(){
      this.form = {
       boardNumber:'',
       carModel:'',
       createTime:'',
       customerCode:'',
       customerName:{key:'',value: ''},
       destination:'',
       endTime:'',
       importUser:'',
       importUserAccount:'',
       item:'',
       month:'',
       origin:'',
       platform:'',
       postFee:'',
       startTime:'',
       total:'',
       weighFee:'',
       id:''
      }
    },
    // 添加保存
    addSubmit(){
      let obj = {
       boardNumber:this.form.boardNumber,
       carModel:this.form.carModel,
       createTime:this.form.createTime === '' ? '' : dateUtils.format(this.form.createTime, "YYYY-MM-DD"),
       customerCode:this.form.customerName.value,
       customerName:this.form.customerName.key,
       destination:this.form.destination,
       endTime:this.form.endTime === '' ? '' : dateUtils.format(this.form.endTime, "YYYY-MM-DD"),
       importUser:this.form.importUser,
       importUserAccount:this.form.importUserAccount,
       item:this.form.item,
       month:this.form.month === '' ? '' : dateUtils.format(this.form.month, "YYYY-MM"),
       origin:this.form.origin,
       platform:this.form.platform,
       postFee:this.form.postFee,
       startTime:this.form.startTime === '' ? '' : dateUtils.format(this.form.startTime, "YYYY-MM-DD"),
       total:this.form.total,
       weighFee:this.form.weighFee,
       id:this.form.id
      }
       if(!obj.customerName){
         this.$message({
              message: "客户名称不能为空",
              type: 'error'
            });
        return false
      }
      if(!obj.month){
         this.$message({
              message: "账单月份不能为空",
              type: 'error'
            });
        return false
      }
       if(!obj.item){
         this.$message({
              message: "项次不能为空",
              type: 'error'
            });
        return false
      }
      if(!obj.origin){
         this.$message({
              message: "起运地不能为空",
              type: 'error'
            });
        return false
      }
       if(!obj.destination){
         this.$message({
              message: "目的地不能为空",
              type: 'error'
            });
        return false
      }
       if(!obj.platform){
         this.$message({
              message: "平台不能为空",
              type: 'error'
            });
        return false
      }
       if(!obj.boardNumber){
         this.$message({
              message: "板数不能为空",
              type: 'error'
            });
        return false
      }
      if(!obj.startTime){
         this.$message({
              message: "发车日期不能为空",
              type: 'error'
            });
        return false
      }
      if(!obj.endTime){
         this.$message({
              message: "运抵日期不能为空",
              type: 'error'
            });
        return false
      }
      if(!obj.carModel){
         this.$message({
              message: "车型不能为空",
              type: 'error'
            });
        return false
      }
      if(!obj.postFee){
         this.$message({
              message: "运费不能为空",
              type: 'error'
            });
        return false
      }
      if(!obj.weighFee){
         this.$message({
              message: "过磅费不能为空",
              type: 'error'
            });
        return false
      }
       if(!obj.total){
         this.$message({
              message: "总计费用不能为空",
              type: 'error'
            });
        return false
      }
      this.$confirm("确定要保存吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        addObj(obj).then(res => {
          if (res.rel) {
              this.$notify({
                title: "成功",
                message: "保存成功",
                type: "success",
                duration: 2000,
              });
              this.dialogFormMaterial= false
              this.getList();
            } else {
              this.$notify({
                title: "失败",
                message: res.message,
                type: "error",
                duration: 2000,
              })
            }
        })
      })
    },
    // 添加保存
    updateSubmit(){
      let obj = {
       boardNumber:this.form.boardNumber,
       carModel:this.form.carModel,
       createTime:this.form.createTime === '' ? '' : dateUtils.format(this.form.createTime, "YYYY-MM-DD"),
       customerCode:this.form.customerName.value,
       customerName:this.form.customerName.key,
       destination:this.form.destination,
       endTime:this.form.endTime === '' ? '' : dateUtils.format(this.form.endTime, "YYYY-MM-DD"),
       importUser:this.form.importUser,
       importUserAccount:this.form.importUserAccount,
       item:this.form.item,
       month:this.form.month === '' ? '' : dateUtils.format(this.form.month, "YYYY-MM"),
       origin:this.form.origin,
       platform:this.form.platform,
       postFee:this.form.postFee,
       startTime:this.form.startTime === '' ? '' : dateUtils.format(this.form.startTime, "YYYY-MM-DD"),
       total:this.form.total,
       weighFee:this.form.weighFee,
       id:this.form.id
      }
      console.log(obj)
       if(!obj.customerName){
         this.$message({
              message: "客户名称不能为空",
              type: 'error'
            });
        return false
      }
      if(!obj.month){
         this.$message({
              message: "账单月份不能为空",
              type: 'error'
            });
        return false
      }
       if(!obj.item){
         this.$message({
              message: "项次不能为空",
              type: 'error'
            });
        return false
      }
      if(!obj.origin){
         this.$message({
              message: "起运地不能为空",
              type: 'error'
            });
        return false
      }
       if(!obj.destination){
         this.$message({
              message: "目的地不能为空",
              type: 'error'
            });
        return false
      }
       if(!obj.platform){
         this.$message({
              message: "平台不能为空",
              type: 'error'
            });
        return false
      }
       if(!obj.boardNumber){
         this.$message({
              message: "板数不能为空",
              type: 'error'
            });
        return false
      }
      if(!obj.startTime){
         this.$message({
              message: "发车日期不能为空",
              type: 'error'
            });
        return false
      }
      if(!obj.endTime){
         this.$message({
              message: "运抵日期不能为空",
              type: 'error'
            });
        return false
      }
      if(!obj.carModel){
         this.$message({
              message: "车型不能为空",
              type: 'error'
            });
        return false
      }
      if(!obj.postFee){
         this.$message({
              message: "运费不能为空",
              type: 'error'
            });
        return false
      }
      if(!obj.weighFee){
         this.$message({
              message: "过磅费不能为空",
              type: 'error'
            });
        return false
      }
       if(!obj.total){
         this.$message({
              message: "总计费用不能为空",
              type: 'error'
            });
        return false
      }
      this.$confirm("确定要保存吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        updateObj(obj.id,obj).then(res => {
          if (res.rel) {
              this.$notify({
                title: "成功",
                message: "保存成功",
                type: "success",
                duration: 2000,
              });
              this.dialogFormMaterial= false
              this.getList();
            } else {
              this.$notify({
                title: "失败",
                message: res.message,
                type: "error",
                duration: 2000,
              })
            }
        })
      })
    },
    // 删除
    delLogistic(row){
    this.$confirm("确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delObj(row.id).then(res => {
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
              })
            }
        })
      })
    },
    // 导入
        closeDialogExport() {
      this.dialogVisible = false;
    },
    exportorder(){
       this.dialogVisible = true
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
          // 'accessToken': getToken()
        }
      }
      this.$http.post("/api/ordersys/customerFinanceBillInternational/importInternational", formData, config).then(res => {
          this.$refs.clearFile.value = "";
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
     downLoad() {
      let query={
        fileType:'international'
      }
      let host = window.location.host;
      window.location.href = "//" + host + '/api/ordersys/financeFileTemplate/getTemplate?fileType=' + query.fileType
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



