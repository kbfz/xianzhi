<template>
  <div>
    <div class="topDetai">
      <div class="leftDetail">
        <!-- <router-link to="/index/purchase/applications"> -->
        <el-button type="primary" @click="returnbtn()">
          <i class="el-icon-arrow-left"></i>返回采购单列表
        </el-button>
        <!-- </router-link> -->
      </div>
      <div class="order_top">
        <div>
          <h4 class="topfont">总览</h4>
          <img src="../../../../assets/images/u34.png" alt class="topImg" />
        </div>
        <ul class="orderul">
          <li class="orderTop">
            <div>
              <p class="topNum">
                <countTo
                  class="info-item-num"
                  :startVal="0"
                  :endVal="orderNum.saleQuantity"
                  :duration="2400"
                ></countTo>
              </p>
              <span class="topText">已售数量</span>
            </div>
          </li>
          <li class="orderTop">
            <div>
              <p class="topNum">
                <countTo
                  class="info-item-num"
                  :startVal="0"
                  :endVal="orderNum.stockQuantity"
                  :duration="2400"
                ></countTo>
              </p>
              <span class="topText">库存余量</span>
            </div>
          </li>
          <!-- <li class="orderTop">
            <div>
              <p class="topNum">
                <countTo class="info-item-num"
                         :startVal='0'
                         :endVal='orderNum.saleAmount'
                         :duration='2400'
                         :decimals='2'></countTo>
              </p>
              <span class="topText">订单总收入</span>
            </div>
          </li> -->
          <li class="orderTop">
            <div>
              <p class="topNum">
                <countTo
                  class="info-item-num"
                  :startVal="0"
                  :endVal="orderNum.orderProfitTotal"
                  :duration="2400"
                  :decimals="2"
                ></countTo>
              </p>
              <span class="topText">订单总利润</span>
            </div>
          </li>
          <li class="orderTop">
            <div>
              <p class="topNum">
                <countTo
                  class="info-item-num"
                  :startVal="0"
                  :endVal="orderNum.purchaseAmountTotal"
                  :duration="2400"
                  :decimals="2"
                ></countTo>
              </p>
              <span class="topText">采购总支出</span>
            </div>
          </li>
          <li class="orderTop">
            <el-tooltip
              class="item"
              effect="dark"
              content="采购单利润=订单总利润-采购总支出"
              placement="right-end"
            >
              <div>
                <p class="topNum">
                  <countTo
                    class="info-item-num"
                    :startVal="0"
                    :endVal="orderNum.purchaseProfitTotal"
                    :duration="2400"
                    :decimals="2"
                  ></countTo>
                </p>
                <span class="topText">采购单利润</span>
              </div>
            </el-tooltip>
          </li>
        </ul>
      </div>
    </div>
    <div class="tableDetail">
      <div class="mb20">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="销售订单" name="first">
            <el-table
              :key="tableKey"
              :data="list"
              v-loading.body="listLoading"
              border
              fit
              highlight-current-row
              style="width: 100%;overflow:hidden"
            >
              <el-table-column
                width="100"
                align="center"
                label="序号"
                type="index"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column width="200" align="center" label="订单编号" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.orderNo}}</span>
                </template>
              </el-table-column>
              <el-table-column width="200" align="center" label="商品条码" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.productBarcode}}</span>
                </template>
              </el-table-column>
              <el-table-column width="200" align="center" label="商品名称" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.productName}}</span>
                </template>
              </el-table-column>
              <el-table-column width="180" align="center" label="商品数量" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.productNumber}}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column width="200" align="center" label="商家实收金额" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.actualAmount}}</span>
                </template>
              </el-table-column>-->
              <el-table-column width="200" align="center" label="所属平台" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.platformName}}</span>
                </template>
              </el-table-column>
              <el-table-column width="200" align="center" label="货币类型" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.currencyName}}</span>
                </template>
              </el-table-column>
              <el-table-column width="200" align="center" label="订单收入" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.orderAmount}}</span>
                </template>
              </el-table-column>
              <el-table-column width="200" align="center" label="平台支出" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.payTotal}}</span>
                </template>
              </el-table-column>
              <el-table-column width="200" align="center" label="税费" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.productTaxs}}</span>
                </template>
              </el-table-column>
              <el-table-column width="200" align="center" label="运费" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.postFee}}</span>
                </template>
              </el-table-column>
               <el-table-column width="200" align="center" label="订单利润" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.orderProfit}}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column width="200" align="center" label="商品采购价" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.purchaseAmount}}</span>
                </template>
              </el-table-column> -->
              <!-- <el-table-column width="200" align="center" label="订单净收入" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.orderNetProfit}}</span>
                </template>
              </el-table-column> -->
              <el-table-column width="200" align="center" label="订单交易时间" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.orderTime}}</span>
                </template>
              </el-table-column>
              <el-table-column width="200" align="center" label="上传时间" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.createTime}}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column min-width="150px"
                               align="center"
                               label="操作"
                               fixed="right"
                               show-overflow-tooltip>
                <template scope="scope">
                  <el-button type="text"
                             @click="payTax(scope.row)">编辑</el-button>
                  <el-button type="text"
                             @click="handleDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>-->
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
          </el-tab-pane>
          <el-tab-pane label="分销订单" name="second">
            <el-table :data="distrList"
                    v-loading="distrTableLoading"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%"
                    :height="elTableMediaHeight">
            <el-table-column width="200"
                             align="center"
                             label="订单编号"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.orderNo}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120"
                             align="center"
                             label="所属平台"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.platformName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="170"
                             align="center"
                             label="商品名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.productName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120"
                             align="center"
                             label="商品条码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.productBarcode}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100"
                             align="center"
                             label="商品数量"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.productNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100"
                             align="center"
                             label="货币类型 "
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.currencyName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100"
                             align="center"
                             label="采购价"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.payTotal}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100"
                             align="center"
                             label="供货价"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.orderAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120"
                             align="center"
                             label="分销利润"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.orderProfit}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150"
                             align="center"
                             label="分销备注"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.remark}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120"
                             align="center"
                             label="回款账户"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.receiveAccount}}</span>
              </template>
            </el-table-column>
             <el-table-column width="147"
                             align="center"
                             label="订单交易时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.orderTime}}</span>
              </template>
            </el-table-column>
            <el-table-column width="147"
                             align="center"
                             label="上传时间"
                             show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.createTime}}</span>
              </template>
            </el-table-column>
          </el-table>
            <div class="pagination-container">
              <el-pagination
                @size-change="handleSizeChangeDistr"
                @current-change="handleCurrentChangeDistr"
                :current-page.sync="distrQuery.page"
                :page-size="distrQuery.limit"
                layout="total, prev, pager, next, jumper"
                :total="distrTotal"
              ></el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="采购单支出" name="third">
            <el-table
              :key="tableKey"
              :data="purchaseList"
              v-loading.body="purchaseLoading"
              border
              fit
              highlight-current-row
              style="width: 100%;overflow:hidden"
            >
              <el-table-column
                width="100"
                align="center"
                label="序号"
                type="index"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column width="200" align="center" label="付款单编号" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.payNo}}</span>
                </template>
              </el-table-column>
              <el-table-column width="200" align="center" label="所属采购单编号" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.purchaseNo}}</span>
                </template>
              </el-table-column>
              <el-table-column width="200" align="center" label="款项名称" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.payName}}</span>
                </template>
              </el-table-column>
               <el-table-column width="120" align="center" label="货币类型" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.currencyName}}</span>
              </template>
            </el-table-column>
              <el-table-column width="180" align="center" label="支出金额" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.payAmount}}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column width="200" align="center" label="商家实收金额" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.actualAmount}}</span>
                </template>
              </el-table-column>-->
              <el-table-column width="200" align="center" label="经办人" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.payeeName}}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column width="200" align="center" label="申请人" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.applyName}}</span>
                </template>
              </el-table-column> -->
              <el-table-column width="200" align="center" label="款项备注" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.remark}}</span>
                </template>
              </el-table-column>
              <el-table-column width="200" align="center" label="打款时间" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{scope.row.payTime}}</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-container">
              <el-pagination
                @size-change="handleSizePurchase"
                @current-change="handleCurrentPurchase"
                :current-page.sync="purchaseQuery.page"
                :page-size="purchaseQuery.limit"
                layout="total, prev, pager, next, jumper"
                :total="purchaseTotal"
              ></el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getObjList,
  retailPage,
  purchasePage,
  distrPage
} from "api/purchase/application/index";
import { mapGetters } from "vuex";
import { getToken } from "utils/auth";
import countTo from "vue-count-to";
var dateUtils = require("silly-datetime");
import { floatSub } from "utils/index";
export default {
  name: "bdSupplier",
  components: { countTo },
  data() {
    return {
      activeName: "first",
      orderNum: {
       orderProfitTotal: 0,
       purchaseAmountTotal: 0,
       purchaseProfitTotal: 0,
       saleQuantity: 0,
       stockQuantity: 0
      },
      list: [],
      distrList:[],
      total: null,
      listLoading: false,
      purchaseLoading: false,
      distrTableLoading:false,
      query: {
        id: "",
        purchaseNo: ""
      },
      roleId: "",
      listQuery: {
        page: 1,
        limit: 10,
        orderBy: "createTimedesc"
      },
      purchaseQuery: {
        page: 1,
        limit: 10,
        orderBy: "createTimedesc"
      },
      distrQuery: {
        page: 1,
        limit: 10,
        orderBy: "createTimedesc"
      },
      listDetail: [],
      purchaseList: [],
      purchaseTotal: 0,
      tableKey: 0,
      orderObj: {},
      distrTotal:0
    };
  },
  computed: {
    ...mapGetters(["elements"])
  },
  created() {
    if (window.sessionStorage.getItem("purchaseNo")) {
      this.query.purchaseNo = window.sessionStorage.getItem("purchaseNo");
      this.getList();
    }
    if (window.sessionStorage.getItem("id")) {
      this.query.id = window.sessionStorage.getItem("id");
      this.orderSearch();
    }
    if (window.sessionStorage.getItem("roleId")) {
      this.roleId = window.sessionStorage.getItem("roleId");
    }
  },
  methods: {
    orderSearch() {
      let param = {
        id: $.trim(this.query.id),
      };
      getObjList(param).then(response => {
        if(response.rel){
          this.orderNum = response.data
        }
      });
    },
    getList() { 
      this.listLoading = true;
      let param = {
        purchaseNo:this.query.purchaseNo,
        ...this.listQuery
      };
      retailPage(param).then(response => {
        this.listLoading = false;
        if(response.rel){
        this.list = response.data.rows;
        this.total = response.data.total; 
        }         
      });
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    //分销
    getListDistr() { 
      this.distrTableLoading = true;
      let param = {
        purchaseNo:this.query.purchaseNo,
        ...this.listQuery
      };
      distrPage(param).then(response => {
        this.distrTableLoading = false;
        if(response.rel){
        this.distrList = response.data.rows;
        this.distrTotal = response.data.total; 
        }         
      });
    },
    handleSizeChangeDistr(val) {
      this.DistrQuery.limit = val;
      this.getListDistr();
    },
    handleCurrentChangeDistr(val) {
      this.DistrQuery.page = val;
      this.getListDistr();
    },
    // 分销分页
    purchaseOrder() {
      this.purchaseLoading = true;
      let param = {
        purchaseId: $.trim(this.query.id),
        ...this.purchaseQuery
      };
      purchasePage(param).then(res => {
        this.purchaseLoading = false;
        this.purchaseList = res.data.rows;
        this.purchaseTotal = res.data.total;
      });
    },
    handleSizePurchase() {
      this.purchaseQuery.limit = val;
      this.purchaseOrder();
    },
    handleCurrentPurchase(val) {
      this.purchaseQuery.page = val;
      this.purchaseOrder();
    },
    handleClick(tab, event) {
      if (tab.name == "first") {
        this.getList();
      } else if(tab.name == "second"){
        this.getListDistr();
      } else {
        this.purchaseOrder();
      }
    },
    returnbtn() {
      let self = this;
      if (this.roleId == 1) {
        self.$router.push("/index/purchase/applications");
         window.sessionStorage.removeItem("purchaseNo");
         window.sessionStorage.removeItem("id");
         window.sessionStorage.removeItem("roleId");
      } else if (this.roleId == 2) {
        self.$router.push("/index/purchase/commodity");
        window.sessionStorage.removeItem("purchaseNo");
         window.sessionStorage.removeItem("id");
         window.sessionStorage.removeItem("roleId");
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.order_top {
  width: 99%;
  height: 200px;
  margin: 40px auto;
  margin-bottom: 20px;
  border: 1px solid #d4d4d4;
  .topfont {
    margin-left: 20px;
    margin-top: 20px;
    font-size: 17px;
    float: left;
    color: #7f7f7f;
  }
  .topImg {
    margin-top: 17px;
  }
  .orderul {
    height: 180px;
    width: 100%;
    // margin-top: 40px;
  }
  .orderTop {
    float: left;
    width: 16.5%;
    text-align: center;
    div {
      width: 120px;
      height: 120px;
      text-align: center;
      border: 1px solid #dddddd;
      border-radius: 60px;
      margin: 0 auto;
      .topNum {
        font-size: 18px;
        color: rgb(109, 186, 255);
        margin-top: 45px;
        margin-bottom: 0;
      }
      .topText {
        display: inline-block;
        margin-top: 5px;
      }
    }
  }
}
.topDetai {
  width: 99%;
  overflow: hidden;
  margin: 0 auto;
  // padding-bottom: 20px;
}
.leftDetail {
  float: left;
  margin-left: 8px;
}
.rightDetail {
  float: right;
  font-size: 14px;
  height: 36px;
  line-height: 36px;
  color: #333;
}
.listDetail {
  width: 99%;
  margin: 0 auto;
  border: 1px solid #eef1f6;
  height: 100px;
}
.listDetail ul li {
  float: left;
  margin-top: 7px;
  color: #333;
}
.listDetail ul li span {
  display: block;
  line-height: 27px;
}
.ml30 {
  margin-left: 50px;
}
.boldText {
  font-size: 16px;
  font-weight: bold;
}
.fzText {
  font-size: 14px;
}
.tableDetail {
  width: 99%;
  margin: 0 auto;
  overflow: hidden;
  margin-top: -15px;
}
.mb20 {
  margin-bottom: 15px;
}
.pagination-container {
  margin-top: 20px;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  border: 1px dashed #bfcbd9;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
.warnText {
  display: inline-block;
  margin-top: 18px;
}
.addText {
  display: block;
  font-size: 12px;
  margin-top: 10px;
  color: #999;
}
.xhText {
  position: relative;
  top: 11px;
  left: 73px;
  color: red;
}
.ml45 {
  position: relative;
  top: 16px;
  left: 46px;
}
</style>

