<template>
  <div>
             <div class="hint-content">
                 <div class="hint-list">{{billForm.customerName}}（{{billForm.customerCode}}）</div>
                 <div class="hint-list">
                     <span>{{billForm.month}}</span>
                     <span> | </span>
                     <span>赔付：{{billForm.pay}}</span>
                 </div>
             </div>
            <el-form
                :model="query"
                ref="form"
                :inline="true"
                class="formLeft">
                <el-form-item label="">
                    <el-input v-model="query.orderNo" placeholder="请输入订单号" style="width: 200px"></el-input>
                    <el-input v-model="query.expressNo" placeholder="请输入运单号" style="width: 200px"></el-input>
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
                <el-table-column label="赔付金额" prop="payAmount" align="center" show-overflow-tooltip width="110px"/>
                <el-table-column label="客户名" prop="customerName" align="center" show-overflow-tooltip width="160px"/>
                <el-table-column label="客户编号" prop="customerCode" align="center" show-overflow-tooltip width="120px"/>
                <el-table-column label="时间" prop="payTime" align="center" show-overflow-tooltip width="150px"/>
                <el-table-column label="订单号" prop="orderNo" align="center" show-overflow-tooltip width="180px"/>
                <el-table-column label="运单号" prop="expressNo" align="center" show-overflow-tooltip width="180px"/>
                <el-table-column label="快递公司" prop="expressCompany" align="center" show-overflow-tooltip width="110px"/>
                <el-table-column label="货物价值" prop="goodsValue" align="center" show-overflow-tooltip width="120px"/>
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
import { getPayObj } from "@/api/financialSys/customerBill";
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
                orderNo: '',
                expressNo:''
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
                orderNo: this.query.orderNo,
                expressNo:this.query.expressNo,
                ...this.listQuery
            }
        getPayObj(query).then(res => {
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