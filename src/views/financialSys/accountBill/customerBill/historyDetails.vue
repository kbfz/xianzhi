<template>
    <div class="app-container">
        <div>
            <el-button type="primary" @click="goBack">返回</el-button>
        </div>

        <div class="title-box">
            <div class="title-left-box">
                <span>河南领澜供应链管理有限公司（QST-00094）</span>
                <el-tag style="color:#ffffff;background:#ef5a33;">历史账单</el-tag>
            </div>
        </div>
        
        <div class="sum-box">
            <span>实际应收：</span>
            <span class="sun-number-style">21400.07</span>
        </div>

        <div class="detail-box">
             <div class="table-box-style">
                 <div class="left-title-style">基础项目：</div>
                 <div class="right-style">
                     <el-table 
                        :data="dataList"
                        highlight-current-row
                        show-summary
                        :class="{'tabLayout':isList}"
                        border>
                        <el-table-column label="基本项目" prop="client" align="center" show-overflow-tooltip />
                        <el-table-column label="金额（未税）" prop="noSum" align="center" show-overflow-tooltip />
                        <el-table-column label="金额（已税）" prop="sum" align="center" show-overflow-tooltip />
                        <el-table-column label="操作" prop="" align="center" show-overflow-tooltip >
                            <template scope="scope">
                                <el-button type="text" @click="viewRowDetail(scope.row)">查看明细</el-button>
                                <el-button type="text" @click="exportDetails(scope.row)">导出</el-button>
                            </template>
                        </el-table-column>
                     </el-table>
                 </div>
             </div>

             <div class="table-box-style">
                 <div class="left-title-style">赔付：</div>
                 <div class="right-style">
                     <el-table 
                        :data="dataList"
                        highlight-current-row
                        show-summary
                        :class="{'tabLayout':isList}"
                        border>
                        <el-table-column label="赔付" prop="client" align="center" show-overflow-tooltip />
                        <el-table-column label="金额" prop="noSum" align="center" show-overflow-tooltip />
                        <el-table-column label="操作" prop="" align="center" show-overflow-tooltip >
                            <template scope="scope">
                                <el-button type="text" @click="viewRowDetail(scope.row)">查看明细</el-button>
                                <el-button type="text" @click="exportDetails(scope.row)">导出</el-button>
                            </template>
                        </el-table-column>
                     </el-table>
                 </div>
             </div>

             <div class="table-box-style">
                 <div class="left-title-style">其他项目：</div>
                 <div class="right-style">
                     <el-table 
                        :data="dataList"
                        highlight-current-row
                        show-summary
                        :class="{'tabLayout':isList}"
                        border>
                        <el-table-column label="其他项目" prop="client" align="center" show-overflow-tooltip />
                        <el-table-column label="金额" prop="noSum" align="center" show-overflow-tooltip />
                        <el-table-column label="金额" prop="sum" align="center" show-overflow-tooltip />
                        <el-table-column label="操作" prop="" align="center" show-overflow-tooltip >
                            <template scope="scope">
                                <el-button type="text" @click="rowEditEvent(scope.row)">编辑</el-button>
                                <el-button type="text" @click="rowDeleteEvent(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                     </el-table>
                 </div>
             </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data () {
        return {
            isList:true,
            id:'',
            titlname: '',
            dataList:[{
                client:'快递费',
                noSum:'12000',
                sum:'123000'
            }]
        }
    },
    created () {
        this.id = this.$route.query.id;
        this.titlname = this.$route.query.id;
    },
    methods: {
        // 返回
        goBack(){
           this.$router.go(-1)
        },
        //导出账单及明细
        exportDetail(){
           console.log('导出账单及明细')
        },
        // 导出
        exportDetails(row){
           console.log(row)
        },
        //查看明细
        viewRowDetail(row){
           console.log(row)
        },
        //编辑
        rowEditEvent(row){
            console.log(row)
        },
        //删除
        rowDeleteEvent(row){
            console.log(row)
        },
    }
}
</script>

<style lang="scss" scoped>
.title-box{
   width: calc(100% - 20px);
   display: flex;
   justify-content:space-between;
   align-items: center;
   padding-right:10px;
   padding-left:16px;
   box-sizing: border-box;
   background-color: #ececec;
   line-height: 60px;
   margin-top: 20px;
}
.sum-box{
    width: calc(100% - 20px);
    line-height: 60px;
    border-bottom: 1px dashed #afafaf;
    padding-left:16px;
    box-sizing: border-box;
    .sun-number-style{
        color: #ef5a33;
        font-size: 18px;
        font-weight: bold;
    }
}
.detail-box{
    width: calc(100% - 20px);
    padding: 20px;
    box-sizing: border-box;
    // border-bottom: 1px dashed #afafaf;
}
.record-box{
   border-bottom: none;
   .right-style div{
       color: #76768e;
       line-height: 28px;
       font-size: 14px;
       .btn{
           color: #20a0ff;
       }
   }
}
.table-box-style{
    width: 100%;
    display: flex;
    margin-bottom: 30px;
    .right-style{
        // flex: 1;
        width: 80%;
    }
}
.left-title-style{
    width: 100px;
}
</style>