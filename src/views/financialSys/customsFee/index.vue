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
      popper-class="timeSelect"
      style="width: 200px;" class="filter-item"
      format="yyyy-MM-dd"
      v-model="listQuery.endTime">
    </el-date-picker>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%" :height="elTableMediaHeight">

      <el-table-column width="150px" align="center" label="客户编码" fixed>
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
        <el-table-column width="200px" align="center" label="运单号" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.logisticsNo}}</span>
      </template>
    </el-table-column>
        <el-table-column width="120px" align="center" label="是否已计算">
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
        <el-table-column width="120px" align="center" label="关税" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.tariff}}</span>
      </template>
    </el-table-column>
        <el-table-column width="120px" align="center" label="消费税" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.saleTax}}</span>
      </template>
    </el-table-column>
        <el-table-column width="120px" align="center" label="增值税" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.valueAddedTax}}</span>
      </template>
    </el-table-column>
        <el-table-column width="120px" align="center" label="非现金抵扣" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.noCashDeduction}}</span>
      </template>
    </el-table-column>
        <el-table-column width="120px" align="center" label="订单总费用" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.orderTotalFee}}</span>
      </template>
    </el-table-column>
        <el-table-column width="120px" align="center" label="订单总税费" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.orderTotalTax}}</span>
      </template>
    </el-table-column>
        <el-table-column width="120px" align="center" label="订单总货值" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.orderTotalValue}}</span>
      </template>
    </el-table-column>
        <el-table-column width="120px" align="center" label="运费" show-overflow-tooltip>
      <template scope="scope">
        <span>{{scope.row.shippingFee}}</span>
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
    <!-- <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close="closeDialog">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="客户编码" prop="customerCode">
      <el-input v-model="form.customerCode" placeholder="请输入客户编码"></el-input>
    </el-form-item>
        <el-form-item label="客户名称" prop="customerName">
      <el-input v-model="form.customerName" placeholder="请输入客户名称"></el-input>
    </el-form-item>
        <el-form-item label="类型:1报关，2仓储" prop="type">
      <el-input v-model="form.type" placeholder="请输入类型:1报关，2仓储"></el-input>
    </el-form-item>
        <el-form-item label="节点名称" prop="typeName">
      <el-input v-model="form.typeName" placeholder="请输入节点名称"></el-input>
    </el-form-item>
        <el-form-item label="订单UUID" prop="orderUuid">
      <el-input v-model="form.orderUuid" placeholder="请输入订单UUID"></el-input>
    </el-form-item>
        <el-form-item label="订单号" prop="orderNo">
      <el-input v-model="form.orderNo" placeholder="请输入订单号"></el-input>
    </el-form-item>
        <el-form-item label="运单号" prop="logisticsNo">
      <el-input v-model="form.logisticsNo" placeholder="请输入运单号"></el-input>
    </el-form-item>
        <el-form-item label="是否已计算:0否，1是" prop="isCount">
      <el-input v-model="form.isCount" placeholder="请输入是否已计算:0否，1是"></el-input>
    </el-form-item>
        <el-form-item label="价格" prop="price">
      <el-input v-model="form.price" placeholder="请输入价格"></el-input>
    </el-form-item>
        <el-form-item label="关税" prop="tariff">
      <el-input v-model="form.tariff" placeholder="请输入关税"></el-input>
    </el-form-item>
        <el-form-item label="消费税" prop="saleTax">
      <el-input v-model="form.saleTax" placeholder="请输入消费税"></el-input>
    </el-form-item>
        <el-form-item label="增值税" prop="valueAddedTax">
      <el-input v-model="form.valueAddedTax" placeholder="请输入增值税"></el-input>
    </el-form-item>
        <el-form-item label="非现金抵扣" prop="noCashDeduction">
      <el-input v-model="form.noCashDeduction" placeholder="请输入非现金抵扣"></el-input>
    </el-form-item>
        <el-form-item label="订单总费用" prop="orderTotalFee">
      <el-input v-model="form.orderTotalFee" placeholder="请输入订单总费用"></el-input>
    </el-form-item>
        <el-form-item label="订单总税费" prop="orderTotalTax">
      <el-input v-model="form.orderTotalTax" placeholder="请输入订单总税费"></el-input>
    </el-form-item>
        <el-form-item label="订单总货值" prop="orderTotalValue">
      <el-input v-model="form.orderTotalValue" placeholder="请输入订单总货值"></el-input>
    </el-form-item>
        <el-form-item label="运费" prop="shippingFee">
      <el-input v-model="form.shippingFee" placeholder="请输入运费"></el-input>
    </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="form.createTime" placeholder="请输入创建时间"></el-input>
    </el-form-item>
        <el-form-item label="作业完成时间" prop="completeTime">
      <el-input v-model="form.completeTime" placeholder="请输入作业完成时间"></el-input>
    </el-form-item>
        <el-form-item label="计算时间" prop="countTime">
      <el-input v-model="form.countTime" placeholder="请输入计算时间"></el-input>
    </el-form-item>
        <el-form-item label="备注" prop="remark">
      <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
    </el-form-item>
        <el-form-item label="扩展字段1" prop="ext1">
      <el-input v-model="form.ext1" placeholder="请输入扩展字段1"></el-input>
    </el-form-item>
        <el-form-item label="扩展字段2" prop="ext2">
      <el-input v-model="form.ext2" placeholder="请输入扩展字段2"></el-input>
    </el-form-item>
        <el-form-item label="扩展字段3" prop="ext3">
      <el-input v-model="form.ext3" placeholder="请输入扩展字段3"></el-input>
    </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog> -->
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
} from "api/financialSys/customsFee/index";
import { getCustomerData } from "api/baseDataSys/bdCustomer/index";
import { mapGetters } from "vuex";
var dateUtils = require("silly-datetime");
export default {
  name: "customsFee",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/statics")
  },
  data() {
    return {
      form: {
        customerCode: undefined,
        customerName: undefined,
        type: undefined,
        typeName: undefined,
        orderUuid: undefined,
        orderNo: undefined,
        logisticsNo: undefined,
        isCount: undefined,
        price: undefined,
        tariff: undefined,
        saleTax: undefined,
        valueAddedTax: undefined,
        noCashDeduction: undefined,
        orderTotalFee: undefined,
        orderTotalTax: undefined,
        orderTotalValue: undefined,
        shippingFee: undefined,
        createTime: undefined,
        completeTime: undefined,
        countTime: undefined,
        remark: undefined,
        ext1: undefined,
        ext2: undefined,
        ext3: undefined
      },
      rules: {},
      list: null,
      total: null,
      listLoading: true,
      query: {
        
      },
      listQuery: {
        page: 1,
        limit: 10,
        customerCode: undefined,
        startTime: undefined,
        endTime: undefined,
        orderNo: undefined,
        // _type_: "equal",
        // orderBy: "completeTimedesc"
      },
      selects: {
        customers: []
      },
      // 订单数据
      staticsNum: {
        ext1: 1, //客户数量
        ext2: 0, //单量
        price: 0, //申报作业费
        shippingFee: 0 //总运费
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "创建"
      },
      tableKey: 0
    };
  },
  created() {
    this.getList();
    //获取总统计
    this.orderTotal();
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
  methods: {
    // 关闭el-dialog 前的回调函数 重置表单
    closeDialog() {
      this.dialogFormVisible = false;
      this.$refs["form"].resetFields();
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
      this.listQuery.startTime = dateUtils.format(
        this.listQuery.startTime,
        "YYYY-MM-DD"
      );
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
    // 申报作业统计
    orderTotal() {
      let param = {
        customerCode: this.listQuery.customerCode,
        startTime: this.listQuery.startTime,
        endTime: this.listQuery.endTime
      };
      statics(param).then(response => {
        this.$copyJsonProperty(this.staticsNum, response.data);
      });
    },
    handleFilter() {
      let searchDays = this.getDays(
        this.listQuery.startTime,
        this.listQuery.endTime
      );
      if (searchDays > 60) {
        this.$message({
          message: "请选择两个月内的数据",
          type: "warning"
        });
      } else {
        this.getList();
        this.orderTotal();
      }
    },
    //获取两日期间隔天数
    getDays(strDateStart, strDateEnd) {
      strDateStart =
        strDateStart === "" ? "" : dateUtils.format(strDateStart, "YYYY-MM-DD");
      strDateEnd =
        strDateEnd === "" ? "" : dateUtils.format(strDateEnd, "YYYY-MM-DD");
      var strSeparator = "-"; //日期分隔符
      var oDate1;
      var oDate2;
      var iDays;
      oDate1 = strDateStart.split(strSeparator);
      oDate2 = strDateEnd.split(strSeparator);
      var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
      var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
      iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
      return iDays;
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
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    handleUpdate(row) {
      getObj(row.id).then(response => {
        this.form = response.data;
        this.dialogFormVisible = true;
        this.dialogStatus = "update";
      });
    },
    // handleDelete(row) {
    //   this.$confirm('此操作将永久删除, 是否继续?', '提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //       })
    //       .then(() => {
    //     delObj(row.id)
    // .then(() => {
    //     this.$notify({
    //     title: '成功',
    //     message: '删除成功',
    //     type: 'success',
    //     duration: 2000
    //   });
    //   const index = this.list.indexOf(row);
    //   this.list.splice(index, 1);
    // });
    // });
    // },
    create(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      const set = this.$refs;
      set[formName].resetFields();
    },
    // update(formName) {
    //   const set = this.$refs;
    //   set[formName].validate(valid => {
    //     if (valid) {
    //       this.dialogFormVisible = false;
    //       this.form.password = undefined;
    //       putObj(this.form.id, this.form).then(() => {
    //         this.dialogFormVisible = false;
    //         this.getList();
    //         this.$notify({
    //           title: "成功",
    //           message: "创建成功",
    //           type: "success",
    //           duration: 2000
    //         });
    //       });
    //     } else {
    //       return false;
    //     }
    //   });
    // },
    resetTemp() {
      this.form = {
        customerCode: undefined,
        customerName: undefined,
        type: undefined,
        typeName: undefined,
        orderUuid: undefined,
        orderNo: undefined,
        logisticsNo: undefined,
        isCount: undefined,
        price: undefined,
        tariff: undefined,
        saleTax: undefined,
        valueAddedTax: undefined,
        noCashDeduction: undefined,
        orderTotalFee: undefined,
        orderTotalTax: undefined,
        orderTotalValue: undefined,
        shippingFee: undefined,
        createTime: undefined,
        completeTime: undefined,
        countTime: undefined,
        remark: undefined,
        ext1: undefined,
        ext2: undefined,
        ext3: undefined
      };
    }
  }
};
</script>
<style scoped>
.filter-container .filter-item {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 1px;
}
</style>
