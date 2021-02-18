<template>
  <div>
    <div class="topDetai">
      <div class="leftDetail">
        <router-link to="/index/financialSys/chargingStandard">
          <el-button type="primary">
            <i class="el-icon-arrow-left"></i>返回
          </el-button>
        </router-link>
      </div>
    </div>
    <div class="listDetail">
      <p>收费标准 -- {{customerName}}（{{customerCode}}）</p>
    </div>
    <div class="tableDetail">
      <!-- 快递费 -->
      <div class="express">
        <div class="left">快递费：</div>
        <div class="right">
          <p>
            <span>首重 {{detailData.customerRuleExpress.firstWeight || "--"}} kg,续重 {{detailData.customerRuleExpress.continuedWeight || "--"}} kg</span>
            <el-button
              type="text"
              style="margin-left: 10px;font-size: 14px"
              @click="updateWeight(detailData.customerRuleExpress.id)"
            >编辑</el-button>
          </p>
          <el-table
            :key="tableKey"
            :data="detailData.customerRuleExpressProvinceList"
            v-loading.body="listLoading"
            border
            fit
            highlight-current-row
            style="width:700px;margin-top: 15px"
          >
            <el-table-column width="140px" align="center" label="首重（元）" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.firstWeightPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column width="140px" align="center" label="续重（元）" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.continuedWeightPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column width="300px" align="center" label="适用省份">
              <template scope="scope">
                <span>{{scope.row.province}}</span>
              </template>
            </el-table-column>
            <el-table-column width="118px" align="center" label="操作" show-overflow-tooltip>
              <template scope="scope">
                <el-button type="text" @click="payWeight(scope.row)">编辑</el-button>
                <el-button type="text" @click="deleteExport(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="add">
            <el-button type="text" class="el-icon-plus" @click="addWeight">添加区间</el-button>
          </div>
        </div>
      </div>
      <div class="express">
        <div class="left">操作费：</div>
        <div class="right">
          <p v-for="(item,index) in detailData.customerRuleOperateFeeList" :key="index">
            <span>单量 {{item.firstSign}} {{item.firstValue}}单，单量 {{item.secondSign}} {{item.secondValue}}单；{{item.price}} 元/单</span>
            <el-button
              type="text"
              style="margin-left: 10px;font-size: 14px"
              @click="updateCosts(item.id)"
            >编辑</el-button>
            <el-button
              type="text"
              style="margin-left: 10px;font-size: 14px"
              @click="deleteOperate(item.id)"
            >删除</el-button>
          </p>
          <el-button type="text" class="el-icon-plus" @click="addOperateFee">添加操作费</el-button>
        </div>
      </div>
      <div class="express">
        <div class="left">超额附加费：</div>
        <div class="right">
          <p>
            <span>运单商品数小于等于 {{detailData.customerRuleAttachFee.baseCount || "--"}} 件，0元/件；运单商品数大于 {{detailData.customerRuleAttachFee.baseCount || "--"}} 件，{{detailData.customerRuleAttachFee.price || "--"}} 元/件</span>
            <el-button
              type="text"
              style="margin-left: 10px;font-size: 14px"
              @click="updateAttach"
            >编辑</el-button>
          </p>
        </div>
      </div>
      <div class="express">
        <div class="left">包材费：</div>
        <div class="right">
          <el-table
            :key="tableKey"
            :data="detailData.customerRulePackagingList"
            v-loading.body="listLoading"
            border
            fit
            highlight-current-row
            style="width:700px;margin-top: 15px"
          >
            <el-table-column width="140px" align="center" label="包材编号" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.packagingCode}}</span>
              </template>
            </el-table-column>
            <el-table-column width="140px" align="center" label="包材" show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.packagingName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="规格">
              <template scope="scope">
                <span>{{scope.row.specification}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150px" align="center" label="单价">
              <template scope="scope">
                <span>{{scope.row.price}}</span>
              </template>
            </el-table-column>
            <el-table-column width="118px" align="center" label="操作" show-overflow-tooltip>
              <template scope="scope">
                <el-button type="text" @click="update(scope.row)">编辑</el-button>
                <el-button type="text" @click="taxExport(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="add">
            <el-button type="text" class="el-icon-plus" @click="addMateria">添加包材</el-button>
          </div>
        </div>
      </div>
      <div class="express">
        <div class="left">仓储费：</div>
        <div class="right">
          <p>
            <span>{{detailData.customerRuleWarehouseFee.price || "--"}}元/托</span>
            <el-button type="text" style="margin-left: 10px;font-size: 14px" @click="updateWare">编辑</el-button>
          </p>
        </div>
      </div>
      <div class="express mb20">
        <div class="left">操作记录：</div>
        <div class="right">
          <span class="text1" v-for="item in recordList" :key="item.id">{{item.createTime}}，{{item.operationName}}{{item.operationLog}}；</span>
          <el-button type="text" style="font-size: 14px" @click="recordMore">查看更多>></el-button>
        </div>
      </div>
      <!-- 编辑首重 或者 编辑首重续重费用&适用省份 -->
      <el-dialog
        :title="weightText"
        :visible.sync="dialogFormVisible"
        :before-close="closeDialog"
        class="receiptWidth600"
      >
        <el-form :model="expressForm" :rules="rules" ref="expressForm" label-width="80px">
          <el-form-item label="首重" class="marginListAdd" prop="firstWeight">
            <el-input placeholder="首重" style="width:300px" v-model="expressForm.firstWeight"></el-input>
          </el-form-item>
          <!-- <span class="xhText">*</span> -->
          <el-form-item label="续重" prop="continuedWeight" class="marginListAdd">
            <el-input v-model="expressForm.continuedWeight" placeholder="请输入数值" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item
            label="适用省份"
            class="marginListAdd"
            v-if="weightText == '编辑首重续重费用&适用省份' || weightText == '添加区间'"
          >
            <el-select v-model="province" multiple placeholder="请选择省份" style="width:420px">
              <el-option v-for="(item,index) in options" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer center">
          <el-button @click="closeDialog">取消</el-button>
          <el-button
            type="primary"
            v-if="weightText == '编辑首重续重费用&适用省份' || weightText == '添加区间'"
            @click="addFormProvince"
          >保存</el-button>
          <el-button type="primary" v-else @click="sumbitFormExpress">保存</el-button>
        </div>
      </el-dialog>

      <!-- 操作费 -->
      <el-dialog
        :title="operateText"
        :visible.sync="dialogFormCosts"
        :before-close="closeCosts"
        width="650px"
        class="operateClass"
      >
        <el-form :model="operateFeeFrom">
          <el-form-item label>
            <div class="input_bodyBox">
              <el-row>
                <el-col :span="6">
                  <div class="baseItem borderRight">
                    <ul>
                      <li class="title">判断项目</li>
                      <li class="h100">单量</li>
                    </ul>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="baseItem borderRight">
                    <ul>
                      <li class="title">判断内容</li>
                      <li class="h100">
                        <div>
                          <div class="left">
                            <el-radio
                              label=">"
                              v-model="operateFeeFrom.firstSign"
                              style="margin-left: 4px;font-weight: normal;"
                            >大于</el-radio>
                            <el-radio label=">=" v-model="operateFeeFrom.firstSign">大于等于</el-radio>
                            <el-radio label="<" v-model="operateFeeFrom.secondSign">小于</el-radio>
                            <el-radio label="<=" v-model="operateFeeFrom.secondSign">小于等于</el-radio>
                          </div>

                          <div class="right">
                            <el-input placeholder="请输入数值" v-model="operateFeeFrom.firstValue"></el-input>
                            <el-input placeholder="请输入数值" v-model="operateFeeFrom.secondValue"></el-input>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="baseItem">
                    <ul>
                      <li class="title">操作费</li>
                      <li class="h100">
                        <el-input
                          placeholder="操作费"
                          style="width: 95%"
                          v-model="operateFeeFrom.price"
                        ></el-input>
                      </li>
                    </ul>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer center">
          <el-button @click="closeCosts">取消</el-button>
          <el-button type="primary" @click="updateOperateSave" v-if=" operateText == '编辑操作费'">保存</el-button>
          <el-button type="primary" @click="addOperateSave" v-if=" operateText == '添加操作费'">保存</el-button>
        </div>
      </el-dialog>

      <!-- 超额附加费 -->
      <el-dialog
        title="编辑超额附加费"
        :visible.sync="dialogFormAttachFee"
        :before-close="closeAttachFee"
        width="650px"
        class="operateClass"
      >
        <el-form :model="attachForm" :rules="rules" ref="form" label-width="80px">
          <el-form-item label="判断项目" class="marginListAdd">
            <span class="goodsNum" style="line-height:36px;">运单商品数</span>
          </el-form-item>
          <el-form-item label="基准数" class="marginListAdd">
            <el-input v-model="attachForm.baseCount" placeholder="请输入数值" style="width:400px"></el-input>
          </el-form-item>
          <el-form-item label="超额费用" class="marginListAdd">
            <el-input placeholder="超额费用" v-model="attachForm.price" style="width:400px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer center">
          <el-button @click="closeAttachFee">取消</el-button>
          <el-button type="primary" @click="saveAttach">保存</el-button>
        </div>
      </el-dialog>

      <!-- 包材费 -->
      <el-dialog
        :title="materialText"
        :visible.sync="dialogFormMaterial"
        :before-close="closeMaterial"
        class="receiptWidth450"
      >
        <el-form :model="formMaterial" :rules="rules" ref="form" label-width="80px">
          <el-form-item label="包材" class="marginListAdd">
            <el-select v-model="formMaterial.materialValue" placeholder="请选择包材" style="width:300px" filterable >
              <el-option
                v-for="(item,index) in packMateria"
                :key="index"
                :label="item.label"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <span class="xhText">*</span> -->
          <el-form-item label="单价" class="marginListAdd">
            <el-input v-model="formMaterial.price" placeholder="单价" style="width:300px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer center">
          <el-button @click="closeMaterial">取消</el-button>
          <el-button type="primary" @click="sumbitMaterial" v-if="materialText == '添加包材费'">保存</el-button>
          <el-button type="primary" @click="updateMaterial" v-else>保存</el-button>
        </div>
      </el-dialog>
      <!-- 编辑仓储费 -->
      <el-dialog
        title="编辑仓储费"
        :visible.sync="dialogFormWare"
        :before-close="closeWare"
        class="receiptWidth450"
      >
        <el-form :model="formWare" :rules="rules" ref="form" label-width="80px">
          <el-form-item label="单价" prop="payAccount" class="marginListAdd">
            <el-input
              v-model="formWare.price"
              placeholder="单价"
              style="width:200px;margin-right: 5px"
            ></el-input>
            <span>/托</span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer center">
          <el-button @click="closeWare">取消</el-button>
          <el-button type="primary" @click="sumbitAddForm">保存</el-button>
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
    </div>
  </div>
</template>

<script>
import {
  getActiveRule,
  getCustomerRuleExpress,
  updateExpress,
  getProvince,
  updateProvince,
  deleteProvince,
  addProvince,
  getOperateFee,
  updateOperateFee,
  addOperateFee,
  deleteOperateFee,
  getAttachFee,
  updateAttachFee,
  packSelect,
  packAdd,
  packUpdate,
  packUpdateSave,
  packDel,
  getWare,
  saveWare,
  rulePage
} from "@/api/financialSys/chargingStandard";

import { mapGetters } from "vuex";
import { getToken } from "utils/auth";
var dateUtils = require("silly-datetime");
export default {
  name: "bdSupplier",
  data() {
    return {
      accessToken: {
        accessToken: getToken(),
      },
      customerCode: "",
      operateText: "编辑操作费",
      expressID: "",
      detailData: {
        customerRuleExpress: {},
        customerRuleExpressProvinceList: [],
        customerRuleAttachFee: {},
        customerRuleOperateFeeList: [],
        customerRuleWarehouseFee: {},
        customerRulePackagingList: [],
      }, //
      list: [],
      dialogFormRecord: false,
      operateFeeFrom: {
        index: "",
        firstSign: "",
        firstValue: "",
        secondSign: "",
        secondValue: "",
        price: "",
      },
      formWare: {
        id: "",
        price: "",
        ruleCode: "",
      },
      expressForm: {},
      attachForm: {
        baseCount: "",
        price: "",
      },
      formMaterial: {
        id: "",
        materialValue: {
          label: "",
          value: {
            packagingCode: "",
            packagingName: "",
            specification: "",
          },
        },
        price: "",
      },
      total: null,
      listLoading: false,
      query: {
        qstName: "",
        billNo: "",
        taxInfoId: "",
      },
      listQuery: {
        page: 1,
        limit: 10,
        _type_:'equal',
        orderBy: "createTimedesc",
      },
      listDetail: [],
      tableKey: 0,
      orderObj: {},
      selectCustom: [],
      dialogFormAttachFee: false,
      dialogFormVisible: false,
      dialogFormCosts: false,
      dialogFormMaterial: false,
      dialogFormWare: false,
      provinceID: "",
      province: [],
      form: {
        id: "",
        qstName: "",
        payProof: "",
        payAccount: "",
        remark: "",
      },
      options: [
        "北京",
        "天津",
        "上海",
        "重庆",
        "河北",
        "山西",
        "陕西",
        "甘肃",
        "青海",
        "辽宁",
        "吉林",
        "黑龙江",
        "江苏",
        "浙江",
        "安徽",
        "福建",
        "江西",
        "山东",
        "河南",
        "湖北",
        "湖南",
        "广东",
        "海南",
        "云南",
        "四川",
        "贵州",
        "广西",
        "宁夏",
        "内蒙古",
        "西藏",
        "新疆",
      ],
      relationOptions: [">", ">=", "<", "<=", "="],
      rules: {},
      href: "",
      weightText: "编辑首重续重数值",
      materialText: "添加包材费",
      packMateria: [],
      ruleCode: "",
      operateFeeID: "",
      attachID: "",
      recordList: [],
      recordMoreList: [],
      tableHeight: 450
    };
  },
  computed: {
    ...mapGetters(["elements"]),
    elTableMediaHeight() {
      if (window.screen.height === 1080) {
        return window.screen.height / 2.3;
      }
      if (window.screen.height === 900) {
        return window.screen.height / 2.8;
      }
      if (window.screen.height === 768) {
        return window.screen.height / 2.8 - 25;
      }
    },
  },
  created() {
    this.customerCode = this.$route.query.customerCode;
    this.customerName = this.$route.query.customerName;
    this.getActiveRule(); // 查看当前收费标准
    this.materiaSelect();
  },
  mounted(){
  
     
  },
  destroyed() {},
  methods: {
    getActiveRule() {
      let params = {
        customerCode: this.customerCode,
      };
      getActiveRule(params).then((res) => {
        this.ruleCode = res.data.ruleCode;
        if (res.data.customerRuleExpress) {
          this.detailData.customerRuleExpress = res.data.customerRuleExpress;
        }
        if (res.data.customerRuleExpressProvinceList) {
          this.detailData.customerRuleExpressProvinceList =
            res.data.customerRuleExpressProvinceList;
        }
        if (res.data.customerRuleAttachFee) {
          this.attachID = res.data.customerRuleAttachFee.id;
          this.detailData.customerRuleAttachFee =
            res.data.customerRuleAttachFee;
        }
        if (res.data.customerRuleOperateFeeList) {
          this.detailData.customerRuleOperateFeeList =
            res.data.customerRuleOperateFeeList;
        }
        if (res.data.customerRuleWarehouseFee) {
          this.detailData.customerRuleWarehouseFee =
            res.data.customerRuleWarehouseFee;
        }
        if (res.data.customerRulePackagingList) {
          this.detailData.customerRulePackagingList =
            res.data.customerRulePackagingList;
        }
      this.$nextTick(() => {
        this.record()
       })
     });
    },
    closeDialog() {
      this.dialogFormVisible = false;
      this.expressForm = {};
    },
    closeCosts() {
      this.dialogFormCosts = false;
      this.operateFeeFrom = {
        index: "",
        firstSign: "",
        firstValue: "",
        secondSign: "",
        secondValue: "",
        price: "",
      };
    },
    closeMaterial() {
      this.dialogFormMaterial = false;
    },
    //快递费
    updateWeight(id) {
      this.expressID = id;
      getCustomerRuleExpress(this.expressID).then((res) => {
        this.dialogFormVisible = true;
        this.weightText = "编辑首重续重数值";
        this.expressForm.continuedWeight = res.data.continuedWeight;
        this.expressForm.firstWeight = res.data.firstWeight;
      });
    },
    addWeight() {
      this.dialogFormVisible = true;
      this.weightText = "添加区间";
      this.expressForm = {};
      this.province = [];
    },
    // 快递费编辑
    payWeight(row) {
      this.provinceID = row.id;
      getProvince(this.provinceID).then((res) => {
        this.dialogFormVisible = true;
        this.weightText = "编辑首重续重费用&适用省份";
        let provinceArr;
        if (!res.data.province) {
          provinceArr = [];
        } else {
          provinceArr = res.data.province.split("、");
        }
        this.expressForm.firstWeight = res.data.firstWeightPrice;
        this.expressForm.continuedWeight = res.data.continuedWeightPrice;
        this.province = provinceArr;
      });
    },
    // 快递费 删除
    deleteExport(row) {
      let param = {
        id: row.id,
      };
      this.$confirm("确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteProvince(param).then((res) => {
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000,
            });
            this.getActiveRule();
          } else {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000,
            });
          }
        });
      });
    },
    // 包材费下拉框
    materiaSelect() {
      let query = {};
      packSelect(query).then((res) => {
        if (res.rel) {
          if (res.data.length > 0) {
            res.data.map((item) => {
              let obj = {
                label: "",
                value: {},
              };
              obj.label =
                item.packagingCode +
                "-" +
                item.packagingName +
                "-" +
                item.specification;
              obj.value.packagingCode = item.packagingCode;
              obj.value.packagingName = item.packagingName;
              obj.value.specification = item.specification;
              this.packMateria.push(obj);
            });
          }
        }
      });
    },
    // 编辑包材费
    update(row) {
      this.dialogFormMaterial = true;
      this.materialText = "编辑包材费";
      packUpdate(row.id).then((res) => {
        if (res.rel) {
          let obj = {};
          for (var i = 0; i < this.packMateria.length; i++) {
            if (
              res.data.packagingCode == this.packMateria[i].value.packagingCode
            ) {
              obj = this.packMateria[i];
            }
          }
          let form = {
            id: res.data.id,
            materialValue: obj,
            price: res.data.price,
          };
          this.formMaterial = form;
        }
      });
    },
    addMateria() {
      this.resetMaterial();
      this.dialogFormMaterial = true;
      this.materialText = "添加包材费";
    },
    // 编辑仓储费
    closeWare() {
      this.dialogFormWare = false;
    },
    updateWare() {
      let id = this.detailData.customerRuleWarehouseFee.id;
      getWare(id).then((res) => {
        if (res.rel) {
          this.formWare = res.data;
        }
      });
      this.dialogFormWare = true;
    },
    // 删除包材费
    taxExport(row) {
      this.$confirm("确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let id = row.id;
        packDel(id).then((res) => {
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000,
            });
            this.getActiveRule();
          } else {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000,
            });
          }
        });
      });
    },
    //删除操作费
    deleteOperate(id) {
      this.operateFeeID = id;
      let param = { id };
      this.$confirm("确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteOperateFee(param).then((res) => {
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000,
            });
            this.getActiveRule();
          } else {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000,
            });
          }
        });
      });
    },
    //  编辑操作费
    updateCosts(id) {
      this.operateFeeID = id;
      this.operateText = "编辑操作费";
      getOperateFee(this.operateFeeID).then((res) => {
        this.operateFeeFrom = res.data;
        this.dialogFormCosts = true;
      });
    },
    // 编辑操作费 (保存)
    updateOperateSave() {
      let params = {
        firstSign: this.operateFeeFrom.firstSign,
        firstValue: this.operateFeeFrom.firstValue,
        price: this.operateFeeFrom.price,
        secondSign: this.operateFeeFrom.secondSign,
        secondValue: this.operateFeeFrom.secondValue,
        id: this.operateFeeID,
      };
      this.$confirm("确定要保存吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        updateOperateFee(params).then((res) => {
          if (res.rel) {
            this.dialogFormCosts = false;
            this.$notify({
              title: "成功",
              message: "修改成功",
              type: "success",
              duration: 2000,
            });
            this.getActiveRule();
          } else {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000,
            });
          }
        });
      });
    },
    //添加操作费
    addOperateFee() {
      this.operateFeeFrom = {
        index: "",
        firstSign: "",
        firstValue: "",
        secondSign: "",
        secondValue: "",
        price: "",
      };
      this.operateText = "添加操作费";
      this.dialogFormCosts = true;
    },
    //添加操作费 (保存)
    addOperateSave() {
      let params = this.operateFeeFrom;
      delete params.index;
      params.ruleCode = this.ruleCode;
      this.$confirm("确定要保存吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        addOperateFee(params).then((res) => {
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "添加成功",
              type: "success",
              duration: 2000,
            });
            this.getActiveRule();
            this.dialogFormCosts = false;
          } else {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000,
            });
          }
        });
      });
    },
    // 超额附加费
    updateAttach() {
      this.dialogFormAttachFee = true;
      getAttachFee(this.attachID).then((res) => {
        this.attachForm.baseCount = res.data.baseCount;
        this.attachForm.price = res.data.price;
      });
    },
    //超额附加费 关闭
    closeAttachFee() {
      this.dialogFormAttachFee = false;
      this.attachForm = {
        baseCount: "",
        price: "",
      };
    },
    // 超额附加费 保存
    saveAttach() {
      let params = this.attachForm;
      params.id = this.attachID;
      this.$confirm("确定要保存吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        updateAttachFee(params).then((res) => {
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "保存成功",
              type: "success",
              duration: 2000,
            });
            this.getActiveRule();
            this.dialogFormAttachFee = false;
            this.attachForm = {
              baseCount: "",
              price: "",
            };
          } else {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000,
            });
          }
        });
      });
    },
    resetMaterial() {
      this.formMaterial = {
        id: "",
        materialValue: {
          label: "",
          value: {
            packagingCode: "",
            packagingName: "",
            specification: "",
          },
        },
        price: "",
      };
    },
    // 包材费新增保存
    sumbitMaterial() {
      let obj = {
        id: this.formMaterial.id,
        packagingCode: this.formMaterial.materialValue.value.packagingCode,
        packagingName: this.formMaterial.materialValue.value.packagingName,
        price: this.formMaterial.price,
        ruleCode: this.ruleCode,
        specification: this.formMaterial.materialValue.value.specification,
      };
      this.$confirm("确定要保存吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          packAdd(obj).then((response) => {
            this.dialogFormMaterial = false;
            if (response.rel) {
              this.$notify({
                title: "成功",
                message: "保存成功",
                type: "success",
                duration: 2000,
              });
              this.getActiveRule();
              this.resetMaterial();
            } else {
              this.$notify({
                title: "失败",
                message: response.message,
                type: "error",
                duration: 2000,
              });
            }
          });
        })
        .catch(() => {});
    },
    // 编辑保存
    updateMaterial() {
      let obj = {
        id: this.formMaterial.id,
        packagingCode: this.formMaterial.materialValue.value.packagingCode,
        packagingName: this.formMaterial.materialValue.value.packagingName,
        price: this.formMaterial.price,
        ruleCode: this.ruleCode,
        specification: this.formMaterial.materialValue.value.specification,
      };
      this.$confirm("确定要保存吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          packUpdateSave(obj.id, obj).then((response) => {
            this.dialogFormMaterial = false;
            if (response.rel) {
              this.$notify({
                title: "成功",
                message: "保存成功",
                type: "success",
                duration: 2000,
              });
              this.getActiveRule();
              this.resetMaterial();
            } else {
              this.$notify({
                title: "失败",
                message: response.message,
                type: "error",
                duration: 2000,
              });
            }
          });
        })
        .catch(() => {});
    },
    sumbitAddForm() {
      this.$confirm("确定要保存吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          saveWare(this.formWare.id, this.formWare).then((response) => {
            this.dialogFormWare = false;
            if (response.rel) {
              this.$notify({
                title: "成功",
                message: "保存成功",
                type: "success",
                duration: 2000,
              });
              this.getActiveRule();
            } else {
              this.$notify({
                title: "失败",
                message: response.message,
                type: "error",
                duration: 2000,
              });
            }
          });
        })
        .catch(() => {});
    },

    // 快递费，修改
    sumbitFormExpress() {
      let params = this.expressForm;
      params.id = this.expressID;
      this.$confirm("确定要保存吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        updateExpress(params).then((res) => {
          if (res.rel) {
            this.$notify({
              title: "成功",
              message: "修改成功",
              type: "success",
              duration: 2000,
            });
            this.getActiveRule();
            this.dialogFormVisible = false;
          } else {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000,
            });
          }
        });
      });
    },
    addFormProvince() {
      let self = this;
      let province = this.province.length ? self.province.join("、") : "";
      let params = {
        firstWeightPrice: this.expressForm.firstWeight,
        continuedWeightPrice: this.expressForm.continuedWeight,
        id: self.provinceID,
        province,
      };
      this.$confirm("确定要保存吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (this.weightText != "添加区间") {
          updateProvince(params).then((res) => {
            if (res.rel) {
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success",
                duration: 2000,
              });
              this.getActiveRule();
              this.dialogFormVisible = false;
            } else {
              this.$notify({
                title: "失败",
                message: res.message,
                type: "error",
                duration: 2000,
              });
            }
          });
        } else {
          // 添加区间
          delete params.id; // 删除id
          params.ruleCode = this.ruleCode;
          addProvince(params).then((res) => {
            if (res.rel) {
              this.$notify({
                title: "成功",
                message: "添加成功",
                type: "success",
                duration: 2000,
              });
              this.getActiveRule();
              this.dialogFormVisible = false;
            } else {
              this.$notify({
                title: "失败",
                message: res.message,
                type: "error",
                duration: 2000,
              });
            }
          });
        }
      });
    },
    // 操作记录
     record(){
       let query = {
         ruleCode:this.ruleCode,
         logType:'rule',
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
         ruleCode:this.ruleCode,
         logType:'rule',
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
};
</script>
<style lang='scss'>
.topDetai {
  width: 99%;
  overflow: hidden;
  margin: 0 auto;
  padding-bottom: 20px;
}
.leftDetail {
  float: left;
}
.listDetail {
  width: 99%;
  margin: 0 auto;
  /* border: 1px solid #eef1f6; */
  height: 60px;
  background: #f2f2f2;
}
.listDetail p {
  line-height: 60px;
  padding-left: 16px;
  font-size: 18px;
  margin: 0;
  font-weight: bold;
  color: #555;
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
  font-size: 14px;
}
.tableDetail .express {
  width: 100%;
  overflow: hidden;
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px dashed #cccccc;
}
.tableDetail .express .left {
  width: 100px;
  float: left;
  overflow: hidden;
  font-weight: bold;
  height: 30px;
  line-height: 30px;
  margin-left: 16px;
}
.tableDetail .express .right {
  margin-left: 100px;
  overflow: hidden;
}
.tableDetail .express .right p {
  margin: 0;
  height: 30px;
  line-height: 30px;
}
.tableDetail .express .right .add {
  margin-top: 5px;
}
.tableDetail .express .right .text1,
.tableDetail .express .right .text2 {
  display: block;
  font-size: 12px;
  color: #9e9e9e;
  text-align: left;
  overflow: hidden;
  line-height: 20px;
  margin-top: 10px;
}
.tableDetail .mb20 {
  border-bottom: none;
}
.mb20 {
  margin-bottom: 15px;
}
.pagination-container {
  margin-top: 20px;
}

.recordStyle{
  width: 100%;
  overflow: hidden;
}
.recordStyle .right .text1{
  display: block;
  font-size: 12px;
  // color: #9e9e9e;
  // text-align: left;
  overflow: hidden;
  line-height: 20px;
  margin-top: 10px;
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
.input_bodyBox {
  margin-bottom: 10px;
}
.titltstyle {
  /* display: inline-block; */
  float: left;
  width: 80px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}
.iconFont_style {
  display: inline-block;
  font-size: 22px;
  vertical-align: middle;
  margin-left: 8px;
  color: #409eff;
  cursor: pointer;
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
    .h100 {
      height: 100px;
      line-height: 100px;
      .left {
        float: left;
        width: 49%;
        height: 100px;
      }
      .right {
        float: left;
        width: 49%;
        height: 100px;
        .el-input {
          float: left;
          width: 100%;
          height: 40px;
          line-height: 60px;
        }
      }
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
.el-radio-group {
  font-size: 0;
  width: 50%;
  float: left;
}
.el-radio + .el-radio {
  margin-left: 5px;
  font-weight: normal;
}
.el-radio {
  color: #1f2d3d;
  cursor: pointer;
  white-space: nowrap;
  /* height: 30px; */
  line-height: 44px;
  height: 30px;
  margin-top: 8px;
  float: left;
}
.operateClass .el-dialog {
  width: 650px;
}
</style>

