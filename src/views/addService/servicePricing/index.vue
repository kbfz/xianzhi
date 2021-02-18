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
                   popper-class="optionsContent"
                   clearable
                   style="width: 200px"
                   filterable>
          <el-option v-for="item in selectProcess"
                     :key="item.value"
                     :value="item.value"
                     :label="item.label"></el-option>
        </el-select>
        <!-- <el-select placeholder="请选择定价状态"
                   v-model="query.userStatus"
                   clearable
                   style="width: 200px"
                   filterable>
          <el-option v-for="item in selectCollection"
                     :key="item.value"
                     :value="item.value"
                     :label="item.label"></el-option>
        </el-select> -->
        <el-date-picker type="daterange"
                        placeholder="客户申请时间"
                        style="width: 200px;"
                        class="filter-item"
                        popper-class="timeSelect"
                        @keyup.enter.native="handleFilter"
                        format="yyyy-MM-dd"
                        range-separator=" ~ "
                        v-model="query.submitTime">
        </el-date-picker>
        <el-date-picker type="daterange"
                        placeholder="仓库作业完结时间"
                        style="width: 200px;"
                        popper-class="timeSelect"
                        class="filter-item"
                        @keyup.enter.native="handleFilter"
                        format="yyyy-MM-dd"
                        range-separator=" ~ "
                        v-model="query. operateTime">
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
        <!-- <el-badge :value="one_page_slect.length"> -->
        <el-button class="filter-item"
                   type="primary"
                   style="margin-left:0"
                   v-waves
                   @click="orderExport">导出账单和清单</el-button>
        <!-- <el-button class="filter-item"
                     type="primary"
                     @click="orderExport"
                     v-waves
                     >导出账单和清单</el-button> -->
        <!-- </el-badge> -->
      </div>
      <el-table :data="list"
                v-loading="loading.tableLoading"
                element-loading-text="正在加载中......"
                border
                fit
                highlight-current-row
                style="width: 100%"
                :height="elTableMediaHeight">
        <!-- @selection-change="changeVal" -->
        <!-- <el-table-column type="selection"
                         width="55"
                         align="center">
        </el-table-column> -->
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

        <el-table-column min-width="180"
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
                  v-if="scope.row.userStatus === 0">待审核</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.userStatus === 1">通过</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.userStatus === -2">拒绝</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.userStatus === -3">撤销</span>
          </template>
        </el-table-column>
        <el-table-column min-width="160"
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
        <el-table-column min-width="200"
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
        <el-table-column min-width="80"
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
        <el-table-column min-width="150"
                         align="center"
                         label="客户应付金额"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;"
                  v-if="!scope.row.payActualTotal">无</span>
            <span style="cursor: pointer;"
                  v-else>{{scope.row.payActualTotal}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="140"
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
        <el-table-column min-width="100"
                         align="center"
                         label="是否付款"
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
                         width="200">
          <template scope="scope">
            <el-button type="text"
                       v-if="scope.row.userStatus === 1 && scope.row.payable === false"
                       @click="handleinstall(scope.row)"> 修改金额
            </el-button>
            <el-button type="text"
                       v-if="scope.row.userStatus !== 1 || scope.row.payable === true"
                       style="color:#999"
                       :disabled="true"> 修改单价
            </el-button>
            <el-button type="text"
                       v-if="scope.row.payable === false &&  scope.row.operateTime!== undefined"
                       @click="handlerevise(scope.row)"> 优惠
            </el-button>
            <el-button type="text"
                       v-if="scope.row.payable === true ||  !scope.row.operateTime "
                       style="color:#999"
                       :disabled="true"> 优惠
            </el-button>
            <el-button type="text"
                       v-if="scope.row.payable === false"
                       @click="delMethod(scope.row)"> 删除
            </el-button>
            <el-button type="text"
                       v-if="scope.row.payable === true"
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
    <el-dialog title="修改金额"
               :visible.sync="dialogFormVisible"
               :close-on-click-modal="false"
               class="fixdialog logisticsWidth">
      <div class="contenttip"
           v-if="isShow">
        注意：仓库暂未完结此增值服务，费用暂时无法计算，请联系客服获取仓库完成进度。
      </div>
      <el-form :model="formTable"
               label-width="100px">
        <div class="tablecontent">
          <el-table :key='tableKey'
                    :data="listitem"
                    v-loading="loading.tableKeyLoading"
                    border>
            <el-table-column align="center"
                             label="客户申请信息">
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
            </el-table-column>
            <el-table-column align="center"
                             label="实际信息">
              <el-table-column align="center"
                               label="实际完成数量"
                               show-overflow-tooltip
                               min-width="150">
                <template scope="scope">
                  <span style="cursor: pointer;"
                        v-if="!scope.row.actualServiceQuantity">暂未完成</span>
                  <span style="cursor: pointer;"
                        v-else>{{scope.row.actualServiceQuantity}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center"
                               label="实际单价设置"
                               show-overflow-tooltip
                               min-width="150">
                <!-- <template scope="scope">
                  <span style="cursor: pointer;">{{scope.row.actualServicePrice}}</span>
                </template> -->
                <template scope="scope">
                  <el-input v-model="scope.row.actualServicePrice"
                            autocomplete="off"
                            @change="changeNum(scope.row, $event)"
                            @blur="addFloar"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center"
                               label="实际总价(不含税)"
                               show-overflow-tooltip
                               min-width="150">
                <!-- <template scope="scope">
                  <span style="cursor: pointer;">{{scope.row.actualServicePrice}}</span>
                </template> -->
                <template scope="scope">
                  <el-input v-model="scope.row.actualTotalPrice"
                            autocomplete="off"
                            @change="changeNum(scope.row, $event)"
                            @blur="addFloar"></el-input>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <el-form-item label="实际总价之和（不含税）："
                        label-width="180px">
            <!-- <el-input v-model="form.payableTotal"
                    autocomplete="off"
                    style="width: 300px;"></el-input> -->
            <span v-if="!formTable.payableTotal">暂无</span>
            <span v-else>{{formTable.payableTotal}}</span>
          </el-form-item>
          <el-form-item label="税金："
                        label-width="180px">
            <span v-if="!formTable.serviceTax">暂无</span>
            <span v-else>{{formTable.serviceTax}}</span>
          </el-form-item>
          <el-form-item label="实际总价之和（含税）："
                        label-width="180px">
            <span>{{formTable.payableTaxTotal}}</span>
            <span v-if="!formTable.payableTaxTotal">暂无</span>
          </el-form-item>
          <el-form-item label="备注："
                        label-width="180px">
            <el-input v-model="formTable.remark"
                      autocomplete="off"
                      style="width: 300px;"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <!-- <el-form :model="form"
               :rules="rules"
               ref="form"
               label-width="100px">

      </el-form> -->
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary"
                   @click="installObj()">确 定</el-button>
        <!-- <el-button v-else
                   type="primary"
                   @click="reviseObj('form')">确 定</el-button> -->
        <!-- <el-button type="primary"
                   @click="dialogFormVisible = false">确 定</el-button> -->
      </div>
    </el-dialog>
    <el-dialog title="优惠金额"
               :visible.sync="dialogFormVisiblePre"
               :close-on-click-modal="false"
               class="receiptWidth800 logisticsWidth">
      <el-form :model="form"
               :rules="rules"
               ref="form"
               label-width="100px">
        <el-form-item label="实际总价（不含税）："
                      label-width="180px">
          <span v-if="!form.payableTotal">暂无</span>
          <span v-else>{{form.payableTotal}}</span>
        </el-form-item>
        <el-form-item label="税金："
                      label-width="180px">
          <span v-if="!form.serviceTax">暂无</span>
          <span v-else>{{form.serviceTax}}</span>
        </el-form-item>
        <el-form-item label="实际总价（含税）："
                      label-width="180px">
          <span v-if="!form.payableTaxTotal">暂无</span>
          <span v-else>{{form.payableTaxTotal}}</span>
        </el-form-item>
        <el-form-item label="优惠金额："
                      label-width="180px">
          <el-input v-model="form.discountPrice"
                    autocomplete="off"
                    style="width: 300px;"
                    @change="changeNumPrice"
                    @blur="addFloarPrice"></el-input>
          <div class="contenttip" style="background-color: transparent;border: none;">
            *请在“实际总价（含税）”金额的基础上设置优惠金额
          </div>
        </el-form-item>
        <el-form-item label="客户应付金额："
                      label-width="180px"
                      class="redtext">
          <span v-if="!form.payActualTotal">暂无</span>
          <span v-else>{{form.payActualTotal}}</span>
        </el-form-item>
        <el-form-item label="备注："
                      label-width="180px">
          <el-input v-model="form.remark"
                    autocomplete="off"
                    style="width: 300px;"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary"
                   @click="reviseObj()">确 定</el-button>
        <!-- <el-button type="primary"
                   @click="dialogFormVisible = false">确 定</el-button> -->
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
  installObj,
  reviseObj,
  getObj,
  customerSelect,
  delObj,
  BillTime,
  BusinessObj,
  getActualPrice
} from "api/addService/servicePricing/index";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
import { floatAdd, floatMul, floatSub } from 'utils/index';
export default {
  components: {
    //   // 引入编辑的组件
    "Business-detail": () => import("./components/BusinessDetail")
  },
  name: "servicePricing",
  data () {
    return {
      total: 0,
      list: [],
      one_page_slect: [],
      isShow: false,
      // all_page_select: [],
      loading: {
        tableLoading: false,
        tableKeyLoading: false
      },
      // textMap: {
      //   install: '设置应付金额',
      //   revise: '修改应付金额'
      // },
      dialogStatus: '',
      formTable: {
        id: '',
        payableTotal: '',
        serviceTax: '',
        payableTaxTotal: '',
        remark: '',
      },
      form: {
        discountPrice: '',
        remark: '',
        id: ''
      },
      tableKey: 0,
      listitem: [],
      rules: {},
      query: {
        customerCode: '',
        serviceNumber: '',
        userStatus: '',
        submitTime: '',
        operateTime: '',
        billTime: '',
        payable: '',
        // authorType: ''
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
      serviceRecordList: [],
      selectCustom: [],
      selectSubmitter: [
        {
          value: 'true',
          label: '是'
        },
        {
          value: 'false',
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
        // {
        //   value: '2',
        //   label: '待付款'
        // },
        // {
        //   value: '3',
        //   label: '已付款'
        // },
      ],
      // selectCollection: [
      //   {
      //     value: 'all',
      //     label: '全部状态'
      //   },
      //   {
      //     value: '0',
      //     label: '未定价'
      //   },
      //   {
      //     value: '1',
      //     label: '已定价'
      //   },
      // ],
      dialogFormVisible: false,
      dialogFormVisiblePre: false,
      dialogDetails: false,
    };
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight", "name"])
  },
  created () {
    this.getList();
    this.customerName()
  },
  methods: {
    getList () {
      this.loading.tableLoading = true;
      let param = {
        customerCode: this.query.customerCode,
        serviceNumber: this.query.serviceNumber,
        userStatus: this.query.userStatus,
        submitTime: this.query.submitTime,
        operateTime: this.query.operateTime,
        billTime:
          this.query.billTime === ""
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
    // changeVal (val) {
    //   this.one_page_slect = val
    // },
    //详情
    loginQuery (row) {
      this.dialogDetails = true;
      this.serviceRecord = {
        serviceRecordList: [],
        serviceNumber: '',
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
        operateTime: '',
        payRecord: {
          payProof: '',
          remark: '',
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
    //优惠
    handlerevise (row) {
      let param = {
        id: row.id
      };
      var billnum;
      BillTime(param).then(response => {
        billnum = response.data.isBill;
        if (billnum === false) {
          this.$confirm('此申请出账时间为' + response.data.billTime.substring(0, 10) + '，本次修改可能影响账单内容，请及时和相关同事沟通，以便及时通知客户。', '提示', {
            confirmButtonText: '继续',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            getObj(row.id)
              .then(response => {
                this.dialogFormVisiblePre = true;
                // this.form = response.data;
                if (response.data.discountPrice === undefined) {
                  this.form.discountPrice = '0.00';
                  this.form.payActualTotal = this.form.payableTaxTotal = response.data.payableTaxTotal;
                  this.form.payableTotal = response.data.payableTotal;
                  this.form.serviceTax = response.data.serviceTax;
                  // this.form.remark = response.data.remark;
                  this.form.remark = '';
                } else {
                  this.form = response.data;
                  this.form.payActualTotal = this.form.payableTaxTotal - this.form.discountPrice;
                  this.form.remark = '';
                };
                // console.log(response.data)
                // this.form.payableTotal = response.data.payableTotal;
                this.form.id = response.data.id
              });
          }).catch(() => { })
        } else {
          getObj(row.id)
            .then(response => {
              this.dialogFormVisiblePre = true;
              // this.form.remark = '';
              // this.form = response.data;
              if (response.data.discountPrice === undefined) {
                this.form.discountPrice = '0.00';
                this.form.payActualTotal = this.form.payableTaxTotal = response.data.payableTaxTotal;
                this.form.payableTotal = response.data.payableTotal;
                this.form.serviceTax = response.data.serviceTax;
                // this.form.remark = response.data.remark;
                this.form.remark = '';
              } else {
                this.form = response.data;
                this.form.payActualTotal = this.form.payableTaxTotal - this.form.discountPrice;
                this.form.remark = '';
              };
              // console.log(response.data)
              // this.form.payableTotal = response.data.payableTotal;
              this.form.id = response.data.id
            });
        }
      });
    },
    // 自动补全两位小数(优惠)
    addFloarPrice () {
      let inx = this.form.discountPrice.indexOf(".");
      if (inx == '-1') {
        this.form.discountPrice += '.00';
      }
      this.$emit('input', this.form.discountPrice);
      // console.log(this.form.discountPrice)
    },
    changeNumPrice () {
      this.form.payActualTotal = new Number(floatSub(this.form.payableTaxTotal, this.form.discountPrice)).toFixed(2)
    },

    reviseObj () {
      let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
      // let reg1 = /^\d{1,}$/;
      // console.log(reg1.test(this.form.discountPrice))
      if (reg.test(this.form.discountPrice) === false) {
        this.$message({
          message: "优惠金额只能为数字且不能为负数！",
          type: 'error',
          duration: 2000
        });
        return false;
      }
      // console.log(111)
      // console.log(this.form.discountPrice)

      // if (reg1.test(this.form.discountPrice) === false) {
      //   this.$message({
      //     message: "优惠金额只能为数字！",
      //     type: 'error',
      //     duration: 2000
      //   });
      //   return false;
      // }
      let param = {
        discountPrice: this.form.discountPrice,
        remark: this.form.remark,
        id: this.form.id,
      }
      // const set = this.$refs;
      this.$confirm('确定要保存吗？', '操作确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        reviseObj(param).then(res => {
          this.dialogFormVisiblePre = false;
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
      // reviseObj(param)
      // .then(() => {
      //     this.dialogFormVisiblePre = false;
      //     if (res.rel) {
      //       this.$notify({
      //         title: "成功",
      //         message: "修改成功",
      //         type: "success",
      //         duration: 2000
      //       });
      //       this.getList();
      //     } else {
      //       this.$notify({
      //         title: "失败",
      //         message: "系统异常",
      //         type: "error",
      //         duration: 2000
      //       });
      //     }
      //     if (res.status !== 200) {
      //       this.$notify({
      //         title: "失败",
      //         message: res.message,
      //         type: "error",
      //         duration: 2000
      //       });
      //     }
      // }).catch(() => { })
      // .then(() => {
      //   this.dialogFormVisiblePre = false;
      //   this.getList();
      //   this.$notify({
      //     title: '成功',
      //     message: '修改成功',
      //     type: 'success',
      //     duration: 2000
      //   });
      // });
    },
    changeNum (row,e) {
      if(row.actualServicePrice == e){
        let param={
          id:row.id,
          actualServicePrice:row.actualServicePrice
        }
        getActualPrice(param).then(res => {
          if (res.rel) {
            row.actualTotalPrice=res.data
          } else {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000
            });
          }
        })
      }else if(row.actualTotalPrice == e){
        let param={
          id:row.id,
          actualTotalPrice:row.actualTotalPrice
        }
        getActualPrice(param).then(res => {
          if (res.rel) {
            row.actualServicePrice=res.data
          } else {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000
            });
          }
        })
      }
      let payableTotal = []
      for (var i = 0; i < this.listitem.length; i++) {
        let numObj = {}
        // numObj.actualServicePrice = this.listitem[i].actualServicePrice;
        // numObj.actualServiceQuantity = this.listitem[i].actualServiceQuantity;
        // if (!numObj.actualServiceQuantity === false) {
        //   numObj = floatMul(numObj.actualServicePrice, numObj.actualServiceQuantity)
        // }
        numObj = parseFloat(this.listitem[i].actualTotalPrice);
        payableTotal.push(numObj)
      }
      let sum = 0
      for (var j = 0; j < payableTotal.length; j++) {
        sum += payableTotal[j]
      }
      if (this.formTable.payableTotal !== '') {
        this.formTable.payableTotal = sum.toFixed(2)
        this.formTable.serviceTax = floatMul(sum, 0.06).toFixed(2)
        this.formTable.payableTaxTotal = floatMul(sum, 1.06).toFixed(2)
      }
    },
    addFloar () {
      for (var i = 0; i < this.listitem.length; i++) {
        let inx = this.listitem[i].actualServicePrice.indexOf(".");
        // console.log(inx)
        if (inx == '-1') {
          this.listitem[i].actualServicePrice += '.00';
        }
        this.$emit('input', this.listitem[i].actualServicePrice);
      }
    },

    //修改单价
    handleinstall (row) {
      let param = {
        id: row.id
      }
      var billnum;
      BillTime(param).then(response => {
        billnum = response.data.isBill;
        if (billnum === false) {
          this.$confirm('此申请出账时间为' + response.data.billTime.substring(0, 10) + '，本次修改可能影响账单内容，请及时和相关同事沟通，以便及时通知客户。', '提示', {
            confirmButtonText: '继续',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            getObj(row.id)
              .then(response => {
                this.dialogFormVisible = true;
                // this.form = response.data;
                // this.formTable = response.data;'
                if (response.data.payableTotal === undefined) {
                  this.formTable.payableTotal = '';
                } else {
                  this.formTable = response.data;
                };
                this.loading.tableKeyLoading = true;
                this.listitem = response.data.serviceDetailList;
                this.formTable.remark = '';
                this.loading.tableKeyLoading = false;
                this.formTable.id = response.data.id;
                if (!response.data.operateTime === true) {
                  this.isShow = true;
                }
              });
          }).catch(() => { })
        } else {
          getObj(row.id)
            .then(response => {
              this.dialogFormVisible = true;
              // this.form = response.data;
              // this.formTable = response.data;'
              if (response.data.payableTotal === undefined) {
                this.formTable.payableTotal = '';
              } else {
                this.formTable = response.data;
              };
              this.loading.tableKeyLoading = true;
              this.listitem = response.data.serviceDetailList;
              this.formTable.remark = '';
              this.loading.tableKeyLoading = false;
              this.formTable.id = response.data.id;
              if (!response.data.operateTime === true) {
                this.isShow = true;
              }
            });
        }
      });
    },

    installObj () {
      let actualServicePrice = []
      for (var i = 0; i < this.listitem.length; i++) {
        let actualObj = {}
        actualObj.actualServicePrice = this.listitem[i].actualServicePrice;
        actualObj.actualTotalPrice = this.listitem[i].actualTotalPrice;
        actualObj.id = this.listitem[i].id;
        actualServicePrice.push(actualObj)
        let reg = /^\d+(\.\d{2})?$/
        let reg2 = /.*\..*/
        if (reg.test(this.listitem[i].actualServicePrice) === false || reg2.test(this.listitem[i].actualServicePrice) === false) {
          this.$message({
            message: "提交失败,设置实际单价格式错误！",
            type: 'error',
            duration: 2000
          });
          return false;
        }
        if (reg.test(this.listitem[i].actualTotalPrice) === false || reg2.test(this.listitem[i].actualTotalPrice) === false) {
          this.$message({
            message: "提交失败,设置实际总价（不含税）格式错误！",
            type: 'error',
            duration: 2000
          });
          return false;
        }
      }
      // console.log(this.formTable)
      let param = {
        serviceDetailList: actualServicePrice,
        remark: this.formTable.remark,
        id: this.formTable.id,
      }

      const set = this.$refs;
      // console.log(param)
      // set[formTable].validate(valid => {
      //   if (valid) {
      this.$confirm('确定要保存吗？', '操作确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        installObj(param).then(res => {
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
    //删除
    delMethod (row) {
      this.$confirm('确定要删除？', '删除确认', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
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
        })
      }).catch(() => { })
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


    cancel (formName) {
      this.dialogFormVisible = false;
      this.dialogFormVisiblePre = false;
      this.resetTemp()
    },

    resetTemp () {
      this.form = {
        payableTotal: ''
      };
    }
  }
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
  line-height: 1;
  margin-bottom: 0;
}
.tablecontent {
  // background-color: #eef1f6;
  // border: #dfe6ec 1px solid;
  margin-bottom: 20px;
  padding: 5px;
}
.itemwidth {
  width: 45%;
  display: block;
  float: left;
  margin-bottom: 5px;
}
.contenttip {
  background-color: #ffffe9;
  border: #dfe6ec 1px solid;
  color: red;
  font-size: 12px;
  padding: 10px;
  line-height: 20px;
}
.redtext {
  color: red;
  font-weight: bold;
}
</style>



