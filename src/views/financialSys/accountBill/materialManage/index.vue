<template>
  <div class="app-container calendar-list-container" id="app-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="24">
        <div class="app-container-left">
          <div class="filter-container">
            <el-input placeholder="编号" style="width: 200px" v-model="query.packagingCode"></el-input>
             <el-input placeholder="包材名称" style="width: 200px" v-model="query.packagingName"></el-input>
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
              <el-table-column min-width="150px" align="center" label="唯一编号" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.packagingCode}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="150px" align="center" label="包材名称" show-overflow-tooltip>
                <template scope="scope">
                  <span >{{scope.row.packagingName}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="150px" align="center" label="规格" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.specification}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="100px" align="center" label="相关企业" show-overflow-tooltip>
                <template scope="scope">
                  <el-button type="text" @click="enterprise(scope.row)">{{scope.row.relatedBusiness}}</el-button>
                </template>
              </el-table-column>
              <el-table-column width="120px" align="center" label="操作" show-overflow-tooltip>
                <template scope="scope">
                  <el-button type="text" @click="update(scope.row)">编辑</el-button>
                  <el-button type="text" @click="delMaterial(scope.row)">删除</el-button>
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
            class="receiptWidth450"
          >
            <el-form :model="form" :rules="rules" ref="form" label-width="80px">
              <span class="xhText" style="left: 39px">*</span>
              <el-form-item label="编号" class="marginListAdd">
                <el-input placeholder="编号" style="width:300px" v-model="form.packagingCode"></el-input>
              </el-form-item>
              <span class="xhText">*</span>
              <el-form-item label="包材名称"  class="marginListAdd">
                <el-input v-model="form.packagingName" placeholder="包材名称" style="width:300px"></el-input>
              </el-form-item>
              <span class="xhText" style="left: 39px">*</span>
               <el-form-item label="规格"  class="marginListAdd">
                <el-input v-model="form.specification" placeholder="规格" style="width:300px"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer center">
              <el-button @click="closeMaterial">取消</el-button>
              <el-button type="primary" @click="addSubmit" v-if="materialText == '添加'">提交</el-button>
              <el-button type="primary" @click="updateSubmit" v-if="materialText == '编辑'">提交</el-button>
            </div>
          </el-dialog>
          <!-- 相关企业 -->
         <el-dialog
            title="相关企业"
            :visible.sync="dialogFormEnterprise"
            :before-close="closeEnterprise"
            class="receiptWidth450"
          >
          <div class="enterpriseStyle">
            <p>共有以下 {{enterpriseList.length}} 个企业使用此规格的包材：</p>
            <ul>
                <li v-for="item in enterpriseList" :key="item">{{item}}</li>
            </ul>
          </div>
            <div slot="footer" class="dialog-footer center">
              <el-button type="primary" @click="closeEnterprise">确定</el-button>
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
 getObj,
 updateObj,
 delObj,
 getCustomer
} from "api/financialSys/materialManage/index";
import { 
  getCustomerSelectList, 
} from "@/api/financialSys/chargingStandard";
import { mapGetters } from "vuex";
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
      enterpriseList: [
      ],
      query: {
       packagingName: '',
       packagingCode:''
      },
      nameInfo: "",
      select: {
        customer: [],
        billName: [],
      },
      dialogFormMaterial: false,
      dialogFormEnterprise: false,
      materialText: '添加',
      rules: {
        // dictTypeName: [
        //   {
        //     required: true,
        //     message: '请输入字典类型名称',
        //     trigger: 'change'
        //   }
        // ],
      },
      customerList: [],
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
        id:'',
        packagingCode:'',
       packagingName:'',
       relatedBusiness:'',
       specification:''
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
        packagingName: this.query.packagingName,
       packagingCode:this.query.packagingCode,
        ...this.listQuery,
      };
      page(param).then((response) => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
       // 获取客户信息
    customerNameInfo() {
      let param = {};
      getCustomerSelectList(param).then((response) => {
           this.customerList = response.data
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
    closeMaterial() {
      this.dialogFormMaterial = false;
    },
      closeEnterprise() {
      this.dialogFormEnterprise = false;
    },
    
    update(row){
      this.materialText = '编辑',
      getObj(row.id).then(res => {
        this.form = res.data
      })
      this.dialogFormMaterial = true;
    },
    reset(){
      this.form = {
        id:'',
        packagingCode:'',
       packagingName:'',
       relatedBusiness:'',
       specification:''
      }
    },
    add(){
        this.materialText = '添加',
        this.dialogFormMaterial = true;
        this.reset()
    },
    // 新增保存
    addSubmit(){
      let obj = {
         id: this.form.id,
        packagingCode:this.form.packagingCode,
       packagingName:this.form.packagingName,
       specification:this.form.specification
      }
      if(!obj.packagingCode){
         this.$message({
              message: "编号不能为空",
              type: 'error'
            });
        return false
      }
      if(!obj.packagingName){
         this.$message({
              message: "包材名称不能为空",
              type: 'error'
            });
        return false
      }
      if(!obj.specification){
         this.$message({
              message: "规格不能为空",
              type: 'error'
            });
        return false
      }
      this.$confirm("确定要保存吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          addObj(obj).then(res => {
          this.dialogFormMaterial = false;
            if (res.rel) {
              this.$notify({
                title: "成功",
                message: "保存成功",
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
          })
        })
    },
    // 编辑保存
    updateSubmit(){
      let obj = {
         id: this.form.id,
        packagingCode:this.form.packagingCode,
       packagingName:this.form.packagingName,
       specification:this.form.specification
      }
      if(!obj.packagingCode){
         this.$message({
              message: "编号不能为空",
              type: 'error'
            });
        return false
      }
      if(!obj.packagingName){
         this.$message({
              message: "包材名称不能为空",
              type: 'error'
            });
        return false
      }
      if(!obj.specification){
         this.$message({
              message: "规格不能为空",
              type: 'error'
            });
        return false
      }
      this.$confirm("确定要保存吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updateObj(obj.id,obj).then(res => {
          this.dialogFormMaterial = false;
            if (res.rel) {
              this.$notify({
                title: "成功",
                message: "保存成功",
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
          })
        })
    },
    // 删除
    delMaterial(row){
      this.$confirm("确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
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
              });
            }
          })
        })
    },
    enterprise(row){
      let query = {
        packagingId: row.id
      }
      getCustomer(query).then(res => {
        if(res.rel){
          this.enterpriseList = res.data
        }
      })
      this.dialogFormEnterprise = true
    }
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
.xhText {
  position: relative;
  top: 9px;
  left: 10px;
  color: red;
  float: left;
}
</style>



