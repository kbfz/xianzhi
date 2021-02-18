<template>
  <div>
             <div class="hint-content">
                 <div class="hint-list">{{billForm.customerName}}（{{billForm.customerCode}}）</div>
                 <div class="hint-list">
                     <span>{{billForm.month}}</span>
                     <span> | </span>
                     <span>提货转关费用明细：{{billForm.transferFee}}（不含税）</span>
                 </div>
             </div>
            <el-form
                :model="query"
                ref="form"
                :inline="true"
                class="formLeft">
                <el-form-item label="">
                    <el-input v-model="query.batchNo" placeholder="请输入批次号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchEvent">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table 
                :data="tableList"
                highlight-current-row
                :class="{'tabLayout':isList}"
                border
                :max-height="tableHeight"
                ref="table">
                <el-table-column label="提货转关费（不含税）" prop="transferFee" align="center" show-overflow-tooltip width="180px"/>
                <el-table-column label="客户名" prop="customerName" align="center" show-overflow-tooltip width="160px"/>
                <el-table-column label="客户编号" prop="customerCode" align="center" show-overflow-tooltip width="120px"/>
                <el-table-column label="批次号" prop="batchNo" align="center" show-overflow-tooltip width="130px"/>
                <el-table-column label="运单号" prop="expressNo" align="center" show-overflow-tooltip width="150px"/>
                <el-table-column label="托盘数" prop="trayQuantity" align="center" show-overflow-tooltip width="100px"/>
                <el-table-column label="重量" prop="weight" align="center" show-overflow-tooltip width="100px"/>
                <el-table-column label="计费重量/尺寸" prop="countWeight" align="center" show-overflow-tooltip width="140px"/>
                <el-table-column label="提货费" prop="pickUpFee" align="center" show-overflow-tooltip width="120px"/>
                <el-table-column label="分单提货费" prop="singlePickUpFee" align="center" show-overflow-tooltip width="150px"/>
                <el-table-column label="危险品提货费" prop="dangerPickUpFee" align="center" show-overflow-tooltip width="150px"/>
                <el-table-column label="仓储费" prop="warehouseFee" align="center" show-overflow-tooltip width="120px"/>
                <el-table-column label="卸车费" prop="unloadFee" align="center" show-overflow-tooltip width="120px"/>
                <el-table-column label="复重费" prop="repeatFee" align="center" show-overflow-tooltip width="120px"/>
                <el-table-column label="核本费" prop="checkFee" align="center" show-overflow-tooltip width="120px"/>
                <el-table-column label="直航费" prop="flightFee" align="center" show-overflow-tooltip width="120px"/>
                <el-table-column label="操作费" prop="operateFee" align="center" show-overflow-tooltip width="120px"/>
                <el-table-column label="装卸费" prop="loadUnloadFee" align="center" show-overflow-tooltip width="120px"/>
                <el-table-column label="车费" prop="carFee" align="center" show-overflow-tooltip width="120px"/>
                <el-table-column label="押夜/放空" prop="temporaryStorageFee" align="center" show-overflow-tooltip width="150px"/>
            </el-table>

            <div class="pagination-container">
                <el-pagination @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="listQuery.page"
                            :page-sizes="[10,20,30, 50]"
                            :page-size="listQuery.limit"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalNum">
                </el-pagination>
            </div>
  </div>
</template>

<script>
import { getTransferObj } from "@/api/financialSys/customerBill";
export default {
      props: {
         billForm: {
            type:Object
         }
      },
      data () {
          return {
            isList:true,
            tableList:[],
            query: {
                batchNo: ''
            },
            listQuery: {
                page: 1,
                limit: 10,
                _type_:'equal',
                orderBy:'createTimedesc'
            },
            totalNum: 0,
            tableHeight:500
          }
      },
      created() {
          this.diaList()
      },
      methods: {
        // 搜索
        searchEvent(){
         this.diaList()
        },
        diaList() {
            let query = {
                billId:this.billForm.billId,
                batchNo: this.query.batchNo,
                ...this.listQuery
            }
        getTransferObj(query).then(res => {
            if(res.rel){
                this.tableList = res.data.rows
                this.totalNum= res.data.total
            }
        })
        },
        // 每页的多少
        handleSizeChange (val) {
            this.listQuery.limit = val;
            this.diaList();
        },
        // 当前页
        handleCurrentChange (val) {
            this.listQuery.page = val;
            this.diaList();
        },
      }
}
</script>

<style lang='scss' scoped>
.hint-content{
    color: #999999;
    font-size: 14px;
    margin-bottom: 10px;
    .hint-list{
        line-height: 28px;
    }
}
</style>