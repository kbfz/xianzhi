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
                      v-model="query.platformName"> </el-input> -->
            <el-select @keyup.enter.native="handleFilter"
                       placeholder="请选择客户名称"
                       v-model="query.copName"
                       popper-class="optionsContent"
                       clearable
                       style="width: 200px"
                       filterable>
              <!-- <el-option v-for="item in selectCustom"
                         :key="item.label"
                         :lable="item.label"
                         :value="item.value"></el-option> -->
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
                      v-model="query.qstCode"> </el-input>
            <el-button class="filter-item"
                       type="primary"
                       v-waves
                       icon="search"
                       @click="handleFilter">搜索</el-button>
            <el-button class="filter-item"
                       v-if="bdCustomerManager_btn_add"
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
            <el-table-column width="250px"
                             align="center"
                             label="客户名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.copName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150px"
                             align="center"
                             label="客户编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.qstCode}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150px"
                             align="center"
                             label="第三方编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.outCode}}</span>
              </template>
            </el-table-column>
            <el-table-column width="200px"
                             align="center"
                             label="担保金账号"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.guaranteeNo}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column width="150px"
                             align="center"
                             label="全速通编码"
                             fixed
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.qstCode}}</span>
              </template>
            </el-table-column> -->
            <!-- <el-table-column width="150px"
                             align="center"
                             label="客户编码"
                             fixed
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.outCode}}</span>
              </template>
            </el-table-column> -->
            <!-- <el-table-column width="100px"
                             align="center"
                             label="电商类型">
              <template scope="scope">
                <span v-if="scope.row.type ==='1'">国内</span>
                <span v-if="scope.row.type ==='2'">跨境</span>
              </template>
            </el-table-column> -->
            <!-- <el-table-column width="150px"
                             align="center"
                             label="海关编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.cusCbeCode}}</span>
              </template>
            </el-table-column> -->
            <!-- <el-table-column width="200px" align="center" label="国检名称">
      <template scope="scope">
        <span>{{scope.row.ciqCbeName}}</span>
      </template>
    </el-table-column> -->
            <!-- <el-table-column width="150px"
                             align="center"
                             label="国检编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.ciqCbeCode}}</span>
              </template>
            </el-table-column> -->
            <!-- <el-table-column width="250px"
                             align="center"
                             label="企业传输名称"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.copName}}</span>
              </template>
            </el-table-column> -->
            <!-- <el-table-column width="200px"
                             align="center"
                             label="企业传输编码"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.copCode}}</span>
              </template>
            </el-table-column> -->

            <!-- <el-table-column width="200px"
                             align="center"
                             label="企业传输ID"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.dxpId}}</span>
              </template>
            </el-table-column> -->
            <!-- <el-table-column width="200px"
                             align="center"
                             label="url地址"
                             show-overflow-tooltip>
              <template scope="scope">
                <span>{{scope.row.url}}</span>
              </template>
            </el-table-column> -->
            <el-table-column align="center"
                             width="180px"
                             label="是否回传客户数据">
              <template scope="scope">
                <span v-if="scope.row.isPush === 1">是</span>
                <span v-if="scope.row.isPush === 0">否</span>
              </template>
            </el-table-column>
            <!-- <el-table-column width="180px"
                             align="center"
                             label="是否开启oms服务">
              <template scope="scope">
                <span v-if="scope.row.omsService === 1">是</span>
                <span v-if="scope.row.omsService === 0">否</span>
              </template>
            </el-table-column> -->
            <!-- <el-table-column width="180px"
                             align="center"
                             label="是否开启wms">
              <template scope="scope">
                <span v-if="scope.row.wmsService === 1">是</span>
                <span v-if="scope.row.wmsService === 0">否</span>
              </template>
            </el-table-column> -->
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
                     label-width="130px"
                     :inline="true"
                     class="formLeft">
              <!-- <el-form-item label="全速通编码" prop="qstCode">
      <el-input v-model="form.qstCode" placeholder="请输入全速通编码"></el-input>
    </el-form-item> -->
              <!-- <el-form-item label="客户编码"
                            prop="outCode">
                <el-input v-model="form.outCode"
                          placeholder="请输入客户编码"></el-input>
              </el-form-item> -->
              <el-form-item label="客户名称"
                            prop="copName">
                <el-input v-model="form.copName"
                          placeholder="请输入客户名称"></el-input>
              </el-form-item>
              <el-form-item label="第三方编码">
                <el-input v-model="form.outCode"
                          placeholder="请输入第三方编码"></el-input>
              </el-form-item>
              <el-form-item label="担保金账号"
                            prop="guaranteeNo">
                <el-input v-model="form.guaranteeNo"
                          placeholder="请输入担保金账号"></el-input>
              </el-form-item>
              <el-form-item label="是否回传客户数据"
                            prop="isPush">
                <el-radio v-model="form.isPush"
                          label="1"
                          style="margin-left: 25px;margin-right: 40px">是</el-radio>
                <el-radio v-model="form.isPush"
                          label="0"
                          style="margin-right: 23px">否</el-radio>
              </el-form-item>
              <!-- <el-form-item label="是否开启wms"
                            prop="wmsService"
                            style="margin-left: 45px">
                <el-radio v-model="form.wmsService"
                          label="1"
                          style="margin-left: 25px;margin-right: 40px">是</el-radio>
                <el-radio v-model="form.wmsService"
                          label="0"
                          style="margin-right: 23px">否</el-radio>
              </el-form-item> -->
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="cancel('form')">取 消</el-button>
              <el-button v-if="dialogStatus=='create'"
                         type="primary"
                         @click="create('form')">确 定</el-button>
              <el-button v-else
                         type="primary"
                         @click="update('form')">确 定</el-button>
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
  delObj,
  putObj,
  selectObj
} from "api/baseDataSys/bdCustomer/index";
import { mapGetters } from "vuex";
export default {
  name: "bdCustomer",
  components: {
    // 引入编辑的组件
    "update-element": () => import("./components/update")
  },
  data () {
    return {
      form: {
        copName: '',
        guaranteeNo: '',
        outCode:'',
        isPush: '1',
        wmsService: '1'
      },
      selectCustom: [],
      rules: {
        // outCode: [
        //   {
        //     required: true,
        //     message: '请输入客户编码',
        //     trigger: 'blur'
        //   }
        // ], 
        cusCbeName: [
          {
            required: true,
            message: '请输入海关名称',
            trigger: 'blur'
          }
        ], cusCbeCode: [
          {
            required: true,
            message: '请输入海关编码',
            trigger: 'blur'
          }
        ], ciqCbeName: [
          {
            required: true,
            message: '请输入国检名称',
            trigger: 'blur'
          }
        ], ciqCbeCode: [
          {
            required: true,
            message: '请输入国检编码',
            trigger: 'blur'
          }
        ], platformName: [
          {
            required: true,
            message: '请输入客户名称',
            // trigger: 'change'
          }
        ], platformCode: [
          {
            required: true,
            message: '请输入客户编码',
            trigger: 'blur'
          }
        ], guaranteeNo: [
          {
            required: true,
            message: '请输入担保金账号',
            trigger: 'blur'
          }
        ], copName: [
          {
            required: true,
            message: '请输入企业传输名称',
            trigger: 'blur'
          }
        ], copCode: [
          {
            required: true,
            message: '请输入企业传输编码',
            trigger: 'blur'
          }
        ], type: [
          {
            required: true,
            message: '请输入电商类型',
            trigger: 'blur'
          }
        ], dxpId: [
          {
            required: true,
            message: '请输入企业传输ID',
            trigger: 'blur'
          }
        ], url: [
          {
            required: true,
            message: '请输入url地址',
            trigger: 'blur'
          }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      query: {
        copName: '',
        // platformName: '',
        qstCode: ''
      },
      listQuery: {
        page: 1,
        limit: 10,
        _type_: "like",
        orderBy: 'createtimedesc'

      },
      dialogFormVisible: false,
      dialogStatus: "",
      bdCustomerManager_btn_edit: false,
      bdCustomerManager_btn_del: false,
      bdCustomerManager_btn_add: true,
      textMap: {
        update: "编辑",
        create: "创建"
      },
      tableKey: 0,
      selectPlatfrom: []
    };
  },
  created () {
    this.getList();
    this.customerName()
    this.bdCustomerManager_btn_edit = this.elements["bdCustomerManager:btn_edit"];
    this.bdCustomerManager_btn_del = this.elements["bdCustomerManager:btn_del"];
    this.bdCustomerManager_btn_add = this.elements["bdCustomerManager:btn_add"];
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
      let self = this
      this.$refs.update.formEdit = true;
      this.$refs.update.disabledForm = true;
      this.$refs.update.updateView = true;
      getObj(row.indx).then(response => {
        self.$nextTick(() => {
          let formData = {
            indx: response.data.indx,
            qstCode: response.data.qstCode,
            guaranteeNo: response.data.guaranteeNo,
            copName: response.data.copName,
            isPush: response.data.isPush,
            wmsService: response.data.wmsService,
            outCode:response.data.outCode
          }
          self.$refs.update.resetFormFields();
          self.$refs.update.form = formData
        })
        // this.$refs.update.resetFormFields();
        // this.$copyJsonProperty(this.$refs.update.form, response.data);
      });
    },
    getList () {
      this.listLoading = true;
      let param = {
        copName: $.trim(this.query.copName),
        // copName: $.trim(this.query.platformName),
        qstCode: $.trim(this.query.qstCode),
        ...this.listQuery
      }
      // console.log(param)
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
    },
    handleUpdate (row) {
      getObj(row.indx).then(response => {
        this.form = response.data;
        this.dialogFormVisible = true;
        this.dialogStatus = "update";
      });
    },
    create (formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.$confirm('确定要保存吗', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            addObj(this.form).then((res) => {
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
        copName: '',
        guaranteeNo: '',
        isPush: '1',
        wmsService: '1'
      }
    },
    // 客户下拉选择
    customerName () {
      selectObj().then(response => {
        // this.selectCustom = response.data;
        for (var i = 0; i < response.data.length; i++) {
          let cutObj = {};
          cutObj.label = '(' + response.data[i].value + ')' + ' ' + response.data[i].key
          // cutObj.value = response.data[i].value
          cutObj.value = response.data[i].key
          this.selectCustom.push(cutObj)
        }
        // console.log(this.selectCustom)
      });
    },
    changeValue (val) {
      if (val == '') {
        this.form.platformName = { label: '', value: '' }
      } else {
        this.form.platformCode = val.value
      }
    },
  }
};
</script>
<style scoped>
.el-form-item {
  margin-left: 4%;
  /* width: 400px; */
}
.formLeft {
  /* padding-left: 4%; */
}
.el-input,
.el-select {
  width: 200px;
}
</style>

