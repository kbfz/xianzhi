<template>
  <div class="app-container calendar-list-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="18">
        <div class="app-container-left">
          <div class="filter-container">
            <el-select placeholder="请选择客户名称"
                       @keyup.enter.native="handleFilter"
                       v-model="query.ebusinessQstcode"
                       clearable
                       style="width: 200px"
                       popper-class="optionsContent"
                       filterable>
              <el-option v-for="item in selectCustom"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="请输入客户名称或编码"
                      v-model="query.customerName"> </el-input>
            <!-- <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="请输入客户编码"
                      v-model="query.ebusinessQstcode"> </el-input> -->
            <el-button class="filter-item"
                       type="primary"
                       v-waves
                       icon="search"
                       @click="handleFilter">搜索</el-button>
            <el-button class="filter-item"
                       v-if="bdPaymentManager_btn_add"
                       style="margin-left: 10px;"
                       @click="handleCreate"
                       type="primary"
                       icon="edit">添加</el-button>
          </div>
          <el-table :key='tableKey'
                    :data="list"
                    v-loading.body="listLoading"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%"
                    @row-click="detailName"
                    :height="elTableMediaHeight">

            <el-table-column width="180px"
                             align="center"
                             label="客户名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.customerName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="180px"
                             align="center"
                             label="客户编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.ebusinessQstcode}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column width="180px"
                             align="center"
                             label="默认申报身份"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.cbeName}}</span>
              </template>
            </el-table-column> -->
            <el-table-column width="180px"
                             align="center"
                             label="默认电商平台"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.platformName}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column width="180px"
                             align="center"
                             label="报关行企业名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.declarationName}}</span>
              </template>
            </el-table-column> -->
            <!-- <el-table-column width="180px"
                             align="center"
                             label="仓库名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.storageName}}</span>
              </template>
            </el-table-column> -->
            <el-table-column width="180px"
                             align="center"
                             label="物流企业名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.logisticsName}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column width="180px"
                             align="center"
                             label="支付企业名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.paymentName}}</span>
              </template>
            </el-table-column> -->
            <!-- <el-table-column width="165px"
                             align="center"
                             label="是否代获取物流单号">
              <template scope="scope">
                <span v-if="scope.row.isLogisticsObtain === 1">是</span>
                <span v-if="scope.row.isLogisticsObtain === 0">否</span>
              </template>
            </el-table-column>
            <el-table-column width="165px"
                             align="center"
                             label="是否代获取支付单号">
              <template scope="scope">
                <span v-if="scope.row.isPaymentObtain === 1">是</span>
                <span v-if="scope.row.isPaymentObtain === 0">否</span>
              </template>
            </el-table-column>
            <el-table-column width="165px"
                             align="center"
                             label="是否全速通推送订单">
              <template scope="scope">
                <span v-if="scope.row.isOrderPush === 1">是</span>
                <span v-if="scope.row.isOrderPush === 0">否</span>
              </template>
            </el-table-column>-->
            <el-table-column width="130px"
                             align="center"
                             label="推送仓库开关">
              <template scope="scope">
                <span v-if="scope.row.pushWmsSwitch === 1">开启</span>
                <span v-if="scope.row.pushWmsSwitch === 0">不开启</span>
              </template>
            </el-table-column>
            <el-table-column width="120px"
                             align="center"
                             label="是否截单">
              <template scope="scope">
                <span v-if="scope.row.isPaymentPush === 1">截单</span>
                <span v-if="scope.row.isPaymentPush === 0">不截单</span>
              </template>
            </el-table-column> 
            
          </el-table>
          <div v-show="!listLoading"
               class="pagination-container">
            <el-pagination @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page.sync="listQuery.page"
                           :page-sizes="[10,20,30, 50]"
                           :page-size="listQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total"> </el-pagination>
          </div>
          <el-dialog :title="textMap[dialogStatus]"
                     :visible.sync="dialogFormVisible"
                     :before-close="closeDialog"
                     :close-on-click-modal="false"
                     class="receiptWidth">
            <el-form :model="form"
                     :rules="rules"
                     ref="form"
                     label-width="162px"
                     :inline="true"
                     class="formLeft">
              <!-- <div> -->
              <span class="xhText">*</span>
              <el-form-item label="客户名称"
                            prop="customerName"
                            label-width="148px">
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
              </el-form-item>
              <!-- </div> -->
              <!-- <span class="xhText l71">*</span>
              <el-form-item label="默认申报身份"
                            prop="cbeName"
                            label-width="153px">
                <el-select placeholder="请选择申报身份"
                           v-model="form.cbeName"
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
              <span class="startTime">*</span>
              <el-form-item label="默认电商平台"
                            prop="platformName"
                            label-width="158px">
                <el-select placeholder="请选择电商平台"
                           v-model="form.platformName"
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
                           v-model="form.declarationName"
                           clearable
                           style="width: 200px"
                           filterable>
                  <el-option v-for="item in selectdeclarationName"
                             :key="item.value"
                             :label="item.label"
                             :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="仓库"
                            prop="storageName">
                <el-select placeholder="请选择仓库"
                           v-model="form.storageName"
                           clearable
                           style="width: 200px"
                           filterable>
                  <el-option v-for="item in selectstorage"
                             :key="item.value"
                             :label="item.label"
                             :value="item"></el-option>
                </el-select>
              </el-form-item> -->
              <!-- <el-form-item label="支付企业"
                            prop="paymentName">
                <el-select placeholder="请选择支付企业"
                           v-model="form.paymentName"
                           clearable
                           style="width: 200px"
                           filterable>
                  <el-option v-for="item in selectpayment"
                             :key="item.value"
                             :label="item.label"
                             :value="item"></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="物流企业"
                            prop="logisticsName">
                <el-select placeholder="请选择物流企业"
                           v-model="form.logisticsName"
                           clearable
                           style="width: 200px"
                           filterable>
                  <el-option v-for="item in selectlogistics"
                             :key="item.value"
                             :label="item.label"
                             :value="item"></el-option>
                </el-select>
              </el-form-item>
              
              <!-- <el-form-item label="是否代获取物流单号"
                            prop="isLogisticsObtain">
                <el-radio v-model="form.isLogisticsObtain"
                          label="1"
                          style="margin-left: 25px;margin-right: 40px">是</el-radio>
                <el-radio v-model="form.isLogisticsObtain"
                          label="0"
                          style="margin-right: 23px">否</el-radio>
              </el-form-item>
              <el-form-item label="是否代获取支付单号"
                            prop="isPaymentObtain">
                <el-radio v-model="form.isPaymentObtain"
                          label="1"
                          style="margin-left: 25px;margin-right: 40px">是</el-radio>
                <el-radio v-model="form.isPaymentObtain"
                          label="0"
                          style="margin-right: 41px">否</el-radio>
              </el-form-item>
              <el-form-item label="是否全速通推送订单"
                            prop="isOrderPush">
                <el-radio v-model="form.isOrderPush"
                          label="1"
                          style="margin-left: 25px;margin-right: 40px">是</el-radio>
                <el-radio v-model="form.isOrderPush"
                          label="0"
                          style="margin-right: 23px">否</el-radio>
              </el-form-item>-->
              <el-form-item label="推送仓库开关"
                            prop="pushWmsSwitch">
                <el-radio v-model="form.pushWmsSwitch"
                          label="1"
                          style="margin-left: 25px;margin-right: 30px">开启</el-radio>
                <el-radio v-model="form.pushWmsSwitch"
                          label="0"
                          style="margin-right: 41px">不开启</el-radio>
              </el-form-item>
              <el-form-item label="是否截单"
                            prop="isPaymentPush">
                <el-radio v-model="form.isPaymentPush"
                          label="1"
                          style="margin-left: 25px;margin-right: 30px">截单</el-radio>
                <el-radio v-model="form.isPaymentPush"
                          label="0"
                          style="margin-right: 23px">不截单</el-radio>
              </el-form-item> 
              
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="cancel('form')">取 消</el-button>
              <el-button type="primary"
                         @click="create('form')">确 定</el-button>
              <!-- <el-button v-else
                         type="primary"
                         @click="update('form')">确 定</el-button> -->
            </div>
          </el-dialog>
        </div>
      </el-col>
      <!-- 右边 -->
      <el-col :span="1">
        <div class="border">
        </div>
      </el-col>
      <el-col :span="5">
        <div class="app-container-right"
             ref="lineHeight">
          <!-- v-on:childMethod="getList"   在子组件里面调用父组件的getList方法 childMethod是子组件里面参数名 -->
          <update-element ref="update"
                          v-on:childMethod="getList"></update-element>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  page,
  addObj,
  getObj,
  putObj,
  customerSelect,
  cbeNameSelect,
  platSelect,
  clarationSelect,
  storageSelect,
  paymentSelect,
  logisticsSelect,
  selectObj
} from "api/baseDataSys/customer/basicConfiguration/index";
import { mapGetters } from "vuex";
export default {
  name: "bdCustomerAllocation",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/update")
  },
  data () {
    return {
      form: {
        customerName: { label: '', value: '' },
        ebusinessQstcode: "",
        cbeCode: "",
        cbeName: { label: '', value: '' },
        platformCode: "",
        platformName: { label: '', value: '' },
        declarationQstcode: "",
        // declarationName: { label: '', value: '' },
        storageQstcode: "",
        // storageName: { label: '', value: '' },
        logisticsName: { label: '', value: '' },
        logisticsQstcode: "",
        // paymentName: { label: '', value: '' },
        paymentQstcode: "",
        // isLogisticsObtain: '0',
        // isOrderPush: '0',
        // isPaymentObtain: '0',
        isPaymentPush: '1',
        pushWmsSwitch: '1',
        
      },
      selectCustom: [],
      rules: {
        // isLogisticsObtain: [
        //   {
        //     required: true,
        //     message: "请选择是否代获取物流单号",
        //     trigger: 'change'
        //   }
        // ],
        // isPaymentObtain: [
        //   {
        //     required: true,
        //     message: "请选择是否代获取支付单号",
        //     trigger: 'change'
        //   }
        // ],
        // isOrderPush: [
        //   {
        //     required: true,
        //     message: "请选择是否全速通推送订单",
        //     trigger: 'change'
        //   }
        // ],
        pushWmsSwitch: [
          {
            required: true,
            message: "请选择推送仓库开关",
            trigger: 'change'
          }
        ],
        isPaymentPush: [
          {
            required: true,
            message: "请选择是否截单",
            trigger: 'change'
          }
        ],
      },
      customerValue: false,
      cbeValue: false,
      platValue: false,
      selectCustom: [],
      selectCbeName: [],
      selectplat: [],
      selectdeclarationName: [],
      selectstorage: [],
      selectpayment: [],
      selectlogistics: [],
      list: null,
      total: null,
      listLoading: true,
      query: {
        ebusinessQstcode: '',
        customerName: ''
      },
      listQuery: {
        page: 1,
        limit: 10,
        orderBy: 'createtimedesc',
        _type_: "like"
      },
      dialogFormVisible: false,
      dialogStatus: "",
      bdPaymentManager_btn_edit: false,
      bdPaymentManager_btn_del: false,
      bdPaymentManager_btn_add: true,
      textMap: {
        update: "基础配置",
        create: "基础配置"
      },
      tableKey: 0
    };
  },
  created () {
    this.getList();
    this.customerName()
    this.cbeNameName()
    this.paltName()
    this.clarationName()
    this.logisticsName()
    this.paymentName()
    this.storageName()
    this.bdPaymentManager_btn_edit = this.elements["bdPaymentManager:btn_edit"];
    this.bdPaymentManager_btn_del = this.elements["bdPaymentManager:btn_del"];
    this.bdPaymentManager_btn_add = this.elements["bdPaymentManager:btn_add"];
  },
  computed: {
    ...mapGetters(["elements", "elTableMediaHeight"])
  },
  methods: {
    // 关闭el-dialog 前的回调函数 重置表单
    closeDialog () {
      this.dialogFormVisible = false;
      this.$refs["form"].resetFields();
    },
    // 查看详情
    detailName (row) {
      // this.showDetail = true
      this.$refs.update.formEdit = true;
      this.$refs.update.disabledForm = true;
      this.$refs.update.updateView = true;
      getObj(row.indx).then(response => {
        // this.$refs.update.resetFormFields();
        let formData = {
          indx: response.data.indx,
          customerName: {
            label: response.data.customerName,
            value: response.data.ebusinessQstcode
          },
          cbeName: {
            label: response.data.cbeName,
            value: response.data.cbeCode
          },
          platformName: {
            label: response.data.platformName,
            value: response.data.platformCode
          },
          // declarationName: {
          //   label: response.data.declarationName,
          //   value: response.data.declarationQstcode
          // },
          // storageName: {
          //   label: response.data.storageName,
          //   value: response.data.storageQstcode
          // },
          logisticsName: {
            label: response.data.logisticsName,
            value: response.data.logisticsQstcode
          },
          // paymentName: {
          //   label: response.data.paymentName,
          //   value: response.data.paymentQstcode
          // },
          // isLogisticsObtain: response.data.isLogisticsObtain,
          // isOrderPush: response.data.isOrderPush,
          // isPaymentObtain: response.data.isPaymentObtain,
          isPaymentPush: response.data.isPaymentPush,
          pushWmsSwitch: response.data.pushWmsSwitch,
          
        }
        // if (response.data.isLogisticsObtain === 1) {
        //   formData.isLogisticsObtain = '1'
        // } else {
        //   formData.isLogisticsObtain = '0'
        // }
        // if (response.data.isOrderPush === 1) {
        //   formData.isOrderPush = '1'
        // } else {
        //   formData.isOrderPush = '0'
        // }
        // if (response.data.isPaymentObtain === 1) {
        //   formData.isPaymentObtain = '1'
        // } else {
        //   formData.isPaymentObtain = '0'
        // }
        if (response.data.isPaymentPush === 1) {
          formData.isPaymentPush = '1'
        } else {
          formData.isPaymentPush = '0'
        }
        if (response.data.pushWmsSwitch === 1) {
          formData.pushWmsSwitch = '1'
        } else {
          formData.pushWmsSwitch = '0'
        }
        this.$refs.update.form = formData
        //  console.log(row.indx)
      });
    },
    getList () {
      this.listLoading = true;
      let param = {
        ebusinessQstcode: $.trim(this.query.ebusinessQstcode),
        customerName: $.trim(this.query.customerName),
        ...this.listQuery
      }
      page(param).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleFilter () {
      this.getList();
      this.$refs.update.resetFormFields();
    },
    handleSizeChange (val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange (val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleCreate () {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.customerValue = false
      this.cbeValue = false
      this.platValue = false
    },
    handleUpdate (row) {
      getObj(row.indx).then(response => {
        this.form = response.data;
        this.dialogFormVisible = true;
        this.dialogStatus = "update";
      });
    },
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
    create (formName) {
      
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          let formData = {
            customerName: this.form.customerName.label,
            // ebusinessQstcode: this.form.customerName.value,
            ebusinessQstcode: this.form.customerName.value,
            // cbeCode: this.form.cbeName.value,
            // cbeName: this.form.cbeName.label,
            platformCode: this.form.platformName.value,
            platformName: this.form.platformName.label,
            // declarationQstcode: this.form.declarationName.value,
            // declarationName: this.form.declarationName.label,
            // storageQstcode: this.form.storageName.value,
            // storageName: this.form.storageName.label,
            logisticsName: this.form.logisticsName.label,
            logisticsQstcode: this.form.logisticsName.value,
            // paymentName: this.form.paymentName.label,
            // paymentQstcode: this.form.paymentName.value,
            // isLogisticsObtain: this.form.isLogisticsObtain,
            // isOrderPush: this.form.isOrderPush,
            // isPaymentObtain: this.form.isPaymentObtain,
            isPaymentPush: this.form.isPaymentPush,
            pushWmsSwitch: this.form.pushWmsSwitch,
            
          }
         
          if (!formData.customerName && !formData.platformName) {
            this.customerValue = true
            this.cbeValue = true
            this.platValue = true
            return false
          }
          if (!formData.customerName) {
            this.customerValue = true
          } else {
            this.customerValue = false
          }
          // if (!formData.cbeName) {
          //   this.cbeValue = true
          // } else {
          //   this.cbeValue = false
          // }
          if (!formData.platformName) {
            this.platValue = true
          } else {
            this.platValue = false
          }
          if (!formData.customerName || !formData.platformName) {
            return false
          }
          this.$confirm('确定要保存吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            addObj(formData).then((res) => {
               
              this.dialogFormVisible = false;
              if (res.rel) {
                this.getList();
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
          }).catch(() => { })
        } else {
          return false;
        }
      });
    },
    cancel (formName) {
      this.dialogFormVisible = false;
      const set = this.$refs;
      set[formName].resetFields();
    },
    resetTemp () {
      this.form = {
        customerName: { label: '', value: '' },
        ebusinessQstcode: "",
        // cbeCode: "",
        // cbeName: { label: '', value: '' },
        platformCode: "",
        platformName: { label: '', value: '' },
        declarationQstcode: "",
        // declarationName: { label: '', value: '' },
        storageQstcode: "",
        // storageName: { label: '', value: '' },
        logisticsName: { label: '', value: '' },
        logisticsQstcode: "",
        // paymentName: { label: '', value: '' },
        paymentQstcode: "",
        // isLogisticsObtain: '0',
        // isOrderPush: '0',
        // isPaymentObtain: '0',
        isPaymentPush: '1',
        pushWmsSwitch: '1',
        
      };
    }
  }
};
</script>
<style scoped>
.el-form-item {
  margin-left: 1.4%;
  /* width: 400px; */
}
.formLeft {
  /* padding-left:20px; */
}
.el-input,
.el-select {
  width: 200px;
}
.xhText {
  /* display: inline-block; */
  position: relative;
  top: 10px;
  left: 94px;
  color: red;
}
.l71 {
  left: 71px;
}
.startTime {
  position: relative;
  top: 67px;
  right: 704px;
  color: red;
}
</style>
