<template>
  <div>
     <el-table
     class="tableNormal" 
     :data="orderList"
       v-loading="loading.tableLoading"
        element-loading-text="正在加载中......"
        border fit 
        highlight-current-row 
        style="width: 100%; " 
        :height="elTableMediaHeight"
        >
       <el-table-column 
        label="订单号"
        align="center"
        prop="orderno"
        min-width="219px">

       </el-table-column>
        <el-table-column 
        label="回执时间"
        align="center"
        prop="receiveTime"
        min-width="219px">
       </el-table-column>
        <el-table-column 
        label="海关申报回执信息"
        align="center"
        prop="customInfo"
        min-width="400px"
        show-overflow-tooltip>
       </el-table-column>
     </el-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data () {
    return {
      loading:{
        tableLoading: false
      },
      orderList: []
    }
  },
    computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
}
</script>
