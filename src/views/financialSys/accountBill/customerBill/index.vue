<template>
<div class="app-container calendar-list-container" id="app-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="24">
        <div class="app-container-left">
                 <el-form :inline="true" :model="formData">
            <el-form-item label="">
                <el-select v-model="formData.customerCode" placeholder="请选择客户" clearable>
                    <el-option 
                    v-for="item in clientSeleteArr"
                    :key="item.value"
                    :label="item.key" 
                    :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-date-picker
                    v-model="formData.month"
                    clearable
                    type="month"
                    format="yyyy-MM"
                    value-format="yyyy-MM"
                    placeholder="请选择月分">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchEvent">查询</el-button>
            </el-form-item>
        </el-form>
                <el-table
            :data="dataList"
            v-loading="loading"
            element-loading-text="正在加载中......"
            border
            fit
            highlight-current-row
            :height="elTableMediaHeight"
            :class="{'tabLayout':isList}"
             style="width: 100%;">
            <el-table-column label="客户名称" prop="customerName" align="center" show-overflow-tooltip min-width="150px"/>
            <el-table-column label="客户编号" prop="customerCode"  align="center" show-overflow-tooltip min-width="150px"/>
            <el-table-column label="账单月份" prop="month"  align="center" show-overflow-tooltip min-width="120px"/>
            <el-table-column label="实际应收" prop="actualReceive"  align="center" show-overflow-tooltip min-width="150px"/>
            <el-table-column label="状态"   align="center" show-overflow-tooltip min-width="120px">
                 <template scope="scope">
                   <span v-if="scope.row.status == 0">未生成</span>
                   <span v-if="scope.row.status == 1">已生成</span>
                   <span v-if="scope.row.status == 2">生成中</span>
                   <span v-if="scope.row.status == 3">失败</span>
                 </template>
            </el-table-column>
            <el-table-column label="结果描述" prop="remark"  align="center" show-overflow-tooltip min-width="180px"/>
            <el-table-column label="操作" align="center" width="80px">
                <template scope="scope">
                    <el-button type="text" @click="viewDetails(scope.row)">查看</el-button>
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
                        :total="totalNum">
            </el-pagination>
        </div> 
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { customerFinanceBill,customerSelect } from "@/api/financialSys/customerBill";
var dateUtils = require("silly-datetime");
export default {
    data () {
        return {
            isList:true,
            // 
            formData:{
               customerCode: '',
               month:''
            },
            dataList:[], 
            loading:false,
            listQuery: {
                page: 1,
                limit: 10,
                _type_:"equal",
                orderBy:"createTimedesc"
            },
            totalNum: 0,
            // 客户list
            clientSeleteArr:[]
        }
    },
    computed: {
        ...mapGetters(["elements", "elTableMediaHeight"])
    },
    created(){
       this.getList();
       this.customerList()
    },
    mounted () {
        
    },
    methods: {
        // 获取客户账单列表
        getList(){
            let query = {
               customerCode: this.formData.customerCode,
               month:this.formData.month === '' ? '' : dateUtils.format(this.formData.month, "YYYY-MM"),
               ...this.listQuery
            }
            customerFinanceBill(query).then(res =>{
                this.dataList = res.data.rows;
                this.totalNum = res.data.total;
            })
        },
        //查询
        searchEvent(){
           this.getList()
        },
        // 每页的多少
        handleSizeChange (val) {
            this.listQuery.limit = val;
            this.getList();
        },
        // 当前页
        handleCurrentChange (val) {
            this.listQuery.page = val;
            this.getList();
        },
        // 客户下拉框
        customerList() {
            let query = {}
            customerSelect(query).then(res => {
              if(res.rel) {
                  this.clientSeleteArr = res.data
              }
            })
        },
        
        // 查看
        viewDetails(row){
            // let obj = {
            //     id: row.id
            // }
            window.sessionStorage.setItem("billObj", JSON.stringify(row));
            this.$router.push({
                path:'customerBillDetails',
                // query:{id:row.id,name:row.client}
            })
        }
    }

}
</script>

<style lang='scss' scoped>


</style>