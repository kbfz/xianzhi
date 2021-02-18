<template>
  <div class="app-container calendar-list-container"
       style="padding-right:10px">
    <div class="filter-container">
      <el-select v-model="query.qstCode"
                 placeholder="请选择客户名称"
                 style="width: 200px"
                 filterable
                 popper-class="optionsContent"
                 clearable>
        <el-option v-for="item in selectCustom"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="query.securityStatus"
                 placeholder="是否低于预警值"
                 style="width: 200px"
                 popper-class="optionsContent"
                 filterable
                 clearable>
        <el-option v-for="item in selectStatus"
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
      <el-button class="filter-item"
                 type="primary"
                 v-waves
                 @click="addAmount">新增</el-button>
    </div>
    <el-table :key='tableKey'
              :data="list"
              v-loading.body="listLoading"
              border
              fit
              highlight-current-row
              style="width: 100%"
              :height="elTableMediaHeight"
              :class="{'tabLayout':isList}">
      <el-table-column align="center"
                       label="客户名称"
                       min-width="200px"
                       show-overflow-tooltip>
        <template scope="scope">
          <span>{{scope.row.customerName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="全速通编码"
                       min-width="160px"
                       show-overflow-tooltip>
        <template scope="scope">
          <span>{{scope.row.qstCode}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="保证金额度（元）"
                       min-width="180px"
                       show-overflow-tooltip>
        <template scope="scope">
          <span>{{scope.row.customerAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="已用额度（元）"
                       min-width="180px"
                       show-overflow-tooltip>
        <template scope="scope">
          <span>{{scope.row.usedAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="保证金余额（元）"
                       min-width="180px"
                       show-overflow-tooltip>
        <template scope="scope">
          <span :class="{'colorNum': scope.row.actualAmount < scope.row.securityAmount}">{{scope.row.actualAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="余额预警值（元）"
                       min-width="180px"
                       show-overflow-tooltip>
        <template scope="scope">
          <span>{{scope.row.securityAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="操作"
                       min-width="245">
        <template scope="scope">
          <el-button type="text"
                     @click="quotaSetting(scope.row)">额度增加</el-button>
          <el-button type="text"
                     @click="reduceMoney(scope.row)">额度减少</el-button>
          <el-button type="text"
                     @click="warnMoney(scope.row)">预警值设置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading"
         class="pagination-container">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"> </el-pagination>
    </div>
    <!-- 额度设置 -->
    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible"
               :before-close="closeDialog"
               class="receiptWidth600">
      <el-form :model="form"
               :rules="rules"
               ref="form"
               label-width="150px">
        <span class="xhText">*</span>
        <el-form-item :label="addText"
                      prop="payAccount"
                      class="marginListAdd erroeDone">
          <el-input v-model="form.payAccount"
                    placeholder="请输入数值"
                    style="width:300px"></el-input>
          <span class="addText">请保留小数点后两位，例如：10000.00</span>
        </el-form-item>
        <span class="xhText ml45">*</span>
        <el-form-item :label="reduceText"
                      class="marginListAdd">
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
        <el-form-item label="备注"
                      prop="remark"
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
                   @click="sumbitAddForm"
                   v-if="addForm">提交</el-button>
        <el-button type="primary"
                   @click="sumbitReduceForm"
                   v-if="resuceForm">提交</el-button>

      </div>
    </el-dialog>
    <!-- 预警值设置 -->
    <el-dialog title="预警值设置"
               :visible.sync="dialogFormWarn"
               :before-close="closeDialogWarn"
               class="receiptWidth600">
      <el-form :model="formWarn"
               :rules="rulesWarn"
               ref="formWarn"
               label-width="150px">
        <el-form-item label="客户名称"
                      class="marginListAdd">
          <span class="warnText">{{formWarn.customerName}}</span>
        </el-form-item>
        <el-form-item label="保证金额度"
                      class="marginListAdd"
                      style="margin-top: -10px">
          <span class="warnText">{{formWarn.customerAmount}}</span>
        </el-form-item>
        <el-form-item label="当前预警值"
                      class="marginListAdd"
                      style="margin-top: -10px">
          <span class="warnText">{{formWarn.securityAmount}}</span>
        </el-form-item>
        <span class="xhText ml73">*</span>
        <el-form-item label="新预警值"
                      class="marginListAdd"
                      prop="newSecurityAmount"
                      style="margin-top: -15px">
          <el-input v-model="formWarn.newSecurityAmount"
                    placeholder="请输入数值"
                    style="width:300px"></el-input>
          <span class="addText">请保留小数点后两位，例如：10000.00</span>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer center">
        <el-button @click="closeDialogWarn">取消</el-button>
        <el-button type="primary"
                   @click="newAmountForm">提交</el-button>
      </div>
    </el-dialog>
    <!-- 新增 -->
    <el-dialog title="新增保证金"
               :visible.sync="dialogFormAdd"
               :before-close="closeDialogAdd"
               class="receiptWidth600">
      <el-form :model="formAdd"
               :rules="rulesAdd"
               ref="formAdd"
               label-width="150px">
        <div class="addText">
          <span class="xhText">*</span>
          <el-form-item label="客户名称"
                        class="marginListAdd">
            <el-select v-model="formAddName"
                       placeholder="请选择客户名称"
                       style="width: 250px"
                       filterable
                       clearable>
              <el-option v-for="item in selectCustom"
                         :key="item.value"
                         :label="item.label"
                         :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="addText">
          <span class="xhText"
                style="left:61px">*</span>
          <el-form-item label="保证金额度"
                        class="marginListAdd">
            <el-input v-model="formAdd.customerAmount"
                      style="width: 250px"
                      placeholder="请输入保证金额度"></el-input>
          </el-form-item>
        </div>
        <div class="addText">
          <span class="xhText">*</span>
          <el-form-item label="已用额度"
                        class="marginListAdd">
            <el-input v-model="formAdd.usedAmount"
                      style="width: 250px"
                      placeholder="请输入已用额度"></el-input>
          </el-form-item>
        </div>
        <div class="addText">
          <span class="xhText"
                style="left:103px">*</span>
          <el-form-item label="余额"
                        class="marginListAdd">
            <el-input v-model="formAdd.actualAmount"
                      style="width: 250px"
                      placeholder="请输入余额"></el-input>
          </el-form-item>
        </div>
        <div class="addText">
          <span class="xhText"
                style="left:61px">*</span>
          <el-form-item label="余额预警值"
                        class="marginListAdd">
            <el-input v-model="formAdd.securityAmount"
                      style="width: 250px"
                      placeholder="请输入余额预警值"></el-input>
          </el-form-item>
        </div>
        <span style="margin-left: 67px">备注：所有金额请保留小数点后两位，例如：10000.00 </span>
      </el-form>
      <div slot="footer"
           class="dialog-footer center">
        <el-button @click="closeDialogAdd">取消</el-button>
        <el-button type="primary"
                   @click="addAmountSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  page,
  selectObj,
  prepaidObj,
  orderImgExportUrl,
  changeObj,
  addObj
} from "api/financialSys/bondAdmin/index";
import { getToken } from 'utils/auth';
import { mapGetters } from "vuex";
import { numberValidator } from "utils/validate"
var dateUtils = require("silly-datetime");
export default {
  name: "accountConfig",
  data () {
    const parValidator = (rule, value, callback) => {
      // console.log(value)
      if (value && /^\d+(\.\d{2})?$/.test(value) === false) {
        callback(new Error("只能输入数字值"))
      } else {
        callback()
      }
    }
    return {
      accessToken: {
        accessToken: getToken()
      },
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        orderBy: 'createTimedesc'
      },
      dialogFormVisible: false,
      query: {
        qstCode: '',
        // createTime: '',
        securityStatus: ''
      },
      textMap: {
        addMoney: "额度增加",
        reduceMoney: "额度减少"
      },
      selectCustom: [],
      selectStatus: [
        {
          label: '低于预警值',
          value: 0
        },
        {
          label: '正常',
          value: 1
        }],
      marginMange: [
        {
          label: '额度增加',
          value: '额度增加'
        },
        {
          label: '额度减少',
          value: '额度减少'
        }
      ],
      isList: true,
      custmerMap: {},
      getCode: [],
      dialogStatus: "",
      addForm: false,
      resuceForm: false,
      accountConfigManager_btn_del: false,
      accountConfigManager_btn_add: false,
      tableKey: 0,
      rules: {
      },
      form: {
        id: '',
        payAccount: '',
        remark: '',
        payProof: '',
        operatorStatus: ''
      },
      formWarn: {
        indx: '',
        customerName: '',
        customerAmount: '',
        securityAmount: '',
        newSecurityAmount: ''
      },
      formAddName: '',
      formAdd: {
        indx: '',
        customerName: '',
        qstCode: '',
        customerAmount: '',
        usedAmount: '',
        actualAmount: '',
        securityAmount: ''
      },
      rulesWarn: {
        newSecurityAmount: [
        ]
      },
      // excel文件上传
      uploadUrls: {
        excelUrl: '',
        excelFileList: []
      },
      addText: '',
      reduceText: '',
      imageUrl: orderImgExportUrl,
      dialogFormWarn: false,
      dialogFormAdd: false,
    };
  },
  created () {
    this.getList();
    this.getCustomer();
    this.accountConfigManager_btn_del = this.elements[
      "accountConfigManager_btn_del"
    ];

    this.accountConfigManager_btn_add = this.elements[
      "accountConfigManager:btn_add"
    ];
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
  methods: {
    getList () {
      this.listLoading = true;
      let param = {
        securityStatus: this.query.securityStatus,
        qstCode: this.query.qstCode,
        ...this.listQuery
      }
      page(param).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
        if (response.data.rows.length > 14) {
          this.isList = false
        } else {
          this.isList = true
        }
      });
    },
    //获取客户信息
    getCustomer () {
      selectObj().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = '(' + response.data[i].value + ')' + ' ' + response.data[i].key
          cutObj.value = response.data[i].value
          this.selectCustom.push(cutObj)
        }
      });
    },
    handleFilter () {
      this.getList();
    },
    handleSizeChange (val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange (val) {
      this.listQuery.page = val;
      this.getList();
    },
    // 额度设置
    closeDialog () {
      this.dialogFormVisible = false;
      // this.$refs["form"].resetFields();
    },
    closeDialogWarn () {
      this.dialogFormWarn = false
      // this.$refs["formWarn"].resetFields();
    },
    // 新增保证金
    closeDialogAdd () {
      this.dialogFormAdd = false
    },
    // 新增
    addAmount () {
      this.dialogFormAdd = true
      this.formAddName = ''
      this.formAdd = {
        indx: '',
        customerName: '',
        qstCode: '',
        customerAmount: '',
        usedAmount: '',
        actualAmount: '',
        securityAmount: ''
      }
    },
    addAmountSave () {
      if (this.formAddName === '') {
        this.$message({
          message: "提交失败,客户名称不能为空！",
          type: 'error',
          duration: 2000
        });
        return false;
      }
      if (this.formAdd.customerAmount === '') {
        this.$message({
          message: "提交失败,保证金不能为空！",
          type: 'error',
          duration: 2000
        });
        return false;
      }
      if (this.formAdd.usedAmount === '') {
        this.$message({
          message: "提交失败,已用额度不能为空！",
          type: 'error',
          duration: 2000
        });
        return false;
      }
      if (this.formAdd.actualAmount === '') {
        this.$message({
          message: "提交失败,余额不能为空！",
          type: 'error',
          duration: 2000
        });
        return false;
      }
      if (this.formAdd.securityAmount === '') {
        this.$message({
          message: "提交失败,余额预警值不能为空！",
          type: 'error',
          duration: 2000
        });
        return false;
      }

      let reg = /^\d+(\.\d{2})?$/
      let reg2 = /.*\..*/
      if (reg.test(this.formAdd.customerAmount) === false || reg2.test(this.formAdd.customerAmount) === false) {
        this.$message({
          message: "提交失败,保证金格式错误！",
          type: 'error',
          duration: 2000
        });
        return false;
      }
      if (reg.test(this.formAdd.usedAmount) === false || reg2.test(this.formAdd.usedAmount) === false) {
        this.$message({
          message: "提交失败,已用额度格式错误！",
          type: 'error',
          duration: 2000
        });
        return false;
      }
      if (reg.test(this.formAdd.actualAmount) === false || reg2.test(this.formAdd.actualAmount) === false) {
        this.$message({
          message: "提交失败,余额格式错误！",
          type: 'error',
          duration: 2000
        });
        return false;
      }
      if (reg.test(this.formAdd.securityAmount) === false || reg2.test(this.formAdd.securityAmount) === false) {
        this.$message({
          message: "提交失败,预警值额度格式错误！",
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
        let code = this.formAddName.substring(this.formAddName.indexOf("(") + 1, this.formAddName.indexOf(")"))
        let name = this.formAddName.substring(this.formAddName.indexOf(")") + 1)
        this.formAdd.qstCode = code
        this.formAdd.customerName  = name
        addObj(this.formAdd).then(res => {
          this.dialogFormAdd = false;
          if (res.status == '200') {
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
              message: res.message,
              type: "error",
              duration: 2000
            });
          }
        })
      })
    },
    quotaSetting (row) {
      this.form = {
        id: '',
        payAccount: '',
        remark: '',
        payProof: '',
        status: ''
      }
      this.dialogFormVisible = true
      this.dialogStatus = 'addMoney'
      this.addText = '增加额度（元）',
        this.reduceText = '客户付款凭证'
      this.form.id = row.indx
      this.addForm = true
      this.resuceForm = false
    },
    reduceMoney (row) {
      this.form = {
        id: '',
        payAccount: '',
        remark: '',
        payProof: '',
        status: ''
      }
      this.dialogFormVisible = true
      this.dialogStatus = 'reduceMoney'
      this.addText = '减少额度（元）',
        this.reduceText = '财务打款凭证'
      this.form.id = row.indx
      this.addForm = false
      this.resuceForm = true
    },
    // 预警值设置
    warnMoney (row) {
      this.formWarn = {
        indx: '',
        customerName: '',
        customerAmount: '',
        securityAmount: '',
        newSecurityAmount: ''
      },
        this.dialogFormWarn = true
      this.formWarn.indx = row.indx
      this.formWarn.customerName = row.customerName
      this.formWarn.customerAmount = row.customerAmount
      this.formWarn.securityAmount = row.securityAmount

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
    // 额度增加
    sumbitAddForm () {
      if (this.form.payAccount === '') {
        this.$message({
          message: "提交失败,增加额度不能为空！",
          type: 'error',
          duration: 2000
        });
        return false;
      }
      let reg = /^\d+(\.\d{2})?$/
      let reg2 = /.*\..*/
      if (reg.test(this.form.payAccount) === false || reg2.test(this.form.payAccount) === false) {
        this.$message({
          message: "提交失败,增加额度格式错误！",
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
        this.form.operatorStatus = 0
        prepaidObj(this.form).then(response => {
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
              message: "系统异常",
              type: "error",
              duration: 2000
            });
          }
          this.$refs["form"].resetFields();
        });
      }).catch(() => { });
    },
    // 额度减少
    sumbitReduceForm () {
      if (this.form.payAccount === '') {
        this.$message({
          message: "提交失败,减少额度不能为空！",
          type: 'error',
          duration: 2000
        });
        return false;
      }
      let reg = /^\d+(\.\d{2})?$/
      let reg2 = /.*\..*/
      if (reg.test(this.form.payAccount) === false || reg2.test(this.form.payAccount) === false) {
        this.$message({
          message: "提交失败,减少额度格式错误！",
          type: 'error',
          duration: 2000
        });
        return false;
      }
      // if (this.form.payAccount > 100000) {
      //   this.$message({
      //     message: "提交失败,一次减少的额度最多为10万元!",
      //     type: 'error',
      //     duration: 2000
      //   });
      //   return false;
      // }
      if (this.form.payProof === "") {
        this.$message({
          message: "提交失败,请上传财务打款凭证！",
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
        this.form.operatorStatus = 1
        prepaidObj(this.form).then(response => {
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
              message: "系统异常",
              type: "error",
              duration: 2000
            });
          }
          this.$refs["form"].resetFields();
        });
      }).catch(() => { });
    },
    // 预警值设置
    newAmountForm (row) {
      if (this.formWarn.newSecurityAmount === "") {
        this.$message({
          message: "提交失败,新预警值不能为空！",
          type: 'error',
          duration: 2000
        });
        return false;
      }
      let reg = /^\d+(\.\d{2})?$/
      let reg2 = /.*\..*/
      if (reg.test(this.formWarn.newSecurityAmount) === false || reg2.test(this.formWarn.newSecurityAmount) === false) {
        this.$message({
          message: "提交失败,新预警值格式错误！",
          type: 'error',
          duration: 2000
        });
        return false;
      }

      if (this.formWarn.newSecurityAmount > this.formWarn.customerAmount) {
        this.$message({
          message: "提交失败,预警值不能超过保证金额度！",
          type: 'error',
          duration: 2000
        });
        return false;
      }
      this.$confirm("确定要保存新预警值吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        changeObj(this.formWarn).then(res => {
          this.dialogFormWarn = false;
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
              message: "res.message",
              type: "error",
              duration: 2000
            });
          }
          if (res.status !== 200) {
            this.$notify({
              title: "失败",
              message: "res.message",
              type: "error",
              duration: 2000
            });
          }
          this.$refs["formWarn"].resetFields();
        })
      })
    }
  }
};
</script>
<style scoped>
.el-button + .el-button {
  margin-left: 9px;
}
.addText {
  display: block;
  font-size: 12px;
  margin-top: 10px;
  color: #999;
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
.colorNum {
  color: red;
  font-weight: bold;
}
.xhText {
  display: inline-block;
  position: relative;
  top: 25px;
  left: 31px;
  color: red;
}
.ml45 {
  left: 45px;
}
.ml73 {
  position: relative;
  top: 11px;
  left: 73px;
}
.addText {
  position: relative;
}
.addText span {
  position: absolute;
  top: 10px;
  left: 73px;
}
</style>


