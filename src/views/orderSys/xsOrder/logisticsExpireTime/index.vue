<template>
  <div class="app-container calendar-list-container"
       id="app-container">
    <div class="app-container-left">
      <div class="filter-container">
        <el-date-picker placeholder="请选择时间段"
                        style="width: 300px;"
                        class="filter-item"
                        type="datetimerange"
                        v-model="query.collectTime"
                        popper-class="timeSelect">
        </el-date-picker>
        <!-- <el-date-picker type="datetime"
                        placeholder="请选择结束时间"
                        style="width: 200px;"
                        class="filter-item"
                        @keyup.enter.native="handleFilter"
                        format="yyyy-MM-dd HH:mm:ss"
                        v-model="query.collectTimeStop">
        </el-date-picker> -->
         <el-select placeholder="请选择客户名称"
                   v-model="query.cbeCode"
                   clearable
                   style="width: 200px"
                   popper-class="optionsContent"
                   filterable>
          <el-option v-for="item in selectCustom"
                     :key="item.value"
                     :value="item.value"
                     :label="item.label"></el-option>
        </el-select>
        <el-select placeholder="请选择企业类型"
                   v-model="query.companyType"
                   clearable
                   style="width: 200px"
                   popper-class="optionsContent"
                   filterable>
          <el-option v-for="item in select.timeStatus"
                     :key="item.value"
                     :value="item.value"
                     :label="item.label"></el-option>
        </el-select>
        <el-select placeholder="请选择状态"
                   v-model="query.status"
                   clearable
                   style="width: 200px"
                   popper-class="optionsContent"
                   filterable>
          <el-option v-for="item in select.status"
                     :key="item.value"
                     :value="item.value"
                     :label="item.label"></el-option>
        </el-select>
        <el-select placeholder="请选择超期状态"
                   v-model="query.isExpire"
                   clearable
                   style="width: 200px"
                   popper-class="optionsContent"
                   filterable>
          <el-option v-for="item in select.dayStatus"
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
                   v-waves
                   @click="exportLogistics">导出</el-button>
      </div>
      <el-table :data="list"
                v-loading="loading.tableLoading"
                element-loading-text="正在加载中......"
                border
                fit
                highlight-current-row
                style="width: 100%"
                :height="elTableMediaHeight">
          <el-table-column min-width="150"
                         align="center"
                         label="客户编码"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.cbeCode}}</span>
          </template>
        </el-table-column>
     
        <el-table-column min-width="180"
                         align="center"
                         label="运单号"
                         show-overflow-tooltip>
          <template scope="scope">
            <!-- <span style="cursor: pointer;">{{scope.row.logisticsNo}}</span> -->
            <span style="cursor: pointer; color:#20A0FF"
                  @click="loginQuery(scope.row)">{{scope.row.logisticsNo}}</span>
          </template>
        </el-table-column>
           <el-table-column min-width="150"
                         align="center"
                         label="物流企业"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;"
                  v-if="scope.row.companyType === 'sto'">申通</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.companyType === 'yto'">圆通</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.companyType === 'ems'">邮政</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.companyType === 'sf'">顺丰</span>
          <span style="cursor: pointer;"
                  v-if="scope.row.companyType === 'yunda'">韵达</span>
           <span style="cursor: pointer;"
                  v-if="scope.row.companyType !== 'yunda' && scope.row.companyType !== 'sto' && scope.row.companyType !== 'yto' && scope.row.companyType !== 'ems' && scope.row.companyType !== 'sf'">{{scope.row.companyType}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="150"
                         align="center"
                         label="省份"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.provice}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="130"
                         align="center"
                         label="城市"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.city}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100"
                         align="center"
                         label="考核天数"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.deadDay}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100"
                         align="center"
                         label="妥投天数"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.useDay}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="180"
                         align="center"
                         label="揽收时间"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.collectTime}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="180"
                         align="center"
                         label="签收时间"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.endTime}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="120"
                         align="center"
                         label="超期状态"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;"
                  v-if="scope.row.useDay > scope.row.deadDay">超期</span>
            <span style="cursor: pointer;"
                  v-else>正常</span>
          </template>
        </el-table-column>
        <el-table-column min-width="120"
                         align="center"
                         label="订单状态"
                         show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;"
                  v-if="scope.row.status === '0'">未签收</span>
            <span style="cursor: pointer;"
                  v-if="scope.row.status === '1'">已签收</span>
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
      <el-dialog title="物流轨迹查询"
                 :visible.sync="dialogFormVisibleCustomer"
                 :before-close="closeDialogDetail"
                 :close-on-click-modal="false"
                 class="codeWidth">
        <login-order :loginsticsArr="loginsticsArr"></login-order>
      </el-dialog>
    </div>

  </div>
</template>
<script>
import {
  page,
  exportGoodsById,
  excelExport,
  pageQuery,
  selectObj
} from "api/orderSys/xsOrder/logisticsTimeout/index";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
export default {
  components: {
    //   // 引入编辑的组件
    "login-order": () => import("./compoments/loginOrder"),
  },
  name: "sellBsorderHead",
  data () {
    return {
      total: 0,
      list: [],
      loading: {
        tableLoading: false
      },
      query: {
        collectTime: '',
        // collectTimeStop: '',
        companyType: '',
        status: '',
        isExpire: '',
        cbeName: '',
        cbeCode: ''
      },
      listQuery: {
        page: 1,
        limit: 10,
      },
      selectCustom: [],
      dialogFormVisibleCustomer: false,
      loginsticsArr: [],
      select: {
        timeStatus: [
          {
            value: 'sto',
            label: '申通'
          },
          {
            value: 'yto',
            label: '圆通'
          },
          {
            value: 'ems',
            label: '邮政'
          },
          {
            value: 'sf',
            label: '顺丰'
          },
          {
            value: 'yunda',
            label: '韵达'
          }
        ],
        status: [
          {
            value: 1,
            label: '已签收'
          },
          {
            value: 0,
            label: '未签收'
          }
        ],
        dayStatus: [
          {
            value: 0,
            label: '正常'
          },
          {
            value: 1,
            label: '超期'
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight", "name"])
  },
  created() {
    this.customerName()
  },
  methods: {
    getList () {
      this.loading.tableLoading = true;
      let param = {
        collectTime: this.query.collectTime,
        companyType: this.query.companyType,
        isExpire: this.query.isExpire,
        status: this.query.status,
        cbeCode: this.query.cbeCode,
        ...this.listQuery
      };
      var start = param.collectTime[0] === null ? null : dateUtils.format(param.collectTime[0], "YYYY-MM-DD HH:mm:ss")
      var end = param.collectTime[1] === null ? null : dateUtils.format(param.collectTime[1], "YYYY-MM-DD HH:mm:ss")
      param.collectTime = `(${start},${end})`
      // return false
      page(param).then(response => {
        this.loading.tableLoading = false;
        this.list = response.data.rows;
        this.total = response.data.total;
      });
    },
    handleFilter () {
      if (this.query.collectTime[0] === '' || this.query.collectTime[1] === '' || this.query.collectTime[0] === undefined || this.query.collectTime[1] === undefined || this.query.collectTime[0] === null || this.query.collectTime[1] === null) {
        this.$message({
          message: '请选择时间',
          type: 'warning'
        })
      } else {
        this.getList();
      }
    },
    handleSizeChange (val) {
      this.getList();
    },
    handleCurrentChange (val) {
      this.getList();
    },
    // 导出
    exportLogistics () {
        if (this.query.collectTime === '' || this.query.collectTime === undefined || this.query.collectTime === null) {
        this.$message({
          message: '请选择需要导出的内容',
          type: 'warning'
        })
      } else {
        this.$confirm("确定要导出吗", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let param = {
            url: exportGoodsById,
            collectTime: this.query.collectTime,
            isExpire: this.query.isExpire,
            status: this.query.status,
            companyType: this.query.companyType,
            cbeName: this.query.cbeName
          };
          var start = dateUtils.format(param.collectTime[0], "YYYY-MM-DD HH:mm:ss")
          var end = dateUtils.format(param.collectTime[1], "YYYY-MM-DD HH:mm:ss")
          param.collectTime = `(${start},${end})`
          excelExport(param);
        }).catch(() => { });
      }
    },
    closeDialogDetail () {
      this.dialogFormVisibleCustomer = false
    },
    //物流轨迹查询
    loginQuery (row) {
      let param = {
        logisticsNo: row.logisticsNo,
        _type_: "equal"
      }
      this.dialogFormVisibleCustomer = true
      pageQuery(param).then(response => {
        this.loginsticsArr = response.data.rows[0].traceLines.reverse()
      })
    },
           // 客户下拉选择
    customerName() {
      selectObj().then(response => {
        // console.log(response.data)
        for (var i=0; i< response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectCustom.push(cutObj)
        }
          // console.log(this.selectCustom)
      });
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
.btnColor {
  background: #fff;
  border: 1px solid #c4c4c4;
  //  color: #1f2d3d;
  background: #c4c4c4;
}
.btnColor2 {
  background: #13ce66;
  border: 1px solid #13ce66;
  color: #fff;
}
.show {
  display: inline-block;
}
.show1 {
  display: inline-block;
}
.show2 {
  display: inline-block;
}
.hidden2 {
  display: none;
}
.hidden1 {
  display: none;
}
.hidden {
  display: none;
}
.el-form-item {
  margin-bottom: 22px;
  /* float: left; */
  width: 50%;
  display: inline-block;
  float: left;
}
</style>



