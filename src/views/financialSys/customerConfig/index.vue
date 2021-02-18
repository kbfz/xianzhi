<template>
  <div class="app-container calendar-list-container">
    <div class="app-container-left">
      <div class="filter-container">
        <el-select
          v-model="query.period"
          placeholder="请选择税单时段"
          style="width: 200px"
          filterable
          clearable
          popper-class="optionsContent"
        >
          <el-option
            v-for="item in selectTaxTime"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          style="width: 200px;"
          class="filter-item"
          placeholder="请输入税单编码"
          v-model="query.billNo"
        ></el-input>
        <el-select
          v-model="query.scheduleStatus"
          placeholder="请选择缴费进度"
          style="width: 200px"
          popper-class="optionsContent"
          filterable
          clearable
        >
          <el-option
            v-for="item in paymentNum"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
        <el-button
          class="filter-item"
          style="float: right;"
          @click="handleCreate"
          type="primary"
        >导入税单明细</el-button>
      </div>
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
        <el-table-column min-width="230px" align="center" label="报关企业" show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.declarationName}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="150px" align="center" label="税单编号" show-overflow-tooltip>
          <template scope="scope">
            <span v-if="scope.row.fileStatus !== 0">{{scope.row.billNo}}</span>
            <span
              v-if="scope.row.fileStatus === 0"
              style="color: #20A0FF; cursor: pointer;"
              @click="texDetail(scope.row)"
            >{{scope.row.billNo}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="150px" align="center" label="税单状态" show-overflow-tooltip>
          <template scope="scope">
            <span v-if="scope.row.fileStatus === 0">解析成功</span>
            <span v-if="scope.row.fileStatus === 1">解析失败</span>
            <el-button
              type="text"
              style="margin-left: 10px"
              v-if="scope.row.fileStatus === 1"
              @click="reasonTax(scope.row)"
            >原因</el-button>
            <span
              v-if="scope.row.fileStatus === undefined || scope.row.fileStatus === '' || scope.row.fileStatus === null"
            >处理中</span>
          </template>
        </el-table-column>
        <el-table-column min-width="180px" align="center" label="起始日期" show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.taxStartTime}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="180px" align="center" label="结束日期" show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.taxEndTime}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="150px" align="center" label="总金额（元）" show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.billAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="150px" align="center" label="订单总条数" show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.billCount}}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="130px" align="center" label="缴费进度" show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.schedule}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="120px" align="center" label="导入人" show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.createUser }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="180px" align="center" label="导入时间" show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="150px" align="center" label="操作" show-overflow-tooltip>
          <template scope="scope">
            <el-button type="text" @click="rechargeDialog(scope.row)">编辑</el-button>
            <el-button type="text" @click="deldectTax(scope.row)">删除</el-button>
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
      <!-- 导出税单明细 -->
      <el-dialog
        title="导入税单明细"
        :visible.sync="dialogFormVisible"
        :before-close="closeDialog"
        :close-on-click-modal="false"
        class="receiptWidth600"
      >
        <el-form
          :model="formTax"
          :rules="rulesTax"
          ref="form"
          label-width="120px"
          :inline="true"
          class="formLeft"
        >
          <div>
            <span class="xhText">*</span>
            <el-form-item label="报关企业" prop="declarationCode" class="marginListAdd">
              <el-select
                v-model="formTax.declarationCode"
                placeholder="请选择报关企业"
                style="width: 300px"
                filterable
                clearable
              >
                <el-option
                  v-for="item in selectPlatfrom"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <span class="xhText">*</span>
            <el-form-item label="税单编号" prop="billNo" class="marginListAdd">
              <el-input v-model="formTax.billNo" placeholder="请输入税单编号" style="width:300px"></el-input>
              <!-- <span class="addText">系统内自定义税单编号，仅为方便查询使用（非海关税单编号）</span> -->
            </el-form-item>
          </div>

          <div>
            <span class="startTime">*</span>
            <el-form-item label="税单开始日期" class="marginListAdd" prop="taxStartTime">
              <el-date-picker
                type="date"
                style="width:300px"
                placeholder="选择开始日期"
                v-model="formTax.taxStartTime"
                format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div>
            <span class="startTime">*</span>
            <el-form-item label="税单结束日期" class="marginListAdd" prop="taxEndTime">
              <el-date-picker
                type="date"
                style="width:300px"
                v-model="formTax.taxEndTime"
                placeholder="选择结束日期"
                format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div>
            <span class="xhText">*</span>
            <el-form-item label="上传税单" class="marginListAdd">
              <input
                type="file"
                ref="clearFile"
                accept=".csv"
                name="file"
                class="noneborder"
                @change="getFile($event)"
              />
              <!-- <el-upload ref="uploadExcel"
                         :action="uploadUrls.excelUrl"
                         :headers="accessToken"
                         :file-list="uploadUrls.excelFileList"
                         :on-success="uploadExcelSuccess"
                         :on-error="uploadExcelError"
                         :before-upload="checkExcelFile"
                         accept=".csv"
                         :auto-upload="true">
                <el-button slot="trigger"
                           size="small"
                           type="primary">上传文件</el-button>
                <div slot="tip"
                     class="el-upload__tip">文件大小不能超过10MB</div>
              </el-upload>-->
              <!-- <el-upload ref="uploadExcel"
                         action
                         :headers="accessToken"
                         :file-list="uploadUrls.excelFileList"
                         :on-success="uploadExcelSuccess"
                         :on-error="uploadExcelError"
                         :before-upload="checkExcelFile"
                         accept=".csv"
                         :auto-upload="true"
                         :http-request="fileUpload">
                <el-button slot="trigger"
                           size="small"
                           type="primary">上传文件</el-button>
                <div slot="tip"
                     class="el-upload__tip">文件大小不能超过10MB</div>
              </el-upload>-->
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="create($event)">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑税单 -->
      <el-dialog
        title="编辑税单"
        :visible.sync="dialogFormRecharge"
        :before-close="closeRecharge"
        :close-on-click-modal="false"
        class="receiptWidth600"
      >
        <el-form
          :model="formUpdate"
          :rules="rulesUpdate"
          ref="form"
          label-width="120px"
          :inline="true"
          class="formLeft"
        >
          <div>
            <span class="xhText">*</span>
            <el-form-item label="税单编号" prop="billNo" class="marginListAdd">
              <el-input v-model="formUpdate.billNo" placeholder="请输入税单编号" style="width:300px"></el-input>
              <span class="addText">建议编号格式例如：201901，指的是2019年1月出的账单</span>
            </el-form-item>
          </div>
          <div>
            <span class="startTime">*</span>
            <el-form-item label="税单开始日期" class="marginListAdd">
              <el-date-picker
                type="date"
                style="width:300px"
                v-model="formUpdate.taxStartTime"
                placeholder="选择开始日期"
                format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div>
            <span class="startTime">*</span>
            <el-form-item label="税单结束日期" class="marginListAdd">
              <el-date-picker
                type="date"
                style="width:300px"
                v-model="formUpdate.taxEndTime"
                placeholder="选择结束日期"
                format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelRecharge">取 消</el-button>
          <el-button type="primary" @click="rechargeCustomer">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  page,
  selectTax,
  importDataUrl,
  addUpload,
  putObj,
  delObj,
  timeObj,
  selectNameObj
} from "api/financialSys/customerConfig/index";
import { getToken } from "utils/auth";
import { mapGetters } from "vuex";
var dateUtils = require("silly-datetime");
import axios from "axios";
// Vue.prototype.$http = axios;
// export function fileUpload(fileobj){
//     let param = new FormData();
//     // 上传文件对象 名称file与后台控制器参数要一致
//     param.append('file',fileobj.file);
//     return request({
//         method: 'post',
//         // 上传地址
//         url: '/goods-service/goods/sku/file',
//         // 定义上传头
//         headers: {'Content-Type':'multipart/form-data'},
//         data: param
//       });
// }
Vue.prototype.$http = axios;
export default {
  name: "bdAgent",
  components: {
    // 引入编辑的组件
    // "update-element": () => import("./components/update.vue")
  },
  data() {
    return {
      accessToken: {
        accessToken: getToken()
      },
      isList: true,
      selectCustom: [],
      selectTaxTime: [],
      paymentNum: [
        {
          label: "100%",
          value: 1
        },
        {
          label: "不足100%",
          value: 0
        }
      ],
      rules: {
        customerName: [
          {
            required: true,
            message: "请选择客户名称"
          }
        ],
        securityAccount: [
          {
            required: true,
            message: "请输入保证金账号",
            trigger: "blur"
          }
        ],
        securityAmount: [
          {
            required: true,
            message: "请输入阈值",
            trigger: "blur"
          }
        ],
        actualAmount: [
          {
            required: true,
            message: "请输入余额",
            trigger: "blur"
          }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      query: {
        scheduleStatus: "",
        period: "",
        billNo: ""
      },
      listQuery: {
        page: 1,
        limit: 10,
        orderBy: "createTimedesc"
      },
      dialogFormVisible: false,
      dialogFormRecharge: false,
      dialogStatus: "",
      bdAgentManager_btn_edit: false,
      bdAgentManager_btn_del: false,
      bdAgentManager_btn_add: true,
      tableKey: 0,
      rechargeRow: {},
      // 上传
      uploadUrls: {
        excelUrl: importDataUrl,
        excelFileList: []
      },
      formTax: {
        taxStartTime: "",
        taxEndTime: "",
        billNo: "",
        filePath: {},
        declarationCode: ""
        // file: ''
      },
      rulesTax: {},
      formUpdate: {
        id: "",
        billNo: "",
        taxEndTime: "",
        taxStartTime: ""
      },
      rulesUpdate: {},
      timeForm: {
        taxStartTime: "",
        taxEndTime: "",
        billNo: ""
      },
      selectPlatfrom: [],
      event: ""
    };
  },
  created() {
    this.getList();
    this.timeSelect();
    this.platSelect();
    this.bdAgentManager_btn_edit = this.elements["bdAgentManager:btn_edit"];
    this.bdAgentManager_btn_del = this.elements["bdAgentManager:btn_del"];
    this.bdAgentManager_btn_add = this.elements["bdAgentManager:btn_add"];
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
  methods: {
    // 关闭el-dialog 前的回调函数 重置表单
    closeDialog() {
      this.dialogFormVisible = false;
      this.$refs.clearFile.value = "";
      // this.$refs.uploadExcel.clearFiles(); // 清空上传列表
    },
    closeRecharge() {
      this.dialogFormRecharge = false;
    },

    getList() {
      this.listLoading = true;
      let param = {
        scheduleStatus: this.query.scheduleStatus,
        period: this.query.period,
        billNo: $.trim(this.query.billNo),
        ...this.listQuery
      };
      page(param).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    // 解析成功 跳转详情页
    texDetail(row) {
      let self = this;
      window.sessionStorage.setItem("billNo", "");
      window.sessionStorage.setItem("billNo", row.billNo);
      self.$router.push("/index/financialSys/customsListDetail");
    },
    handleFilter() {
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
    // 导出税单明细
    handleCreate() {
      this.dialogFormVisible = true;
      this.formTax = {
        taxStartTime: "",
        taxEndTime: "",
        billNo: "",
        filePath: {},
        declarationCode: ""
      };
      this.uploadUrls.excelFileList = [];
    },
    // 税单明细时间段
    timeSelect() {
      selectTax().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i];
          cutObj.value = response.data[i];
          this.selectTaxTime.push(cutObj);
        }
      });
    },
    // 判断时间段是否重复
    timeAgain() {
      let param = {
        taxStartTime: this.timeForm.taxStartTime,
        taxEndTime: this.timeForm.taxEndTime,
        billNo: this.timeForm.billNo
      };
      timeObj(param).then(res => {
        if (res.data) {
          this.$confirm("确定要保存吗", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.saveTex();
            })
            .catch(() => {});
        }
        if (res.message === "起始日期和结束日期已存在") {
          this.$confirm(
            "所选税单日期和系统中税单重复，确定要继续提交？",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          )
            .then(() => {
              this.saveTex();
              this.$message({
                type: "success",
                message: "提交成功!"
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消"
              });
            });
        } else if (res.message === "税单编号已存在") {
          this.$message({
            message: "提交失败,税单编号重复！",
            type: "error",
            duration: 2000
          });
          return false;
        }
      });
    },
    // 电商平台下拉框
    platSelect() {
      let param = {};
      selectNameObj(param).then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].cusCbeName;
          cutObj.value = response.data[i].cusCbeCode;
          this.selectPlatfrom.push(cutObj);
        }
      });
    },
    // 保存税单信息
    saveTex() {
      this.formTax.taxStartTime = dateUtils.format(
        this.formTax.taxStartTime,
        "YYYY-MM-DD"
      );
      this.formTax.taxEndTime = dateUtils.format(
        this.formTax.taxEndTime,
        "YYYY-MM-DD"
      );
      this.event.preventDefault();
      var formData = new FormData();
      formData.append("taxStartTime", this.formTax.taxStartTime);
      formData.append("taxEndTime", this.formTax.taxEndTime);
      formData.append("file", this.formTax.filePath);
      formData.append("billNo", this.formTax.billNo);
      formData.append("declarationCode", this.formTax.declarationCode);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$http
        .post("/api/ordersys/customsTaxInfo/upload", formData, config)
        .then(response => {
          this.dialogFormVisible = false;
          this.$refs.clearFile.value = "";
          if (response.data.rel == true) {
            this.getList();
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          } else {
            this.$notify({
              title: "失败",
              message: response.message,
              type: "error",
              duration: 2000
            });
          }
          if (response.data.status !== 200) {
            this.$notify({
              title: "失败",
              message: response.message,
              type: "error",
              duration: 2000
            });
          }
        });
    },
    create(event) {
      this.event = event;
      const set = this.$refs;
      if (this.formTax.declarationCode === "") {
        this.$message({
          message: "提交失败,报关企业不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }

      if (this.formTax.billNo === "") {
        this.$message({
          message: "提交失败,税单编号不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (this.formTax.taxStartTime === "") {
        this.$message({
          message: "提交失败,开始日期不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (!this.formTax.taxEndTime) {
        this.$message({
          message: "提交失败,结束日期不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      let sDate = new Date(this.formTax.taxStartTime);
      let eDate = new Date(this.formTax.taxEndTime);
      if (sDate.getTime() > eDate.getTime()) {
        this.$message({
          message: "提交失败,结束日期不能早于开始日期！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (!this.formTax.filePath) {
        this.$message({
          message: "提交失败,请选择上传文件！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      this.formTax.taxStartTime = dateUtils.format(
        this.formTax.taxStartTime,
        "YYYY-MM-DD"
      );
      this.formTax.taxEndTime = dateUtils.format(
        this.formTax.taxEndTime,
        "YYYY-MM-DD"
      );
      this.timeForm.taxStartTime = this.formTax.taxStartTime;
      this.timeForm.taxEndTime = this.formTax.taxEndTime;
      this.timeForm.billNo = this.formTax.billNo;
      this.timeAgain();

      // let config = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     'Authorization': this.token
      //   }
      // };
      // this.axios.post(apidate.uploadEnclosure, this.formTax, config)
      //   .then((response) => {
      //     if (response.data.info == "success") {            this.$message({
      //         type: 'success',
      //         message: '附件上传成功!'
      //       });
      //     }
      //   })
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      const set = this.$refs;
      set.clearFile.value = "";
      // set[formName].resetFields();
      // set.uploadExcel.clearFiles(); // 清空上传列表
    },
    cancelRecharge() {
      this.dialogFormRecharge = false;
    },
    // 编辑
    rechargeDialog(row) {
      this.dialogFormRecharge = true;
      this.formUpdate.billNo = row.billNo;
      this.formUpdate.taxEndTime = row.taxEndTime;
      this.formUpdate.taxStartTime = row.taxStartTime;
      this.formUpdate.id = row.id;
    },
    rechargeCustomer() {
      if (this.formUpdate.billNo === "") {
        this.$message({
          message: "提交失败,税单编号不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (this.formUpdate.taxStartTime === "") {
        this.$message({
          message: "提交失败,开始日期不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (this.formUpdate.taxEndTime === "") {
        this.$message({
          message: "提交失败,结束日期不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      let sDate = new Date(this.formUpdate.taxStartTime);
      let eDate = new Date(this.formUpdate.taxEndTime);
      if (sDate.getTime() > eDate.getTime()) {
        this.$message({
          message: "提交失败,结束日期不能早于开始日期！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      this.$confirm("确定要保存吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.formUpdate.taxStartTime = dateUtils.format(
            this.formUpdate.taxStartTime,
            "YYYY-MM-DD"
          );
          this.formUpdate.taxEndTime = dateUtils.format(
            this.formUpdate.taxEndTime,
            "YYYY-MM-DD"
          );
          putObj(this.formUpdate.id, this.formUpdate).then(res => {
            this.dialogFormRecharge = false;
            if (res.rel) {
              this.$notify({
                title: "成功",
                message: "保存成功",
                type: "success",
                duration: 2000
              });
              this.getList();
            } else {
              this.$notify({
                title: "失败",
                message: "系统异常",
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
          });
        })
        .catch(() => {});
    },
    // 上传成功
    // uploadExcelSuccess(response, file, fileList) {
    //   if (response.rel === false) {
    //     this.$alert(response.message);
    //     return;
    //   } else {
    //     this.$message({
    //       message: "提交成功：上传文件成功",
    //       type: "success",
    //       duration: 2000
    //     });
    //     this.formTax.filePath = response.data;
    //   }
    // },
    // // 上传失败
    // uploadExcelError(err, file, fileList) {
    //   this.$message({
    //     message: "提交失败：上传文件失败",
    //     type: "error",
    //     duration: 2000
    //   });
    // },
    // checkExcelFile(file) {
    //   let endswith = file.name.substring(file.name.lastIndexOf(".") + 1);
    //   const isJPG = endswith;
    //   const isLt2M = file.size / 1024 / 1024 <= 10;
    //   if (isJPG !== "csv") {
    //     this.$message.error("提交失败：上传文件格式错误！");
    //     this.uploadUrls.excelFileList = [];
    //     return false;
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("提交失败：上传文件不能超过10M！");
    //     this.uploadUrls.excelFileList = [];
    //     return false;
    //   }
    //   return isJPG && isLt2M;
    // },
    // 删除
    deldectTax(row) {
      this.$confirm("确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj(row.id).then(res => {
          if (res.rel) {
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
              message: "系统异常",
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
        });
      });
    },
    // 解析失败原因
    reasonTax(row) {
      this.$alert(row.reason, "税单异常原因", {
        dangerouslyUseHTMLString: true
      });
    },
    getFile(event) {
      this.formTax.filePath = event.target.files[0];
    }
  }
};
</script>
<style scoped>
.el-form-item {
  margin-left: 2%;
  /* width: 400px; */
}
.formLeft {
  padding-left: 2%;
}
.el-input,
.el-select {
  width: 200px;
}
.rechargeText {
  margin-left: 70px;
  font-size: 14px;
  color: #48576a;
  font-weight: bold;
  margin-right: 5px;
}
.addText {
  display: block;
  font-size: 12px;
  margin-top: 10px;
  color: #999;
}
.el-upload__tip {
  margin-top: 11px;
}
.xhText {
  /* display: inline-block; */
  position: relative;
  top: 10px;
  left: 63px;
  color: red;
}
.startTime {
  position: relative;
  top: 10px;
  left: 36px;
  color: red;
}
</style>
