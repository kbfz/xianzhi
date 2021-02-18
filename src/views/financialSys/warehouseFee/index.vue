<template>
  <div class="app-container calendar-list-container">
      <el-row>
          <!-- 左边 -->
          <el-col :span="19">
       <div class="app-container-left">
    <div class="filter-container">
     <el-select v-model="listQuery.customerCode" @visible-change="getCustomer" placeholder="请选择客户" clearable popper-class="optionsContent">
       <el-option
          v-for="item in selects.customers"
          :key="item.qstCode"
          :label="item.copName"
          :value="item.qstCode">
        </el-option>
     </el-select>
      <el-input style="width: 200px;" class="filter-item" placeholder="订单号" v-model="listQuery.orderNo"> </el-input>
      <el-date-picker
      type="date"
      placeholder="请选择开始日期"
      style="width: 200px;" class="filter-item"
      format="yyyy-MM-dd"
      popper-class="timeSelect"
      v-model="listQuery.startTime">
    </el-date-picker>
       <el-date-picker
      type="date"
      placeholder="请选择结束日期"
      style="width: 200px;" class="filter-item"
      popper-class="timeSelect"
      format="yyyy-MM-dd"
      v-model="listQuery.endTime">
    </el-date-picker>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%" :height="elTableMediaHeight">

       <el-table-column width="150px" align="center" label="客户编码" show-overflow-tooltip fixed>
      <template scope="scope">
        <span>{{scope.row.customerCode}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="客户名称" show-overflow-tooltip fixed>
      <template scope="scope">
        <span>{{scope.row.customerName}}</span>
      </template>
    </el-table-column>
        <el-table-column width="150px" align="center" label="类型">
      <template scope="scope">
        <span v-if="scope.row.type == '1'">报关</span>
        <span v-if="scope.row.type == '2'">仓储</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="节点名称" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.typeName}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="订单号" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.orderNo}}</span>
      </template>
    </el-table-column>
        <el-table-column width="180px" align="center" label="是否已计算">
      <template scope="scope">
        <span v-if="scope.row.isCount == '0'">否</span>
        <span v-if="scope.row.isCount == '1'">是</span>
      </template>
    </el-table-column>
        <el-table-column width="120px" align="center" label="价格(元)" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.price}}</span>
      </template>
    </el-table-column>
        <el-table-column width="120px" align="center" label="重量" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.weight}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="运单号" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.logisticsNo}}</span>
      </template>
    </el-table-column>
        <el-table-column width="150px" align="center" label="物流企业编码" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.logisticsCompanyCode}}</span>
      </template>
    </el-table-column>
        <el-table-column width="150px" align="center" label="收件人" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.addressee}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="耗材编码" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.suppliesNo}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="创建时间" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.createTime}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="作业完成时间" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.completeTime}}</span>
      </template>
    </el-table-column>
        <el-table-column width="200px" align="center" label="计算时间" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.countTime}}</span>
      </template>
    </el-table-column>
      </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close="closeDialog">
    </el-dialog>
       </div>
       </el-col>
          <!-- 右边 -->
          <el-col :span="1">
              <div class="border">
              </div>
          </el-col>
          <el-col :span="5">
              <div class="app-container-right" ref="lineHeight">
                  <!-- v-on:childMethod="getList"   在子组件里面调用父组件的getList方法 childMethod是子组件里面参数名 -->
                  <update-element ref="statics" :staticsNum="staticsNum"></update-element>
              </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>
  import {
      page,
      addObj,
      getObj,
      delObj,
      putObj,
      statics
  } from 'api/financialSys/warehouseFee/index';
  import { mapGetters } from 'vuex';
  import { getCustomerData } from "api/baseDataSys/bdCustomer/index";
  var dateUtils = require("silly-datetime");
  export default {
    name: 'warehouseFee',
      components: {
          // 引入编辑的组件
          'update-element': () => import('./components/statics')
  },
    data() {
      return {
        form: {
        customerCode : undefined,        customerName : undefined,        type : undefined,        typeName : undefined,        orderUuid : undefined,        orderNo : undefined,        isCount : undefined,        price : undefined,        weight : undefined,        logisticsNo : undefined,        logisticsCompanyCode : undefined,        province : undefined,        city : undefined,        county : undefined,        addressee : undefined,        suppliesNo : undefined,        createTime : undefined,        completeTime : undefined,        countTime : undefined,        remark : undefined,        ext1 : undefined,        ext2 : undefined,        ext3 : undefined          },
        rules: {},
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          customerCode: undefined,
          orderNo: undefined,
          startTime: undefined,
          endTime: undefined,
          // _type_: 'equal',
          // orderBy: 'createTimedesc'
        },
        selects: {
        customers: []
        },
        staticsNum: {
          ext1: 0,           //客户数量
          ext2: 0,           //单量
          price: 0,          //仓库作业费
          weight: 0          //总重量
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    created() {
      let date = new Date();
      this.listQuery.endTime = dateUtils.format(date, "YYYY-MM-DD");
      date.setDate(1);
      this.listQuery.startTime = dateUtils.format(date, "YYYY-MM-DD");
      this.getList();
      this.orderTotal();
    },
    computed: {
      ...mapGetters([
        'elements',
        'elTableMediaHeight'
      ])
    },
    methods: {
        // 关闭el-dialog 前的回调函数 重置表单
        closeDialog() {
            this.dialogFormVisible = false
            this.$refs['form'].resetFields()
        },
        // 查看详情
        detailName(row) {
        },
      getList() {
        let date = new Date();
        let thisyear = date.getFullYear();
       let  thismonth = date.getMonth()+1;
       let monthFirst = thisyear + "-" + thismonth+ "-" + 1
         if (
        this.listQuery.startTime === undefined ||
        this.listQuery.startTime === ""
      ) {
        this.listQuery.startTime = monthFirst;
      }
    if (
        this.listQuery.endTime === undefined ||
        this.listQuery.endTime === ""
      ) {
        this.listQuery.endTime = date;
      }
      this.listQuery.endTime = dateUtils.format(this.listQuery.endTime, "YYYY-MM-DD" );
      this.listQuery.startTime = dateUtils.format(this.listQuery.startTime, "YYYY-MM-DD");
      this.listLoading = true;
        page(this.listQuery).then(response => {
          this.list = response.data.rows;
          this.total = response.data.total;
          this.listLoading = false;
       });
      },
       //获取客户信息
    getCustomer() {
      getCustomerData().then(res => {
        if (res.rel) {
          this.selects.customers = res.data;
        }
      });
    },
      // 仓库作业统计
    orderTotal() {
      let param = {
       customerCode:this.listQuery.customerCode,startTime:this.listQuery.startTime,endTime:this.listQuery.endTime
      };
      statics(param).then(response => {
        this.$copyJsonProperty(this.staticsNum, response.data);
      });
    },
      handleFilter() {
        let searchDays = this.getDays(this.listQuery.startTime, this.listQuery.endTime)
        if(searchDays > 60){
          this.$message({
            message: '请选择两个月内的数据',
            type: 'warning'
          });
        }else{
          this.getList();
          this.orderTotal();
        }
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
      },
      handleUpdate(row) {
        getObj(row.id)
            .then(response => {
          this.form = response.data;
        this.dialogFormVisible = true;
        this.dialogStatus = 'update';
      });
      },
       //获取两日期间隔天数
      getDays(strDateStart,strDateEnd){
        strDateStart = strDateStart === "" ? "" : dateUtils.format(strDateStart, "YYYY-MM-DD");
        strDateEnd = strDateEnd === "" ? "" : dateUtils.format(strDateEnd, "YYYY-MM-DD");
        var strSeparator = "-"; //日期分隔符
        var oDate1;
        var oDate2;
        var iDays;
        oDate1= strDateStart.split(strSeparator);
        oDate2= strDateEnd.split(strSeparator);
        var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
        var strDateE = new Date(oDate2[0], oDate2[1]-1, oDate2[2]);
        iDays = parseInt(Math.abs(strDateS - strDateE ) / 1000 / 60 / 60 /24)//把相差的毫秒数转换为天数 
        return iDays ;
      },
      resetTemp() {
        this.form = {
          customerCode : undefined,        customerName : undefined,        type : undefined,        typeName : undefined,        orderUuid : undefined,        orderNo : undefined,        isCount : undefined,        price : undefined,        weight : undefined,        logisticsNo : undefined,        logisticsCompanyCode : undefined,        province : undefined,        city : undefined,        county : undefined,        addressee : undefined,        suppliesNo : undefined,        createTime : undefined,        completeTime : undefined,        countTime : undefined,        remark : undefined,        ext1 : undefined,        ext2 : undefined,        ext3 : undefined
        };
      }
    }
  }
</script>
