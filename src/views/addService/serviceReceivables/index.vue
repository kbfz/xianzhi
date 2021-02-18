<template>
  <div class="app-container calendar-list-container"
       id="app-container">
    <div class="app-container-left">
      <div class="filter-container">
        <el-select placeholder="请选择客户名称"
                   v-model="query.customerCode"
                   clearable
                   style="width: 200px"
                   popper-class="optionsContent"
                   filterable>
          <el-option v-for="item in selectCustom"
                     :key="item.value"
                     :value="item.value"
                     :label="item.label"></el-option>
        </el-select>
        <el-input @keyup.enter.native="handleFilter"
                  style="width: 200px;"
                  class="filter-item"
                  placeholder="请输入申请编号"
                  v-model="query.serviceNumber"> </el-input>
        <el-select placeholder="请选择核对状态"
                   v-model="query.userStatus"
                   clearable
                   style="width: 200px"
                    popper-class="optionsContent"
                   filterable>
          <el-option v-for="item in selectProcess"
                     :key="item.value"
                     :value="item.value"
                     :label="item.label"></el-option>
        </el-select>

        <el-date-picker type="daterange"
                        placeholder="客户申请时间"
                        style="width: 207px;"
                        class="filter-item"
                        popper-class="timeSelect"
                        @keyup.enter.native="handleFilter"
                        range-separator=" ~ "
                        v-model="query.submitTime">
        </el-date-picker>
        <el-date-picker type="daterange"
                        placeholder="仓库作业完结时间"
                        style="width: 207px;"
                        class="filter-item"
                        popper-class="timeSelect"
                        @keyup.enter.native="handleFilter"
                        range-separator=" ~ "
                        v-model="query.operateTime">
        </el-date-picker>
        <el-date-picker type="month"
                        placeholder="出账月份"
                        style="width: 200px;"
                        class="filter-item"
                        popper-class="timeSelect"
                        @keyup.enter.native="handleFilter"
                        format="yyyy-MM"
                        v-model="query.billTime">
        </el-date-picker>
        <el-select placeholder="是否已付款"
                   v-model="query.payable"
                   clearable
                   style="width: 200px"
                   popper-class="optionsContent"
                   filterable>
          <el-option v-for="item in selectSubmitter"
                     :key="item.value"
                     :value="item.value"
                     :label="item.label"></el-option>
        </el-select>
        <el-button class="filter-item"
                   type="primary"
                   v-waves
                   icon="search"
                   @click="handleFilter">查询</el-button>
        <el-button class="filter-item"
                   type="primary"
                   style="margin-left:0"
                   v-waves
                   @click="exportNum"
                   >导出账单和清单</el-button>
        <p>
        </p>
      </div>
      <el-table :data="list"
                v-loading="loading.tableLoading"
                element-loading-text="正在加载中......"
                border
                fit
                highlight-current-row
                style="width: 100%"
                :height="elTableMediaHeight">
        <el-table-column min-width="120"
                         align="center"
                         label="客户名称"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.customerName}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="110"
                         align="center"
                         label="申请说明"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;"
                  v-if="!scope.row. submitExplain">无</span>
            <span style="cursor: pointer;"
                  v-else>{{scope.row. submitExplain}}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="190"
                         align="center"
                         label="申请编号"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer; color:#20A0FF"
                  @click="loginQuery(scope.row)">{{scope.row.serviceNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100"
                         align="center"
                         label="核对"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;"
                  v-if="scope.row.userStatus === 0">待核对</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.userStatus === 1">通过</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.userStatus === -2">拒绝</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.userStatus === -3">撤销</span>
          </template>
        </el-table-column>
        <el-table-column min-width="170"
                         align="center"
                         label="客户申请时间"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;"
                  v-if="!scope.row.submitTime">无</span>
            <span style="cursor: pointer;"
                  v-else>{{scope.row.submitTime}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="150"
                         align="center"
                         label="仓库作业完结时间"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;"
                  v-if="!scope.row.operateTime">无</span>
            <span style="cursor: pointer;"
                  v-else>{{scope.row.operateTime.substring(0, 10)}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="150"
                         align="center"
                         label="实际总价（含税）"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;"
                  v-if="!scope.row.payableTaxTotal">无</span>
            <span style="cursor: pointer;"
                  v-else>{{scope.row.payableTaxTotal}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100"
                         align="center"
                         label="优惠"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;"
                  v-if="!scope.row.discountPrice">无</span>
            <span style="cursor: pointer;"
                  v-else>{{scope.row.discountPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="130"
                         align="center"
                         label="客户应付金额"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;"
                  v-if="!scope.row.actualTotal">无</span>
            <span style="cursor: pointer;"
                  v-else>{{scope.row.actualTotal}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="110"
                         align="center"
                         label="出账时间"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;"
                  v-if="!scope.row.billTime">无</span>
            <span style="cursor: pointer;"
                  v-else>{{scope.row.billTime.substring(0, 10)}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="110"
                         align="center"
                         label="是否已付款"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;"
                  v-if="scope.row.payable === true">是</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.payable === false">否</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="操作"
                         width="120"
                         fixed="right">
          <template scope="scope">
            <el-button type="text"
                       v-if="!scope.row.operateTime"
                       :disabled="true"> 收款
            </el-button>
            <el-button type="text"
                       v-else
                       @click="UploadImg(scope.row)"> 收款
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
                       :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="修改收款状态"
               :visible.sync="dialogFormVisible"
               :close-on-click-modal="false"
               class="receiptWidth590 logisticsWidth">
      <el-form :model="form"
               ref="form"
               label-width="139px"
               class="serviceForm">
        <el-form-item label="客户应付金额:"
                      label-width="106px">
          <span style="margin-left: 32px">{{form.actualTotal}}</span>
        </el-form-item>
        <el-form-item label="收款状态:"
                      label-width="82px">
          <el-radio-group v-model="form.serviceStatus"
                          style="margin-left: 56px">
            <el-radio :label="1">
              未收款
            </el-radio>
            <el-radio :label="3">已收款</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="starText">
          <span class="txtStar">*</span>
          <el-form-item label="实际收款（含税）:"
                        style="margin-top: -10px">
            <el-input v-model="form.payActualTotal"
                      style="width: 200px;"
                      v-if="form.serviceStatus == 3"
                      placeholder="输入金额（元）"></el-input>
            <el-input v-if="form.serviceStatus == 1"
                      style="width: 200px;"
                      disabled
                      placeholder="输入金额（元）"></el-input>
            <span class="spantext">请保留小数点后两位，例如1000.00</span>
          </el-form-item>
        </div>
        <el-form-item label="客户付款凭证:"
                      label-width="109px">
          <el-upload class="avatar-uploader"
                     v-if="form.serviceStatus == 3"
                     style="margin-left: 28px"
                     :action="imageUrl"
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
          <span class="changeBg"
                v-if="form.serviceStatus == 1">
            <i class="el-icon-plus changeAdd"></i>
          </span>
        </el-form-item>
        <el-form-item label="备注："
                      label-width="62px">
          <el-input v-model="form.remark"
                    type="textarea"
                    :rows="4"
                    :maxlength='200'
                    v-if="form.serviceStatus == 3"
                    style="width: 400px;margin-left: 73px"></el-input>
          <el-input 
                    type="textarea"
                    :rows="4"
                    v-if="form.serviceStatus == 1"
                    :maxlength='200'
                    disabled
                    style="width: 400px;margin-left: 73px"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button type="primary"
                   v-if="form.serviceStatus == 3"
                   @click="reviseObj">确认</el-button>
        <el-button type="primary"
                   v-if="form.serviceStatus == 1"
                   @click="nomoneyObj">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog title="增值服务详情"
               :visible.sync="dialogDetails"
               :close-on-click-modal="false"
               class="fixdialog">
      <Business-detail :serviceRecord="serviceRecord"></Business-detail>
    </el-dialog>
  </div>
</template>
<script> 
import {
  page,
  customerSelect,
  confirm,
  ImgExportUrl,
  payObj,
  BusinessObj,
  allConfirmObj,
  detailsInfo,
  exportData
} from "api/addService/serviceReceivables/index";
import { mapGetters } from "vuex";
import $ from "jquery";
import { numberValidator } from "utils/validate";
var dateUtils = require("silly-datetime");
export default {
  components: {
    //   // 引入编辑的组件
    "Business-detail": () => import("./components/BusinessDetail")
  },
  name: "sellBsorderHead",
  data () {
    return {
      curValue: '',
      imageUrl: ImgExportUrl,
      dataStatus: true,
      total: 0,
      list: [],
      listTable: [],
      one_page_slect: [],
      all_page_select: [],
      loading: {
        tableLoading: false,
        exportLoading: false
      },
      textMap: {
        install: '设置应付金额',
        revise: '修改应付金额'
      },
      dialogStatus: '',
      form: {
        id: '',
        serviceStatus: '1',
        actualTotal: '',
        payActualTotal: '',
        payProof: '',
        remark: ''
      },
      query: {
        customerCode: '',
        serviceNumber: '',
        userStatus: '',
        submitTime: '',
        operateTime: '',
        billTime: '',
        payable: '',
      },
      listQuery: {
        page: 1,
        limit: 10,
        orderBy: 'submitTimedesc'
      },
      serviceRecord: {
        serviceRecordList: [],
        serviceNumber: '',
        operateTime: '',
        customerName: '',
        submitUser: '',
        submitTime: '',
        serviceTotal: '',
        payableTotal: '',
        serviceTax: '',
        payableTaxTotal: '',
        discountPrice: '',
        actualTotal: '',
        payActualTotal: '',
        payTime: '',
        payRecord: {
          payProof: '',
          payUser: '',
          remark: ''
        }
      },
      href: '',
      selectCustom: [],
      serviceRecordList: [],
      selectSubmitter: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        },
      ],
      selectProcess: [
        {
          value: '0',
          label: '待核对'
        },
        {
          value: '1',
          label: '通过'
        },
         {
          value: '-2',
          label: '拒绝'
        },
         {
          value: '-3',
          label: '撤销'
        },
      ],
      selectCollection: [
        {
          value: 'all',
          label: '全部状态'
        },
        {
          value: '0',
          label: '未收款'
        },
        {
          value: '1',
          label: '已收款'
        },
      ],
      dialogFormVisible: false,
      dialogDetails: false,
      changeImgStatus: true,
      clickStatus: true,
    };
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight", "name"]),
    allSelect: function () {
      return this.all_page_select.concat(this.one_page_slect)
    },
  },
  created () {
    this.getList();
    this.customerName();
  },
  methods: {
    // 自动补全两位小数
    // addFloar () {
    //   let inx = this.form.payActualTotal.indexOf(".");
    //   if (inx == '-1') {
    //     this.form.payActualTotal += '.00';
    //   }
    //   this.$emit('input', this.form.payActualTotal);
    // },
    getList () {
      this.loading.tableLoading = true;
      let param = {
        customerCode: this.query.customerCode,
        serviceNumber: this.query.serviceNumber,
        userStatus: this.query.userStatus,
        submitTime: this.query.submitTime,
        operateTime: this.query.operateTime,
        billTime: this.query.billTime === ""
          ? ""
          : dateUtils.format(this.query.billTime, "YYYY-MM"),
        payable: this.query.payable,
        ...this.listQuery
      };
      if (param.submitTime !== '') {
        var start = param.submitTime[0] === null ? null : dateUtils.format(param.submitTime[0], "YYYY-MM-DD")
        var end = param.submitTime[1] === null ? null : dateUtils.format(param.submitTime[1], "YYYY-MM-DD")
        param.submitTime = `${start} ~ ${end}`
      }
      if (param.submitTime == 'null ~ null') {
        param.submitTime = ''
      }
      if (param.operateTime !== '') {
        var start = param.operateTime[0] === null ? null : dateUtils.format(param.operateTime[0], "YYYY-MM-DD")
        var end = param.operateTime[1] === null ? null : dateUtils.format(param.operateTime[1], "YYYY-MM-DD")
        param.operateTime = `${start} ~ ${end}`
      }
      if (param.operateTime == 'null ~ null') {
        param.operateTime = ''
      }
      page(param).then(response => {
        this.loading.tableLoading = false;
        this.list = response.data.rows;
        this.total = response.data.total;
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
    //业务详情
    loginQuery (row) {
      this.dialogDetails = true;
      this.serviceRecord = {
        serviceRecordList: [],
        serviceNumber: '',
        customerName: '',
        submitUser: '',
        operateTime: '',
        submitTime: '',
        serviceTotal: '',
        payableTotal: '',
        serviceTax: '',
        payableTaxTotal: '',
        discountPrice: '',
        actualTotal: '',
        payActualTotal: '',
        payTime: '',
        payRecord: {
          payProof: '',
          payUser: '',
          remark: ''
        }
      },
        BusinessObj(row.id).then(response => {
          this.serviceRecord = response.data
        });
    },
    // 获取详情
    detailName (row) {
      detailsInfo(row.id).then(res => {
        if (res.data.serviceStatus === 3) {
          this.form.id = res.data.id
          this.form.serviceStatus = res.data.serviceStatus
          this.form.actualTotal = res.data.actualTotal
          this.form.payActualTotal = res.data.payActualTotal
          this.form.payProof = res.data.payRecord.payProof
          this.form.remark = res.data.remark
        } else {
          this.form.id = res.data.id
          this.form.serviceStatus = res.data.serviceStatus
          this.form.actualTotal = res.data.actualTotal
        }
      })
    },
    // 客户下拉选择
    customerName () {
      customerSelect().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectCustom.push(cutObj)
        }
      });
    },
    //修改收款状态
    reviseObj (row) {
      let formData = {
        id: this.form.id,
        serviceStatus: '3',
        actualTotal: this.form.actualTotal,
        payProof: this.form.payProof,
        remark: this.form.remark,
        payActualTotal: this.form.payActualTotal,
      }
      if (formData.payActualTotal === '') {
        this.$message({
          message: "提交失败,实际收款不能为空！",
          type: 'error',
          duration: 2000
        });
        return false;
      }
       let reg = /^\d+(\.\d{2})?$/
      let reg2 = /.*\..*/
      if (reg.test(formData.payActualTotal) === false || reg2.test(formData.payActualTotal) === false) {
        this.$message({
          message: "提交失败,实际收款格式错误！",
          type: 'error',
          duration: 2000
        });
        return false;
      }
      if (formData.payActualTotal !== formData.actualTotal) {
        this.$message({
          message: "提交失败,实际收款金额不正确！",
          type: 'error',
          duration: 2000
        });
        return false;
      }
      this.$confirm('确定要保存吗？', '操作确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        confirm(formData).then(res => {
          this.dialogFormVisible = false
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "修改成功",
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
        })
      }).catch(() => { })
    },
    // 导出
    exportNum () {
      this.getList()
      if (this.total > 1000) {
        this.$alert('无法导出：导出数据量过大，一次导出数据最多不超过1000条', '导出数据', {
          confirmButtonText: '确定',
        });
      } else {
        let param = {
          customerCode: this.query.customerCode,
          serviceNumber: this.query.serviceNumber,
          userStatus: this.query.userStatus,
          submitTime: this.query.submitTime,
          operateTime: this.query.operateTime,
          billTime: this.query.billTime === ""
            ? ""
            : dateUtils.format(this.query.billTime, "YYYY-MM"),
          payable: this.query.payable,
          ...this.listQuery
        };
        if (param.submitTime !== '') {
          var start = param.submitTime[0] === null ? null : dateUtils.format(param.submitTime[0], "YYYY-MM-DD")
          var end = param.submitTime[1] === null ? null : dateUtils.format(param.submitTime[1], "YYYY-MM-DD")
          param.submitTime = `${start} ~ ${end}`
        }
        if (param.submitTime == 'null ~ null') {
          param.submitTime = ''
        }
        if (param.operateTime !== '') {
          var start = param.operateTime[0] === null ? null : dateUtils.format(param.operateTime[0], "YYYY-MM-DD")
          var end = param.operateTime[1] === null ? null : dateUtils.format(param.operateTime[1], "YYYY-MM-DD")
          param.operateTime = `${start} ~ ${end}`
        }
        if (param.operateTime == 'null ~ null') {
          param.operateTime = ''
        }
        let host = window.location.host
        window.location.href = '//' + host + '/api/ordersys/serviceInfo/export?customerCode=' + param.customerCode + '&serviceNumber=' + param.serviceNumber + '&userStatus=' + param.userStatus + '&submitTime=' + param.submitTime + '&operateTime=' + param.operateTime + '&billTime=' + param.billTime + '&payable=' + param.payable
      }
    },
    //收款确认
    UploadImg (row) {
      this.detailName(row)
      this.dialogFormVisible = true;
      this.form.payActualTotal = ''
      this.form.payProof = ''
      this.form.remark = ''
    },
    // 未付款
    nomoneyObj () {
      this.$confirm('确定要保存吗？', '操作确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = {
          id: this.form.id,
          serviceStatus: '1'
        }
        confirm(param).then(res => {
          this.dialogFormVisible = false
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "修改成功",
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
        })
      }).catch(() => { })
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

    cancel (formName) {
      this.dialogFormVisible = false;
    },


    //批量确认收款
    // changeVal (val) {
    //   this.one_page_slect = val    },
    // allConfirm () {
    //   let allData = [].concat(JSON.parse(JSON.stringify(this.one_page_slect)))
    //   if (this.one_page_slect.length === 0) {
    //     this.$message({
    //       message: '请选择需要确认收款的项目',
    //       type: 'warning'
    //     });
    //     return
    //   }
    //   this.$confirm('所选项目将全部确认收款，确定要继续？', '操作确认', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     let params = []
    //     allData.forEach((item, index) => {
    //       let param = {}
    //       param= item.id
    //       // id.userStatus = 1
    //       params.push(param)
    //     })
    //     let obj = { ids: params } // 删除
    //     this.loading.tableLoading = true
    //     allConfirmObj(obj).then(res => {
    //       this.loading.tableLoading = false
    //       if (res.rel) {
    //         this.$notify({
    //           title: "成功",
    //           message: "确认成功",
    //           type: "success",
    //           duration: 2000
    //         })
    //         this.one_page_slect = []
    //         this.all_page_select = []
    //         this.getList() // 重新加载table数据
    //       } else {
    //         this.$notify({
    //           title: "失败",
    //           message: "系统异常",
    //           type: "error",
    //           duration: 2000
    //         });
    //       }
    //       if (res.status !== 200) {
    //         this.$notify({
    //           title: "失败",
    //           message: res.message,
    //           type: "error",
    //           duration: 2000
    //         });
    //         this.one_page_slect = []
    //       }
    //     })
    //   }).catch(() => { })
    //  }
  },




};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.el-table {
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  background-color: #fff;
  border: 1px solid #dfe6ec;
  font-size: 14px;
  color: #1f2d3d;
  cursor: pointer;
}
.zhushi {
  font-size: 12px;
  color: #bfcbd9;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #bfcbd9;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.formTable {
  width: 98%;
  margin: 0 auto;
  border: 1px solid #c6c6c6;
  background: #f2f2f2;
  overflow: hidden;
  color: #48576a;
  margin-top: -10px;
}
.formTable ul {
  width: 100%;
  overflow: hidden;
  padding: 0;
  padding-left: 10px;
  padding-right: 10px;
}
.formTable ul li {
  float: left;
  width: 50%;
  color: #383d45;
  font-weight: 600;
}
.formTable ul li span {
  font-weight: normal;
}
.mt15 {
  margin-top: 10px;
}
.moneyStatus {
  width: 98%;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 20px;
}

.starText {
  position: relative;
}
.starText .txtStar {
  position: absolute;
  color: red;
  top: 10px;
  left: 3px;
}
.starText .spantext {
  display: block;
  color: #999999;
  font-size: 12px;
  margin-top: -10px;
}
.el-radio {
  color: #333;
  font-weight: normal;
}
.changeBg {
  display: block;
  background-color: #eef1f6;
  color: #bbb;
  cursor: not-allowed;
  width: 100px;
  height: 100px;
  margin-left: 28px;
  border: 1px dashed #bfcbd9;
}
.changeAdd {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>



