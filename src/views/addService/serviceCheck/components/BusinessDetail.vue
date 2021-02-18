<template>
  <div class="right-bg-box">
    <el-form :model="serviceRecord" label-width="100px">
      <div class="tablecontent">
        <p class="titletex">申请信息</p>
        <hr class="hrcss" />
        <el-form-item label="申请编号：" class="itemwidth">
          <span v-if="!serviceRecord.serviceNumber">暂无</span>
          <span v-else>{{serviceRecord.serviceNumber}}</span>
        </el-form-item>
        <el-form-item label="客户名称：" class="itemwidth">
          <span v-if="!serviceRecord.customerName">暂无</span>
          <span v-else>{{serviceRecord.customerName}}</span>
        </el-form-item>
        <el-form-item label="申请人：" class="itemwidth">
          <span v-if="!serviceRecord.submitUser">暂无</span>
          <span v-else>{{serviceRecord.submitUser}}</span>
        </el-form-item>
        <el-form-item label="申请时间：" class="itemwidth">
          <span v-if="!serviceRecord.submitTime">暂无</span>
          <span v-else>{{serviceRecord.submitTime}}</span>
        </el-form-item>
        <!-- <el-form-item> -->
        <el-table
          :key="tableKey"
          :data="serviceRecord.serviceDetailList"
          v-loading="loading.tableKeyLoading"
          border
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column align="center" label="客户申请信息">
            <el-table-column align="center" label="增值服务项目" show-overflow-tooltip width="120">
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.serviceName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="单位" show-overflow-tooltip width="70">
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.serviceUnit}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="官方单价" show-overflow-tooltip width="100">
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.servicePrice}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="数量" show-overflow-tooltip width="70">
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.serviceQuantity}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="总价" show-overflow-tooltip width="120">
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.totalPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="仓库是否参与" show-overflow-tooltip width="125">
              <template scope="scope">
                <span style="cursor: pointer;" v-if="scope.row.isWmsOperate == 0">否</span>
                <span style="cursor: pointer;" v-if="scope.row.isWmsOperate == 1">是</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="实际信息">
            <el-table-column align="center" label="实际单价" show-overflow-tooltip width="100">
              <template scope="scope">
                <span v-if="!scope.row.actualServicePrice">暂无</span>
                <span style="cursor: pointer;" v-else>{{scope.row.actualServicePrice}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="实际完成数量" show-overflow-tooltip width="125">
              <template scope="scope">
                <span v-if="!serviceRecord.operateTime">暂无</span>
                <span style="cursor: pointer;" v-else>{{scope.row.actualServiceQuantity}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="总价" show-overflow-tooltip width="120">
              <template scope="scope">
                <span v-if="!serviceRecord.operateTime">暂无</span>
                <span style="cursor: pointer;" v-else>{{scope.row.actualTotalPrice}}</span>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
              <el-form-item label="申请总价（不含税）：" label-width="153px" class="tablebottom">
            <span v-if="!serviceRecord.serviceTotal">暂无</span>
            <span v-else>{{serviceRecord.serviceTotal}}</span>
          </el-form-item>
          <el-form-item label="实际总价（不含税）：" label-width="153px" class="tablebottom">
            <span v-if="!serviceRecord.payableTotal">暂无</span>
            <span v-else>{{serviceRecord.payableTotal}}</span>
          </el-form-item>
          <el-form-item label="税金：" label-width="153px" class="tablebottom">
            <span v-if="!serviceRecord.serviceTax">暂无</span>
            <span v-else>{{serviceRecord.serviceTax}}</span>
          </el-form-item>
          <el-form-item label="实际总价（含税）：" label-width="153px" class="tablebottom">
            <span v-if="!serviceRecord.payableTaxTotal">暂无</span>
            <span v-else>{{serviceRecord.payableTaxTotal}}</span>
          </el-form-item>
          <el-form-item label="优惠：" label-width="153px" class="tablebottom">
            <span v-if="!serviceRecord.discountPrice">0.00</span>
            <span v-else>{{serviceRecord.discountPrice}}</span>
          </el-form-item>
          <el-form-item label="客户应付金额：" label-width="153px" class="tablebottom redtext">
            <span v-if="!serviceRecord.actualTotal">暂无</span>
            <span v-else>{{serviceRecord.actualTotal}}</span>
          </el-form-item>
      </div>
      <p class="titletex">付款信息</p>
      <hr class="hrcss" />
      <el-form-item label="实付金额：" label-width="100px" class="payform">
        <span v-if="!serviceRecord.payActualTotal">暂无</span>
        <span v-else>{{serviceRecord.payActualTotal}}</span>
      </el-form-item>
      <el-form-item label="备注：" label-width="100px" class="payform">
        <span v-if="!serviceRecord.remark">暂无</span>
        <span v-else>{{serviceRecord.remark}}</span>
      </el-form-item>
      <el-form-item label="付款时间：" label-width="100px" class="payform">
        <span v-if="!serviceRecord.payTime">暂无</span>
        <span v-else>{{serviceRecord.payTime}}</span>
      </el-form-item>
      <el-form-item label="付款凭证：" label-width="100px" class="payform">
        <span v-if="!serviceRecord.payRecord">暂无</span>
        <img v-else :src="serviceRecord.payRecord.payProof" class="avatar" />
      </el-form-item>
      <el-form-item label="操作人：" label-width="100px" class="payform">
        <span v-if="!serviceRecord.payRecord">暂无</span>
        <span v-else>{{serviceRecord.payRecord.payUser}}</span>
      </el-form-item>
    </el-form>
    <p class="titletex">操作记录</p>
    <hr class="hrcss" />
    <div v-for="item in serviceRecord.serviceRecordList" :key="item" class="caozuo">
      <span v-if="item.serviceType ===-2">删除:</span>
      <span v-if="item.serviceType ===-1">撤销:</span>
      <span v-if="item.serviceType ===0">申请:</span>
      <span v-if="item.serviceType ===1">核对:</span>
      <span v-if="item.serviceType ===2">核对:</span>
      <span v-if="item.serviceType ===3">仓库作业信息:</span>
      <span v-if="item.serviceType ===4">修改单价:</span>
      <span v-if="item.serviceType ===5">优惠:</span>
      <span v-if="item.serviceType ===6">收款:</span>
      <span>{{item.serviceExplain}},</span>
      <span>操作人【{{item.createUser}}】,</span>
      <span>操作时间【{{item.createTime}}】</span>
      <br />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "BusinessDetail",
  props: {
    serviceRecord: { type: Object }
  },
  data() {
    return {
      formTable: {
        id: ""
      },
      loading: {
        tableKeyLoading: false
      },
      tableKey: 0,
      listitem: [],
      rules: {}
    };
  },
  computed: {
    lineHeight() {
      return window.screen.height;
    }
  },
  methods: {},
  mounted() {
    //   左侧tree的高度自适应
    // let self = this
    // this.$refs.wAuto.style.height = window.innerHeight * 0.6 + "px"
    // window.onresize = () => {
    //   self.$refs.wAuto.style.height = window.innerHeight * 0.6 + "px"
    // }
  }
};
</script>
<style scoped>
.right-bg-box {
  width: 100%;
  z-index: -1;
  margin: 0 auto;
  /* margin-top: -20px; */
}
.itemwidth {
  width: 45%;
  display: block;
  float: left;
  margin-bottom: 5px;
}
.titletex {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0;
}
.hrcss {
  border: 0;
  border-top: #ccc 1px dashed;
  height: 1px;
}
.tablebottom {
  width: 100%;
  overflow: hidden;
  margin-bottom: 0;
}
.paycss {
  margin-top: 25px;
}
.payform {
  margin-bottom: 0;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.caozuo {
  font-size: 13px;
  color: #999;
  line-height: 25px;
}
.redtext {
  color: red;
  font-weight: bold;
}
</style>