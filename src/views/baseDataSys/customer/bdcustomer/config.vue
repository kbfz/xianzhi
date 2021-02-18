<template>
  <div class="config">
    <el-button type="primary"
               @click="backCustomer">&lt; 返回客户列表</el-button>
    <div class="wrap">
      <p class="title">客户信息</p>
      <p class="content">客户名称：{{copName}}</p>
      <p class="content">客户编码：{{qstCode}}</p>
    </div>
    <div class="wrap">
      <p class="title">基础配置</p>
      <el-button class="btn"
                 v-if="configContent.indx"
                 icon="edit"
                 @click="handleCreateConfig('update')"
                 type="primary">修改</el-button>
      <el-button class="btn"
                 v-else
                 icon="edit"
                 @click="handleCreateConfig('create')"
                 type="primary">添加</el-button>
      <!-- <el-row>
        <el-col :span="12">
          报关行企业：{{configContent.declarationName}}
        </el-col>
        <el-col :span="12">
          是否代获取物流单号：
          <span v-if="configContent.isLogisticsObtain === 1">是</span>
          <span v-if="configContent.isLogisticsObtain === 0">否</span>
        </el-col>
      </el-row> -->
      <!-- <el-row>
        <el-col :span="12">
          仓库：{{configContent.storageName}}
        </el-col>
        <el-col :span="12">
          是否代获取支付单号：
          <span v-if="configContent.isPaymentObtain === 1">是</span>
          <span v-if="configContent.isPaymentObtain === 0">否</span>
        </el-col>
      </el-row> -->
      <el-row>
        <!-- <el-col :span="12">
          默认申报身份：{{configContent.cbeName}}
        </el-col> -->
        <el-col :span="12">
          默认电商平台：{{configContent.platformName}}
        </el-col>
         <el-col :span="12">
          支付企业：{{configContent.paymentName}}
        </el-col>

        <!-- <el-col :span="12">
          是否全速通推送订单：
          <span v-if="configContent.isOrderPush === 1">是</span>
          <span v-if="configContent.isOrderPush === 0">否</span>
        </el-col> -->
      </el-row>

      <el-row>
       
        <el-col :span="12">
          物流企业：{{configContent.logisticsName}}
        </el-col>
        <el-col :span="12">
          推送仓库开关：
          <span v-if="configContent.pushWmsSwitch === 1">开启</span>
          <span v-if="configContent.pushWmsSwitch === 0">不开启</span>
        </el-col>

      </el-row>
      <el-row>

        
        <el-col :span="12">
          是否截单：
          <span v-if="configContent.isPaymentPush === 1">截单</span>
          <span v-if="configContent.isPaymentPush === 0">不截单</span>
        </el-col>
      </el-row>
    </div>
    <div class="wrap">
      <p class="title">关区配置</p>
      <el-button class="btn"
                 icon="edit"
                 @click="handleCreate('add')"
                 type="primary">添加</el-button>
      <el-table :key='tableKeyAgent'
                :data="agentList"
                v-loading.body="listLoading"
                border
                fit
                style="width: 100%">
        <el-table-column width="200px"
                         align="center"
                         label="关区名称"
                         show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.districtName}}</span>
          </template>
        </el-table-column>
        <el-table-column width="200px"
                         align="center"
                         label="关区代码"
                         show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.districtCode}}</span>
          </template>
        </el-table-column>
        <el-table-column width="200px"
                         align="center"
                         label="电商平台"
                         show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.platformName}}</span>
          </template>
        </el-table-column>
        <el-table-column width="200px"
                         align="center"
                         label="申报身份"
                         show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.cbeName}}</span>
          </template>
        </el-table-column>
        <el-table-column width="150px"
                         align="center"
                         label="报关行企业"
                         show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.agentName}}</span>
          </template>
        </el-table-column>
        <el-table-column width="200px"
                         align="center"
                         label="仓库"
                         show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.warehouseName}}</span>
          </template>
        </el-table-column>
        <el-table-column width="200px"
                         align="center"
                         label="关区标识"
                         show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.districtOutCode}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="操作"
                         width="150">
          <template scope="scope">
            <el-button size="small"
                       @click="handleCreate(scope)"
                       type="primary">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="wrap">
      <p class="title">回传客户配置</p>
      <el-button class="btn"
                 icon="edit"
                 @click="handleCreateCallback('add')"
                 type="primary">添加</el-button>
      <el-table :key='tableKeyCallback'
                :data="callbackList"
                v-loading.body="listLoading"
                border
                fit
                style="width: 100%">
        <el-table-column width="250px"
                         align="center"
                         label="电商平台名称"
                         show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.platformName}}</span>
          </template>
        </el-table-column>
        <el-table-column width="250px"
                         align="center"
                         label="电商平台"
                         show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.platformCode}}</span>
          </template>
        </el-table-column>
        <el-table-column width="200px"
                         align="center"
                         label="回调地址"
                         show-overflow-tooltip>
          <template scope="scope">
            <span>{{scope.row.url}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="操作"
                         width="150">
          <template scope="scope">
            <el-button size="small"
                       @click="handleCreateCallback(scope)"
                       type="primary">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 基础配置dialog start -->
    <el-dialog title="基础配置"
               :visible.sync="dialogFormVisibleConfig"
               :before-close="closeDialog"
               :close-on-click-modal="false"
               class="receiptWidth">
      <p class="dialogCustomer">客户名称：{{copName}} <span style="margin-left:20px;">客户编码：{{qstCode}}</span></p>
      <!-- <p class="content">客户编码：{{qstCode}}</p> -->
      <el-form :model="configForm"
               :rules="rules"
               ref="configForm"
               label-width="160px"
               :inline="true"
               class="formLeft">
        <!-- <div> -->
        <!-- <span class="xhText">*</span> -->
        <!-- <el-form-item label="客户名称"
                      prop="customerName"
                      label-width="148px">
          <el-select placeholder="请选择客户名称"
                     v-model="configForm.customerName"
                     clearable
                     style="width: 200px"
                     filterable>
            <el-option v-for="item in selectCustom"
                       :key="item.value"
                       :label="item.label"
                       :value="item"></el-option>
          </el-select>
          <div class="el-form-item__error"
               v-if="customerValue">请选择客户名称</div>
        </el-form-item> -->
        <!-- </div> -->
        <!-- <span class="xhText">*</span>
        <el-form-item label="默认申报身份"
                      prop="cbeName"
                      label-width="153px">
          <el-select placeholder="请选择申报身份"
                     v-model="configForm.cbeName"
                     clearable
                     style="width: 200px"
                     filterable>
            <el-option v-for="item in selectCbeName"
                       :key="item.value"
                       :label="item.label"
                       :value="item"></el-option>
          </el-select>
          <div class="el-form-item__error"
               v-if="cbeValue">请选择申报身份</div>
        </el-form-item> -->
        <span class="xhText l61">*</span>
        <el-form-item label="默认电商平台"
                      prop="platformName"
                      label-width="158px">
          <el-select placeholder="请选择电商平台"
                     v-model="configForm.platformName"
                     clearable
                     style="width: 200px"
                     filterable>
            <el-option v-for="item in selectplat"
                       :key="item.value"
                       :label="item.label"
                       :value="item"></el-option>
          </el-select>
          <div class="el-form-item__error"
               v-if="platValue">请选择电商平台</div>
        </el-form-item>

        <!-- <el-form-item label="报关行企业"
                      prop="declarationName">
          <el-select placeholder="请选择报关行企业"
                     v-model="configForm.declarationName"
                     clearable
                     style="width: 200px"
                     filterable>
            <el-option v-for="item in selectdeclarationName"
                       :key="item.value"
                       :label="item.label"
                       :value="item"></el-option>
          </el-select>
          <div class="el-form-item__error"
               v-if="declarationValue">请选择报关行企业</div>
        </el-form-item> -->
        <!-- <el-form-item label="仓库"
                      prop="storageName">
          <el-select placeholder="请选择仓库"
                     v-model="configForm.storageName"
                     clearable
                     style="width: 200px"
                     filterable>
            <el-option v-for="item in selectstorage"
                       :key="item.value"
                       :label="item.label"
                       :value="item"></el-option>
          </el-select>
          <div class="el-form-item__error"
               v-if="storageNameValue">请选择仓库</div>
        </el-form-item> -->
        <el-form-item label="支付企业"
                      prop="paymentName">
          <el-select placeholder="请选择支付企业"
                     v-model="configForm.paymentName"
                     clearable
                     style="width: 200px"
                     filterable>
            <el-option v-for="item in selectpayment"
                       :key="item.value"
                       :label="item.label"
                       :value="item"></el-option>
          </el-select>
          <div class="el-form-item__error"
               v-if="paymentNameValue">请选择支付企业</div>
        </el-form-item>
        <el-form-item label="物流企业"
                      prop="logisticsName">
          <el-select placeholder="请选择物流企业"
                     v-model="configForm.logisticsName"
                     clearable
                     style="width: 200px"
                     filterable>
            <el-option v-for="item in selectlogistics"
                       :key="item.value"
                       :label="item.label"
                       :value="item"></el-option>
          </el-select>
          <div class="el-form-item__error"
               v-if="logisticsNameValue">请选择物流企业</div>
        </el-form-item>
        <!-- <el-form-item label="是否代获取物流单号"
                      prop="isLogisticsObtain">
          <el-radio v-model="configForm.isLogisticsObtain"
                    label="1"
                    style="margin-left: 25px;margin-right: 40px">是</el-radio>
          <el-radio v-model="configForm.isLogisticsObtain"
                    label="0"
                    style="margin-right: 23px">否</el-radio>
        </el-form-item>
        <el-form-item label="是否代获取支付单号"
                      prop="isPaymentObtain">
          <el-radio v-model="configForm.isPaymentObtain"
                    label="1"
                    style="margin-left: 25px;margin-right: 40px">是</el-radio>
          <el-radio v-model="configForm.isPaymentObtain"
                    label="0"
                    style="margin-right: 41px">否</el-radio>
        </el-form-item>
        <el-form-item label="是否全速通推送订单"
                      prop="isOrderPush">
          <el-radio v-model="configForm.isOrderPush"
                    label="1"
                    style="margin-left: 25px;margin-right: 40px">是</el-radio>
          <el-radio v-model="configForm.isOrderPush"
                    label="0"
                    style="margin-right: 23px">否</el-radio>
        </el-form-item>-->
        <el-form-item label="推送仓库开关"
                      prop="pushWmsSwitch">
          <el-radio v-model="configForm.pushWmsSwitch"
                    label="1"
                    style="margin-left: 25px;margin-right: 40px">开启</el-radio>
          <el-radio v-model="configForm.pushWmsSwitch"
                    label="0"
                    style="margin-right: 41px">不开启</el-radio>
        </el-form-item>
        <el-form-item label="是否截单"
                      prop="isPaymentPush">
          <el-radio v-model="configForm.isPaymentPush"
                    label="1"
                    style="margin-left: 25px;margin-right: 40px">截单</el-radio>
          <el-radio v-model="configForm.isPaymentPush"
                    label="0"
                    style="margin-right: 23px">不截单</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel('configForm')">取 消</el-button>
        <el-button v-if="dialogStatusConfig=='create' || dialogStatusConfig=='update'"
                   type="primary"
                   @click="createConfig('configForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 基础配置dialog end -->

    <!-- 关区配置 start -->
    <el-dialog title="关区配置"
               :visible.sync="dialogFormVisible"
               :before-close="closeDialog"
               :close-on-click-modal="false"
               class="receiptWidth450">
      <p class="content">客户名称：{{copName}}</p>
      <p class="content">客户编码：{{qstCode}}</p>
      <el-form :model="agentForm"
               :rules="rules"
               ref="agentForm"
               label-width="140px"
               class="formLeft">
        <!-- <span class="xhText">*</span> -->
        <!-- <el-form-item label="客户名称"
                      style="margin-top: -20px"
                      prop="customerName">
          <el-select placeholder="请选择客户名称"
                     v-model="form.customerName"
                     clearable
                     style="width: 200px"
                     filterable>
            <el-option v-for="item in selectCustom"
                       :key="item.value"
                       :label="item.label"
                       :value="item"></el-option>
          </el-select>
          <div class="el-form-item__error"
               v-if="customerValue">请选择客户名称</div>
        </el-form-item> -->
        <!-- <span class="xhText">*</span> -->
        <el-form-item label="关区名称"
                      prop="districtName">
          <el-select placeholder="请选择关区名称"
                     v-model="agentForm.districtName"
                     clearable
                     style="width: 200px"
                     filterable>
            <el-option v-for="item in districtList"
                       :key="item.value"
                       :label="item.label"
                       :value="item"></el-option>
          </el-select>
          <div class="el-form-item__error"
               v-if="districtValue">请选择关区名称</div>
        </el-form-item>
        <el-form-item label="电商平台名称"
                      prop="platformName">
          <el-select v-model="agentForm.platformName"
                     placeholder="请选择电商平台名称"
                     style="width: 200px"
                     filterable
                     clearable>
            <el-option v-for="item in selectplat"
                       :key="item.value"
                       :label="item.label"
                       :value="item">
            </el-option>
          </el-select>
          <div class="el-form-item__error"
               v-if="platformNameCallback">请选择电商平台名称</div>
        </el-form-item>
        <span class="xhText" style="top:29px;">*</span>
        <el-form-item label="申报身份"
                      prop="cbeName">
          <el-select placeholder="请选择申报身份"
                     v-model="agentForm.cbeName"
                     clearable
                     style="width: 200px"
                     filterable>
            <el-option v-for="item in selectCbeName"
                       :key="item.value"
                       :label="item.label"
                       :value="item"></el-option>
          </el-select>
          <div class="el-form-item__error"
               v-if="cbeValue">请选择申报身份</div>
        </el-form-item>
        <!-- <span class="xhText l57">*</span> -->
        <el-form-item label="报关行企业"
                      prop="agentName">
          <el-select placeholder="请选择报关行企业"
                     v-model="agentForm.agentName"
                     clearable
                     style="width: 200px"
                     filterable>
            <el-option v-for="item in selectdeclarationName"
                       :key="item.value"
                       :label="item.label"
                       :value="item"></el-option>
          </el-select>
          <div class="el-form-item__error"
               v-if="platValue">请选择报关行企业</div>
        </el-form-item>
        <!-- <span class="xhText l98">*</span> -->
        <el-form-item label="仓库"
                      prop="warehouseName">
          <el-select placeholder="请选择仓库"
                     v-model="agentForm.warehouseName"
                     clearable
                     style="width: 200px"
                     filterable>
            <el-option v-for="item in selectstorage"
                       :key="item.value"
                       :label="item.label"
                       :value="item"></el-option>
          </el-select>
          <div class="el-form-item__error"
               v-if="warehouseValue">请选择仓库</div>
        </el-form-item>
        <el-form-item label="关区标识">
          <el-input v-model="agentForm.districtOutCode"
                    placeholder="请输入关区标识"
                    style="width: 200px"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel('agentForm')">取 消</el-button>
        <el-button v-if="dialogStatus=='create' || dialogStatus == 'update'"
                   type="primary"
                   @click="create('agentForm')">确 定</el-button>
        <!-- <el-button v-else
                         type="primary"
                         @click="update('form')">确 定</el-button> -->
      </div>
    </el-dialog>
    <!-- 关区配置 end -->

    <!-- 回传客户配置 start -->
    <el-dialog title="回传客户配置"
               :visible.sync="dialogFormVisibleCallback"
               :before-close="closeDialog"
               :close-on-click-modal="false"
               class="receiptWidth450">
      <el-form :model="form"
               :rules="rules"
               ref="form"
               label-width="130px"
               :inline="true"
               class="formLeft">
        <p class="content">客户名称：{{copName}}</p>
        <p class="content">客户编码：{{qstCode}}</p>
        <!-- <el-form-item label="客户名称"
                      prop="customerName">
          <el-select placeholder="请选择客户名称"
                     v-model="form.customerName"
                     clearable
                     style="width: 200px"
                     filterable
                     @change="changeValueCus">
            <el-option v-for="item in selectCustom"
                       :key="item.value"
                       :value="item"
                       :label="item.label"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="电商平台名称"
                      prop="platformName">
          <el-select v-model="form.platformName"
                     placeholder="请选择电商平台名称"
                     style="width: 200px"
                     filterable
                     @change="changeValue"
                     clearable
                     :popper-append-to-body="false">
            <el-option v-for="item in selectplat"
                       :key="item.value"
                       :label="item.label"
                       :value="item">
            </el-option>
          </el-select>
          <div class="el-form-item__error"
               v-if="platformNameCallback">请选择电商平台名称</div>
        </el-form-item>
        <el-form-item label="回调地址"
                      prop="url">
          <el-input v-model="form.url"
                    placeholder="请输入回调地址"></el-input>
          <div class="el-form-item__error"
               v-if="urlCallback">请输入回调地址</div>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatusCallback == 'create' || dialogStatusCallback == 'update'"
                   type="primary"
                   @click="createCallback('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 回传客户配置 end -->
  </div>
</template>

<script>
import {
  getConfig,
  getAgent,
  getCallback,
  page,
  addObj,
  getObj,
  putObj,
  addObjAgent,
  putObjAgent,
  addObjCallback,
  putObjCallback,
  customerSelect,
  cbeNameSelect,
  platSelect,
  clarationSelect,
  storageSelect,
  paymentSelect,
  districtSelect,
  logisticsSelect
} from "api/baseDataSys/customer/config/index";
import { mapGetters } from "vuex";
export default {
  name: "config",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/update")
  },
  data () {
    return {
      qstCode: '',
      copName: '',
      // config
      dialogFormVisibleConfig: false,
      dialogStatusConfig: "",
      customerValue: false,
      cbeValue: false,
      platValue: false,
      declarationValue: false,
      storageNameValue: false,
      paymentNameValue: false,
      logisticsNameValue: false,
      selectCustom: [],
      selectCbeName: [],
      selectplat: [],
      selectdeclarationName: [],
      selectstorage: [],
      selectpayment: [],
      districtList: [],
      selectlogistics: [],
      // agent
      customerValue: false,
      districtValue: false,
      platValue: false,
      warehouseValue: false,
      listLoading: true,
      tableKeyAgent: 0,
      agentList: [],
      agentForm: {
        customerName: { label: '', value: '' },
        qstCode: "",
        districtCode: "",
        districtName: { label: '', value: '' },
        agentQstCode: "",
        agentName: { label: '', value: '' },
        warehouseName: { label: '', value: '' },
        warehouseQstCode: "",
        districtOutCode:'',
        cbeName: { label: '', value: '' },
        platformName: { label: '', value: '' },
      },
      dialogFormVisible: false,
      dialogStatus: "",
      // callback
      tableKeyCallback: 0,
      callbackList: [],
      dialogFormVisibleCallback: false,
      dialogStatusCallback: "",
      selectPlatfrom: [],
      platformNameCallback: false,
      urlCallback: false,
      form: {
        customerName: { label: '', value: '' },
        platformName: { label: '', value: '' },
        url: '',
        indx: ''
      },
      rules: {
      },
      configContent: {
        indx: '',
        customerName: '',
        ebusinessQstcode: '',
        cbeCode: '',
        cbeName: '',
        platformCode: '',
        platformName: '',
        declarationQstcode: '',
        declarationName: '',
        storageQstcode: '',
        storageName: '',
        logisticsName: '',
        logisticsQstcode: '',
        paymentName: '',
        paymentQstcode: '',
        isLogisticsObtain: '',
        isOrderPush: '',
        isPaymentObtain: '',
        isPaymentPush: '',
        pushWmsSwitch: ''
      },
      configForm: {
        indx: '',
        customerName: { label: '', value: '' },
        ebusinessQstcode: '',
        cbeCode: '',
        cbeName: { label: '', value: '' },
        platformCode: '',
        platformName: { label: '', value: '' },
        declarationQstcode: '',
        declarationName: { label: '', value: '' },
        storageQstcode: '',
        storageName: { label: '', value: '' },
        logisticsName: { label: '', value: '' },
        logisticsQstcode: '',
        paymentName: { label: '', value: '' },
        paymentQstcode: '',
        isLogisticsObtain: '',
        isOrderPush: '',
        isPaymentObtain: '',
        isPaymentPush: '',
        pushWmsSwitch: ''
      }
    }
  },
  created () {
    if (this.$route.query.qstCode) {
      this.qstCode = this.$route.query.qstCode
      this.copName = this.$route.query.copName
      this.getConfigMethod()
      this.getAgentMethod()
      this.getCallbackListMethod()
      //获取基础配置下拉
      this.customerName()
      this.cbeNameName()
      this.paltName()
      this.clarationName()
      this.logisticsName()
      this.paymentName()
      this.storageName()
      this.districtName()
    }
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
  methods: {
    // 基础配置
    // 客户下拉选择
    customerName () {
      customerSelect().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectCustom.push(cutObj)
        }
      });
    },
    // 默认申报身份
    cbeNameName () {
      cbeNameSelect().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectCbeName.push(cutObj)
        }
      });
      console.log(333)
          console.log(this.selectCbeName)
    },
    // 默认电商平台 
    paltName () {
      platSelect().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectplat.push(cutObj)
        }
      });
    },
    // 报关行企业
    clarationName () {
      clarationSelect().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectdeclarationName.push(cutObj)
        }
      });
    },
    // 仓库
    storageName () {
      storageSelect().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectstorage.push(cutObj)
        }
      });
    },
    // 支付企业
    paymentName () {
      paymentSelect().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectpayment.push(cutObj)
        }
      });
    },
    // 关区名称
    districtName () {
      districtSelect().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.districtList.push(cutObj)
        }
      });
    },
    // 电商平台下拉框
    platSelect () {
      let param = {}
      platSelect(param).then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectPlatfrom.push(cutObj)
          console.log(1111)
          console.log(this.selectPlatfrom)
        }
      })
    },
    // 物流企业
    logisticsName () {
      logisticsSelect().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = response.data[i].key
          cutObj.value = response.data[i].value
          this.selectlogistics.push(cutObj)
        }
      });
    },
    // 关闭el-dialog 前的回调函数 重置表单
    closeDialog () {
      this.dialogFormVisibleConfig = false;
      this.dialogFormVisible = false;
      this.dialogFormVisibleCallback = false;
      // this.$refs["configForm"].resetFields();
      // this.$refs["agentForm"].resetFields();
      // this.$refs["form"].resetFields();
    },
    createConfig (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          let formData = {
            customerName: this.copName,
            ebusinessQstcode: this.qstCode,
            // cbeCode: this.configForm.cbeName.value,
            // cbeName: this.configForm.cbeName.label,
            platformCode: this.configForm.platformName.value,
            platformName: this.configForm.platformName.label,
            declarationQstcode: this.configForm.declarationName.value || '',
            declarationName: this.configForm.declarationName.label || '',
            storageQstcode: this.configForm.storageName.value || '',
            storageName: this.configForm.storageName.label || '',
            logisticsName: this.configForm.logisticsName.label || '',
            logisticsQstcode: this.configForm.logisticsName.value || '',
            paymentName: this.configForm.paymentName.label || '',
            paymentQstcode: this.configForm.paymentName.value || '',
            isLogisticsObtain: this.configForm.isLogisticsObtain,
            isOrderPush: this.configForm.isOrderPush,
            isPaymentObtain: this.configForm.isPaymentObtain,
            isPaymentPush: this.configForm.isPaymentPush,
            pushWmsSwitch: this.configForm.pushWmsSwitch
          }
          if (!formData.customerName) {
            this.customerValue = true
            return false
          } else {
            this.customerValue = false
          }
          // if (!formData.cbeName) {
          //   this.cbeValue = true
          //   return false
          // } else {
          //   this.cbeValue = false
          // }
          if (!formData.platformName) {
            this.platValue = true
            return false
          } else {
            this.platValue = false
          }
          console.log(formData)
          // if (!formData.declarationName || !formData.declarationQstcode) {
          //   this.declarationValue = true
          //   return false
          // } else {
          //   this.declarationValue = false
          // }
          // //仓库判空
          // if (!formData.storageName || !formData.storageQstcode) {
          //   this.storageNameValue = true
          //   return false
          // } else {
          //   this.storageNameValue = false
          // }
          // //支付企业判空
          // if (!formData.paymentName || !formData.paymentQstcode) {
          //   this.paymentNameValue = true
          //   return false
          // } else {
          //   this.paymentNameValue = false
          // }
          // //物流企业判空
          // if (!formData.logisticsName || !formData.logisticsQstcode) {
          //   this.logisticsNameValue = true
          //   return false
          // } else {
          //   this.logisticsNameValue = false
          // }
          console.log(formData)
          if (this.dialogStatusConfig == 'update') {
            formData.indx = this.configForm.indx
          }
          this.$confirm('确定要保存吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.dialogStatusConfig == 'create') {
              addObj(formData).then((res) => {
                this.dialogFormVisibleConfig = false;
                if (res.rel) {
                  this.getConfigMethod();
                  this.$notify({
                    title: "成功",
                    message: "创建成功",
                    type: "success",
                    duration: 2000
                  });
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
            } else if (this.dialogStatusConfig == 'update') {
              putObj(formData.indx, formData).then(res => {
                this.getConfigMethod()
                this.dialogFormVisibleConfig = false
                if (res.rel) {
                  this.$notify({
                    title: "成功",
                    message: "修改成功",
                    type: "success",
                    duration: 2000
                  });

                } else {
                  this.$notify({
                    title: "失败",
                    message: "系统异常",
                    type: "error",
                    duration: 2000
                  });
                }
              });
            }
          }).catch(() => { })
        } else {
          return false;
        }
      });
    },
    backCustomer () {
      this.$router.push('/index/baseDataSys/custome')
    },
    getConfigMethod () {
      let self = this
      getConfig(self.qstCode).then(response => {
        console.log(response)
        if (response.status == '200') {
          self.configContent = response.data
        }
      })
    },
    getAgentMethod () {
      this.listLoading = true
      let self = this
      getAgent(self.qstCode).then(response => {
        console.log(response)
        this.listLoading = false
        if (response.status == '200') {
          self.agentList = response.data
        }
      })
    },
    getCallbackListMethod () {
      let self = this
      getCallback(self.qstCode).then(response => {
        console.log(response)
        if (response.status == '200') {
          self.callbackList = response.data
        }
      })
    },
    handleCreateConfig (type) {
      if (type == 'create') {
        this.resetTempConfig();
        this.dialogStatusConfig = "create";
      } else if (type == 'update') {
        this.dialogStatusConfig = "update";
        let formData = {
          indx: this.configContent.indx,
          customerName: {
            label: this.configContent.customerName,
            value: this.configContent.ebusinessQstcode
          },
          cbeName: {
            label: this.configContent.cbeName,
            value: this.configContent.cbeCode
          },
          platformName: {
            label: this.configContent.platformName,
            value: this.configContent.platformCode
          },
          declarationName: {
            label: this.configContent.declarationName,
            value: this.configContent.declarationQstcode
          },
          storageName: {
            label: this.configContent.storageName,
            value: this.configContent.storageQstcode
          },
          logisticsName: {
            label: this.configContent.logisticsName,
            value: this.configContent.logisticsQstcode
          },
          paymentName: {
            label: this.configContent.paymentName,
            value: this.configContent.paymentQstcode
          },
          isLogisticsObtain: this.configContent.isLogisticsObtain,
          isOrderPush: this.configContent.isOrderPush,
          isPaymentObtain: this.configContent.isPaymentObtain,
          isPaymentPush: this.configContent.isPaymentPush,
          pushWmsSwitch: this.configContent.pushWmsSwitch
        }
        if (this.configContent.isLogisticsObtain === 1) {
          formData.isLogisticsObtain = '1'
        } else {
          formData.isLogisticsObtain = '0'
        }
        if (this.configContent.isOrderPush === 1) {
          formData.isOrderPush = '1'
        } else {
          formData.isOrderPush = '0'
        }
        if (this.configContent.isPaymentObtain === 1) {
          formData.isPaymentObtain = '1'
        } else {
          formData.isPaymentObtain = '0'
        }
        if (this.configContent.isPaymentPush === 1) {
          formData.isPaymentPush = '1'
        } else {
          formData.isPaymentPush = '0'
        }
        if (this.configContent.pushWmsSwitch === 1) {
          formData.pushWmsSwitch = '1'
        } else {
          formData.pushWmsSwitch = '0'
        }
        console.log(formData)
        this.configForm = formData
      }
      this.dialogFormVisibleConfig = true;
    },
    cancel (formName) {
      this.dialogFormVisibleConfig = false;
      this.dialogFormVisible = false;
      this.dialogFormVisibleCallback = false;
      const set = this.$refs;
      set[formName].resetFields();
    },
    resetTempConfig () {
      this.configForm = {
        customerName: { label: '', value: '' },
        ebusinessQstcode: "",
        cbeCode: "",
        cbeName: { label: '', value: '' },
        platformCode: "",
        platformName: { label: '', value: '' },
        declarationQstcode: "",
        declarationName: { label: '', value: '' },
        storageQstcode: "",
        storageName: { label: '', value: '' },
        logisticsName: { label: '', value: '' },
        logisticsQstcode: "",
        paymentName: { label: '', value: '' },
        paymentQstcode: "",
        isLogisticsObtain: '0',
        isOrderPush: '0',
        isPaymentObtain: '0',
        isPaymentPush: '1',
        pushWmsSwitch: '1',
        
      }
    },
    // 关区配置
    handleCreate (scope) {
      if (scope == 'add') {
        this.resetTemp()
        this.dialogStatus = "create"
      } else {
        this.dialogStatus = "update";
        let formData = {
          indx: scope.row.indx,
          customerName: {
            label: this.copName,
            value: this.qstCode
          },
          districtName: {
            label: scope.row.districtName,
            value: scope.row.districtCode
          },
          agentName: {
            label: scope.row.agentName,
            value: scope.row.agentQstCode
          },
          warehouseName: {
            label: scope.row.warehouseName,
            value: scope.row.warehouseQstCode
          },
          cbeName: {
            label: scope.row.cbeName,
            value: scope.row.cbeCode
          },
          platformName:{
            label:scope.row.platformName,
            value:scope.row.platformCode
          },
          districtOutCode:scope.row.districtOutCode
        }
        this.agentForm = formData
      }
      this.dialogFormVisible = true;
    },
    resetTemp () {
      this.agentForm = {
        customerName: { label: '', value: '' },
        qstCode: "",
        districtCode: "",
        districtName: { label: '', value: '' },
        agentQstCode: "",
        agentName: { label: '', value: '' },
        warehouseName: { label: '', value: '' },
        warehouseQstCode: "",
        districtOutCode:'',
        cbeName: { label: '', value: '' },
        platformName: { label: '', value: '' },
      };
    },
    create (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          let formData = {
            customerName: this.copName,
            qstCode: this.qstCode,
            districtCode: this.agentForm.districtName.value,
            districtName: this.agentForm.districtName.label,
            agentQstCode: this.agentForm.agentName.value,
            agentName: this.agentForm.agentName.label,
            warehouseName: this.agentForm.warehouseName.label,
            warehouseQstCode: this.agentForm.warehouseName.value,
            districtOutCode:this.agentForm.districtOutCode,
            cbeCode: this.agentForm.cbeName.value,
            cbeName: this.agentForm.cbeName.label,
            platformName: this.agentForm.platformName.label,
            platformCode: this.agentForm.platformName.value
          }
          console.log(formData)
          //电商平台判空
          if (!formData.platformName) {
            this.platformNameCallback = true
            return false
          } else {
            this.platformNameCallback = false
          }
          if (!formData.customerName) {
            this.customerValue = true
            return false
          } else {
            this.customerValue = false
          }
          if (!formData.districtName) {
            this.districtValue = true
            return false
          } else {
            this.districtValue = false
          }
          if (!formData.cbeName) {
            this.cbeValue = true
            return false
          } else {
            this.cbeValue = false
          }
          if (!formData.agentName) {
            this.platValue = true
            return false
          } else {
            this.platValue = false
          }
          if (!formData.warehouseName) {
            this.warehouseValue = true
            return false
          } else {
            this.warehouseValue = false
          }
          if (this.dialogStatus == 'update') {
            formData.indx = this.agentForm.indx
          }
          this.$confirm('确定要保存吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.dialogStatus == 'create') {
              addObjAgent(formData).then((res) => {
                this.dialogFormVisible = false;
                if (res.rel) {
                  this.getAgentMethod()
                  this.$notify({
                    title: "成功",
                    message: "创建成功",
                    type: "success",
                    duration: 2000
                  })
                } else {
                  this.$notify({
                    title: "失败",
                    message: res.message,
                    type: "error",
                    duration: 2000
                  })
                }
                if (res.status !== 200) {
                  this.$notify({
                    title: "失败",
                    message: res.message,
                    type: "error",
                    duration: 2000
                  })
                }
              })
            } else if (this.dialogStatus == 'update') {
              putObjAgent(formData.indx, formData).then(res => {
                this.dialogFormVisible = false;
                if (res.rel) {
                  this.$notify({
                    title: "成功",
                    message: "修改成功",
                    type: "success",
                    duration: 2000
                  });
                  this.getAgentMethod()
                } else {
                  this.$notify({
                    title: "失败",
                    message: "系统异常",
                    type: "error",
                    duration: 2000
                  });
                }
              });
            }
          }).catch(() => { })
        } else {
          return false;
        }
      });
    },
    //回传客户配置
    handleCreateCallback (scope) {
      if (scope == 'add') {
        this.resetTempCallback()
        this.dialogStatusCallback = "create"
      } else {
        this.dialogStatusCallback = "update"
        let formData = {
          indx: scope.row.indx,
          customerName: {
            label: this.copName,
            value: this.qstCode
          },
          platformName: {
            label: scope.row.platformName,
            value: scope.row.platformCode
          },
          url: scope.row.url,
        }
        console.log(formData)
        this.form = formData
      }
      this.dialogFormVisibleCallback = true
    },
    resetTempCallback () {
      this.form = {
        customerName: { label: '', value: '' },
        platformName: { label: '', value: '' },
        url: '',
      };
    },
    createCallback (formName) {
      let formData = {
        customerName: this.copName,
        customerCode: this.qstCode,
        platformCode: this.form.platformName.value,
        platformName: this.form.platformName.label,
        url: this.form.url,
      }
      //电商平台判空
      if (!formData.platformCode || !formData.platformCode) {
        this.platformNameCallback = true
        return false
      } else {
        this.platformNameCallback = false
      }
      //回传地址判空
      if (!formData.url) {
        this.urlCallback = true
        return false
      } else {
        this.urlCallback = false
      }
      console.log('callback')
      console.log(formData)
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          if (this.dialogStatusCallback == 'update') {
            formData.indx = this.form.indx
          }
          this.$confirm('确定要保存吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.dialogStatusCallback == 'create') {
              addObjCallback(formData).then((res) => {
                this.dialogFormVisibleCallback = false
                if (res.rel) {
                  this.getCallbackListMethod()
                  this.$notify({
                    title: "成功",
                    message: "创建成功",
                    type: "success",
                    duration: 2000
                  });
                } else {
                  this.$notify({
                    title: "失败",
                    message: "系统异常",
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
            } else if (this.dialogStatusCallback == 'update') {
              putObjCallback(formData.indx, formData).then(res => {
                this.getCallbackListMethod()
                this.dialogFormVisibleCallback = false
                if (res.rel) {
                  this.$notify({
                    title: "成功",
                    message: "修改成功",
                    type: "success",
                    duration: 2000
                  });

                } else {
                  this.$notify({
                    title: "失败",
                    message: "系统异常",
                    type: "error",
                    duration: 2000
                  });
                }
              });
            }
          }).catch(() => { })
        } else {
          return false;
        }
      });
    },
    changeValue (val) {
      console.log(val)
    },
    changeValueCus (val) {
      if (val == '') {
        this.form.customerName = { label: '', value: '' }
      } else {
        this.form.customerCode = val.value
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.config {
  .xhText {
    /* display: inline-block; */
    position: relative;
    top: 10px;
    left: 57px;
    color: red;
  }
  .l61 {
    left: 61px;
  }
  .wrap {
    padding-bottom: 10px;
    border-bottom: 1px dashed #ddd;
    color: #666;
    font-size: 14px;
    .btn {
      margin-bottom: 10px;
    }
    .title {
      color: #333;
      font-weight: bold;
    }
    .content {
      color: #666;
    }
    .el-row {
      margin-bottom: 10px;
    }
  }
  .dialogCustomer {
    font-size: 14px;
    color: #48576a;
    font-weight: bold;
  }
  
}
</style>

