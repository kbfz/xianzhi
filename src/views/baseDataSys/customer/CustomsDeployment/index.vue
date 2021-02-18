<template>
  <div class="app-container calendar-list-container">
    <el-row>
      <!-- 左边 -->
      <el-col :span="18">
        <div class="app-container-left">
          <div class="filter-container">
            <!-- <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="请输入客户名称"
                      v-model="query.customerName"> </el-input> -->
            <el-select @keyup.enter.native="handleFilter"
                       placeholder="请选择客户名称"
                       v-model="query.qstCode"
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

            <el-table-column min-width="180px"
                             align="center"
                             label="客户名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.customerName}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="180px"
                             align="center"
                             label="客户编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.qstCode}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="160px"
                             align="center"
                             label="关区名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.districtName}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="160px"
                             align="center"
                             label="电商平台"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.platformName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="180px"
                             align="center"
                             label="申报身份"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.cbeName}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="180px"
                             align="center"
                             label="报关行企业"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.agentName}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="160px"
                             align="center"
                             label="仓库"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.warehouseName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="180px"
                             align="center"
                             label="关区标识"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.districtOutCode}}</span>
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
                     class="receiptWidth450">
            <el-form :model="form"
                     :rules="rules"
                     ref="form"
                     label-width="140px"
                     class="formLeft">
              <span class="xhText">*</span>
              <el-form-item label="客户名称"
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
              </el-form-item>
              <span class="xhText">*</span>
              <el-form-item label="关区名称"
                            style="margin-top: -20px"
                            prop="districtName">
                <el-select placeholder="请选择关区名称"
                           v-model="form.districtName"
                           clearable
                           style="width: 200px"
                           filterable>
                  <el-option v-for="item in selectpayment"
                             :key="item.value"
                             :label="item.label"
                             :value="item"></el-option>
                </el-select>
                <div class="el-form-item__error"
                     v-if="cbeValue">请选择关区名称</div>
              </el-form-item>
              <span class="xhText"
                    style="left: 40px;">*</span>
              <el-form-item label="电商平台名称"
                            prop="platformName"
                            style="margin-top: -20px">
                <el-select v-model="form.platformName"
                           placeholder="请选择电商平台名称"
                           style="width: 200px"
                           filterable
                           @change="changeValue"
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
              <span class="xhText l57">*</span>
              <el-form-item label="报关行企业"
                            prop="agentName"
                            style="margin-top: -20px">
                <el-select placeholder="请选择报关行企业"
                           v-model="form.agentName"
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
              <span class="xhText l98">*</span>
              <el-form-item label="仓库"
                            style="margin-top: -20px"
                            prop="warehouseName">
                <el-select placeholder="请选择仓库"
                           v-model="form.warehouseName"
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
              <span class="xhText"
                    style="left: 40px;">*</span>
              <el-form-item label="默认申报身份"
                            prop="cbeName"
                            style="margin-top: -20px">
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
              </el-form-item>
              <el-form-item label="关区标识">
                <el-input v-model="form.districtOutCode"
                          placeholder="请输入关区标识"></el-input>
              </el-form-item>

            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="cancel('form')">取 消</el-button>
              <el-button v-if="dialogStatus=='create'"
                         type="primary"
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
  clarationSelect,
  storageSelect,
  paymentSelect,
  platSelect
} from "api/baseDataSys/customer/CustomsDeployment/index";
import { mapGetters } from "vuex";
export default {
  name: "bdCustomerAllocation",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/updata.vue")
  },
  data () {
    return {
      form: {
        customerName: { label: '', value: '' },
        qstCode: "",
        districtCode: "",
        districtName: { label: '', value: '' },
        agentQstCode: "",
        agentName: { label: '', value: '' },
        warehouseName: { label: '', value: '' },
        warehouseQstCode: "",
        districtOutCode: '',
        cbeName: { label: '', value: '' },
        platformName: { label: '', value: '' },
      },
      // selectCustom: [],
      rules: {
      },
      customerValue: false,
      cbeValue: false,
      platValue: false,
      warehouseValue: false,
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
        // ebusinessQstcode: '',
        qstCode: '',
        customerName: ''
      },
      listQuery: {
        page: 1,
        limit: 10,
        orderBy: 'createTimedesc',
        _type_: "like"
      },
      dialogFormVisible: false,
      dialogStatus: "",
      bdPaymentManager_btn_edit: false,
      bdPaymentManager_btn_del: false,
      bdPaymentManager_btn_add: true,
      textMap: {
        update: "关区配置",
        create: "关区配置"
      },
      tableKey: 0
    };
  },
  created () {
    this.getList();
    this.customerName()
    this.clarationName()
    this.paymentName()
    this.storageName()
    this.cbeNameName()
    this.paltName()
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
            value: response.data.qstCode
          },
          districtName: {
            label: response.data.districtName,
            value: response.data.districtCode
          },
          agentName: {
            label: response.data.agentName,
            value: response.data.agentQstCode
          },
          warehouseName: {
            label: response.data.warehouseName,
            value: response.data.warehouseQstCode
          },
          cbeName: {
            label: response.data.cbeName,
            value: response.data.cbeCode
          },
          platformName: {
            label: response.data.platformName,
            value: response.data.platformCode
          },
          districtOutCode: response.data.districtOutCode
        }
        this.$refs.update.form = formData
        //  console.log(row.indx)
      });
    },
    getList () {
      this.listLoading = true;
      let param = {
        qstCode: $.trim(this.query.qstCode),
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
      this.warehouseValue = false
    },
    handleUpdate (row) {
      getObj(row.indx).then(response => {
        this.form = response.data;
        this.dialogFormVisible = true;
        this.dialogStatus = "update";
      });
    },
    // 申报身份
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
    // 关区名称
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
      // console.log(222)
      // console.log(this.selectplat)
    },
    create (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          let formData = {
            customerName: this.form.customerName.label,
            // qstCode: this.form.customerName.value,
            // customerName: this.form.customerName.label,
            qstCode: this.form.customerName.value,
            districtCode: this.form.districtName.value,
            districtName: this.form.districtName.label,
            agentQstCode: this.form.agentName.value,
            agentName: this.form.agentName.label,
            warehouseName: this.form.warehouseName.label,
            warehouseQstCode: this.form.warehouseName.value,
            districtOutCode: this.form.districtOutCode,
            cbeCode: this.form.cbeName.value,
            cbeName: this.form.cbeName.label,
            platformName: this.form.platformName.label,
            platformCode: this.form.platformName.value
          }
          //电商平台判空
          if (!formData.platformName) {
            this.platformNameCallback = true
            return false
          } else {
            this.platformNameCallback = false
          }
          if (!formData.customerName && !formData.districtName && !formData.agentName && !formData.warehouseName) {
            this.customerValue = true
            this.cbeValue = true
            this.platValue = true
            this.warehouseValue = true
            return false
          }
          if (!formData.customerName) {
            this.customerValue = true
          } else {
            this.customerValue = false
          }
          if (!formData.districtName) {
            this.cbeValue = true
          } else {
            this.cbeValue = false
          }
          if (!formData.agentName) {
            this.platValue = true
          } else {
            this.platValue = false
          }
          if (!formData.warehouseName) {
            this.warehouseValue = true
          } else {
            this.warehouseValue = false
          }
          if (!formData.customerName || !formData.districtName || !formData.agentName || !formData.warehouseName) {
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
        cbeName: { label: '', value: '' },
        qstCode: "",
        districtCode: "",
        districtName: { label: '', value: '' },
        agentQstCode: "",
        agentName: { label: '', value: '' },
        warehouseName: { label: '', value: '' },
        warehouseQstCode: "",
        districtOutCode: '',
        platformName: { label: '', value: '' },
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
  top: 6px;
  left: 70px;
  color: red;
}
.l57 {
  left: 57px;
}
.l98 {
  left: 98px;
}
</style>
