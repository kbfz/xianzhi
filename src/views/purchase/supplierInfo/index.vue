<template>
  <div class="app-container calendar-list-container" id="app-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="24">
        <div class="app-container-left">
          <div class="filter-container">
            <el-select
              v-model="query.id"
              placeholder="请选择供应商全称"
              @keyup.enter.native="handleFilter"
              class="filter-item"
              filterable
              popper-class="optionsContent"
              clearable
            >
              <el-option
                v-for="item in supplierSelect"
                :key="item.id"
                :label="item.supplierName"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-button type="primary" @click="getList">查询</el-button>
            <el-button type="primary" @click="addList">添加</el-button>
          </div>
          <el-table
            :data="list"
            v-loading="loading.tableLoading"
            element-loading-text="正在加载中......"
            border
            fit
            highlight-current-row
            :height="elTableMediaHeight"
            style="width: 100%;overflow:hidden;"
          >
            <el-table-column
              width="70"
              align="center"
              label="序号"
              show-overflow-tooltip
              type="index"
            ></el-table-column>
            <el-table-column min-width="160" align="center" label="供应商全称" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.supplierName}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150" align="center" label="商家类型" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.supplierType}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="130" align="center" label="主营业务" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.mainBusiness}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="150" align="center" label="授权售卖资质" show-overflow-tooltip>
              <template scope="scope">
                <el-button
                  type="text"
                  @click="lookImgFile(scope.row)"
                  v-if="scope.row.sellCertFile"
                >查看</el-button>
                <el-button
                  type="text"
                  @click="lookAttachment(scope.row)"
                  v-if="scope.row.sellCertFile"
                >修改</el-button>
                <el-button
                  type="text"
                  @click="lookFile(scope.row)"
                  v-if="!scope.row.sellCertFile"
                >上传文件</el-button>
              </template>
            </el-table-column>
            <el-table-column min-width="130" align="center" label="商家对接人" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.supplierUser}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="130" align="center" label="联系电话" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.supplierPhone}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="130" align="center" label="附件上传" show-overflow-tooltip>
              <template scope="scope">
                <el-button
                  type="text"
                  @click="lookMentFile(scope.row)"
                  v-if="scope.row.attachmentFile"
                >查看</el-button>
                <el-button
                  type="text"
                  @click="uploadFile(scope.row)"
                  v-if="scope.row.attachmentFile"
                >修改</el-button>
                <el-button
                  type="text"
                  @click="uploadImg(scope.row)"
                  v-if="!scope.row.attachmentFile"
                >上传文件</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="140" align="center" >
              <template scope="scope">
                <el-button type="text" @click="handleUpdate(scope.row)">编辑</el-button>
                <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
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
          <!-- 授权售卖资质 -->
          <el-dialog
            :title="voucherTitle"
            :visible.sync="dialogVisible"
            :before-close="closeDialogExport"
            class="receiptWidth450"
          >
            <el-upload
              ref="uploadExcel"
              :action="uploadUrls.excelUrl"
              :headers="accessToken"
              :file-list="uploadUrls.excelFileList"
              :on-success="uploadExcelSuccess"
              :on-error="uploadExcelError"
              :auto-upload="true"
            >
              <el-button slot="trigger" size="small" style="margin-top: -10px" type="primary">选择文件上传</el-button>
              <div slot="tip" class="el-upload__tip">文件大小不能超过10MB</div>
            </el-upload>
            <div slot="footer" class="dialog-footer center">
              <el-button @click="closeDialogExport">取消</el-button>
              <el-button type="primary" v-if="uploadFirst" @click="sumbitAddForm">上传</el-button>
              <el-button type="primary" v-if="alginUpload" @click="sumbitAddForm">重新上传</el-button>
            </div>
          </el-dialog>
          <!-- 实收凭证号 -->
          <el-dialog
            :title="nameTitle"
            :visible.sync="dialogVisibleHao"
            :before-close="closeDialogExportHao"
            class="receiptWidth450"
          >
            <el-form :model="formHao" class="customerdata" label-width="100px">
              <span class="formUpdate">*</span>
              <el-form-item label="供应商全称:">
                <el-input v-model="formHao.supplierName" placeholder="请输入供应商全称" style="width:300px"></el-input>
              </el-form-item>
              <span class="formUpdate" style="margin-left: 13px">*</span>
              <el-form-item label="商家类型:">
                <el-input v-model="formHao.supplierType" placeholder="请输入商家类型" style="width:300px"></el-input>
              </el-form-item>
              <span class="formUpdate" style="margin-left: 13px">*</span>
              <el-form-item label="主营业务:">
                <el-input v-model="formHao.mainBusiness" placeholder="请输入主营业务" style="width:300px"></el-input>
              </el-form-item>
              <span class="formUpdate">*</span>
              <el-form-item label="商家对接人:">
                <el-input v-model="formHao.supplierUser" placeholder="请输入商家对接人" style="width:300px"></el-input>
              </el-form-item>
              <span class="formUpdate" style="margin-left: 13px">*</span>
              <el-form-item label="联系电话:">
                <el-input v-model="formHao.supplierPhone" placeholder="请输入联系电话" style="width:300px"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer center">
              <el-button @click="closeDialogExportHao">取消</el-button>
              <el-button type="primary" @click="sumbitAdd" v-if="nameTitle == '添加'">确定</el-button>
              <el-button type="primary" @click="sumbitUpdate" v-if="nameTitle == '编辑'">确定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { supplierPage } from "api/purchase/application/index";
import { page, supplierUpdate, supplierAdd,getObj,supplierDel} from "api/purchase/supplier/index";
import { ImgExportUrl } from "api/addService/serviceCheck/index";
import { mapGetters } from "vuex";
import { getToken } from "utils/auth";
var dateUtils = require("silly-datetime");
export default {
  name: "dashboard",
  data() {
    return {
      uploadUrls: {
        excelUrl: ImgExportUrl,
        excelFileList: [],
      },
      accessToken: {
        accessToken: getToken(),
      },
      activeName: "first",
      list: [],
      listQuery: {
        _type_: "equal",
        page: 1,
        limit: 10,
      },
      query: {
        id: "",
      },
      dialogVisible: false,
      tableData: [],
      dialogImageUrl: "",
      dialogVisibleImg: false,
      categoryList: [],
      loading: {
        tableLoading: false,
        childrenLoading: false,
      },
      dataArr: [],
      form: {
        payProof: "",
        id: "",
      },
      uploadFirst: false,
      alginUpload: false,
      selectAccount: [],
      supplierSelect: [],
      dialogVisibleHao: false,
      formHao: {
        id: "",
        supplierName: "",
        mainBusiness: "",
        supplierPhone: "",
        supplierType: "",
        supplierUser: "",
      },
      nameTitle: "添加",
    };
  },
  mounted() {},
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"]),
  },
  methods: {
    // 供应商全称
    supplierList() {
      let query = {};
      supplierPage(query).then((res) => {
        this.supplierSelect = res.data;
      });
    },
    getList() {
      let param = {
        id: this.query.id,
        ...this.listQuery,
      };
      this.loading.tableLoading = true;
      page(param).then((response) => {
        this.loading.tableLoading = false;
        this.list = response.data.rows;
        this.total = response.data.total;
      });
    },
    // 添加
    addList() {
      this.dialogVisibleHao = true;
      this.nameTitle = "添加";
      this.formHao = {
        id: "",
        supplierName: "",
        mainBusiness: "",
        supplierPhone: "",
        supplierType: "",
        supplierUser: "",
      }
    },
    closeDialogExport() {
      this.dialogVisible = false;
    },
    closeDialogExportHao() {
      this.dialogVisibleHao = false;
    },
    // 查看
    lookImgFile(row) {
      window.open(row.sellCertFile, "_blank");
    },
    // 授权售卖资质
    lookAttachment(row) {
      this.uploadUrls.excelFileList = [];
      this.voucherTitle = "授权售卖资质";
      this.form.payProof = "";
      this.dialogVisible = true;
      this.form.id = row.id;
      this.uploadFirst = false;
      this.alginUpload = true;
    },
    lookFile(row) {
      this.uploadUrls.excelFileList = [];
      this.voucherTitle = "授权售卖资质";
      this.dialogVisible = true;
      this.form.payProof = "";
      this.form.id = row.id;
      this.uploadFirst = true;
      this.alginUpload = false;
    },
    // 实收凭证
    uploadImg(row) {
      this.uploadUrls.excelFileList = [];
      this.voucherTitle = "实收凭证";
      this.form.payProof = "";
      this.dialogVisible = true;
      this.form.id = row.id;
      this.uploadFirst = true;
      this.alginUpload = false;
    },
    uploadFile(row) {
      this.uploadUrls.excelFileList = [];
      this.voucherTitle = "实收凭证";
      this.form.payProof = "";
      this.dialogVisible = true;
      this.form.id = row.id;
      this.uploadFirst = false;
      this.alginUpload = true;
    },
    // 查看凭证号
    lookMentFile(row) {
      window.open(row.attachmentFile, "_blank");
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    // 上传成功
    uploadExcelSuccess(response, file, fileList) {
      if (response.rel === false) {
        this.$alert(response.message);
        return;
      } else {
        this.$message({
          message: "提交成功：上传文件成功",
          type: "success",
          duration: 2000,
        });
        this.form.payProof = response.data;
      }
    },
    // 上传失败
    uploadExcelError(err, file, fileList) {
      this.$message({
        message: "提交失败：上传文件失败",
        type: "error",
        duration: 2000,
      });
    },
    // 上传
    sumbitAddForm() {
      let obj = {};
      if (this.voucherTitle == "授权售卖资质") {
        obj = {
          id: this.form.id,
          sellCertFile: this.form.payProof,
        };
      } else if (this.voucherTitle == "实收凭证") {
        obj = {
          id: this.form.id,
          attachmentFile: this.form.payProof,
        };
      }
      supplierUpdate(obj.id, obj).then((res) => {
        this.dialogVisible = false;
        this.dialogVisibleHao = false;
        if (res.rel) {
          this.$message({
            type: "success",
            message: "提交成功!",
          });
          this.getList();
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },
    // 添加保存
    sumbitAdd() {
      let self = this
      if (!this.formHao.supplierName) {
        this.$message({
          message: "供应商全称不能为空！",
          type: "error",
          duration: 2000,
        });
        return false;
      }
      if (!this.formHao.supplierType) {
        this.$message({
          message: "商家类型不能为空！",
          type: "error",
          duration: 2000,
        });
        return false;
      }
      if (!this.formHao.mainBusiness) {
        this.$message({
          message: "主营业务不能为空！",
          type: "error",
          duration: 2000,
        });
        return false;
      }
      if (!this.formHao.supplierUser) {
        this.$message({
          message: "商家对接人不能为空！",
          type: "error",
          duration: 2000,
        });
        return false;
      }
      if (!(/^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/.test(self.formHao.supplierPhone))) { 
        this.$message({
          message: "输入正确的电话格式！",
          type: "error",
          duration: 2000,
        });
        return false;
      }
      let obj = {
        supplierName: this.formHao.supplierName,
        mainBusiness: this.formHao.mainBusiness,
        supplierPhone: this.formHao.supplierPhone,
        supplierType: this.formHao.supplierType,
        supplierUser: this.formHao.supplierUser,
      }
      this.$confirm("确定要保存吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.dialogVisibleHao = false;
          supplierAdd(obj).then((res) => {
            if (res.rel) {
              this.$notify({
                title: "成功",
                message: "修改成功",
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
            if (res.status !== 200) {
              this.$notify({
                title: "失败",
                message: res.message,
                type: "error",
                duration: 2000,
              });
            }
          });
        })
        .catch(() => {});
    },
        //编辑
    handleUpdate(row) {
      let self = this;
     this.nameTitle = "编辑";
      getObj(row.id).then(response => {
      self.formHao = response.data
      this.dialogVisibleHao = true
      });
    },
    // 编辑保存
    sumbitUpdate(){
      let self = this;
       if (!this.formHao.supplierName) {
        this.$message({
          message: "供应商名称不能为空！",
          type: "error",
          duration: 2000,
        });
        return false;
      }
      if (!this.formHao.supplierType) {
        this.$message({
          message: "商家类型不能为空！",
          type: "error",
          duration: 2000,
        });
        return false;
      }
      if (!this.formHao.mainBusiness) {
        this.$message({
          message: "主营业务不能为空！",
          type: "error",
          duration: 2000,
        });
        return false;
      }
      if (!this.formHao.supplierUser) {
        this.$message({
          message: "商家对接人不能为空！",
          type: "error",
          duration: 2000,
        });
        return false;
      }
      if (!(/^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/.test(self.formHao.supplierPhone))) {
        this.$message({
          message: "联系电话格式不正确！",
          type: "error",
          duration: 2000,
        });
        return false;
      }
      this.$confirm("确定要保存吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.dialogVisibleHao = false;
          supplierUpdate(this.formHao.id,this.formHao).then((res) => {
            if (res.rel) {
              this.$notify({
                title: "成功",
                message: "修改成功",
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
            if (res.status !== 200) {
              this.$notify({
                title: "失败",
                message: res.message,
                type: "error",
                duration: 2000,
              });
            }
          });
        })
        .catch(() => {});
    },
    // 删除
    handleDelete(row){
      this.$confirm("确定要删除吗?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        supplierDel(row.id).then(res => {
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
        });
      });
    }
  },
  created() {
    this.getList();
    this.supplierList();
  },
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
.storage-box-right .dashboard-main {
  width: 98%;
  margin: 0 auto;
  padding-bottom: 20px;
  /* margin-top: 15px; */
}
.storage-box-right .dashboard-main h4 {
  color: #333333;
  margin-top: 20px;
  margin-bottom: 10px;
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
.formUpdate {
  display: inline-block;
  position: relative;
  top: 25px;
  left: 6px;
  color: red;
}
.el-form-item {
  margin-bottom: 7px;
}
</style>