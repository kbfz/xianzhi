<template>
  <div class="dashboard-main clearfix">
    <h4>待确认回款</h4>
    <div class="filter-container" style="padding-bottom: 10px;">
      <!-- <div class="topCategory">回款类别</div> -->
      <div class="topContent">
        <span class="topCategory">回款类别(元)</span>
        <span
          v-for="(item,index) in categoryList"
          :key="index"
          v-show="categoryList.length > 0"
        >{{item.receiveAccount}}: {{item.returnAmount}}</span>
        <span v-if="categoryList.length == 0">暂无回款类别</span>
      </div>
    </div>
    <div style="display: block;overflow: hidden">
      <!-- <h5 style="margin:0;margin-bottom: 10px">待确认结算单</h5> -->
      <el-badge :value="dataArr.length" style="margin-top: 10px">
        <el-button :disabled="dataArr.length == 0" @click="rollbackSettle">撤回结算申请</el-button>
      </el-badge>
      <el-badge :value="dataArr.length" style="margin-top: 10px">
        <el-button
          type="primary"
          @click="receivables"
          :disabled="dataArr.length == 0"
          style="margin-left: 10px"
        >确认收款</el-button>
      </el-badge>
      <el-table
        :data="list"
        v-loading="loading.tableLoading"
        element-loading-text="正在加载中......"
        border
        fit
        highlight-current-row
        style="width: 100%;margin-top: 15px;overflow:hidden"
        @row-click="detailName"
        @selection-change="chooseData"
      >
        <el-table-column type="selection" width="55" ></el-table-column>
        <el-table-column align="center" type="expand" >
          <template scope="scope">
            <el-table
              border
              style="width:90%"
              :data="scope.row.childrenList"
              v-loading="loading.childrenLoading"
              element-loading-text="正在加载中......"
              id="tableCenter"
            >
              <el-table-column label="序号" width="70" align="center" type="index"></el-table-column>
              <el-table-column
                label="订单编号"
                width="180"
                align="center"
                show-overflow-tooltip
                prop="orderNo"
              ></el-table-column>
              <el-table-column
                label="商品条码"
                width="150"
                align="center"
                prop="productBarcode"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="商品名称"
                width="170"
                align="center"
                show-overflow-tooltip
                prop="productName"
              ></el-table-column>

              <el-table-column
                label="商品数量"
                width="100"
                align="center"
                prop="productNumber"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="所属平台"
                width="100"
                align="center"
                prop="platformName"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="货币类型"
                width="100"
                align="center"
                prop="currencyName"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="订单收入"
                width="120"
                align="center"
                prop="orderAmount"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="平台支出"
                width="120"
                align="center"
                prop="payTotal"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="税费"
                width="100"
                align="center"
                prop="productTaxs"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="运费"
                width="105"
                align="center"
                prop="postFee"
                show-overflow-tooltip
              ></el-table-column>
              <!-- <el-table-column
                    label="其他杂费"
                    width="102"
                    align="center"
                    prop="otherCost"
                    show-overflow-tooltip
              ></el-table-column>-->
              <el-table-column
                label="订单利润"
                width="102"
                align="center"
                prop="orderProfit"
                show-overflow-tooltip
              ></el-table-column>
              <!-- <el-table-column
                label="商品采购价"
                width="122"
                align="center"
                prop="purchaseAmount"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="订单净收入"
                width="122"
                align="center"
                prop="orderNetProfit"
                show-overflow-tooltip
              ></el-table-column> -->
              <el-table-column
                label="订单交易时间"
                width="170"
                align="center"
                prop="orderTime"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                label="上传时间"
                width="170"
                align="center"
                prop="createTime"
                show-overflow-tooltip
              ></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column width="210" align="center" label="结算单编号" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.settleNo}}</span>
          </template>
        </el-table-column>
        <el-table-column width="170" align="center" label="提现时间" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.settleTime}}</span>
          </template>
        </el-table-column>
        <el-table-column width="130" align="center" label="所属平台" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.platformName}}</span>
          </template>
        </el-table-column>
         <el-table-column width="118" align="center" label="回款账户" show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.receiveAccount}}</span>
          </template>
        </el-table-column>
           <el-table-column width="118" align="center" label="业务类型" show-overflow-tooltip>
          <template scope="scope">
            <span v-if="scope.row.settleType === '0'">非分销单</span>
            <span v-if="scope.row.settleType === '1'">分销单</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="货币类型" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.currencyName}}</span>
          </template>
        </el-table-column>
        <el-table-column width="133" align="center" label="订单总收入" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.orderAmountTotal}}</span>
          </template>
        </el-table-column>
        <el-table-column width="130" align="center" label="平台总支出" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.payTotal}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100" align="center" label="其他扣款" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.couponAmount}}</span>
          </template>
        </el-table-column>
       
        <el-table-column width="120" align="center" label="回款总额" show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.returnAmount}}</span>
          </template>
        </el-table-column>
        
        <el-table-column width="130" align="center" label="订单总利润" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.orderProfitTotal}}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="提现手续费" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.cashoutAmount}}</span>
          </template>
        </el-table-column>
        
        <el-table-column width="118" align="center" label="结算单状态" show-overflow-tooltip>
          <template scope="scope">
            <span v-if="scope.row.settleStatus === '0'">未提交</span>
            <span v-if="scope.row.settleStatus === '1'">已提交</span>
            <span v-if="scope.row.settleStatus === '2'">已确认</span>
          </template>
        </el-table-column>
        <el-table-column width="170" align="center" label="创建时间" show-overflow-tooltip>
          <template scope="scope">
            <span style="cursor: pointer;">{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="回款凭证" show-overflow-tooltip fixed="right">
          <template scope="scope">
            <el-button type="text" @click="lookAttachment(scope.row)">查看凭证</el-button>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="实收金额" show-overflow-tooltip fixed="right">
          <template scope="scope">
            <el-button
              type="text"
              v-if="!scope.row.receivedAmount"
              @click="fillAmount(scope.row)"
            >填写金额</el-button>
            <el-button
              type="text"
              v-else
              @click="changeAmount(scope.row)"
            >{{scope.row.receivedAmount}}</el-button>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="实收凭证" show-overflow-tooltip fixed="right">
          <template scope="scope">
            <!-- <el-button type="text" v-if="scope.row.receiveCert" @click="lookImg(scope.row)">查看凭证</el-button> -->
            <span v-if="scope.row.receiveCertNo" @click="lookImg(scope.row)" style="color:#20a0ff; cursor: pointer;">{{scope.row.receiveCertNo}}</span>
            <el-button type="text" v-else @click="uploadImg(scope.row)">填写凭证号</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.page"
          :page-size="listQuery.limit"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 实收金额 -->
    <el-dialog
      title="实收金额"
      :visible.sync="dialogVisibleMoney"
      :before-close="closeDialogExportMoney"
      :close-on-click-modal="false"
      class="receiptWidth450"
    >
      <span style="margin-left: 10px;font-size: 14px;color: #48576a;">财务实收：</span>
      <el-input v-model="formMoney.receivedAmount" style="width: 300px"></el-input>
      <div slot="footer" class="dialog-footer center">
        <el-button @click="closeDialogExportMoney">取消</el-button>
        <el-button type="primary" @click="sumbitAmount">保存</el-button>
      </div>
    </el-dialog>
    <!-- 确认收款 -->
    <el-dialog
      :title="voucherTitle"
      :visible.sync="dialogVisible"
      :before-close="closeDialogExport"
      :close-on-click-modal="false"
      class="receiptWidth450"
    >
      <el-upload
        class="avatar-uploader"
        :action="imageUrl"
        :headers="accessToken"
        :show-file-list="false"
        :multiple="true"
        :auto-upload="true"
        :on-success="handleSuccess"
        :before-upload="handleBefore"
        :on-error="handleError"
        style="margin-left:100px"
      >
        <img v-if="form.payProof" :src="form.payProof" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer center">
        <el-button @click="closeDialogExport">取消</el-button>
        <el-button type="primary" v-if="uploadFirst" @click="sumbitAddForm">上传</el-button>
        <el-button type="primary" v-if="alginUpload" @click="sumbitAddForm">重新上传</el-button>
      </div>
    </el-dialog>
    <!-- 实收凭证号 -->
    <el-dialog
      :title="voucherTitle"
      :visible.sync="dialogVisibleHao"
      :before-close="closeDialogExportHao"
      :close-on-click-modal="false"
      class="receiptWidth450"
    >
      <el-form
        :model="formHao"
        class="customerdata"
        label-width="100px"
      >
        <el-form-item label="凭证号:" style="margin-bottom: 22px">
          <el-input v-model="formHao.receiveCertNo" placeholder="请输入凭证号" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer center">
        <el-button @click="closeDialogExportHao">取消</el-button>
        <el-button type="primary" @click="sumbitAddForm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  unComfiredPacketObj,
  pageObj,
  childPage,
  submitFinishObj,
  rollbackSettleObj,
  orderImgExportUrl,
  updateObj
} from "api/purchase/revenue/index";
import { getToken } from "utils/auth";
var dateUtils = require("silly-datetime");
export default {
  name: "dashboard",
  data() {
    return {
      imageUrl: orderImgExportUrl,
      accessToken: {
        accessToken: getToken()
      },
      list: [],
      listQuery: {
        _type_: "equal",
        page: 1,
        limit: 10
      },
      dialogVisible: false,
      tableData: [],
      dialogImageUrl: "",
      dialogVisibleImg: false,
      dialogVisibleMoney: false,
      categoryList: [],
      loading: {
        tableLoading: false,
        childrenLoading: false
      },
      dataArr: [],
      form: {
        payProof: "",
        id: ""
      },
      formMoney: {
        id: "",
        receivedAmount: ""
      },
      uploadFirst: false,
      alginUpload: false,
      voucherTitle: "回款凭证",
       dialogVisibleHao:false,
      formHao:{
        receiveCertNo:'',
        id:''
      }
    };
  },
  mounted() {},
  methods: {
    //回款类别
    unComfiredPacket() {
      let param = {};
      unComfiredPacketObj(param).then(res => {
        if (res.rel) {
          this.categoryList = res.data;
        }
      });
    },
    // 待确认结算单 分页
    confirmedPage() {
      let param = {
        settleStatus: 1,
        // settleType: 0,
        times:localStorage.getItem('time'),
        ...this.listQuery
      };
      this.loading.tableLoading = true;
      pageObj(param).then(response => {
        this.loading.tableLoading = false;
        if (response.rel) {
          for (var i = 0; i < response.data.rows.length; i++) {
            response.data.rows[i].childrenList = [];
          }
          this.list = response.data.rows;
          this.total = response.data.total;
          this.loading.tableLoading = false;
        }
      });
    },
    // 查看详情
    detailName(row) {
      this.loading.childrenLoading = true;
      let param = {
        settleId: row.id
      };
      childPage(param).then(response => {
        this.loading.childrenLoading = false;
        row.childrenList = response.data;
      });
    },
    // 勾选数据
    chooseData(val) {
      this.dataArr = val;
    },
    closeDialogExport() {
      this.dialogVisible = false;
    },
    closeDialogExportHao(){
      this.dialogVisibleHao = false;
    },
    // 结算单回款凭证
    uploadImg(row) {
      this.voucherTitle = "实收凭证";
      this.dialogVisibleHao = true;
      this.formHao.receiveCertNo = "";
      this.formHao.id = row.id;
    },
    // 回款凭证
    lookAttachment(row) {
      this.voucherTitle = "回款凭证";
      this.form.payProof = "";
      this.dialogVisible = true;
      this.form.id = row.id;
      this.form.payProof = row.returnCert;
      this.uploadFirst = false;
      this.alginUpload = true;
    },
    // 查看凭证
    lookImg(row) {
      this.voucherTitle = "实收凭证";
      this.dialogVisibleHao = true;
      this.formHao.id = row.id;
      this.formHao.receiveCertNo = row.receiveCertNo;
    },
    // 实收金额
    closeDialogExportMoney() {
      this.dialogVisibleMoney = false;
    },
    fillAmount(row) {
      this.formMoney.receivedAmount = "";
      this.dialogVisibleMoney = true;
      this.formMoney.id = row.id;
    },
    changeAmount(row) {
      this.formMoney.receivedAmount = "";
      this.dialogVisibleMoney = true;
      this.formMoney.id = row.id;
      this.formMoney.receivedAmount = row.receivedAmount;
    },
    sumbitAmount() {
      if (!this.formMoney.receivedAmount) {
        this.$message({
          message: "金额不能为空",
          type: "error"
        });
        return;
      }
      let reg3 = /^\d+$|^\d+[.]?\d+$/;
      if (reg3.test(this.formMoney.receivedAmount) === false) {
        this.$message({
          message: "实收金额只能为数字！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      let obj = {
        id: this.formMoney.id,
        receivedAmount: this.formMoney.receivedAmount
      };
      updateObj(obj.id, obj).then(res => {
        this.dialogVisibleMoney = false;
        if (res.rel) {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.confirmedPage();
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    // 结算单确认收款
    receivables() {
      for(var i=0; i<this.dataArr.length; i++){
        if(!this.dataArr[i].receivedAmount){
          this.$message({
          message: "实收金额不能为空！",
          type: "error",
          duration: 2000
        });
        return false;
        }
      }
      this.$confirm("请对账户金额进行查收核对后，再进行确认操作?", "确认收款", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let ids = [];
        this.dataArr.map(item => {
          ids.push(item.id);
        });
        let settleAccountParam = {
          ids: ids
        };
        submitFinishObj(settleAccountParam).then(res => {
          if (res.rel) {
            this.$message({
              type: "success",
              message: "确认收款成功!"
            });
            this.confirmedPage();
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
      });
    },
    // 撤销结算申请
    rollbackSettle() {
      this.$confirm("确定要撤销已选中的结算申请吗?", "撤销结算", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let ids = [];
        this.dataArr.map(item => {
          ids.push(item.id);
        });
        let settleAccountParam = {
          ids: ids
        };
        rollbackSettleObj(settleAccountParam).then(res => {
          if (res.rel) {
            this.$message({
              type: "success",
              message: "撤销成功!"
            });
            this.confirmedPage();
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        });
      });
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.confirmedPage();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.confirmedPage();
    },
    //  上传图片
    handleSuccess(response, file) {
      if (response.status === undefined || response.status !== 200) {
        this.$alert(response.msg, "图片上传失败");
        return;
      } else {
        this.form.payProof = response.data;
      }
    },
    handleError(err, file) {
      this.$message({
        title: "error",
        message: err
      });
      console.log(err);
    },
    handleBefore(file) {
      return true;
      const imgPng = file.type === "image/png";
      const imgJpeg = file.type === "image/jpeg";
      const imgSize = file.size / 1024 / 1024 < 2;
      if (!imgPng && !imgJpeg) {
        this.$message.error("图片上传格式不对");
      }
      if (!imgSize) {
        this.$message.error("图片大小不能超过2M");
      }
      return (imgJpeg || imgPng) && imgSize;
    },
    // 上传
    sumbitAddForm() {
      let obj = {};
      if (this.voucherTitle == "回款凭证") {
        obj = {
          id: this.form.id,
          returnCert: this.form.payProof
        };
      } else if (this.voucherTitle == "实收凭证") {
        obj = {
          id: this.formHao.id,
          receiveCertNo: this.formHao.receiveCertNo
        };
      }
      updateObj(obj.id, obj).then(res => {
        this.dialogVisible = false;
        this.dialogVisibleHao = false;
        if (res.rel) {
          this.$message({
            type: "success",
            message: "提交成功!"
          });
          this.confirmedPage();
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    }
  },
  created() {
    this.unComfiredPacket();
    this.confirmedPage();
  }
};
</script>
<style scoped>
.storage-box-right {
  width: 99%;
  overflow: hidden;
  margin: 0 auto;
  border: 1px solid #f2f2f2;
}
.mt30 {
  margin-top: 15px;
  /* background: #eef1f6; */
  /* border-radius: 10px; */
  margin-bottom: 15px;
}
.mt15 {
  /* margin-top: 15px; */
}
.storage-box-right .dashboard-main {
  width: 98%;
  margin: 0 auto;
  padding-bottom: 10px;
  /* margin-top: 15px; */
}
.storage-box-right .dashboard-main h4 {
  color: #333333;
  margin-top: 15px;
  margin-bottom: 15px;
}
.topCategory {
  font-size: 14px;
  font-weight: bold;
  color: #666666;
  float: left;
}
.topContent {
  font-size: 14px;
  color: #666666;
  margin-top: 10px;
  width: 100%;
  overflow: hidden;
}
.topContent span {
  float: left;
  margin-right: 20px;
}
.storage-box-right .dashboard-main .dashboard-main-mokuai {
  border: 1px solid #d8d8d8;
  background-color: #fff;
  color: #797979;
  text-align: center;
  margin: 0 2%;
  width: 200px;
  float: left;
  text-decoration: none;
  height: 200px;
  border-radius: 6px;
  margin-top: 15px;
}
.storage-box-right .dashboard-main .dashboard-main-mokuai p {
  width: 100%;
  background-color: #fff;
  margin: 0;
  margin-top: 35px;
  color: #333333;
  /* border-bottom: 1px solid #d8d8d8; */
  font-size: 17px;
}
.storage-box-right .dashboard-main .dashboard-main-mokuaimoney {
  border: 1px solid #d8d8d8;
  background-color: #fff;
  color: #797979;
  text-align: center;
  margin: 0 1%;
  width: 17%;
  float: left;
  text-decoration: none;
  height: 160px;
}
.storage-box-right .dashboard-main .dashboard-main-mokuaimoney p {
  width: 100%;
  background-color: #f2f2f2;
  margin-top: 0;
  height: 40px;
  line-height: 40px;
  color: #333333;
  border-bottom: 1px solid #d8d8d8;
  font-size: 15px;
}
.dashboard-main-shuzi {
  text-align: center;
  line-height: 65px;
  color: #333333;
  margin: 0;
  padding: 0;
}
.btn {
  width: 120px;
  margin: 0 auto;
  margin-top: 11px;
}
.footer {
  margin-top: 210px;
  font-size: 14px;
  color: #999999;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  border: 1px dashed #d9d9d9;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>