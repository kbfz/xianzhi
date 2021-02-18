<template>
  <div class="app-container">
    <div>
      <el-button type="primary" @click="goBack">
        <i class="el-icon-arrow-left"></i>返回
      </el-button>
    </div>

    <div class="title-box">
      <div class="title-left-box">
        <span>{{form.customerName}}（{{form.customerCode}}）</span>
        <el-tag style="color:#ffffff;background:#ef5a33;">{{form.month}}账单</el-tag>
      </div>
      <div class="title-right-box">
        <el-button
          type="primary"
          size="mini"
          @click="exportDetail"
          :disabled="detailForm.customerFinanceBill.status != 1"
        >导出账单及明细</el-button>
        <el-dropdown trigger="click" @command="handleCommand">
          <el-button type="primary" size="mini">
            账单处理
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item command="账单更新">账单更新</el-dropdown-item> -->
            <el-dropdown-item command="账单收费标准">账单收费标准</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div v-if="detailForm.customerFinanceBill.status == 2">
      <div class="sum-box" style="border-bottom: none">
        <span>账单重新计算中...</span>
        <el-button type="text" @click="customerBillDetail">刷新</el-button>
      </div>
    </div>
    <div v-else>
      <div class="sum-box">
        <span>实际应收：</span>
        <span class="sun-number-style">{{detailForm.customerFinanceBill.actualReceive}}</span>
      </div>
      <div class="detail-box">
        <div class="table-box-style">
          <div class="left-title-style">基础项目：</div>
          <div class="right-style">
            <el-row>
              <el-col :span="6">
                <div class="baseItem borderRight">
                  <ul>
                    <li class="title">基本项目</li>
                    <li>快递费</li>
                    <li>操作费</li>
                    <li>超额附加费</li>
                    <li>增值服务</li>
                    <li>提货转关</li>
                    <li>退件转寄</li>
                    <li>国际物流</li>
                    <li>包材费</li>
                    <li>仓储费</li>
                    <li>查验费</li>
                    <li style="color:#FF7D27;font-weight: bold">合计</li>
                  </ul>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="baseItem borderRight">
                  <ul>
                    <li class="title">金额（不含税)</li>
                    <li>{{detailForm.customerFinanceBillBasic.postFee}}</li>
                    <li>{{detailForm.customerFinanceBillBasic.operateFee}}</li>
                    <li>{{detailForm.customerFinanceBillBasic.attachFee}}</li>
                    <li>{{detailForm.customerFinanceBillBasic.addedServicesFee}}</li>
                    <li>{{detailForm.customerFinanceBillBasic.transferFee}}</li>
                    <li>{{detailForm.customerFinanceBillBasic.returnFee}}</li>
                    <li>{{detailForm.customerFinanceBillBasic.internationalLogisticsFee}}</li>
                    <li>{{detailForm.customerFinanceBillBasic.packageFee}}</li>
                    <li>{{detailForm.customerFinanceBillBasic.storageFee}}</li>
                    <li>{{detailForm.customerFinanceBillBasic.checkFee}}</li>
                    <li
                      style="color:#FF7D27;font-weight: bold"
                    >{{detailForm.customerFinanceBillBasic.total}}</li>
                  </ul>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="baseItem borderRight">
                  <ul>
                    <li class="title">金额（含税)</li>
                    <li>{{detailForm.customerFinanceBillBasic.postFeeTaxIncluded}}</li>
                    <li>{{detailForm.customerFinanceBillBasic.operateFeeTaxIncluded}}</li>
                    <li>{{detailForm.customerFinanceBillBasic.attachFeeTaxIncluded}}</li>
                    <li>{{detailForm.customerFinanceBillBasic.addedServicesFeeTaxIncluded}}</li>
                    <li>{{detailForm.customerFinanceBillBasic.transferFeeTaxIncluded}}</li>
                    <li>{{detailForm.customerFinanceBillBasic.returnFeeTaxIncluded}}</li>
                    <li>{{detailForm.customerFinanceBillBasic.internationalLogisticsFeeTax}}</li>
                    <li>{{detailForm.customerFinanceBillBasic.packageFeeTaxIncluded}}</li>
                    <li>{{detailForm.customerFinanceBillBasic.storageFeeTaxIncluded}}</li>
                    <li>{{detailForm.customerFinanceBillBasic.checkFeeTaxIncluded}}</li>
                    <li
                      style="color:#FF7D27;font-weight: bold"
                    >{{detailForm.customerFinanceBillBasic.totalTaxIncluded}}</li>
                  </ul>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="baseItem">
                  <ul>
                    <li class="title">操作</li>
                    <li class="postStyle">
                      <el-button type="text" @click="viewRowDetail">查看明细</el-button>
                      <el-button type="text" @click="exportDetails">导出</el-button>
                    </li>
                    <!-- <li>操作费</li> -->
                    <li>
                      <el-button type="text" @click="viewAttachFee">查看明细</el-button>
                      <el-button type="text" @click="exportAttachFee">导出</el-button>
                    </li>
                    <li>
                      <el-button type="text" @click="viewAddedServices">查看明细</el-button>
                      <el-button type="text" @click="exportAddedServices">导出</el-button>
                    </li>
                    <!-- 提货转关 -->
                    <li>
                      <el-button type="text" @click="viewTransferFee">查看明细</el-button>
                      <el-button type="text" @click="exportTransferFee">导出</el-button>
                    </li>
                    <!-- 退件转寄 -->
                    <li>
                      <el-button type="text" @click="viewReturnFee">查看明细</el-button>
                      <el-button type="text" @click="exportReturnFee">导出</el-button>
                    </li>
                    <!-- 国际物流 -->
                    <li>
                      <el-button type="text" @click="viewLogisticsFee">查看明细</el-button>
                      <el-button type="text" @click="exportLogisticsFee">导出</el-button>
                    </li>
                    <!-- 包材费 -->
                    <li>
                      <el-button type="text" @click="viewPackageFee">查看明细</el-button>
                      <el-button type="text" @click="exportPackageFee">导出</el-button>
                    </li>
                    <!-- 仓储费 -->
                    <li>
                      <el-button type="text" @click="viewStorageFee">查看明细</el-button>
                      <el-button type="text" @click="exportStorageFee">导出</el-button>
                    </li>
                    <!-- 查验费 -->
                    <li>
                      <el-button type="text" @click="viewCheckFee">查看明细</el-button>
                      <el-button type="text" @click="exportCheckFee">导出</el-button>
                    </li>
                    <li></li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

        <div class="table-box-style">
          <div class="left-title-style">赔付：</div>
          <div class="right-style">
            <el-row>
              <el-col :span="8">
                <div class="baseItem borderRight">
                  <ul>
                    <li class="title">赔付</li>
                    <li>赔付</li>
                  </ul>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="baseItem borderRight">
                  <ul>
                    <li class="title">金额</li>
                    <li>{{detailForm.pay}}</li>
                  </ul>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="baseItem">
                  <ul>
                    <li class="title">操作</li>
                    <li>
                      <el-button type="text" @click="viewPayDetail">查看明细</el-button>
                      <el-button type="text" @click="exportPayDetails">导出</el-button>
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="table-box-style">
          <div class="left-title-style">其他项目：</div>
          <div class="right-style">
            <el-table
              :data="detailForm.customerFinanceBillOtherList"
              highlight-current-row
              show-summary
              :class="{'tabLayout':isList}"
              border
            >
              <el-table-column label="其他项目" prop="name" align="center" show-overflow-tooltip />
              <!-- <el-table-column label="+ -" prop="noSum" align="center" show-overflow-tooltip /> -->
              <el-table-column label="金额" prop="amount" align="center" show-overflow-tooltip />
              <el-table-column label="操作" prop align="center" show-overflow-tooltip>
                <template scope="scope">
                  <el-button type="text" @click="rowEditEvent(scope.row)">编辑</el-button>
                  <el-button type="text" @click="rowDeleteEvent(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button
              type="text"
              style="margin-top:10px;"
              class="el-icon-plus"
              @click="addProject"
            >添加项目</el-button>
          </div>
        </div>
      </div>
    </div>

  <div class="express mb20">
        <div class="left">操作记录：</div>
        <div class="right">
          <span class="text1" v-for="item in recordList" :key="item.id">{{item.createTime}}，{{item.operationName}}{{item.operationLog}}；</span>
          <el-button type="text" style="font-size: 14px" @click="recordMore">查看更多>></el-button>
        </div>
      </div>

    <!-- 账单更新 -->
    <!-- <el-dialog
      title="账单更新"
      :visible.sync="billDialog"
      :before-close="closeBillDialog "
      :close-on-click-modal="false"
      class="receiptWidth600"
    >
      <el-form label-position="top" :model="billFormSelete">
        <el-form-item label="请选择更新模块：">
          <el-select v-model="billFormSelete.module" placeholder="请选择更新模块">
            <el-option
              v-for="(item,index) in billModule"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="color:#999999">注：历史账单也将更新</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="billCancel">取 消</el-button>
        <el-button type="primary" @click="billConfirm">确 定</el-button>
      </div>
    </el-dialog>-->

    <!-- 快递费操作费明细 -->
    <el-dialog
      :title="titleName"
      :visible.sync="isShowDialog"
      :close-on-click-modal="false"
      :before-close="closeRecharge"
      :class="className"
    >
      <dia-log :billForm="billForm" v-if="titleName == '快递费操作费明细'"></dia-log>
      <attach v-if="titleName == '超额附加费明细'" :billForm="billForm"></attach>
      <added-services v-if="titleName == '增值服务费用明细'" :billForm="billForm"></added-services>
      <transfer-fee v-if="titleName == '提货转关费用明细'" :billForm="billForm"></transfer-fee>
      <return-fee v-if="titleName == '退件转寄费用明细'" :billForm="billForm"></return-fee>
      <logistics-fee v-if="titleName == '国际物流费用明细'" :billForm="billForm"></logistics-fee>
      <package-fee v-if="titleName == '包材费用明细'" :billForm="billForm"></package-fee>
      <storage-fee v-if="titleName == '仓储费用明细'" :billForm="billForm"></storage-fee>
      <check-fee v-if="titleName == '查验费用明细'" :billForm="billForm"></check-fee>
      <pay v-if="titleName == '赔付费用明细'" :billForm="billForm"></pay>
    </el-dialog>
    <!-- 添加项目 -->
    <el-dialog
      :title="addProjectTitle"
      :visible.sync="isShowSelectDialog"
      :before-close="addCloseEvent"
      class="receiptWidth450"
    >
      <el-form :model="projectForm" ref="form" label-width="80px">
        <el-form-item label="项目名称">
          <el-input style="width: 300px" v-model="projectForm.name" placeholder="项目名称"></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input style="width: 300px" v-model="projectForm.amount" placeholder="金额"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCloseEvent">取 消</el-button>
        <el-button type="primary" v-if="addProjectTitle == '添加'" @click="addProjectSave">保存</el-button>
        <el-button type="primary" v-if="addProjectTitle == '编辑'" @click="UpdateProjectSave">保存</el-button>
      </div>
    </el-dialog>

    <!-- 收费标准 -->
    <el-dialog
      :title="computeName"
      :visible.sync="isShowComputeDialog"
      :close-on-click-modal="false"
      :before-close="computeCloseEvent"
      class="fixWidth3 zIndex"
    >
      <compute-dialog
        :formDetail="formDetail"
        :isEdit="isEdit"
        v-loading="formLoading"
        ref="computeForm"
      ></compute-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="computeCloseEvent">取 消</el-button>

        <el-button type="primary" v-if="!isEdit" @click="amendComput">修改并重新计算</el-button>
        <el-button type="primary" v-else @click="saveComputer">确定并重新计算账单</el-button>
      </div>
    </el-dialog>
      <!-- 操作记录查看更多 -->
     <el-dialog
        title="操作记录"
        :visible.sync="dialogFormRecord"
        :before-close="closeRecord"
        class="receiptWidth500"
      >
     <div class="recordStyle" ref="recordStyle">
       <el-table
            :key="tableKey"
            :data="recordMoreList"
            border
            fit
            ref="table"
            highlight-current-row
            :height="tableHeight"
          >
            <el-table-column width="170px" align="center" label="操作时间" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column width="100px" align="center" label="操作人" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.operationName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="337px" align="center" label="操作内容" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.operationLog}}</span>
              </template>
            </el-table-column>
          </el-table>
      </div>
        <div slot="footer" class="dialog-footer center">
          <div class="pagination-container">
            <el-pagination @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page.sync="listQuery.page"
                           :page-sizes="[10,20,30, 50]"
                           :page-size="listQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
          </div>
        </div>
      </el-dialog>
    <div class="model" v-if="modelStatus"></div>
  </div>
</template>

<script>
import diaLog from "./component/dialog"; // 弹框
import attach from "./component/attachFee"; // 弹框
import addedServices from "./component/addedServices"; // 弹框
import transferFee from "./component/transferFee"; // 提货转关
import returnFee from "./component/returnFee"; // 退件转寄
import logisticsFee from "./component/logisticsFee"; // 国际物流
import packageFee from "./component/packageFee"; // 包材费
import storageFee from "./component/storageFee"; // 仓储费
import checkFee from "./component/checkFee"; // 查验费
import pay from "./component/pay"; // 赔付
import computeDialog from "./component/computeDialog"; // 添加项目 弹框
import {
  customerDetail,
  getActiveObj,
  newBill,
  otherAdd,
  otherGet,
  otherDel,
  otherUpdate,
} from "@/api/financialSys/customerBill";
import {  rulePage } from "@/api/financialSys/chargingStandard"
export default {
  components: {
    diaLog,
    computeDialog,
    attach,
    addedServices,
    transferFee,
    returnFee,
    logisticsFee,
    packageFee,
    storageFee,
    checkFee,
    pay,
  },
  data() {
    return {
      titleName: "快递费操作费明细",
      computeName: "计算当前账单的收费标准如下",
      isShowComputeDialog: false,
      isList: true,
      billDialog: false,
      isShowSelectDialog: false,
      addProjectTitle: "添加", // 添加项目的title
      AddFormLists: [], // 添加项目form集合
      billFormSelete: {
        module,
      },
      formLoading: false,
      className: "fixWidth3",
      dialogFormRecord: false,
      // 更新的模块
      billModule: [
        {
          label: "退件转寄",
          value: 1,
        },
        {
          label: "提货转关",
          value: 2,
        },
        {
          label: "赔付",
          value: 3,
        },
        {
          label: "国际物流",
          value: 4,
        },
        {
          label: "包材",
          value: 5,
        },
        {
          label: "仓储",
          value: 6,
        },
        {
          label: "查验",
          value: 7,
        },
      ],
      id: "",
      form: {
        customerName: "",
        // actualReceive: '',
        customerCode: "",
        month: "",
      },
      dataList: [
        {
          client: "快递费",
          noSum: "12000",
          sum: "123000",
        },
      ],
      tableHeight: 450,
      isShowDialog: false,
      detailForm: {
        customerFinanceBill: {
          id: "",
          customerCode: "",
          customerName: "",
          month: "",
          ruleCode: "",
          status: "",
          orderCount: "",
          grabOrderStatus: "",
          actualReceive: "",
          url: "",
          remark: "",
        },
        customerFinanceBillBasic: {
          id: "",
          billId: "",
          postFee: "",
          postFeeTaxIncluded: "",
          operateFee: "",
          operateFeeTaxIncluded: "",
          attachFee: "",
          attachFeeTaxIncluded: "",
          addedServicesFee: "",
          transferFee: "",
          returnFee: "",
          internationalLogisticsFee: "",
          packageFee: "",
          storageFee: "",
          checkFee: "",
          addedServicesFeeTaxInclude: "",
          transferFeeTaxIncluded: "",
          returnFeeTaxIncluded: "",
          internationalLogisticsFeeTax: "",
          packageFeeTaxIncluded: "",
          storageFeeTaxIncluded: "",
          checkFeeTaxIncluded: "",
          total: "",
          totalTaxIncluded: "",
          createTime: "",
        },
      },
      formDetail: {
        customerRuleExpress: {
          firstWeight: "",
          continuedWeight: "",
        },
        customerRuleExpressProvinceList: [],
        customerRuleOperateFeeList: [],
        customerRuleAttachFee: {
          baseCount: "",
          price: "",
        },
        customerRulePackagingList: [],
        customerRuleWarehouseFee: {
          id: "",
          price: "",
          ruleCode: "",
        },
      },
      formActive: {
        customerName: "",
        customerCode: "",
      },
      billForm: {
        id: "",
        billId: "",
        postFee: "",
        operateFee: "",
        attachFee: "",
        addedServicesFee: "",
        customerName: "",
        customerCode: "",
        month: "",
        transferFee: "",
        returnFee: "",
        internationalLogisticsFee: "",
        packageFee: "",
        storageFee: "",
        checkFee: "",
        pay: "",
      },
      isEdit: false,
      modelStatus: false,
      projectForm: {
        id: "",
        name: "",
        amount: "",
      },
      recordList: [],
      recordMoreList:[],
        listQuery: {
        page: 1,
        limit: 10,
        _type_:'equal',
        orderBy: "createTimedesc",
      },
    };
  },
  created() {
    this.id = JSON.parse(window.sessionStorage.getItem("billObj")).id;
    this.form = JSON.parse(window.sessionStorage.getItem("billObj"));
    this.customerBillDetail();
    // this.record()
  },
  methods: {
    // 返回
    goBack() {
      this.$router.go(-1);
    },
    // 获取数据
    customerBillDetail() {
      let query = {
        id: this.id,
      };
      customerDetail(query).then((res) => {
        if (res.rel) {
          this.detailForm = res.data;
          this.$nextTick(() => {
                this.record()
              })
        }
      });
    },
    //导出账单及明细
    exportDetail() {
      window.location.href = this.detailForm.customerFinanceBill.url;
    },
    // 导出操作费
    exportDetails() {
      this.$confirm("确定要导出吗？", "导出", {
        confirmButtonText: "导出",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let query = {
          billId: this.detailForm.customerFinanceBillBasic.billId,
        };
        let host = window.location.host;
        window.location.href =
          "//" +
          host +
          "/api/ordersys/customerFinanceBillOrder/exportPostOperateFee?billId=" +
          query.billId;
      });
    },
    // 导出超额附加税
    exportAttachFee() {
      this.$confirm("确定要导出吗？", "导出", {
        confirmButtonText: "导出",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let query = {
          billId: this.detailForm.customerFinanceBillBasic.billId,
        };
        let host = window.location.host;
        window.location.href =
          "//" +
          host +
          "/api/ordersys/customerFinanceBillOrder/exportAttachFee?billId=" +
          query.billId;
      });
    },
    //查看明细
    viewRowDetail() {
      this.billForm = {};
      this.titleName = "快递费操作费明细";
      this.className = "fixWidth3";
      this.billForm = {
        id: this.detailForm.customerFinanceBillBasic.id,
        billId: this.detailForm.customerFinanceBillBasic.billId,
        postFee: this.detailForm.customerFinanceBillBasic.postFee,
        operateFee: this.detailForm.customerFinanceBillBasic.operateFee,
        attachFee: this.detailForm.customerFinanceBillBasic.attachFee,
        customerName: this.form.customerName,
        customerCode: this.form.customerCode,
        month: this.form.month,
      };
      this.isShowDialog = true;
    },
    // 超额附加税明细
    viewAttachFee() {
      this.billForm = {};
      this.titleName = "超额附加费明细";
      this.className = "receiptSupplier750";
      this.billForm = {
        id: this.detailForm.customerFinanceBillBasic.id,
        billId: this.detailForm.customerFinanceBillBasic.billId,
        postFee: this.detailForm.customerFinanceBillBasic.postFee,
        operateFee: this.detailForm.customerFinanceBillBasic.operateFee,
        attachFee: this.detailForm.customerFinanceBillBasic.attachFee,
        customerName: this.form.customerName,
        customerCode: this.form.customerCode,
        month: this.form.month,
      };
      this.isShowDialog = true;
    },
    // 增值服务税
    viewAddedServices() {
      this.billForm = {};
      this.titleName = "增值服务费用明细";
      this.className = "receiptSupplier750";
      this.billForm = {
        id: this.detailForm.customerFinanceBillBasic.id,
        billId: this.detailForm.customerFinanceBillBasic.billId,
        addedServicesFee: this.detailForm.customerFinanceBillBasic
          .addedServicesFee,
        customerName: this.form.customerName,
        customerCode: this.form.customerCode,
        month: this.form.month,
      };
      this.isShowDialog = true;
    },
    // 导出增值服务费
    exportAddedServices() {
      this.$confirm("确定要导出吗？", "导出", {
        confirmButtonText: "导出",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let query = {
          billId: this.detailForm.customerFinanceBillBasic.billId,
        };
        let host = window.location.host;
        window.location.href =
          "//" +
          host +
          "/api/ordersys/customerFinanceBillService/exportService?billId=" +
          query.billId;
      });
    },
    // 提货转关
    viewTransferFee() {
      this.billForm = {};
      this.titleName = "提货转关费用明细";
      this.className = "receiptSupplier750";
      this.billForm = {
        id: this.detailForm.customerFinanceBillBasic.id,
        billId: this.detailForm.customerFinanceBillBasic.billId,
        transferFee: this.detailForm.customerFinanceBillBasic.transferFee,
        customerName: this.form.customerName,
        customerCode: this.form.customerCode,
        month: this.form.month,
      };
      this.isShowDialog = true;
    },
    // 提货导出
    exportTransferFee() {
      this.$confirm("确定要导出吗？", "导出", {
        confirmButtonText: "导出",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let query = {
          billId: this.detailForm.customerFinanceBillBasic.billId,
        };
        let host = window.location.host;
        window.location.href =
          "//" +
          host +
          "/api/ordersys/customerFinanceBillTransfer/exportTransfer?billId=" +
          query.billId;
      });
    },
    // 退件转寄
    viewReturnFee() {
      this.billForm = {};
      this.titleName = "退件转寄费用明细";
      this.className = "receiptSupplier750";
      this.billForm = {
        id: this.detailForm.customerFinanceBillBasic.id,
        billId: this.detailForm.customerFinanceBillBasic.billId,
        returnFee: this.detailForm.customerFinanceBillBasic.returnFee,
        customerName: this.form.customerName,
        customerCode: this.form.customerCode,
        month: this.form.month,
      };
      this.isShowDialog = true;
    },
    // 退件转寄导出
    exportReturnFee() {
      this.$confirm("确定要导出吗？", "导出", {
        confirmButtonText: "导出",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let query = {
          billId: this.detailForm.customerFinanceBillBasic.billId,
        };
        let host = window.location.host;
        window.location.href =
          "//" +
          host +
          "/api/ordersys/customerFinanceBillReturn/exportReturn?billId=" +
          query.billId;
      });
    },
    // 国际物流
    viewLogisticsFee() {
      this.billForm = {};
      this.titleName = "国际物流费用明细";
      this.className = "receiptSupplier750";
      this.billForm = {
        id: this.detailForm.customerFinanceBillBasic.id,
        billId: this.detailForm.customerFinanceBillBasic.billId,
        internationalLogisticsFee: this.detailForm.customerFinanceBillBasic
          .internationalLogisticsFee,
        customerName: this.form.customerName,
        customerCode: this.form.customerCode,
        month: this.form.month,
      };
      this.isShowDialog = true;
    },
    // 导出
    exportLogisticsFee() {
      this.$confirm("确定要导出吗？", "导出", {
        confirmButtonText: "导出",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let query = {
          billId: this.detailForm.customerFinanceBillBasic.billId,
        };
        let host = window.location.host;
        window.location.href =
          "//" +
          host +
          "/api/ordersys/customerFinanceBillInternational/exportInternational?billId=" +
          query.billId;
      });
    },
    // 包材费
    viewPackageFee() {
      this.billForm = {};
      this.titleName = "包材费用明细";
      this.className = "receiptSupplier750";
      this.billForm = {
        id: this.detailForm.customerFinanceBillBasic.id,
        billId: this.detailForm.customerFinanceBillBasic.billId,
        packageFee: this.detailForm.customerFinanceBillBasic.packageFee,
        customerName: this.form.customerName,
        customerCode: this.form.customerCode,
        month: this.form.month,
      };
      this.isShowDialog = true;
    },
    // 包材费导出
    exportPackageFee() {
      this.$confirm("确定要导出吗？", "导出", {
        confirmButtonText: "导出",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let query = {
          billId: this.detailForm.customerFinanceBillBasic.billId,
        };
        let host = window.location.host;
        window.location.href =
          "//" +
          host +
          "/api/ordersys/customerFinanceBillPackage/exportPay?billId=" +
          query.billId;
      });
    },
    // 仓储费
    viewStorageFee() {
      this.billForm = {};
      this.titleName = "仓储费用明细";
      this.className = "receiptSupplier750";
      this.billForm = {
        id: this.detailForm.customerFinanceBillBasic.id,
        billId: this.detailForm.customerFinanceBillBasic.billId,
        storageFee: this.detailForm.customerFinanceBillBasic.storageFee,
        customerName: this.form.customerName,
        customerCode: this.form.customerCode,
        month: this.form.month,
      };
      this.isShowDialog = true;
    },
    // 仓储导出
    exportStorageFee() {
      this.$confirm("确定要导出吗？", "导出", {
        confirmButtonText: "导出",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let query = {
          billId: this.detailForm.customerFinanceBillBasic.billId,
        };
        let host = window.location.host;
        window.location.href =
          "//" +
          host +
          "/api/ordersys/customerFinanceBillWarehouseFee/exportWarehouseFee?billId=" +
          query.billId;
      });
    },
    // 查验费
    viewCheckFee() {
      this.billForm = {};
      this.titleName = "查验费用明细";
      this.className = "receiptSupplier750";
      this.billForm = {
        id: this.detailForm.customerFinanceBillBasic.id,
        billId: this.detailForm.customerFinanceBillBasic.billId,
        checkFee: this.detailForm.customerFinanceBillBasic.checkFee,
        customerName: this.form.customerName,
        customerCode: this.form.customerCode,
        month: this.form.month,
      };
      this.isShowDialog = true;
    },
    exportCheckFee() {
      this.$confirm("确定要导出吗？", "导出", {
        confirmButtonText: "导出",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let query = {
          billId: this.detailForm.customerFinanceBillBasic.billId,
        };
        let host = window.location.host;
        window.location.href =
          "//" +
          host +
          "/api/ordersys/customerFinanceBillCheck/exportCheck?billId=" +
          query.billId;
      });
    },
    // 赔付明细
    viewPayDetail() {
      this.billForm = {};
      this.titleName = "赔付费用明细";
      this.className = "receiptSupplier750";
      this.billForm = {
        id: this.detailForm.customerFinanceBillBasic.id,
        billId: this.detailForm.customerFinanceBillBasic.billId,
        pay: this.detailForm.pay,
        customerName: this.form.customerName,
        customerCode: this.form.customerCode,
        month: this.form.month,
      };
      this.isShowDialog = true;
    },
    // 导出
    exportPayDetails() {
      this.$confirm("确定要导出吗？", "导出", {
        confirmButtonText: "导出",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let query = {
          billId: this.detailForm.customerFinanceBillBasic.billId,
        };
        let host = window.location.host;
        window.location.href =
          "//" +
          host +
          "/api/ordersys/customerFinanceBillPay/exportPay?billId=" +
          query.billId;
      });
    },

    //编辑
    rowEditEvent(row) {
      let id = row.id;
      otherGet(id).then((res) => {
        this.projectForm = res.data;
      });
      this.addProjectTitle = "编辑";
      this.isShowSelectDialog = true;
    },
    //删除
    rowDeleteEvent(row) {
      this.$confirm("确定要删除吗？", "删除", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        otherDel(row.id).then((res) => {
          if (res.rel) {
            this.isShowSelectDialog = false;
            this.$message({
              type: "success",
              message: "删除成功",
              type: "success",
            });
            this.customerBillDetail();
          } else {
            this.$message({
              type: "异常",
              message: res.message,
              type: "error",
            });
          }
        });
      });
    },
    handleCommand(command) {
      if (command === "账单更新") {
        this.billDialog = true;
      }
      if (command === "账单收费标准") {
        this.formActive = {
          customerName: this.form.customerName,
          customerCode: this.form.customerCode,
          billId: this.detailForm.customerFinanceBillBasic.billId,
        };
        let query = {
          billId: this.detailForm.customerFinanceBillBasic.billId,
        };
        getActiveObj(query).then((res) => {
          if (res.rel) {
            if (res.data.customerRuleExpress) {
              this.formDetail.customerRuleExpress =
                res.data.customerRuleExpress;
            }
            if (res.data.customerRuleExpressProvinceList) {
              this.formDetail.customerRuleExpressProvinceList =
                res.data.customerRuleExpressProvinceList;
            }
            if (res.data.customerRuleAttachFee) {
              this.formDetail.customerRuleAttachFee =
                res.data.customerRuleAttachFee;
            }
            if (res.data.customerRuleOperateFeeList) {
              this.formDetail.customerRuleOperateFeeList =
                res.data.customerRuleOperateFeeList;
            }
            if (res.data.customerRuleWarehouseFee) {
              this.formDetail.customerRuleWarehouseFee =
                res.data.customerRuleWarehouseFee;
            }
            if (res.data.customerRulePackagingList) {
              this.formDetail.customerRulePackagingList =
                res.data.customerRulePackagingList;
            }
            // this.formDetail = res.data;
          }
        });
        this.isEdit = false;
        this.computeName = "计算当前账单的收费标准如下";
        this.isShowComputeDialog = true;
      }
    },
    //收费标准 关闭
    computeCloseEvent() {
      this.isShowComputeDialog = false;
    },
    //收费标准 确定
    computeConfirmEvent() {
      this.isShowComputeDialog = false;
    },
    //修改并重新计算
    amendComput() {
      this.computeName = "修改计算当前账单的收费标准";
      this.isEdit = true;
    },
    // 弹框取消
    billCancel() {
      this.billDialog = false;
    },
    // 弹框确定
    billConfirm() {
      console.log(this.billFormSelete);
    },
    //关闭账单更新 Dialog
    closeBillDialog() {
      this.billDialog = false;
    },
    // 添加项目
    addProject() {
      this.addProjectTitle = "添加";
      this.projectForm = {
        id: "",
        name: "",
        amount: "",
      };
      this.isShowSelectDialog = true;
    },
    // 新增保存
    addProjectSave() {
      let obj = {
        name: this.projectForm.name,
        amount: this.projectForm.amount,
        billId: this.detailForm.customerFinanceBillBasic.billId,
      };
      let reg3 = /^\d+$|^\d+[.]?\d+$/;
          if (reg3.test(obj.amount) === false) {
            this.$message({
              message: "金额只能为数字！",
              type: "error",
              duration: 2000
            });
            return false;
          }
      this.$confirm("确定要保存吗", "保存", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        otherAdd(obj).then((res) => {
          if (res.rel) {
            this.isShowSelectDialog = false;
            this.$message({
              type: "success",
              message: "保存成功",
              type: "success",
            });
            this.customerBillDetail();
          } else {
            this.$message({
              type: "异常",
              message: res.message,
              type: "error",
            });
          }
        });
      });
    },
    // 编辑保存
    UpdateProjectSave() {
      let obj = {
        id: this.projectForm.id,
        name: this.projectForm.name,
        amount: this.projectForm.amount,
        billId: this.detailForm.customerFinanceBillBasic.billId,
      };
       let reg3 = /^\d+$|^\d+[.]?\d+$/;
          if (reg3.test(obj.amount) === false) {
            this.$message({
              message: "金额只能为数字！",
              type: "error",
              duration: 2000
            });
            return false;
          }
      this.$confirm("确定要保存吗", "保存", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        otherUpdate(obj.id, obj).then((res) => {
          if (res.rel) {
            this.isShowSelectDialog = false;
            this.$message({
              type: "success",
              message: "保存成功",
              type: "success",
            });
            this.customerBillDetail();
          } else {
            this.$message({
              type: "异常",
              message: res.message,
              type: "error",
            });
          }
        });
      });
    },
    // 添加项目 弹框关闭
    addCloseEvent() {
      this.isShowSelectDialog = false;
    },
    // 添加项目 弹框确定
    addConfirmEvent(val) {
      this.isShowSelectDialog = false;
    },
    // 确定并重新计算
    saveComputer() {
      this.modelStatus = true;
      this.$confirm("确定要保存吗", "保存", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.modelStatus = false;
          let obj = {
            billId: this.detailForm.customerFinanceBillBasic.billId,
          };
          let query = Object.assign(this.$refs.computeForm.formDetail, obj);
          newBill(query).then((res) => {
            if (res.rel) {
              this.isShowComputeDialog = false;
              this.$message({
                type: "success",
                message: res.message,
                type: "success",
              });
              this.customerBillDetail();
            } else {
              this.$message({
                type: "异常",
                message: res.message,
                type: "error",
              });
            }
          });
        })
        .catch(() => {
          this.modelStatus = false;
        });
    },
      // 操作记录
     record(){
       let query = {
         billId:this.detailForm.customerFinanceBill.id,
         logType:'bill',
         page:1,
         limit:3,
         _type_:'equal',
         orderBy:'createTimedesc'
       }
      rulePage(query).then(res => {
        this.recordList = res.data.rows
      })
     },
    closeRecord(){
      this.dialogFormRecord = false
    },
     handleSizeChange (val) {
      this.listQuery.limit = val;
      this.recordMorePage();
    },
    handleCurrentChange (val) {
      this.listQuery.page = val;
      this.recordMorePage();
    },
    recordMorePage(){
     let query = {
         billId:this.detailForm.customerFinanceBill.id,
         logType:'bill',
         ...this.listQuery
       }
      rulePage(query).then(res => {
        this.recordMoreList = res.data.rows
        this.total = res.data.total
      })
     },
    //  查看更多
    recordMore(){
      this.dialogFormRecord = true
      this.recordMorePage();
    }
  },
  destroyed() {
    window.sessionStorage.removeItem("billObj");
  },
};
</script>

<style lang="scss" scoped>
.title-box {
  width: calc(100% - 20px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  padding-left: 16px;
  box-sizing: border-box;
  background-color: #ececec;
  line-height: 60px;
  margin-top: 20px;
  .title-left-box {
    font-size: 18px;
    font-weight: bold;
    color: #555;
  }
}
.sum-box {
  width: calc(100% - 20px);
  line-height: 60px;
  border-bottom: 1px dashed #afafaf;
  padding-left: 16px;
  box-sizing: border-box;
  font-weight: bold;
  .sun-number-style {
    color: #ef5a33;
    font-size: 18px;
    font-weight: bold;
  }
}
.detail-box {
  width: calc(100% - 20px);
  padding: 20px;
  box-sizing: border-box;
  // border-bottom: 1px dashed #afafaf;
}
.record-box {
  border-bottom: none;
  .right-style {
    div {
      color: #76768e;
      line-height: 28px;
      font-size: 14px;
      .btn {
        color: #20a0ff;
        cursor: pointer;
      }
    }
  }
}
.el-row {
  border-top: 1px solid #dfe6ec;
}
.baseItem {
  ul {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow: hidden;
    li {
      width: 100%;
      height: 33px;
      font-size: 14px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #dfe6ec;
      border-top: 0;
      color: #1f2d3d;
    }
    .title {
      background-color: #eef1f6;
      color: #1f2d3d;
      font-weight: bold;
    }
    .postStyle {
      height: 66px;
      line-height: 66px;
    }
  }
}
.borderRight ul li {
  border-right: none;
}
.table-box-style {
  width: 100%;
  display: flex;
  margin-bottom: 30px;
  .right-style {
    // flex: 1;
    width: 80%;
  }
}
.left-title-style {
  width: 120px;
  font-weight: bold;
  font-size: 14px;
}
.el-table__footer {
  table-layout: auto;
}
.model {
  z-index: 2004 !important;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
}
 .express {
  width: 100%;
  overflow: hidden;
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px dashed #cccccc;
}
 .express .left {
  width: 100px;
  float: left;
  overflow: hidden;
  font-weight: bold;
  height: 30px;
  line-height: 30px;
  margin-left: 16px;
}
 .express .right {
  margin-left: 100px;
  overflow: hidden;
}
 .express .right p {
  margin: 0;
  height: 30px;
  line-height: 30px;
}
 .express .right .add {
  margin-top: 5px;
}
 .express .right .text1,
 .express .right .text2 {
  display: block;
  font-size: 12px;
  color: #9e9e9e;
  text-align: left;
  overflow: hidden;
  line-height: 20px;
  margin-top: 10px;
}
 .mb20 {
  border-bottom: none;
}
.mb20 {
  margin-bottom: 15px;
}
</style>