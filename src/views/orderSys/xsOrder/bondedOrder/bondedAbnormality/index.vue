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
                       filterable
                        popper-class="optionsContent">
              <el-option v-for="item in selectCustom"
                         :key="item.value"
                         :lable="item.label"
                         :value="item.label"></el-option>
            </el-select>
            <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="请输入订单号"
                      v-model="query.orderno"> </el-input>
            <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="请输入物流单号"
                      v-model="query.logisticsNo"> </el-input>
            <el-date-picker type="daterange"
                            placeholder="请选择入库时间段"
                            style="width: 210px;"
                            class="filter-item"
                            @keyup.enter.native="handleFilter"
                            range-separator=" ~ "
                            popper-class="timeSelect"
                            v-model="query.createTime">
            </el-date-picker>
            <el-button class="filter-item"
                       type="primary"
                       v-waves
                       icon="search"
                       @click="handleFilter">查询</el-button>
            <el-badge :value="one_page_slect.length">
              <el-button class="filter-item"
                         type="primary"
                         @click="allReset"
                         style="margin-left: 14px">批量重置</el-button>
            </el-badge>
            <el-button class="filter-item"
                       v-if="sellBsorderHeadManager_btn_add"
                       style="margin-left: 10px;"
                       @click="handleCreate"
                       type="primary"
                       icon="edit">添加</el-button>
          </div>
          <el-table :data="list"
                    v-loading="loading.tableLoading"
                    element-loading-text="正在加载中......"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%"
                    :height="elTableMediaHeight"
                    @row-click="detailName"
                    @selection-change="changeVal"
                    @expand="tableClick">
            <el-table-column type="selection"
                             align="center"
                             width='55'>
            </el-table-column>
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
                                   width="180"
                                   align="center"
                                   show-overflow-tooltip
                                   prop="goodsSku">
                  </el-table-column>
                  <el-table-column label="商品条码"
                                   width="178"
                                   align="center"
                                   prop="goodsBarCode"
                                   show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column label="商品名称"
                                   width="380"
                                   align="center"
                                   show-overflow-tooltip
                                   prop="goodsName">
                  </el-table-column>
                  <el-table-column label="单价"
                                   width="100"
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
                <!-- <span style="cursor: pointer;">{{scope.row.orderno}}</span> -->
                <span style="cursor: pointer; color:#20A0FF;display: inline-block;height: 38px;line-height: 38px"
                      @click="oederProcess(scope.row)">{{scope.row.orderno}}</span>
              </template>
            </el-table-column>
            <el-table-column width="200px"
                             align="center"
                             label="异常原因"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer; color:#20A0FF"
                      @click="abnormalReason(scope.row)">{{scope.row.ext3}}</span>
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
            <el-table-column min-width="180"
                             align="center"
                             label="入库时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="130"
                             align="center"
                             label="订单总费用"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.orderTotalFee}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="130"
                             align="center"
                             label="订单总货值"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.orderTotalValue}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="130"
                             align="center"
                             label="订单总税费"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.orderTotalTax}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column width="200px" align="center" label="运费">
      <template scope="scope">
        <span>{{scope.row.shippingFee}}</span>
      </template> -->
            <!-- </el-table-column> -->
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
            <!-- <el-table-column min-width="130"
                             align="center"
                             label="订单状态"
                             show-overflow-tooltip>
              <template scope="scope">
                <span v-if="scope.row.orderStatus < 0"
                      style="cursor: pointer;"> 订单异常</span>

              </template>
            </el-table-column> -->

            <el-table-column fixed="right"
                             align="center"
                             label="操作"
                             width="200">
              <template scope="scope">
                <el-button v-if="sellBsorderHeadManager_btn_del"
                           size="small"
                           type="success"
                           @click="reset(scope.row)"> 重试
                </el-button>
                <!-- <el-button v-if="sellBsorderHeadManager_btn_del"
                           size="small"
                           type="danger"
                           @click="cancel(scope.$index, scope.row)"> 作废
                </el-button> -->
                <el-button v-if="sellBsorderHeadManager_btn_del"
                           size="small"
                           type="primary"
                           @click="compelete(scope.$index, scope.row)"> 标记为处理完成
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
      </el-col>
      <!-- 右边 -->
      <!-- <el-col :span="1">
              <div class="border">
              </div>
          </el-col> -->
      <el-col :span="5">
        <div class="app-container-right"
             ref="lineHeight">
          <!-- v-on:childMethod="getList"   在子组件里面调用父组件的getList方法 childMethod是子组件里面参数名 -->
          <update-element ref="update"
                          v-if="showUpdata"
                          :orderNum="orderNum"></update-element>
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
  orderReset,
  selectObj,
  orderDetele,
  allResetObj,
  orderCompelete,
  receiveObj,
  loginsticsOrder
} from "api/orderSys/xsOrder/bondedOrder/bondedAbnormality/index";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  name: "sellBsorderHead",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/update.vue"),
    'order-process': () => import('./components/orderProcess.vue'),
    "order-step": () => import("./components/orderStep.vue"),
    "logistics-order": () => import("./components/logisticsOrder")
  },
  data () {
    return {
      // getRowKeys(row) {
      //     return row.orderUuid;
      // },
      selectCustom: [],
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
        sendCustomerTime: undefined
      },
      // 订单数据
      total: 0,
      orderNum: {
        orderPerday: 0,
        orderTotal: 0,
        taxTotal: 0,
        valueTotal: 0
      },
      list: [],
      tableContent: [],
      // total: null,
      loading: {
        tableLoading: false
      },
      query: {
        orderno: "",
        logisticsNo: "",
        orderStatus: -1,
        createTime: "",
        ebusinessQstcode: ''
      },
      listQuery: {
        page: 1,
        limit: 10,
        name: undefined,
        orderBy: 'createTimedesc',
         _type_: 'equal'
      },
      status: 2,
      listPage: {
        page: 1,
        limit: 1,
        orderBy: 'createTimedesc',
         _type_: 'equal'
      },
      sellBsorderHeadManager_btn_edit: false,
      sellBsorderHeadManager_btn_del: true,
      sellBsorderHeadManager_btn_add: false,
      dialogFormVisibleCustomer: false,
      tableKey: 0,
      // 批量选择
      one_page_slect: [],
      all_page_select: [],
      dialogFormVisibleLogistics: false,
      tableLogistics: {
        tableLogisticsOrder: ''
      },
      showLogisticsArr: false,
      showLogistics: false,
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
    };
  },

  created () {
    this.getList();
    this.orderTotal();
    this.customerName()
    this.sellBsorderHeadManager_btn_edit = this.elements[
      "sellBsorderHeadManager:btn_edit"
    ];
    // this.sellBsorderHeadManager_btn_del = this.elements['sellBsorderHeadManager:btn_del'];
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
    // 批量重置
    changeVal (val) {
      this.one_page_slect = val     
    },
    allReset () {
      let allData = [].concat(JSON.parse(JSON.stringify(this.one_page_slect)))
      if (this.one_page_slect.length === 0) {
        this.$message({
          message: '请选择需要重置的订单',
          type: 'warning'
        });
        return
      }
      this.$confirm('确认要重置所选择的数据吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = []
        allData.forEach((item, index) => {
          let id = {}
          id.orderUuid = item.orderUuid
          id.orderStatus = 0
          id.orderDescription = '正常'
          ids.push(id)
        })
        let params = { sellBsorderHeadList: ids } // 删除
        this.loading.tableLoading = true
        allResetObj(params).then(res => {
          this.loading.tableLoading = false
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "重置成功",
              type: "success",
              duration: 2000
            })
            this.one_page_slect = []
            this.all_page_select = []
            this.getList() // 重新加载table数据
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
            this.one_page_slect = []
          }
        })
      }).catch(() => { })
    },
    allDelete () {
      let allData = [].concat(JSON.parse(JSON.stringify(this.one_page_slect)))
      if (this.one_page_slect.length === 0) {
        this.$message({
          message: '请选择需要作废的订单',
          type: 'warning'
        });
        return
      }
      this.$confirm('确认要作废所选择的数据吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = []
        allData.forEach((item, index) => {
          let id = {}
          id.orderUuid = item.orderUuid
          id.orderStatus = 99
          id.orderDescription = '已作废'
          ids.push(id)
        })
        let params = { sellBsorderHeadList: ids } // 删除
        this.loading.tableLoading = true
        allResetObj(params).then(res => {
          this.loading.tableLoading = false
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "保存成功",
              type: "success",
              duration: 2000
            })
            this.one_page_slect = []
            this.all_page_select = []
            this.getList() // 重新加载table数据
          } else {
            this.$notify({
              title: "失败",
              message: "系统异常",
              type: "error",
              duration: 2000
            });
          }
        })
      }).catch(() => { })
    },
    // 查看详情
    detailName (row) {
      this.showOrder = true
      this.showUpdata = false
      stepObj(row.orderUuid).then(response => {
        // console.log(row)
        this.$copyJsonProperty(this.stepData, response.data);
        //  console.log(response.data)
        if (this.stepData.createStatus === 0) {
          this.stepData.createTime = ''
        }
        if (this.stepData.declarationStatus === 0) {
          this.stepData.declarationTime = ''
        }
        if (this.stepData.sendDeclarationStatus === 0) {
          this.stepData.sendDeclarationTime = ''
        }
        if (this.stepData.sendWarehouseStatus === 0) {
          this.stepData.sendWarehouseTime = ''
        }
        if (this.stepData.stockOutStatus === 0) {
          this.stepData.stockOutTime = ''
        }
        if (this.stepData.sendCustomerStatus === 0) {
          this.stepData.sendCustomerTime = ''
        }
      })
    },
    getList () {
      this.loading.tableLoading = true;
      let param = {
        logisticsNo: $.trim(this.query.logisticsNo),
        orderno: $.trim(this.query.orderno),
        ebusinessQstcode: this.query.ebusinessQstcode.substring(this.query.ebusinessQstcode.indexOf("(") + 1, this.query.ebusinessQstcode.indexOf(")")),
        createTime:this.query.createTime,
        orderStatus: this.query.orderStatus,
        // total: this.total,
        ...this.listQuery
      };
    if(param.createTime !== '') {
        var start = param.createTime[0] === null ? null : dateUtils.format(param.createTime[0], "YYYY-MM-DD")
        var end = param.createTime[1] === null ? null : dateUtils.format(param.createTime[1], "YYYY-MM-DD")
        param.createTime = `${start} ~ ${end}`
       }
      if(param.createTime == 'null ~ null') {
        param.createTime = ''
      }
      page(param).then(response => {
        this.loading.tableLoading = false;
        this.list = response.data.rows;
        // console.log(response.data.total)
        this.total = response.data.total;
      });
    },
    handleFilter () {
      this.getList();
      this.orderTotal()
    },
    handleSizeChange (val) {
      this.listQuery.limit = val;
      //  this.all_page_select = this.all_page_select.concat(this.one_page_slect)

      this.getList();
    },
    handleCurrentChange (val) {
      this.listQuery.page = val;
      //  this.all_page_select = this.all_page_select.concat(this.one_page_slect)
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
      }
    },
    // 订单统计
    orderTotal () {
      let param = {
        status: 2,
        createTime:this.query.createTime,
        ...this.listPage
      };
       if(param.createTime !== '') {
        var start = param.createTime[0] === null ? null : dateUtils.format(param.createTime[0], "YYYY-MM-DD")
        var end = param.createTime[1] === null ? null : dateUtils.format(param.createTime[1], "YYYY-MM-DD")
        param.createTime = `${start} ~ ${end}`
       }
      if(param.createTime == 'null ~ null') {
        param.createTime = ''
      }
      orderStatistics(param).then(response => {
        // this.$copyJsonProperty(this.orderNum, response.data.rows[0])
        // if (response.data.rows.length === 0) {
        //   this.orderNum.orderPerday = 0
        // }
        this.$copyJsonProperty(this.orderNum, response[0])
        if (response[0].length === 0) {
          this.orderNum.orderPerday = 0
        }
      });
    },
    // 订单重置
    reset (row) {
      this.$confirm("系统将再次尝试处理该订单，确定要重试么？", "提示", {
        confirmButtonText: "重试",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let param = { orderUuid: row.orderUuid, orderStatus: 0 };
        orderReset(param).then(response => {
          if (response.rel === true) {
            this.$notify({
              title: "成功",
              message: "重置订单成功",
              type: "success",
              duration: 2000
            });
            this.getList();
          } else {
            this.$notify({
              title: "失败",
              message: response.message,
              type: "success",
              duration: 2000
            });
          }
          if (response.status !== 200) {
            this.$notify({
              title: "失败",
              message: response.message,
              type: "error",
              duration: 2000
            });
          }
        });
      });
    },
    // 订单作废
    cancel (index, row) {
      this.$confirm("确定要废除该订单吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let param = { orderUuid: row.orderUuid };
        orderDetele(param).then(response => {
          if (response.rel === true) {
            this.$notify({
              title: "成功",
              message: "废除成功",
              type: "success",
              duration: 2000
            });
            this.getList();
          } else {
            this.$notify({
              title: "失败",
              message: response.message,
              type: "success",
              duration: 2000
            });
          }

        });
      });
    },
    // 已完成的订单
    compelete (index, row) {
      this.$confirm("操作后系统将认为此订单已处理完成，请确认该订单已经处理完成的情况下再进行操作。", "提示", {
        confirmButtonText: "标记为处理完成",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let param = { orderUuid: row.orderUuid };
        orderCompelete(param).then(response => {
          if (response.rel === true) {
            this.$notify({
              title: "成功",
              message: "订单已完成",
              type: "success",
              duration: 2000
            });
            this.getList();
          } else {
            this.$notify({
              title: "失败",
              message: response.message,
              type: "success",
              duration: 2000
            });
          }

        });
      });
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
      });
    },
    // 订单流程
    closeDialogDetail () {
      this.dialogFormVisibleCustomer = false
    },
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
    //异常原因
    abnormalReason (row) {
      this.$alert(row.orderDescription, '异常原因', {
        dangerouslyUseHTMLString: true
      });
    },
    closeDialogLogistics () {
      this.dialogFormVisibleLogistics = false
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
.btnMb {
  margin-bottom: 5px;
  float: right;
  margin-right: 15px;
  margin-top: 10px;
}
.btnMb button {
  margin-left: 15px;
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



