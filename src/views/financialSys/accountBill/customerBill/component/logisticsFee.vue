<template>
  <div>
             <div class="hint-content">
                 <div class="hint-list">{{billForm.customerName}}（{{billForm.customerCode}}）</div>
                 <div class="hint-list">
                     <span>{{billForm.month}}</span>
                     <span> | </span>
                     <span>国际物流费用明细：{{billForm.internationalLogisticsFee}}（不含税）</span>
                 </div>
             </div>
            <el-form
                :model="query"
                ref="form"
                :inline="true"
                class="formLeft">
                <el-form-item label="">
                    <el-date-picker
                        v-model="query.startTime"
                        type="date"
                        style="width: 200px"
                        placeholder="选择发车时间"
                        >
                        </el-date-picker>
                     <el-date-picker
                        v-model="query.endTime"
                        type="date"
                        style="width: 200px"
                        placeholder="选择运抵时间"
                        >
                        </el-date-picker>
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
                <el-table-column label="总费用（不含税）" prop="total" align="center" show-overflow-tooltip width="150px"/>
                <el-table-column label="客户名" prop="customerName" align="center" show-overflow-tooltip width="160px"/>
                <el-table-column label="客户编号" prop="customerCode" align="center" show-overflow-tooltip width="120px"/>
                <el-table-column label="起运地" prop="origin" align="center" show-overflow-tooltip width="130px"/>
                <el-table-column label="目的地" prop="destination" align="center" show-overflow-tooltip width="130px"/>
                <el-table-column label="平台" prop="platform" align="center" show-overflow-tooltip width="110px"/>
                <el-table-column label="板数" prop="boardNumber" align="center" show-overflow-tooltip width="100px"/>
                <el-table-column label="发车日期" prop="startTime" align="center" show-overflow-tooltip width="150px"/>
                <el-table-column label="运抵日期" prop="endTime" align="center" show-overflow-tooltip width="150px"/>
                <el-table-column label="车型" prop="carModel" align="center" show-overflow-tooltip width="120px"/>
                <el-table-column label="运费" prop="postFee" align="center" show-overflow-tooltip width="120px"/>
                <el-table-column label="过磅费" prop="weighFee" align="center" show-overflow-tooltip width="120px"/>
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
import { getInternationalObj } from "@/api/financialSys/customerBill";
var dateUtils = require("silly-datetime");
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
                startTime: '',
                endTime:''
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
                startTime: this.query.startTime === '' ? '' : dateUtils.format(this.query.startTime, "YYYY-MM-DD"),
                endTime:this.query.endTime === '' ? '' : dateUtils.format(this.query.endTime, "YYYY-MM-DD"),
                ...this.listQuery
            }
        getInternationalObj(query).then(res => {
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