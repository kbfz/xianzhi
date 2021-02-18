<template>
  <div>
             <div class="hint-content">
                 <div class="hint-list">{{billForm.customerName}}（{{billForm.customerCode}}）</div>
                 <div class="hint-list">
                     <span>{{billForm.month}}</span>
                     <span> | </span>
                     <span>增值服务费用明细：{{billForm.addedServicesFee}}（不含税）</span>
                 </div>
             </div>
            <el-form
                :model="query"
                ref="form"
                :inline="true"
                class="formLeft">
                <el-form-item label="">
                    <el-input v-model="query.serviceNumber" placeholder="请输入申请编号"></el-input>
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
                <el-table-column label="增值服务费（不含税）" prop="total" align="center" show-overflow-tooltip width="180px"/>
                <el-table-column label="客户名" prop="customerName" align="center" show-overflow-tooltip width="160px"/>
                <el-table-column label="客户编号" prop="customerCode" align="center" show-overflow-tooltip width="120px"/>
                <el-table-column label="申请编号" prop="serviceNumber" align="center" show-overflow-tooltip width="150px"/>
                <el-table-column label="申请说明" prop="reason" align="center" show-overflow-tooltip width="170px"/>
                <el-table-column label="仓库作业完成时间" prop="warehouseTime" align="center" show-overflow-tooltip width="150px"/>
                <el-table-column label="增值服务项目" prop="serviceItem" align="center" show-overflow-tooltip width="140px"/>
                <el-table-column label="申请数量" prop="applyCount" align="center" show-overflow-tooltip width="120px"/>
                <el-table-column label="实际完成数量" prop="actualCount" align="center" show-overflow-tooltip width="130px"/>
                <el-table-column label="单价（不含税）" prop="price" align="center" show-overflow-tooltip width="150px"/>
                <el-table-column label="备注" prop="remark" align="center" show-overflow-tooltip width="150px"/>
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
import { getServiceObj } from "@/api/financialSys/customerBill";
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
                serviceNumber: ''
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
                serviceNumber: this.query.serviceNumber,
                ...this.listQuery
            }
        getServiceObj(query).then(res => {
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