<template>
  <div class="app-container calendar-list-container"
       id="app-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="19">
        <div class="app-container-left">
          <div class="filter-container">
            <el-select placeholder="请选择客户名称"
                       v-model="query.ebusinessQstcode"
                       clearable
                       style="width: 200px"
                       popper-class="optionsContent"
                       filterable>
              <el-option v-for="item in selectCustom"
                         :key="item.value"
                         :lable="item.label"
                         :value="item.label"></el-option>
            </el-select>
            <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="请输入订单号或销售订单号"
                      v-model="query.orderno"> </el-input>
            <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="请输入物流单号"
                      v-model="query.logisticsNo"> </el-input>
            <el-select placeholder="请选择关区"
                       v-model="query.districtName"
                       clearable
                       style="width: 147px"
                       filterable
                       popper-class="optionsContent">
              <el-option v-for="item in selectDis"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
            <el-date-picker type="datetimerange"
                            placeholder="请选择入库时间段"
                            style="width: 330px;"
                            class="filter-item"
                            @keyup.enter.native="handleFilter"
                            range-separator=" ~ "
                            popper-class="timeSelect"
                            v-model="query.createTime">
            </el-date-picker>
            <!-- <el-select placeholder="请选择订单状态"
                       v-model="query.orderStatus"
                       clearable
                       style="width: 147px"
                       filterable>
              <el-option v-for="item in selectStatus"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select> -->
            <el-select placeholder="请选择订单状态"
                       v-model="query.stepStatus"
                       clearable
                       style="width: 147px"
                       filterable
                       popper-class="optionsContent">
              <el-option v-for="item in selectStepStatus"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
            <el-button class="filter-item"
                       type="primary"
                       v-waves
                       icon="search"
                       @click="handleFilter">查询</el-button>
            <el-button class="filter-item"
                       v-if="sellBsorderHeadManager_btn_add"
                       style="margin-left: 10px;"
                       @click="handleCreate"
                       type="primary"
                       icon="edit">添加</el-button>
            <el-button class="filter-item"
                       type="primary"
                       style="margin-left:0"
                       @click="exportTable" :loading="loading.exportLoading">导出当前数据</el-button>
          </div>

          <el-table :data="list"
                    v-loading="loading.tableLoading"
                    element-loading-text="正在加载中......"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%"
                    @row-click="detailName"
                    :height="elTableMediaHeight"
                    @selection-change="changeVal"
                    @expand="tableClick">
            <el-table-column align="center"
                             type="expand">
              <template scope="scope">
                <el-table border
                          style="width: 100%"
                          :data="scope.row.children"
                          v-loading="loading.tableLoading"
                          element-loading-text="正在加载中......"
                          id="tableCenter">
                  <el-table-column label="序号"
                                   width="70"
                                   align="center"
                                   type="index">
                  </el-table-column>
                  <el-table-column label="商品货号"
                                   width="210"
                                   align="center"
                                   show-overflow-tooltip
                                   prop="goodsSku">
                  </el-table-column>
                  <el-table-column label="商品条码"
                                   width="162"
                                   align="center"
                                   prop="goodsBarCode"
                                   show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="商品名称"
                                   width="400"
                                   align="center"
                                   show-overflow-tooltip
                                   prop="goodsName">
                  </el-table-column>

                  <el-table-column label="单价"
                                   width="140"
                                   align="center"
                                   prop="goodsPrice"
                                   show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="数量"
                                   width="100"
                                   align="center"
                                   prop="goodsQuantity"
                                   show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="总价"
                                   width="100"
                                   align="center"
                                   show-overflow-tooltip>
                    <template scope="scope">
                      <span>{{scope.row.goodsQuantity * scope.row.goodsPrice}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column width="200px"
                             align="center"
                             label="客户名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.ebusinessName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="280px"
                             align="center"
                             label="订单号"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer; color:#20A0FF;display: inline-block;height: 38px;line-height: 38px"
                      @click="oederProcess(scope.row)">{{scope.row.orderno}}</span>
                <!-- <span style="cursor: pointer; " >{{scope.row.orderno}}</span> -->
              </template>
            </el-table-column>
            <el-table-column min-width="130"
                             align="center"
                             label="订单状态"
                             show-overflow-tooltip>
              <template scope="scope">
                <span v-if="scope.row.orderStatus === 0"
                      style="cursor: pointer;"> 订单正常</span>
                <span v-if="scope.row.orderStatus === 1"
                      style="cursor: pointer;"> 订单正常</span>
                <span v-if="scope.row.orderStatus === -1"
                      style="cursor: pointer;"> 订单异常</span>
                <span v-if="scope.row.orderStatus === 2"
                      style="cursor: pointer;"> 订单取消</span>
                <span v-if="scope.row.orderStatus === 3"
                      style="cursor: pointer;"> 订单退货</span>
                <span v-if="scope.row.orderStatus === 4"
                      style="cursor: pointer;"> 海关退单</span>
              </template>
            </el-table-column>
            <el-table-column width="120px"
                             align="center"
                             label="关区"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.districtName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="200px"
                             align="center"
                             label="电商平台"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.platformName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="280px"
                             align="center"
                             label="销售订单号"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer; color:#20A0FF;display: inline-block;height: 38px;line-height: 38px">{{scope.row.originOrderNo}}</span>
                <!-- <span style="cursor: pointer; " >{{scope.row.orderno}}</span> -->
              </template>
            </el-table-column>
            <el-table-column min-width="200"
                             align="center"
                             label="物流单号"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;color:#20A0FF;display: inline-block;height: 38px;line-height: 38px"
                      @click="loginPage(scope.row)">{{scope.row.logisticsNo}}</span>
              </template>
            </el-table-column>
             <el-table-column min-width="120"
                             align="center"
                             label="店铺ID"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.shopId}}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="180"
                             align="center"
                             label="支付时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.payTime}}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="180"
                             align="center"
                             label="订单接收时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.gmtCreateTime}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="180"
                             align="center"
                             label="开始清关时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.declarationTime}}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="180"
                             align="center"
                             label="清关结束时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.declarationEndTime}}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="180"
                             align="center"
                             label="推送仓库时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.warehouseTime}}</span>
              </template>
            </el-table-column>

            <!-- <el-table-column min-width="180"
                             align="center"
                             label="入库时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.createTime}}</span>
              </template>
            </el-table-column> -->

            <el-table-column min-width="180"
                             align="center"
                             label="生成拣货任务时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.pickingTime}}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="180"
                             align="center"
                             label="拣货完成时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.pickedTime}}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="180"
                             align="center"
                             label="打包完成时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.packTime}}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="130"
                             align="center"
                             label="出库时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.outTime}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="130"
                             align="center"
                             label="回传客户时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.sendCustomerTime}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="130"
                             align="center"
                             label="订单取消时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.cancelTime}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="130"
                             align="center"
                             label="非现金抵扣"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.noCashDeduction}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="100"
                             align="center"
                             label="关税"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.tariff}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="130"
                             align="center"
                             label="消费税"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.saleTax}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="130"
                             align="center"
                             label="增值税"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.valueAddedTax}}</span>
              </template>
            </el-table-column>
            <el-table-column width="200px"
                             align="center"
                             label="状态描述"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer; ">{{scope.row.orderDescription}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             width="100"
                             align="center"
                             fixed="right">
              <template scope="scope">
                <el-button class="btnSize"
                           type="primary"
                           v-if="scope.row.orderStatus === 0 || scope.row.orderStatus === -1 || scope.row.orderStatus === 4"
                           @click="cancelOrder(scope.row)">取消</el-button>
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
        <el-dialog title="海关申报回执信息查询"
                   :visible.sync="dialogFormVisibleCustomer"
                   :before-close="closeDialogDetail"
                   :close-on-click-modal="false"
                   class="codeWidth">
          <order-process ref="processTable"></order-process>
        </el-dialog>
        <!-- 物流轨迹查询 -->
        <el-dialog title="物流轨迹查询"
                   :visible.sync="dialogFormVisibleLogistics"
                   :before-close="closeDialogLogistics"
                   :close-on-click-modal="false"
                   class="logisticsWidth">
          <div v-if="showLogistics">
            <div class="topImg">
              <img src="../../../../../assets/images/unLogistics.png"
                   alt="">
            </div>
            <p class="orderText">
              您查询的订单号
              <span>{{tableLogistics.tableLogisticsOrder}}</span> 暂无信息，请确认订单号是否正确</p>
          </div>
          <logistics-order ref="loginForm"
                           :loginsticsArr="loginsticsArr"
                           :tableLogistics="tableLogistics"
                           v-if="showLogisticsArr"> </logistics-order>
        </el-dialog>
        <!-- 导出 -->
        <el-dialog title="导出数据"
                   :visible.sync="dialogFormVisibleExport"
                   :before-close="closeDialogExport"
                   :close-on-click-modal="false"
                   class="receiptWidth450">
          <p>
            点击“生成表格”后，系统将在后台准备订单导出文件，稍后请到左侧“订单 导出结果”页面查看或获取。
          </p>
          <span slot="footer"
                class="dialog-footer">
           <router-link to="/index/orderSys/OrderExport"> <el-button type="primary">生成列表并跳转至导出结果页面</el-button></router-link>
            <el-button type="primary"
                       @click="exportData">仅生成表格</el-button>
          </span>
        </el-dialog>
      </el-col>
      <el-col :span="5">
        <div class="app-container-right"
             ref="lineHeight">
          <!-- v-on:childMethod="getList"   在子组件里面调用父组件的getList方法 childMethod是子组件里面参数名 -->
          <update-element ref="update"
                          v-if="showUpdata"
                          :orderNum="orderNum"
                          :orderQuery="orderQuery"
                          :abnoumalityNum="abnoumalityNum"
                          :cancellationNum="cancellationNum"
                          :returnNum="returnNum"
                          :allNum="allNum"></update-element>
          <order-step ref="orderStep"
                      v-if="showOrder"
                      :stepData="stepData"></order-step>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  page,
  detailObj,
  stepObj,
  orderStatistics,
  selectObj,
  selectDis,
  cancelObj,
  receiveObj,
  // orderReset,
  orderDetele,
  // allResetObj,
  // orderCompelete
  loginsticsOrder,
  exportOrder
} from "api/orderSys/xsOrder/bondedOrder/bondedNormal/index";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  name: "sellBsorderHead",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/update.vue"),
    "order-step": () => import("./components/orderStep.vue"),
    "order-process": () => import("./components/orderProcess.vue"),
    "logistics-order": () => import("./components/logisticsOrder")
  },
  data () {
    return {
      selectCustom: [],
      selectDis: [],
      selectStatus: [
        {
          value: '[0,1]',
          label: '正常'
        },
        {
          value: 2,
          label: '取消'

        },
        {
          value: 3,
          label: '退货'
        },
      ],
      selectStepStatus:[
        {
          value:'100',
          label:'订单接收'
        },
        {
          value:'200',
          label:'申报中'
        },
        {
          value:'300',
          label:'申报完成'
        },
        {
          value:'400',
          label:'仓库作业'
        },
        {
          value:'500',
          label:'出库'
        },
        {
          value:'600',
          label:'回传客户'
        },
        {
          value:'2',
          label:'订单取消'
        },
        {
          value:'3',
          label:'订单退货'
        },
      ],
      showUpdata: true,
      showOrder: false,
      stepData: {
        createStatus: undefined,
        declarationStatus: undefined,
        sendDeclarationStatus: undefined,
        sendWarehouseStatus: undefined,
        stockOutStatus: undefined,
        sendCustomerStatus: undefined,
        createTime: undefined,
        declarationTime: undefined,
        sendDeclarationTime: undefined,
        stockOutTime: undefined,
        sendCustomerTime: undefined,
        sendWarehouseTime: undefined
      },
      // 订单数据
      total: 0,
      allNum: {
        orderPerday: 0,
        orderTotal: 0,
        taxTotal: 0,
        valueTotal: 0
      },
      orderNum: {
        orderPerday: 0,
        orderTotal: 0,
        taxTotal: 0,
        valueTotal: 0
      },
      abnoumalityNum: {
        orderPerday: 0,
        orderTotal: 0,
        taxTotal: 0,
        valueTotal: 0
      },
      cancellationNum: {
        orderPerday: 0,
        orderTotal: 0,
        taxTotal: 0,
        valueTotal: 0
      },
      returnNum: {
        orderPerday: 0,
        orderTotal: 0,
        taxTotal: 0,
        valueTotal: 0
      },
      list: [],
      tableContent: [],
      // total: null,
      loading: {
        tableLoading: false,
        exportLoading:false
      },
      query: {
        orderno: "",
        createTime: '',
        logisticsNo: "",
        orderStatus: '',
        ebusinessQstcode: '',
        districtName:'',
        stepStatus:''
      },
      orderQuery: {
        orderStatus: ''
      },
      listQuery: {
        page: 1,
        limit: 10,
        orderBy: 'createTimedesc',
        _type_: 'equal'
      },
      status: 1,
      listPage: {
        page: 1,
        limit: 1,
        orderBy: 'createTimedesc',
         _type_: 'equal'
      },
      sellBsorderHeadManager_btn_edit: false,
      sellBsorderHeadManager_btn_del: false,
      sellBsorderHeadManager_btn_add: false,
      dialogFormVisibleCustomer: false,
      dialogFormVisibleExport: false,
      dialogFormVisibleLogistics: false,
      tableKey: 0,
      // 批量选择
      one_page_slect: [],
      all_page_select: [],
      loginsticsArr: {
        collectTime: "",
        companyType: "",
        endTime: " ",
        id: "",
        logisticsNo: "",
        startTime: "",
        status: "",
        traceLines: [],
        updateTime: ""
      },

      tableLogistics: {
        tableLogisticsOrder: ''
      },
      showLogisticsArr: false,
      showLogistics: false,
      tableMsg: ''
    };
  },
  created () {
    if (window.sessionStorage.getItem('tid')) {
      this.query.orderno = window.sessionStorage.getItem('tid')
      window.sessionStorage.removeItem('tid')
      this.getList();
    }
    this.getList();
    this.allOrderTotal()
    this.customerName()
    this.districtCode()

    this.sellBsorderHeadManager_btn_edit = this.elements[
      "sellBsorderHeadManager:btn_edit"
    ];
    this.sellBsorderHeadManager_btn_del = this.elements[
      "sellBsorderHeadManager:btn_del"
    ];
    this.sellBsorderHeadManager_btn_add = this.elements[
      "sellBsorderHeadManager:btn_add"
    ];
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"]),
    allSelect: function () {
      return this.all_page_select.concat(this.one_page_slect)
    },
  },
  methods: {
    getList () {
      this.loading.tableLoading = true;
      let param = {
        orderno: $.trim(this.query.orderno),
        logisticsNo: $.trim(this.query.logisticsNo),
        ebusinessQstcode: this.query.ebusinessQstcode.substring(this.query.ebusinessQstcode.indexOf("(") + 1, this.query.ebusinessQstcode.indexOf(")")),
        createTime: this.query.createTime,
        orderStatus: this.query.orderStatus,
        districtCode: this.query.districtName,
        stepStatus:this.query.stepStatus,
        // total: this.total,
        ...this.listQuery
      };
      if (param.createTime !== '') {
        var start = param.createTime[0] === null ? null : dateUtils.format(param.createTime[0], "YYYY-MM-DD HH:mm:ss")
        var end = param.createTime[1] === null ? null : dateUtils.format(param.createTime[1], "YYYY-MM-DD HH:mm:ss")
        param.createTime = `${start} ~ ${end}`
      }
      if (param.createTime == 'null ~ null') {
        param.createTime = ''
      }
      // console.log(this.query.districtName)
      page(param).then(response => {
        this.loading.tableLoading = false;
        this.list = response.data.rows;
        // console.log(response.data.rows)
        this.total = response.data.total;
      });
    },
    changeVal (val) {
      this.one_page_slect = val    },
    // 查看详情
    detailName (row) {
      if (row.orderStatus !== -1 && row.orderStatus !== 2 && row.orderStatus !== 3) {
        this.showOrder = true;
        this.showUpdata = false;
      } else {
        this.showOrder = false;
        this.showUpdata = true;
      }
      stepObj(row.orderUuid).then(response => {
        // console.log(row)
        this.$copyJsonProperty(this.stepData, response.data);
        //  console.log(response.data);
        if (this.stepData.createStatus === 0) {
          this.stepData.createTime = "";
        }
        if (this.stepData.declarationStatus === 0) {
          this.stepData.declarationTime = "";
        }
        if (this.stepData.sendDeclarationStatus === 0) {
          this.stepData.sendDeclarationTime = "";
        }
        if (this.stepData.sendWarehouseStatus === 0) {
          this.stepData.sendWarehouseTime = "";
        }
        if (this.stepData.stockOutStatus === 0) {
          this.stepData.stockOutTime = "";
        }
        if (this.stepData.sendCustomerStatus === 0) {
          this.stepData.sendCustomerTime = "";
        }
      });
    },
    handleFilter () {
      this.orderQuery.orderStatus = this.query.orderStatus
      this.getList();
      if (this.query.orderStatus === '') {
        this.allOrderTotal()
      } else if (this.query.orderStatus === '[0,1]') {
        this.orderTotal()
      } else if (this.query.orderStatus === -1) {
        this.abnoumalityOrder()      }
      else if (this.query.orderStatus === 2) {
        this.cancellationOrder()      }
      else if (this.query.orderStatus === 3) {
        this.returnOrder()      }
    },
    handleSizeChange (val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange (val) {
      this.listQuery.page = val;
      this.getList();
    },
    // 商品明细 _type_: 'equal'精准查询，查询速度快
    tableClick (row, expanded) {
      if (expanded === true) {
        this.loading.tableLoading = true;
        let param = {
          orderUuid: row.orderUuid,
          limit: 100,
          page: 1,
          _type_: "equal"
        };
        detailObj(param).then(response => {
          this.loading.tableLoading = false;
          row.children = response.data.rows;
        });
      } else {
      }
    },
    // 仅生成表格
    exportData () {
      this.dialogFormVisibleExport = false
       this.$notify({
          title: '成功',
          message: this.tableMsg,
          type: 'success',
          duration: 2000
        });
    },
    // 导出当前数据
    exportTable () {
      let param = {
        orderno: $.trim(this.query.orderno),
        logisticsNo: $.trim(this.query.logisticsNo),
        ebusinessQstcode: this.query.ebusinessQstcode.substring(this.query.ebusinessQstcode.indexOf("(") + 1, this.query.ebusinessQstcode.indexOf(")")),
        createTime: this.query.createTime,
        orderStatus: this.query.orderStatus,
        districtCode: this.query.districtName,
        stepStatus:this.query.stepStatus,
        // total: this.total,
        ...this.listQuery
      };
      if (param.createTime !== '') {
        var start = param.createTime[0] === null ? null : dateUtils.format(param.createTime[0], "YYYY-MM-DD HH:mm:ss")
        var end = param.createTime[1] === null ? null : dateUtils.format(param.createTime[1], "YYYY-MM-DD HH:mm:ss")
        param.createTime = `${start} ~ ${end}`
      }
      if (param.createTime == 'null ~ null') {
        param.createTime = ''
      }
       this.loading.exportLoading = true
      exportOrder(param).then(res => {
         this.loading.exportLoading = false
        if (res.status == 200) {
          // this.$confirm("点击“生成表格”后，系统将在后台准备订单导出文件，稍后请到左侧“订单导出结果”页面查看或获取。", '导出数据', {
          //   confirmButtonText: '仅生成表格',
          //   cancelButtonText: '生成列表并跳转至导出结果页面',
          // }).then(() => {
          //   console.log('111')
          // }).catch(() => {
          //   this.$router.push('/index/baseDataSys/goodsRelation')
          // })
          this.dialogFormVisibleExport = true
           this.tableMsg = res.message
        }
        if (res.status !== 200) {
          this.$alert(res.message, '导出数据', {
            confirmButtonText: '确定',
          })
        }
      })
    },
    // 所有订单 
    allOrderTotal () {
      let param = {
        status: 0,
        createTime: this.query.createTime,
        customerCode: this.query.ebusinessQstcode.substring(this.query.ebusinessQstcode.indexOf("(") + 1, this.query.ebusinessQstcode.indexOf(")")),
        ...this.listPage
      };
      if (param.createTime !== '') {
        var start = param.createTime[0] === null ? null : dateUtils.format(param.createTime[0], "YYYY-MM-DD HH:mm:ss")
        var end = param.createTime[1] === null ? null : dateUtils.format(param.createTime[1], "YYYY-MM-DD HH:mm:ss")
        param.createTime = `${start} ~ ${end}`
      }
      if (param.createTime == 'null ~ null') {
        param.createTime = ''
      }
      orderStatistics(param).then(response => {
        // this.$copyJsonProperty(this.allNum, response.data.rows[0])
        this.$copyJsonProperty(this.allNum, response[0])
        // console.log(response.data.rows)
        // if (response.data.rows.length === 0) {
        //   this.allNum.orderPerday = 0
        // }
        if (response[0].length === 0) {
          this.allNum.orderPerday = 0
        }
      });
    },
    // 正常订单统计
    orderTotal () {
      let param = {
        status: 1,
        customerCode: this.query.ebusinessQstcode.substring(this.query.ebusinessQstcode.indexOf("(") + 1, this.query.ebusinessQstcode.indexOf(")")),
        createTime: this.query.createTime,
        ...this.listPage
      };
      if (param.createTime !== '') {
        var start = param.createTime[0] === null ? null : dateUtils.format(param.createTime[0], "YYYY-MM-DD HH:mm:ss")
        var end = param.createTime[1] === null ? null : dateUtils.format(param.createTime[1], "YYYY-MM-DD HH:mm:ss")
        param.createTime = `${start} ~ ${end}`
      }
      if (param.createTime == 'null ~ null') {
        param.createTime = ''
      }
      orderStatistics(param).then(response => {
        // this.$copyJsonProperty(this.orderNum, response.data.rows[0])
        this.$copyJsonProperty(this.orderNum, response[0])
        // console.log(response.data.rows) 
        if (response[0].length === 0) {
          this.orderNum.orderPerday = 0
        }
      });
    },
    // 异常订单统计
    abnoumalityOrder () {
      let param = {
        status: 2,
        customerCode: this.query.ebusinessQstcode.substring(this.query.ebusinessQstcode.indexOf("(") + 1, this.query.ebusinessQstcode.indexOf(")")),
        createTime: this.query.createTime,
        ...this.listPage
      };
      if (param.createTime !== '') {
        var start = param.createTime[0] === null ? null : dateUtils.format(param.createTime[0], "YYYY-MM-DD HH:mm:ss")
        var end = param.createTime[1] === null ? null : dateUtils.format(param.createTime[1], "YYYY-MM-DD HH:mm:ss")
        param.createTime = `${start} ~ ${end}`
      }
      if (param.createTime == 'null ~ null') {
        param.createTime = ''
      }
      orderStatistics(param).then(response => {
        // this.$copyJsonProperty(this.abnoumalityNum, response.data.rows[0])
        this.$copyJsonProperty(this.abnoumalityNum, response[0])
        if (response[0].length === 0) {
          this.abnoumalityNum.orderPerday = 0
        }
      });
    },
    // 取消订单统计
    cancellationOrder () {
      let param = {
        status: 3,
        customerCode: this.query.ebusinessQstcode.substring(this.query.ebusinessQstcode.indexOf("(") + 1, this.query.ebusinessQstcode.indexOf(")")),
        createTime: this.query.createTime,
        ...this.listPage
      };
      if (param.createTime !== '') {
        var start = param.createTime[0] === null ? null : dateUtils.format(param.createTime[0], "YYYY-MM-DD HH:mm:ss")
        var end = param.createTime[1] === null ? null : dateUtils.format(param.createTime[1], "YYYY-MM-DD HH:mm:ss")
        param.createTime = `${start} ~ ${end}`
      }
      if (param.createTime == 'null ~ null') {
        param.createTime = ''
      }
      orderStatistics(param).then(response => {
        this.$copyJsonProperty(this.cancellationNum, response[0])
        if (response[0].length === 0) {
          this.cancellationNum.orderPerday = 0
        }
      });
    },
    // 退货订单统计
    returnOrder () {
      let param = {
        status: 4,
        customerCode: this.query.ebusinessQstcode.substring(this.query.ebusinessQstcode.indexOf("(") + 1, this.query.ebusinessQstcode.indexOf(")")),
        createTime: this.query.createTime,
        ...this.listPage
      };
      if (param.createTime !== '') {
        var start = param.createTime[0] === null ? null : dateUtils.format(param.createTime[0], "YYYY-MM-DD HH:mm:ss")
        var end = param.createTime[1] === null ? null : dateUtils.format(param.createTime[1], "YYYY-MM-DD HH:mm:ss")
        param.createTime = `${start} ~ ${end}`
      }
      if (param.createTime == 'null ~ null') {
        param.createTime = ''
      }
      orderStatistics(param).then(response => {
        this.$copyJsonProperty(this.returnNum, response[0])
        if (response[0].length === 0) {
          this.returnNum.orderPerday = 0
        }
      });
    },
    // 取消
    cancelOrder (row) {
      let param = {
        orderUuid: row.orderUuid,
        cancelReason: "前端页面取消"
      }
      this.$confirm("确定要取消该订单吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let param = {
          orderUuid: row.orderUuid,
          cancelReason: "前端页面取消"
        }
        cancelObj(param).then(res => {
          if (res.rel) {
            this.$message({
              type: "success",
              message: "订单取消成功!",
              type: 'success'
            });
            this.getList()
          } else {
            this.$message({
              type: "异常",
              message: res.message,
              type: 'error'
            });
          }
        })
      }).catch(() => { })
    },
    // 客户下拉选择
    customerName () {
      selectObj().then(response => {
        // this.selectCustom = response.data;
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = '(' + response.data[i].value + ')' + ' ' + response.data[i].key
          cutObj.value = response.data[i].value
          this.selectCustom.push(cutObj)
        }
        // console.log(this.selectCustom)
      });
    },
    // 关区代码下拉选择
    districtCode () {
      selectDis().then(response => {
        // this.selectCustom = response.data;
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = '(' + response.data[i].value + ')' + ' ' + response.data[i].key
          cutObj.value = response.data[i].value
          this.selectDis.push(cutObj)
        }
        // console.log(this.selectCustom)
      });
    },
    closeDialogDetail () {
      this.dialogFormVisibleCustomer = false
    },
    closeDialogExport () {
      this.dialogFormVisibleExport = false
    },
    closeDialogLogistics () {
      this.dialogFormVisibleLogistics = false
    },
    // 订单流程
    oederProcess (row) {
      this.dialogFormVisibleCustomer = true
      let param = { orderNo: row.orderno }
      receiveObj(param).then(response => {
        this.$nextTick(() => {
          if (response.rel === true) {
            this.$refs.processTable.orderList = response.data
          } else {
            this.$refs.processTable.orderList = []
            this.$message({
              message: response.message,
              type: 'warning',
              duration: 2000
            });
          }

        })
      })
    },
    loginPage (row) {
      this.tableLogistics.tableLogisticsOrder = row.logisticsNo
      let param = {
        logisticsNo: row.logisticsNo,
        _type_: "equal"
      }
      loginsticsOrder(param).then(response => {
        this.dialogFormVisibleLogistics = true
        if (response.data.rows.length === 0) {
          this.showLogistics = true
          this.showLogisticsArr = false
          this.$nextTick(() => {
            this.loginsticsArr = {}
          })
        } else {
          this.showLogisticsArr = true
          this.showLogistics = false
          this.$nextTick(() => {
            if (response.data.rows[0].traceLines.length === 1) {
              this.$refs.loginForm.formEdit = false
            }
            this.loginsticsArr = response.data.rows[0]
            this.loginsticsArr.traceLines = response.data.rows[0].traceLines.reverse()
          })
        }

      })
    },
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
// 右侧背景颜色
.lineHeight {
  height: 20px;
}
.btnSize {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  color: #fff;
  margin: 0;
  padding: 7px 7px;
  border-radius: 4px;
  margin-right: 3px;
  text-align: center;
  margin-left: 4px;
  // float: left;
}
.topImg {
  width: 80px;
  margin: 0 auto;
}
.orderText {
  margin-top: 50px;
  text-align: center;
  font-size: 16px;
  color: #666;
  padding-bottom: 30px;
  span {
    font-weight: 700;
  }
}
</style>



