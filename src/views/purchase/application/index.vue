<template>
  <div class="app-container calendar-list-container" id="app-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="24">
        <div class="app-container-left purchaseName">
          <div class="filter-container">
            <el-input
              @keyup.enter.native="handleFilter"
              style="width: 200px;"
              class="filter-item"
              placeholder="请输入采购单编号"
              v-model="query.purchaseNo"
            ></el-input>
            <el-date-picker
              type="daterange"
              placeholder="请选择来货日期"
              style="width: 330px;"
              class="filter-item"
              @keyup.enter.native="handleFilter"
              range-separator="～"
              popper-class="timeSelect"
              v-model="query.purchaseTimes"
            ></el-date-picker>
            <el-select
              v-model="query.purchaseType"
              placeholder="请选择采购单类型"
              @keyup.enter.native="handleFilter"
              class="filter-item"
              popper-class="optionsContent"
              clearable
            >
              <el-option
                v-for="item in selectType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              @keyup.enter.native="handleFilter"
              style="width: 200px;"
              class="filter-item"
              placeholder="请输入采购单内容"
              v-model="query.remark"
            ></el-input>
             <el-select
              v-model="query.supplierId"
              placeholder="请选择供应商名称"
              @keyup.enter.native="handleFilter"
              class="filter-item"
              popper-class="optionsContent"
              clearable
            >
              <el-option
                v-for="item in supplierSelect"
                :key="item.id"
                :label="item.supplierName"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-button
              class="filter-item"
              type="primary"
              v-waves
              icon="search"
              @click="handleFilter"
            >查询</el-button>
            <el-button
              class="filter-item"
              type="primary"
              style="margin-left:0"
              @click="addDiction"
            >新增</el-button>
          </div>
          <el-table
            :data="list"
            v-loading="loading.tableLoading"
            element-loading-text="正在加载中......"
            border
            fit
            highlight-current-row
            style="width: 100%"
            :height="elTableMediaHeight"
            @row-click="detailName"
          >
            <el-table-column align="center" type="expand">
              <template scope="scope">
                <el-table
                  border
                  style="width: 83%"
                  :data="scope.row.childrenList"
                  v-loading="loading.childrenLoading"
                  element-loading-text="正在加载中......"
                  id="tableCenter"
                >
                  <el-table-column label="序号" width="70" align="center" type="index"></el-table-column>
                  <el-table-column
                    label="商品条码"
                    width="210"
                    align="center"
                    show-overflow-tooltip
                    prop="productBarcode"
                  ></el-table-column>
                  <el-table-column
                    label="商品品牌"
                    width="210"
                    align="center"
                    show-overflow-tooltip
                    prop="productBrand"
                  ></el-table-column>
                  <el-table-column
                    label="商品名称"
                    width="182"
                    align="center"
                    prop="productName"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="商品分类"
                    width="182"
                    align="center"
                    prop="productCategory"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="最小单位"
                    width="100"
                    align="center"
                    prop="productUnit"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="规格型号"
                    width="100"
                    align="center"
                    prop="productModel"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="商品类型"
                    width="100"
                    align="center"
                    prop="productType"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="商品效期"
                    width="150"
                    align="center"
                    prop="productEffective"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="到货数量"
                    width="120"
                    align="center"
                    show-overflow-tooltip
                    prop="productQuantity"
                  ></el-table-column>
                  <!-- <el-table-column label="货币类型"
                                   width="100"
                                   align="center"
                                   prop="currencyName"
                                   show-overflow-tooltip>
                  </el-table-column>-->
                  <el-table-column
                    label="单价"
                    width="120"
                    align="center"
                    prop="productPrice"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="总价"
                    width="100"
                    align="center"
                    prop="productAmount"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="库存"
                    width="100"
                    align="center"
                    prop="stockQuantity"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="上传时间"
                    width="182"
                    align="center"
                    prop="createTime"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    label="备注"
                    width="250"
                    align="center"
                    prop="remark"
                    show-overflow-tooltip
                  ></el-table-column>
                   <el-table-column
                    label="操作"
                    width="150"
                    align="center"
                  >
               <template scope="scope">
                <el-button type="text" @click="childUpdate(scope.row)">编辑</el-button>
                <el-button type="text" @click="childDelete(scope.row)">删除</el-button>
              </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column width="160" align="center" label="采购单编号" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.purchaseNo}}</span>
              </template>
            </el-table-column>
             <el-table-column width="160" align="center" label="供应商名称" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.supplierName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="160" align="center" label="来货日期" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.purchaseTime}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120" align="center" label="货币类型" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.currencyName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120" align="center" label="申请金额" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.applyAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120" align="center" label="来货总价" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.purchaseAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column width="130" align="center" label="到货总数量" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.purchaseQuantity}}</span>
              </template>
            </el-table-column>
            <el-table-column width="120" align="center" label="总库存" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.stockQuantity}}</span>
              </template>
            </el-table-column>
            <el-table-column width="140" align="center" label="采购单类型" show-overflow-tooltip>
              <template scope="scope">
                <span v-if="scope.row.purchaseType === 0">款到发货</span>
                <span v-if="scope.row.purchaseType === 1">以销待结</span>
              </template>
            </el-table-column>
            <el-table-column width="138" align="center" label="采购单状态" show-overflow-tooltip>
              <template scope="scope">
                <!-- <span v-if="scope.row.purchaseStatus === 0">待付款</span>
                <span v-if="scope.row.purchaseStatus === 1">已付款</span> -->
                <span v-if="scope.row.purchaseStatus === 2">进行中</span>
                <span v-if="scope.row.purchaseStatus === 3">已完成</span>
              </template>
            </el-table-column>
             <el-table-column width="130" align="center" label="采办负责人" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.purchaseUser}}</span>
              </template>
            </el-table-column>
             <el-table-column width="130" align="center" label="查验员" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.inspector}}</span>
              </template>
            </el-table-column>
             <el-table-column width="130" align="center" label="审核状态" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;" v-if="scope.row.applyStatus == 0">未审核</span>
                 <span style="cursor: pointer;" v-if="scope.row.applyStatus == 1">已审核</span>
              </template>
            </el-table-column>
            <el-table-column width="130" align="center" label="内容备注" show-overflow-tooltip>
              <template scope="scope">
                <span style="cursor: pointer;">{{scope.row.remark}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="260" align="center" fixed="right">
              <template scope="scope">
                <el-button type="text" @click="handleUpdate(scope.row)">编辑</el-button>
                <el-button type="text" @click="exportInfo(scope.row)">上传清单</el-button>
                <el-button type="text" @click="texDetail(scope.row)">查看详情</el-button>
                <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="listQuery.page"
              :page-sizes="[10,20,30, 50]"
              :page-size="listQuery.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
          <!--增加客户数据配置 -->
          <el-dialog
            :title="nameInfo"
            :visible.sync="dialogFormVisible"
            :before-close="closeDialog"
            :close-on-click-modal="false"
            class="receiptSupplier"
          >
            <el-form
              :model="form"
              :rules="rules"
              ref="form"
                :inline="true"
              class="customerdata"
              label-width="110px"
            >
            <div style="float: left" class="formStyle">
              <span class="formUpdate">*</span>
              <el-form-item label="采购单编号：" >
                <el-input v-model="form.purchaseNo" placeholder="请输入采购单编号" style="width:200px"></el-input>
              </el-form-item> 
            </div>
              <div style="float: left" class="formStyle">
                  <span class="formUpdate" style="top: 9px">*</span>
              <el-form-item label="供应商名称：" class="marginListAdd">
                <el-select
                placeholder="请选择供应商名称"
                  style="width:200px"
                  v-model="form.supplierId"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="item in supplierSelect"
                    :key="item.id"
                    :label="item.supplierName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item> 
              </div>
              <div style="float: left" >
                 <el-form-item label="来货日期：" class="marginListAdd">
                <el-date-picker
                  type="date"
                  style="width:200px"
                  placeholder="选择来货日期"
                  v-model="form.purchaseTime"
                  format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item> 
              </div>
             
              <div style="float: left" class="formStyle">
                 <span class="formUpdate" style="top: 9px;left: 20px">*</span>
              <el-form-item label="货币类型："  prop="currency">
                <el-select
                  placeholder="请选择货币类型"
                  style="width:200px"
                  v-model="form.currency"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="item in selectCurrency"
                    :key="item"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>  
              </div>
              <div style="float: left">
                  <el-form-item label="申请金额：">
                <el-input v-model="form.applyAmount" placeholder="请输入申请金额" style="width:200px"></el-input>
              </el-form-item>
              </div>
              <div style="float: left" class="formStyle">
                  <span class="formUpdate" style="top: 9px">*</span>
              <el-form-item label="采购单类型："  prop="purchaseType">
                <el-select
                  placeholder="请选择采购单类型"
                  style="width:200px"
                  v-model="form.purchaseType"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="item in selectType"
                    :key="item"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>  
              </div>
            <div style="float: left" class="formStyle">
                <span class="formUpdate" style="top: 9px">*</span>
               <el-form-item label="采办负责人：">
                <el-input v-model="form.purchaseUser" placeholder="请输入采办负责人" ></el-input>
              </el-form-item> 
            </div>
             <div style="float: left" class="formStyle">
                <span class="formUpdate" style="top: 9px;left: 35px">*</span>
                <el-form-item label="查验员：">
                <el-input v-model="form.inspector" placeholder="请输入查验员"></el-input>
              </el-form-item>  
             </div>
             <div style="float: left" class="formStyle">
                 <span class="formUpdate" style="top: 9px;left: 20px">*</span>
              <el-form-item label="审核状态：" >
                <el-select
                  placeholder="请选择审核状态"
                  style="width:200px"
                  v-model="form.applyStatus"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="item in selectApply"
                    :key="item"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>  
             </div>
              <el-form-item label="内容备注：">
                <el-input v-model="form.remark" placeholder="请输入内容备注" style="width:200px"></el-input>
              </el-form-item>
              <p class="notecss">
                注意：
                <br />1.款到发货，需填写申请单金额
                <br />2.付款单金额和上传凭证由财务上传。
                <br />3.针对以销待结业务，采销需将付款单标记为以销待结。
                <br />
              </p>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancel('form')">取 消</el-button>
              <el-button v-if="nameInfo == '新增采购单'" type="primary" @click="create('form')">确 定</el-button>
              <el-button v-else type="primary" @click="update('form')">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 上传清单 -->
          <el-dialog
            title="上传采购清单"
            :visible.sync="dialogVisible"
            :before-close="closeDialogExport"
            :close-on-click-modal="false"
            class="receiptWidth600"
          >
            <el-form class="customerdata" label-width="110px">
              <el-form-item label="货币类型：" style="width:100%">
                <el-select
                  placeholder="请选择货币类型"
                  style="width:300px"
                  v-model="currency"
                  filterable
                  clearable
                  :disabled="currDisabled"
                >
                  <el-option
                    v-for="item in selectCurrency"
                    :key="item"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="采购清单：" style="width:100%">
                <div class="w85">
                  <h5>1.下载模板</h5>
                  <a :href="href">
                    <span class="exportSpan">《来货清单模板》</span>
                  </a>
                  <!-- <el-button type="primary"
                         size="small">
                <a :href="href"
                   target="_blank">点击下载</a>
                  </el-button>-->
                </div>
                <div class="w85">
                  <h5 style="margin-bottom: 13px">2.填写模板并导入</h5>
                  <input
                    type="file"
                    ref="clearFile"
                    accept=".xls, .xlsx"
                    name="file"
                    class="noneborder"
                    @change="getFile($event)"
                  />
                  <!-- <el-upload ref="uploadExcel"
                         :action="uploadUrls.excelUrl"
                         :headers="accessToken"
                         :file-list="uploadUrls.excelFileList"
                         :on-success="uploadExcelSuccess"
                         :on-error="uploadExcelError"
                         :before-upload="checkExcelFile"
                         accept=".xlsx,.xls"
                         :auto-upload="true">
                <el-button slot="trigger"
                           size="small"
                           style="margin-top: -10px"
                           type="primary">选择文件上传</el-button>
                  </el-upload>-->
                </div>
              </el-form-item>
            </el-form>
            <p class="notecss w85" style="margin-top:15px">
              注意：
              <br />1.文件大小不超过10M。
              <br />2.需将数据根据模板补充完成，再进行长传操作。
              <br />3.每次上传最初库存列数值为来货数量。
              <br />
            </p>

            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelExport">取 消</el-button>
              <el-button type="primary" @click="exportSave($event)">上传</el-button>
            </div>
          </el-dialog>
          <!-- </div> -->
             <!--子表编辑 -->
          <el-dialog title="编辑"
                     :visible.sync="dialogChildVisible"
                     :before-close="closeChildDialog"
                     :close-on-click-modal="false"
                     class="receiptWidth600 childWidth">
            <el-form :model="formChild"
                     :rules="rules"
                     ref="form"
                     style="margin-left: 30px"
                     class="customerdata"
                     label-width="110px">
              
              <span class="formUpdate">*</span>
              <el-form-item label="商品条形码："
                            style="width:100%">
                <el-input v-model="formChild.productBarcode"
                          placeholder="请输入商品条形码"
                          style="width:300px"></el-input>
              </el-form-item>
              <span class="formUpdate" style="left: 20px;">*</span>
              <el-form-item label="商品名称："
                            class="marginListAdd">
                <el-input v-model="formChild.productName"
                          placeholder="请输入商品名称"
                          style="width:300px"></el-input>
              </el-form-item>
                <span class="formUpdate" style="left: 20px;">*</span>
              <el-form-item label="最小单位："
                            class="marginListAdd">
                <el-input v-model="formChild.productUnit"
                          placeholder="请输入最小单位"
                          style="width:300px"></el-input>
              </el-form-item>
                <span class="formUpdate" style="left: 20px;">*</span>
              <el-form-item label="规格型号："
                            class="marginListAdd">
                <el-input v-model="formChild.productModel"
                          placeholder="请输入规格型号"
                          style="width:300px"></el-input>
              </el-form-item>
                <span class="formUpdate" style="left: 20px;">*</span>
              <el-form-item label="商品类型："
                            class="marginListAdd">
                <el-input v-model="formChild.productType"
                          placeholder="请输入商品类型"
                          style="width:300px"></el-input>
              </el-form-item>
                <span class="formUpdate" style="left: 7px;">*</span>
              <el-form-item label="商品有效期："
                            class="marginListAdd">
               <el-date-picker
                v-model="formChild.productEffective"
                type="date"
                style="width:300px"
                placeholder="选择商品有效期"
                >
              </el-date-picker>
              </el-form-item>
              <span class="formUpdate" style="left: 20px;">*</span>
              <el-form-item label="到货数量：">
                <el-input v-model="formChild.productQuantity"
                          placeholder="请输入到货数量"
                          style="width:300px"></el-input>
              </el-form-item>
                <span class="formUpdate" style="left: 50px;">*</span>
              <el-form-item label="单价：">
                <el-input v-model="formChild.productPrice"
                          placeholder="请输入单价"
                          style="width:300px"></el-input>
              </el-form-item>
                <span class="formUpdate" style="left: 50px;">*</span>
              <el-form-item label="总价：">
                <el-input v-model="formChild.productAmount"
                          placeholder="请输入总价"
                          style="width:300px"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="closeChildDialog">取 消</el-button>
              <el-button 
                         type="primary"
                         @click="createChild">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  page,
  childPage,
  addObj,
  setInfo,
  getObj,
  addDownLoad,
  addUpload,
  delObj,
  currencyObj,
  childGetObj,
  childSave,
  childDel,
  supplierPage
} from "api/purchase/application/index";
import { mapGetters } from "vuex";
import $ from "jquery";
var dateUtils = require("silly-datetime");
import { getToken } from "utils/auth";
import axios from "axios";
Vue.prototype.$http = axios;
export default {
  name: "application",
  components: {
    // 引入编辑的组件
    // "contrast-status": () => import("./components/contrastStatus.vue")
  },
  data() {
    return {
      // accessToken: {
      accessToken: getToken(),
      // },
      currency: "",
      currDisabled: false,
      total: 0,
      loading: {
        tableLoading: false,
        childrenLoading: false
      },
      list: [{ childrenList: [] }],

      listQuery: {
        _type_: "equal",
        page: 1,
        limit: 10
      },
      query: {
        purchaseNo: "",
        // isPayed: "",
        purchaseTimes: "",
        purchaseType:'',
        remark:'',
        supplierId:''
      },
      nameInfo: "",
      form: {
        id: "",
        purchaseNo: "",
        purchaseTime: "",
        carryoverCost: "",
        purchaseType: "",
        remark: "",
        applyAmount: "",
        currency: "",
        supplierId:'',
        supplierName: '',
        purchaseUser:'',
        inspector:'',
        applyStatus:''
      },
      formChild: {

      },
      selectType: [
        {
          value: '0',
          label: "款到发货"
        },
        {
          value: '1',
          label: "以销待结"
        }
      ],
      selectApply: [
          {
          value: '0',
          label: "待审核"
        },
        {
          value: '1',
          label: "已审核"
        }
      ],
      selectStatus: [
        {
          value: 0,
          label: "未付款"
        },
        {
          value: 1,
          label: "已付款"
        }
      ],
      dialogFormVisible: false,
      dialogChildVisible: false,
      dialogVisible: false,
      // 上传
      uploadUrls: {
        excelUrl: "",
        excelFileList: []
      },
      supplierSelect:[],
      selectCurrency: [],
      href: addDownLoad,
      filePath: "",
      purchaseNo: "",
      event: "",
      rules: {
      }
    };
  },
  created() {
    this.getList();
    this.downLoad();
    this.currencyNameInfo();
    this.supplierList()
    // this.BillTypeInfo();
    // this.BillNameInfo();
    // this.DateTypeInfo()
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
  methods: {
    // 币种下拉
    currencyNameInfo() {
      let param = {
        type: "AMT"
      };
      currencyObj(param).then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let nameObj = {};
          nameObj.label = response.data[i].name;
          nameObj.value = response.data[i].code;
          this.selectCurrency.push(nameObj);
        }
      });
    },
    // 供应商名称
    supplierList(){
      let query = {}
      supplierPage(query).then(res => {
        this.supplierSelect = res.data
      })
    },
    getList() {
      let supplierName = ''
       for (var i = 0; i < this.supplierSelect.length; i++) {
          if(this.supplierSelect[i].id == this.query.supplierId){
            supplierName = this.supplierSelect[i].supplierName
          }
        }
      this.loading.tableLoading = true;
      let param = {
        purchaseNo: this.query.purchaseNo,
        purchaseType: this.query.purchaseType,
        purchaseTimes: this.query.purchaseTimes,
        remark:this.query.remark,
        supplierId: this.query.supplierId,
        supplierName: supplierName,
        ...this.listQuery
      };
      if (param.purchaseTimes !== "") {
        var start =
          param.purchaseTimes[0] === null
            ? null
            : dateUtils.format(param.purchaseTimes[0], "YYYY.MM.DD");
        var end =
          param.purchaseTimes[1] === null
            ? null
            : dateUtils.format(param.purchaseTimes[1], "YYYY.MM.DD");
        param.purchaseTimes = `${start}～${end}`;
      }
      if (param.purchaseTimes == "null～null") {
        param.purchaseTimes = "";
      }
      page(param).then(response => {
        for (var i = 0; i < response.data.rows.length; i++) {
          response.data.rows[i].childrenList = [];
        }
        this.list = response.data.rows;
        this.total = response.data.total;
        this.loading.tableLoading = false;
      });
    },
    // 查看详情
    detailName(row) {
      this.loading.childrenLoading = true;
      let param = {
        purchaseNo: row.purchaseNo
      };
      childPage(param).then(response => {
        // console.log(row)
        row.childrenList = response.data;
        // this.childrenList = response.data;
        // console.log(this.childrenList)
        this.loading.childrenLoading = false;
      });
    },
    handleFilter() {
      this.getList();
      // this.orderTotal()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },

    // 关闭按钮
    closeDialog() {
      this.dialogFormVisible = false;
      // this.$refs['form'].resetTemp()
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      // const set = this.$refs;
      // set[formName].resetTemp();
    },
    // 新增
    addDiction() {
      this.resetTemp();
      this.nameInfo = "新增采购单";
      this.dialogFormVisible = true;
    },
    //编辑
    handleUpdate(row) {
      let self = this;
      this.nameInfo = "编辑采购单";
      this.resetTemp()
      getObj(row.id).then(response => {
        // console.log(response.data.fixDate)
        if(response.data.purchaseType == 0){
          response.data.purchaseType = '0'
        }else if (response.data.purchaseType == 1){
          response.data.purchaseType = '1'
        }
         if(response.data.applyStatus == 0){
          response.data.applyStatus = '0'
        }else if (response.data.applyStatus == 1){
          response.data.applyStatus = '1'
        }
        self.form.purchaseNo = response.data.purchaseNo
        self.form.purchaseTime = response.data.purchaseTime
        self.form.carryoverCost = response.data.carryoverCost
        self.form.purchaseType = response.data.purchaseType
        self.form.remark = response.data.remark
        self.form.applyAmount = response.data.applyAmount
        self.form.currency = response.data.currency
        self.form.supplierId = response.data.supplierId
         self.form.purchaseUser = response.data.purchaseUser
        self.form.inspector = response.data.inspector
        self.form.applyStatus = response.data.applyStatus
        self.form.id = row.id
          // self.form = response.data;
        this.dialogFormVisible = true
      });
    },
    update(formName) {
      const set = this.$refs;
          if (!this.form.purchaseNo) {
            this.$message({
              message: "采购单编号不能为空！",
              type: "error",
              duration: 2000
            });
            return false;
          }
          if (!this.form.supplierId) {
            this.$message({
              message: "供应商名称不能为空！",
              type: "error",
              duration: 2000
            });
            return false;
          }
           if (!this.form.currency) {
            this.$message({
              message: "货币类型不能为空！",
              type: "error",
              duration: 2000
            });
            return false;
          }
           if (!this.form.purchaseType) {
            this.$message({
              message: "采购单类型不能为空！",
              type: "error",
              duration: 2000
            });
            return false;
          }
            if (!this.form.purchaseUser) {
            this.$message({
              message: "采办负责人不能为空！",
              type: "error",
              duration: 2000
            });
            return false;
          }
            if (!this.form.inspector) {
            this.$message({
              message: "查验员不能为空！",
              type: "error",
              duration: 2000
            });
            return false;
          }
            if (!this.form.applyStatus) {
            this.$message({
              message: "审核状态不能为空！",
              type: "error",
              duration: 2000
            });
            return false;
          }
          let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
          if (this.form.carryoverCost) {
            if (reg.test(this.form.carryoverCost) === false) {
              this.$message({
                message: "结转费只能为数字且不能为负数！",
                type: "error",
                duration: 2000
              });
              return false;
            }
          }
          let reg3 = /^\d+$|^\d+[.]?\d+$/;
          if (this.form.applyAmount && reg3.test(this.form.applyAmount) === false) {
            this.$message({
              message: "申请金额只能为数字！",
              type: "error",
              duration: 2000
            });
            return false;
          }
         let supplierName = ''
           for (var i = 0; i < this.supplierSelect.length; i++) {
              if(this.supplierSelect[i].id == this.form.supplierId){
            supplierName = this.supplierSelect[i].supplierName
          }
        }
          let nForm = {
            id: this.form.id,
            purchaseNo: this.form.purchaseNo,
            purchaseTime: (this.form.purchaseTime = ""
              ? ""
              : dateUtils.format(this.form.purchaseTime, "YYYY-MM-DD")),
            carryoverCost: this.form.carryoverCost,
            purchaseType: this.form.purchaseType,
            applyAmount: this.form.applyAmount,
            currency: this.form.currency,
            remark: this.form.remark,
            supplierName: supplierName,
            supplierId: this.form.supplierId,
            purchaseUser:this.form.purchaseUser,
            inspector:this.form.inspector,
            applyStatus:this.form.applyStatus
          };
          setInfo(nForm).then(response => {
            if (response.rel == true) {
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success",
                duration: 2000
              });
              this.dialogFormVisible = false;
              this.getList();
            } else {
              this.$notify({
                title: "失败",
                message: response.message,
                type: "error",
                duration: 2000
              })
        }
      })
    },

    create(formName) {
      const set = this.$refs;
          if (!this.form.purchaseNo) {
            this.$message({
              message: "采购单编号不能为空！",
              type: "error",
              duration: 2000
            });
            return false;
          }
         if (!this.form.supplierId) {
            this.$message({
              message: "供应商名称不能为空！",
              type: "error",
              duration: 2000
            });
            return false;
          }
           if (!this.form.currency) {
             this.$message({
              message: "货币类型不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
           if (!this.form.purchaseType) {
            this.$message({
              message: "采购单类型不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          if (!this.form.purchaseUser) {
            this.$message({
              message: "采办负责人不能为空！",
              type: "error",
              duration: 2000
            });
            return false;
          }
            if (!this.form.inspector) {
            this.$message({
              message: "查验员不能为空！",
              type: "error",
              duration: 2000
            });
            return false;
          }
            if (!this.form.applyStatus) {
            this.$message({
              message: "审核状态不能为空！",
              type: "error",
              duration: 2000
            });
            return false;
          }
          let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
          if (this.form.carryoverCost) {
            if (reg.test(this.form.carryoverCost) === false) {
              this.$message({
                message: "结转费只能为数字且不能为负数！",
                type: "error",
                duration: 2000
              });
              return false;
            }
          }
          let reg3 = /^\d+$|^\d+[.]?\d+$/;
          if (this.form.applyAmount && reg3.test(this.form.applyAmount) === false) {
            this.$message({
              message: "申请金额只能为数字！",
              type: "error",
              duration: 2000
            });
            return false;
          }
          let supplierName = ''
           for (var i = 0; i < this.supplierSelect.length; i++) {
              if(this.supplierSelect[i].id == this.form.supplierId){
            supplierName = this.supplierSelect[i].supplierName
          }
        }
          let nForm = {
            purchaseNo: this.form.purchaseNo,
            purchaseTime: (this.form.purchaseTime = ""
              ? ""
              : dateUtils.format(this.form.purchaseTime, "YYYY-MM-DD")),
            carryoverCost: this.form.carryoverCost,
            purchaseType: this.form.purchaseType,
            applyAmount: this.form.applyAmount,
            currency: this.form.currency,
            remark: this.form.remark,
            supplierName: supplierName,
            supplierId: this.form.supplierId,
            purchaseUser:this.form.purchaseUser,
            inspector:this.form.inspector,
            applyStatus:this.form.applyStatus
          };

          addObj(nForm).then(response => {
            if (response.rel == true) {
              this.$notify({
                title: "成功",
                message: "新增成功",
                type: "success",
                duration: 2000
              });
              this.dialogFormVisible = false;
              this.getList();
            } else {
              this.$notify({
                title: "失败",
                message: response.message,
                type: "error",
                duration: 2000
              });
        }
      });
    },
    //上传清单
    closeDialogExport() {
      this.dialogVisible = false;
    },
    exportInfo(row) {
      this.filePath = "";
      this.purchaseNo = row.purchaseNo;
      this.currency = row.currency;
      this.dialogVisible = true;
      if (row.currencyName != "") {
        this.currDisabled = true;
      } else {
        this.currDisabled = false;
      }
    },
    // 下载文件
    downLoad() {
      addDownLoad().then(res => {
        let host = window.location.host;
        this.href = "//" + host + "/api/ordersys/purchaseItem/download";
      });
    },
    getFile(event) {
      this.filePath = event.target.files[0];
    },
    exportSave(event) {
      if (this.filePath === "") {
        this.$message({
          message: "提交失败,请选择上传文件！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      if (this.currency === "") {
        this.$message({
          message: "提交失败,请选择货币类型！",
          type: "error",
          duration: 2000
        });
        return false;
      }
      this.event = event;
      this.event.preventDefault();
      var formData = new FormData();
      formData.append("file", this.filePath);
      formData.append("purchaseNo", this.purchaseNo);
      formData.append("currency", this.currency);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          accessToken: this.accessToken
        }
      };
      this.$http
        .post("/api/ordersys/purchaseItem/import", formData, config)
        // .post("/api/ordersys/customsTaxInfo/upload", formData, config)
        .then(res => {
          this.$refs.clearFile.value = "";
          // if (res.rel) {
          if (res.data.rel == true) {
            this.$notify({
              title: "成功",
              message: "上传成功",
              type: "success",
              duration: 2000
            });
            this.dialogVisible = false;
            this.getList();
          } else {
            this.$notify({
              title: "失败",
              message: res.data.message,
              type: "error",
              duration: 2000
            });
          }
          if (res.data.status !== 200) {
            this.$notify({
              title: "失败",
              message: res.data.message,
              type: "error",
              duration: 2000
            });
          }

          // this.$alert(res.message, '导入备案信息', {
          //   confirmButtonText: '确定',
          //   callback: action => {
          //   }
          // })

          // }
        });
    },
    cancelExport() {
      this.dialogVisible = false;
    },
    //删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj(row.id).then(res => {
          if (res.rel == true) {
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000
            });
            const index = this.list.indexOf(row);
            this.list.splice(index, 1);
          } else {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000
            });
          }
          if (res.status !== 200) {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000
            });
          }
        });
      });
    },
    // 解析成功 跳转详情页
    texDetail(row) {
      let self = this;
      window.sessionStorage.setItem("purchaseNo", "");
      window.sessionStorage.setItem("purchaseNo", row.purchaseNo);
      window.sessionStorage.setItem("id", row.id);
      window.sessionStorage.setItem("roleId", 1);
      self.$router.push("/index/purchase/applicationDetail");
    },
    resetTemp() {
      this.form = {
        purchaseNo: "",
        purchaseTime: "",
        carryoverCost: "",
        purchaseType: "",
        applyAmount: "",
        currency: "",
        remark: "",
        supplierId:'',
        supplierName:'',
        purchaseUser:'',
        inspector:'',
        applyStatus:''
      }
    },
     // 关闭按钮
    closeChildDialog() {
      this.dialogChildVisible = false;
    },
    // 子表编辑true
    childUpdate(row) {
       this.dialogChildVisible = true;
       childGetObj(row.id).then(res => {
         if(res.rel) {
           this.formChild = res.data
         } else {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000
            });
         }
       })
    },
    createChild() {
      if (!this.formChild.productBarcode) {
            this.$message({
              message: "商品条形码不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          if (!this.formChild.productName) {
            this.$message({
              message: "商品名称不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          if (!this.formChild.productUnit) {
            this.$message({
              message: "最小单位不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          if (!this.formChild.productModel) {
            this.$message({
              message: "规格型号不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          if (!this.formChild.productType) {
            this.$message({
              message: "商品类型不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          if (!this.formChild.productEffective) {
            this.$message({
              message: "商品有效期不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
           if (!this.formChild.productQuantity) {
            this.$message({
              message: "到货数量不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
           if (!this.formChild.productPrice) {
            this.$message({
              message: "单价不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
           if (!this.formChild.productAmount) {
            this.$message({
              message: "总价不能为空！",
              type: "error",
              duration: 2000
            });
            return false
          }
          let reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
          if (reg.test(this.formChild.productQuantity) === false) {
            this.$message({
              message: "到货数量只能为数字且不能为负数！",
              type: 'error',
              duration: 2000
            });
            return false;
          }
          if (reg.test(this.formChild.productPrice) === false) {
            this.$message({
              message: "单价只能为数字且不能为负数！",
              type: 'error',
              duration: 2000
            });
            return false;
          }
          if (reg.test(this.formChild.productAmount) === false) {
            this.$message({
              message: "总价只能为数字且不能为负数！",
              type: 'error',
              duration: 2000
            });
            return false;
          }
      this.formChild.productEffective =  dateUtils.format(this.formChild.productEffective, "YYYY-MM-DD"),
      this.$confirm("确定要保存吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.dialogChildVisible = false;
    childSave(this.formChild.id, this.formChild).then(res => {
        if(res.rel){
           this.$notify({
              title: "成功",
              message: '修改成功',
              type: "success",
              duration: 2000
            });
           this.getList();
        } else {
           this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000
            });
        }
         if (res.status !== 200) {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000
            });
          }
      })
      }).catch(() => {})
    },
    // 子表删除
    childDelete(row) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
         childDel(row.id).then(res => {
           if(res.rel) {
            this.$notify({
              title: "成功",
              message: '删除成功',
              type: "success",
              duration: 2000
            });
           this.getList();
           } else {
           this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000
            });
        }
         if (res.status !== 200) {
            this.$notify({
              title: "失败",
              message: res.message,
              type: "error",
              duration: 2000
            });
          }
        })
      })
    }
  }
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.lineHeight {
  height: 20px;
}
.el-table{
  overflow-y:auto ;
}
.btnMb {
  margin-bottom: 5px;
  // float: right;
  margin-right: 15px;
  margin-top: 10px;
  text-align: right;
}
.btnMb button {
  margin-left: 15px;
}
.el-input,
.el-select {
  width: 200px;
}
.dialog-footer {
  text-align: right;
  margin-top: -20px;
}
.btnSize {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  color: #fff;
  margin: 0;
  padding: 6px 14px;
  border-radius: 4px;
  margin-right: 3px;
  text-align: center;
  margin-top: 1px;
  margin-left: 4px;
}
.notecss {
  font-size: 13px;
  color: #9eb1c6;
}
.w85 {
  // width: 85%;
  // margin: 0 auto;
  line-height: 20px;
  h5 {
    margin-top: 10px;
  }
}
.exportSpan {
  display: block;
  margin-top: -13px;
  margin-bottom: 10px;
  color: #20a0ff;
}
.formUpdate {
  display: inline-block;
  position: relative;
  top: 27px;
  left: 8px;
  color: red;
}
.childWidth .el-form-item {
     margin-bottom: 2px; 
}
.formStyle {
   position: relative;
}
.formStyle .formUpdate {
  display: inline-block;
  position: absolute;
  top: 10px;
  left: 7px;
  color: red;
}
</style>



