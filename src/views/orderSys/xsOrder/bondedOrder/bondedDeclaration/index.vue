<template>
  <div class="app-container calendar-list-container"
       id="app-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="19">
        <div class="app-container-left">
          <div class="filter-container">
            <el-select placeholder="请选择客户名称"
                       v-model="query.ebusiness_qstcode"
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
            <el-date-picker type="date"
                            placeholder="请选择开始申报日期"
                            style="width: 200px;"
                            class="filter-item"
                            @keyup.enter.native="handleFilter"
                            format="yyyy-MM-dd"
                            popper-class="timeSelect"
                            v-model="query.createTime">
            </el-date-picker>
            <el-button class="filter-item"
                       type="primary"
                       v-waves
                       icon="search"
                       @click="handleFilter">查询</el-button>
          </div>
          <el-table :data="list"
                    v-loading="loading.tableLoading"
                    element-loading-text="正在加载中......"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%"
                    :height="elTableMediaHeight"
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
                                   width="170"
                                   align="center"
                                   show-overflow-tooltip
                                   prop="goodsSku">
                  </el-table-column>
                  <el-table-column label="商品条码"
                                   width="157"
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
            <el-table-column min-width="180"
                             align="center"
                             label="客户名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.ebusiness_name}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="180"
                             align="center"
                             label="订单号"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer; color:#20A0FF;display: inline-block;height: 38px;line-height: 38px"
                      @click="oederProcess(scope.row)">{{scope.row.orderno}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="180"
                             align="center"
                             label="物流单号"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.logistics_no}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="180"
                             align="center"
                             label="接收时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.create_time}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="180"
                             align="center"
                             label="开始申报时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.send_declaration_time}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="170"
                             align="center"
                             label="超时时长(小时)"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.overtime}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="260"
                             align="center"
                             label="操作"
                             show-overflow-tooltip>
              <template scope="scope">
                <el-button type="success"
                           class="btn"
                           @click="dandelOrder(scope.row)">取消订单</el-button>
                <el-button type="primary"
                           class="btn"
                           @click="normalOrder(scope.row)">标记为处理完成</el-button>
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
      </el-col>
      <el-col :span="5">
        <div class="app-container-right"
             ref="lineHeight">
          <!-- v-on:childMethod="getList"   在子组件里面调用父组件的getList方法 childMethod是子组件里面参数名 -->
          <update-element ref="update"
                          v-if="showUpdata"
                          :orderNum="orderNum"></update-element>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  page,
  detailObj,
  // stepObj,
  orderStatistics,
  selectObj,
  receiveObj,
  handleObj
} from "api/orderSys/xsOrder/bondedOrder/bondedDeclaration/index";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  name: "sellBsorderHead",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/update.vue"),
    "order-process": () => import("./components/orderProcess.vue")
  },
  data () {
    return {
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
      dialogFormVisibleCustomer: false,
      // 订单数据
      total: 0,
      orderNum: {
        countCustomer: 0,
        countOrder: 0,
        customer: "",
        declarelationOrder: 0
      },
      list: [],
      tableContent: [],
      // total: null,
      loading: {
        tableLoading: false
      },
      query: {
        orderno: "",
        createTime: '',
        stateMonitoring: 0,
        ebusiness_qstcode: '',
        status: 1
      },
      listQuery: {
        page: 1,
        limit: 10
        // orderBy: 'send_declaration_timedesc'
      },
      tableKey: 0,
      // select: [{
      //   value: 1,
      //   label: '正常申报'
      // },
      // {
      //   value: 0,
      //   label: '申报超时'
      // }
      // ],
      selectCustom: []
    };
  },
  created () {
    this.getList();
    this.orderTotal();
    this.customerName()
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
  methods: {
    getList () {
      this.loading.tableLoading = true;
      let param = {
        orderno: $.trim(this.query.orderno),
        createTime:
          this.query.createTime === ""
            ? ""
            : dateUtils.format(this.query.createTime, "YYYY-MM-DD"),
        status: this.query.status,
        stateMonitoring: this.query.stateMonitoring,
        ebusiness_qstcode: $.trim(this.query.ebusiness_qstcode),
        ...this.listQuery
      }
      // }
      page(param).then(response => {
        // console.log(response.data.rows)
        this.loading.tableLoading = false;
        this.list = response.data.rows;
        this.total = response.data.total;
      })
    },
    handleFilter () {
      this.getList();
      this.orderTotal()
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
          orderUuid: row.order_uuid,
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
    // 订单统计
    orderTotal () {
      var time = new Date();
      // console.log(time)
      let param = {
        status: this.query.status,
        valueCode: this.query.valueCode,
        orderno: this.query.orderno,
        stateMonitoring: this.query.stateMonitoring,
        ebusiness_qstcode: this.query.ebusiness_qstcode,
        createTime:
          this.query.createTime === ""
            ? ''
            : dateUtils.format(this.query.createTime, "YYYY-MM-DD")
      }
      orderStatistics(param).then(response => {
        this.orderNum = response.data;
        //  console.log(response.data)
      });
    },
    closeDialogDetail () {
      this.dialogFormVisibleCustomer = false
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
    // 取消订单
    dandelOrder (row) {
      this.$confirm('操作后系统将认为此订单已取消，请确定该订单已经取消的情况下在进行操作', '提示', {
        confirmButtonText: '标记为订单取消',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = {
          orderUuid: row.order_uuid,
          operationType: 'cancel '
        }
        handleObj(param).then(res => {
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "订单取消成功",
              type: "success",
              duration: 2000
            });
            this.getList()
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
    // 标记订单已完成
    normalOrder (row) {
      this.$confirm('操作后系统将认为此订单已处理完成，请确定该订单已经处理完成的情况下再进行操作', '提示', {
        confirmButtonText: '标记为处理完成',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let param = {
          orderUuid: row.order_uuid,
          operationType: 'complete '
        }
        handleObj(param).then(res => {
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "订单处理完成",
              type: "success",
              duration: 2000
            });
            this.getList()
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
.filter-container .filter-item {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 3px;
}
.btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c4c4c4;
  color: #1f2d3d;
  margin: 0;
  padding: 8px 10px;
  border-radius: 4px;
}
.el-button--success {
  color: #fff;
  background-color: #13ce66;
  border-color: #13ce66;
}
.el-button--primary {
  color: #fff;
  background-color: #20a0ff;
  border-color: #20a0ff;
}
</style>



