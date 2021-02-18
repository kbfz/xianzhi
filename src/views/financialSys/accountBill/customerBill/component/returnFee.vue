<template>
  <div>
             <div class="hint-content">
                 <div class="hint-list">{{billForm.customerName}}（{{billForm.customerCode}}）</div>
                 <div class="hint-list">
                     <span>{{billForm.month}}</span>
                     <span> | </span>
                     <span>退件转寄费用明细：{{billForm.returnFee}}（不含税）</span>
                 </div>
             </div>
            <el-form
                :model="query"
                ref="form"
                :inline="true"
                class="formLeft">
                <el-form-item label="">
                    <el-input v-model="query.expressNo" placeholder="请输入物流单号" style="width: 200px"></el-input>
                    <el-input v-model="query.returnExpressNo" placeholder="请输入退回物流单号" style="width: 200px"></el-input>
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
                <!-- <el-table-column label="退件转寄费（不含税）" prop="transferFee" align="center" show-overflow-tooltip width="180px"/> -->
                <el-table-column label="客户名" prop="customerName" align="center" show-overflow-tooltip width="160px"/>
                <el-table-column label="客户编号" prop="customerCode" align="center" show-overflow-tooltip width="120px"/>
                <el-table-column label="物流单号" prop="expressNo" align="center" show-overflow-tooltip width="130px"/>
                <el-table-column label="退回物流单号" prop="expressNo" align="center" show-overflow-tooltip width="150px"/>
                <el-table-column label="退回地址" prop="returnExpressNo" align="center" show-overflow-tooltip width="180px"/>
                <el-table-column label="重量" prop="weight" align="center" show-overflow-tooltip width="100px"/>
                <el-table-column label="物流费" prop="postFee" align="center" show-overflow-tooltip width="120px"/>
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
import { getReturnObj } from "@/api/financialSys/customerBill";
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
                expressNo: '',
                returnExpressNo:''
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
                returnExpressNo: this.query.returnExpressNo,
                expressNo:this.query.expressNo,
                ...this.listQuery
            }
        getReturnObj(query).then(res => {
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