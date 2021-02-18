<template>
  <div class="app-container calendar-list-container"
       id="app-container">
    <div class="app-container-left">
      <div class="filter-container">
        <el-select placeholder="请选择客户名称"
                   v-model="query.customerName"
                   clearable
                   style="width: 200px"
                   popper-class="optionsContent"
                   filterable>
          <el-option v-for="item in selectCustom"
                     :key="item.value"
                     :value="item"
                     :label="item.label"></el-option>
        </el-select>
        <el-input @keyup.enter.native="handleFilter"
                  style="width: 200px;"
                  class="filter-item"
                  placeholder="请输入申请编号"
                  v-model="query.serviceNumber"> </el-input>
        <!-- <el-select placeholder="请选择处理进度"
                   v-model="query.serviceStatus"
                   clearable
                   style="width: 200px"
                   filterable>
          <el-option v-for="item in selectProcess"
                     :key="item.value"
                     :value="item.value"
                     :label="item.label"></el-option>
        </el-select> -->
        <!-- <el-select placeholder="请选择服务是否完结"
                   v-model="query.operateStatus"
                   clearable
                   style="width: 200px"
                   filterable>
          <el-option v-for="item in operateList"
                     :key="item.value"
                     :value="item.value"
                     :label="item.label"></el-option>
        </el-select> -->
        <el-select placeholder="请选择核对状态"
                   v-model="query.userStatus"
                   clearable
                   style="width: 200px"
                   popper-class="optionsContent"
                   filterable>
          <el-option v-for="item in selectCollection"
                     :key="item.value"
                     :value="item.value"
                     :label="item.label"></el-option>
        </el-select>
        <!-- <el-date-picker type="date"
                        placeholder="请选择开始日期"
                        style="width: 200px;"
                        class="filter-item"
                        readonly="true"
                        @keyup.enter.native="handleFilter"
                        format="yyyy-MM-dd"
                        v-model="query.submitStartTime">
        </el-date-picker> -->
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
                        popper-class="timeSelect"
                        class="filter-item"
                        @keyup.enter.native="handleFilter"
                        range-separator=" ~ "
                        v-model="query.operateTime">
        </el-date-picker>
        <!-- <el-date-picker type="date"
                        placeholder="请选择结束日期"
                        style="width: 200px;"
                        class="filter-item"
                        @keyup.enter.native="handleFilter"
                        format="yyyy-MM-dd"
                        v-model="query.submitEndTime">
        </el-date-picker> -->
        <el-date-picker type="month"
                        placeholder="出账月份"
                        style="width: 200px;"
                        class="filter-item"
                        @keyup.enter.native="handleFilter"
                        format="yyyy-MM"
                        popper-class="timeSelect"
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
        <el-select placeholder="申请人"
                   v-model="query.submitUser"
                   clearable
                   popper-class="optionsContent"
                   style="width: 200px"
                   filterable>
          <el-option v-for="item in selectUser"
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
                   @click="orderExport">导出账单和清单</el-button>
      </div>
      <el-table :data="list"
                v-loading="loading.tableLoading"
                element-loading-text="正在加载中......"
                border
                fit
                highlight-current-row
                style="width: 100%"
                :height="elTableMediaHeight"
                @selection-change="changeVal">
        <!-- <el-table-column type="selection"
                         align="center"
                         width='55'>
        </el-table-column> -->
        <el-table-column min-width="120"
                         align="center"
                         label="客户名称"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.customerName}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="120"
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
        <el-table-column min-width="200"
                         align="center"
                         label="申请编号"
                         show-overflow-tooltip>
          <template scope="scope">
            <!-- <span style="cursor: pointer;">{{scope.row.logisticsNo}}</span> -->
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
                  v-if="scope.row.userStatus === 0">未核对</span>
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
        <el-table-column fixed="right"
                         align="center"
                         label="操作"
                         width="210">
          <template scope="scope">
            <el-button type="text"
                       v-if="scope.row.payable === false && scope.row.userStatus !== -3"
                       @click="infoCheck(scope.row)">核对
            </el-button>
            <el-button type="text"
                       v-if="scope.row.payable === true || scope.row.userStatus === -3"
                       style="color:#999"
                       :disabled="true"> 核对
            </el-button>
            <el-button type="text"
                       v-if="scope.row.payable === false && scope.row.userStatus === 1"
                       @click="serviceOver(scope.row)">仓库作业信息
            </el-button>
            <el-button type="text"
                       v-if="!(scope.row.payable === false && scope.row.userStatus === 1)"
                       style="color:#999"
                       :disabled="true">仓库作业信息
            </el-button>
            <el-button type="text"
                       v-if="scope.row.payable === false && scope.row.userStatus !== -3"
                       @click="delMethod(scope.row)">删除
            </el-button>
            <el-button type="text"
                       v-if="scope.row.payable === true || scope.row.userStatus === -3"
                       style="color:#999"
                       :disabled="true"> 删除
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
    <!-- <el-dialog title="上传付款凭证"
               :visible.sync="dialogFormVisible"
               :close-on-click-modal="false"
               class="dialogcss">
      <el-form :model="form"
               :rules="rules"
               ref="form"
               label-width="100px">
        <el-form-item label="客户名称:"
                      label-width="120px">
          <span>{{form.customerName}}</span>
        </el-form-item>
        <el-form-item label="应付金额:"
                      label-width="120px">
          <span>{{form.payableTotal}}元</span>
        </el-form-item>
        <el-form-item label="客户付款凭证:"
                      label-width="120px">
          <el-upload class="avatar-uploader"
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
        </el-form-item>
        <el-form-item label="备注："
                      label-width="120px">
          <el-input v-model="form.remark"
                    autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button type="primary"
                   @click="PaymentObj('form')">确 定</el-button>
      </div>
    </el-dialog> -->

    <el-dialog title="信息核对"
               :visible.sync="infoFormVisible"
               :close-on-click-modal="false"
               class="receiptWidth600">
      <el-form :model="form"
               ref="form"
               label-width="139px"
               class="serviceForm">
        <el-form-item label="核对结果:"
                      label-width="82px">
          <el-radio-group v-model="form.serviceStatus"
                          style="margin-left: 54px">
            <el-radio :label="1">
              通过
            </el-radio>
            <el-radio :label="-2">拒绝</el-radio>
          </el-radio-group>
          <div class="starText"
               v-if="form.serviceStatus == -2">
            <el-input v-model="form.statusExplain"
                      style="width: 400px;margin-left: -72px;"
                      :maxlength='200'
                      placeholder="拒绝原因（必填） 限200字"></el-input>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button type="primary"
                   v-if="form.serviceStatus == -2"
                   @click="refuseMethod">确认</el-button>
        <el-button type="primary"
                   v-if="form.serviceStatus == 1"
                   @click="passCheck">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog title="仓库作业信息"
               :visible.sync="serviceFormVisible"
               :close-on-click-modal="false"
               class="receiptWidth800 logisticsWidth">

      <div class="formTable">
        <el-table :key='tableKey'
                  :data="serviceDetailList"
                  v-loading="loading.tableKeyLoading"
                  border>
          <el-table-column align="center"
                           label="增值服务项目"
                           show-overflow-tooltip
                           min-width="130">
            <template scope="scope">
              <span style="cursor: pointer;">{{scope.row.serviceName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="单位"
                           show-overflow-tooltip
                           min-width="80">
            <template scope="scope">
              <span style="cursor: pointer;">{{scope.row.serviceUnit}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="官方单价"
                           show-overflow-tooltip
                           min-width="100">
            <template scope="scope">
              <span style="cursor: pointer;">{{scope.row.servicePrice}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="申请数量"
                           show-overflow-tooltip
                           min-width="100">
            <template scope="scope">
              <span style="cursor: pointer;">{{scope.row.serviceQuantity}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="实际完成数量"
                           show-overflow-tooltip
                           min-width="150">
            <template scope="scope">
              <el-input v-model="scope.row.actualServiceQuantity"
                        autocomplete="off"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-form :model="form"
               ref="form"
               style="margin-top: 20px;"
               label-width="139px"
               class="serviceForm">
        <el-form-item label="作业完结时间:"
                      label-width="111px">
          <el-date-picker type="date"
                          placeholder="选择时间（必填）"
                          style="width: 200px;margin-left: 28px;"
                          class="filter-item"
                          format="yyyy-MM-dd"
                          v-model="form.operateTime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注："
                      label-width="62px">
          <el-input v-model="form.remark"
                    placeholder="备注（非必填），限200字"
                    type="textarea"
                    :rows="2"
                    :maxlength='200'
                    style="width: 400px;margin-left: 76px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button type="primary"
                   @click="passOperate">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog title="增值服务详情"
               :visible.sync="dialogDetails"
               class="fixdialog"
               :close-on-click-modal="false">
      <Business-detail :serviceRecord="serviceRecord"></Business-detail>
    </el-dialog>
  </div>
</template>
<script>
import {
  page,
  confirm,
  payObj,
  delCheck,
  customerSelect,
  BusinessObj,
  detailsInfo,
  ImgExportUrl,
  BillTime,
  reportOperation,
  setOperateStatus
} from "api/addService/serviceCheck/index";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  components: {
    // 引入编辑的组件
    "Business-detail": () => import("./components/BusinessDetail")
  },
  name: "sellBsorderHead",
  data () {
    return {
      //仓库作业信息
      serviceDetailList: [],
      //信息核对
      serviceRecord: [],
      formTable: {},
      form: {
        id: '',
        serviceStatus: '',
        statusExplain: '',
        // operateStatus: '',
        remark: '',
        operateTime: ''
      },
      infoFormVisible: false,
      serviceFormVisible: false,
      total: 0,
      list: [],
      one_page_slect: [],
      all_page_select: [],
      loading: {
        tableLoading: false
      },
      textMap: {
        install: '设置应付金额',
        revise: '修改应付金额'
      },
      dialogStatus: '',
      // form: {
      //   customerName: '',
      //   payableTotal: '',
      //   payProof: '',
      //   remark: '',
      //   id: ''
      // },
      rules: {},
      query: {
        customerName: '',
        serviceNumber: '',
        userStatus: '',
        submitTime: '',
        operateTime: '',
        billTime: '',
        payable: '',
        submitUser:''
      },
      listQuery: {
        page: 1,
        limit: 10,
      },
      serviceRecord: [
        // {
        //   createTime:'',
        //   createUser:'',
        //   id:'',
        //   remark:'',
        //   serviceStatus:'',
        //   statusExplain:'',
        // },
      ],
      selectCustom: [],
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
      selectUser: [
        {
          value: '0',
          label: '全部申请'
        },
        {
          value: '1',
          label: '我申请的'
        },
      ],
      selectProcess: [
        {
          value: '-3',
          label: '已撤销'
        },
        {
          value: '-2',
          label: '已拒绝'
        },
        {
          value: '0',
          label: '待核对'
        },
        {
          value: '1',
          label: '待定价'
        },
        {
          value: '2',
          label: '待付款'
        },
        {
          value: '3',
          label: '已付款'
        },
      ],
      operateList: [
        {
          value: 'all',
          label: '全部状态'
        },
        {
          value: '1',
          label: '已完结'
        },
        {
          value: '0',
          label: '未完结'
        }
      ],
      selectCollection: [
        {
          value: 'all',
          label: '全部状态'
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
          value: '0',
          label: '待核对'
        },
        {
          value: '-3',
          label: '已撤回'
        }
      ],
      dialogFormVisible: false,
      dialogDetails: false,
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
    //拒绝
    refuseMethod () {
      console.log(this.formTable.id)
      console.log(this.formTable.serviceStatus)
      if (!this.form.statusExplain) {
        this.$message({
          message: "请填写拒绝原因！",
          type: 'error',
          duration: 2000
        });
        return false
      }
      if (this.formTable.serviceStatus == 1) {
        BillTime({ id: this.formTable.id }).then(response => {
          //true 小于出账日期
          if (response.data.isBill) {
            this.$confirm('核对拒绝后，此申请的仓库完结信息将被清空，单价将重置为官方单价，优惠将重置为0，确定要修改？', '提示', {
              confirmButtonText: '继续',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let param = {
                statusExplain: this.form.statusExplain,
                serviceStatus: -2,
                id: this.formTable.id
              }
              console.log(param)
              confirm(param).then(res => {
                if (res.rel) {
                  this.$notify({
                    title: "成功",
                    message: "已拒绝",
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
          } else {
            this.$confirm('核对拒绝后，此申请的仓库完结信息将被清空，单价将重置为官方单价，优惠将重置为0，确定要修改？ \r\n 此申请出账时间为' + response.data.billTime.substring(0, 10) + '，本次修改可能影响账单内容，请及时和相关同事沟通，以便及时通知客户。', '提示', {
              confirmButtonText: '继续',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let param = {
                statusExplain: this.form.statusExplain,
                serviceStatus: -2,
                id: this.formTable.id
              }
              console.log(param)
              confirm(param).then(res => {
                if (res.rel) {
                  this.$notify({
                    title: "成功",
                    message: "已拒绝",
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
          }
        })
      } else {
        this.$confirm('确定要拒绝？', '操作确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = {
            statusExplain: this.form.statusExplain,
            serviceStatus: -2,
            id: this.formTable.id
          }
          console.log(param)
          confirm(param).then(res => {
            if (res.rel) {
              this.$notify({
                title: "成功",
                message: "已拒绝",
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
      }
    },
    //删除
    delMethod (row) {
      this.$confirm('删除后，此数据将在先知系统内清除，确定要删除？', '删除确认', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delCheck(row.id).then(res => {
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
        })
      }).catch(() => { })
    },
    //通过核对
    passCheck () {
      this.$confirm('确定已核对，且内容无误？', '操作确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = {
          serviceStatus: 1,
          id: this.formTable.id
        }
        confirm(param).then(res => {
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
    //reportOperation仓库作业信息
    passOperate () {
      let param = {
        id: this.formTable.id,
        remark: this.form.remark,
        operateTime: this.form.operateTime === ""
          ? ""
          : dateUtils.format(this.form.operateTime, "YYYY-MM-DD"),
        serviceDetailList: this.formTable.serviceDetailList
      }
      if (!this.form.operateTime) {
        this.$message({
          message: "请选择作业完结时间",
          type: 'error',
          duration: 2000
        });
        return false
      }
      console.log(param)
      BillTime({ id: this.formTable.id }).then(response => {
        //true 小于出账日期
        if (response.data.isBill) {
          reportOperation(param).then(res => {
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
        } else {
          this.$confirm('此申请出账时间为' + response.data.billTime.substring(0, 10) + '，本次修改可能影响账单内容，请及时和相关同事沟通，以便及时通知客户。', '操作确认', {
            confirmButtonText: '继续',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log(param)
            reportOperation(param).then(res => {
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
        }
      })
    },
    //未完结
    noOperate () {
      let param = {
        operateStatus: 0,
        id: this.formTable.id
      }
      if (this.form.operateStatus === '') {
        this.$message({
          message: "请选择服务是否完结",
          type: 'error',
          duration: 2000
        });
        return false
      }
      this.$confirm('确定服务未完结？', '操作确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(param)
        setOperateStatus(param).then(res => {
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
    //重新核对
    reCheck (row) {
      this.$confirm('确定要重新核对？', '操作确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = {
          serviceStatus: 0,
          id: row.id
        }
        confirm(param).then(res => {
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
    getList () {
      this.loading.tableLoading = true;
      let param = {
        customerCode: this.query.customerName.value,
        serviceNumber: this.query.serviceNumber,
        userStatus: this.query.userStatus,
        submitTime: this.query.submitTime,
        operateTime: this.query.operateTime,
        submitUser:this.query.submitUser,
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
        // console.log(1111)
        console.log(this.list)
        this.total = response.data.total;
        this.cancel()
      });
    },
    handleFilter () {
      console.log(this.query)
      this.getList();
      // }
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
        submitExplain:'',
        serviceNumber: '',
        customerName: '',
        submitUser: '',
        submitTime: '',
        serviceTotal: '',
        operateTime: '',
        payableTotal: '',
        serviceTax: '',
        payableTaxTotal: '',
        discountPrice: '',
        actualTotal: '',
        payActualTotal: '',
        remark: '',
        payTime: '',
        payRecord: {
          payProof: '',
          payUser: ''
        }
      },
        BusinessObj(row.id)
          .then(response => {
            // console.log(response.data)
            this.serviceRecord = response.data
          });
    },
    // 客户下拉选择
    customerName () {
      customerSelect().then(response => {
        // console.log(response.data)
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectCustom.push(cutObj)
        }
        // console.log(this.selectCustom)
      });
    },
    //确认收款
    confirmObj (row) {
      this.$confirm('确认已经收到客户付款?', '操作确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = {
          serviceStatus: 3,
          id: row.id
        }
        confirm(param).then(res => {
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
    //修改收款状态
    reviseObj (row) {
      this.$confirm('客户收款状态将变为“未收款”，确定要继续？', '操作确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = {
          serviceStatus: 2,
          id: row.id
        }
        confirm(param).then(res => {
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
    //上传凭证
    // UploadImg (row) {
    //   this.resetTemp()
    //   this.dialogFormVisible = true;
    //   this.form.customerName = row.customerName;
    //   this.form.payableTotal = row.payableTotal;
    //   this.form.payProof= row.payProof;
    //   this.form.id = row.id;
    // },

    // PaymentObj (form) {
    //   this.$refs["form"].validate(valid => {
    //     if (!valid) {
    //       return false;
    //     } 
    //     else {
    //       // if (this.form.payProof === "") {
    //       //   this.$message({
    //       //     message: "提交失败,请上传客户付款凭证！",
    //       //     type: 'error',
    //       //     duration: 2000
    //       //   });
    //       //   return false;
    //       // }
    //       this.$confirm("确定要保存吗", "提示", {
    //         confirmButtonText: "确定",
    //         cancelButtonText: "取消",
    //         type: "warning"
    //       }).then(() => {
    //         payObj(this.form).then(response => {
    //           this.dialogFormVisible = false;
    //           if (response.rel) {
    //             this.$notify({
    //               title: "成功",
    //               message: "保存成功",
    //               type: "success",
    //               duration: 2000
    //             });
    //             this.getList();
    //           } else {
    //             this.$notify({
    //               title: "失败",
    //               message: response.message,
    //               type: "error",
    //               duration: 2000
    //             });
    //           }
    //           this.$refs["form"].resetFields();
    //         });
    //       }).catch(() => { });
    //     }
    //   });
    // },
    //  上传图片
    // handleSuccess (response, file) {
    //   if (response.status === undefined || response.status !== 200) {
    //     this.$alert(response.msg, '图片上传失败')
    //     return
    //   } else {
    //     this.form.payProof = response.data;
    //   }
    // },
    // handleError (err, file) {
    //   this.$message({
    //     title: 'error',
    //     message: err
    //   })
    //   console.log(err)
    // },
    // handleBefore (file) {
    //   return true;
    //   const imgPng = file.type === 'image/png'
    //   const imgJpeg = file.type === 'image/jpeg'
    //   const imgSize = file.size / 1024 / 1024 < 2
    //   if (!imgPng && !imgJpeg) {
    //     this.$message.error('图片上传格式不对')
    //   }
    //   if (!imgSize) {
    //     this.$message.error('图片大小不能超过2M')
    //   }
    //   return (imgJpeg || imgPng) && imgSize
    // },

    // cancel (formName) {
    //   this.dialogFormVisible = false;
    //   this.resetTemp()
    // },

    // resetTemp () {
    //   this.form = {
    //     customerName: '',
    //     payableTotal: '',
    //     payProof: '',
    //     remark: '',
    //   };
    // },

    //批量确认收款
    changeVal (val) {
      this.one_page_slect = val
    },
    //信息核对
    infoCheck (row) {
      console.log(row.id)
      detailsInfo(row.id).then(res => {
        this.infoFormVisible = true
        this.form.id = res.data.id
        this.form.actualTotal = res.data.actualTotal
        this.form.payTime = res.data.payTime
        this.form.payProof = res.data.payProof
        this.form.remark = res.data.remark || ''
        this.form.statusExplain = res.data.statusExplain || ''
        this.form.serviceStatus = res.data.serviceStatus
        this.formTable = res.data
        this.formTable.billTime = row.billTime
        console.log(this.formTable)
        // this.formTable.serviceNumber = res.data.serviceNumber
        // this.formTable.customerName = res.data.customerName
        // this.formTable.submitUser = res.data.submitUser
        // this.formTable.submitTime = res.data.submitTime
        // this.formTable.serviceTotal = res.data.serviceTotal
        // this.formTable.payableTotal = res.data.payableTotal
        // this.formTable.serviceDetailList = res.data.serviceDetailList
      })
    },
    //服务未完结
    serviceOver (row) {
      detailsInfo(row.id).then(res => {
        this.serviceFormVisible = true
        this.form.id = res.data.id
        this.form.actualTotal = res.data.actualTotal
        this.form.payTime = res.data.payTime
        this.form.payProof = res.data.payProof
        this.form.remark = res.data.remark || ''
        this.form.statusExplain = res.data.statusExplain || ''
        this.form.operateTime = res.data.operateTime || ''
        this.form.serviceStatus = res.data.serviceStatus
        this.form.operateStatus = res.data.operateStatus
        this.formTable = res.data
        this.serviceDetailList = res.data.serviceDetailList
        console.log(this.formTable)
        // this.formTable.serviceNumber = res.data.serviceNumber
        // this.formTable.customerName = res.data.customerName
        // this.formTable.submitUser = res.data.submitUser
        // this.formTable.submitTime = res.data.submitTime
        // this.formTable.serviceTotal = res.data.serviceTotal
        // this.formTable.payableTotal = res.data.payableTotal
        // this.formTable.serviceDetailList = res.data.serviceDetailList
      })
    },
    // 导出
    orderExport () {
      this.getList()
      if (this.total > 1000) {
        this.$alert('无法导出：导出数据量过大，一次导出数据最多不超过1000条', '导出数据', {
          confirmButtonText: '确定',
        });
      } else {
        let param = {
          customerCode: this.query.customerName.value,
          serviceNumber: this.query.serviceNumber,
          userStatus: this.query.userStatus,
          submitTime: this.query.submitTime,
          operateTime: this.query.operateTime,
          submitUser: this.query.submitUser,
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
        if (param.customerCode == undefined) {
          param.customerCode = ''
        }
        let host = window.location.host
        window.location.href = '//' + host + '/api/ordersys/serviceInfo/export?customerCode=' + param.customerCode + '&serviceNumber=' + param.serviceNumber + '&userStatus=' + param.userStatus + '&submitTime=' + param.submitTime + '&operateTime=' + param.operateTime + '&billTime=' + param.billTime + '&payable=' + param.payable + '&submitUser=' + param.submitUser
      }
    },
    cancel () {
      this.infoFormVisible = false
      this.serviceFormVisible = false
    }
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
  // border: 1px solid #c6c6c6;
  // background: #f2f2f2;
  overflow: hidden;
  color: #48576a;
  // margin-top: -10px;
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
.remark {
  padding-left: 140px;
  color: #666;
  margin-top: -10px;
}
</style>



