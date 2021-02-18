<template>
  <div>
    <div class="topDetai">
      <div class="leftDetail">
        <router-link to="/index/financialSys/customsList">
          <el-button type="primary">
            <i class="el-icon-arrow-left"></i>返回税单列表</el-button>
        </router-link>
      </div>
      <div class="rightDetail">
        <span style="margin-right: 10px">税单导入人：{{orderObj.createUser}}</span>
        <span>导入时间：{{orderObj.createTime}}</span>
      </div>
    </div>
    <div class="listDetail">
      <ul>
        <li>
          <span class="fzText">税单编号</span>
          <span class="boldText">{{orderObj.billNo}}</span>
        </li>
        <li class="ml30">
          <span class="fzText">税单日期范围</span>
          <span class="boldText">{{orderObj.taxStartTime}}~{{orderObj.taxEndTime}} </span>
        </li>
        <li class="ml30">
          <span class="fzText">税单总金额（元）</span>
          <span class="boldText">{{orderObj.billAmount}}</span>
        </li>
        <li class="ml30">
          <span class="fzText">订单总条数</span>
          <span class="boldText">{{orderObj.billCount}}</span>
        </li>
        <li class="ml30">
          <span class="fzText">账单缴费进度</span>
          <span class="boldText">{{orderObj.schedule}}</span>
        </li>
      </ul>
    </div>
    <div class="tableDetail">
      <div class="mb20">
        <el-select v-model="query.qstName"
                   placeholder="请选择客户名称"
                   style="width: 200px"
                   filterable
                   clearable>
          <el-option v-for="item in selectCustom"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-button class="filter-item"
                   type="primary"
                   v-waves
                   icon="search"
                   @click="handleFilter">搜索</el-button>
      </div>
      <el-table :key='tableKey'
                :data="list"
                v-loading.body="listLoading"
                border
                fit
                highlight-current-row
                style="width: 100%"
                :height="elTableMediaHeight">
        <el-table-column min-width="200px"
                         align="center"
                         label="客户名称"
                         show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.qstName}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="200px"
                         align="center"
                         label="全速通编码"
                         show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.qstCode}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="200px"
                         align="center"
                         label="税单金额（元）"
                         show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.cusTotalTax}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="200px"
                         align="center"
                         label="订单条数"
                         show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.billCount}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="200px"
                         align="center"
                         label="是否缴费"
                         show-overflow-tooltip>
          <template scope="scope">
            <span v-if="scope.row.payTaxId === undefined || scope.row.payTaxId === '' || scope.row.payTaxId === null">否</span>
            <span v-if="scope.row.payTaxId !== undefined &&  scope.row.payTaxId !== '' && scope.row.payTaxId !== null">是</span>
          </template>
        </el-table-column>
        <el-table-column min-width="150px"
                         align="center"
                         label="操作"
                         show-overflow-tooltip>
          <template scope="scope">
            <el-button type="text"
                        v-if="scope.row.payTaxId === undefined || scope.row.payTaxId === '' || scope.row.payTaxId === null"
                       @click="payTax(scope.row)">缴费</el-button>
            <el-button type="text"
                       @click="taxExport(scope.row)">
              <a :href='href' target="_blank">导出明细</a>
            </el-button>
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
                       :total="total"> </el-pagination>
      </div>
      <!-- 缴费 -->
      <el-dialog title="缴费"
                 :visible.sync="dialogFormVisible"
                 :before-close="closeDialog"
                 class="receiptWidth600">
        <el-form :model="form"
                 :rules="rules"
                 ref="form"
                 label-width="150px">
          <el-form-item label="客户名称"
                        class="marginListAdd">
            <span class="warnText">{{form.qstName}}</span>
          </el-form-item>
          <!-- <div> -->
          <span class="xhText">*</span>
          <el-form-item label="缴费金额"
                        prop="payAccount"
                        class="marginListAdd"
                        style="margin-top: -15px">
            <el-input v-model="form.payAccount"
                      placeholder="请输入数值"
                      style="width:300px"></el-input>
            <span class="addText">请保留小数点后两位，例如：10000.00</span>
          </el-form-item>
          <!-- </div> -->
          <!-- <div> -->
          <span class="xhText ml45">*</span>
          <el-form-item label="客户付款凭证"
                        class="marginListAdd"
                        style="margin-top: -10px">
            <el-upload class="avatar-uploader"
                       :action="imageUrl"
                       :headers="accessToken"
                       :show-file-list="false"
                       :multiple="true"
                       :auto-upload="true"
                       :on-success="handleSuccess"
                       :before-upload="handleBefore"
                       :on-error="handleError">
              <img v-if="form.payProof"
                   :src="form.payProof"
                   class="avatar">
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- </div> -->

          <el-form-item label="备注"
                        class="marginListAdd">
            <el-input v-model="form.remark"
                      placeholder="请输入备注"
                      style="width:300px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer center">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary"
                     @click="sumbitAddForm">提交</el-button>

        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { page, selectObj, pageDetail, payObj, orderImgExportUrl, orderExcelExportUrl, excelExport } from "api/financialSys/customerConfig/index";
import { mapGetters } from "vuex";
import { getToken } from 'utils/auth';
var dateUtils = require("silly-datetime");
export default {
  name: "bdSupplier",
  data () {
    return {
      accessToken: {
        accessToken: getToken()
      },
      list: [],
      total: null,
      listLoading: false,
      query: {
        qstName: '',
        billNo: '',
        taxInfoId: ''
      },
      listQuery: {
        page: 1,
        limit: 10,
        orderBy: 'createTimedesc'
      },
      listDetail: [],
      tableKey: 0,
      orderObj: {},
      selectCustom: [],
      dialogFormVisible: false,
      form: {
        id: '',
        qstName: '',
        payProof: '',
        payAccount: '',
        remark: ''
      },
      rules: {},
      imageUrl: orderImgExportUrl,
      href: ''
    };
  },
  computed: {
    ...mapGetters(["elements"]),
    elTableMediaHeight () {
      if (window.screen.height === 1080) {
        return window.screen.height / 2.3;
      }
      if (window.screen.height === 900) {
        return window.screen.height / 2.8;
      }
      if (window.screen.height === 768) {
        return window.screen.height / 2.8 - 25;
      }
    }
  },
  created () {
    this.customerName()
    if (window.sessionStorage.getItem('billNo')) {
      this.query.billNo = window.sessionStorage.getItem('billNo')
      // window.sessionStorage.removeItem('billNo')
      this.orderSearch()
    }
  },
    destroyed () {
     window.sessionStorage.removeItem('billNo')
  },
  methods: {
    orderSearch () {
      let param = {
        billNo: $.trim(this.query.billNo),
        ...this.listQuery
      }
      page(param).then(response => {
        this.listDetail = response.data.rows;
        this.orderObj = this.listDetail[0]
        this.getList()
      });
    },
    getList () {
      this.listLoading = true;
      let param = {
        qstName: this.query.qstName,
        taxInfoId: this.orderObj.id,
        ...this.listQuery
      }
      pageDetail(param).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleSizeChange (val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange (val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleFilter () {
      this.getList();
    },
    // 客户下拉选择
    customerName () {
      selectObj().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = '(' + response.data[i].value + ')' + ' ' + response.data[i].key
          cutObj.value = response.data[i].key
          this.selectCustom.push(cutObj)
        }
      });
    },
    closeDialog () {
      this.dialogFormVisible = false;
    },
    payTax (row) {
      this.form = {
        id: '',
        qstName: '',
        payProof: '',
        payAccount: '',
        remark: ''
      },
        this.dialogFormVisible = true
      this.form.qstName = row.qstName
      this.form.id = row.id
    },
    //  上传图片
    handleSuccess (response, file) {
      if (response.status === undefined || response.status !== 200) {
        this.$alert(response.msg, '图片上传失败')
        return
      } else {
        this.form.payProof = response.data;
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
    sumbitAddForm () {
      this.$refs["form"].validate(valid => {
        if (!valid) {
          return false;
        } else {
          if (this.form.payAccount === '') {
            this.$message({
              message: "提交失败,缴费金额不能为空！",
              type: 'error',
              duration: 2000
            });
            return false;
          }
          let reg = /^\d+(\.\d{2})?$/
          let reg2 = /.*\..*/
          if (reg.test(this.form.payAccount) === false || reg2.test(this.form.payAccount) === false) {
            this.$message({
              message: "提交失败,缴费金额格式错误！",
              type: 'error',
              duration: 2000
            });
            return false;
          }
          // if (this.form.payAccount > 100000) {
          //   this.$message({
          //     message: "提交失败,一次增加的额度最多为10万元!",
          //     type: 'error',
          //     duration: 2000
          //   });
          //   return false;
          // }
          if (this.form.payProof === "") {
            this.$message({
              message: "提交失败,请上传客户付款凭证！",
              type: 'error',
              duration: 2000
            });
            return false;
          }
          this.$confirm("确定要保存吗", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            payObj(this.form).then(response => {
              this.dialogFormVisible = false;
              if (response.rel) {
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
                  message: response.message,
                  type: "error",
                  duration: 2000
                });
              }
              this.$refs["form"].resetFields();
            });
          }).catch(() => { });
        }
      });
    },
    // 导出
    taxExport (row) {
      let id = row.id
      let host = window.location.host
      this.href = 'http://' + host + '/api/ordersys/customerTaxRecord/export?id=' + id + '&accessToken=' + this.accessToken.accessToken
    }
  }
};
</script>
<style scoped>
.topDetai {
  width: 99%;
  overflow: hidden;
  margin: 0 auto;
  padding-bottom: 20px;
}
.leftDetail {
  float: left;
}
.rightDetail {
  float: right;
  font-size: 14px;
  height: 36px;
  line-height: 36px;
  color: #333;
}
.listDetail {
  width: 99%;
  margin: 0 auto;
  border: 1px solid #eef1f6;
  height: 100px;
}
.listDetail ul li {
  float: left;
  margin-top: 7px;
  color: #333;
}
.listDetail ul li span {
  display: block;
  line-height: 27px;
}
.ml30 {
  margin-left: 50px;
}
.boldText {
  font-size: 16px;
  font-weight: bold;
}
.fzText {
  font-size: 14px;
}
.tableDetail {
  width: 99%;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 20px;
}
.mb20 {
  margin-bottom: 15px;
}
.pagination-container {
  margin-top: 20px;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  border: 1px dashed #bfcbd9;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
.warnText {
  display: inline-block;
  margin-top: 18px;
}
.addText {
  display: block;
  font-size: 12px;
  margin-top: 10px;
  color: #999;
}
.xhText {
  position: relative;
  top: 11px;
  left: 73px;
  color: red;
}
.ml45 {
  position: relative;
  top: 16px;
  left: 46px;
}
</style>

